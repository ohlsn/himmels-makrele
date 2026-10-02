# Advanced Blender Rendering Tricks and Best Practices (Blender 4.x / 5.x, as of Oct 2026)

> **Method note for the report writer (read first).** In this session the egress proxy blocked `WebFetch` for almost every relevant domain (docs.blender.org, developer.blender.org, devtalk.blender.org, blenderartists.org, 80.lv, cgchannel, digitalproduction, blenderguru.com, etc.). Only two pages could be opened directly: the AgX GitHub README and the Intel OIDN GitHub README. Every other "Cited Finding" below comes from the *search-tool result summaries* attached to the listed URLs, not from my reading the full page. I flag aggregator or vendor sources per bullet. Numbers that I could not source are NOT in "Cited Findings"; they appear under "Gaps" as clearly labelled, unverified practitioner starting points from background knowledge. Blender versions seen in results: 5.0 (Nov 2025), 5.1 (Mar 2026), 5.2 LTS (14 Jul 2026, supported until Jul 2028); Blender manual URLs for 5.3 also appear in results (so 5.3 is in development).

---

## 1. Cycles vs EEVEE (Next), Cycles sampling/denoising/light-path settings, GPU/CPU, render-time optimisation

### Takeaway
Cycles remains the choice for physically accurate stills (glass, caustic-ish effects, interiors, volumes); EEVEE Next (since 4.2) is a real-time, ray-traced-ish rasteriser that is good for fast iteration and animation. For Cycles finals the sourced controls are: adaptive sampling with a Noise Threshold (typical 0.1 to 0.001), OpenImageDenoise (default, highest quality) or OptiX, separate indirect clamping, caustics toggles, Light Tree (default since 3.5) and a GPU backend per vendor. Blender 5.0 to 5.2 added a new volume algorithm, a Texture Cache, Thin Wall, and faster EEVEE shader compilation.

### Cited Findings

