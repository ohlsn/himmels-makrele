# Interactive Web 3D for Himmels Makrele (Next.js 16 / React 19 / Tailwind v4 / Framer Motion)

> Research-method caveats for the report writer (read first):
> - Many primary docs hosts were blocked by the sandbox egress proxy (r3f.docs.pmnd.rs, drei.docs.pmnd.rs, nextjs.org, web.dev articles, modelviewer.dev, tympanus.net/Codrops, utsubo.com, cloud.needle.tools, Awwwards pages). Where I could not fetch a page, claims come from WebSearch result summaries (tool-generated, not verbatim page text). Those are marked "(search summary)". Treat them as lower confidence than "(fetched)" items.
> - WebFetch returns small-model summaries. Several summaries contained visibly wrong dates (e.g. three.js r186 "September 24, 2024"), so exact release dates are unreliable; versions and dist-tags from the npm registry are more trustworthy.
> - Items under "Inferences" that are labelled "(background knowledge)" were NOT verified in this session; they are standard practice I know of but could not source. The report writer should hedge or verify them.
> - Project facts come from local files (package.json, content/shop.ts, src/components/shop/ProductDetail.tsx).

---

## 1. Framework options, trade-offs, and WebGPU/TSL maturity (late 2026)

### Takeaway
three.js + React Three Fiber (r3f) v9 + drei is the mainstream, React-19-compatible choice for this stack; WebGPU/TSL is usable via three.js (WebGPURenderer with WebGL2 fallback) but the r3f/drei WebGPU-native line (r3f v10 / drei v11) is still alpha as of the npm dist-tags, and WebGPU global coverage is roughly 76% by one source versus "~95%" by others, so WebGL remains the safe baseline. For product viewing/AR with minimal code, Google `<model-viewer>` is the lowest-effort option; Spline/Needle/PlayCanvas are editor-centric alternatives with vendor lock-in trade-offs.

