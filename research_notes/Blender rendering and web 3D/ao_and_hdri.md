# Ambient Occlusion (AO) and HDRI Lighting in Blender (Cycles and EEVEE, Blender 4.x/5.x)

> Method note for the report writer. Research date: 2026-10-02. The WebFetch tool was blocked by the network egress proxy for docs.blender.org, developer.blender.org, projects.blender.org, polyhaven.com, docs.polyhaven.com and blenderartists.org. Everything under "Cited Findings" therefore comes from WebSearch result summaries, not from full-page reads. Where a snippet could not be tied to one specific URL in the result set, the bullet lists the candidate pages and says so. Concrete settings, numbers and artistic recipes that I could NOT source are kept strictly under "Inferences" and labelled `[background knowledge, unverified in this session]`. Treat those as plausible practitioner defaults to verify in Blender, not as cited fact.

---

## 1. AO shader node vs. baked AO vs. EEVEE Next (horizon scan / ray tracing) vs. AO render pass

### Takeaway
The AO shader node is a per-material, per-shading-point occlusion query with Distance, Inside and (Cycles-only) Only Local controls. In EEVEE Next (Blender 4.2+) AO was rebuilt on a "horizon scan" visibility-bitmask method intended to match Cycles more closely and has a Thickness control to limit over-occlusion. The AO render pass is a 0-to-1 grayscale pass of directly visible surfaces, available in both engines, meant to be multiplied in the compositor.

