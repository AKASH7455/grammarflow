import { chromium } from 'playwright';
const widths = [320,360,375,390,414,480,576,768,820,912,1024,1280,1366,1440,1600,1920];
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const results = [];
for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  await page.goto('http://127.0.0.1:5180', { waitUntil: 'networkidle' });
  const metrics = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    bodyScrollWidth: document.body.scrollWidth,
    docScrollWidth: document.documentElement.scrollWidth,
  }));
  results.push({ width, overflow: Math.max(metrics.bodyScrollWidth, metrics.docScrollWidth) - metrics.innerWidth });
  await page.close();
}
await browser.close();
console.log(JSON.stringify(results, null, 2));