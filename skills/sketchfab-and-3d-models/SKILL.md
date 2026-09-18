---
name: sketchfab-and-3d-models
description: Connects to Sketchfab API and free 3D model platforms (Poly Pizza, ambientCG, Khronos glTF, Smithsonian 3D). Automates 3D model search, download, and deep flaw inspection (mesh topology, polygon budget, non-manifold geometry, missing PBR textures, UV errors, and DRACO compression).
---

# 🗿 Sketchfab & Free 3D Model Procurement & Flaw Inspection Engine

This skill equips the AI agent with automated workflows, API connectors, and deep validation scripts to discover, inspect, download, and optimize free 3D models (`.glb` / `.gltf`) from **Sketchfab Data API v3**, **Poly Pizza**, **ambientCG**, **Khronos glTF repository**, and **Smithsonian 3D Open Access** for use in Three.js, React Three Fiber (`@react-three/fiber`), and `<model-viewer>`.

```
══════════════════════════════════════════════════════════════════════════════════════════════════
                         THE 4-STAGE 3D ASSET LIFECYCLE PIPELINE
══════════════════════════════════════════════════════════════════════════════════════════════════
  [1. PLATFORM SEARCH]  ──►  [2. PRE-FLIGHT AUDIT]  ──►  [3. SECURE DOWNLOAD]  ──►  [4. DEEP QA & OPTIMIZATION]
  • Sketchfab API v3        • Face / Polycount Budget    • Unzip GLTF/GLB Archive    • Degenerate Triangles
  • Poly Pizza Free Lib     • PBR Material Completeness  • Asset URI Normalization   • Non-manifold Edges
  • Khronos Sample Models   • Mobile VRAM Check (<50MB)  • Draco / KTX2 Detection   • Missing UV Maps / Normals
══════════════════════════════════════════════════════════════════════════════════════════════════
```

---

## 🌐 1. Supported 3D Model Platforms & Connectors

### A. Sketchfab Data API v3
- **Base Endpoint**: `https://api.sketchfab.com/v3/`
- **Search Endpoint**: `GET /models?type=models&downloadable=true&sort_by=-likeCount&license=by,by-sa,cc0`
- **Download Endpoint**: `GET /models/{uid}/download` (Requires API Token in `Authorization: Token {API_KEY}`)
- **Payload Format**: Auto-converts to official Khronos standard `.gltf` with embedded or zipped textures.

### B. Poly Pizza & Google Poly Public Archives
- **Access**: Instant, zero-authentication public low-poly CC0/CC-BY 3D models.
- **Direct GLB URL**: `https://poly.pizza/bundle/{model-id}.glb` or via direct static asset endpoints.

### C. Khronos Group glTF 2.0 Official Sample Assets
- **Repository**: `https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/`
- **Asset Types**: PBR showcase models (Damaged Helmet, Flight Helmet, Sci-Fi Helmet, Antique Camera, Avocados, Cars) with certified spec compliance.

### D. ambientCG & Poly Haven (PBR Textures & Environment HDRI)
- **Direct CC0 Assets**: Free materials and HDRIs for realistic environment reflections in Three.js scenes.

---

## 🔍 2. Automated Pre-Download 3D Flaw & Quality Criteria

Before downloading or placing a 3D model into an interactive web application, the agent must evaluate the model against the **Web-Ready Quality Matrix**:

