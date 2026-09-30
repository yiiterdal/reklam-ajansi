import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const out = path.resolve(".tmp-about-shots");
fs.mkdirSync(out, { recursive: true });
const base = process.env.BASE_URL || "http://127.0.0.1:3000";

const browser = await chromium.launch();
for (const [label, opts] of [
  ["desktop", { viewport: { width: 1440, height: 900 } }],
  ["mobile", { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }],
]) {
  const page = await (await browser.newContext(opts)).newPage();
  await page.goto(base + "/portfolio", { waitUntil: "domcontentloaded", timeout: 120000 });
  await page.waitForTimeout(2500);
  const top = await page.evaluate(() => {
    const el = [...document.querySelectorAll("h2")].find((h) => h.textContent?.includes("Depth"));
    return el ? el.getBoundingClientRect().top + window.scrollY - 80 : 900;
  });
  const total = await page.evaluate(() => document.body.scrollHeight);
  for (let i = 0; i < 7; i++) {
    const y = Math.min(top + i * (label === "desktop" ? 800 : 780), total);
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(1800);
    await page.screenshot({ path: path.join(out, `portfolio-${label}-${i}.jpg`), type: "jpeg", quality: 75 });
  }
  console.log("shot", label);
}
await browser.close();
