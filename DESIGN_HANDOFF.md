# ÉLORA Design Handoff

## Source

- Figma file: `ÉLORA Women's Fashion E-commerce UI UX`
- File key: `6J2OnVkmjZF7hHTWhuWqJ4`
- Page: `02 • Screens` (`6:56`)
- Access used: read-only. No Figma nodes were created or changed.

## Reference frames read for visual extraction

- `12:2` — Homepage / Desktop — 1440 × 3720
- `13:80` — Homepage / Mobile — 390 × 3400

These two frames were used to extract the responsive visual system. The remaining flows were implemented from their page inventory, shared components, and state patterns without repeated design-context reads.

## Top-level frame inventory

| # | Node ID | Frame | Size |
|---:|---|---|---|
| 1 | `12:2` | Homepage / Desktop | 1440 × 3720 |
| 2 | `13:80` | Homepage / Mobile | 390 × 3400 |
| 3 | `17:122` | Flow / Shop / Desktop | 1440 × 1760 |
| 4 | `17:350` | Flow / Product Detail / Desktop | 1440 × 1620 |
| 5 | `17:475` | Flow / Smart Search / Desktop | 1440 × 1120 |
| 6 | `17:561` | Flow / Wishlist / Desktop | 1440 × 1510 |
| 7 | `17:726` | Flow / Cart / Desktop | 1440 × 1380 |
| 8 | `17:809` | Flow / Checkout / Desktop | 1440 × 1580 |
| 9 | `17:922` | Flow / Shop / Mobile | 390 × 1740 |
| 10 | `17:1028` | Flow / Product Detail / Mobile | 390 × 1910 |
| 11 | `17:1079` | Flow / Cart / Mobile | 390 × 1510 |
| 12 | `17:1141` | Flow / Checkout / Mobile | 390 × 1810 |
| 13 | `30:410` | Flow / Login / Desktop | 1440 × 980 |
| 14 | `30:441` | Flow / Register / Desktop | 1440 × 1040 |
| 15 | `30:482` | Flow / OTP Verification / Desktop | 1440 × 900 |
| 16 | `30:510` | Flow / Account Overview / Desktop | 1440 × 1080 |
| 17 | `30:566` | Flow / Orders / Desktop | 1440 × 1220 |
| 18 | `30:622` | Flow / Order Tracking / Desktop | 1440 × 1120 |
| 19 | `30:680` | Flow / Returns / Desktop | 1440 × 1180 |

The page also contains grouped state boards for order, return, address-book, loading, offline, success, error, and 404 states. Those states are exposed as dedicated hash routes in the implementation.

## Visual system

### Color tokens

- Page: `#fff9f5`
- Card: `#ffffff`
- Soft surface: `#f6e7e2`
- Brand: `#6f2638`
- Strong brand: `#3d1220`
- Accent border: `#d9a7a0`
- Primary text: `#191416`
- Secondary text: `#756a6e`
- Default border: `#e8deda`

### Typography

- Display and headings: Playfair Display SemiBold
- Interface and body: DM Sans Regular / Medium / Bold
- Arabic interface: Noto Sans Arabic Regular / Medium / Bold
- Desktop display: 72/76
- Supporting displays: 52/58, 40/46, 30/36, 24/30
- Body: 18/28, 16/24, 14/21
- Labels: 12/16 bold, 14/20 medium

### Surfaces and motion

- Card radius: 18px
- Hero radius: 28px desktop, 24px mobile
- Primary buttons: pill radius
- Card shadow: `0 12px 32px -8px rgba(61,26,36,.12)`
- Floating shadow: `0 16px 48px -10px rgba(26,18,20,.16)`
- Motion is transform/opacity-led and uses the Figma palette's quiet premium character.

## Local assets

- 23 Figma-exported SVG assets are stored in `assets/images/decorative/`.
- GSAP, ScrollTrigger, Swiper, Fuse, and Lucide browser builds are stored in `assets/vendor/`.
- DM Sans, Playfair Display, and Noto Sans Arabic WOFF2 files are stored in `assets/fonts/`.
- No runtime asset or library requires a CDN.
