#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HALO_ORIGIN = 'https://www.halocollar.com';
const OUT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../static-demo/data');

const AUDIT_PAGES = [
  { url: 'https://www.halocollar.com/', navLabel: 'Home' },
  { url: 'https://www.halocollar.com/shop-wireless-dog-fence/', navLabel: 'Shop Halo Collar' },
  { url: 'https://www.halocollar.com/main-shop/accessories/', navLabel: 'Accessories' },
  { url: 'https://www.halocollar.com/beacons/', navLabel: 'Beacons' },
  { url: 'https://www.halocollar.com/reviews/', navLabel: 'Reviews' },
  { url: 'https://www.halocollar.com/deals-discounts/', navLabel: 'Deals & Discounts' },
  { url: 'https://www.halocollar.com/dog-fence-features/', navLabel: 'Features' },
  { url: 'https://www.halocollar.com/dog-fence-features/halo-app/', navLabel: 'Halo App' },
  { url: 'https://www.halocollar.com/dog-fence-features/virtual-gps/', navLabel: 'Virtual GPS Fence' },
  { url: 'https://www.halocollar.com/dog-fence-features/gps-location-tracking/', navLabel: 'GPS Location Tracking' },
  { url: 'https://www.halocollar.com/dog-fence-features/cesar-millan-training/', navLabel: 'Cesar Millan Training' },
  { url: 'https://www.halocollar.com/dog-fence-features/feedback-system/', navLabel: 'Feedback System' },
];

const SKIP_ASSET_PATTERNS = [
  /google-analytics/i,
  /googletagmanager/i,
  /doubleclick/i,
  /facebook\.com\/tr/i,
  /connect\.facebook\.net/i,
  /klaviyo/i,
  /hotjar/i,
  /segment/i,
  /cdn-cgi/i,
];

