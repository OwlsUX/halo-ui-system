import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const manifestPath = path.join(root, "data", "accessory-image-assets.json");
const targetPages = [
  "pages/accessories.html",
  "pages/modern-accessories.html",
  "pages/modern-accessory-pdp.html",
];
const targetStyles = [
  "css/accessories-page.css",
  "modern-commerce/modern-commerce.css",
];
const requiredProducts = [
  "Zone Beacon",
  "Remote Beacon",
  "Pro Case",
  "Collar Strap for Halo Collar 4/5",
  "Collar Strap for Halo Collar 1/2/2+/3",
  "Contact Tip Kit",
  "Charging Stand",
  "Charging Kit for Halo Collar 4/5",
  "Charging Kit for Halo Collar 1/2/2+/3",
  "Halo T-Shirt",
  "Lawn Signs",
];
const knownSourceUrls = [
  "https://www.halocollar.com/wp-content/uploads/2024/01/product_zone_beacon_pdp.webp",
  "https://www.halocollar.com/wp-content/uploads/2024/01/product_remote_beacon_pdp.webp",
  "https://d252xzqwj6utz.cloudfront.net/static/h5/main-pro-case-s.webp",
  "https://www.halocollar.com/wp-content/uploads/2024/09/accessories-h4-strap.webp",
  "https://www.halocollar.com/wp-content/uploads/2023/08/CollarStrap.webp",
  "https://www.halocollar.com/wp-content/uploads/2023/08/Contact-Tips.webp",
  "https://www.halocollar.com/wp-content/uploads/2025/05/halo-shop-charging-stand-2505.webp",
  "https://www.halocollar.com/wp-content/uploads/2024/09/accessories-h4-charger.webp",
  "https://d252xzqwj6utz.cloudfront.net/wp-content/uploads/2023/08/11084903/ChargingKit_HC3_Magnetic_noblock.webp",
  "https://www.halocollar.com/wp-content/uploads/2023/11/Tshirt.webp",
  "https://www.halocollar.com/wp-content/uploads/2024/04/lawn-sign-row.webp",
];
const allowedStatuses = new Set([
  "transparent",
  "fallback-clean-crop",
  "needs-manual-retouch",
]);

const failures = [];

function fail(message) {
  failures.push(message);
}

function readText(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function parsePngHeader(filePath) {
  const data = fs.readFileSync(filePath);
  const pngSignature = "89504e470d0a1a0a";
  if (data.subarray(0, 8).toString("hex") !== pngSignature) {
    return null;
  }
  return {
    width: data.readUInt32BE(16),
    height: data.readUInt32BE(20),
    colorType: data.readUInt8(25),
  };
}

if (!fs.existsSync(manifestPath)) {
  fail(`Missing manifest: ${path.relative(root, manifestPath)}`);
} else {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const entries = Array.isArray(manifest.products) ? manifest.products : manifest;
  if (!Array.isArray(entries)) {
    fail("Manifest must be an array or an object with a products array.");
  } else {
    const byName = new Map(entries.map((entry) => [entry.productName, entry]));
    for (const name of requiredProducts) {
      if (!byName.has(name)) {
        fail(`Missing manifest product: ${name}`);
      }
    }

    for (const entry of entries) {
      if (!entry.productName) {
        fail("Manifest entry missing productName.");
      }
      if (!allowedStatuses.has(entry.processingStatus)) {
        fail(`${entry.productName}: invalid processingStatus '${entry.processingStatus}'.`);
      }
      if (!entry.processedAssetPath) {
        fail(`${entry.productName}: missing processedAssetPath.`);
        continue;
      }

      const assetPath = path.join(root, entry.processedAssetPath.replace(/^\.\.\//, ""));
      if (!fs.existsSync(assetPath)) {
        fail(`${entry.productName}: missing asset ${entry.processedAssetPath}`);
        continue;
      }

      const header = parsePngHeader(assetPath);
      if (!header) {
        fail(`${entry.productName}: processed asset must be a PNG for alpha verification.`);
        continue;
      }
      if (header.width !== 1200 || header.height !== 900) {
        fail(`${entry.productName}: expected 1200x900 PNG, got ${header.width}x${header.height}.`);
      }
      if (![4, 6].includes(header.colorType)) {
        fail(`${entry.productName}: PNG is missing an alpha channel.`);
      }
      if (!entry.outputDimensions || entry.outputDimensions.width !== header.width || entry.outputDimensions.height !== header.height) {
        fail(`${entry.productName}: outputDimensions do not match the PNG header.`);
      }
    }
  }
}

for (const page of targetPages) {
  const html = readText(page);
  for (const sourceUrl of knownSourceUrls) {
    if (html.includes(sourceUrl)) {
      fail(`${page}: still references source accessory URL ${sourceUrl}`);
    }
  }

  const localRefs = [...html.matchAll(/\b(?:src|data-image|data-product-image)="([^":#?][^"]*)"/g)]
    .map((match) => match[1])
    .filter((ref) => /\.(?:svg|png|jpe?g|webp)(?:[?#]|$)/i.test(ref));
  for (const ref of localRefs) {
    if (!ref.startsWith("../")) {
      continue;
    }
    const cleanRef = ref.split(/[?#]/, 1)[0];
    const resolved = path.resolve(path.join(root, path.dirname(page)), cleanRef);
    if (!resolved.startsWith(root) || !fs.existsSync(resolved)) {
      fail(`${page}: missing local image reference ${ref}`);
    }
  }
}

for (const stylesheet of targetStyles) {
  const css = readText(stylesheet);
  if (!css.includes("--halo-color-surface-product")) {
    fail(`${stylesheet}: should use --halo-color-surface-product for product media surfaces.`);
  }
  if (!css.includes("object-fit: contain")) {
    fail(`${stylesheet}: missing object-fit: contain support.`);
  }
  if (!css.includes("aspect-ratio")) {
    fail(`${stylesheet}: missing stable media aspect-ratio support.`);
  }
}

if (failures.length) {
  console.error(`Accessory image verification failed with ${failures.length} issue(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Accessory image verification passed.");