**Engine choice**
- EEVEE Next (Blender 4.2, July 2024) brought a new global-illumination system using screen-space ray tracing, "unlimited lights", and Virtual Shadow Maps (shadow maps up to 4096 vs 1024 previously, fewer artifacts and biases, simpler setup); Cycles is described as simulating light physically through ray bounces, refraction and scattering, while EEVEE Next uses rasterisation plus advanced lighting tricks. — [CGChannel on EEVEE Next](https://www.cgchannel.com/2024/07/eevee-next-finally-arrives-in-blender); [iRendering: what's new in EEVEE Next](https://irendering.net/blender-4-2-explore-whats-new-in-eevee-next/); [GarageFarm](https://garagefarm.net/blog/a-new-generation-of-real-time-rendering-with-eevee-next) (aggregator-level sources)
- Aggregator guidance: EEVEE uses TAA samples, "64 render samples typically sufficient"; EEVEE Next is slower than legacy EEVEE but gives much better reflections than the old probe-based approach. The same summary claims "hardware ray tracing" support for EEVEE Next in 4.2, which I could not verify and which conflicts with my recollection that 4.2 used screen-space tracing with probe fallback. Treat as unverified. — [iRendering: Cycles vs EEVEE Next (2026)](https://irendering.net/blender-cycles-vs-eevee-next-2026-when-to-use-real-time-when-to-use-ray-tracing/); [Blender Artists thread "Cycles vs EEVEE Next comparison"](https://blenderartists.org/t/cycles-vs-eevee-next-comparison/1540799)

**Adaptive sampling / noise threshold**
- Adaptive sampling reduces samples in clean areas; with a Noise Threshold you render to a target noise level; "typical values in the range from 0.1 to 0.001", lower = less noise; setting it to exactly 0 lets Cycles guess an automatic value from the total sample count. Min Samples = 0 (default) is auto-derived from the Noise Threshold. — [Blender 4.1 manual, Cycles Sampling](https://docs.blender.org/manual/en/4.1/render/cycles/render_settings/sampling.html)
- Practitioner/aggregator guidance: adaptive sampling with Noise Threshold 0.01 is recommended for balanced quality/speed, but a threshold of 0.01 combined with a max of only ~200 samples will not clean the image; final-render sample counts of 2048-4096 for complex scenes (glass, SSS, many bounces) and 512-1024 for simple product shots. — [CGAxis render setup guide (2026)](https://cgaxis.com/complete-blender-render-setup-guide-for-photorealistic-results-2026/) (search-summary only, aggregator)
- Blender Guru (Andrew Price) has a "10 Easy Ways to Render Faster in Blender" article covering noise threshold, light clamping and other optimisations (details not retrievable here). — [Blender Guru](https://www.blenderguru.com/tutorials/10-easy-ways-to-render-faster-in-blender)

**Denoisers**
- OpenImageDenoise (Intel) is the default Cycles denoiser and "typically provides the highest quality"; OptiX (NVIDIA) is the other option for final and viewport renders. — [Blender 4.1 manual, Sampling](https://docs.blender.org/manual/en/4.1/render/cycles/render_settings/sampling.html)
- Denoiser input passes: more guiding passes = better result; "recommended to at least use Albedo as just Color can blur out details, especially at lower sample counts"; "Albedo + Normal" uses color, albedo and normal. Prefilter (OIDN only): **Accurate** prefilters the guiding passes before denoising colour (best result, extra time); **Fast** denoises colour and guiding passes together (better when guiding passes are noisy, least extra time). Prefiltering can happen during render and be stored as a render pass for later animation denoising. — [Blender Denoise node manual](https://www.blender.org/manual/en/compositing/types/filter/denoise.html); [Cycles X OIDN prefiltering commit](https://lists.blender.org/pipermail/bf-blender-cvs/2021-July/161802.html); [OIDN prefilter settings commit](https://lists.blender.org/pipermail/bf-blender-cvs/2021-August/162180.html)
- OIDN library v2.5.1: three quality modes (high = default, balanced, fast); optional albedo and normal auxiliary images; `cleanAux` should only be enabled when aux images are genuinely noise-free; HDR input supported with `inputScale` (value 1 = 100 cd/m2); GPU support for Intel Xe, NVIDIA Turing through Blackwell, AMD RDNA 2-4, Apple silicon, plus CPUs with SSE4.1 and ARM64. — [Intel OIDN GitHub](https://github.com/RenderKit/oidn) (page opened directly)
- Blender 4.2 added Intel OIDN GPU denoising on AMD GPUs. — [Phoronix on Blender 4.2](https://www.phoronix.com/news/Blender-4.2-Released) (search-summary)
- Blender 5.0 manual: GPU-accelerated denoising is available on all supported GPUs. — [Blender 5.0 manual, GPU Rendering](https://docs.blender.org/manual/en/5.0/render/cycles/gpu_rendering.html)

**Light paths, clamping, caustics, fireflies**
- Max bounces can be set in total and separately for diffuse, glossy and transmission; fewer bounces trade accuracy for faster convergence. — [Blender 4.2 manual, Light Paths](https://docs.blender.org/manual/en/4.2/render/cycles/render_settings/light_paths.html)
- Clamping: Direct Light clamp limits the max intensity a not-yet-bounced sample may contribute to a pixel; Indirect Light clamp does the same for multiply-bounced rays. "It is often useful to clamp indirect bounces separately, as they tend to cause more fireflies"; balance is needed or intentionally bright parts get lost. — [Blender 2.81 manual, Light Paths](https://docs.blender.org/manual/en/2.81/render/cycles/render_settings/light_paths.html) (same text persists in later manuals per search results)
- Caustics are "a common source of noise"; unchecking Reflective Caustics and Refractive Caustics disables them. — [Blender 2.81 manual, Light Paths](https://docs.blender.org/manual/en/2.81/render/cycles/render_settings/light_paths.html)

**Light Tree, mesh lights, light linking, path guiding**
- Light Tree (Blender 3.5): better sampling of scenes with many lights, significantly less noise at slightly longer time per sample; on by default; toggle under Sampling > Lights. Emission materials gained an **Emission Sampling** setting (replacing the MIS toggle), default Auto (heuristic decides if a mesh counts as a light). A Light Sampling Threshold exists in the same panel. Light tree works best with physically correct lighting (no custom falloff or ray-visibility tricks). — [Blender 3.5 Cycles release notes](https://wiki.blender.org/release_notes/3.5/cycles/); [mirror on developer.blender.org](https://developer.blender.org/docs/release_notes/3.5/cycles/)
- Light linking restricts which objects a light affects; shadow linking additionally controls which objects block that light. Linking an *emissive mesh* is Cycles-only (lights work in both Cycles and EEVEE). Light-linking sampling is most efficient with the light tree on; shadow linking can be slower because direct and indirect light take different paths. — [Blender 4.3 manual, Light Linking](https://docs.blender.org/manual/en/4.3/render/lights/light_linking.html)
- Path guiding (introduced 3.4) targets complex lighting: indirectly lit shadow areas, long indirect bounces, reflected light sources. — [iRendering on path guiding](https://irendering.net/speed-up-rendering-with-path-guiding-in-cycles-for-blender-3-4/) (search-summary only)

**GPU / CPU**
- Backends: CUDA, OptiX, HIP, oneAPI, Metal. CUDA needs NVIDIA compute capability 5.0+; Metal needs Apple Silicon and macOS 13+ for full features. If VRAM fills, CUDA/OptiX/HIP/Metal spill to system RAM (slower, but usually still faster than CPU). Multi-GPU is configured in Preferences > System > Compute Device; each GPU only sees its own memory. Open Shading Language is limited to OptiX (per the 5.0 manual snippet); shadow caustics unsupported on HIP without hardware ray tracing. — [Blender 5.0 manual, GPU Rendering](https://docs.blender.org/manual/en/5.0/render/cycles/gpu_rendering.html)

**Version timeline (rendering-relevant)**
- **4.2 LTS (Jul 2024):** EEVEE Next; GPU-accelerated compositor for final renders; CPU compositor rewritten (often several times faster); new Glare "Bloom" mode; per-node execution-time overlay; OIDN on AMD GPUs. — [Blender 4.2 compositor notes](https://wiki.blender.org/release_notes/4.2/compositor/); [BlenderNation 4.2](https://www.blendernation.com/2024/07/16/blender-4-2-lts-released-check-out-these-standout-features/); [Phoronix](https://www.phoronix.com/news/Blender-4.2-Released)
- **5.0 (Nov 2025):** overhauled colour pipeline (ACES 1.3/2.0, HDR, wide gamut, see section 2); Cycles gets a null-scattering volume algorithm with unbiased sampling (fewer parameters, fewer artifacts in overlapping volumes) and subsurface scattering improvements; EEVEE material compilation up to ~4x faster depending on backend; repeat zones in shader nodes (dynamic in EEVEE, fixed in Cycles). — [DigitalProduction: Blender 5.0 beta](https://digitalproduction.com/2025/10/17/blender-5-0-beta/); [Ubunlog](https://en.ubunlog.com/blender-5-0-novedades-renderizado-hdr/); [Blender 5.0 EEVEE notes](https://developer.blender.org/docs/release_notes/5.0/eevee/)
- **5.1 (Mar 2026):** Cycles ~5-10% faster on GPU in benchmark scenes; EEVEE GPU shader compile 25-50% faster (Barbershop test scene); new **Raycast** shader node (Cycles + EEVEE); EEVEE texture memory saving of 30-40% via overlapping framebuffer/render textures; compositor adds Mask to SDF, Sequencer Strip Info, Index Switch, Radial Tiling and up to 2x faster blur/distortion ops. — [CGChannel: 5 key features in 5.1](https://www.cgchannel.com/2026/03/discover-5-key-features-in-blender-5-1); [Linuxiac](https://linuxiac.com/blender-5-1-3d-creation-software-released/); [80.lv](https://80.lv/articles/blender-5-1-now-available)
- **5.2 LTS (14 Jul 2026, fixes until Jul 2028):** Cycles **Texture Cache** (auto-generated optimised textures, loads only needed tiles/resolutions; lower memory and startup time); Principled BSDF **Thin Wall** mode (paper, leaves, window sheets); experimental node-based hair/cloth physics in Geometry Nodes; string nodes in the compositor; remote/online asset libraries. — [DigitalProduction: 5.2 LTS](https://digitalproduction.com/2026/07/21/blender-5-2-lts-lands-with-node-physics/); [Ubuntu Handbook](https://ubuntuhandbook.org/index.php/2026/07/blender-5-2-released-with-new-lts-with-2-years-of-support/); [AlternativeTo](https://alternativeto.net/news/2026/7/blender-5-2-lts-brings-node-based-physics-online-asset-libraries-and-new-fill-algorithm/); [OSArch](https://osarch.org/2026/07/15/blender-5-2-lts-released/)

### Inferences
- For still hero images (merch mockups, glass/boat, interiors) the sourced facts point to Cycles + OIDN with Albedo+Normal guiding and a Noise Threshold around 0.01 to 0.005 plus a generous max-sample cap; EEVEE Next is justified mainly for fast look-dev and turntable/animation batches where per-frame time matters.
- Because the Light Tree is tuned for physically plausible lights, scene "cheats" (custom falloff, ray-visibility tricks on lights) should be applied sparingly; where used they may raise noise (inference from the 3.5 notes' caveat).
- The 5.2 Texture Cache is directly relevant to large-texture scenes (4K-8K fabric/print textures across many merch variants) because it cuts memory/startup time; it is an LTS-era feature, so 5.2 LTS is a reasonable pinned production version.
- The OIDN 2.x GPU support list implies denoising need not be a CPU bottleneck on any modern NVIDIA/AMD/Intel/Apple GPU.

### Gaps
- **Blender manual pages for current defaults could not be opened**, so default values are unsourced. *Unverified background-knowledge defaults (check in Blender before quoting):* Cycles max bounces total 12 / diffuse 4 / glossy 4 / transmission 12 / volume 0 / transparent 8; render max samples 4096 (viewport 1024); noise threshold 0.01 (viewport 0.1); Clamp Indirect default 10, Direct 0; Filter Glossy 1.0; Film filter width 1.5 px; OIDN default input passes Albedo+Normal, prefilter Accurate; Light Tree on.
- *Unverified practitioner starting points:* product stills at noise threshold 0.005-0.01 with 1024-2048 max samples + OIDN; indirect clamp 1-10 to kill fireflies (lower = more energy loss); disable caustics unless needed; interiors often 8-12 total bounces; enable GPU OptiX on RTX cards (hardware RT) and set "Use GPU" for OIDN denoising in Preferences/Denoising panel; Persistent Data and a fixed seed (animated seed off) for animation consistency.
- Path guiding: sourced only as a 3.4 feature; its current hardware limits (I believe CPU-only) and which Blender 5.x versions changed it were not verified.
- No sourced benchmark for OptiX vs CUDA vs HIP vs Metal render times in 2026; no time-limit/tile-size guidance (tile sizes are largely automatic in modern Cycles).
- EEVEE Next 5.x specifics (e.g., hardware RT, Horizon Scan quality settings, shadow/ray-tracing numeric defaults) were not retrievable; the 5.0 EEVEE release-notes URL appeared in search but could not be read.
- Blender 5.3 features not researched (only observed that 5.3 manual URLs exist).

---

## 2. Colour management: AgX vs Filmic vs ACES vs Standard, Looks, exposure, scene-linear, EXR vs PNG, 4.x/5.x changes

### Takeaway
AgX (default since Blender 4.0) is the safest "photographic" view transform for products and still life: a sigmoid with ~16.5 stops of range that desaturates gracefully to white rather than skewing hue; Filmic is legacy-ish; "Standard" clips and hue-skews bright colours; ACES 1.3/2.0 views arrived in Blender 5.0 for pipeline compatibility and HDR. Always render/save in scene-linear (EXR) and apply the view transform only on output.

### Cited Findings
- AgX: sigmoid-based image formation with **16.5 stops** of exposure range, mapping unbounded render data into the closed 0-1 display domain; Looks include **Punchy** (darkens for more contrast), **Greyscale** (BT.2020 luminance weights) and **seven contrast looks** built in an AgX Log space pivoting at 18% middle grey; handles wide-gamut sources (spectral rendering, camera colorimetry); supports displays sRGB, Rec.1886, Display P3, Rec.2020 and working spaces Linear Rec.709, Linear Rec.2020, ACEScg. — [AgX GitHub (EaryChow)](https://github.com/EaryChow/AgX) (page opened directly)
- AgX vs Filmic: Filmic collapses saturated colours into the "Notorious Six" before attenuating to white; AgX provides smooth chromatic attenuation. — [AgX GitHub](https://github.com/EaryChow/AgX)
- Community characterisations (opinionated, from AgX proponents): Standard sRGB blows out bright/colourful areas and skews bright hues toward neon yellow/magenta/cyan; Filmic doesn't blow out but skews hue in bright areas; ACES (1.x) "does a bit of both"; AgX is less saturated out of the box, and its **Punchy** look is closer to the saturation of Filmic/ACES; AgX handles wide-gamut render spaces better than Filmic/ACES. — [Blender DevTalk thread on ACES support](https://devtalk.blender.org/t/blender-support-for-aces-academy-color-encoding-system/13972/209); [Blender Artists "Split view of Filmic vs AgX"](https://blenderartists.org/t/split-view-of-filmic-vs-agx/1480021) (search-summaries; contested by ACES advocates)
- Filmic and AgX matter mainly in high-dynamic-range lighting where Standard would clip. — same threads (search-summary)
- The AgX-as-default change was proposed in Blender pull request #106355 "Replace Default OCIO config with AgX (Filmic v2)". — [Blender PR 106355](https://projects.blender.org/blender/blender/pulls/106355). (That AgX became the 4.0 default is from my background knowledge, not from a fetched source.)
- CG Cookie published a piece titled "The Secret to Rendering Vibrant Colors with AgX in Blender is the Raw Workflow" (content not retrievable; title indicates a Raw/neutral-then-grade approach to AgX saturation). — [CG Cookie](https://cgcookie.com/comments/387969/replies/new)
- Aggregator advice: for photorealism use Filmic or AgX; AgX improves highlight transition compared to Filmic. — [CGAxis 2026 guide](https://cgaxis.com/complete-blender-render-setup-guide-for-photorealistic-results-2026/) (search-summary)
- **Blender 5.0 colour changes:** native ACES 1.3 and **ACES 2.0** view transforms (SDR and HDR variants) as alternatives to AgX/Filmic and for ACES-pipeline compatibility; HDR and wide-gamut display output for images and video (Rec.2100-PQ, Rec.2100-HLG, **AgX HDR**, Display P3 with sRGB fallback; Linux HDR via Wayland + Vulkan); OpenEXR can be saved in **ACES2065-1** and **ACEScg**; custom working spaces such as Linear Rec.2020; new compositor **Convert Colorspace** node; tooltips show OCIO config descriptions. — [DigitalProduction: ACES 2.0 in 5.0](https://digitalproduction.com/2025/09/02/blender-5-0-ships-built-in-aces-2-0-view-transform/); [80.lv: ACES 2.0 explained](https://80.lv/articles/blender-5-0-s-aces-2-0-view-transform-explained); [It's FOSS: Blender 5.0](https://itsfoss.com/news/blender-5-0-release/); [Ubunlog](https://en.ubunlog.com/blender-5-0-novedades-renderizado-hdr/); [Linuxadictos](https://en.linuxadictos.com/Blender-5.0-arrives-with-revamped-color-management--ACES-1--3--2--0--HDR--and-a-wide-gamut-for-video-and-images..html)
- OIDN accepts HDR (scene-linear) input with an `inputScale` where 1 = 100 cd/m2, i.e. denoise before tone mapping. — [Intel OIDN](https://github.com/RenderKit/oidn)

### Inferences
- Since AgX's range (16.5 stops) is wide and its default is intentionally low-saturation, a product workflow is: AgX + a contrast Look (Punchy or one of the contrast looks), set exposure for the hero highlight not clipping, then grade saturation/contrast in the compositor or Lightroom/Photoshop. This matches the premise of the CG Cookie "raw" title but I could not read the article.
- ACES 2.0 (new in 5.0) is a different algorithm from the ACES 1.x views critiqued in the 2021-2023 community threads, so those hue-skew criticisms may not apply to 2.0; I did not find a sourced side-by-side comparison. Treat "AgX vs ACES 2.0" as a taste/pipeline decision (ACES if the downstream pipeline or HDR delivery requires it).
- For web delivery (the Next.js shop), sRGB display is still the safe target; Display P3 / HDR outputs added in 5.0 are optional extras.
- Keeping the view transform last and saving scene-linear EXR (16-bit half is the usual compromise) preserves headroom for re-grading; PNG/WebP/AVIF are for final sRGB delivery only (inference; see Gaps).

### Gaps
- No sourced guidance found on **exposure/gamma numbers**, "Looks" naming list in 5.x beyond Punchy/Greyscale/contrast looks, or the exact default view transform and look in 5.x startup files.
- No sourced comparison of 16-bit half vs 32-bit float EXR, EXR compression (ZIP/DWAA/PIZ) or 16-bit PNG vs 8-bit PNG file sizes for web; *unverified background knowledge:* half-float EXR is adequate for nearly all stills; 32-bit only for data passes (depth, position) and extreme compositing; use 16-bit PNG for intermediates and 8-bit sRGB for final WebP/AVIF.
- Whether ACES 2.0 in Blender 5.x gives better saturated-colour behaviour than AgX was not verified.
- The 80.lv/It's FOSS/DigitalProduction pages could not be read in full, so exact names of every new 5.0 view/display and Looks lists are unconfirmed.

---

## 3. Camera craft: focal length, DoF, bokeh, motion blur, composition, distortion, chromatic aberration, vignette, grain, anamorphic

### Takeaway
Blender's camera model is physical: focal length, F-Stop (lower = stronger DoF), focal distance/focus object, bokeh blade count (min 3) and aperture ratio (anamorphic bokeh). Lens distortion, chromatic aberration, vignette and film grain are mostly compositor-stage effects (native Lens Distortion/Glare nodes, or add-ons that go further). I found no solid sourced numbers for "product lens" choices; those are listed as unverified background knowledge.

### Cited Findings
- Longer focal length = smaller FOV (more zoom); focal length can be entered in mm or as FOV angle. — [Blender manual, Cameras](https://docs.blender.org/manual/en/2.82/render/cameras.html); [Blender 4.5 manual, Cameras](https://docs.blender.org/manual/ar/4.5/render/cameras.html)
- Depth of field: **F-Stop** "defines the amount of blurring. Lower values give a strong depth of field effect"; **Focal Distance** sets the focus distance when no Focus Object is chosen; **Bokeh Blades** = number of polygonal aperture blades (min 3 = triangular bokeh); **Aperture Ratio** distorts bokeh to simulate anamorphic lenses. — [Blender 4.5 manual, Cameras](https://docs.blender.org/manual/ar/4.5/render/cameras.html); [Blender manual 2.82](https://docs.blender.org/manual/en/2.82/render/cameras.html)
- Blender compositor ships Glare (e.g. Fog Glow, Streaks, Ghosts, and since 4.2 Bloom) and Lens Distortion nodes, usable for fog-glow and chromatic-aberration looks. — [search-result summary of add-on pages](https://blendermarket.com/products/uber-compositor); [Blender 4.2 compositor notes](https://wiki.blender.org/release_notes/4.2/compositor/)
- Add-on vendors claim the native Lens Distortion node's chromatic aberration also distorts the image centre, whereas their versions keep the centre undistorted: **Uber Compositor** (vignette, lens dirt, film grain, glare/bloom, exposure, colour temperature), **Photoreal** (procedural gate weave/flicker, lens artifacts incl. CA/distortion/softening, grain, vignette, glare), **Compositor FX** (CA with scale/rotation/translation and per-channel control "beyond both the default lens distortion node and Blender 5.0 implementation", which implies Blender 5.0 changed or added a native CA implementation), **Lazy Composer 2 Pro** (grain presets 8mm/16mm/35mm/VHS, halation, light streaks, ghost bokeh, diffraction). — [Uber Compositor](https://blendermarket.com/products/uber-compositor); [Photoreal](https://blendermarket.com/products/photoreal); [Compositor FX](https://christopherfraser.gumroad.com/l/compositor-fx); [Lazy Composer 2 Pro](https://superhivemarket.com/products/lazy-composer-2-pro) (vendor marketing, not neutral)
- Product-render add-ons exist that automate studio camera/lighting rigs (Studio Shot Builder, Poly Studio Pro with HDRI maker and softboxes). — [Studio Shot Builder](https://superhivemarket.com/products/studio-shot-builder); [Poly Studio Pro](https://superhivemarket.com/products/poly-studio-pro---hdri-maker--lighting-builder)

### Inferences
- Because aperture shape and ratio are native camera properties, bokeh character (circular vs polygonal vs anamorphic oval) can be set in-render and rendered correctly with DoF rather than faked in post; effects like halation, grain and CA are post-stage choices.
- The Compositor FX wording suggests checking Blender 5.x release notes for the exact new chromatic-aberration/lens-distortion options before building a node chain around the old behaviour.
- Add-ons are optional; all the listed effects can be built from native Glare, Lens Distortion, Ellipse Mask + Blur (vignette), Noise/RGB grain and Mix nodes.

### Gaps
- **No sourced guidance on product focal lengths (85-135 mm), f-stop picks, or composition rules.** *Unverified practitioner starting points from background knowledge:* tabletop/merch/still-life 85-135 mm full-frame equivalent (flattering perspective, compresses background; set sensor to 36 mm full frame); apparel flat lays 50-85 mm; architecture/tiny-house interiors 16-28 mm with Shift X/Y for vertical correction instead of tilting the camera; exteriors/boat hero shots 35-85 mm (boats need a longer lens to avoid distortion); DoF at roughly f/2.8-f/8 for products (deeper stop for label legibility); focus on the nearest legible edge using the Focus Object eyedropper; anamorphic bokeh via Aperture Ratio around 1.33-2.0; Cycles motion blur shutter 0.5 for ~180-degree look.
- No sourced numbers on grain amplitude, vignette strength, chromatic-aberration pixel dispersion, or lens-distortion K values; keep all of them very subtle (a few px or <5%) per general practice (unverified).
- No source found for Blender 5.0's exact native lens/CA changes.

---

## 4. Lighting craft: three-point and softbox studio, area-light sizing, gradients, rim lights, light linking, shadow catchers, cards/flags, volumetrics, emission, mesh lights

### Takeaway
Large area lights act as softboxes (bigger relative to subject and closer = softer); three-point = key at ~45 degrees, fill ~half the key's strength, back/rim light for separation. Blender 4.x light linking and shadow linking (plus Cycles-only linking of emissive meshes and the light tree) are the modern tools to control per-object light. God rays need a volume plus a low sun; a larger sun angle softens rays.

### Cited Findings
- Three-point basics: key light strongest at roughly 45 degrees in front of the subject; fill on the opposite side at roughly 50% of the key to soften shadows; back light behind the subject to outline and separate it from the background. A softbox is a large even light panel, and Blender Area Lights replicate it; two big area lights are a common way to mimic a studio. — [Uhiyama Lab: lighting fundamentals](https://uhiyama-lab.com/en/notes/blender/lighting-fundamentals-realistic-light/); [PetaPixel: visualise photography lighting setups in Blender](https://petapixel.com/2012/03/07/how-to-visualize-photography-lighting-setups-in-blender/) (search-summary; exact attribution per page not verified; PetaPixel article is from 2012 and pre-dates modern Cycles)
- Light linking (Cycles and EEVEE): per-light control of which objects are lit; shadow linking controls which objects act as blockers. Emissive-mesh linking is Cycles-only; most efficient with light tree; shadow linking can slow renders. — [Blender 4.3 manual, Light Linking](https://docs.blender.org/manual/en/4.3/render/lights/light_linking.html)
- Mesh lights: Emission Sampling setting (default Auto) decides if an emissive mesh is treated as a sampled light; light tree handles many lights. — [Blender 3.5 Cycles notes](https://wiki.blender.org/release_notes/3.5/cycles/)
- Light tree works best with physically correct lights (no custom falloff / ray-visibility tricks). — [Blender 3.5 Cycles notes](https://wiki.blender.org/release_notes/3.5/cycles/)
- Sky/sun: the Nishita Sky Texture models single scattering with Rayleigh and Mie scattering and ozone absorption; a Sun light can be matched to the sky's sun rotation for volumetric work. — [rew.it.com (low-quality aggregator, but consistent with Blender manual text)](https://rew.it.com/how-do-you-add-sun-to-a-scene-in-blender)
- God rays (Cycles): put a cube filling the room/scene with a Principled Volume, **Density around 0.1 as a starting point**; god rays read best with a low sun shining through gaps/foliage; **larger Sun angle = softer, more diffuse rays, smaller = sharper**. Typical interior lighting: HDRI environment + area lights placed on windows + optionally a sun. — [Evermotion tip of the week: god rays](https://evermotion.org/tutorials/show/12530/creating-godrays-in-blender-tip-of-the-week); [ArtStation (jsabbott) god-rays tutorial](https://jsabbott.artstation.com/blog/Z4Y77/tutorial-creating-god-rays-in-blender-3d-cycles)
- Cycles' new volume algorithm in 5.0 (null-scattering, unbiased) reduces artifacts in overlapping volumes, relevant for fog-box + god-ray setups. — [DigitalProduction 5.0 beta](https://digitalproduction.com/2025/10/17/blender-5-0-beta/)
- EEVEE Next's Virtual Shadow Maps plus unlimited lights make many-light studio rigs practical in real time. — [CGChannel](https://www.cgchannel.com/2024/07/eevee-next-finally-arrives-in-blender)

### Inferences
- Combining light linking with large area lights allows "cheat" lights that illuminate only the product (rim strips, label-readability fills) without polluting the floor/background; shadow linking can separately remove unwanted shadows. Since the manual warns linking is most efficient with the light tree, keep Light Tree enabled when linking.
- Reflection control for glossy products (bottles, boat hulls, glass) is mostly about shaping the *reflected* area lights; per the light-tree caveat, avoid ray-visibility cheats where possible, though turning off Camera visibility on a softbox so it reflects but is not seen is the standard technique (background knowledge).
- For architecture, the Nishita sky + sun angle controls give a physically driven day/time setup, and a low sun + volume density ~0.1 is a quick path to god rays.

### Gaps
- No sourced **numeric** area-light sizes, distances, or Watt values for product setups; no source on reflection cards/flags, gradient cards, strip lights, or shadow-catcher setup. *Unverified practitioner heuristics:* key softbox about 1-2x the subject's size at ~1 subject-width distance for soft wrap; strip lights ~10:1 aspect for edge highlights on bottles; black cards/flags for negative fill; gradient (black-to-white texture on emissive plane) cards for smooth reflections; Area Light Spread reduced (e.g. 60-120 degrees) for directional control; light intensity via exposure rather than chasing Watts; Cycles Shadow Catcher object property + Film > Transparent to composite onto a photo backplate; Portal lights for window-lit interiors; real sun disc ~0.53 degrees, soft shadows with 1-3 degrees.
- No source found on emission strengths for mesh lights (e.g. neon, LED strips) or on practical HDRI strength/rotation conventions.
- The "Nishita sky at 0.3" mentioned in an aggregator summary was ambiguous and is not reported.

---

## 5. Compositing: render passes, glare/bloom, colour grading, sharpening, real-time/GPU compositor, post in Photoshop/Lightroom

### Takeaway
Render the Combined pass plus Cryptomatte (Object/Material/Asset), AO, Denoising Data (and Z/Mist/Normal) to a multilayer EXR so grading, masks and depth effects can be changed without re-rendering. Since 4.2 the compositor runs on the GPU (also in the viewport), and 5.x keeps adding nodes.

### Cited Findings
- **Cryptomatte** (Object, Material, Asset) provides anti-aliased mattes that account for motion blur and transparency; objects are picked in compositing, unlike Object/Material Index passes. — [Blender 4.2 manual, Passes](https://docs.blender.org/manual/en/4.2/render/layers/passes.html)
- **AO pass:** ambient occlusion from directly visible surfaces, normalised 0-1 (no BSDF colour). — [Blender 4.2 manual, Passes](https://docs.blender.org/manual/en/4.2/render/layers/passes.html)
- **Denoising Data** passes allow animation denoising in a second pass after rendering the full animation; not needed for single-image denoise during render; also stores the pre-denoise combined pass. — [Blender 4.2 manual, Passes](https://docs.blender.org/manual/en/4.2/render/layers/passes.html)
- A **Bloom** pass (influence of the Bloom effect) is EEVEE-only (as of the 4.2 manual snippet, likely refers to legacy EEVEE; EEVEE Next removed built-in Bloom per my recollection, unverified). — [Blender 4.2 manual, Passes](https://docs.blender.org/manual/en/4.2/render/layers/passes.html)
- Compositor 4.2: GPU acceleration on by default for final renders, existing CPU backend rewritten (often several times faster), new Glare **Bloom** mode ("similar to Fog Glow but much faster to compute, greater highlight spread, smoother falloff"), node execution-time overlay. One user reported ~35-40 s to final image in 4.1.1 dropping to ~6 s in 4.2 with GPU. — [Blender 4.2 compositor notes](https://wiki.blender.org/release_notes/4.2/compositor/); [Phoronix](https://www.phoronix.com/news/Blender-4.2-Released); [DevTalk: improved render compositor](https://devtalk.blender.org/t/improved-render-compositor-feedback-and-discussion/33377)
- The GPU rewrite covers both the viewport compositor and final-render compositing. — [BlenderNation: compositor rewrite](https://www.blendernation.com/2022/07/08/the-future-of-blenders-compositor-real-time-and-viewport-support/) (2022 roadmap piece plus 4.2 summary)
- 5.0: Convert Colorspace node; 5.1: Mask to SDF, Sequencer Strip Info, Index Switch, Radial Tiling, up to 2x faster blur/distortion; 5.2: string node support in compositor. — see section 1 timeline sources.
- Compositor grading/camera-effect add-ons (Render Raw, Uber Compositor, Photoreal, Lazy Composer, Compositor FX) exist but are paid and vendor-described. — [Render Raw](https://superhivemarket.com/products/render-raw/ratings?page=3); [Uber Compositor](https://blendermarket.com/products/uber-compositor)
- OIDN can denoise in the compositor (Denoise node) with Albedo/Normal inputs and HDR inputScale handling. — [Denoise node manual](https://www.blender.org/manual/en/compositing/types/filter/denoise.html); [OIDN](https://github.com/RenderKit/oidn)

### Inferences
- Master workflow: render multilayer EXR (Combined + Denoising Data + Normal + Albedo + AO + Cryptomatte + Depth/Mist) -> compositor: Denoise (if animation), Glare Bloom (low threshold, small mix), Cryptomatte-masked colour grades, then view transform -> export. For batch merch mockups, per-variant masks via Cryptomatte avoid re-rendering for colour tweaks.
- Because compositing now runs on GPU, node-heavy grades (blur, glare, distortion) are cheap enough to iterate in the viewport compositor.
- Photoshop/Lightroom post is therefore only needed for retouching/sharpening and platform-specific export; Blender can cover grade and glare.

### Gaps
- Mist/Depth pass details and recommended settings were not retrievable (the manual snippet did not detail Mist).
- No sourced guidance for sharpening (Filter > Sharpen node values), output-sharpen after downscale, or Lightroom/Photoshop workflows for Blender EXR/TIFF (e.g. ACEScg/ProPhoto handling).
- Whether EEVEE Next has any built-in bloom (or relies on Glare node) in 4.2+ was not verified.
- No data on 5.x viewport compositor limitations (which nodes still fall back to CPU).

---

## 6. Realism details: bevels, imperfect geometry, asymmetry, dust/particles, depth/scale cues, Geometry Nodes scatter, cloth simulation

### Takeaway
Realism comes from imperfection: micro-bevels, roughness variation (no perfectly glossy surface), normal/bump micro-detail, scratches, fingerprints and dust, plus plausible fabric behaviour (cloth sim + Principled Sheen). Blender 4.0's layered Principled BSDF (coat, sheen on top) and 5.2's Thin Wall are the new shader tools.

### Cited Findings
- Photorealism guidance: micro-details (tiny scratches, worn edges, surface variation) avoid the "plasticky, clean CG look"; **roughness maps** should ensure "no surface is left perfectly glossy" so reflections are broken up; normal maps add micro-surface detail; real objects show micro-scratches, fingerprints, dust. — [Secrets of Photorealism in Blender (BlenderNation, Sep 2025)](https://www.blendernation.com/2025/09/25/secrets-of-photorealism-in-blender/); [Superhive course page](https://superhivemarket.com/products/secrets-of-photorealism-in-blender); [Superhive: Photoreal Texturing](https://superhivemarket.com/products/photoreal-texturing-in-blender) (course marketing text; summarised)
- **Principled BSDF v2 (4.0):** layered model with base layers, optional glossy **Coat** on top, and **Sheen** as the topmost layer; Sheen "simulates very small fibers... for cloth this adds a soft velvet like reflection near edges, and it can also be used to simulate dust on arbitrary materials"; parameters were renamed with Weight suffixes (Subsurface Weight, Sheen Weight, Coat Weight, Transmission Weight). — [Blender 4.0 manual, Principled BSDF](https://docs.blender.org/manual/de/4.0/render/shader_nodes/shader/principled.html); [Principled v2 PR 112848](https://projects.blender.org/blender/blender/pulls/112848/commits/f310728ec629dcaf46b2b1beb997277637638c88)
- **Cloth for garments:** subdivide before simulating (a subdivision level of about 4 to 6 is recommended for balance of performance and realism); Physics > Cloth has presets (denim, leather, silk, rubber, cotton); pin shoulders/neck/arms with vertex-weight groups so the shirt doesn't fall; sculpt wrinkles around armpit/arm/chest. — [Creative Bloq: how to make a T-shirt in Blender](https://www.creativebloq.com/3d/how-to-make-a-t-shirt-in-blender); [STYLY cloth simulation tips](https://styly.cc/tips/blender-cloth-simulation02/) (tutorial-level sources)
- Ready-made pre-simulated T-shirt Blender files with camera motion exist on marketplaces; apparel-focused add-ons help with fabric shaders (satin, denim twill, coated fabrics) but still need manual tuning. — [Gumroad T-shirt mockup](https://himeshjani.gumroad.com/l/tshirtmockup3d); [Style3D blog](https://www.style3d.com/blog/what-are-the-best-blender-plugins-for-realistic-apparel-renders/) (vendor/marketing)
- 5.2 adds **Thin Wall** (paper/leaves/window sheets) to Principled BSDF and an experimental Geometry-Nodes-based cloth/hair physics approach; 5.2 Texture Cache helps with heavy texture sets. — [DigitalProduction 5.2](https://digitalproduction.com/2026/07/21/blender-5-2-lts-lands-with-node-physics/)
- 5.0 introduced repeat zones in shading nodes (EEVEE dynamic, Cycles fixed), enabling procedural shader loops (e.g. weave/stitch patterns). — [Ubunlog](https://en.ubunlog.com/blender-5-0-novedades-renderizado-hdr/); [5.0 EEVEE notes](https://developer.blender.org/docs/release_notes/5.0/eevee/)

### Inferences
- For merch (T-shirt/hoodie) mockups, the sourced stack is: cloth-simulated mesh (subdivided, pinned), Principled BSDF with Sheen (fabric fuzz) and a roughness/normal weave texture, plus print artwork as a separate image-texture layer; bake/apply the sim and subdivide again for smooth silhouettes (last step is background knowledge).
- Sheen doubles as a cheap dust/film layer on products and boats' matte surfaces; Coat adds a clear lacquer on top for gloss varnish (wood, painted hull).
- Imperfection principles from the courses (no pure-glossy surface, micro-scratches, fingerprints) apply equally to glass bottles and boat gelcoat.

### Gaps
- **No source for Bevel node radii/samples, Geometry Nodes scatter recipes (Distribute Points on Faces + Instance on Points), dust/particle and "depth cue" (haze, atmospheric perspective) numbers, or asymmetry guidance.** *Unverified background-knowledge starting points:* Bevel node radius roughly 0.2-1 mm at real-world scale (so edges catch highlights), 3-4 segments; set scene to real-world metric units so DoF/falloff behave; sparse dust specks via particles/GN with Sheen or volume haze at density 0.01-0.1; slight asymmetry via small random rotation/scale on repeated elements; scale cues (hands, coins, plants) for tiny-house/boat images.
- No sourced cloth parameter numbers (quality steps, mass, stiffness/bending, collision distance) beyond subdivision 4-6 and presets.
- No source on fabric micro-geometry (weave via displacement vs normal maps) or on hair/fuzz (peach fuzz) techniques.

---

## 7. Workflow: render farms, upscaling/denoising tricks, animation settings, turntables, batch merch mockups, Python automation

### Takeaway
Blender can be fully scripted and run headless; there are existing tools for batch multi-angle/turntable rendering, and Python can set engine, samples, denoise, resolution, format and transparency per iteration. Sourced detail on farms and AI upscaling is thin.

### Cited Findings
- **Batch Render** (open-source command-line tool using Blender) renders multiple objects from multiple angles, includes turntable generation with a custom frame count, and supports Eevee, Cycles and Workbench. — [Batch Render docs](https://batch-render.readthedocs.io/en/latest/usage.html); [Batch Render home](https://batch-render.readthedocs.io/)
- Python via Blender's interpreter can load .blend files, set render engine (Cycles/EEVEE), samples, denoising, resolution, file format and transparent background via `bpy.context.scene.render` properties, render frames and write images; command-line rendering supports single frames and ranges with flags like `--render-anim`; scripts can iterate scenes or cameras and render each to a uniquely named file. — [Super Renders Farm: render multiple cameras](https://superrendersfarm.com/article/render-multiple-cameras-blender); search-result summaries from [BlenderNation Bazaar](https://bazaar.blendernation.com/?p=8169)
- 360-degree turntable animations can be generated programmatically in Blender Python (code examples exist). — same search results (summary level)
- Animation denoising: use the Denoising Data passes to denoise the whole animation in a second pass after render. — [Blender 4.2 manual, Passes](https://docs.blender.org/manual/en/4.2/render/layers/passes.html)
- Cloud/online render farms exist, including Super Renders Farm and GarageFarm (both publish Blender optimisation/EEVEE articles); I did not retrieve pricing or settings. — [Super Renders Farm guide](https://superrendersfarm.com/article/blender-render-settings-optimization-guide); [GarageFarm](https://garagefarm.net/blog/a-new-generation-of-real-time-rendering-with-eevee-next)
- Blender 5.2 introduces remote/online asset libraries (including Blender Online Essentials), useful for sharing shared assets in a pipeline. — [DigitalProduction 5.2](https://digitalproduction.com/2026/07/21/blender-5-2-lts-lands-with-node-physics/)
- Compositor GPU acceleration (4.2) and EEVEE shader-compile speedups (5.0: up to 4x; 5.1: 25-50%) shorten per-frame and startup costs in batch/animation pipelines. — see section 1 sources.

### Inferences
- A merch-mockup batch can be: one .blend with a parametrised material (colour/artwork nodes) driven by a Python loop over variants x angles, `--background --python script.py`, Film > Transparent, PNG/EXR output, then downscale and convert to WebP/AVIF for the Next.js shop (matching the repo's `public/assets/shop/` workflow).
- For turntables, fixed seed (no animated seed) plus denoising-data-based second-pass denoise gives temporally stable frames (technique consistent with the 4.2 manual's Denoising Data description; "fixed seed" advice is background knowledge).
- Render farms are only needed for long animations or very high-sample interiors; stills at 2-4K with OIDN on a modern GPU usually finish locally (inference; no sourced timings).

### Gaps
- No sourced numbers on animation render settings (frame rates, output codecs, motion-blur shutter), turntable frame counts (e.g. 120-240 frames common, background knowledge), farm pricing, or specific farm settings.
- "Denoising upscaling" (render low-res + AI upscale, e.g. Real-ESRGAN/Topaz; or half-res + OIDN) not researched with any source; unverified.
- No source on Blender 5.x CLI changes (e.g. `--cycles-device`, `-E`, `--python-expr`) or on the Python API for batch operations beyond the summaries above.

---

## 8. Notable creators and learning resources

### Takeaway
Confirmed from sources: Ian Hubert (fast "lazy" workflows), Gleb Alexandrov / Creative Shrimp (high-production-value realism teaching), Blender Guru (render speed/tips, donut course), Blender Secrets (1-2 min tips), plus BlenderNation's large channel list. I found no sources for Default Cube, Polygon Runway or CG Boost.

### Cited Findings
- **Ian Hubert:** synonymous with Blender for "lazy tutorials"; ~two decades of Blender use; has worked with the Blender Foundation; offers content via Patreon; Fstoppers covers his "make a Blender scene in 60 seconds" approach. — [PremiumBeat: Blender channels](https://www.premiumbeat.com/blog/blender-channels-for-3d-artists/); [Ian Hubert Patreon](https://www.patreon.com/ianhubert/about); [Fstoppers](https://fstoppers.com/composite/learn-how-make-blender-scene-60-seconds-602499)
- **Gleb Alexandrov (Creative Shrimp):** 3D artist and tutorial maker, described as having "tremendous production value" and being taught "extremely well"; his Cycles tips (e.g. "13 tips and tricks for Blender and Cycles" on 3DVF) and Blender Conference profile exist. — [PremiumBeat](https://www.premiumbeat.com/blog/blender-channels-for-3d-artists/); [3DVF](https://3dvf.com/thematique/gleb-alexandrov/); [Blender Conference profile](https://conference.blender.org/profile/108/)
- **Blender Guru (Andrew Price):** "10 Easy Ways to Render Faster in Blender" (includes noise threshold and light clamping), classic donut tutorial. — [Blender Guru](https://www.blenderguru.com/tutorials/10-easy-ways-to-render-faster-in-blender)
- **Blender Secrets:** 1-2 minute, to-the-point tips. — [PremiumBeat](https://www.premiumbeat.com/blog/blender-channels-for-3d-artists/)
- BlenderNation maintains a "Blender Tutorials – HUGE YouTube Channels Starter Pack (120!)" list (Aug 2025) as a curated starting point. — [BlenderNation](https://www.blendernation.com/2025/08/12/blender-tutorials-huge-youtube-channels-starter-pack-120/)
- **CG Cookie** publishes AgX/colour articles (e.g. "The Secret to Rendering Vibrant Colors with AgX in Blender is the Raw Workflow"). — [CG Cookie](https://cgcookie.com/comments/387969/replies/new)
- Realism courses from marketplaces: "Secrets of Photorealism in Blender" (Sep 2025) and "Photoreal Texturing in Blender". — [BlenderNation](https://www.blendernation.com/2025/09/25/secrets-of-photorealism-in-blender/); [Superhive](https://superhivemarket.com/products/photoreal-texturing-in-blender)

### Inferences
- For this project (tone-of-voice "dry, adult" brand, product/merch visuals) the most relevant learning tracks are: Blender Guru/Creative Shrimp for lighting/Cycles fundamentals, a product-viz course for studio rigs, and BlenderNation's list for discovery.

### Gaps
- **No retrievable source** on Default Cube, Polygon Runway, CG Boost, Blender Studio (production breakdowns), Poly Haven (free HDRIs/textures; I know it exists but did not source it), or 80.lv / ArtStation breakdowns of product/arch-viz/boat images; characterising them would be unsourced.
- No sourced creators specifically for boat visualisation or tiny-house architectural visualisation (e.g. blender3darchitect.com appeared in results but its content was not read).
- No source on Blender developer-blog posts or Blender Studio resources beyond those in section 1 (docs/dev sites blocked for fetching).
