# Astronomads brand guideline

**Night and marble.** Astronomads looks like a classical inscription set against the night sky: black and white, a carved Roman wordmark, a calm book serif for what matters, a typewriter-like mono for everything else, and one astral blue that stands for the sky. Pictures are drawn in dots, like stars.

The live reference is the `/brand` page in the app. Tokens live in `src/app/brand/brand.module.css` until the whole app moves over.

## 1. Principles

1. **Two grounds.** Every section is either Void (black) or Marble (white). Never gray, never gradients.
2. **One accent.** Astral appears once or twice per screen: a statement line, a primary button, a dot field. Planet colors are the only other colors, and they live inside charts.
3. **Brackets hold things.** Content groups sit in bracket frames, not in boxes. No card shadows.
4. **Dots draw pictures.** Images are stippled point clouds (statues, planets, star fields), never photos.
5. **Quiet type, big moments.** Mono for reading, serif for meaning, the carved wordmark for the brand.

## 2. Logo and wordmark

- **Wordmark:** `ASTRONOMADS` in Cinzel 500, all capitals, letter spacing 0.04em, with an inline cut: each letter is solid white, with a thin line in the ground color (about 1.2% of the size) cut just inside its strokes, 0.028em to the right, like letters carved in marble.
- **Sizes:** 24px in navigation, 56 to 96px in a hero, full width (about 10.6vw) as a footer signature.
- **Clear space:** the height of the letter O on every side.
- **Grounds:** white on Void, black on Marble. Never on Astral, never on a photo.
- **Symbol:** the eight-point star in a ring (current app header) stays as the small mark for favicons and avatars.

## 3. Color

| Token | Value | Use |
|---|---|---|
| `--void` | `#000000` | Dark sections, text on Marble |
| `--marble` | `#FFFFFF` | Light sections, text on Void |
| `--astral` | `#6A62F7` | The one accent: statement lines on Marble, primary buttons, accent dot fields |
| `--astral-ink` | `#4B42E0` | Astral text on Marble when it must pass contrast at small sizes |
| `--stone` | `#A6A6A6` | Secondary text on Void |
| `--ash` | `#5E5E5E` | Secondary text on Marble |
| `--rule-void` | `rgba(255,255,255,.22)` | Hairlines on Void |
| `--rule-marble` | `rgba(0,0,0,.14)` | Hairlines on Marble |
| `--glass` | `rgba(255,255,255,.5)` + `blur(7.5px)` | Floating navigation only |

Contrast: white on Void and black on Marble are 21:1. Astral `#6A62F7` on Marble is 4.6:1, fine for 18px and up; use `--astral-ink` below that. Astral on Void is 4.5:1.

Planet, element and aspect colors keep their current tokens (`--p-*`, `--el-*`, `--asp-*`) and appear only inside charts and planet tables.

## 4. Typography

All fonts are free on Google Fonts.

| Role | Font | Size / line height | Tracking | Notes |
|---|---|---|---|---|
| Wordmark, signature | Cinzel 500 | 24 to 96px, footer 13vw | 0.04em | All capitals, inline cut |
| Hero headline | EB Garamond 400 | 36 to 56px / 1.05 | -0.01em | White on Void |
| Statement | EB Garamond 400 | 40 to 48px / 1.05 | -0.01em | Astral on Marble, once per page |
| Section title | EB Garamond 400 | 48px / 1.05 | -0.01em | |
| Card title | EB Garamond 400 | 24px / 1.2 | 0 | |
| Quote | EB Garamond 400 | 24px / 1.0 | 0 | |
| Body | Geist Mono 400 | 16 to 18px / 1.3 | -0.02em | Max 62 characters a line |
| Label, eyebrow | Geist Mono 400 | 12 to 14px / 1 | -0.02em | All capitals |
| Navigation | Geist Mono 400 | 12px / 1 | -0.02em | All capitals |
| Micro, legal | Geist Mono 400 | 11 to 12px / 1.2 | -0.01em | |
| Degrees, data | Geist Mono 500 | as needed | 0 | Tabular numbers |

Rules: serif for meaning, mono for information. Never bold the serif; emphasis comes from size or Astral. No italics in the interface.

## 5. Layout and spacing

- **Grid:** 4px base. Side gutter 20px on phones, 20 to 32px on desktop. Full-bleed sections, content up to 1440px.
- **Section rhythm:** 120px padding top and bottom on desktop, 72px on phones. Each section opens with a label (`PRACTICE AREAS` style), then a serif title, then content.
- **Two-column story:** text on the left (up to 620px), dot imagery bleeding off the right edge.
- **Corners:** frames and sections are square. Pills are fully round. Small controls (inputs) use 10px.
- **Shadows:** none, except the floating navigation's soft 30px glow.

## 6. Components

**Bracket frame.** A 2px vertical line on each side with an 8px serif at its top and bottom, no top or bottom border. Used for the hero, cards, quotes and the contact block. White on Void, black on Marble. Inner padding 20px.

**Floating navigation.** Fixed at the bottom center, 24px from the bottom. Glass pill (radius 24px, padding 6px). Items are 40px tall pills with 12px mono capitals; hover darkens text, the current page shows a 15% white fill, and the last item is the Astral call to action.

**Buttons.**
- Primary: Astral pill, white 12px mono capitals, 44px tall, 22px side padding.
- Secondary on Void: white at 15% with glass blur, white text.
- Secondary on Marble: 1px black outline pill.
- Press: scale 0.98. No other button styles.

**Fields.** Marble ground, 1px `--rule-marble` border, radius 10px, 44px tall, 16px mono text. Focus: 1px black border and a 3px Astral ring at 30%.

**Cards.** Bracket frame, serif title top left, mono description in a second column on desktop (stacks on phones).

**Quotes.** Bracket frame, serif quote 24px, mono attribution 16px below.

**Footer signature.** The wordmark across the full width, Astral dot field behind, mono links in one row underneath.

**Chart wheel.** On Marble: black rings and lines. On Void: white rings and lines. Planet colors stay as they are. The wheel sits inside a bracket frame, never a shadowed card.

## 7. Imagery: stippled point clouds

- **Subjects:** classical busts and statues, planets, constellations, star fields. Always our own renders.
- **Source for statues:** public-domain 3D scans of classical sculpture from museum open-access collections, sampled into points. Check each file's license before use.
- **Dots:** 1.5 to 3px, density follows light and form (dense on lit faces, sparse in shadow).
- **Color:** white on Void, black on Marble, Astral on Void for the sky and the footer.
- **Motion:** slow drift or rotation (a full turn in 60 seconds or more), stops under reduced motion.

## 8. Motion

- Headlines rise in word by word (85ms per word, 850ms each).
- Sections fade up 12px as they enter.
- Dot clouds drift slowly; the cursor can gently push nearby dots.
- Nav pills change color in 200ms.
- Everything stops under `prefers-reduced-motion`.

## 9. Voice

Short, plain, confident sentences. Talk about the person's sky, not about astrology as a subject. Name things by what people know: "Your chart", "Today", "Compatibility". Labels in capitals, sentences in sentence case.

## 10. Running cost

Fonts (Cinzel, EB Garamond, Geist Mono) are free under the Open Font License. Stippled images are rendered once in the browser from point data. Adds $0 a month at Beta and Growth.