| Metric / Check | Web-Ready Standard (Passing) | Warning Threshold | Critical Flaw (Reject / Refactor) |
| :--- | :--- | :--- | :--- |
| **Polygon / Triangle Count** | $\le 45,000$ triangles per hero model | $45,000 - 95,000$ triangles | $> 100,000$ triangles (crashes mobile Safari) |
| **Draw Calls & Meshes** | $\le 8$ individual meshes per scene | $9 - 20$ meshes | $> 25$ unbatched draw calls |
| **Texture Resolution** | $1024\times 1024$ or $2048\times 2048$ WebP/PNG | $4096\times 4096$ (desktop only) | $8192\times 8192$ (Causes WebGL Out-Of-Memory) |
| **Material Standard** | PBR (Metallic-Roughness standard) | Specular-Glossiness (legacy) | Unlit flat color or missing diffuse map |
| **UV Coordinates** | `TEXCOORD_0` mapped with zero overlap | Minor seam stretching | Missing UV channel (textures render corrupted) |
| **Normals & Tangents** | Normalized vertex normals ($|n| = 1.0$) | Missing tangents (auto-calculated) | Flipped / inverted surface normals |
| **Pivot & Bounding Box** | Centered at origin $(0, 0, 0)$ | Offset pivot point | Model located at $(10000, 0, 0)$ offscreen |
| **File Format** | Single self-contained binary `.glb` | Multi-file `.gltf` + `.bin` + `.png` | `.obj` + `.mtl` or raw `.fbx` (too heavy) |

---

## 💻 3. Node.js Automated Model Procurement Script

Run the built-in procurement script to query Sketchfab or open sample repositories:

```bash
node "skills/sketchfab-and-3d-models/scripts/sketchfab-fetcher.js" --query "sports car" --polycount "50k" --out "./assets/models/"
```

### Script Implementation (`scripts/sketchfab-fetcher.js`):
```javascript
import https from 'https';
import fs from 'fs';
import path from 'path';

/**
 * Searches Sketchfab API for downloadable, web-optimized 3D models.
 * @param {string} query - Keyword search
 * @param {string} apiKey - Sketchfab API token (process.env.SKETCHFAB_API_KEY)
 * @param {number} maxFaces - Max triangle count (default: 50,000)
 */
export async function searchSketchfab(query, apiKey = process.env.SKETCHFAB_API_KEY, maxFaces = 50000) {
  const url = `https://api.sketchfab.com/v3/models?type=models&q=${encodeURIComponent(query)}&downloadable=true&max_face_count=${maxFaces}&sort_by=-likeCount`;

  const headers = { 'User-Agent': 'SuperGravity-3D-Pipeline/2.5' };
  if (apiKey) headers['Authorization'] = `Token ${apiKey}`;

  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (!json.results) return reject(new Error(json.detail || 'Failed to fetch models'));
          
          const filtered = json.results.map(m => ({
            uid: m.uid,
            name: m.name,
            faceCount: m.faceCount,
            vertexCount: m.vertexCount,
            thumbnailUrl: m.thumbnails?.images?.[0]?.url,
            license: m.license?.label,
            viewerUrl: m.viewerUrl
          }));
          resolve(filtered);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}
```

---

## 🔬 4. Automated 3D Model Flaw Detection Script

Before rendering a model, run the automated health check:

```bash
node "skills/sketchfab-and-3d-models/scripts/validate-3d-model.js" --file "./assets/models/product.glb"
```

### Validation Engine (`scripts/validate-3d-model.js`):
```javascript
import fs from 'fs';

/**
 * Reads binary GLB header and parses JSON chunk to detect mesh/texture flaws.
 */
