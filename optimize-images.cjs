/**
 * Otimiza as fotos da galeria.
 *
 * Gera, para cada original:
 *   <nome>-800.webp / -1600.webp  (WebP, qualidade alta)
 *   <nome>-800.jpg  / -1600.jpg   (fallback JPEG)
 *
 * Os originais têm no máximo 1280px de lado menor, então NÃO há ganho
 * real em ampliar: o script nunca upscaleia, apenas reencodeia com
 * mozjpeg + subsampling 4:4:4 (melhor para fotos de vegetação/detalhe).
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "src", "assets");
const OUT = path.join(__dirname, "public", "galeria");

const WIDTHS = [800, 1600];
const SKIP = /^logo-/i;

async function processFile(file) {
  const name = path.basename(file, path.extname(file));
  const input = path.join(SRC, file);

  const meta = await sharp(input).metadata();
  // Maior largura útil sem fazer upscale.
  const maxW = Math.max(...WIDTHS);
  const allowUpscale = meta.width >= maxW;

  const targets = WIDTHS.filter((w) => w < meta.width || allowUpscale);
  if (targets.length === 0) targets.push(meta.width);

  const results = [];
  for (const w of targets) {
    const pipeline = () =>
      sharp(input)
        .rotate() // respeita EXIF
        .resize({ width: w, withoutEnlargement: true, kernel: "lanczos3" })
        .modulate({ saturation: 1.04 }) // devolve o verde da lavoura
        .sharpen({ sigma: 0.6 }); // nitidez leve após o downscale

    const webp = path.join(OUT, `${name}-${w}.webp`);
    await pipeline().webp({ quality: 84, effort: 6 }).toFile(webp);

    const jpg = path.join(OUT, `${name}-${w}.jpg`);
    await pipeline()
      .jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: "4:4:4" })
      .toFile(jpg);

    results.push({
      file: `${name}-${w}`,
      webp: (fs.statSync(webp).size / 1024).toFixed(0) + "KB",
      jpg: (fs.statSync(jpg).size / 1024).toFixed(0) + "KB",
    });
  }
  return { name, from: `${meta.width}x${meta.height}`, results };
}

(async () => {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  const files = fs
    .readdirSync(SRC)
    .filter((f) => /\.(jpe?g|png)$/i.test(f) && !SKIP.test(f));

  let before = 0;
  let after = 0;
  for (const f of files) before += fs.statSync(path.join(SRC, f)).size;

  for (const f of files) {
    const r = await processFile(f);
    console.log(`\n${r.name}  (${r.from})`);
    for (const x of r.results) {
      console.log(
        `   ${x.file.padEnd(34)} webp ${x.webp.padStart(7)}  jpg ${x.jpg.padStart(7)}`,
      );
      after += parseFloat(x.webp) * 1024 + parseFloat(x.jpg) * 1024;
    }
  }

  console.log(
    `\nOrigem: ${(before / 1024 / 1024).toFixed(2)} MB  ->  Gerado: ${(
      after /
      1024 /
      1024
    ).toFixed(2)} MB (todas as variantes)`,
  );
})();
