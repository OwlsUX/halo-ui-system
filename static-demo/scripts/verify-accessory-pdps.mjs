import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const pagesDir = path.join(root, "pages");
const manifestPath = path.join(root, "data", "accessory-products.json");
const categoryPath = path.join(pagesDir, "accessories.html");
const componentsPath = path.join(root, "js", "components.js");
const collarPdpPath = path.join(pagesDir, "shop-wireless-dog-fence.html");
const expectedCollarSha256 = "92c7396088263e00414a740eef89935ce45ebc2ced0a0aeb1c439d2d94794125";

const requiredProducts = new Map([
  ["zone-beacon", "accessory-zone-beacon.html"],
  ["remote-beacon", "accessory-remote-beacon.html"],
  ["halo-collar-remote", "accessory-halo-collar-remote.html"],
  ["pro-case", "accessory-pro-case.html"],
  ["collar-strap-halo-4-5", "accessory-collar-strap-halo-4-5.html"],
  ["collar-strap-halo-1-2-3", "accessory-collar-strap-halo-1-2-3.html"],
  ["contact-tip-kit", "accessory-contact-tip-kit.html"],
  ["charging-stand", "accessory-charging-stand.html"],
  ["charging-kit-halo-4-5", "accessory-charging-kit-halo-4-5.html"],
  ["charging-kit-halo-1-2-3", "accessory-charging-kit-halo-1-2-3.html"],
  ["halo-t-shirt", "accessory-halo-t-shirt.html"],
  ["lawn-signs", "accessory-lawn-signs.html"],
]);

const failures = [];

