#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const reposDir = path.join(root, "repos");
const outputDir = path.join(root, "static-demo", "data");

const componentOutputPath = path.join(outputDir, "component-inventory.json");
const pageOutputPath = path.join(outputDir, "repo-page-inventory.json");

const toPosix = (value) => value.split(path.sep).join("/");
const rel = (value) => toPosix(path.relative(root, value));
const exists = (value) => fs.existsSync(value);
const read = (value) => fs.readFileSync(value, "utf8");

function listFiles(dir, predicate = () => true) {
  if (!exists(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === ".git" || entry.name === "node_modules") return [];
      return listFiles(fullPath, predicate);
    }
    return predicate(fullPath) ? [fullPath] : [];
  });
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function uniq(values) {
  return [...new Set(values.filter(Boolean))];
}

function titleCaseFromId(id) {
  return id
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function slug(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function extractTitle(html) {
  return stripTags(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "");
}

function extractHeadings(html) {
  const headings = [];
  for (const match of html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)) {
    const text = stripTags(match[2]);
    if (text) headings.push({ level: Number(match[1]), text });
  }
  return headings;
}

function extractLinkedAssets(html, baseDir) {
  const linkedCss = uniq(
    [...html.matchAll(/<link\b[^>]*rel=["'][^"']*stylesheet[^"']*["'][^>]*href=["']([^"']+)["'][^>]*>/gi)].map((m) =>
      normalizeAssetPath(m[1], baseDir),
    ),
  );
  const linkedJs = uniq(
    [...html.matchAll(/<script\b[^>]*src=["']([^"']+)["'][^>]*>/gi)].map((m) => normalizeAssetPath(m[1], baseDir)),
  );
  const assetRefs = [
    ...html.matchAll(/\b(?:src|href|poster)=["']([^"']+\.(?:png|jpe?g|webp|gif|svg|mp4|webm|avif)(?:\?[^"']*)?)["']/gi),
  ].map((m) => normalizeAssetPath(m[1], baseDir));

  return { linkedCss, linkedJs, assetsReferencedCount: uniq(assetRefs).length };
}

function normalizeAssetPath(assetPath, baseDir) {
  if (/^(?:https?:)?\/\//i.test(assetPath) || assetPath.startsWith("data:")) return assetPath;
  return toPosix(path.normalize(path.join(rel(baseDir), assetPath)));
}

function extractClassNames(tag) {
  const classValue = tag.match(/\bclass=["']([^"']+)["']/i)?.[1] || "";
  return uniq(classValue.split(/\s+/).filter((name) => name && !name.includes("{")));
}

function extractSections(html) {
  const sections = [];
  const pattern = /<(section|header|footer|main|nav|article|aside|div)\b[^>]*class=["'][^"']+["'][^>]*>[\s\S]*?(?=<\/\1>)/gi;
  for (const match of html.matchAll(pattern)) {
    const tag = match[0].split(">")[0] + ">";
    const classNames = extractClassNames(tag);
    const signalClasses = classNames.filter((name) =>
      /(section|hero|nav|footer|grid|card|banner|modal|drawer|cart|product|pricing|plan|faq|testimonial|offer|perk|account|membership|checkout|feature|gallery|selector)/i.test(
        name,
      ),
    );
    if (!signalClasses.length) continue;
    const heading = extractHeadings(match[0])[0]?.text || "";
    sections.push({
      tag: match[1].toLowerCase(),
      classNames: signalClasses.slice(0, 10),
      heading,
    });
    if (sections.length >= 40) break;
  }
  return sections;
}

function extractMajorClassPatterns(html) {
  const classNames = [];
  for (const match of html.matchAll(/\bclass=["']([^"']+)["']/gi)) {
    classNames.push(...match[1].split(/\s+/));
  }

  const counts = new Map();
  for (const className of classNames.filter(Boolean)) {
    if (className.includes("{") || className.length > 80) continue;
    const family = className
      .replace(/--?[a-z0-9]+$/i, "")
      .replace(/__[a-z0-9-]+$/i, "")
      .replace(/-[0-9]+$/i, "");
    counts.set(family, (counts.get(family) || 0) + 1);
  }
  return [...counts.entries()]
    .filter(([, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([className, count]) => ({ className, count }));
}

function propsFromValue(value) {
  if (Array.isArray(value)) {
    return { type: "array", itemShape: value[0] && typeof value[0] === "object" ? propsFromObject(value[0]) : typeof value[0] };
  }
  if (value && typeof value === "object") return { type: "object", shape: propsFromObject(value) };
  return { type: typeof value };
}

function propsFromObject(object) {
  return Object.fromEntries(Object.entries(object).map(([key, value]) => [key, propsFromValue(value)]));
}

function inferPropsFromComponentJson(json) {
  if (json.propsSchema?.properties) return json.propsSchema.properties;
  if (json.schema?.properties) return json.schema.properties;
  if (json.preview?.exampleProps) return propsFromObject(json.preview.exampleProps);
  return {};
}

function inferFamily(name, keywords = []) {
  const joined = `${name} ${keywords.join(" ")}`.toLowerCase();
  if (/nav|footer|banner|anchor/.test(joined)) return "global-chrome";
  if (/hero|video|carousel|spotlight/.test(joined)) return "marketing-sections";
  if (/product|pricing|gallery|config|cart|checkout|beacon|membership|plans/.test(joined)) return "commerce";
  if (/faq|how|feature|persona|before/.test(joined)) return "content-sections";
  if (/account|perk|offer|dashboard|cancellation/.test(joined)) return "account-pack-perks";
  if (/selector|billing|plan|care|summary/.test(joined)) return "plan-selector";
  return "reference";
}

function recommendStatus(name, sourceRepo, sourceType) {
  const key = `${name} ${sourceRepo} ${sourceType}`.toLowerCase();
  if (/new-halo/.test(key)) return "archive";
  if (sourceType === "tock-component") return "keep";
  if (sourceType === "react-ui-component") return "merge";
  if (/halo(plan|product|mainnav|sitefooter|hero|promo|feature|app|pricing|gallery|config|membership|beacons)/i.test(name)) {
    return "keep";
  }
  if (/packperks|account|offer|cancellation|membership/.test(key)) return "adapt";
  if (/ui\/|shadcn|radix/.test(key)) return "merge";
  return "adapt";
}

function makeComponent({ id, name, sourceRepo, sourcePath, sourceType, description, keywords = [], props = {}, interactions = [], extractedFrom, notes }) {
  const reviewStatus = recommendStatus(name, sourceRepo, sourceType);
  return {
    id,
    name,
    family: inferFamily(name, keywords),
    sourceRepo,
    sourcePath,
    sourceType,
    description,
    keywords,
    props,
    interactions,
    extractedFrom,
    reviewStatus,
    notes,
  };
}

function scrapeTockComponents() {
  const dir = path.join(reposDir, "ecomlanders", "pages", "Lander-v2-2026", "tock-components");
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const componentDir = path.join(dir, entry.name);
      const jsonPath = path.join(componentDir, "tock-component.json");
      const templatePath = path.join(componentDir, "template.tsx");
      const json = JSON.parse(read(jsonPath));
      const keywords = json.metadata?.keywords || [];
      const description = json.metadata?.description || json.metadata?.when_to_use || titleCaseFromId(entry.name);
      const template = exists(templatePath) ? read(templatePath) : "";
      const interactions = uniq([
        ...[...template.matchAll(/addEventListener\(["']([^"']+)/g)].map((m) => m[1]),
        ...(template.includes("data-") ? ["data-attribute state hooks"] : []),
        ...(JSON.stringify(json).includes("modal") || /modal/i.test(entry.name) ? ["modal open/close"] : []),
      ]);

      return makeComponent({
        id: `ecomlanders-tock-${slug(entry.name)}`,
        name: json.name || entry.name,
        sourceRepo: "ecomlanders",
        sourcePath: rel(componentDir),
        sourceType: "tock-component",
        description,
        keywords,
        props: inferPropsFromComponentJson(json),
        interactions,
        extractedFrom: [rel(jsonPath), rel(templatePath)],
        notes: [
          json.metadata?.when_to_use && `Use: ${json.metadata.when_to_use}`,
          json.metadata?.avoid_when && `Avoid: ${json.metadata.avoid_when}`,
          json.source?.path && `Original source pointer: ${json.source.path}`,
        ]
          .filter(Boolean)
          .join(" "),
      });
    });
}

function scrapeEcomPages() {
  const pageDirs = ["Lander-v3-2026", "Lander-v2-2026", "lander-2026", "tiktok-lander", "track-your-order"];
  return pageDirs.flatMap((dirName) => {
    const dir = path.join(reposDir, "ecomlanders", "pages", dirName);
    return listFiles(dir, (file) => file.endsWith(".html")).map((file) => scrapeHtmlPage(file, "ecomlanders"));
  });
}

function scrapePackperksPages() {
  const dir = path.join(reposDir, "packperks");
  return listFiles(dir, (file) => file.endsWith(".html")).map((file) => {
    const page = scrapeHtmlPage(file, "packperks");
    return {
      ...page,
      majorClassPatterns: extractMajorClassPatterns(read(file)),
      notes: "Pack Perks/account source page. Use sections and repeated classes to derive account, perk, offer, cancellation, and membership-selection components.",
    };
  });
}

function scrapeNewHaloPages() {
  const dir = path.join(reposDir, "new-halo");
  return listFiles(dir, (file) => file.endsWith(".html")).map((file) => ({
    ...scrapeHtmlPage(file, "new-halo"),
    notes: "Reference/older source only. Use to fill visual or interaction gaps, not as canonical implementation.",
  }));
}

function scrapeHtmlPage(file, sourceRepo) {
  const html = read(file);
  const baseDir = path.dirname(file);
  const assetInfo = extractLinkedAssets(html, baseDir);
  return {
    sourceRepo,
    pagePath: rel(file),
    title: extractTitle(html),
    headings: extractHeadings(html).filter((heading) => heading.level <= 3),
    sections: extractSections(html),
    assetsReferencedCount: assetInfo.assetsReferencedCount,
    linkedCss: assetInfo.linkedCss,
    linkedJs: assetInfo.linkedJs,
    notes: "",
  };
}

function scrapePackperksComponents(pages) {
  const componentNames = [
    ["account-shell", "Account shell and dashboard layout"],
    ["account-summary-cards", "Account summary cards"],
    ["pack-membership-module", "Pack Membership account module"],
    ["billing-interval-module", "Billing interval module"],
    ["pack-perks-banner", "Pack Perks account banner"],
    ["pack-perks-marketing-hero", "Pack Perks marketing hero and section family"],
    ["featured-benefits", "Featured benefits section"],
    ["partner-offer-grid", "Partner offer grid"],
    ["tier-benefit-matrix", "Tier benefit matrix"],
    ["logged-in-pack-perks-hero", "Logged-in Pack Perks hero"],
    ["filter-pills", "Filter pills"],
    ["offer-card", "Offer card"],
    ["offer-detail-redemption", "Offer detail / redemption modal"],
    ["cancellation-save-flow", "Cancellation save flow"],
    ["membership-selection", "Membership selection page components"],
  ];

  return componentNames.map(([id, description]) => {
    const relatedPages = pages
      .filter((page) => {
        const haystack = `${page.pagePath} ${page.title} ${JSON.stringify(page.headings)} ${JSON.stringify(page.sections)}`.toLowerCase();
        return id
          .split("-")
          .some((part) => part.length > 4 && haystack.includes(part.replace("membership", "member")));
      })
      .map((page) => page.pagePath);

    return makeComponent({
      id: `packperks-${id}`,
      name: titleCaseFromId(id),
      sourceRepo: "packperks",
      sourcePath: relatedPages[0] || "repos/packperks",
      sourceType: "html-page-pattern",
      description,
      keywords: ["pack-perks", "account", ...id.split("-")],
      props: {
        title: { type: "string" },
        description: { type: "string" },
        items: { type: "array", itemShape: "content records inferred from matching HTML sections" },
      },
      interactions: id.includes("filter")
        ? ["filter selection"]
        : id.includes("modal") || id.includes("redemption")
          ? ["modal open/close", "redemption state"]
          : id.includes("cancellation")
            ? ["multi-step save flow"]
            : [],
      extractedFrom: relatedPages.length ? relatedPages : ["repos/packperks/**/*.html"],
      notes: "Inferred from Pack Perks static HTML pages; validate exact fields during component extraction.",
    });
  });
}

function scrapeHaloPlanSelector() {
  const srcDir = path.join(reposDir, "halo-plan-selector", "src");
  const appFiles = listFiles(srcDir, (file) => /^App.*\.tsx$/.test(path.basename(file)) || path.basename(file) === "VersionSelector.tsx");
  const uiFiles = listFiles(path.join(srcDir, "components"), (file) => /\.(tsx|ts)$/.test(file));

  const variantComponents = appFiles.map((file) => {
    const text = read(file);
    const name = path.basename(file, ".tsx");
    const exportedDefault = /export\s+default\s+function\s+([A-Za-z0-9_]+)/.exec(text)?.[1] || name;
    const localComponents = uniq([...text.matchAll(/function\s+([A-Z][A-Za-z0-9_]+)/g)].map((m) => m[1]));
    const importedUi = uniq([...text.matchAll(/\.\/components\/ui\/([^"']+)/g)].map((m) => m[1]));
    const featureNotes = inferPlanSelectorFeatureNotes(text);

    return makeComponent({
      id: `halo-plan-selector-${slug(name)}`,
      name: exportedDefault,
      sourceRepo: "halo-plan-selector",
      sourcePath: rel(file),
      sourceType: "react-app-variant",
      description: `Plan selector app variant with ${featureNotes.join(", ") || "membership selection"} behavior.`,
      keywords: ["plan-selector", "membership", "react", "billing", ...featureNotes.map(slug)],
      props: localComponents.length ? { internalComponents: { type: "array", values: localComponents } } : {},
      interactions: featureNotes,
      extractedFrom: [rel(file)],
      notes: `Imported UI primitives: ${importedUi.join(", ") || "none detected"}.`,
    });
  });

  const uiComponents = uiFiles.map((file) => {
    const name = path.basename(file).replace(/\.(tsx|ts)$/, "");
    return makeComponent({
      id: `halo-plan-selector-ui-${slug(name)}`,
      name: titleCaseFromId(name),
      sourceRepo: "halo-plan-selector",
      sourcePath: rel(file),
      sourceType: "react-ui-component",
      description: `Reusable UI primitive used by the plan selector React app.`,
      keywords: ["ui", "react", name],
      props: {},
      interactions: /dialog|popover|drawer|sheet|accordion|tabs|select|radio|checkbox|toggle|slider|carousel/i.test(name)
        ? ["stateful UI primitive"]
        : [],
      extractedFrom: [rel(file)],
      notes: "Merge into shared UI primitives rather than treating as Halo-specific content by default.",
    });
  });

  const featureComponents = [
    ["billing-cadence-selector", "Billing cadence selector: monthly, annual, two-year", ["monthly", "annual", "two-year"]],
    ["plan-tier-selector", "Bronze/Silver/Gold plan selector", ["bronze", "silver", "gold"]],
    ["tier-comparison-rows", "Tier comparison rows with included/excluded states", ["comparison", "included", "excluded"]],
    ["multi-collar-quantity", "Multi-collar quantity controls", ["quantity", "multi-collar"]],
    ["halo-care-toggle", "Halo Care toggle and pricing", ["halo-care", "toggle", "pricing"]],
    ["halo-care-benefits", "Halo Care benefit/discount module", ["halo-care", "benefits", "discount"]],
    ["order-summary-rail", "Order summary rail", ["summary", "pricing"]],
    ["continue-to-payment-cta", "Continue-to-payment CTA", ["cta", "checkout"]],
    ["mobile-sticky-summary", "Mobile sticky summary/CTA pattern", ["mobile", "sticky", "summary"]],
  ].map(([id, description, keywords]) =>
    makeComponent({
      id: `halo-plan-selector-feature-${id}`,
      name: titleCaseFromId(id),
      sourceRepo: "halo-plan-selector",
      sourcePath: "repos/halo-plan-selector/src/App*.tsx",
      sourceType: "react-feature-pattern",
      description,
      keywords: ["plan-selector", ...keywords],
      props: {
        selectedPlan: { type: "bronze | silver | gold" },
        billingFrequency: { type: "monthly | annual | two-year" },
        collarCount: { type: "number" },
      },
      interactions: keywords,
      extractedFrom: appFiles.map(rel),
      notes: "Feature-level extraction target inferred from app variants and project spec.",
    }),
  );

  return [...variantComponents, ...featureComponents, ...uiComponents];
}

function inferPlanSelectorFeatureNotes(text) {
  const checks = [
    ["billing cadence", /monthly|annual|two-year|billingFrequency/i],
    ["Bronze/Silver/Gold tiers", /bronze|silver|gold/i],
    ["multi-collar quantity", /collarCount|additionalCollar|quantity/i],
    ["Halo Care toggle/pricing", /haloCare|Halo Care/i],
    ["order summary", /summary|calculateTotal|subtotal/i],
    ["mobile sticky CTA", /sticky|bottom bar|fixed bottom/i],
    ["checkout step", /checkout|payment/i],
    ["comparison rows", /comparison|included|excluded|features/i],
  ];
  return checks.filter(([, pattern]) => pattern.test(text)).map(([label]) => label);
}

function scrapeNewHaloReferenceComponents() {
  const dir = path.join(reposDir, "new-halo");
  const htmlFiles = listFiles(dir, (file) => file.endsWith(".html"));
  const assetFiles = listFiles(path.join(dir, "assets"), (file) => /\.(png|jpe?g|webp|gif|svg|mp4|webm|avif)$/i.test(file));
  return [
    makeComponent({
      id: "new-halo-reference-pages",
      name: "New Halo Reference Pages",
      sourceRepo: "new-halo",
      sourcePath: "repos/new-halo",
      sourceType: "reference-html",
      description: "Older landing/shop reference pages for visual and interaction comparison.",
      keywords: ["reference", "older-source", "landing", "shop"],
      props: {},
      interactions: ["shop configurator reference", "older landing interactions"],
      extractedFrom: htmlFiles.map(rel),
      notes: "Reference/older source. Archive status is intentional; use only to fill gaps.",
    }),
    makeComponent({
      id: "new-halo-reference-assets",
      name: "New Halo Reference Assets",
      sourceRepo: "new-halo",
      sourcePath: "repos/new-halo/assets",
      sourceType: "reference-assets",
      description: "Reference image/video assets from older Halo exploratory work.",
      keywords: ["reference", "assets", "images", "older-source"],
      props: { assetCount: { type: "number", value: assetFiles.length } },
      interactions: [],
      extractedFrom: assetFiles.map(rel),
      notes: "Reference/older source; do not promote to canonical without design review.",
    }),
  ];
}

function scrapeEcomCommercePatterns() {
  const patterns = [
    ["product-gallery-color-sync", "Product gallery with color-synced hero image", ["gallery", "color", "pdp"]],
    ["product-config-shell", "Product config shell", ["config", "pdp"]],
    ["product-title-trust-badge", "Product title and trust badge", ["trust", "badge", "pdp"]],
    ["color-swatch-selector", "Color swatch selector and selected-color label", ["swatch", "color"]],
    ["addon-card", "Add-on card pattern from lander-2026 and new-halo shop demos", ["addon", "bundle"]],
    ["addon-expanded-details", "Add-on expanded details state", ["addon", "details", "expanded"]],
    ["addon-add-remove-state", "Add-on add/remove state", ["addon", "state"]],
    ["membership-box", "Membership box with collapsed and expanded states", ["membership", "expanded"]],
    ["membership-learn-more", "Membership learn-more trigger", ["membership", "modal"]],
    ["price-display", "Price display with current/original/savings states", ["price", "savings"]],
    ["checkout-add-to-cart-cta", "Checkout/add-to-cart CTA states", ["cart", "checkout", "cta"]],
    ["included-modal", "What-is-included modal", ["modal", "included"]],
    ["box-modal", "What-is-in-the-box modal", ["modal", "box"]],
    ["beacon-feature-cards", "Beacon feature cards", ["beacon", "cards"]],
    ["beacon-comparison-table", "Beacon comparison table", ["beacon", "comparison"]],
    ["mini-cart-drawer", "Mini-cart drawer", ["cart", "drawer"]],
    ["cart-overlay", "Cart overlay", ["cart", "overlay"]],
    ["cart-item-row", "Cart item row with image, variant, delivery copy, quantity controls, and delete action", ["cart", "item"]],
    ["cart-membership-collapsed-row", "Cart membership collapsed row", ["cart", "membership"]],
    ["cart-membership-detail", "Cart membership detail drawer/inline expansion", ["cart", "membership", "drawer"]],
    ["promo-code-states", "Promo code collapsed, expanded, success, and error states", ["promo", "discount", "error"]],
    ["cart-total-rows", "Cart subtotal, discount, tax, and total rows", ["cart", "totals"]],
    ["cart-empty-state", "Cart empty state", ["cart", "empty"]],
    ["membership-plans-modal", "Membership plans modal", ["membership", "plans", "modal"]],
    ["woocommerce-store-api-cart", "WooCommerce Store API cart behavior reference from V2/V3 shop.js", ["woocommerce", "cart", "api"]],
    ["local-configurator-state", "Local configurator state reference from lander-2026 and new-halo shop.js", ["local-state", "configurator"]],
  ];

  return patterns.map(([id, description, keywords]) => {
    const sourcePath = id.includes("addon") || id.includes("local-configurator")
      ? "repos/ecomlanders/pages/lander-2026/shop.html"
      : "repos/ecomlanders/pages/Lander-v3-2026/shop.html";
    return makeComponent({
      id: `ecomlanders-commerce-${id}`,
      name: titleCaseFromId(id),
      sourceRepo: "ecomlanders",
      sourcePath,
      sourceType: "commerce-pattern",
      description,
      keywords: ["commerce", ...keywords],
      props: {
        state: { type: "object", note: "Infer concrete fields during component extraction from shop.html/shop.js state." },
      },
      interactions: keywords.filter((item) => /cart|modal|drawer|state|swatch|promo|checkout|api|expanded/.test(item)),
      extractedFrom: [
        "repos/ecomlanders/pages/Lander-v3-2026/shop.html",
        "repos/ecomlanders/pages/Lander-v3-2026/shop.js",
        "repos/ecomlanders/pages/Lander-v2-2026/shop.html",
        "repos/ecomlanders/pages/Lander-v2-2026/shop.js",
        "repos/ecomlanders/pages/lander-2026/shop.html",
        "repos/ecomlanders/pages/lander-2026/shop.js",
      ],
      notes: "Pattern-level inventory entry requested by spec; preserve V3 as primary behavior/style reference and lander-2026 add-on patterns.",
    });
  });
}

function writeJson(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
}

function summarize(components, pages) {
  const countBy = (items, key) =>
    items.reduce((acc, item) => {
      const value = item[key] || "unknown";
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});
  const countByFamily = countBy(components, "family");
  const countByStatus = countBy(components, "reviewStatus");
  const countComponentsByRepo = countBy(components, "sourceRepo");
  const countPagesByRepo = countBy(pages, "sourceRepo");

  return { countComponentsByRepo, countPagesByRepo, countByFamily, countByStatus };
}

const pages = [...scrapeEcomPages(), ...scrapePackperksPages(), ...scrapeNewHaloPages()].sort((a, b) =>
  `${a.sourceRepo}/${a.pagePath}`.localeCompare(`${b.sourceRepo}/${b.pagePath}`),
);

const components = [
  ...scrapeTockComponents(),
  ...scrapeEcomCommercePatterns(),
  ...scrapePackperksComponents(pages.filter((page) => page.sourceRepo === "packperks")),
  ...scrapeHaloPlanSelector(),
  ...scrapeNewHaloReferenceComponents(),
].sort((a, b) => `${a.sourceRepo}/${a.family}/${a.id}`.localeCompare(`${b.sourceRepo}/${b.family}/${b.id}`));

writeJson(componentOutputPath, components);
writeJson(pageOutputPath, pages);

const summary = summarize(components, pages);
console.log(`Wrote ${rel(componentOutputPath)} (${components.length} components)`);
console.log(`Wrote ${rel(pageOutputPath)} (${pages.length} pages)`);
console.log(JSON.stringify(summary, null, 2));
