# BAYONESS dashboard brand

Professional social news. Calm, credible, clean. Closer to Substack than Facebook.

Do not keep shadcn / Laravel default zinc + primary blue. Do not use Instrument Sans.

## Identity (do not change hex)

| Name | Hex | Role |
| --- | --- | --- |
| Navy | `#0D3B66` | Primary brand. Wordmarks, serious actions, filled navy buttons |
| Gold | `#D4AF37` | Accent. Rare. One primary CTA / achievement / Pro |
| Cream | `#F7F3E9` | Light-mode page background |
| Ink | `#0B2438` | Light-mode body text |
| Gray | `#6B7280` | Muted / secondary text |

Rules:

- Surfaces carry hierarchy. Navy and gold are not wallpaper.
- Gold is rare. One gold action per screen (Save featured / Upgrade). Active nav is not gold.
- Text on gold = navy `#0D3B66` (light) or `#0A0A0A` (dark). Never white on gold.
- Text on navy fills = cream `#F7F3E9` (`text-brand-solid-foreground`). This stays cream in both themes. Do not use `text-brand-foreground` on navy — in dark mode that token is `#0A0A0A`.
- Filled navy buttons stay `#0D3B66` in both themes (`brand-solid`).
- Verified tick is `#1F66FF` in both themes.
- Dark-mode success / warning / error / info stay display-bright, not washed pastels.
- Never invent names like `brand-teal` or `brand-orange`. Navy is brand. Gold is accent.

## Fonts

| Font | Use |
| --- | --- |
| Inter | All UI: nav, tables, forms, buttons, English titles |
| Kantumruy Pro | Khmer body / labels |
| Siemreap | Khmer titles / headings (`font-heading`) |
| Newsreader | Do not use in dashboard chrome |

Default stack: `Inter, Kantumruy Pro, ui-sans-serif, system-ui, sans-serif`.

## Theme

- Class strategy: `html.dark` / `html.light`
- Persist in `localStorage` key `bayoness-theme` = `light` | `dark` | `system`
- Body: `bg-surface-sunken text-foreground`

## Component mapping

| UI | Classes |
| --- | --- |
| App / page background | `bg-surface-sunken text-foreground` |
| Sidebar, cards, dialogs, tables | `bg-surface ring-1 ring-border` |
| Elevated hover / inputs | `bg-surface-elevated` |
| Primary button | `bg-brand-solid text-brand-solid-foreground hover:bg-brand-hover` |
| Accent button (one per page) | `bg-accent text-accent-foreground hover:bg-accent-hover` |
| Ghost / secondary | `border border-border text-foreground hover:bg-surface-elevated` |
| Active nav item | `bg-brand-soft text-brand` — not gold |
| Links | `text-brand hover:text-brand-hover` |
| Muted help text | `text-muted` or `text-subtle` |
| Danger | `text-error` / `bg-error` |
| Success chip | `text-success bg-success/10` |
| Verified author tick | Lucide `BadgeCheck` with `text-verified` |
| Inputs | `bg-surface border-border text-foreground focus:ring-2 focus:ring-ring` |

## Do not

- Use `bg-primary` / `text-primary` if primary is still default blue
- Use Tailwind `blue-500`, `amber-500`, `orange-500` as brand color
- Gold-highlight every selected table row
- Add a second English display font in nav or tables
- Fade verified / success / info in dark mode to pastel (`#93C5FD` is forbidden)
