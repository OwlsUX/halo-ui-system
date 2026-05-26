#!/usr/bin/env python3
from __future__ import annotations

import json
import math
import re
import time
from collections import deque
from io import BytesIO
from pathlib import Path
from urllib.request import Request, urlopen

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "assets" / "accessories" / "source"
PROCESSED_DIR = ROOT / "assets" / "accessories" / "processed"
MANIFEST_PATH = ROOT / "data" / "accessory-image-assets.json"
CONTACT_SHEET_PATH = ROOT / "screenshots" / "accessory-image-contact-sheet.png"
CANVAS_SIZE = (1200, 900)
PRODUCT_SURFACE = (244, 247, 249)


PRODUCTS = [
    {
        "name": "Zone Beacon",
        "slug": "zone-beacon",
        "group": "beacons",
        "url": "https://www.halocollar.com/wp-content/uploads/2024/01/product_zone_beacon_pdp.webp",
        "preferred_source": "assets/accessories/originals/zone-beacon--product-zone-beacon-l.webp",
        "max_width": 0.84,
        "max_height": 0.84,
        "threshold": 32,
        "align": "center",
        "notes": "Small beacon scaled up for presence and centered in the 4:3 product media window.",
    },
    {
        "name": "Remote Beacon",
        "slug": "remote-beacon",
        "group": "beacons",
        "url": "https://www.halocollar.com/wp-content/uploads/2024/01/product_remote_beacon_pdp.webp",
        "preferred_source": "assets/accessories/originals/remote-beacon--product-remote-beacon-l.webp",
        "max_width": 0.84,
        "max_height": 0.84,
        "threshold": 32,
        "align": "center",
        "notes": "Small remote beacon scaled up for presence and centered in the 4:3 product media window.",
    },
    {
        "name": "Pro Case",
        "slug": "pro-case",
        "group": "fit",
        "url": "https://d252xzqwj6utz.cloudfront.net/static/h5/main-pro-case-s.webp",
        "max_width": 0.78,
        "max_height": 0.72,
        "threshold": 28,
        "align": "center",
        "notes": "Existing alpha preserved, with moderate scale so the protective case reads like hardware.",
    },
    {
        "name": "Collar Strap for Halo Collar 4/5",
        "slug": "collar-strap-45",
        "group": "fit",
        "url": "https://www.halocollar.com/wp-content/uploads/2024/09/accessories-h4-strap.webp",
        "max_width": 0.70,
        "max_height": 0.62,
        "threshold": 28,
        "align": "center",
        "notes": "Wide strap kept below beacon scale to avoid filling the card edge to edge.",
    },
    {
        "name": "Collar Strap for Halo Collar 1/2/2+/3",
        "slug": "collar-strap-123",
        "group": "fit",
        "url": "https://www.halocollar.com/wp-content/uploads/2023/08/CollarStrap.webp",
        "max_width": 0.70,
        "max_height": 0.62,
        "threshold": 34,
        "align": "center",
        "notes": "Legacy wide strap centered with similar visual footprint to the current strap.",
    },
    {
        "name": "Contact Tip Kit",
        "slug": "contact-tip-kit",
        "group": "fit",
        "url": "https://www.halocollar.com/wp-content/uploads/2023/08/Contact-Tips.webp",
        "max_width": 0.86,
        "max_height": 0.78,
        "threshold": 34,
        "align": "center",
        "notes": "Small replacement parts scaled up so they do not float in the card.",
    },
    {
        "name": "Charging Stand",
        "slug": "charging-stand",
        "group": "charging",
        "url": "https://www.halocollar.com/wp-content/uploads/2025/05/halo-shop-charging-stand-2505.webp",
        "max_width": 0.76,
        "max_height": 0.82,
        "threshold": 34,
        "align": "base",
        "notes": "Dock product uses bottom alignment so its base feels stable across card sizes.",
    },
    {
        "name": "Charging Kit for Halo Collar 4/5",
        "slug": "charging-kit-45",
        "group": "charging",
        "url": "https://www.halocollar.com/wp-content/uploads/2024/09/accessories-h4-charger.webp",
        "max_width": 0.80,
        "max_height": 0.76,
        "threshold": 34,
        "align": "center",
        "notes": "Current charging kit centered and scaled as a medium hardware accessory.",
    },
    {
        "name": "Charging Kit for Halo Collar 1/2/2+/3",
        "slug": "charging-kit-123",
        "group": "charging",
        "url": "https://d252xzqwj6utz.cloudfront.net/wp-content/uploads/2023/08/11084903/ChargingKit_HC3_Magnetic_noblock.webp",
        "max_width": 0.80,
        "max_height": 0.76,
        "threshold": 34,
        "align": "center",
        "notes": "Legacy charging kit centered and scaled to match the current kit.",
    },
    {
        "name": "Halo T-Shirt",
        "slug": "halo-t-shirt",
        "group": "merch",
        "url": "https://www.halocollar.com/wp-content/uploads/2023/11/Tshirt.webp",
        "max_width": 0.72,
        "max_height": 0.78,
        "threshold": 32,
        "align": "center",
        "notes": "Apparel is intentionally smaller than hardware so it reads as merch.",
    },
    {
        "name": "Lawn Signs",
        "slug": "lawn-signs",
        "group": "merch",
        "url": "https://www.halocollar.com/wp-content/uploads/2024/04/lawn-sign-row.webp",
        "max_width": 0.68,
        "max_height": 0.72,
        "threshold": 28,
        "align": "base",
        "notes": "Wide sign row is constrained to keep the merch card from feeling oversized.",
    },
]


