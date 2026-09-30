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
  await page.goto(base + "/about", { waitUntil: "domcontentloaded", timeout: 120000 });
  await page.waitForTimeout(2500);
  const h = await page.evaluate(() => document.querySelector("main main > div")?.getBoundingClientRect().height ?? 3000);
  const steps = [0, 0.14, 0.28, 0.42, 0.56, 0.7, 0.84, 0.97];
  for (let i = 0; i < steps.length; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(h * steps[i]));
    await page.waitForTimeout(1800);
    await page.screenshot({ path: path.join(out, `${label}-${i}.jpg`), type: "jpeg", quality: 80 });
  }
  console.log("shot", label, h);
}
await browser.close();
