export default async function run(page) {
  const widths = [360, 390, 430];
  const out = {};

  for (const w of widths) {
    await page.setViewportSize({ width: w, height: 800 });
    await page.goto("http://localhost:4173/");
    await page.waitForTimeout(600);

    out[w] = await page.evaluate(() => {
      const docW = document.documentElement.clientWidth;
      const overflow = [];
      document.querySelectorAll("*").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width === 0) return;
        if (r.right > docW + 1 || r.left < -1) {
          const cls = (el.className || "").toString().slice(0, 55);
          overflow.push(
            el.tagName +
              "." +
              cls +
              " L" +
              Math.round(r.left) +
              " R" +
              Math.round(r.right),
          );
        }
      });
      return {
        scrollW: document.documentElement.scrollWidth,
        clientW: docW,
        overflow: overflow.slice(0, 12),
      };
    });
  }
  return out;
}