def slugify(value: str) -> str:
    value = value.lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


def relative_to_root(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def download(url: str, output_path: Path) -> None:
    if output_path.exists() and output_path.stat().st_size > 0:
        return
    request = Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urlopen(request, timeout=60) as response:
        output_path.write_bytes(response.read())
    time.sleep(0.15)


def source_extension(url: str) -> str:
    suffix = Path(url.split("?", 1)[0]).suffix.lower()
    return suffix if suffix else ".img"


def useful_alpha_fraction(image: Image.Image) -> float:
    rgba = image.convert("RGBA")
    alpha = rgba.getchannel("A")
    histogram = alpha.histogram()
    transparent = sum(histogram[:250])
    return transparent / float(rgba.width * rgba.height)


def estimate_background(pixels, width: int, height: int) -> tuple[int, int, int]:
    samples = []
    step = max(1, min(width, height) // 80)
    for x in range(0, width, step):
        samples.append(pixels[x, 0][:3])
        samples.append(pixels[x, height - 1][:3])
    for y in range(0, height, step):
        samples.append(pixels[0, y][:3])
        samples.append(pixels[width - 1, y][:3])
    channels = []
    for index in range(3):
        channels.append(sorted(sample[index] for sample in samples)[len(samples) // 2])
    return tuple(channels)


def close_to_background(pixel, bg: tuple[int, int, int], threshold: int) -> bool:
    r, g, b, a = pixel
    if a == 0:
        return True
    return max(abs(r - bg[0]), abs(g - bg[1]), abs(b - bg[2])) <= threshold


def flood_background_mask(rgba: Image.Image, threshold: int) -> Image.Image:
    width, height = rgba.size
    pixels = rgba.load()
    bg = estimate_background(pixels, width, height)
    visited = bytearray(width * height)
    background = bytearray(width * height)
    queue: deque[tuple[int, int]] = deque()

    def index_for(x: int, y: int) -> int:
        return y * width + x

    def enqueue_if_background(x: int, y: int) -> None:
        index = index_for(x, y)
        if visited[index]:
            return
        visited[index] = 1
        if close_to_background(pixels[x, y], bg, threshold):
            background[index] = 1
            queue.append((x, y))

    for x in range(width):
        enqueue_if_background(x, 0)
        enqueue_if_background(x, height - 1)
    for y in range(height):
        enqueue_if_background(0, y)
        enqueue_if_background(width - 1, y)

    while queue:
        x, y = queue.popleft()
        if x > 0:
            enqueue_if_background(x - 1, y)
        if x < width - 1:
            enqueue_if_background(x + 1, y)
        if y > 0:
            enqueue_if_background(x, y - 1)
        if y < height - 1:
            enqueue_if_background(x, y + 1)

    mask = Image.new("L", (width, height), 0)
    mask.putdata([255 if value else 0 for value in background])
    return mask


def remove_solid_background(rgba: Image.Image, threshold: int) -> Image.Image:
    bg_mask = flood_background_mask(rgba, threshold)
    foreground = ImageChops.invert(bg_mask)
    foreground = foreground.filter(ImageFilter.GaussianBlur(radius=0.7))
    alpha = ImageChops.multiply(rgba.getchannel("A"), foreground)
    output = rgba.copy()
    output.putalpha(alpha)
    return output


def trim_transparent(image: Image.Image) -> Image.Image:
    alpha = image.getchannel("A")
    bbox = alpha.point(lambda value: 255 if value > 8 else 0).getbbox()
    if not bbox:
        return image
    pad_x = max(8, math.ceil((bbox[2] - bbox[0]) * 0.025))
    pad_y = max(8, math.ceil((bbox[3] - bbox[1]) * 0.025))
    crop = (
        max(0, bbox[0] - pad_x),
        max(0, bbox[1] - pad_y),
        min(image.width, bbox[2] + pad_x),
        min(image.height, bbox[3] + pad_y),
    )
    return image.crop(crop)


def normalize_to_canvas(image: Image.Image, product: dict) -> Image.Image:
    cropped = trim_transparent(image)
    max_width = int(CANVAS_SIZE[0] * product["max_width"])
    max_height = int(CANVAS_SIZE[1] * product["max_height"])
    ratio = min(max_width / cropped.width, max_height / cropped.height)
    output_size = (
        max(1, round(cropped.width * ratio)),
        max(1, round(cropped.height * ratio)),
    )
    resized = cropped.resize(output_size, Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", CANVAS_SIZE, (255, 255, 255, 0))
    x = (CANVAS_SIZE[0] - resized.width) // 2
    if product.get("align") == "base":
        y = int(CANVAS_SIZE[1] * 0.86) - resized.height
        y = max(24, min(y, CANVAS_SIZE[1] - resized.height - 24))
    else:
        y = (CANVAS_SIZE[1] - resized.height) // 2
    canvas.alpha_composite(resized, (x, y))
    return canvas


def process_product(product: dict) -> dict:
    source_path = SOURCE_DIR / f"{product['slug']}{source_extension(product['url'])}"
    output_path = PROCESSED_DIR / f"{product['slug']}.png"
    download(product["url"], source_path)

    preferred_source = product.get("preferred_source")
    processing_source = ROOT / preferred_source if preferred_source and (ROOT / preferred_source).exists() else source_path

    source = ImageOps.exif_transpose(Image.open(processing_source))
    source.thumbnail((1100, 1100), Image.Resampling.LANCZOS)
    rgba = source.convert("RGBA")

    alpha_fraction = useful_alpha_fraction(rgba)
    used_existing_alpha = alpha_fraction > 0.02
    if used_existing_alpha:
        transparent = rgba
        method = "Pillow: preserved existing source alpha, then cropped and padded to normalized transparent canvas."
        status = "transparent"
    else:
        transparent = remove_solid_background(rgba, int(product["threshold"]))
        method = "Pillow: border-connected solid background mask, alpha feather, crop, and normalized transparent canvas."
        status = "transparent"

    normalized = normalize_to_canvas(transparent, product)
    normalized.save(output_path, "PNG", optimize=True)

    return {
        "productName": product["name"],
        "sourceUrl": product["url"],
        "originalPath": relative_to_root(processing_source),
        "pageSourcePath": relative_to_root(source_path),
        "processedAssetPath": relative_to_root(output_path),
        "outputDimensions": {"width": CANVAS_SIZE[0], "height": CANVAS_SIZE[1]},
        "intendedCardGroup": product["group"],
        "scalePlacementNotes": product["notes"],
        "processingStatus": status,
        "processingMethod": method,
    }


def make_bundle(entries_by_slug: dict[str, dict], processed_by_slug: dict[str, Image.Image]) -> dict:
    output_path = PROCESSED_DIR / "daily-care-kit.png"
    canvas = Image.new("RGBA", CANVAS_SIZE, (255, 255, 255, 0))
    placements = [
        ("charging-stand", 0.53, (230, 55)),
        ("collar-strap-45", 0.43, (475, 380)),
        ("contact-tip-kit", 0.30, (715, 390)),
    ]
    for slug, scale, (x, y) in placements:
        source = trim_transparent(processed_by_slug[slug])
        target = (round(source.width * scale), round(source.height * scale))
        item = source.resize(target, Image.Resampling.LANCZOS)
        canvas.alpha_composite(item, (x, y))
    canvas.save(output_path, "PNG", optimize=True)

    source_urls = [
        entries_by_slug["charging-stand"]["sourceUrl"],
        entries_by_slug["collar-strap-45"]["sourceUrl"],
        entries_by_slug["contact-tip-kit"]["sourceUrl"],
    ]
    return {
        "productName": "Daily Care Kit",
        "sourceUrl": "Composite from Charging Stand, Collar Strap for Halo Collar 4/5, and Contact Tip Kit processed assets.",
        "sourceUrls": source_urls,
        "originalPath": "Composite generated from processed transparent product assets.",
        "processedAssetPath": relative_to_root(output_path),
        "outputDimensions": {"width": CANVAS_SIZE[0], "height": CANVAS_SIZE[1]},
        "intendedCardGroup": "bundles",
        "scalePlacementNotes": "Bundle composite keeps the dock dominant with strap and tips secondary, all on transparent canvas.",
        "processingStatus": "transparent",
        "processingMethod": "Pillow: transparent composite assembled from normalized processed product assets.",
    }


def create_contact_sheet(entries: list[dict]) -> None:
    cols = 4
    tile_w = 440
    tile_h = 370
    label_h = 58
    rows = math.ceil(len(entries) / cols)
    sheet = Image.new("RGB", (cols * tile_w, rows * tile_h), (255, 255, 255))
    draw = ImageDraw.Draw(sheet)
    try:
        font = ImageFont.truetype("Arial.ttf", 20)
    except OSError:
        font = ImageFont.load_default()

    for index, entry in enumerate(entries):
        col = index % cols
        row = index // cols
        x0 = col * tile_w
        y0 = row * tile_h
        draw.rectangle([x0, y0, x0 + tile_w - 1, y0 + tile_h - 1], fill=PRODUCT_SURFACE, outline=(220, 228, 235))
        asset = Image.open(ROOT / entry["processedAssetPath"]).convert("RGBA")
        asset.thumbnail((tile_w - 56, tile_h - label_h - 32), Image.Resampling.LANCZOS)
        x = x0 + (tile_w - asset.width) // 2
        y = y0 + 18 + (tile_h - label_h - 32 - asset.height) // 2
        sheet.paste(asset, (x, y), asset)
        draw.rectangle([x0, y0 + tile_h - label_h, x0 + tile_w, y0 + tile_h], fill=(255, 255, 255))
        draw.text((x0 + 16, y0 + tile_h - label_h + 15), entry["productName"], fill=(24, 31, 38), font=font)

    sheet.save(CONTACT_SHEET_PATH, "PNG")


def main() -> None:
    SOURCE_DIR.mkdir(parents=True, exist_ok=True)
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
    MANIFEST_PATH.parent.mkdir(parents=True, exist_ok=True)
    CONTACT_SHEET_PATH.parent.mkdir(parents=True, exist_ok=True)

    entries = []
    entries_by_slug = {}
    processed_by_slug = {}
    for product in PRODUCTS:
        entry = process_product(product)
        entries.append(entry)
        entries_by_slug[product["slug"]] = entry
        processed_by_slug[product["slug"]] = Image.open(ROOT / entry["processedAssetPath"]).convert("RGBA")

    bundle = make_bundle(entries_by_slug, processed_by_slug)
    entries.append(bundle)

    manifest = {
        "generatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "tooling": "Python Pillow local processing; no background-removal model was available.",
        "canvas": {"width": CANVAS_SIZE[0], "height": CANVAS_SIZE[1], "format": "PNG RGBA"},
        "products": entries,
    }
    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2) + "\n")
    create_contact_sheet(entries)
    print(f"Processed {len(entries)} accessory product entries.")
    print(f"Manifest: {relative_to_root(MANIFEST_PATH)}")
    print(f"Contact sheet: {relative_to_root(CONTACT_SHEET_PATH)}")


if __name__ == "__main__":
    main()
