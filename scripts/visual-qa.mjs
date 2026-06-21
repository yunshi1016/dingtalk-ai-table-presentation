import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";

const browser = await chromium.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});

const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
const consoleErrors = [];
page.on("console", (message) => {
  if (message.type() === "error") consoleErrors.push(message.text());
});
page.on("pageerror", (error) => consoleErrors.push(error.message));

await mkdir("qa/screens", { recursive: true });
await page.goto("http://127.0.0.1:5173", { waitUntil: "networkidle" });
await page.locator(".deck-stage").waitFor({ state: "visible" });

const slides = [];
for (let index = 0; index < 11; index += 1) {
  await page.waitForTimeout(500);
  const report = await page.evaluate(() => {
    const slide = document.querySelector(".slide");
    const heading = slide?.querySelector("h1, h2")?.textContent?.replace(/\s+/g, " ").trim();
    const badImages = [...document.images]
      .filter((image) => !image.complete || image.naturalWidth === 0)
      .map((image) => image.alt || image.src);
    const slideRect = slide?.getBoundingClientRect();
    const overflowingElements = slide && slideRect
      ? [...slide.children]
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            return (
              rect.left < slideRect.left - 1 ||
              rect.right > slideRect.right + 1 ||
              rect.top < slideRect.top - 1 ||
              rect.bottom > slideRect.bottom + 1
            );
          })
          .map((element) => element.className || element.tagName)
      : [];
    return {
      heading,
      overflowingElements,
      badImages,
    };
  });
  slides.push(report);
  await page.screenshot({
    path: `qa/screens/slide-${String(index + 1).padStart(2, "0")}.png`,
    fullPage: true,
  });
  if (index < 10) await page.keyboard.press("ArrowRight");
}

await page.keyboard.press("n");
const notesVisible = await page.locator(".notes-panel").isVisible();
await page.keyboard.press("n");
await page.keyboard.press("o");
const overviewVisible = await page.locator(".overview-panel").isVisible();
const overviewItems = await page.locator(".overview-grid button").count();
await page.keyboard.press("Escape");

await page.setViewportSize({ width: 390, height: 844 });
await page.keyboard.press("Home");
await page.waitForTimeout(350);
await page.screenshot({ path: "qa/screens/mobile-cover.png", fullPage: true });
const mobileCoverOverflow = await page.evaluate(() => ({
  bodyWidth: document.body.scrollWidth,
  viewportWidth: window.innerWidth,
}));

for (let index = 0; index < 4; index += 1) await page.keyboard.press("ArrowRight");
await page.waitForTimeout(350);
await page.screenshot({ path: "qa/screens/mobile-product.png", fullPage: true });

console.log(JSON.stringify({
  slides,
  consoleErrors,
  notesVisible,
  overviewVisible,
  overviewItems,
  mobileCoverOverflow,
}, null, 2));

await browser.close();