function fail(message) {
  failures.push(message);
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function exists(filePath) {
  return fs.existsSync(filePath);
}

function cleanLocalRef(ref) {
  return ref.split(/[?#]/, 1)[0];
}

function isLocalImage(ref) {
  return !/^(?:https?:|data:|mailto:|tel:|#)/.test(ref) && /\.(?:svg|png|jpe?g|webp|gif)$/i.test(cleanLocalRef(ref));
}

function resolveFromPage(pageRelativePath, ref) {
  return path.resolve(path.join(root, path.dirname(pageRelativePath)), cleanLocalRef(ref));
}

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

if (!exists(manifestPath)) {
  fail("Missing static-demo/data/accessory-products.json.");
}

let products = [];
if (exists(manifestPath)) {
  try {
    const manifest = JSON.parse(readText(manifestPath));
    products = Array.isArray(manifest.products) ? manifest.products : [];
    if (!Array.isArray(manifest.products)) {
      fail("Manifest must expose a products array.");
    }
  } catch (error) {
    fail(`Manifest is not valid JSON: ${error.message}`);
  }
}

const byId = new Map(products.map((product) => [product.id, product]));
const byRoute = new Map(products.map((product) => [product.route, product]));

for (const [id, route] of requiredProducts) {
  const product = byId.get(id);
  if (!product) {
    fail(`Manifest missing product id: ${id}`);
    continue;
  }
  if (product.route !== route) {
    fail(`${id}: expected route ${route}, found ${product.route}`);
  }
}

for (const product of products) {
  for (const field of ["id", "name", "route", "category", "family", "price", "shortDescription", "compatibility"]) {
    if (!product[field]) fail(`${product.id || product.name || "Unknown product"}: missing ${field}.`);
  }
  for (const arrayField of ["sourceImagePaths", "galleryImages", "includedItems", "relatedProductIds", "statusNotes"]) {
    if (!Array.isArray(product[arrayField])) fail(`${product.id || product.name || "Unknown product"}: ${arrayField} must be an array.`);
  }
  if (product.route && !/^accessory-[a-z0-9-]+\.html$/.test(product.route)) {
    fail(`${product.id}: route is not a stable accessory filename: ${product.route}`);
  }
  for (const relatedId of product.relatedProductIds || []) {
    if (!byId.has(relatedId)) fail(`${product.id}: unknown related product id ${relatedId}.`);
  }
  for (const ref of [...(product.sourceImagePaths || []), ...(product.galleryImages || []).map((image) => image.src).filter(Boolean)]) {
    if (!isLocalImage(ref)) continue;
    const assetPath = path.join(root, cleanLocalRef(ref).replace(/^static-demo\//, ""));
    if (!exists(assetPath)) fail(`${product.id}: missing manifest image ${ref}.`);
  }
}

const accessoryRoutes = fs.readdirSync(pagesDir).filter((fileName) => /^accessory-.*\.html$/.test(fileName)).sort();
for (const route of accessoryRoutes) {
  if (!byRoute.has(route)) fail(`Route ${route} is missing from accessory-products.json.`);
}
for (const route of requiredProducts.values()) {
  const filePath = path.join(pagesDir, route);
  if (!exists(filePath)) {
    fail(`Missing PDP route: pages/${route}`);
    continue;
  }

  const html = readText(filePath);
  if (!html.includes('data-accessory-pdp')) fail(`${route}: missing data-accessory-pdp marker.`);
  if (!html.includes('class="accessory-pdp-gallery"')) fail(`${route}: missing accessory PDP gallery.`);
  if (!html.includes('data-gallery-featured')) fail(`${route}: missing featured gallery image/control.`);
  if (!html.includes('data-gallery-thumb')) fail(`${route}: missing thumbnail carousel buttons.`);
  if (!html.includes('aria-current="true"')) fail(`${route}: missing selected thumbnail aria-current state.`);
  if (html.includes("product-gallery") || html.includes("gallery-image")) {
    fail(`${route}: must not reuse collar PDP waterfall gallery classes.`);
  }
  if (!html.includes("accessory-pdp.js")) fail(`${route}: missing shared accessory PDP script.`);
  if (!html.includes("Add to cart") && !html.includes("Coming soon")) fail(`${route}: missing buy-stack CTA.`);
  if (!html.includes("Accessories</a>")) fail(`${route}: missing breadcrumb back to Accessories.`);

  const refs = [...html.matchAll(/\b(?:src|href|data-gallery-src)="([^"]+)"/g)].map((match) => match[1]);
  for (const ref of refs) {
    if (!isLocalImage(ref)) continue;
    const resolved = resolveFromPage(path.join("pages", route), ref);
    if (!resolved.startsWith(root) || !exists(resolved)) {
      fail(`${route}: missing local image reference ${ref}.`);
    }
  }
}

if (exists(categoryPath)) {
  const categoryHtml = readText(categoryPath);
  if (categoryHtml.includes('href="modern-accessory-pdp.html"')) {
    fail("accessories.html still links accessory cards to modern-accessory-pdp.html.");
  }
  for (const route of requiredProducts.values()) {
    if (!categoryHtml.includes(`href="${route}"`)) {
      fail(`accessories.html does not link to ${route}.`);
    }
  }
}

if (exists(collarPdpPath)) {
  const currentHash = sha256(collarPdpPath);
  if (currentHash !== expectedCollarSha256) {
    fail(`shop-wireless-dog-fence.html changed during accessory PDP work: ${currentHash}`);
  }
  const collarHtml = readText(collarPdpPath);
  if (collarHtml.includes("accessory-pdp-gallery") || collarHtml.includes("accessory-pdp.js")) {
    fail("Collar PDP includes accessory gallery assets.");
  }
}

const galleryScriptPath = path.join(root, "js", "accessory-pdp.js");
if (!exists(galleryScriptPath)) {
  fail("Missing shared gallery script: static-demo/js/accessory-pdp.js.");
}

if (exists(componentsPath)) {
  const componentsJs = readText(componentsPath);
  if (!componentsJs.includes("pages/accessory-zone-beacon.html")) {
    fail("Workbench drawer Accessory PDP link should point to a representative accessory PDP route.");
  }
}

if (failures.length) {
  console.error(`Accessory PDP verification failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Accessory PDP verification passed for ${products.length} products and ${accessoryRoutes.length} routes.`);
