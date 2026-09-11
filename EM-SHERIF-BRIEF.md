# Em Sherif Restaurant — Website Build Brief & AI Prompt

Paste the **PROMPT** section into a UI-generation tool with live preview (v0.dev, Lovable, Bolt.new, or Claude in an IDE). All data below is real and verified from Em Sherif's own websites (Sept 2026).

---

## ⭐ THE PROMPT (paste this)

> Build an award-winning, cinematic website for **Em Sherif Restaurant**, a famous high-end Lebanese fine-dining brand (founded Beirut, 2011). This is a pitch to win the client, so it must feel like it was made by a top design studio — elegant, editorial, luxurious — NOT a generic restaurant template or WordPress site. Think the caliber of Awwwards Site of the Day.
>
> **Brand identity**
> - Palette: warm ivory/cream backgrounds, deep royal "Em Sherif blue" (#0E2748 / #123560), and gold (#B08A4A). Their real interiors are royal-blue velvet, brass, blue-and-white ornamental plates, botanical illustration, greenery.
> - Type: pair a high-contrast elegant serif used at LARGE display sizes (their brand uses Crimson Pro; Cormorant Garamond or Fraunces also work) with Montserrat for fine letter-spaced uppercase labels. Weave the Arabic calligraphy **أم شريف** in as a design element.
> - **Logo rule (important): use the provided logo image wherever the name "Em Sherif" would appear** (nav, hero, footer) instead of typing it as text. Logo file: `https://emsherifrestaurant.com/wp-content/uploads/2024/02/logo-restaurant.png` (royal-blue wordmark; invert to white over dark imagery).
>
> **Art direction**
> - Cinematic, image-led, generous whitespace, oversized typography, asymmetric/editorial compositions (not centered-everything). Alternate ivory and deep-navy sections for rhythm.
> - Real photography throughout (interiors, dishes, the founders). Use their actual images (sources below). Keep a short looping **video** playing full-bleed somewhere (hero or a band).
> - Tasteful, expensive motion: slow reveals, image masks, parallax, a refined loader. NO cheesy 3D/gimmicks.
> - Mobile-perfect and fast.
>
> **Sections**: cinematic hero; brand story (founder Mireille Hayek); the mezze/feast experience; a photo gallery of the rooms; a **Menu experience where the visitor chooses a location** (menus differ by country — see data); locations; recognition/press; reservations; footer.
>
> Use the exact content, menus, locations, and asset URLs in the brief below. Do not invent facts.

---

## BRAND FACTS
- **Em Sherif** = "the mother of Sherif" (Arabic: أم شريف). Lebanese fine-dining group, founded **Beirut, 2011** by **Mireille Hayek** (Founder & Culinary Director).
- **Yasmina Hayek** (her daughter) — chef, named **MENA's Best Female Chef 2025** (MENA's 50 Best). The restaurant was named **Best Restaurant in Lebanon 2025**.
- Brand story (use verbatim, it's theirs): *"Bread and salt depict the alliance between people that happens over a shared meal. Em Sherif is a traditional, refined and multifaceted Lebanese culinary experience, one curated with love, made with intention. Founder Mireille Hayek wants this meal to remind you of the ones shared around her own dinner table; a glimpse into la vie Libanaise. Welcome home. Welcome to Em Sherif."*
- The family of concepts: **Em Sherif Restaurant, Em Sherif Café, Em Sherif Sea Café, Em Sherif Deli.**
- Instagram: `@emsherifrestaurant` · Facebook: `facebook.com/Emsheriflebanon`

## OFFICIAL WEBSITES
- Restaurant (flagship): https://emsherifrestaurant.com  · UK: https://emsherifrestaurant.co.uk
- Café: https://emsherif-cafe.com
- Group/family: https://emsherif.com
- Live menu apps: https://emsherif-menu.com/restaurant · https://emsherif-menu.com/cafe

## RESTAURANT — CONTACT & LOCATIONS
- **Beirut (flagship):** Damascus Street, Monot, Beirut, Lebanon. Open Mon–Sun 12:30 PM to 4:00 PM. Tel **+961 70 919 119**.
- **All 7 restaurant locations:** Beirut · Kuwait City · Damascus · London (Mayfair) · Monte Carlo · Doha · Muscat.

## CAFÉ — CONTACT & LOCATIONS
- **Beirut:** Minet El Hosn, Downtown, Lebanon. Open Mon–Sun 9:00 AM to 1:00 AM. Tel **+961 78 988 989**.
- **All 15 café locations:** Beirut · Paris · Kuwait City · Riyadh · Cairo · Dubai · Abu Dhabi · Baghdad · Erbil · Amman · Abidjan · Doha · Al Khobar · Istanbul · Madrid.

## MENUS (real, priced — they differ by country)
Full, transcribed menus with prices are in the accompanying `index.html` (GitHub: https://github.com/Juanius-ahos/EmSherif-Demo) — reuse them verbatim:
- **Restaurant · Beirut** (Lebanese Pounds): Furn, Salata, Cold Mezze, Hot Mezze, Grill, Main Course, Dessert (~50 dishes).
- **Restaurant · Doha** (Qatari Riyal): Soup, Furn, Salata, Cold Mezze, Fatteh, Hot Mezze, Tabekh, Mechwi, Side Plates — the upscale à la carte incl. Wagyu, caviar, truffle, Omani lobster (~58 dishes).
- **Café · Amman** (Jordanian Dinar): From the Oven, Eggs & Dairy, Fatteh, Salads, Nayy, Cold/Hot Mezze, Sandwiches, Mashewe, Mains, Helo (~65 dishes).
- Build the Menu page as a **location chooser** (tabs/dropdown). Official per-location live menus to link:
  - Restaurant hub: https://emsherifrestaurant.com/menu/
  - Café hub (15 countries): https://emsherif-cafe.com/menu/
  - Menu apps: https://emsherif-menu.com/restaurant · https://emsherif-menu.com/cafe

## REAL IMAGE / VIDEO ASSETS
Pull their actual media (no stock, no placeholders). Easiest: their WordPress media libraries return JSON of every image:
- `https://emsherifrestaurant.com/wp-json/wp/v2/media?per_page=100` (restaurant: interiors, dishes, Mireille & Yasmina, press)
- `https://emsherif-cafe.com/wp-json/wp/v2/media?per_page=100` (café interiors)

Key files:
- Logo (royal blue wordmark): `https://emsherifrestaurant.com/wp-content/uploads/2024/02/logo-restaurant.png`
- Hero video (1920×1080): `https://emsherifrestaurant.com/wp-content/uploads/2024/02/Cafe-Website-Footage.mp4`
- Gorgeous interiors live under `emsherifrestaurant.com/wp-content/uploads/2024/02/` and `.../2024/05/` (filenames like `Rectangle-*.jpg`, 1088×612) and café interiors under `emsherif-cafe.com/wp-content/uploads/2024/02/`.
- Founders: search the restaurant media for `Mireille-Hayek`, `Yasmina-Hayek`.
- NOTE: some of their images have text/badges baked in (e.g., "50 Best", "No.9") — don't put captions over those; use them only where their own text is the point.

## DESIGN NOTES FROM THE CLIENT (things that were rejected — avoid)
- Do NOT make it look like a WordPress/template restaurant site (centered logo over a photo, even section rhythm, generic gallery).
- Do NOT use greasy grill/BBQ close-ups as the hero — use the elegant royal-blue dining rooms.
- Do NOT use cheesy 3D or gimmicks.
- DO use the logo image as the wordmark, real up-to-date info, all locations, all menus, and keep a video playing.
- Preferred look: lighter/brand-accurate (ivory + navy + gold), elegant and editorial.

---
*Compiled by Claude for the Em Sherif pitch. Data verified from Em Sherif's official sites, Sept 2026.*