### Cited Findings
**Versions (npm registry, fetched)**
- three.js npm `latest` is 0.186.1; the publish timestamp in registry metadata is 1790260941080 ms, which converts to roughly late September 2026 (my conversion; the fetch summary misdated it as 2025) — [npm three/latest](https://registry.npmjs.org/three/latest)
- @react-three/fiber dist-tags: `latest` 9.8.1, `rc` 9.0.0-rc.10, `beta` 9.0.0-beta.1, `alpha` 10.0.0-alpha.5, plus a `canary` build — [npm @react-three/fiber](https://registry.npmjs.org/@react-three/fiber)
- @react-three/drei dist-tags: `latest` 10.7.9, `alpha` 11.0.0-alpha.7 — [npm @react-three/drei](https://registry.npmjs.org/@react-three/drei)
- next `latest` is 16.3.8 with React peer range `^18.2.0 || 19.0.0-rc-... || ^19.0.0` — [npm next/latest](https://registry.npmjs.org/next/latest). The project itself pins next 16.2.2 and react/react-dom 19.2.4 — [package.json](../../package.json)

**React 19 / Next 16 compatibility**
- "@react-three/fiber@9 pairs with react@19" (r3f must pair with the matching React major) — [r3f installation docs (raw GitHub)](https://raw.githubusercontent.com/pmndrs/react-three-fiber/master/docs/getting-started/installation.mdx)
- r3f v8 is not compatible with React 19 / Next 15+, so v9 is required; v9 adds breaking changes under StrictMode and renames `Props` to `CanvasProps` (search summary) — [R3F v9 migration guide](https://r3f.docs.pmnd.rs/tutorials/v9-migration-guide)
- Known friction: a drei issue reports "invalid hook call" when mixing React ^19.1 and drei ^10 because `use-sync-external-store` (peer React ^18) caused `tunnel-rat` to pull a second React copy; fix is dependency overrides/dedupe (search summary) — [pmndrs/drei#2430](https://github.com/pmndrs/drei/issues/2430)
- Caution on registry peer-dependency summaries: the fetch summaries reported r3f 9.8.1 peers as "react >=17" and drei peers as "react-three-fiber >=5.0", which conflicts with the docs statement that r3f 9 pairs with React 19. I consider those peer-dep readings unreliable; verify with `npm view @react-three/fiber@9.8.1 peerDependencies` before install.

**WebGPU / TSL**
- r3f v10 is being developed with first-class WebGPU + TSL support; alpha releases add hooks `useUniforms`, `useNodes`, `useLocalNodes`, `useBuffers`, `useGPUStorage`, `useTextures`, and `useRenderPipeline` (replacing `usePostProcessing`); WebGPU entry point is `@react-three/fiber/webgpu` — [r3f v10.0.0-alpha.4 release](https://newreleases.io/project/github/pmndrs/react-three-fiber/release/v10.0.0-alpha.4), [10.0.0-alpha.5 release](https://newreleases.io/project/npm/@react-three/fiber/release/10.0.0-alpha.5), [r3f v10 webgpu hooks](https://www.skills.sh/prag-matt-ic/threenix-plugin/r3f-v10-webgpu-hooks)
- One setup guide lists the WebGPU combo as r3f 10.0.0-alpha.1 + drei 11.0.0-alpha.4 + React 19.2.3 + three 0.182.0 and states "R3F v10 and Drei v11 are currently in alpha for WebGPU support" (search summary) — [r3f v10 webgpu hooks](https://www.skills.sh/prag-matt-ic/threenix-plugin/r3f-v10-webgpu-hooks). npm dist-tags above confirm v10/v11 are still on the `alpha` tag, not `latest`.
- three.js release notes (fetched summary; dates in that summary were wrong, ignore them): r186 is the latest listed; WebGPU/TSL work continues (TSL compile-time improvements, `updateBefore/After` for compute, texture-array rendering), r184 added `HTMLTexture` and claims TSL compilation 3.0x faster, r183 deprecates `Clock` — [three.js releases](https://github.com/mrdoob/three.js/releases)
- Claim: three.js has shipped WebGPURenderer as the recommended renderer since r171 with zero-config import and automatic WebGL2 fallback; TSL compiles to WGSL and GLSL (search summary; one source dates r171 to September 2025, which I cannot confirm) — [Utsubo WebGPU migration guide](https://www.utsubo.com/blog/webgpu-threejs-migration-guide)
- Browser support per web.dev: WebGPU "now supported in major browsers": Chrome/Edge 113+ desktop (Windows D3D12, macOS, ChromeOS), Android Chrome 121+ (Android 12+, Qualcomm/ARM GPUs), Firefox 141 on Windows (macOS/Linux/Android "in progress" in that summary), Safari 26 (macOS Tahoe, iOS/iPadOS/visionOS 26) (search summary) — [web.dev: WebGPU is now supported in major browsers](https://web.dev/blog/webgpu-supported-major-browsers)
- CanIUse-derived coverage figure of ~76% globally, Android ~60% and GPU-driver dependent; Safari 26.x listed as "partial" support (search summary) — [caniuse WebGPU](https://caniuse.com/webgpu), [enterno WebGPU adoption 2026](https://enterno.io/en/s/research-webgpu-adoption-browsers-2026)
- Contradicting claim: ~95% of users have WebGPU-capable browsers, and Firefox 145 on macOS enabled by default (search summary, secondary blog) — [Alesta WebGPU guide](https://alestaweb.com/haber/webgpu-1-0-rehberi-2026-tarayicida-3d-render-ai-modellerini-gpu-ile-hizlandirma); contradicted on coverage by [caniuse](https://caniuse.com/webgpu)/[enterno](https://enterno.io/en/s/research-webgpu-adoption-browsers-2026) (~76%).
- Other titles surfaced (content not fetched, so not relied on): a note on "the one-line renderer swap and the Firefox caveat" — [buildmvpfast](https://www.buildmvpfast.com/blog/threejs-webgl-to-webgpu-renderer-migration-2026); "WebGPU baseline 2026, three.js, WebXR default" — [vr.org](https://vr.org/articles/webgpu-baseline-2026-three-js-webxr-default)

**Alternatives (search summaries; several are vendor-authored)**
- Three.js = low-level JS 3D library; R3F = React renderer mapping components/hooks onto three.js; Spline = browser-based collaborative 3D design + animation tool with self-contained web export; Needle = open-source engine + proprietary cloud editor (Unity/Blender authoring plugins, web-component embed, cloud optimization/hosting); PlayCanvas = open-source runtime + proprietary web editor, aimed more at games, steeper learning curve and less flexible for embedding in web apps — [Needle compare: Needle vs R3F vs Spline](https://cloud.needle.tools/compare/needle-vs-r3f-vs-spline), [Needle vs PlayCanvas vs R3F](https://cloud.needle.tools/compare/needle-vs-playcanvas-vs-r3f), [Cinevva PlayCanvas vs three.js](https://app.cinevva.com/guides/playcanvas-vs-threejs). Needle's pages are vendor marketing and likely biased toward Needle.
- Utsubo has a "Three.js vs Babylon.js vs PlayCanvas: which 3D library in 2026" comparison, but I could not fetch it (blocked), so no numbers are reported — [Utsubo comparison](https://www.utsubo.com/ja/blog/threejs-vs-babylonjs-vs-playcanvas-comparison)
- `<model-viewer>`: web component for interactive 3D models with AR via iOS Quick Look, Google Scene Viewer, and WebXR — [model-viewer npm summary (tessl)](https://tessl.io/registry/tessl/npm-google--model-viewer). Shopify uses model-viewer for its 3D media with AR for its merchants; Hydrogen exposes a `ModelViewer` component for the Storefront API `Model3d` object — [Shopify Hydrogen ModelViewer docs](https://shopify.dev/docs/api/hydrogen/latest/components/media/modelviewer.md). Android/desktop use GLB, iOS AR wants USDZ (search summary of a WooCommerce plugin description; weak source) — [AR for WooCommerce plugin page](https://dsb.wordpress.org/plugins/?p=347090)

### Inferences
- For a small solo-run merch/art shop already on Next 16 + React 19, the realistic shortlist is: (a) r3f 9.8.x + drei 10.7.x + three 0.18x on WebGL (stable path, React 19 explicitly supported), (b) `<model-viewer>` for "view on a table / AR" with the least code, (c) pre-rendered Blender assets (see Q5). Staying on r3f `latest` (v9) with the classic WebGLRenderer, and treating WebGPU/TSL as an opt-in later, is the lowest-risk choice because r3f 10 / drei 11 are still alpha and ~24%+ of users may lack WebGPU (per caniuse-derived figure); WebGPURenderer's WebGL2 fallback mitigates but does not remove migration risk (postprocessing, custom shaders).
- Spline/Needle/PlayCanvas add an editor and hosting/runtime dependency; for a brand whose pipeline already includes Blender, a code-first glTF pipeline avoids lock-in. Needle's Blender lightmapping docs (see Q5) show it as a legitimate Blender-centric option if the owner wants an editor rather than code.
- (background knowledge, not verified this session) Babylon.js is a full engine with strong WebGPU support and a bigger bundle than three.js; Theatre.js is a timeline/animation-sequencing tool that integrates with r3f for authored camera/scroll choreography; Rive is a 2D-vector/state-machine animation runtime (good for UI mascot micro-interactions, not 3D). Treat these as unverified.
- (background knowledge) framer-motion-3d has been unmaintained/lagging behind Framer Motion 12 and React 19; safer to drive three.js objects with `useFrame` + damping (e.g. `maath`) or Motion values read in `useFrame` than to depend on it. Not verified.

### Gaps
- No primary-source confirmation of Babylon.js, Theatre.js, Rive, Needle, PlayCanvas specifics (bundle sizes, licensing, WebGPU status); the relevant sites were blocked or not searched.
- No confirmation of which three.js release introduced zero-config WebGPURenderer, or exact release dates for r171–r186 (secondary sources conflict/garbled).
- Could not verify actual peerDependencies of r3f 9.8.1 / drei 10.7.9 (fetch summaries look wrong); could not verify whether drei 10.7.9 officially supports three 0.186.
- Exact WebGPU coverage in late 2026 is disputed (76% vs 95%); Firefox macOS/Linux/Android status is conflicting between sources.
- Whether `framer-motion-3d` works with React 19/Framer Motion 12 was not checked.

---

## 2. Integration with Next.js 16 App Router (client components, SSR, Canvas lifecycle, perf, a11y, SEO, CWV)

### Takeaway
Render the `<Canvas>` only in the browser: a `"use client"` module that is loaded via `next/dynamic(..., { ssr: false })` with a sized placeholder, using `frameloop="demand"`, a capped `dpr`, and (for multiple 3D slots on one page) drei's `View` so one WebGL context serves many DOM regions. Always ship a poster/static fallback and a `prefers-reduced-motion` branch; canvas content is invisible to crawlers and screen readers, so real HTML must carry the product text.

### Cited Findings
**Hydration / SSR**
- App Router server-renders the initial HTML even for `"use client"` components, so `"use client"` alone is not enough for WebGL code; `next/dynamic({ ssr: false })` skips the server pass and loads the component only in the browser; recommended pattern is `dynamic(() => import('./Scene'), { ssr: false })` with a loading placeholder, otherwise a hydration mismatch yields a flash of placeholder then a jank pop-in (search summary) — [Noqta: R3F + Next.js tutorial 2026](https://www.noqta.tn/en/tutorials/react-three-fiber-nextjs-3d-interactive-web-2026), [FixDevs: R3F not working](https://fixdevs.com/blog/react-three-fiber-not-working/)
- Canvas must be in a Client Component; WebGL cannot run during server rendering (search summary) — [Noqta](https://www.noqta.tn/en/tutorials/react-three-fiber-nextjs-3d-interactive-web-2026)
- A note that React's Suspense boundary resolves on the server regardless of `ssr` option in older React 18 behavior (search summary; relates to issue discussion, not re-verified for React 19) — [vercel/next.js#39609](https://redirect.github.com/vercel/next.js/issues/39609)
- r3f install docs cover Next.js mostly as a transpilation/build config note for Next 13.x; they do not discuss `'use client'` (fetched) — [r3f installation docs](https://raw.githubusercontent.com/pmndrs/react-three-fiber/master/docs/getting-started/installation.mdx)

**Performance (fetched from r3f docs source)**
- On-demand rendering: `<Canvas frameloop="demand">` renders only when needed; call `invalidate()` for changes React doesn't know about (e.g. camera controls) — [r3f scaling-performance docs](https://raw.githubusercontent.com/pmndrs/react-three-fiber/master/docs/advanced/scaling-performance.mdx)
- `PerformanceMonitor` tracks average FPS and calls back with a 0–1 `factor` to scale quality; `regress()` temporarily lowers the performance factor during interaction so components can reduce resolution during motion; adjusting `dpr` dynamically gives quick gains; `<instancedMesh>` renders huge object counts in one draw call; dispose geometries/materials on unmount (the `dispose` prop helps) — [r3f scaling-performance docs](https://raw.githubusercontent.com/pmndrs/react-three-fiber/master/docs/advanced/scaling-performance.mdx)
- drei README (docs moved to pmndrs.github.io/drei) lists the relevant helpers: View, Environment, Lightformer, ContactShadows, AccumulativeShadows, RandomizedLight, ScrollControls, PresentationControls, Bounds, Stage, Float, Html, Decal, Detailed (LOD), AdaptiveDpr, PerformanceMonitor, useGLTF, Preload — [drei README](https://raw.githubusercontent.com/pmndrs/drei/master/README.md)

**drei `View` (multiple 3D slots, one canvas) — from source (fetched summary of View.tsx)**
- `View` renders three.js scenes into DOM regions; it routes to an HTML-side or canvas-side implementation depending on context; props: `visible` (invisible views are cleared once then stop rendering), `index` (render priority, default 1), `frames` (update frequency; `Infinity` = continuous, a number limits `getBoundingClientRect` position recalcs), `track` (described as deprecated/optional in the summary), `children`; `View.Port` is the tunnel outlet; implementation uses scissor + viewport to clip, adjusts camera aspect per region, restores GL state, does offscreen detection to skip rendering, and handles pointer-event coordinate transforms — [drei View.tsx](https://raw.githubusercontent.com/pmndrs/drei/master/src/web/View.tsx)

**Accessibility, fallbacks, Core Web Vitals**
- Thresholds quoted: LCP target under 2.5 s; INP under 200 ms; CLS also a Core Web Vital and ranking signal; animation-heavy implementations can hurt all three — [Hontran: Core Web Vitals for animation-heavy sites](https://www.hontran.dev/blog/core-web-vitals-for-animation-heavy-sites), [Google Search: Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)
- For WebGL, the reduced-motion branch should skip auto-rotation and continuous shaders or render a static poster; respect `prefers-reduced-motion`, `focus-visible`, and keep a screen-reader content layer; lazy-load heavy assets with an immediate non-WebGL poster; serving a static image on mobile "wins on every Core Web Vital that matters" (search summary) — [Hontran](https://www.hontran.dev/blog/core-web-vitals-for-animation-heavy-sites), [Svilenkovic: 3D website best practices](https://www.svilenkovic.com/3d/3d-website-best-practices)
- A guide titled "WebGL & Three.js Site SEO: How to Make 3D Sites Rankable in 2026" exists (not fetched) — [Utsubo SEO guide](https://www.utsubo.com/blog/webgl-three-js-site-seo-rankable-guide)
- Local project context: `ProductDetail.tsx` is already `"use client"`; `ProductColor` has `{ name, hex, images[] }`, and `Product` has `colors`, `variants` (size, color, `printfulSyncVariantId`), `category` ("T-Shirt"/"Hoodie"/"Print"/…) — [src/components/shop/ProductDetail.tsx](../../src/components/shop/ProductDetail.tsx), [content/shop.ts](../../content/shop.ts)

### Inferences
- Recommended file layout for this repo (inference from the above + local code): `src/components/three/` with `ProductViewerClient.tsx` (`"use client"`, wraps `dynamic(() => import("./ProductViewerScene"), { ssr: false, loading: () => <Poster/> })`) and `ProductViewerScene.tsx` (Canvas, drei, useGLTF). Import the dynamic wrapper from the already-client `ProductDetail.tsx`. `next/dynamic` with `ssr:false` must live in a Client Component (background knowledge; nextjs.org docs page was blocked, so not verified).
- Reserve the viewer's aspect ratio in CSS (e.g. `aspect-square`) and show the existing Printful mockup `<Image>` as the poster so that (a) LCP is the static mockup, not the canvas, (b) CLS is zero when the canvas mounts, and (c) the canvas fades in over the poster after the GLB is decoded. Since the shop already has `pf_mock_*` mockups per color, the poster/fallback and the no-WebGL/reduced-motion path cost almost nothing.
- Defer canvas mount until the viewer is visible/idle (IntersectionObserver or "tap to view in 3D" button). A "tap to activate 3D" pattern keeps LCP/INP clean on mobile, is keyboard-focusable by default, and avoids the page-scroll hijacking problem of OrbitControls/ScrollControls on touch.
- Use `frameloop="demand"` for product viewers (static product + damped orbit only re-renders when interacting); keep `frameloop="always"` only for the ambient hero. Cap `dpr={[1, 1.5]}` (or `[1,2]` on desktop) and use `AdaptiveDpr`/`PerformanceMonitor` for mobile.
- If a page needs several 3D slots (e.g. product grid cards or gallery tiles), use one Canvas + `View` per slot rather than one Canvas per slot, to avoid multiple WebGL contexts (background knowledge: browsers cap simultaneous WebGL contexts, commonly ~16 and fewer on mobile; not verified here). Grid cards (`ProductCard`) should stay as 2D images with an optional hover swap, as the architecture note says they are catalog-only.
- Accessibility checklist (partly background knowledge): `role="img"` + `aria-label` (alt text) on the canvas wrapper; real HTML for name/price/description (already in `ProductDetail`); keyboard orbit via arrow keys (drei `OrbitControls` has `listenToKeyEvents`) and visible "rotate left/right/reset" buttons; `prefers-reduced-motion: reduce` -> no auto-rotate, no scroll-jacking, show static mockup; also respect Save-Data/low-power (`navigator.connection.saveData`, `deviceMemory`, `hardwareConcurrency`) to skip 3D.
- SEO: canvas content is not indexable, so product schema/JSON-LD, headings, and `<Image alt>` must stay in server-rendered HTML; the 3D layer is progressive enhancement.

### Gaps
- Could not read the official Next.js docs (nextjs.org blocked), so the `ssr:false`-only-in-client-components rule and Next 16/Turbopack specifics (e.g. `transpilePackages` need for three/r3f/drei in Next 16) are unverified.
- No measured data on r3f's real LCP/INP/CLS impact or bundle size (three + r3f + drei tree-shaken); would need a bundle analysis on this repo.
- No verified numbers for WebGL context limits, memory budgets on iOS Safari, or the behavior of `View` on mobile.
- Accessibility guidance specific to canvas (ARIA patterns, WCAG 2.2 criteria such as 2.2.2 Pause/Stop/Hide for auto-moving content) was not sourced.

---

## 3. Interaction patterns that feel premium

### Takeaway
The patterns that read as "premium" are restrained and tied to the product: damped/constrained orbit with a good Environment light, color/material swaps synced to real shop variants, soft contact shadows, and scroll-linked camera moves that are short and purposeful. For apparel, decals/textures on a modelled garment plus baked fabric detail matter more than flashy effects.

### Cited Findings
- Apparel customization with r3f is commonly done with drei's `Decal` (props like `map`, `scale`, `position`) — "a single line of code" given an image — with z-fighting avoided via `depthWrite: false`, `polygonOffset: true`, `polygonOffsetFactor: -1`; the alternative is drawing to a 2D canvas and using it as a texture, which is less intuitive and doesn't scale to multiple images (search summary) — [three.js forum: images/text/decals on a model](https://discourse.threejs.org/t/best-way-to-render-images-text-on-model-textures-decals-etc/48608), [DEV: 3D T-shirt configurator with three.js and fabric.js](https://dev.to/apcliff/3d-tshirt-configurator-with-threejs-and-fabricjs-31j9)
- Open-source t-shirt configurators exist as references (logo upload, texture swap) — [react-shirt-sculpt](https://github.com/paul-daniel/react-shirt-sculpt), [Tshirtthree](https://github.com/GoingGenius/Tshirtthree), [three.js forum: 3D T-shirt designer](https://discourse.threejs.org/t/3d-t-shirt-designer/67987)
- A "full course on R3F configurators covers design, model compression, and texture baking for realism" (search summary, no specific course verified) — [search result set for T-shirt configurator](https://discourse.threejs.org/t/sportswear-design-configurator/8792)
- drei provides the building blocks for these patterns: `ScrollControls` (scroll-driven), `PresentationControls` (constrained drag rotation), `Bounds` (fit/animate camera), `Html` (DOM annotations/hotspots), `Float`, `Stage`, `Environment` + `Lightformer`, `ContactShadows`, `AccumulativeShadows` + `RandomizedLight`, `Decal` — [drei README](https://raw.githubusercontent.com/pmndrs/drei/master/README.md)
- `<model-viewer>` supports AR (Quick Look, Scene Viewer, WebXR) — [model-viewer summary](https://tessl.io/registry/tessl/npm-google--model-viewer); Shopify's AR/3D media is built on it — [Shopify Hydrogen ModelViewer](https://shopify.dev/docs/api/hydrogen/latest/components/media/modelviewer.md)
- Scroll-scrubbed product storytelling (AirPods-style) is implemented as an image sequence on a `<canvas>`, not real-time 3D — see Q4 — [SetProduct](https://www.setproduct.com/blog/how-to-3d-animate-scroll)
- Time budget guidance: LCP < 2.5 s, INP < 200 ms — [Hontran](https://www.hontran.dev/blog/core-web-vitals-for-animation-heavy-sites)

### Inferences
- (background knowledge, not verified this session; names/APIs from memory) Pattern catalog with effort/impact:
  - Constrained orbit: `OrbitControls`/`PresentationControls` with `enablePan={false}`, `minPolarAngle/maxPolarAngle`, `enableZoom` limited or off (avoids scroll-trap), `enableDamping`, `makeDefault`, plus `autoRotate` that stops on first interaction. Highest value/lowest effort.
  - Color/variant swap: drive `material.color` (or swap textures) from the selected `ProductColor.hex` in `ProductDetail`; animate with a damped lerp inside `useFrame` (call `invalidate()` when `frameloop="demand"`). Direct link to shop state: the same `color` state that picks Printful images picks the 3D tint, and `printfulSyncVariantId` stays untouched in checkout.
  - Hover/parallax tilt and cursor-follow: pointer-driven group rotation damped via `maath` or manual lerp; for 2D art cards use Framer Motion `useMotionValue`/`useTransform` (no WebGL needed).
  - Hotspots/annotations: drei `Html` anchored to 3D points with `occlude`; for the mascot "speech bubbles" in the brand's dry voice. Keep text in real DOM for accessibility.
  - Exploded view: animate child mesh positions apart along local axes; mainly relevant for hardware-style products, low relevance for a T-shirt.
  - Material swapping (e.g. cotton vs. heather vs. hoodie fleece): normal/roughness maps + sheen; `MeshPhysicalMaterial.sheen` helps cloth; only the garment GLB needs to be authored once.
  - Soft shadows: `ContactShadows` (cheap, mostly static) for product-on-floor; `AccumulativeShadows` for richer baked-looking shadows (costly, run once with `frames`); ideally bake in Blender for the final hero.
  - Lighting: `Environment` with a small HDRI or procedural `Lightformer` rig for studio softboxes; `Stage` for quick start. HDRI/KTX2 weight matters for LCP, so lazy-load.
  - Scroll-driven: `ScrollControls` (self-contained, takes over the scroll container; awkward alongside Lenis/native page scroll), versus GSAP ScrollTrigger/Lenis driving a shared progress value read in `useFrame` (more flexible for normal pages). For this site, a simple Framer Motion `useScroll` progress read from a `useFrame` loop is the lowest dependency cost because the project already ships Framer Motion 12.
  - Page transitions: keep 3D canvas persistent in a layout and animate scene state per route (shared canvas) rather than remounting; effort is high and adds risk with App Router; not worth it unless a hero experience is central.
  - AR try-before-buy: needs GLB + USDZ; for flat apparel, AR "try on" is not practical; "place art on my wall" AR for prints (posters) is more natural and cheap (planar model with texture).
- Apparel realism recipe (inference): model the garment in Blender with proper UVs, bake AO/cloth wrinkles/normal into textures, export glTF, apply the print as a `Decal` or a UV-mapped texture layer, and use `sheen` + soft environment light. Expect the most work in cloth drape credibility; a modest, stiff "flat-lay with slight volume" garment reads better than a bad simulated drape.

### Gaps
- No primary-source verification of drei prop names/behaviors (docs blocked); the effort/impact judgments are my own.
- No source on `ScrollControls` vs Lenis/GSAP conflicts, or Next.js page-transition patterns with persistent canvases.
- No evidence on AR-for-apparel conversion; Shopify AR stats in Q4 are for generic 3D/AR, mostly furniture/strollers/etc.

---

## 4. Case studies and inspiration

### Takeaway
The proven exemplars split into two camps: navigable/real-time 3D "experience" sites (Bruno Simon) and conversion-minded product pages that fake 3D with pre-rendered image sequences (Apple AirPods). Shopify's own 3D/AR stats are marketing-grade but consistently point to uplift when shoppers interact with a 3D model.

### Cited Findings
- Bruno Simon's portfolio is a driveable 3D world built with three.js; won Awwwards Site of the Year 2020 with 400,000+ visits; in January 2026 it received Developer Award and Site of the Month at Awwwards (search summary) — [Awwwards: Bruno's Portfolio](https://www.awwwards.com/sites/brunos-portfolio), [Pastel: portfolio drew 400,000 visitors](https://usepastel.com/blog/how-a-design-portfolio-got-the-attention-of-400-000-visitors), [Creative Bloq coverage](https://www.creativebloq.com/news/3d-car-portfolio)
- Apple's AirPods Pro page animation is implemented as a `<canvas>` fed by a pre-extracted image sequence (about 60–180 frames loaded progressively), mapped to scroll position; no `<video>` and no WebGL for the main effect (third-party description, not Apple documentation; search summary) — [SetProduct: AirPods-style scroll animation](https://www.setproduct.com/blog/how-to-3d-animate-scroll), [CSS-Tricks](https://css-tricks.com/?p=308477)
- The AirPods Pro site won Awwwards Site of the Month (January) — [Awwwards](https://awwwards.com/airpods-pro-wins-site-of-the-month-january.html)
- Shopify 3D/AR marketing figures (search summary; vendor/aggregator claims, not independently verified): 3D models with AR "increased conversion rates by up to 250%"; another source "94% on average"; Rebecca Minkoff: shoppers who interacted with 3D models were 44% more likely to add to cart and 27% more likely to order, 65% more likely to buy after AR; Bumbleride: +33% conversion and up to +21% time on page; returns down 40% after 3D visualization — [Retail Dive](https://www.retaildive.com/news/shopify-launches-3d-model-video-integration-for-merchants/574459), [BrainStation](https://brainstation.io/magazine/shopify-launches-3d-product-images-and-video-for-merchants), [Sayduck 3D/AR statistics](https://sayduck.com/3d-and-ar-statistics-2022), [Shopify blog](https://www.shopify.com/blog/3d-models-video%20)
- Needle documents a Blender lightmapping workflow for web — [Needle: Blender lightmapping](https://engine.needle.tools/docs/blender/lightmapping)

### Inferences
- The two lessons that transfer: (1) Bruno-style delight is brand-building but is a "destination" and doesn't need to sell; (2) Apple-style scroll sequences sell products with predictable performance because heavy rendering is done offline. For Himmels Makrele (humorous, ironic, art-first), a small number of well-chosen 3D moments (mascot hero, one tee viewer) beat a fully 3D site.
- Nike/Adidas configurators, Active Theory, Codrops tutorials, Awwwards/FWA 2026 winners, and the Codrops WebGPU tutorials: I could not fetch these (Codrops/Awwwards pages blocked); they are not reported as findings. (background knowledge) Nike By You / Adidas configurators are largely 2D-layer or pre-rendered compositing with some 3D viewers; unverified.
- Shopify's statistics are the strongest commercial argument for 3D/AR on product pages, but they come from vendors/aggregators and for categories (furniture, strollers, accessories) where shape/scale uncertainty drives returns; a print-on-demand tee has less to gain, so expect smaller effects. This is an inference, not a finding.

### Gaps
- No primary Awwwards/FWA 2026 list of 3D winners; no Codrops tutorial links verified; no Nike/Adidas/Active Theory sources.
- Shopify uplift figures lack primary citations (original Shopify case studies not fetched; some stats are from 2019–2022).
- No source for the actual technology stack of Bruno Simon's 2026 portfolio beyond "three.js".

---

## 5. Matching Blender quality in realtime — and when to prefer pre-rendered video/image sequences

### Takeaway
Realtime can approach Blender renders when lighting/shadows/AO are baked into textures (lightmaps/diffuse bakes), geometry is kept light, and a good HDRI + tone mapping + subtle post (bloom, AO) are applied; but for hero shots, cloth, translucent/fur-like fish skin, and anything where fidelity beats interactivity, an offline Cycles render shown as a scroll-scrubbed image sequence or short video loop is cheaper, more robust, and faster to load.

### Cited Findings
- Baking lightmaps and AO in Blender gives good-looking lighting without real-time calculation; workflow: set up lights, add a second UV channel for the lightmap (separate from the texture UV), bake combined or diffuse via Cycles, save PNG/JPG (optionally convert to KTX2), apply via `MeshStandardMaterial.lightMap` with the proper UV2 attribute (search summary) — [Educative: Blender to bake lightmaps and AO](https://www.educative.io/courses/learn-threejs-for-computer-graphics/blender-to-bake-lightmaps-and-ambient-occlusion), [three.js forum: bake light maps](https://discourse.threejs.org/t/bake-light-maps/21165)
- `aoMap` is a single-channel (red) texture while `lightMap` is three-channel RGB; baking AO still requires other light sources (ambient/point or an environment map); baking Diffuse (full lighting) produces an effectively unlit texture usable with `MeshBasicMaterial` — [three.js forum: light map stored as AO map](https://discourse.threejs.org/t/will-light-map-that-store-as-ao-map-in-blender-cause-any-lighting-data-loss/25030), [three.js forum: how to bake a scene](https://discourse.threejs.org/t/how-to-bake-a-3d-scene-from-three-js/31428)
- Further workflow references: [Svilenkovic: how to bake lighting for web](https://www.svilenkovic.com/3d/how-to-bake-lighting-for-web); [Needle Blender lightmapping docs](https://engine.needle.tools/docs/blender/lightmapping); [three.js forum: bake lighting/AO into vertex colors](https://discourse.threejs.org/t/how-would-i-begin-to-bake-lighting-ao-into-vertex-color-data/48689); [Babylon forum: bake realistic render](https://forum.babylonjs.com/t/how-to-bake-realistic-render-in-browser/26569)
- Apple's AirPods Pro scroll sequence is pre-rendered frames on canvas, which delivers instant, smooth, scroll-locked playback compared with video seeking — [SetProduct](https://www.setproduct.com/blog/how-to-3d-animate-scroll)
- three.js r184 reports 3.0x faster TSL compilation and r186 continues WebGPU/TSL optimization (relevant to post/AO effects in WebGPU) — [three.js releases](https://github.com/mrdoob/three.js/releases)
- Mobile/low-power: a static image on mobile "wins on every Core Web Vital that matters" (search summary) — [Hontran](https://www.hontran.dev/blog/core-web-vitals-for-animation-heavy-sites)

### Inferences
- (background knowledge, not verified this session) Realtime "Blender-like" checklist: (1) bake AO + lightmap or full diffuse for static scene elements; (2) use an HDRI (`Environment`) at modest resolution/KTX2, with intensity tuned; (3) `ACESFilmic`/AgX tone mapping and sRGB output; (4) post: subtle bloom, `N8AO` (pmndrs) for screen-space AO, optional SMAA; (5) glTF with Draco/meshopt + KTX2 textures (`gltf-transform`, `gltfjsx` for r3f components); (6) keep polys low, normal-map the detail; (7) `AccumulativeShadows`/`ContactShadows` or baked shadow planes.
- What does not translate well realtime: cloth with correct drape/subsurface, hair/fur, volumetrics, caustics, true glass/refraction (transmission is costly), heavy depth of field. A mackerel's iridescent skin can be approximated with `MeshPhysicalMaterial` iridescence/clearcoat in realtime, but hero-quality is easier via Cycles.
- Decision rule: if the user can't meaningfully change the camera or lighting (hero loop, brand intro, "turntable"), pre-render (video loop in `<video muted playsinline>` AV1/H.264 + WebP poster, or 60–120 frame WebP/AVIF sequence on canvas). If the user needs orientation, color switching, or AR, go realtime (or hybrid: pre-rendered per-color turntable frames, which maps 1:1 to the existing `colors[]` data and Printful variants).
- Hybrid trick: Blender can render each color variant as a short turntable (e.g. 36 frames), giving "drag to rotate" via frame scrubbing with zero WebGL (image sequence + pointer drag); file weight approx 36 x 20-40 KB WebP per color is modest (my estimate, not sourced).

### Gaps
- No sourced data on N8AO/SSAO/bloom settings, tone-mapping recommendations, or quantified quality/perf comparisons; the Blender-to-glTF specifics (Principled BSDF -> glTF limits, baking in Cycles) were only covered by forum summaries.
- No sources for video vs image-sequence file-size/bitrate trade-offs, AV1/HEVC browser support for alpha video, or Safari autoplay rules.
- No verified source for Draco/meshopt/KTX2 toolchain versions.

---

## 6. Practical mapping for Himmels Makrele and ranked feature ideas

### Takeaway
Start with a low-risk 3D "layer" on product pages (tee/hoodie viewer tied to the existing color state, with Printful mockup posters as fallback) and a pre-rendered mascot hero; consider a flocking-fish hero ("one mackerel swims against the school") as a signature brand piece; defer the full virtual gallery until more artworks than Wolf and Giraffant exist.

### Cited Findings
- Local state: the repo has no three/r3f/drei dependencies yet; Next 16.2.2, React 19.2.4, framer-motion ^12.38.0, Tailwind v4 — [package.json](../../package.json)
- Shop data model already has per-product `colors: { name, hex, images[] }` and `variants` with `printfulSyncVariantId`; `ProductDetail.tsx` is a client component with a color swatch rendering `color.hex` — [content/shop.ts](../../content/shop.ts), [ProductDetail.tsx](../../src/components/shop/ProductDetail.tsx)
- Only two finished artworks exist locally in the gallery asset folder (Wolf.jpg, Girrafant.jpg; other files are placeholders), consistent with the CLAUDE.md todo "Wolf + Giraffant sind da, Rest fehlt" — [public/assets/gallery](../../public/assets/gallery), [CLAUDE.md](../../CLAUDE.md)
- Brand tone constraints (adult, dry, ironic; "Mit dem Schwarm schwimmen"; "Sei so frei wie die Himmels Makrele") — [CLAUDE.md](../../CLAUDE.md)
- drei offers `Decal`, `Environment`/`Lightformer`, `ContactShadows`, `View`, `ScrollControls`, `PresentationControls`, `Html`, `Float` — [drei README](https://raw.githubusercontent.com/pmndrs/drei/master/README.md)
- `<model-viewer>` + GLB/USDZ is the established route to AR on Shopify and others — [Shopify Hydrogen ModelViewer](https://shopify.dev/docs/api/hydrogen/latest/components/media/modelviewer.md), [model-viewer summary](https://tessl.io/registry/tessl/npm-google--model-viewer)
- The image-sequence-on-canvas approach used by Apple is a proven alternative to realtime 3D for scroll storytelling — [SetProduct](https://www.setproduct.com/blog/how-to-3d-animate-scroll)

### Inferences (ranked by impact vs effort; all effort/impact ratings are my judgment)
1. **Pre-rendered Blender mascot hero + scroll-scrubbed turntable (Effort: low-medium, Impact: high, Risk: very low).** Render the mackerel (and optionally the Wolf/Giraffant tee) in Cycles; ship as a looping `<video>` or a 60-120 frame WebP sequence on `<canvas>` driven by Framer Motion `useScroll`. Excellent LCP (poster first), no WebGL, ironic captions in the brand voice. Hybrid option: per-color turntable frames matched to `colors[]`.
2. **T-shirt/hoodie 3D viewer on `/shop/[productId]` with color swap (Effort: medium, Impact: medium-high, Risk: low-medium).** r3f + drei: one garment GLB per category (T-Shirt, Hoodie), `Decal`/UV texture from the product artwork, `Environment` + `ContactShadows`, damped constrained orbit, `frameloop="demand"`, tap-to-activate, Printful mockups as posters/fallback and for `prefers-reduced-motion`. Selected `ProductColor.hex` tints the material; checkout stays unchanged (`printfulSyncVariantId`). Caveat: the 3D garment is an approximation and must not contradict the Printful mockup customers actually receive; treat as "illustrative" or use the Printful mockups as the primary imagery. Needs per-category garment modelling (kids/baby `sizeFamily` shapes would use the adult shape or be excluded).
3. **"Schwarm" hero: instanced school of fish with one mackerel swimming against the flow (Effort: medium, Impact: high on brand, Risk: medium).** `InstancedMesh` + simple boids or sine-path flocking; one hero fish uses the full Blender-quality model; cursor gently attracts/repels; `Html` hotspot bubbles with dry one-liners; static poster for mobile/reduced-motion. Aligns directly with "Mit dem Schwarm schwimmen". Keep it a single hero canvas, load lazily after LCP.
4. **`<model-viewer>` + AR "see the print on your wall" for Prints/gallery works (Effort: low-medium, Impact: medium, Risk: low).** A flat framed-print GLB (plus USDZ for iOS) using the artwork texture; web component loaded lazily client-side; provides AR without custom r3f code. For apparel, AR is low value.
5. **Virtual 3D gallery room for Wolf/Giraffant (Effort: high, Impact: medium, Risk: high).** Single r3f scene with baked room lightmap, framed planes with artwork textures, click-to-focus via `Bounds`, keyboard navigation and a parallel accessible 2D list. Defer until more finished artworks exist (only two currently); a cheaper stand-in is a 2.5D tilt/parallax lightbox using Framer Motion (no WebGL).

- Suggested sequencing: (1) -> (2) -> (3) in that order; (4) opportunistically; (5) later. Add dependencies only when starting (2)/(3): `three`, `@react-three/fiber@^9`, `@react-three/drei@^10`, `@types/three`; pin React to 19.x and run `npm ls react` to confirm a single React copy (drei issue above).
- Content/asset pipeline: Blender -> glTF (Draco/meshopt + KTX2) -> `public/assets/models/`; Blender renders -> WebP/AVIF in `public/assets/shop/` or a new `public/assets/3d-posters/`; keep `.blend`/`.psd`-like source files out of Vercel via `.vercelignore` (project already excludes `.psd`).
- Brand voice for the 3D UI: tooltips/hotspots/loading text should follow the "Himmels Makrele" dry, ironic tone (e.g. loading text in character), per CLAUDE.md.

### Gaps
- Whether Printful offers usable 3D/GLB garment assets, or whether the print placement data (area/position per product) is available via API to place a `Decal` accurately, was not researched.
- No research on garment GLB sourcing (licensing, free vs paid) or on the effort to model/UV a tee and hoodie with believable cloth.
- Not verified: how `kids`/`baby` `sizeFamily` products should be represented in a 3D viewer.
- Bundle-size, build-time, and Vercel deployment impacts for this repo were not measured.
- Hosting limits for GLB/HDRI assets on Vercel (static asset size, caching) were not checked.