const HEADING_RE = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
const TAG_RE = /<([a-z][a-z0-9:-]*)\b([^>]*)>/gi;
const ATTR_RE = /([:@\w.-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
const CSS_URL_RE = /url\(\s*(['"]?)(.*?)\1\s*\)/gi;

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const fetchedPages = [];
  for (const page of AUDIT_PAGES) {
    process.stderr.write(`Fetching ${page.url}\n`);
    const html = await fetchPage(page.url);
    fetchedPages.push({ ...page, html });
  }

  const allNavLinks = dedupeNavLinks(
    fetchedPages.flatMap((page) => extractNavLinks(page.html, page.url))
  );

  const pageAudits = [];
  const assetRecords = [];

  for (const page of fetchedPages) {
    const title = extractTitle(page.html);
    const pageAssets = extractAssets(page.html, page.url);
    const sections = extractSections(page, pageAssets);

    for (const section of sections) {
      for (const asset of pageAssets.filter((candidate) => candidate.sectionId === section.sectionId)) {
        assetRecords.push({
          pageUrl: page.url,
          sectionId: section.sectionId,
          sectionType: section.sectionType,
          assetUrl: asset.assetUrl,
          assetType: asset.assetType,
          alt: asset.alt,
          usage: guessUsage(section.sectionType, asset),
          sourceElement: asset.sourceElement,
          keepForReplica: shouldKeepAsset(asset, section),
          notes: asset.notes,
        });
      }
    }

    pageAudits.push({
      pageUrl: page.url,
      navLabel: page.navLabel,
      title,
      sections,
    });
  }

  const liveNav = {
    generatedAt: new Date().toISOString(),
    sourcePages: AUDIT_PAGES.map((page) => page.url),
    links: allNavLinks,
  };

  const livePageAudit = {
    generatedAt: new Date().toISOString(),
    source: 'Live Halo primary-nav page audit',
    pages: pageAudits,
  };

  const siteAssets = {
    generatedAt: new Date().toISOString(),
    source: 'Live Halo hosted asset audit',
    assets: dedupeAssets(assetRecords),
  };

  await writeJson('live-nav.json', liveNav);
  await writeJson('live-page-audit.json', livePageAudit);
  await writeJson('site-assets.json', siteAssets);

  const sectionCount = pageAudits.reduce((sum, page) => sum + page.sections.length, 0);
  console.log(JSON.stringify({
    pages: pageAudits.length,
    sections: sectionCount,
    assets: siteAssets.assets.length,
    navLinks: liveNav.links.length,
    files: [
      'static-demo/data/live-page-audit.json',
      'static-demo/data/site-assets.json',
      'static-demo/data/live-nav.json',
    ],
  }, null, 2));
}

async function fetchPage(url) {
  const response = await fetch(url, {
    redirect: 'follow',
    headers: {
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'accept-language': 'en-US,en;q=0.9',
      'user-agent': 'Mozilla/5.0 HaloDesignSystemAudit/1.0',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  return response.text();
}

async function writeJson(filename, data) {
  await writeFile(path.join(OUT_DIR, filename), `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

function extractTitle(html) {
  const ogTitle = html.match(/<meta\b[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["'][^>]*>/i);
  const title = ogTitle?.[1] || html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '';
  return decodeEntities(stripTags(title).replace(/\s+\|\s+Halo Collar.*$/i, '').trim());
}

function extractNavLinks(html, pageUrl) {
  const navHtml = [
    ...html.matchAll(/<(header|nav)\b[^>]*>[\s\S]*?<\/\1>/gi),
  ].map((match) => match[0]).join('\n');
  const source = navHtml || html.slice(0, 50000);
  const links = [];

  for (const match of source.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const attrs = parseAttrs(match[1]);
    const rawHref = attrs.href;
    if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) continue;

    const url = normalizeUrl(rawHref, pageUrl);
    if (!url || !isHaloPageUrl(url)) continue;

    const label = decodeEntities(stripTags(match[2]).replace(/\s+/g, ' ').trim());
    if (!label || /^(skip|search|cart|account)$/i.test(label)) continue;

    links.push({
      label,
      url: normalizePageUrl(url),
      sourcePageUrl: pageUrl,
    });
  }

  return links;
}

function dedupeNavLinks(links) {
  const seen = new Map();
  for (const link of links) {
    const key = `${link.label.toLowerCase()}|${link.url}`;
    if (!seen.has(key)) seen.set(key, { ...link });
  }

  return [...seen.values()].sort((a, b) => a.label.localeCompare(b.label) || a.url.localeCompare(b.url));
}

function extractAssets(html, pageUrl) {
  const assets = [];

  for (const match of html.matchAll(TAG_RE)) {
    const [rawTag, tagName, rawAttrs] = match;
    const tag = tagName.toLowerCase();
    const attrs = parseAttrs(rawAttrs);
    const index = match.index ?? 0;

    if (tag === 'img') {
      collectAttrUrl(assets, attrs.src, pageUrl, index, tag, attrs.alt, 'src');
      collectSrcset(assets, attrs.srcset, pageUrl, index, tag, attrs.alt);
      collectAttrUrl(assets, attrs['data-src'], pageUrl, index, tag, attrs.alt, 'data-src');
      collectSrcset(assets, attrs['data-srcset'], pageUrl, index, tag, attrs.alt);
    }

    if (tag === 'source') {
      collectAttrUrl(assets, attrs.src, pageUrl, index, tag, attrs.alt || attrs.media || attrs.type || '', 'src');
      collectSrcset(assets, attrs.srcset, pageUrl, index, tag, attrs.alt || attrs.media || attrs.type || '');
    }

    if (tag === 'video') {
      collectAttrUrl(assets, attrs.src, pageUrl, index, tag, attrs['aria-label'] || attrs.title || '', 'src');
      collectAttrUrl(assets, attrs.poster, pageUrl, index, 'video-poster', attrs['aria-label'] || attrs.title || '', 'poster');
    }

    if (tag === 'svg') {
      const marker = `${pageUrl}#inline-svg-${assets.filter((asset) => asset.sourceElement === 'inline SVG').length + 1}`;
      assets.push({
        index,
        assetUrl: marker,
        assetType: 'svg',
        alt: attrs['aria-label'] || attrs.title || '',
        sourceElement: 'inline SVG',
        notes: 'Inline SVG symbol or icon; no hosted URL available.',
      });
    }

    const style = attrs.style || '';
    for (const cssMatch of style.matchAll(CSS_URL_RE)) {
      collectAttrUrl(assets, cssMatch[2], pageUrl, index, 'CSS background', attrs.alt || '', 'style url()');
    }

    for (const attrName of ['data-bg', 'data-background', 'data-poster', 'data-video', 'data-image']) {
      collectAttrUrl(assets, attrs[attrName], pageUrl, index, tag, attrs.alt || '', attrName);
    }

    if (rawTag.includes('url(')) {
      for (const cssMatch of rawTag.matchAll(CSS_URL_RE)) {
        collectAttrUrl(assets, cssMatch[2], pageUrl, index, 'CSS background', attrs.alt || '', 'tag url()');
      }
    }
  }

  for (const match of html.matchAll(CSS_URL_RE)) {
    collectAttrUrl(assets, match[2], pageUrl, match.index ?? 0, 'CSS background', '', 'html url()');
  }

  return dedupeAssets(assets).filter((asset) => asset.assetType !== 'tracking pixel' || isTrackingPixel(asset.assetUrl));
}

function collectSrcset(assets, srcset, pageUrl, index, sourceElement, alt) {
  if (!srcset) return;
  for (const candidate of srcset.split(',')) {
    const url = candidate.trim().split(/\s+/)[0];
    collectAttrUrl(assets, url, pageUrl, index, sourceElement, alt, 'srcset');
  }
}

function collectAttrUrl(assets, rawUrl, pageUrl, index, sourceElement, alt, sourceAttr) {
  if (!rawUrl) return;
  const cleaned = rawUrl.trim();
  if (!cleaned || cleaned.startsWith('data:')) return;

  const assetUrl = normalizeUrl(cleaned, pageUrl);
  if (!assetUrl) return;

  const assetType = classifyAsset(assetUrl, sourceElement, sourceAttr);
  if (SKIP_ASSET_PATTERNS.some((pattern) => pattern.test(assetUrl)) && assetType !== 'tracking pixel') return;

  assets.push({
    index,
    assetUrl,
    assetType,
    alt: decodeEntities(stripTags(alt || '').trim()),
    sourceElement: sourceElement === 'video-poster' ? 'video poster' : sourceElement,
    notes: sourceAttr ? `Found in ${sourceAttr}.` : '',
  });
}

function extractSections(page, pageAssets) {
  const headings = [...page.html.matchAll(HEADING_RE)]
    .map((match) => ({
      index: match.index ?? 0,
      level: Number(match[1]),
      heading: decodeEntities(stripTags(match[2]).replace(/\s+/g, ' ').trim()),
    }))
    .filter((item) => item.heading && !/^(menu|cart|search|account)$/i.test(item.heading));

  const mainStart = page.html.search(/<main\b/i);
  const footerStart = page.html.search(/<footer\b/i);
  const baseHeadings = headings.filter((item) => {
    if (footerStart > -1 && item.index > footerStart) return false;
    if (mainStart > -1) return item.index >= mainStart || item.level <= 2;
    return true;
  });

  const selected = compactHeadings(baseHeadings);
  const fallback = selected.length ? selected : [{
    index: 0,
    level: 1,
    heading: page.navLabel || extractTitle(page.html) || page.url,
  }];

  const sections = fallback.map((heading, order) => {
    const nextIndex = fallback[order + 1]?.index ?? (footerStart > -1 ? footerStart : page.html.length);
    const start = nearestSectionStart(page.html, heading.index);
    const end = Math.max(nextIndex, heading.index + 500);
    const sectionHtml = page.html.slice(start, end);
    const sectionId = `${slugify(heading.heading) || `section-${order + 1}`}-${order + 1}`;
    const sectionType = guessSectionType(heading.heading, sectionHtml, order);
    const sectionAssetUrls = pageAssets
      .filter((asset) => asset.index >= start && asset.index < end)
      .map((asset) => asset.assetUrl);

    for (const asset of pageAssets) {
      if (asset.index >= start && asset.index < end) asset.sectionId = sectionId;
    }

    return {
      sectionId,
      order: order + 1,
      sectionType,
      heading: heading.heading,
      subhead: extractSubhead(sectionHtml, heading.heading),
      copySummary: summarizeText(sectionHtml, heading.heading),
      assetUrls: [...new Set(sectionAssetUrls)].slice(0, 20),
      candidateComponent: guessComponent(sectionType, heading.heading),
      recommendation: recommendSection(sectionType, heading.heading, sectionHtml),
      notes: buildSectionNotes(sectionHtml, sectionAssetUrls.length),
    };
  });

  const unassignedAssets = pageAssets.filter((asset) => !asset.sectionId);
  if (unassignedAssets.length && sections.length) {
    const target = sections.at(-1);
    for (const asset of unassignedAssets) asset.sectionId = target.sectionId;
    target.assetUrls = [...new Set([...target.assetUrls, ...unassignedAssets.map((asset) => asset.assetUrl)])].slice(0, 20);
  }

  return sections;
}

function compactHeadings(headings) {
  const result = [];
  const seen = new Set();

  for (const heading of headings) {
    const normalized = heading.heading.toLowerCase();
    if (seen.has(normalized)) continue;
    if (heading.heading.length < 3) continue;
    if (heading.level > 3 && result.length > 0) continue;
    seen.add(normalized);
    result.push(heading);
  }

  return result.slice(0, 18);
}

function nearestSectionStart(html, index) {
  const prefix = html.slice(Math.max(0, index - 6000), index);
  const marker = [...prefix.matchAll(/<(section|main|article|div)\b[^>]*>/gi)].at(-1);
  return marker ? Math.max(0, index - 6000 + (marker.index ?? 0)) : Math.max(0, index - 2500);
}

function extractSubhead(sectionHtml, heading) {
  const paragraphs = extractTextBlocks(sectionHtml, ['p', 'h2', 'h3', 'h4']);
  return paragraphs.find((text) => text !== heading && text.length > 12 && text.length < 220) || '';
}

function summarizeText(sectionHtml, heading) {
  const text = decodeEntities(stripTags(sectionHtml).replace(/\s+/g, ' ').trim());
  const cleaned = text.replace(heading, '').replace(/\s+/g, ' ').trim();
  return cleaned.length > 260 ? `${cleaned.slice(0, 257).trim()}...` : cleaned;
}

function extractTextBlocks(html, tags) {
  const tagPattern = tags.join('|');
  const re = new RegExp(`<(${tagPattern})\\b[^>]*>([\\s\\S]*?)<\\/\\1>`, 'gi');
  return [...html.matchAll(re)]
    .map((match) => decodeEntities(stripTags(match[2]).replace(/\s+/g, ' ').trim()))
    .filter(Boolean);
}

function guessSectionType(heading, html, order) {
  const text = `${heading} ${stripTags(html)}`.toLowerCase();
  if (order === 0 || /hero|world'?s safest|wireless dog fence|gps dog fence/.test(text)) return 'hero';
  if (/faq|frequently asked|questions/.test(text)) return 'FAQ';
  if (/review|testimonial|stars|customers|rated/.test(text)) return 'proof/testimonial';
  if (/compare|versus|vs\.|difference|plan|membership/.test(text)) return 'comparison';
  if (/how it works|step \d|setup|install/.test(text)) return 'how-it-works';
  if (/app|ios|android|phone|screenshot/.test(text)) return 'app showcase';
  if (/shop|add to cart|collar|price|\$\d|buy now/.test(text)) return 'configurator';
  if (/feature|gps|fence|tracking|feedback|training|beacon/.test(text)) return 'feature overview';
  if (/save|discount|deal|offer|sale/.test(text)) return 'CTA';
  if (/footer|copyright|subscribe/.test(text)) return 'footer';
  return 'content';
}

function guessComponent(sectionType, heading) {
  const h = heading.toLowerCase();
  if (sectionType === 'hero') return 'HaloHeroSplitVideo';
  if (sectionType === 'FAQ') return 'HaloTabbedFAQ';
  if (sectionType === 'proof/testimonial') return 'HaloReviewProofSection';
  if (sectionType === 'comparison') return 'HaloComparisonSection';
  if (sectionType === 'how-it-works') return 'HaloHowItWorksGrid';
  if (sectionType === 'app showcase') return 'HaloAppFeatureCarousel';
  if (sectionType === 'configurator') return 'HaloProductConfigBuyStack';
  if (sectionType === 'CTA') return 'HaloPromoBanner';
  if (/beacon/.test(h)) return 'HaloBeaconFeatureCards';
  if (/training|cesar/.test(h)) return 'HaloVideoSpotlight';
  return 'HaloFeaturePillsShowcase';
}

function recommendSection(sectionType, heading, html) {
  const text = `${heading} ${stripTags(html)}`.toLowerCase();
  if (/out of stock|deprecated|legacy/.test(text)) return 'archive';
  if (/faq|review|testimonial|hero|shop|price|app|gps|tracking|training|feedback|beacon/.test(text)) return 'keep';
  if (sectionType === 'content') return 'merge';
  if (/missing|coming soon/.test(text)) return 'gap';
  return 'adapt';
}

function buildSectionNotes(sectionHtml, assetCount) {
  const markers = [];
  const idClass = sectionHtml.match(/<(section|div|main|article)\b[^>]*(?:id|class)=["']([^"']+)["']/i)?.[2];
  if (idClass) markers.push(`Nearby marker: ${idClass}`);
  markers.push(assetCount ? `${assetCount} hosted asset candidate(s).` : 'No hosted asset candidates found in this section window.');
  return markers.join(' ');
}

function guessUsage(sectionType, asset) {
  if (asset.assetType === 'tracking pixel') return 'tracking pixel';
  if (asset.sourceElement === 'video poster') return 'poster';
  if (asset.sourceElement === 'video' || asset.assetType === 'video') return 'background media';
  if (sectionType === 'hero') return asset.assetType === 'background' ? 'hero background' : 'hero media';
  if (sectionType === 'configurator') return 'product image';
  if (sectionType === 'proof/testimonial') return 'testimonial image';
  if (sectionType === 'comparison') return 'comparison image';
  if (sectionType === 'app showcase') return 'app screenshot';
  if (asset.assetType === 'svg' || asset.assetType === 'icon') return 'icon';
  return 'section media';
}

function shouldKeepAsset(asset, section) {
  if (asset.assetType === 'tracking pixel') return false;
  if (asset.sourceElement === 'inline SVG' && !asset.alt) return false;
  if (/logo|favicon|placeholder/i.test(asset.assetUrl) && section.sectionType !== 'hero') return false;
  return true;
}

function classifyAsset(url, sourceElement, sourceAttr) {
  const lower = url.toLowerCase();
  if (isTrackingPixel(url)) return 'tracking pixel';
  if (sourceElement === 'CSS background' || /background/i.test(sourceAttr || '')) return 'background';
  if (sourceElement === 'video-poster' || sourceAttr === 'poster') return 'poster';
  if (/\.(mp4|webm|mov|m4v)(\?|#|$)/.test(lower)) return 'video';
  if (/\.(svg)(\?|#|$)/.test(lower)) return /icon|logo|sprite/.test(lower) ? 'icon' : 'svg';
  if (/\.(png|jpe?g|webp|gif|avif)(\?|#|$)/.test(lower)) return 'image';
  if (/icon|sprite|logo/.test(lower)) return 'icon';
  return 'image';
}

function isTrackingPixel(url) {
  return /pixel|tracking|analytics|1x1|spacer|blank\.gif/i.test(url);
}

function parseAttrs(rawAttrs) {
  const attrs = {};
  for (const match of rawAttrs.matchAll(ATTR_RE)) {
    attrs[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? '';
  }
  return attrs;
}

function normalizeUrl(rawUrl, baseUrl) {
  try {
    const trimmed = rawUrl.trim();
    if (!trimmed || /^(javascript:|mailto:|tel:|blob:)/i.test(trimmed)) return '';
    const url = new URL(trimmed.startsWith('//') ? `https:${trimmed}` : trimmed, baseUrl);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return '';
    url.protocol = 'https:';
    if (url.hostname === 'halocollar.com') url.hostname = 'www.halocollar.com';
    return url.toString();
  } catch {
    return '';
  }
}

function normalizePageUrl(url) {
  const parsed = new URL(url);
  parsed.hash = '';
  parsed.search = '';
  if (!path.extname(parsed.pathname) && !parsed.pathname.endsWith('/')) parsed.pathname += '/';
  return parsed.toString();
}

function isHaloPageUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.hostname.endsWith('halocollar.com') && !/\.(png|jpe?g|webp|gif|svg|mp4|webm|pdf|zip)(\?|$)/i.test(parsed.pathname);
  } catch {
    return false;
  }
}

function dedupeAssets(assets) {
  const seen = new Map();
  for (const asset of assets) {
    const key = `${asset.assetUrl}|${asset.sectionId || ''}|${asset.pageUrl || ''}`;
    if (!seen.has(key)) seen.set(key, { ...asset });
  }
  return [...seen.values()];
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64);
}

function stripTags(value) {
  return value
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');
}

function decodeEntities(value) {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&mdash;/g, '-')
    .replace(/&ndash;/g, '-')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
