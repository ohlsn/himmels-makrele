# Blender textures, materials, HDRIs and 3D assets: curated resource directory (status as of Oct 2026)

> Method note for the report writer: direct page fetches were blocked by the network egress proxy for every domain tried (polyhaven.com, ambientcg.com, fab.com, helpx.adobe.com, help.poliigon.com, blenderkit.com, cgchannel.com, 80.lv, forums.unrealengine.com and others). Everything below therefore comes from web-search result summaries, which are secondary and machine-synthesised, not from reading the sites' own licence or FAQ pages. Facts are cited to the URL the search surfaced, and anything price- or licence-critical should be re-checked on the vendor's own page before the user relies on it. Where search summaries contradict each other, that is flagged. "Today" is 2026-10-02.

## 1. Which free / CC0 sources are best, and what is their 2026 status?

### Takeaway
Poly Haven and ambientCG are the two CC0 anchors (textures, HDRIs, plus models on Poly Haven), with ShareTextures, 3DTextures.me and cgbookcase as smaller CC0 supplements and BlenderKit as a large free-tier library with its own licence options. Quixel Megascans is no longer free: the free-for-all window ended 31 Dec 2024 and from 2025 most Megascans are paid on Fab, while Substance 3D Assets is only available through a paid Adobe subscription (now bundled "unmetered" into the Collection plan).

### Cited Findings

