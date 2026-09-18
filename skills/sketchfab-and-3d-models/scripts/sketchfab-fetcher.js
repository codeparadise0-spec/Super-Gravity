#!/usr/bin/env node

/**
 * 🗿 Super Gravity — Sketchfab & Free 3D Platform Fetcher
 * Searches and procures CC-licensed, web-ready 3D models.
 * 
 * Usage:
 *   node sketchfab-fetcher.js --query "watch" --polycount 50000 --out ./models
 */

import https from 'https';
import fs from 'fs';
import path from 'path';

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    query: 'chair',
    polycount: 50000,
    out: './assets/models',
    source: 'sketchfab'
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--query' && args[i + 1]) options.query = args[++i];
    if (args[i] === '--polycount' && args[i + 1]) options.polycount = parseInt(args[++i], 10);
    if (args[i] === '--out' && args[i + 1]) options.out = args[++i];
    if (args[i] === '--source' && args[i + 1]) options.source = args[++i];
  }
  return options;
}

/**
 * Searches Sketchfab API for downloadable CC-licensed models.
 */
export async function searchSketchfab(query, maxFaces = 50000, apiKey = process.env.SKETCHFAB_API_KEY) {
  const endpoint = `https://api.sketchfab.com/v3/models?type=models&q=${encodeURIComponent(query)}&downloadable=true&max_face_count=${maxFaces}&sort_by=-likeCount`;

  const headers = {
    'User-Agent': 'SuperGravity-3D-Model-Fetcher/2.6.0'
  };
  if (apiKey) {
    headers['Authorization'] = `Token ${apiKey}`;
  }

  return new Promise((resolve, reject) => {
    https.get(endpoint, { headers }, (res) => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try {
          const data = JSON.parse(raw);
          if (!data.results) {
            return resolve({
              success: false,
              message: data.detail || 'Sketchfab token missing or limit reached. Falling back to public repositories.',
              models: []
            });
          }
          const models = data.results.map(item => ({
            id: item.uid,
            title: item.name,
            faceCount: item.faceCount,
            vertexCount: item.vertexCount,
            animationCount: item.animationCount || 0,
            viewerUrl: item.viewerUrl,
            thumbnail: item.thumbnails?.images?.[0]?.url,
            license: item.license?.label || 'CC-BY'
          }));
          resolve({ success: true, count: models.length, models });
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

/**
 * Returns Khronos official 2.0 PBR certified sample GLB models.
 */
export function getKhronosSampleModels() {
  const baseUrl = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/';
  return [
    { title: 'Damaged Helmet (PBR)', url: `${baseUrl}DamagedHelmet/glTF-Binary/DamagedHelmet.glb`, tris: 14552 },
    { title: 'Flight Helmet', url: `${baseUrl}FlightHelmet/glTF/FlightHelmet.gltf`, tris: 48900 },
    { title: 'Antique Camera', url: `${baseUrl}AntiqueCamera/glTF-Binary/AntiqueCamera.glb`, tris: 32410 },
    { title: 'Sci-Fi Helmet', url: `${baseUrl}SciFiHelmet/glTF-Binary/SciFiHelmet.glb`, tris: 42100 },
    { title: 'Avocado (Organic)', url: `${baseUrl}Avocado/glTF-Binary/Avocado.glb`, tris: 4096 },
    { title: 'Water Bottle', url: `${baseUrl}WaterBottle/glTF-Binary/WaterBottle.glb`, tris: 2240 }
  ];
}

async function main() {
  const options = parseArgs();
  console.log(`\n🔍 Searching 3D Models: "${options.query}" (Max Triangles: ${options.polycount})...`);

  try {
    const results = await searchSketchfab(options.query, options.polycount);
    if (results.success && results.models.length > 0) {
      console.log(`\n✅ Found ${results.models.length} downloadable models on Sketchfab:\n`);
      results.models.slice(0, 5).forEach((m, idx) => {
        console.log(`  [${idx + 1}] ${m.title}`);
        console.log(`      ID: ${m.id} | Faces: ${m.faceCount.toLocaleString()} | License: ${m.license}`);
        console.log(`      Viewer: ${m.viewerUrl}\n`);
      });
    } else {
      console.log(`\nℹ️ Sketchfab API notice: ${results.message}`);
      console.log(`\n📦 Serving Certified Khronos PBR Reference Models instead:`);
      const samples = getKhronosSampleModels();
      samples.forEach((s, idx) => {
        console.log(`  [${idx + 1}] ${s.title} (~${s.tris.toLocaleString()} tris) -> ${s.url}`);
      });
    }
  } catch (err) {
    console.error('❌ Error during 3D search:', err.message);
  }
}

if (process.argv[1] && process.argv[1].endsWith('sketchfab-fetcher.js')) {
  main();
}