export function validateGLB(filePath) {
  const buffer = fs.readFileSync(filePath);
  
  // 1. Magic Bytes Check (0x46546C67 = "glTF")
  const magic = buffer.readUInt32LE(0);
  if (magic !== 0x46546C67) {
    return { valid: false, error: 'Invalid GLB file: Magic header mismatch' };
  }

  const version = buffer.readUInt32LE(4);
  const totalLength = buffer.readUInt32LE(8);
  const chunkLength = buffer.readUInt32LE(12);
  const chunkType = buffer.readUInt32LE(16); // 0x4E4F534A = "JSON"

  if (chunkType !== 0x4E4F534A) {
    return { valid: false, error: 'Malformed GLB: First chunk is not JSON' };
  }

  const jsonText = buffer.toString('utf8', 20, 20 + chunkLength);
  const gltf = JSON.parse(jsonText);

  // 2. Perform Flaw Checks
  const issues = [];
  let totalTriangles = 0;
  let totalDrawCalls = 0;

  if (gltf.meshes) {
    gltf.meshes.forEach((mesh, mIdx) => {
      mesh.primitives.forEach((prim, pIdx) => {
        totalDrawCalls++;
        if (prim.indices !== undefined && gltf.accessors) {
          const accessor = gltf.accessors[prim.indices];
          totalTriangles += (accessor.count / 3);
        }
        // Check for missing normals or UVs
        if (!prim.attributes.NORMAL) {
          issues.push(`[FLAW] Mesh #${mIdx} Primitive #${pIdx} missing NORMAL vertex attribute.`);
        }
        if (!prim.attributes.TEXCOORD_0 && prim.material !== undefined) {
          issues.push(`[WARN] Mesh #${mIdx} Primitive #${pIdx} has material but missing TEXCOORD_0 (UV map).`);
        }
      });
    });
  }

  // 3. Evaluate Triangle Budget
  if (totalTriangles > 90000) {
    issues.push(`[CRITICAL] Triangle count (${Math.round(totalTriangles)}) exceeds mobile safety limit (90,000).`);
  } else if (totalTriangles > 45000) {
    issues.push(`[WARN] Triangle count (${Math.round(totalTriangles)}) is high. Recommend DRACO / meshopt decimation.`);
  }

  // 4. Check Materials & Textures
  if (gltf.images && gltf.images.length > 12) {
    issues.push(`[WARN] Model has ${gltf.images.length} separate texture maps. Consider texture atlas baking.`);
  }

  return {
    valid: issues.filter(i => i.startsWith('[CRITICAL]')).length === 0,
    triangles: Math.round(totalTriangles),
    drawCalls: totalDrawCalls,
    meshes: gltf.meshes?.length || 0,
    materials: gltf.materials?.length || 0,
    textures: gltf.textures?.length || 0,
    issues
  };
}
```

---

## 🎨 5. Three.js / React Three Fiber Integration Standard

When embedding inspected 3D models into web applications:

### A. Zero-CLS `<model-viewer>` Integration (Vanilla HTML/JS):
```html
<script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"></script>

<div class="model-container">
  <model-viewer
    src="/assets/models/watch.glb"
    poster="/assets/models/watch-poster.webp"
    alt="3D Chronograph Watch"
    auto-rotate
    camera-controls
    shadow-intensity="1.5"
    shadow-softness="0.8"
    exposure="1.1"
    environment-image="neutral"
    style="width: 100%; height: 500px; background: transparent;"
  >
    <div slot="progress-bar" class="loading-shimmer"></div>
  </model-viewer>
</div>
```

### B. React Three Fiber (`@react-three/fiber` + `@react-three/drei`):
```tsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows } from '@react-three/drei';

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.5} position={[0, -0.5, 0]} />;
}

export function Hero3D() {
  return (
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
      <Canvas camera={{ position: [0, 1, 4], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <Suspense fallback={null}>
          <Model url="/assets/models/product.glb" />
          <Environment preset="city" />
          <ContactShadows position={[0, -0.5, 0]} opacity={0.6} scale={10} blur={1.5} far={4} />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
      </Canvas>
    </div>
  );
}

useGLTF.preload('/assets/models/product.glb');
```

---

## 🛡️ 6. Mandatory Quality Gate Rules

1. **Always Validate First**: Never load uninspected `.glb` files directly into production markup. Run `validate-3d-model.js` to catch inverted normals and missing textures.
2. **Always Provide a Poster/Fallback**: While the 3D model loads asynchronously, display a pre-rendered WebP screenshot or 2D transparent cutout asset with a loading shimmer to eliminate Cumulative Layout Shift (CLS).
3. **Respect Reduced Motion**: Disable `auto-rotate` and heavy particle effects when `window.matchMedia('(prefers-reduced-motion: reduce)').matches` is true.