### Cited Findings
- The AO node's Distance input sets the distance up to which other objects are considered to occlude the shading point. — [Blender Manual, Ambient Occlusion Node](https://docs.blender.org/manual/en/dev/render/shader_nodes/input/ao.html)
- "Inside" detects convex rather than concave shapes by computing occlusion inside the mesh (this is what makes AO usable for edge/convex-wear masks). — [Blender Manual, Ambient Occlusion Node](https://docs.blender.org/manual/en/dev/render/shader_nodes/input/ao.html)
- "Only Local" is marked Cycles-only and restricts occlusion to the object itself (other objects are ignored). — [Blender Manual, Ambient Occlusion Node](https://docs.blender.org/manual/en/dev/render/shader_nodes/input/ao.html)
- The AO node manual page exists in the 5.0, 5.2 and 4.5 manual trees (so the node is still current in 5.x). — [5.2 (ja) manual](https://docs.blender.org/manual/ja/5.2/render/shader_nodes/input/ao.html); [5.0 (de) manual](https://docs.blender.org/manual/de/5.0/render/shader_nodes/input/ao.html); [4.5 (sl) manual](https://docs.blender.org/manual/sl/4.5/render/shader_nodes/input/ao.html)
- EEVEE Next AO: a new way of computing occlusion using a visibility bitmask was added and named "horizon scan" (to be algorithm-agnostic); it simplifies code and removes the "trickery for fading influence of distant samples", with the stated aim that results match Cycles more closely. — [EEVEE Next: Ambient Occlusion PR #108398](https://projects.blender.org/blender/blender/pulls/108398); related [PR #114150: Make Ambient Occlusion Pass use Horizon Scan](https://projects.blender.org/blender/blender/pulls/114150)
- EEVEE Next AO adds a "thickness" option: kept relatively low it avoids over-occlusion from in-front geometry; too low causes under-occlusion. The UI tab previously named Ambient Occlusion was renamed Horizon Scan. — [PR #108398](https://projects.blender.org/blender/blender/pulls/108398); [PR #114150](https://projects.blender.org/blender/blender/pulls/114150) (snippet-level; which of the two PRs says which sentence could not be confirmed)
- EEVEE Next ray tracing: Max Roughness sets the maximum roughness processed by the "high quality" ray-tracing path; anything rougher falls back to the "Fast GI" option. — [Blender 4.2 EEVEE-Next feedback thread](https://devtalk.blender.org/t/blender-4-2-eevee-next-feedback/31813?page=64); background in [Horizon Based GI issue #112979](https://projects.blender.org/blender/blender/issues/112979)
- A user in the 4.2 feedback thread reported that raising the Thickness (screen-trace) value, e.g. to a large value such as 5000 mm, improved occlusion results in their scene (anecdotal, scene-dependent). — [Blender 4.2 EEVEE-Next feedback thread](https://devtalk.blender.org/t/blender-4-2-eevee-next-feedback/31813?page=64)
- The same thread notes 4.2 LTS acted as a testbed for a more complete EEVEE Next in 4.3, with early performance issues in how shadows and horizon scans are evaluated. — [Blender 4.2 EEVEE-Next feedback thread](https://devtalk.blender.org/t/blender-4-2-eevee-next-feedback/31813?page=64)
- AO render pass: grayscale, 0 = fully occluded, 1 = fully exposed, captures AO from directly visible surfaces, intended to be multiplied with a colour image in the Compositor via a Mix (Multiply) node; available for both Cycles and EEVEE. — [Blender Manual 4.5, Render Passes](https://docs.blender.org/manual/en/4.5/render/layers/passes.html); see also [5.1 (fi) passes page](https://docs.blender.org/manual/fi/5.1/render/layers/passes.html)
- Community workflow: multiply AO and shadow passes together before multiplying onto the render for a stronger look; alternatively use the AO node in the material instead of compositing. — [Blender Artists: "More AO without compositing"](https://blenderartists.org/t/more-ao-without-compositing/688219)
- A bug report exists titled "Compositing: Multiply node for Render + AO gives an unexpected result on background" (background pixels behave badly under multiply). Only the title was visible to me. — [T95244](https://developer.blender.org/T95244)

### Inferences
- Version map to give the reader (based on what exists in the search results): EEVEE Next shipped in 4.2 LTS; Blender 5.0, 5.1 and 5.2 LTS all have manual pages and release notes ([5.0 EEVEE notes](https://developer.blender.org/docs/release_notes/5.0/eevee/), [5.2 EEVEE & Viewport notes](https://developer.blender.org/docs/release_notes/5.2/eevee/)), so "late 2026" Blender is 5.1/5.2. I could not read the 5.1/5.2 EEVEE notes, so any 5.x-specific AO change is unconfirmed.
- Because the AO node's "Only Local" is Cycles-only, a material that relies on it will look different in EEVEE (neighbouring objects will also occlude). Treat Only Local as a Cycles feature when planning cross-engine or glTF/web pipelines.
- `[background knowledge, unverified in this session]` Mental model of the four AO "kinds": (1) AO node = material-level mask or multiplier you can feed into any shader input (dirt, wear, cavity, contact darkening); (2) real GI occlusion = what Cycles path tracing (and EEVEE Next raytracing) produce automatically when an HDRI/area light is occluded, and it is physically the "right" AO; (3) AO render pass = a debug/compositing aid, not extra light; (4) baked AO = static texture for engines that cannot compute it (web/glTF/game).
- `[background knowledge, unverified in this session]` In EEVEE Next the old legacy EEVEE "Ambient Occlusion / Bent Normals / Bounces approximation" panel no longer exists; occlusion lives under Render > Raytracing > Fast GI Approximation (method AO vs Global Illumination) with horizon-scan controls (resolution, thickness, distance). Exact panel names and defaults should be checked in the 5.x UI.

### Gaps
- Exact EEVEE Next horizon-scan panel contents (names, ranges, defaults) in 4.2, 4.5, 5.0, 5.1, 5.2: the manual page `render/eevee/render_settings/raytracing.html` was blocked.
- Whether the AO node's "Inside" option works in EEVEE Next: not found.
- Whether anything about AO, horizon scan or Fast GI changed in 5.0/5.1/5.2: release-note pages were blocked; the only visible 5.0 EEVEE items in a search summary were unrelated (light probe volume back-face culling, view-layer overrides for material/world/sample, new shader nodes such as Repeat Zones and Bundles). That summary is secondhand and ambiguous, so I have not relied on it.
- Where the AO distance used by the AO bake/pass is controlled in 5.x (scene-level Fast GI distance vs. node distance): not found.

---

## 2. AO in materials (dirt, edge wear), fake contact shadows, AO bakes for web/glTF (lightmaps)

### Takeaway
Procedural dirt/edge wear in Cycles is built from the AO node (Inside for convex edges, normal AO for crevices), the Bevel node, and Geometry > Pointiness, shaped with ColorRamps. Pointiness and Bevel are Cycles-only and need adequate mesh density. For web/glTF, AO is baked in Cycles to an image (needs UVs, Non-colour handling) and packed into the R channel of an ORM texture.

### Cited Findings
- Blender 2.8-era technique: Bevel and Ambient Occlusion nodes create edges, dust and rust; Pointiness had long been the best procedural edge detector, but the Bevel node allows better results. — [BlenderNation: Blender 2.8 edges, dust and rust](https://www.blendernation.com/2019/02/17/blender-2-8-edges-dust-and-rust/)
- Worn edges via Geometry > Pointiness: the effect is subtle and normally needs a ColorRamp to increase contrast. — [BlenderNation: Blender Secrets, Worn Edges](https://www.blendernation.com/2020/10/06/blender-secrets-worn-edges/)
- Pointiness and Bevel are supported only by Cycles (not EEVEE), and geometry must be fairly dense (it will not work on an 8-vertex cube). — [Edge Wear product page (Superhive)](https://superhivemarket.com/products/edge-wear-); [BlenderNation: Better Edge and Cavity Masking with Cycles](https://www.blendernation.com/2019/02/10/better-edge-and-cavity-masking-with-cycles/) (snippet-level attribution; could not confirm which page says which part)
- Edge detection and cavity masking are described as key characteristics of procedural materials: edge wear on aged objects, dirt/dust/grime collecting in cavities. — [BlenderNation: Better Edge and Cavity Masking with Cycles](https://www.blendernation.com/2019/02/10/better-edge-and-cavity-masking-with-cycles/)
- Known limitation: bug reports titled "Ambient occlusion node doesn't apply to beveled edges" (the AO node does not see normals perturbed by the Bevel node). Only titles were visible. — [T90134](https://developer.blender.org/T90134); [T88292](https://developer.blender.org/T88292)
- Cycles baking requirements: the mesh needs a UV map, and either a Color Attribute or an Image Texture node with an image; the active Image Texture node (or Color Attribute) is the bake target. — [Blender Manual 4.2, Render Baking](https://docs.blender.org/manual/en/4.2/render/cycles/baking.html)
- Cycles baking uses the scene's render settings (samples, bounces...), so baked quality should match the rendered scene. — [Blender Manual 4.2, Render Baking](https://docs.blender.org/manual/en/4.2/render/cycles/baking.html)
- Bake margin: by default a margin is generated around UV islands to avoid seam discontinuities from filtering and mip-mapping; margin types include Extend (extend border pixels) and Adjacent Faces (fill from neighbouring faces across UV seams). — [Blender Manual 4.2, Render Baking](https://docs.blender.org/manual/en/4.2/render/cycles/baking.html)
- glTF stores occlusion in the red (R) channel of a texture, which may share one image with roughness and metallic. — [Blender Manual, glTF 2.0 importer/exporter](https://docs.blender.org/manual/en/4.1/addons/import_export/scene_gltf2.html)
- ORM packing convention: Red = Ambient Occlusion, Green = Roughness, Blue = Metallic; a glTF/ORM bake preset in the BakeFlow add-on packs AO, roughness and metallic into one texture. — [BakeFlow documentation (Superhive)](https://superhivemarket.com/products/bakeflow/docs)
- A Babylon.js forum thread, "Ambient Texture from Blender?", discusses getting Blender-made AO into a web 3D engine (title only visible). — [Babylon.js forum](https://forum.babylonjs.com/t/ambient-texture-from-blender/45254)

### Inferences
- `[background knowledge, unverified in this session]` Dirt/edge-wear recipe in Cycles: AO node (Distance ~0.02 to 0.1 m at object scale, Samples 16, "Only Local" on if neighbours should not leak) with Inside ON for convex edge wear and OFF for cavity grime; feed AO Color/Fac through a ColorRamp with the two stops close together (hard mask) and a Noise/Musgrave texture multiplied in for irregularity; use the mask to mix Base Color (worn metal/paint under-layer), Roughness (dust = higher roughness) and Bump. Add a Bevel node (Radius 1 to 3 mm, Samples 8 to 16) to the AO "Normal" input only if the bevel-vs-AO bug above is an issue in your version.
- `[background knowledge, unverified in this session]` Fake contact shadows: (a) Cycles - low-Distance AO node multiplied into the Base Color near contact points, or a baked AO decal plane under the object; (b) EEVEE - enable Fast GI/horizon-scan occlusion and keep object contact distance small; (c) web/real-time - a blurred dark ellipse "blob shadow" plane or a baked soft shadow texture under the product is cheaper and usually looks better than a real-time AO.
- `[background knowledge, unverified in this session]` Cycles AO bake for web: Bake Type = Ambient Occlusion; 128 to 512 samples with denoising; Margin 8 to 16 px at 2K (Extend); target image created with Float off and colour space Non-Color; bake from a non-overlapping UV layout (a second UV map is the usual choice for lightmap-style AO); pack into ORM R channel (G = roughness, B = metallic) with a Combine RGB node or compositor; export with the glTF exporter (the exporter reads occlusion from a dedicated glTF settings node group in the material, which has been renamed across versions: check the exporter docs for your build); compress with KTX2/Basis for web delivery; 1K to 2K is typically enough for a single product.
- `[background knowledge, unverified in this session]` In three.js-style engines AO maps affect only indirect/ambient light (and a separate `lightMap` handles baked lighting), so baked AO will not darken direct-lit regions; for merch/product viewers prefer a baked soft contact shadow plane plus an IBL environment.

### Gaps
- No page-level read of the Cycles bake manual for AO-specific details (e.g. which distance setting the AO bake obeys, "Selected to Active" workflow): blocked.
- No source found for glTF lightmap/second-UV behaviour in three.js, Babylon.js or model-viewer: only the Babylon forum title was visible.
- Exact name/location of the glTF exporter's occlusion-input node group in 4.2 to 5.2: not retrieved.
- No source found for the "blob shadow" or baked contact-shadow approach; it is background knowledge only.

---

## 3. Common AO mistakes (dirty look, over-darkening, colour management)

### Takeaway
I found no authoritative source that lists AO mistakes as such. The only sourced hints are that the compositor multiply can misbehave on background pixels, that the AO node does not respond to bevel-perturbed normals, and that EEVEE Next thickness must be tuned to avoid over/under-occlusion. The rest is practitioner knowledge, labelled below.

### Cited Findings
- Multiplying an AO pass over a render can give an unexpected result on the background (bug report title). — [T95244](https://developer.blender.org/T95244)
- EEVEE Next thickness: low enough avoids over-occlusion from in-front geometry; too low causes under-occlusion. — [PR #108398](https://projects.blender.org/blender/blender/pulls/108398)
- AO node does not apply to beveled edges (bug report titles). — [T90134](https://developer.blender.org/T90134); [T88292](https://developer.blender.org/T88292)
- Cycles baking uses render settings, so a low-sample scene gives noisy baked AO. — [Blender Manual 4.2, Render Baking](https://docs.blender.org/manual/en/4.2/render/cycles/baking.html)

### Inferences
- `[background knowledge, unverified in this session]` Typical mistakes: (1) multiplying a full-strength AO pass over an already-GI-lit render double-counts occlusion and gives the "dirty" look - dial the multiply down to 20 to 40 % or use a Mix factor/Overlay at low opacity; (2) AO Distance too large (e.g. default 1 m on a 10 cm product) darkens everything; match distance to the feature size you want to emphasise; (3) AO baked into base colour and then lit by GI again; (4) applying AO to metals' specular reflection (AO should only occlude diffuse/ambient light, not mirror-like reflections); (5) treating AO as a mask in sRGB: AO and mask textures must be Non-Color, and compositing AO happens on scene-linear data before the view transform, not after (multiplying after AgX/Filmic distorts the result); (6) pushing contrast in a ColorRamp so far that edge wear looks like a stamp; (7) uniform, noise-free wear masks that read as procedural.
- `[background knowledge, unverified in this session]` Colour-management rule of thumb: AO, roughness, metallic, thickness maps = Non-Color; HDRI = linear (.hdr/.exr); do compositing multiplies in linear space.

### Gaps
- No tutorial source (Blender Guru, Default Cube, Polygon Runway, Ryan King Art, Blender Manual color-management pages) could be fetched, so the above mistakes are unverified.

---

## 4. HDRI choice, resolution, bit depth, rotation and exposure

### Takeaway
Poly Haven (CC0) is the reference source and publishes unclipped HDRIs at very high resolution; 1K to 2K suffices for lighting/reflection-only or web/real-time use, while 8K to 16K matters only when the HDRI is visible in frame or for crisp sun shadows in offline renders.

### Cited Findings
- Poly Haven states 16k as its new standard texture-map resolution going forward, with the argument that hardware and expectations will keep rising. — [Poly Haven Dev Log #01](https://blog.polyhaven.com/dev-log-01/)
- Poly Haven's HDRI technical standard lists a minimum published resolution of 16k (horizontal) and links to guidance on creating HDRIs with a DSLR and panoramic head. — [Poly Haven technical standards: HDRIs](https://docs.polyhaven.com/en/technical-standards/hdris) (snippet; I could not read the page, so exact wording on "published" vs "captured" resolution is unverified)
- Poly Haven HDRIs are described as unclipped and available up to 16K. — [illustrarch free HDRI websites](https://illustrarch.com/articles/76852-free-hdri-websites.html) (aggregator; secondary)
- Practical resolution guidance from a game-asset guide: 1K or 2K is right for anything running in a browser; if the sky is never visible 1K is enough because it only provides light and reflection; if the viewer can look up, 2K or 4K is worth the download; 8K and 16K are for offline rendering. — [Cinevva, free HDRI skies](https://app.cinevva.com/game-assets/free-hdri-skies) (secondary game-asset site)
- High-resolution HDRIs (8K to 16K) give crisper sun shadows and believable micro-reflections; keep the HDRI image node colour space linear to avoid double gamma. — [iMeshh Blender beginner course, Quick lighting](https://imeshh.com/blog/blender-beginner-course/part-5-quick-lighting) or [DEV Community: grainy renders](https://dev.to/irender_gpu_render_farm/how-to-fix-grainy-renders-in-blender-2j6k) (snippet could not be tied to one of the two; both are low-authority secondary sources)
- Basic Blender HDRI setup: Shift+A > Texture > Environment Texture into the World's Background node; rotation via Mapping (Z rotation); brightness via Background Strength. — [A23D: How to use HDRI environment in Blender](https://www.a23d.co/blog/how-to-use-hdri-environment-in-blender); also [HDRMaps: Blender HDRI setup](https://hdrmaps.com/blog/blender-hdri-setup)
- Cycles automatically detects the HDRI resolution by default for the world importance map and uses a non-square sampling map (commit title). — [Blender commit: Cycles automatically detect HDRI resolution...](https://projects.blender.org/archive/blender-archive/commit/716e138a1b8cb81e13f7da2da5d16763d868743a)
- Poly Haven's Blender add-on lets users browse and load HDRIs without leaving Blender. — [illustrarch free HDRI websites](https://illustrarch.com/articles/76852-free-hdri-websites.html) (secondary)

### Inferences
- `[background knowledge, unverified in this session]` Bit depth: use 32-bit float .exr or Radiance .hdr (RGBE) for lighting so the sun and lamps stay above 1.0; 8-bit JPG/PNG "HDRIs" clip the sun at 1.0 and give flat, shadowless lighting. Poly Haven offers both .hdr and .exr; EXR 16-bit half-float is a good size/quality compromise.
- `[background knowledge, unverified in this session]` Starting values: Background Strength 1.0, then correct exposure with Film > Exposure or the Background Strength (not by raising the View Transform Gamma). A rotation sweep of the Mapping Z rotation (0 to 360 degrees) is the cheapest way to find the best key-light direction and reflection placement. For Cycles, 2K to 4K is a good working resolution; the final sharp background (if visible) can be swapped to 8K at render time.
- Because the project in this repo is a merch/shop site (printed T-shirts, hoodies), a 2K studio HDRI is probably enough for product renders and 1K for any web 3D viewer; high-res only matters if an HDRI backdrop is visible.

### Gaps
- No primary source on the Poly Haven exact available resolutions and formats per HDRI (docs.polyhaven.com blocked).
- No sourced guidance on rotation/exposure beyond basic node setup.
- Whether Blender 5.x changed the default HDRI handling or added native "world ground projection": not found.

---

## 5. HDRI for lighting only vs. background; Light Path "Is Camera Ray"; blurred backgrounds

### Takeaway
The standard approach is a Mix Shader in the World node tree with Light Path > Is Camera Ray as the factor: one Background node (the HDRI) lights the scene, the other (solid colour/gradient/blurred image) is what the camera sees. High-res image for the background and low-res for lighting is a known variant. Add-ons exist for blurred HDRI backgrounds.

### Cited Findings
- Add a second Background node and a Mix Shader in the World node tree, mix them using Light Path > Is Camera Ray as the Fac; the HDRI lights the scene while the camera sees a different colour/image. — [Blender Artists: Render with HDRI lighting but without HDRI image](https://blenderartists.org/t/render-with-hdri-lighting-but-without-hdri-image/670376); [Blender Artists: HDRI for lighting but not background](https://blenderartists.org/t/hdri-for-lighting-but-not-background/1201155)
- Connect Is Camera Ray to the Mix Shader's Fac: objects are lit by the HDRI in the first Background node but appear against a "sky" coloured by the second Background node. — [Blender 2.6 Cycles Materials and Textures Cookbook (excerpt)](https://m.e-book.qq.com/read/1036706010/12)
- A Mix (colour) node with Fac = Is Camera Ray works too: first colour = indirect lighting colour, second = directly visible colour; useful for a high-res image as background and a low-res image as the lighting source. — [Blender Artists: Is there a way to light a scene by an hdri but has a solid color?](https://blenderartists.org/t/lit-by-hdr-but-solid-color/693429) (snippet-level attribution)
- A thread on using different HDRIs for lighting and for the background (relevant to windows/interiors) exists. — [Blender Artists: different HDRI for lighting and background when using windows](https://blenderartists.org/t/how-to-use-a-different-hdri-for-lighting-and-background-when-using-windows/1534981) (title only)
- Commercial add-ons exist for this workflow: "Ray Link" and "HDRI Blur Background & Reflections" (blur the background while keeping sharp reflections). — [Ray Link docs](https://superhivemarket.com/products/ray-link/docs); [HDRI Blur Background & Reflections docs](https://superhivemarket.com/products/hdri-blur-background--reflections/docs) (titles/URLs only; features not read)
- Blender 5.0 EEVEE notes mention View Layer Overrides now supported for Material, World and Sample (a way to use a different World per view layer, e.g. one for lighting and one for the visible background; unverified detail from a search summary). — [Blender 5.0 EEVEE & Viewport release notes](https://developer.blender.org/docs/release_notes/5.0/eevee/)

### Inferences
- `[background knowledge, unverified in this session]` Simplest option for cut-out product renders: Render Properties > Film > Transparent (Cycles/EEVEE). The HDRI still lights and reflects, but the sky renders as alpha 0; then composite onto a flat colour or gradient. This is the best route for web-shop PNG/WebP cut-outs, and it needs no node setup.
- `[background knowledge, unverified in this session]` Blurred background without blurring reflections: feed the HDRI through Is Camera Ray into a second Environment Texture node using a heavily downsized or blurred copy of the image (or use a Blur node in the compositor on the alpha-less background pass); in Cycles the Environment Texture node has no blur, so pre-blur the image in an editor or use the Is Camera Ray mix with a gradient.
- `[background knowledge, unverified in this session]` Is Camera Ray also works for hiding visible lights/cards: use Object Properties > Visibility > Ray Visibility > Camera off on emission cards so they light and reflect but stay invisible. Check that World Ray Visibility settings (Camera toggle) exist in your Cycles version; I could not confirm them.
- Whether Is Camera Ray behaves the same in EEVEE Next's world shader is unconfirmed here (see Gaps); Film > Transparent is the safer cross-engine route.

### Gaps
- Light Path node manual page (outputs, EEVEE support) blocked; Is Camera Ray in EEVEE Next world unverified.
- Add-on feature sets and pricing not read.
- No authoritative source for a built-in Blender "blur HDRI background" feature.

---

## 6. Sampling, MIS / world map resolution, noise reduction, EEVEE sun extraction

### Takeaway
Cycles world MIS uses an importance map ("baked" grayscale of the world shader) to favour bright regions; it is on by default (Auto) and reduces noise at the cost of potential fireflies. EEVEE Next has a separate sun-extraction feature with a Threshold, Angle and Shadow toggle to compensate for how EEVEE stores environment lighting.

### Cited Findings
- World Settings > Sampling: selecting Auto or Manual enables Multiple Importance Sampling, None disables it. — [Blender Manual 5.1, Cycles World Settings](https://docs.blender.org/manual/en/5.1/render/cycles/world_settings.html)
- MIS samples the background so lighter parts are favoured via an importance map, producing less noise in exchange for artifacts (fireflies); it should be enabled when using an image texture with small bright lights such as the sun, otherwise noise can take a long time to converge. — [Blender Manual 5.1, Cycles World Settings](https://docs.blender.org/manual/en/5.1/render/cycles/world_settings.html); [4.4 manual](https://docs.blender.org/manual/ar/4.4/render/cycles/world_settings.html)
- Map Resolution sets the importance-map resolution: higher detects small features and samples more accurately but uses more memory and renders slightly slower; higher values may produce less noise with high-res images. — [Blender Manual 5.1, Cycles World Settings](https://docs.blender.org/manual/en/5.1/render/cycles/world_settings.html)
- Auto mode examines all Environment Texture nodes and picks the largest image resolution; sampling map can be non-square. — [Blender commit: Cycles automatically detect HDRI resolution](https://projects.blender.org/archive/blender-archive/commit/716e138a1b8cb81e13f7da2da5d16763d868743a)
- Fireflies from HDRIs: some bundled studio-light HDRIs produced fireflies in Cycles due to negative values around highlights; swapping the HDRI can fix it. — [DevTalk: Studiolight HDRIs cause fireflies in Cycles](https://devtalk.blender.org/t/studiolight-hdris-cause-fireflies-in-cycles/11632); [bug T73832](https://developer.blender.org/T73832)
- Mitigations reported by users: Clamp Indirect around 10 (imperfect but helpful), portals (for interior/window lighting), and denoising only the offending pass (e.g. indirect glossy) when fireflies come from there. — [Blender Artists: Impossible to eliminate fireflies Cycles 2.79](https://blenderartists.org/t/impossible-to-eliminate-fireflies-cycles-2-79/1145735); [Blender Artists: Keep getting fireflies no matter what I do](https://blenderartists.org/t/keep-getting-fireflies-no-matter-what-i-do/690377)
- Denoising can distort or lose detail; MIS is enabled by default. — [DEV Community: how to fix grainy renders in Blender](https://dev.to/irender_gpu_render_farm/how-to-fix-grainy-renders-in-blender-2j6k) (secondary)
- EEVEE Next sun extraction: converts part of the world light into a sun light; first implementation clamps the world lighting and sums the excess to deduce the sun position; the Threshold property sets the maximum world contribution stored in the world light probe (0 disables the feature); Angle controls the extracted sun's angle; Use Shadow enables shadows on it. Purpose: work around limitations of EEVEE's environment-lighting storage and reduce light bleeding from very bright sources. — [EEVEE-Next: Sunlight Extraction PR #121455](https://projects.blender.org/blender/blender/pulls/121455); [EEVEE: World Light Extraction issue #68478](https://projects.blender.org/blender/blender/issues/68478)

### Inferences
- `[background knowledge, unverified in this session]` Practical Cycles settings for HDRI noise: leave World Sampling on Auto (it matches the largest HDRI resolution); use Manual with 2048 to 4096 only when a tiny, very bright sun in a 16K map still shows noisy shadows; if fireflies appear, first try Clamp Indirect ~10 and Filter Glossy 0.5 to 1.0 in Light Paths, then a different HDRI/rotation, then a lower-resolution lighting copy of the HDRI (via the Is Camera Ray split). Use OpenImageDenoise with Albedo and Normal passes, noise threshold ~0.01 (0.005 for hero stills), 128 to 512 max samples for stills.
- `[background knowledge, unverified in this session]` For EEVEE with a harsh-sun HDRI, set the sun-extraction Threshold to ~1.0 to 10.0 so the sun becomes a real sun lamp with shadows and the world probe stops bleeding; match Angle to the sun's apparent size in the HDRI (~0.5 degrees for a real sun, larger to soften).

### Gaps
- Exact defaults and UI names for EEVEE sun extraction in 5.x (the PR is for 4.2 development): not confirmed.
- No benchmark/quantitative source for MIS map resolution vs. noise.
- Cycles 5.x changes to world sampling, if any: manual 5.1 page was visible only as a snippet; 5.2 not read.

---

## 7. Shadow catcher, ground projection, studio HDRIs, custom/procedural worlds, add-ons, capturing own HDRIs, Nishita vs. HDRI

### Takeaway
Cycles has a built-in Shadow Catcher object flag for compositing onto plates or flat backgrounds; true "ground projection" (flattening the HDRI floor) is handled by add-ons rather than a core feature (not confirmed either way). Nishita Sky Texture is the procedural alternative to an HDRI, with sun size/elevation, altitude, air, ozone and dust controls and a bright default that needs exposure correction.

### Cited Findings
- Cycles Shadow Catcher: select the ground plane, Object Properties > Visibility > Mask > Shadow Catcher; Cycles masks the areas of the object that receive no shadow so only the shadows remain over the backdrop. — [Versluis: Creating a Shadow Catcher in Blender (Cycles and Eevee)](https://www.versluis.com/2023/05/creating-a-shadow-catcher-in-blender-for-cycles-and-eevee/); [Creative Bloq: How to set up a shadow catcher in Blender](https://www.creativebloq.com/3d/how-to-set-up-a-shadow-catcher-in-blender)
- If you need reflections in the shadow catcher and/or a projection of the HDRI, things "rapidly get more complicated". — [Versluis: How to create a Shadow Catcher in Blender (Cycles)](https://www.versluis.com/2016/11/how-to-create-a-shadow-catcher-in-blender-cycles/) (snippet-level)
- A tutorial/guide set exists for the full HDRI workflow with shadow catcher in Cycles and Eevee. — [Versluis 2023](https://www.versluis.com/2023/05/creating-a-shadow-catcher-in-blender-for-cycles-and-eevee/)
- Ground projection via add-on: "Projection Master" - load an HDRI, click Apply Ground Projection, adjust HDRI rotation so reflections line up with the subject, and adjust Location Z and Scale Z to align horizon and ground. — [Projection Master docs (Superhive)](https://superhivemarket.com/products/projection-master--hdri-ground-projection/docs)
- HDRI Maker 2.0 add-on was reviewed by BlenderNation (builds HDRI-based environments/backdrops; details not read). — [BlenderNation: HDRI Maker 2.0 review](https://www.blendernation.com/2020/04/28/blender-add-on-review-hdri-maker-2-0/)
- Studio-lighting add-ons and packs exist: Lighting Studio (procedural softboxes, reflection cards, HDRI mixing, window/product/car/jewellery setups), LightStudio Quick (presets, HDRI controls, backdrops, turntable cameras), Ambient Base HDRIs (50 subtle environments to replace the "empty void"), Greyscalegorilla "Pro Studios Metal Vol 2" (65 HDRI setups for lighting metal, 8K) and a free Studio Lighting HDRI Pack on Gumroad. — [Lighting Studio](https://superhivemarket.com/products/lighting-studio); [LightStudio Quick docs](https://superhivemarket.com/products/lightstudio-quick/docs); [Ambient Base HDRIs](https://superhivemarket.com/products/ambient-base-hdris); [Greyscalegorilla Pro Studios Metal Vol 2](https://greyscalegorilla.com/product/hdri-collection-pro-studios-metal-volume-2); [Free Studio Lighting HDRI Pack](https://leonidaltman.gumroad.com/l/Free-Studio-Lighting-HDRI-Pack)
- Nishita sky: improved version of the 1993 Nishita model; quite bright and looks overexposed with default scene settings, so reduce Exposure in Properties > Render > Film. — [Blender Manual, Sky Texture node](https://docs.blender.org/manual/ja/4.5/render/shader_nodes/textures/sky.html)
- Nishita controls: Sun Size (angular diameter in degrees), Sun Elevation (degrees from horizon), Altitude (distance from sea level to camera; 0 for a beach, ~10 km for a plane cockpit; limited to 60 km), Air (0 none, 1 clear day, 2 highly polluted), Ozone (0 none, 1 clear, 2 city-like; makes the sky bluer), Dust (0 none, 1 clear, 5 city-like, 10 hazy). — [Blender Manual, Sky Texture node](https://docs.blender.org/manual/ja/4.5/render/shader_nodes/textures/sky.html)
- Nishita vs HDRI forum guidance: you can match the sky's sun rotation/angle to the HDRI's sun, since both show up in shadows, and still adjust Air/Dust/Ozone. — [Blender Artists: Sky Texture HDRI, how to do it correctly](https://blenderartists.org/t/sky-texture-hdri-how-to-do-it-correctly/1468835); [Sky Texture (Hosek/Wilkie vs. Nishita)](https://blenderartists.org/t/sky-texture-hosek-wilkie-vs-nishita/1492126) (snippet-level)

### Inferences
- `[background knowledge, unverified in this session]` Custom studio HDRI inside Blender: build a minimal studio (large emission planes/softboxes, strip lights, black flags/gobos, grey sweep), place a panoramic camera (Cycles Panorama > Equirectangular) at the product position, render 2K to 4K with Film Exposure fixed and save as 32-bit OpenEXR (no view transform: Save As Render off). Reuse as World image. Also possible without an HDRI file: a procedural world from a Gradient Texture (Z-based) + a few "lamp" blobs made with Wave/Gradient + ColorRamp above 1.0.
- `[background knowledge, unverified in this session]` Gradient/procedural world for studio-neutral lighting: Gradient Texture on Generated or Window coordinate (Y/Z) into ColorRamp (light grey to mid grey), Background Strength 0.5 to 1, plus 1 to 3 Area lights as key/rim. This gives soft, noise-free lighting with a controllable backdrop.
- `[background knowledge, unverified in this session]` Capturing your own HDRI: chrome-ball photography (low resolution, with mirror-ball distortion) is a quick approximation; a 360 camera with bracketed exposures or a DSLR plus panoramic head gives proper HDRIs (cf. Poly Haven's pano-head guidance linked in section 4). For small studios, a 360 camera with 3 to 5 brackets merged in an HDR tool is usually enough.
- `[background knowledge, unverified in this session]` Nishita vs HDRI decision rule: Nishita for exteriors where you need to choose the sun's elevation/azimuth precisely (golden hour, tiny-house in landscape) and want a clean horizon; HDRI when real cloud structure, ground colour, or realistic reflections are the point. Nishita's sun is a real disc light, so shadows are crisp and noise-free with MIS.

### Gaps
- Whether Blender 5.x has native ground projection in the World/Environment Texture node: not found; treat as add-on territory unless verified.
- HDRI Maker feature set and Hosek/Wilkie/Preetham status in 4.x/5.x (the forum title references Hosek/Wilkie): not verified.
- No tutorial source (Greg Zaal, Blender Guru, Default Cube) read for custom studio HDRI building; these steps are background knowledge.

---

## 8. Reflection design (cards, gobos, how HDRI shapes metals/glass, avoiding flat lighting)

### Takeaway
No authoritative source on reflection-card technique was readable. Only marketing pages show that purpose-built "metal/glass studio" HDRIs and procedural "reflection card" tools exist. The detailed principles below are practitioner knowledge to verify.

### Cited Findings
- Greyscalegorilla markets HDRIs "designed to light metal and accentuate every curve" (65 setups, 8K). — [Greyscalegorilla Pro Studios Metal Vol 2](https://greyscalegorilla.com/product/hdri-collection-pro-studios-metal-volume-2)
- Ambient Base HDRIs are marketed as subtle environments designed to replace the "empty void" in product rendering, adding subconscious realism and ambient irregularities. — [Ambient Base HDRIs (Superhive)](https://superhivemarket.com/products/ambient-base-hdris)
- Lighting Studio add-on lists reflection cards, procedural softboxes and HDRI mixing among its tools. — [Lighting Studio (Superhive)](https://superhivemarket.com/products/lighting-studio)
- Backdrop/finish options in LightStudio Quick include curved studio wall, L-shaped backdrop, flat floor and open-top cylinder with Matte, Satin, Glossy, Polished Metal, Rough Metal finishes. — [LightStudio Quick docs](https://superhivemarket.com/products/lightstudio-quick/docs)

### Inferences
- `[background knowledge, unverified in this session]` What reflections need: shiny/metal/glass objects show the environment, not the light itself. A uniform, even HDRI gives flat, "plastic" metals. Define form with large soft gradients and a few crisp, high-contrast shapes: 1 large softbox (key, 1.5 to 2 x subject size), 1 to 2 long strip lights (rim/edge definition), a dark flag/negative-fill (black card, strength 0) on the opposite side, and a bright white bounce card opposite the key for shadow-side fill.
- `[background knowledge, unverified in this session]` Reflection cards: emission planes (strength ~3 to 20) with Camera Ray visibility off (Object > Visibility > Ray Visibility) so they appear in reflections but not in frame; place them where the curve of the object needs a highlight (edges, handles, rims). Gobos/flags (black planes) create dark bands for contrast (essential for chrome and black glass; "bright field" vs "dark field" lighting).
- `[background knowledge, unverified in this session]` Glass: bright-field (back-lit white card behind) shows clean edges and clear caustics-free refraction; dark-field (black background with white strips along edges) gives defined outlines. Raise Max Bounces Transmission/Total to 12 or more; use Light Paths > Filter Glossy 0.5 to 1.0 for noise.
- `[background knowledge, unverified in this session]` Avoid flat lighting: vary light size and distance, keep a directional key at 30 to 60 degrees off the camera axis, add a gradient/vignette, rotate the HDRI until a strong highlight sits along the product's silhouette, and let AO/contact shadows ground the object on the floor. Remember that physically accurate reflection detail from a 2K HDRI can look soft on mirror-like metals; use a higher-resolution HDRI or emission cards for sharp lines.

### Gaps
- No tutorial transcript or article on reflection-card technique (Greg Zaal, Polygon Runway, Default Cube, Ryan King Art etc.) was readable, so all numeric starting values here are unverified.

---

## 9. Recommended HDRI sources and licensing

### Takeaway
Poly Haven (ex-HDRI Haven) is CC0: free for commercial use, no attribution needed. ambientCG is also CC0. HDRI-Skies has a free tier limited to ~4K with paid higher resolutions. Greyscalegorilla and marketplace packs are paid or have their own licences and must be checked individually.

### Cited Findings
- All Poly Haven assets are CC0: usable for any purpose including commercial work; no credit required (appreciated). One result adds you cannot claim to be the original author or re-license them; note CC0 itself waives rights, so this phrasing may be a paraphrase, and the Poly Haven FAQ should be checked for exact wording. — [Poly Haven FAQ](https://polyhaven.com/faq); [Poly Haven docs FAQ](https://docs.polyhaven.com/en/faq)
- Poly Haven hosts hundreds of HDRIs (one source says over 980), CC0, up to 16K, unclipped. — [illustrarch free HDRI websites](https://illustrarch.com/articles/76852-free-hdri-websites.html) (secondary; count date unknown)
- HDRI Haven (Poly Haven's earlier name) went 100% free and CC0 in October 2017; earlier it released a free 16,000 px HDRI every week. — [BlenderNation: HDRI Haven now 100% Free, CC0](https://www.blendernation.com/2017/10/03/hdri-haven-now-100-free-cc0/); [CG Channel: free 16,000px HDRI every week](https://www.cgchannel.com/2017/06/get-a-free-16000px-hdri-every-week-from-hdri-haven/)
- Greg Zaal made his HDRIs free with no account or restrictive licence; as CC0 they belong to the public. — [CGPress: HDRI Haven free HDRI library](https://cgpress.org/archives/hdri-haven-free-hdri-library.html) (aggregator, secondary)
- ambientCG: CC0 HDRIs in resolutions 1K to 16K, .exr downloads work in Cycles and EEVEE. — [illustrarch](https://illustrarch.com/articles/76852-free-hdri-websites.html); [learnarchitecture](https://learnarchitecture.net/3d-visualization/33718-free-hdri-websites-rendering.html) (aggregators, secondary)
- HDRI-Skies: free tier up to 4K; 8K and above need a paid account. — [illustrarch](https://illustrarch.com/articles/76852-free-hdri-websites.html) (aggregator, secondary; verify current terms)
- Commercial/free packs for studio-style lighting: [Greyscalegorilla HDRI Collection](https://greyscalegorilla.com/hdri) (paid), [Ambient Base HDRIs](https://superhivemarket.com/products/ambient-base-hdris), [Leonid Altman free studio pack (Gumroad)](https://leonidaltman.gumroad.com/l/Free-Studio-Lighting-HDRI-Pack), [ArtStation marketplace studio HDRI pack](https://www.artstation.com/marketplace/p/JewLK/abstract-studio-geometric-lights-5-hdri-collection). Licence terms for these were not read.

### Inferences
- For a shop/merch project that sells products commercially and shows renders on a site, CC0 sources (Poly Haven, ambientCG) avoid attribution and redistribution headaches; verify the specific licence of any HDRI from paid packs or HDRI-Skies before use in commercial imagery.
- `[background knowledge, unverified in this session]` Category guidance: studio (soft key, neutral, good for product/merch), overcast (even diffuse light, low contrast; good for houses, boats, honest colour), sunset/golden hour (warm directional light; strong MIS-sun; good for exteriors), interior (window-lit, warm, for interiors; needs portals).

### Gaps
- Poly Haven's own licence page and FAQ exact text: pages blocked; wording of the "cannot re-license" claim unverified.
- HDRI-Skies current terms, ambientCG HDRI catalogue size/resolutions, and Greg Zaal's current HDRI hosting: not verified against primary sources.
- Other sources named in the brief (HDRI Skies detail, ArtStation vendors, sIBL Archive, NASA/ESO, etc.) not researched.

---

## 10. Recipes: product/merch on neutral studio, tiny-house exterior, boat on water

### Takeaway
No source provided ready-made recipes with specific settings. The recipes below combine the sourced building blocks (Is Camera Ray split, MIS, shadow catcher, Nishita parameters, AO node) with practitioner defaults; all numeric values need verification by test renders.

### Cited Findings
- Building blocks that apply to all recipes (sources above): Is Camera Ray split for light vs. visible background ([Blender Artists](https://blenderartists.org/t/hdri-for-lighting-but-not-background/1201155)); Cycles world MIS Auto/Manual and Map Resolution ([Blender Manual 5.1](https://docs.blender.org/manual/en/5.1/render/cycles/world_settings.html)); Shadow Catcher via Object > Visibility > Mask ([Versluis](https://www.versluis.com/2023/05/creating-a-shadow-catcher-in-blender-for-cycles-and-eevee/)); Nishita sky controls ([Blender Manual, Sky Texture](https://docs.blender.org/manual/ja/4.5/render/shader_nodes/textures/sky.html)); AO node Distance/Inside/Only Local ([Blender Manual](https://docs.blender.org/manual/en/dev/render/shader_nodes/input/ao.html)).
- Nishita Altitude 0 corresponds to sea level/beach, which is the correct starting point for a boat at sea level; Dust 10 = hazy day, Dust 5 = city-like. — [Blender Manual, Sky Texture](https://docs.blender.org/manual/ja/4.5/render/shader_nodes/textures/sky.html)

### Inferences
All entries `[background knowledge, unverified in this session]`.

**Recipe A: Product/merch on a neutral studio background (e.g. T-shirt, hoodie, print mockups)**
- Engine: Cycles for final stills (EEVEE Next acceptable for previews and fast turntables).
- World: neutral soft studio HDRI at 2K (Poly Haven "studio" category), Background Strength 1.0, rotate so the main softbox is camera-left or camera-right at 30 to 45 degrees; if the HDRI shows through, split with Is Camera Ray into a flat colour (e.g. #EDEDED to #F5F5F5) or use Film > Transparent.
- Add 1 large Area light (soft key, size ~2 x subject, Power tuned by exposure) and 1 strip as rim to add shape; fabric benefits from soft light and a slight backlight to show texture/sheen.
- Floor: infinity sweep (curved plane) in a light neutral, or Shadow Catcher plane with Film Transparent; add soft contact shadow via real GI (Cycles) rather than AO multiply.
- AO: little to none for fabric; if used, AO node Distance 2 to 5 cm, Only Local ON, multiplied at 20 to 30 % into base colour only for folds/creases. Use bump/normal from print and fabric maps.
- Colour management: because printed colours must match the shop, consider View Transform "Standard" or "Khronos PBR Neutral" (added in 4.2 for e-commerce/product colour fidelity) instead of AgX/Filmic, Look None; verify in your Blender build. Keep sRGB display for web output.
- Cycles: 256 to 512 samples + OpenImageDenoise, Clamp Indirect ~10, Light Paths Total 12/Diffuse 4/Glossy 4; 2000 to 3000 px output for the shop; export WebP/AVIF.

**Recipe B: Tiny-house exterior in a landscape**
- World: either (1) HDRI of an overcast or golden-hour landscape at 4K, strength 1.0, Sampling Auto; or (2) Nishita sky for precise control: Sun Elevation 8 to 20 degrees (golden hour) or 40 to 60 degrees (midday), Sun Size ~0.5 degrees, Air 1, Dust 1 to 2 (up to 3 for hazy warm light), Ozone 1, Altitude 0 to a few hundred metres; lower Film Exposure to taming the bright default.
- Camera at about eye height (1.5 to 1.7 m), 28 to 35 mm equivalent, slight vertical correction (Shift Y) to keep verticals straight.
- Ground: do not rely on the HDRI floor; model or scatter ground (Geometry Nodes grass/gravel) near the house, shadow-catcher or ground-projection for the far field if using an HDRI with a distant horizon.
- AO node for realism: dirt at foundation/skirting and under eaves (Distance 0.1 to 0.5 m, Inside OFF), edge wear on timber/metal trim (Inside ON, Distance ~2 cm, ColorRamp with 2 close stops), moss/grime in joints. Pair with Bevel node (1 to 3 mm) for catching highlights on corners.
- Use MIS (Auto) and keep sun direction coherent with cast shadows from trees/neighbouring objects; if an HDRI sun is small and noisy, extract it as a Sun lamp (EEVEE) or increase world map resolution (Cycles).
- Atmosphere: subtle volume scatter or depth haze in Compositor (Mist pass) for distance layering.

**Recipe C: Boat on water**
- Horizon: align the HDRI/sky horizon with the water plane at camera height; Nishita sky gives a dark below-horizon region and a clean sea horizon; for HDRI use a sea/ocean or open-sky HDRI with no ground intrusion.
- Water: Principled BSDF with Transmission 1, IOR 1.33, Roughness 0.0 to 0.05, Absorption/Volume Absorption for depth tint; use the Ocean Modifier (or Geometry Nodes) for waves + foam; Fresnel reflection will mirror the sky, so exposure of the sky controls the look. Light Paths: Transmission/Total 12.
- Light: Nishita Sun Elevation ~10 to 25 degrees for glancing reflections on water and hull; Air 1, Dust 2 to 5 for atmospheric haze toward the horizon; Altitude 0 (sea level, per the manual).
- AO node on the hull: waterline staining (AO Distance 0.05 to 0.2 m, Only Local ON) and edge wear on paint (Inside ON, ~1 to 2 cm); keep rubber/metal fittings glossier for reflections.
- Sampling: water reflections and caustic-free glossy paths are noisy; use Filter Glossy 0.5 to 1.0 and Clamp Indirect ~10; avoid light-source geometry that creates sharp caustics through water (disable Caustics > Reflective/Refractive in Cycles if they appear).

### Gaps
- No readable source with verified recipe values for any of the three scenarios. Numbers should be validated by test renders.
- Khronos PBR Neutral availability/name in 5.x not verified here.
- No source on hull AO, water shader parameters or Ocean Modifier defaults was retrieved.
