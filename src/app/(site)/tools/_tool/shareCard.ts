import { SHAPES, type GlyphName } from '@/components/Glyph';

/*
 * Share cards drawn on a canvas in the brand look (Void ground, Marble type, our own glyphs),
 * then saved as a PNG. Fonts are the page's own, so the card waits for them to load.
 */

export function drawGlyph(ctx: CanvasRenderingContext2D, name: GlyphName, x: number, y: number, size: number, color: string, weight = 1.6) {
  const shape = SHAPES[name];
  ctx.save();
  ctx.translate(x - size / 2, y - size / 2);
  ctx.scale(size / 24, size / 24);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = weight;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  if (shape.d) ctx.stroke(new Path2D(shape.d));
  if (shape.f) ctx.fill(new Path2D(shape.f));
  for (const [cx, cy, r] of shape.circles ?? []) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  for (const [rx, ry, w, h] of shape.rects ?? []) ctx.strokeRect(rx, ry, w, h);
  for (const [cx, cy, r] of shape.dots ?? []) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

/** Reads a color token from the brand layer, so the card matches the site. */
export function token(name: string, fallback: string): string {
  const el = document.querySelector('.nm-void') ?? document.documentElement;
  return getComputedStyle(el).getPropertyValue(name).trim() || fallback;
}

/** Breaks text into lines that fit a width. */
export function wrapLines(ctx: CanvasRenderingContext2D, text: string, width: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (ctx.measureText(next).width > width && line) {
      lines.push(line);
      line = w;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

export async function saveCanvas(canvas: HTMLCanvasElement, filename: string) {
  const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, 'image/png'));
  if (!blob) return;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export async function fontsReady() {
  try {
    await Promise.all([document.fonts.load('400 80px "EB Garamond"'), document.fonts.load('400 24px "Geist Mono"')]);
  } catch {
    // the card falls back to Georgia
  }
}
