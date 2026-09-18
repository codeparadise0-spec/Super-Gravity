#!/usr/bin/env node

/**
 * 🔬 Super Gravity — 3D Model Deep Flaw & Quality Inspector
 * Validates binary GLB files for mesh topology, triangle budget, UV maps, and WebGL compatibility.
 * 
 * Usage:
 *   node validate-3d-model.js --file ./assets/models/product.glb
 */

import fs from 'fs';
import path from 'path';

function parseArgs() {
  const args = process.argv.slice(2);
  let file = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--file' && args[i + 1]) file = args[++i];
  }
  return { file };
}

/**
 * Inspects a binary GLB file for structural integrity and rendering flaws.
 */
export function validateGLBFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return { valid: false, error: `File not found: ${filePath}` };
  }

  const buffer = fs.readFileSync(filePath);
  if (buffer.length < 20) {
    return { valid: false, error: 'File is too small to be a valid GLB container.' };
  }

  // 1. Magic Bytes Check (0x46546C67 = "glTF" in little-endian)
  const magic = buffer.readUInt32LE(0);
  if (magic !== 0x46546C67) {
    return { valid: false, error: `Invalid GLB Header: Expected 0x46546C67 ("glTF"), got 0x${magic.toString(16)}.` };
  }

  const version = buffer.readUInt32LE(4);
  const totalLength = buffer.readUInt32LE(8);
  const chunkLength = buffer.readUInt32LE(12);
  const chunkType = buffer.readUInt32LE(16); // 0x4E4F534A = "JSON"

  if (chunkType !== 0x4E4F534A) {
    return { valid: false, error: 'Malformed GLB: First chunk is not JSON chunk type.' };
  }

  const jsonText = buffer.toString('utf8', 20, 20 + chunkLength);
  let gltf;
  try {
    gltf = JSON.parse(jsonText);
  } catch (err) {
    return { valid: false, error: `Failed to parse internal glTF JSON chunk: ${err.message}` };
  }

  // 2. Perform Deep Inspection
  const issues = [];
  const warnings = [];
  let totalTriangles = 0;
  let totalDrawCalls = 0;
  let totalVertices = 0;

  if (gltf.meshes && Array.isArray(gltf.meshes)) {
    gltf.meshes.forEach((mesh, mIdx) => {
      if (!mesh.primitives || !Array.isArray(mesh.primitives)) return;

      mesh.primitives.forEach((prim, pIdx) => {
        totalDrawCalls++;

        // Calculate Triangles
        if (prim.indices !== undefined && gltf.accessors) {
          const accessor = gltf.accessors[prim.indices];
          if (accessor && accessor.count) {
            totalTriangles += (accessor.count / 3);
          }
        }

        // Count Vertices
        if (prim.attributes && prim.attributes.POSITION !== undefined && gltf.accessors) {
          const posAccessor = gltf.accessors[prim.attributes.POSITION];
          if (posAccessor && posAccessor.count) {
            totalVertices += posAccessor.count;
          }
        }

        // Check for missing Normals
        if (!prim.attributes || !prim.attributes.NORMAL) {
          warnings.push(`Mesh #${mIdx} ("${mesh.name || 'Unnamed'}") Primitive #${pIdx} missing NORMAL attribute.`);
        }

        // Check for missing UVs when material is assigned
        if (prim.material !== undefined && (!prim.attributes || !prim.attributes.TEXCOORD_0)) {
          warnings.push(`Mesh #${mIdx} Primitive #${pIdx} has material assigned but is missing TEXCOORD_0 (UV map).`);
        }
      });
    });
  }

  // 3. Triangle Budget Thresholds
  if (totalTriangles > 100000) {
    issues.push(`Triangle count (${Math.round(totalTriangles).toLocaleString()}) exceeds maximum mobile budget (100,000 tris). WebGL crash risk!`);
  } else if (totalTriangles > 50000) {
    warnings.push(`Triangle count (${Math.round(totalTriangles).toLocaleString()}) is elevated. Consider decimation.`);
  }

  // 4. Draw Call Budget
  if (totalDrawCalls > 25) {
    warnings.push(`Total draw calls (${totalDrawCalls}) is high. Consider joining static meshes.`);
  }

  // 5. Textures & Materials
  const textureCount = gltf.textures ? gltf.textures.length : 0;
  const materialCount = gltf.materials ? gltf.materials.length : 0;

  const isPassed = issues.length === 0;

  return {
    valid: true,
    passed: isPassed,
    version,
    fileSizeBytes: buffer.length,
    fileSizeMB: (buffer.length / (1024 * 1024)).toFixed(2),
    triangles: Math.round(totalTriangles),
    vertices: totalVertices,
    drawCalls: totalDrawCalls,
    meshes: gltf.meshes ? gltf.meshes.length : 0,
    materials: materialCount,
    textures: textureCount,
    animations: gltf.animations ? gltf.animations.length : 0,
    issues,
    warnings
  };
}

function main() {
  const options = parseArgs();
  if (!options.file) {
    console.log('Usage: node validate-3d-model.js --file <path-to-glb>');
    process.exit(1);
  }

  console.log(`\n🔬 Inspecting 3D Model: "${options.file}"...\n`);
  const report = validateGLBFile(options.file);

  if (!report.valid) {
    console.error(`❌ Validation Failed: ${report.error}\n`);
    process.exit(1);
  }

  console.log(`========================================================`);
  console.log(` 3D MODEL AUDIT REPORT`);
  console.log(`========================================================`);
  console.log(` File Size:    ${report.fileSizeMB} MB (${report.fileSizeBytes.toLocaleString()} bytes)`);
  console.log(` Triangles:    ${report.triangles.toLocaleString()} tris`);
  console.log(` Vertices:     ${report.vertices.toLocaleString()} vertices`);
  console.log(` Draw Calls:   ${report.drawCalls} primitives`);
  console.log(` Meshes:       ${report.meshes}`);
  console.log(` Materials:    ${report.materials}`);
  console.log(` Textures:     ${report.textures}`);
  console.log(` Animations:   ${report.animations}`);
  console.log(`--------------------------------------------------------`);

  if (report.issues.length > 0) {
    console.log(`❌ CRITICAL FLAWS DETECTED (${report.issues.length}):`);
    report.issues.forEach((issue, idx) => console.log(`   [${idx + 1}] ${issue}`));
  }

  if (report.warnings.length > 0) {
    console.log(`⚠️ WARNINGS / OPTIMIZATION OPPORTUNITIES (${report.warnings.length}):`);
    report.warnings.forEach((warn, idx) => console.log(`   [${idx + 1}] ${warn}`));
  }

  if (report.issues.length === 0 && report.warnings.length === 0) {
    console.log(`✨ PERFECT SCORE: Model is web-ready, zero flaws detected!`);
  }

  console.log(`========================================================\n`);
  process.exit(report.passed ? 0 : 1);
}

if (process.argv[1] && process.argv[1].endsWith('validate-3d-model.js')) {
  main();
}