**Poly Haven** (https://polyhaven.com)
- All assets are CC0: usable for any purpose including commercial, no attribution needed (appreciated), redistributable, even inside a product you sell. The only things you cannot do are claim to be the original author or re-license them. Poly Haven asks that, if you sell a product containing them, you make clear the assets are free/public domain. — [Poly Haven FAQ](https://polyhaven.com/faq), [Poly Haven docs FAQ](https://docs.polyhaven.com/en/faq)
- Poly Haven explicitly states CC0 allows uses including training AI models. — [Poly Haven docs FAQ](https://docs.polyhaven.com/en/faq)
- Scale: roundup cites 780+ textures and 980+ HDRIs for Poly Haven (counts are from a 2026 third-party guide, not Poly Haven itself); both Poly Haven and ambientCG have free APIs with no key. — [Cinevva free-assets guide (2026)](https://app.cinevva.com/guides/free-textures-hdris-materials)
- Poly Haven also hosts photorealistic models (CC0, multiple resolutions, no-key API). — [Cinevva Sketchfab vs Poly Haven vs Kenney](https://app.cinevva.com/guides/sketchfab-polyhaven-kenney)
- Poly Haven HDRIs include up to 16K and are categorised into outdoor, indoor, skies, studio, sunrise/sunset, night, nature and urban. — [Hyper3D free HDRI roundup](https://hyper3d.ai/blog/free-hdri-maps)
- Most textures are at least 8K per the add-on description. — [Poly Haven Blender add-on page](https://polyhaven.com/plugins/blender)
- Status: active in 2026; Poly Haven's blog describes continued dev through 2026 and a goal to make its Blender add-on free (see section 4). — [Poly Haven blog: Liberating our Blender Add-on](https://blog.polyhaven.com/liberating-our-blender-add-on/)

**ambientCG** (https://ambientcg.com)
- All assets CC0: any use without attribution, commercial use permitted; CC0 means no warranty or indemnification. — [licenseorg ambientCG guide](https://licenseorg.com/guide/3d-assets/ambientcg)
- 2,000+ materials and 400+ HDRIs; textures up to 8K; PBR map sets as JPG/PNG, HDRIs as EXR; free no-key API. — [Cinevva free-assets guide (2026)](https://app.cinevva.com/guides/free-textures-hdris-materials), [Cinevva/ambientCG search summary](https://app.cinevva.com/guides/free-textures-hdris-materials)

**Smaller CC0 libraries**
- 3DTextures.me, ShareTextures and cgbookcase "add thousands more" CC0 assets; Kenney covers prototype/stylised textures. — [Cinevva free-assets guide (2026)](https://app.cinevva.com/guides/free-textures-hdris-materials)
- ShareTextures hosts scanned fabric textures and a "Surface Imperfection" category with CC0 decals (dust, grunge, dirt, smudges). — [ShareTextures fabric example](https://sharetextures.com/textures/fabric/fabric_111), [ShareTextures decal example](https://sharetextures.com/textures/surfaceimperfection/decal_16)
- cgbookcase textures are mostly PBR-ready at 4K, architecture-oriented. — [Blender 3D Architect CC0 list](https://www.blender3darchitect.com/textures/list-with-the-best-sources-for-cc0-textures/) (this list is older; it also describes "CC0Textures" with 2K-8K sets, which may be a stale name; see Gaps)
- FreePBR is flagged as the popular site that is NOT CC0: commercial use requires a one-time payment. — [Cinevva free-assets guide (2026)](https://app.cinevva.com/guides/free-textures-hdris-materials)
- Kenney and Quaternius: CC0 stylised/low-poly 3D model libraries, commercial use, no attribution. — [Cinevva free 3D model sites](https://app.cinevva.com/guides/free-3d-model-sites)
- Sketchfab: mixed licences, check per model; its store moved to Epic's Fab with only CC-BY and Fab Standard content migrating, CC0 models remain on Sketchfab "for now". — [Cinevva Sketchfab vs Poly Haven vs Kenney](https://app.cinevva.com/guides/sketchfab-polyhaven-kenney)

**BlenderKit** (https://www.blenderkit.com)
- Plans: Free $0/month, Full $9/month, Business $25/month; about 47% of assets free per the pricing-page summary; everything in the database licensed for commercial and non-commercial use; cannot sell the assets themselves but can sell models using BlenderKit materials; 85% of subscription goes to creators and Blender development. — [BlenderKit pricing](https://www.blenderkit.com/plans/pricing/), [BlenderKit FAQ](https://www.blenderkit.com/faq-frequently-asked-questions/)
- Two licences exist: royalty-free commercial and CC0; both permit commercial and non-commercial use. — [Blender manual: BlenderKit add-on](https://docs.blender.org/manual/en/3.0/addons/3d_view/blenderkit.html)
- Scale (Sept 2025): "over 48,000 free 3D models, materials and HDRIs"; the search summary breaks this down as 17,000+ free models, 26,000+ free materials, 2,000+ free HDRIs, and says all materials and brushes are free. — [CGChannel, 21 Sep 2025](https://www.cgchannel.com/2025/09/get-over-48000-free-3d-models-materials-and-hdris-from-blenderkit/). Conflict: the pricing-page summary says ~47% of assets are free while the CGChannel summary says all materials are free; the two may reflect different dates or categories.

**Quixel Megascans via Fab (status: no longer free)**
- Fab launched Oct 2024; Megascans were free to everyone under Fab's Standard License (usable in any engine/tool) only until end of 2024. — [CGChannel, Oct 2024](https://www.cgchannel.com/2024/10/epic-games-has-made-megascans-free-to-all-but-only-until-the-end-of-2024/), [80.lv: Megascans no longer free after 2024](https://80.lv/articles/megascans-no-longer-free-after-2024)
- From 2025 Epic charges for Megascans on Fab while keeping some content free; search summary gives $0.99 per individual asset, $4.99 per procedural asset kit, $24.99 per pack (exact prices not verified on a vendor page). — [Fab Transition FAQs](https://support.fab.com/s/article/Fab-Transition-FAQs?language=en_US), [80.lv](https://80.lv/articles/megascans-no-longer-free-after-2024)
- Fab Standard License permits use in any game engine or tool (not restricted to Unreal); Fab has a Personal and a Professional tier plus a Creative Commons option for listings. — [Unreal Engine blog on Fab](https://www.unrealengine.com/blog/fab-content-marketplace-launches-in-october-publishing-portal-opens-today)
- Legacy access: assets acquired before 31 Dec 2024 stay available through Quixel Bridge and Quixel.com (stated as continuing "into 2025"); no new legacy-library acquisitions after 31 Dec 2024. — [Epic forum: Access legacy Megascans](https://forums.unrealengine.com/t/access-legacy-megascans-on-bridge-and-quixel-com/2142664)
- Late-state signals (titles only, threads not read): a thread asks why Megascans "claimed on Quixel Bridge and FAB" later "became paid items on FAB"; another reports Quixel Bridge redirecting to Fab and the Fab plugin "failing silently" for 3ds Max 2027. — [Epic forum thread 1](https://forums.unrealengine.com/t/megascans-claimed-on-quixel-bridge-and-fab-but-subsequently-became-paid-items-on-fab/2753872), [Epic forum thread 2](https://forums.unrealengine.com/t/cannot-export-assets-to-3ds-max-2027-quixel-bridge-redirects-to-fab-fab-plugin-fails-silently/2733611)
- Bridge: new assets show "Get it on Fab" instead of Export/Download. — [Epic forum Bridge/Fab thread](https://forums.unrealengine.com/t/quixel-bridge-3ds-max-and-workflow-import/2084676)

**Adobe Substance 3D Assets (successor listing to Substance Source) (status: paid only)**
- Substance 3D Collection: US$59.99/month individual, US$119.99/month teams; Substance 3D Texturing US$24.99/month or US$249.88/year. — [G2 Substance 3D Assets pricing](https://www.g2.com/products/adobe-substance-3d-assets/pricing)
- Price rise effective 25 Mar 2025 (Collection from US$49.99 to US$59.99); the new plans add Modeler and Viewer and "unmetered" access to 20,000+ Assets (no points). — [CGChannel, Feb 2025](https://www.cgchannel.com/?p=165140), [Schneider summary](https://schneider.im/adobe-substance-3d-price-increases-and-innovations), [Adobe pricing-change FAQ](https://helpx.adobe.com/no/substance-3d/pricing-change.html)

### Inferences
- For a merch shop plus website, the CC0 triad (Poly Haven, ambientCG, ShareTextures) covers most needs with zero licensing risk; everything else should be treated as a gap-filler.
- Megascans "free in 2026" claims on older blog posts are stale; treat any Megascans asset as paid unless Fab shows it as free, and treat anything the user claimed during 2024 as a legacy entitlement to re-verify.
- BlenderKit is best used with the licence badge visible per asset (CC0 vs royalty-free), because the two differ for resale.

### Gaps
- Could not read the Poly Haven, ambientCG, ShareTextures, 3DTextures.me or cgbookcase licence pages directly (fetch blocked); CC0 status is taken from secondary summaries and the Poly Haven FAQ search excerpt.
- "CC0 Textures" was named in an older roundup; the site was, from my background knowledge, renamed ambientCG, but I did not verify that in this session. Treat any cc0textures.com link as possibly redirected.
- Whether the Quixel legacy-access window has since been closed, and the current state of free Megascans on Fab in Oct 2026, is unconfirmed; only forum thread titles hint at friction.
- Exact Substance 3D Assets licence text and whether the standalone Substance Source brand still exists could not be verified; only the Collection/Texturing pricing and "Assets" naming appear in sources.

## 2. Best paid / premium sources

### Takeaway
Poliigon (subscription, own Blender add-on) and Substance 3D Assets (Adobe subscription) are the main premium libraries, with Textures.com as the long-standing credit-based option, Fab/Megascans as pay-per-asset scans, and Superhive (formerly Blender Market) and Gumroad as the marketplaces for Blender-native packs and add-ons. Licence terms differ materially on client work and on redistributing assets in extractable form.

### Cited Findings
**Poliigon** (https://www.poliigon.com)
- Library of 3,000+ models, materials and HDRIs; search, download and import inside Blender; add-on supports Blender 2.83 and higher including 4.x; works with Cycles, Eevee and Eevee Next; latest add-on release v1.16.3 on 5 Aug 2026, tested on Blender 5.2 down to 2.83. — [Poliigon Blender add-on help](https://help.poliigon.com/en/articles/6342599-poliigon-blender-addon), [Poliigon add-on changelog](https://help.poliigon.com/en/articles/11657058-poliigon-blender-addon-changelogs), [Poliigon Blender docs](https://Poliigon.com/blender)
- Pricing model: subscriptions now include "assets per month" instead of credits; every asset (texture, model, HDRI) costs 1 asset. A free plan exists. — [Poliigon blog: Changes to Credits](https://www.blog.poliigon.com/blog/new-flat-costs), [Poliigon new asset pricing](https://help.poliigon.com/en/articles/8749917-new-asset-pricing)
- Prices: a third-party summary lists Hobbyist $12, Unlimited $27, Professional $24, Studio $37 per month. This list is internally inconsistent (Professional cheaper than Unlimited) and should not be relied on. — [SoftwareSuggest Poliigon pricing](https://www.softwaresuggest.com/poliigon/pricing)
- Licence: Hobbyist plan limits use to personal portfolio and non-client projects; client work requires Professional or Studio (Individual vs Business licence); you may not share, sell, license, redistribute or repackage assets with anyone not named on the account, including handing over scene files with Poliigon assets "in a whole or easily extractable state". — [Poliigon asset use licensing](https://help.poliigon.com/en/articles/8749749-asset-use-licensing), [Poliigon EULA](https://poliigon.com/terms), [licenseorg Poliigon guide](https://licenseorg.com/guide/3d-assets/poliigon)

**Adobe Substance 3D Assets** (https://substance3d.adobe.com/assets)
- Prices as in section 1. Assets may be used commercially inside a "Larger Work" or "Modified Work" (e.g. games, films, renders) but not shared or sold on a standalone basis. — [Adobe Community answers on commercial use](https://community.adobe.com/t5/substance-3d-assets-and-community-assets/commercial-use-of-3d-asset-library/m-p/13944776/highlight/true) (community answer, not Adobe's licence text; see [Adobe Assets FAQ](https://www.adobe.com/cc-shared/fragments/products/substance3d/assets-faq) for the official statement)
- Assets licensed during a subscription may continue to be used after cancelling ("licence for life") per the same community thread. — [Adobe Community](https://community.adobe.com/t5/substance-3d-assets-and-community-assets/commercial-use-of-3d-asset-library/m-p/13944776/highlight/true)

**Textures.com** (https://www.textures.com, formerly CGTextures)
- Credit-based subscription; larger sizes cost more credits; premium credits in packs valid for 3 years per the Terms of Service. — [Textures.com Terms of Service (PDF)](https://www.textures.com/system/TexturesCom%20-%20Terms%20of%20Service%20Rev3-8.pdf), [WorldViz KB](https://kb.worldviz.com/?p=2357)
- Royalty-free for commercial and non-commercial use, but you cannot release a project that includes Textures.com content under an open-source licence. — [WorldViz KB](https://kb.worldviz.com/?p=2357)
- Free credits: older summaries say daily-regenerating free credits exist; a GameDev.tv thread titled "Textures.com no longer offers free credits" says otherwise (undated search result). Conflicting. — [WorldViz KB](https://kb.worldviz.com/?p=2357); contradicted by [GameDev.tv thread](https://community.gamedev.tv/t/textures-com-no-longer-offers-free-credits/219803)

**Fab (incl. Megascans)** (https://www.fab.com)
- See section 1: per-asset pricing, Standard License usable in any tool, Personal/Professional tiers. — [Unreal Engine blog on Fab](https://www.unrealengine.com/blog/fab-content-marketplace-launches-in-october-publishing-portal-opens-today)

**Superhive (formerly Blender Market)** (https://superhivemarket.com)
- Blender Market was renamed Superhive (announced 2024) because it is not an official Blender Foundation entity; same marketplace, creators and products; homepage cites 66,397 products; still active with a Summer Sale 2026 (25% off). — [Superhive: A New Name for Blender Market](https://superhivemarket.com/posts/beyond-business-as-usual-a-new-name-for-blender-market), [Superhive Summer Sale 2026](https://superhivemarket.com/posts/superhive-summer-sale-2026-25-off-the-best-blender-add-ons-assets)
- Hosts the paid Poly Haven Asset Browser, BlenderKit listing, and decal/imperfection add-ons such as Decal Forge and MK Decal Brush. — [Poly Haven Asset Browser on Superhive](https://superhivemarket.com/products/poly-haven-asset-browser), [Decal Forge](https://superhivemarket.com/products/decal-forge-add-on--library)

**Arroway Textures**
- An older (2016-era) mirror page says free lower-resolution Arroway textures cannot be used commercially and Arroway's donated MrMaterials copies may not be resold or redistributed. — [MrMaterials Arroway page](https://www.mrmaterials.com/mrm/mrtextures/Xtra-Textures/Masonry-Materials/stone-14_AT01Full/)

**Three D Scans, Texture Labs, Gumroad**
- No reliable 2026 information was retrieved for Three D Scans or Texture Labs (see Gaps). Gumroad appears as the storefront for individual creator packs (grunge/alpha packs, procedural grunge nodes) rather than as a library. — [Gumroad grunge pack example](https://tsahyt.gumroad.com/l/wlRyKE)

### Inferences
- Poliigon's "no extractable form" clause is the most relevant pitfall for the user's website: publishing a .glb/.gltf or downloadable scene with Poliigon textures embedded could be read as redistributing them in extractable form. This is my reading of the clause, not Poliigon's stated position; confirm with their support before shipping paid textures to public web viewers.
- For rendered stills used on the shop (not downloadable assets), all listed premium licences appear compatible when a Professional/Business-type plan is held; Hobbyist-type plans are not.
- Substance 3D Assets at US$59.99/month (Collection) is expensive for occasional use compared with Poliigon or one-off Fab purchases; the lifetime-use clause (community-sourced) lowers the risk of a later cancellation.

### Gaps
- Official, current Poliigon tier prices (help page blocked); the figures above are inconsistent.
- Textures.com 2026 plan prices and whether free daily credits still exist.
- Any information on Three D Scans, Texture Labs, or current Arroway commercial terms/prices.
- Official Fab Personal vs Professional thresholds and fees (not retrieved).
- Substance 3D Assets official EULA wording (only a community-forum paraphrase retrieved).

## 3. Best sources by material type: fabric, wood, metal, paper, scanned surfaces, decals/grunge, HDRIs/studio lighting, 3D scans

### Takeaway
For fabric, CC0 coverage is good on Poly Haven, ambientCG and ShareTextures (scanned fabric); for grunge/decals ShareTextures' surface-imperfection category is the best free option, with paid packs/add-ons for volume; Poly Haven is the leading free source for studio HDRIs and 3D scans. Procedural options (Material Maker, Blender procedural grunge) fill gaps without any licence risk.

### Cited Findings
- Fabric (free): Poly Haven and ambientCG are the primary CC0 sources; ShareTextures specifically includes scanned fabric textures under CC0. — [Cinevva free-fabric guide](https://app.cinevva.com/game-assets/free-fabric-textures), [ShareTextures fabric example](https://sharetextures.com/textures/fabric/fabric_111)
- A PBR set typically has base colour, roughness, normal, AO and optionally displacement/metalness; colour, roughness and normal are the minimum for correct light response. — [Cinevva free-fabric guide](https://app.cinevva.com/game-assets/free-fabric-textures)
- Wood, metal, paper and other generic surfaces: not retrieved as separate category recommendations; the CC0 libraries above (ambientCG with 2,000+ materials, Poly Haven 780+ textures, cgbookcase) are the general-purpose recommendation in sources. — [Cinevva free-assets guide (2026)](https://app.cinevva.com/guides/free-textures-hdris-materials)
- Decals/grunge (free): ShareTextures "Surface Imperfection" textures are CC0, including decals with dust, grunge, dirt and smudges. — [ShareTextures decal 4](https://sharetextures.com/textures/surfaceimperfection/decal_4), [ShareTextures decal 16](https://sharetextures.com/textures/surfaceimperfection/decal_16)
- Decals/grunge (paid): Seamlessly Imperfect (50 seamless 4K imperfection maps), a procedural grunge node pack (20 fully procedural grunge nodes), MK Decal Brush (500+ decals/scratches/dirt/grunge with a stamp/erase workflow), Decal Forge add-on + library. — [BlenderNation, Jan 2025](https://www.blendernation.com/2025/01/23/seamlessly-imperfect/), [Decal Forge on Superhive](https://superhivemarket.com/products/decal-forge-add-on--library), [Gumroad listing](https://tsahyt.gumroad.com/l/wlRyKE)
- HDRIs (free): Poly Haven offers free CC0 HDRIs up to 16K in indoor/studio/outdoor categories; ambientCG has 400+ HDRIs in EXR; BlenderKit lists 2,000+ free HDRIs (licence per asset). — [Hyper3D HDRI roundup](https://hyper3d.ai/blog/free-hdri-maps), [Cinevva free-assets guide (2026)](https://app.cinevva.com/guides/free-textures-hdris-materials), [CGChannel on BlenderKit](https://www.cgchannel.com/2025/09/get-over-48000-free-3d-models-materials-and-hdris-from-blenderkit/)
- HDRIs (paid): Poliigon includes HDRIs in its 1-asset-per-item model. — [Poliigon Changes to Credits](https://www.blog.poliigon.com/blog/new-flat-costs)
- 3D scans (free): Poly Haven's Namaqualand scan library gives 30+ scans of desert plants, rocks and ground materials in Blender, FBX and USD, plus 10 16K HDRIs, all CC0. — [CGChannel tag page on Poly Haven scans](https://www.cgchannel.com/tag/3d-rock)
- 3D scans (other): SnapTank released 17 free scans in 2016, some commercial-use, some non-commercial; its current status is unknown. — [CGChannel, Oct 2016](https://www.cgchannel.com/2016/10/download-17-free-3d-scans-from-snaptank/)
- Scanned surfaces (paid): Megascans on Fab (per-asset, see section 1) and Poliigon (see section 2).
- Procedural texturing tool: Material Maker (open source, MIT, built on Godot); exports PBR maps (albedo, metallic, roughness, emission, normal, AO, depth); around 200 nodes; 1.7 released 14 Jul 2026; older summaries cite 4096x4096 PNG export limits. — [LinuxLinks Material Maker](https://www.linuxlinks.com/material-maker-procedural-texture-authoring-3d-painting-tool/), [CGChannel: Material Maker 1.7](https://www.cgchannel.com/2026/07/open-source-material-authoring-software-material-maker-1-7-is-out/)

### Inferences
- For a merch shop with an ironic brand voice, imperfection/grunge maps and decals are the highest-leverage category to buy or build; ShareTextures gives a free starting point with CC0 licence, and paid packs mostly save time.
- For studio-look lighting, Poly Haven's studio HDRIs are likely sufficient; paid HDRI libraries add little unless a specific look is needed.
- For product shots of apparel, scanned-fabric CC0 maps plus Blender's own cloth/shader work will avoid licence issues; premium fabric libraries were not surfaced in this research.

### Gaps
- Dedicated per-category (wood, metal, paper) recommendations and quality rankings were not found; sources only gave general-purpose libraries.
- No sources found rating specifically the best premium fabric/clothing libraries (e.g., Textures.com, Poliigon fabric sets) or studio-lighting HDRI paid packs.
- Three D Scans and Texture Labs: no results retrieved.
- Exact current Material Maker export resolution cap in 1.7 (the 4096 px limit comes from older articles).

## 4. Blender add-ons and tools for importing materials

### Takeaway
Poly Haven's Asset Browser add-on is paid ($30 once on Superhive, or $5/month Patreon) but Poly Haven has stated a 2026/2027 goal to make it free once it reaches 5,000 patrons; BlenderKit and Poliigon have their own add-ons; Epic's official Fab plugin has been reported broken on recent Blender versions, so Megascans in Blender is currently awkward.

### Cited Findings
- Poly Haven Asset Browser add-on: downloads all Poly Haven assets into Blender's Asset Browser by category; swap resolutions after import (most at least 8K); correct real-world texture scale; HDRI rotation/brightness/colour-temperature sliders; install via ZIP and add a "Poly Haven" asset library in preferences. — [Poly Haven Blender add-on page](https://polyhaven.com/plugins/blender), [Poly Haven add-on docs](https://docs.polyhaven.com/en/guides/blender-addon)
- Price: $30 once-off on Blender Market/Superhive or $5/month on Patreon. — [BlenderNation bazaar listing](https://bazaar.blendernation.com/?p=2057), [Superhive listing](https://superhivemarket.com/products/poly-haven-asset-browser)
- Roadmap: a main goal for 2026/2027 is to stop selling the add-on and make it free forever; it will be removed from Superhive and released free once Poly Haven reaches 5,000 patrons. Poly Haven says selling the add-on had become a primary income source. — [Poly Haven blog: Liberating our Blender Add-on](https://blog.polyhaven.com/liberating-our-blender-add-on/), [Poly Haven Blender add-on page](https://polyhaven.com/plugins/blender). The current patron count was not retrieved.
- Poly Haven add-on source repository exists on GitHub (polyhavenassets). — [GitHub: Poly-Haven/polyhavenassets](https://github.com/Poly-Haven/polyhavenassets)
- BlenderKit add-on: free to install; in-app search/import for models, materials, HDRIs and brushes; listed on Superhive and in the Blender manual; Full plan adds 2 GiB private storage and extra add-ons. — [BlenderKit](https://www.blenderkit.com/), [Blender manual BlenderKit](https://docs.blender.org/manual/en/3.0/addons/3d_view/blenderkit.html), [BlenderKit pricing](https://www.blenderkit.com/plans/pricing/)
- Poliigon add-on: see section 2 (v1.16.3, 5 Aug 2026). — [Poliigon add-on changelog](https://help.poliigon.com/en/articles/11657058-poliigon-blender-addon-changelogs)
- Fab/Megascans in Blender: Epic's Fab Launcher integration claims one-click batch import/export to Blender, Unreal, Unity, etc. but the auto-installed Fab Blender plugin v0.2.15 was reported failing to install on Blender 4.0 through 5.0 (packaging errors and removed Blender APIs); the report is undated. — [Fab on X](https://x.com/fab/status/1967608084857290806), [Epic forum bug report](https://forums.unrealengine.com/t/bug-fab-blender-plugin-v0-2-15-fails-to-install-on-blender-4-0-5-0/2698776)
- Third-party Megascans options: "Megascans Bridge" Gumroad add-on imports Megascans downloaded via Quixel Bridge into Blender; a "Fab to Blender" community add-on thread is marked "(Archived)". — [Gumroad Megascans Bridge](https://b3dhub.gumroad.com/l/megascans-bridge), [Blender Artists thread (archived)](https://blenderartists.org/t/fab-to-blender-addon-archived-browse-and-import-quixel-assets-in-blender/1576330)
- Sketchfab has an official Blender plugin (GitHub releases). — [Sketchfab Blender plugin releases](https://github.com/sketchfab/blender-plugin/releases)
- Material Maker: standalone app with PBR map export (no dedicated Blender add-on surfaced). — [LinuxLinks](https://www.linuxlinks.com/material-maker-procedural-texture-authoring-3d-painting-tool/)

### Inferences
- A practical stack today is Poly Haven Asset Browser (or manual downloads while it is paid) plus BlenderKit plus Poliigon, with Megascans handled via manual download rather than depending on the Fab plugin.
- "B06 Megascans" in the brief did not map to anything I could verify; the Gumroad "Megascans Bridge" add-on is the nearest match found.

### Gaps
- Current Poly Haven patron count and whether the add-on has already been made free by Oct 2026.
- Whether Epic has fixed the Fab Blender plugin for Blender 5.x and the date of the bug report.
- Whether Material Maker 1.7 ships Blender-specific export templates.

## 5. Licensing pitfalls for commercial / web use (freelance creative director, merch shop + website)

### Takeaway
CC0 sources (Poly Haven, ambientCG, ShareTextures, CC0 choice on BlenderKit) are the safe default for anything printed on merch or shipped to a public website; paid libraries are generally fine for rendered stills but often forbid redistributing the assets themselves or extractable copies, and some tiers forbid client work.

### Cited Findings
- CC0 still means no warranty or indemnification; Poly Haven asks that you not claim original authorship or re-license the assets. — [licenseorg ambientCG guide](https://licenseorg.com/guide/3d-assets/ambientcg), [Poly Haven FAQ](https://polyhaven.com/faq)
- Poliigon: Hobbyist plan excludes client/commercial work beyond portfolio; no sharing assets or scene files with unnamed third parties in extractable form. — [Poliigon asset use licensing](https://help.poliigon.com/en/articles/8749749-asset-use-licensing)
- Substance 3D Assets: commercial use only inside larger/modified works; no standalone sale or sharing. — [Adobe Community](https://community.adobe.com/t5/substance-3d-assets-and-community-assets/commercial-use-of-3d-asset-library/m-p/13944776/highlight/true)
- BlenderKit: cannot sell the assets themselves; can sell models with BlenderKit materials; two licences (royalty-free vs CC0). — [BlenderKit FAQ](https://www.blenderkit.com/faq-frequently-asked-questions/), [Blender manual](https://docs.blender.org/manual/en/3.0/addons/3d_view/blenderkit.html)
- Textures.com: royalty-free commercial, but projects containing its content cannot be released as open source. — [WorldViz KB](https://kb.worldviz.com/?p=2357)
- Sketchfab: licences are mixed per model (CC-BY needs attribution; some NC); its store content was moved to Fab with only CC-BY and Fab Standard content migrating. — [Cinevva Sketchfab vs Poly Haven vs Kenney](https://app.cinevva.com/guides/sketchfab-polyhaven-kenney)
- Free/low-res demo textures (e.g., Arroway's older free tier) may be non-commercial only. — [MrMaterials Arroway page](https://www.mrmaterials.com/mrm/mrtextures/Xtra-Textures/Masonry-Materials/stone-14_AT01Full/)
- Analogous mockup-template services allow exported mockups for merchandise e-commerce images but forbid redistributing or reselling empty mockup files. — [Smartmockups licence](https://smartmockups.helpscoutdocs.com/article/40-license), [Mockuuups resale FAQ](https://mockuuups.studio/help/article/33-can-i-resell-mockups)
- Poly Haven CC0 permits AI training use. — [Poly Haven docs FAQ](https://docs.polyhaven.com/en/faq)

### Inferences
- Rendered product photos on the shop: any paid library with an appropriate Professional/Business tier is likely fine; keep proof of the active licence/purchase at time of use.
- A texture or pattern that is itself printed on a garment (all-over print) is the asset being distributed as part of the product, not just inspiration in a render; this is closest to the "standalone" territory in Substance and Poliigon terms. Use CC0 or self-made/procedural (Material Maker, Blender) textures there. This is my inference from the clauses cited, not a quoted rule.
- Web 3D (.glb, three.js viewers) exposes textures to download; with CC0 this is fine, with Poliigon/Substance/Fab Standard it plausibly counts as redistribution in extractable form. Downscale/bake or use CC0 for web-delivered 3D.
- Trademarks, logos, brand marks or likenesses visible in scanned objects or HDRIs are not cleared by CC0 (CC0 covers copyright only); this is general knowledge not backed by a source retrieved in this session.
- Practical rule: keep a per-project asset log (source URL, licence, date, plan tier), since licence terms and plans (Megascans, Poly Haven add-on, Poliigon) have changed repeatedly in 2024-2026.

### Gaps
- Verbatim licence text for Poliigon, Substance 3D Assets, Fab Standard, BlenderKit and Textures.com could not be read directly (fetch blocked); the user should read each EULA before relying on the above.
- No source retrieved addressing print-on-demand-specific rules (printing a texture on goods) for any of these licences; the reading above is inference.
- Fab Standard License's Personal vs Professional revenue limits were not retrieved.
- No sources found on whether the Fab Standard License allows embedding assets in publicly downloadable web 3D files.
