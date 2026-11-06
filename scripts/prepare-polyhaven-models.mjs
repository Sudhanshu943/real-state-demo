import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function downloadFile(url, dest) {
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
    console.log(`[Cache] Already have ${path.basename(dest)}`);
    return;
  }
  console.log(`[Download] Fetching ${url} -> ${path.basename(dest)}...`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, buf);
  console.log(`[Download] Saved ${path.basename(dest)} (${(buf.length / 1024 / 1024).toFixed(2)} MB)`);
}

async function prepareTree() {
  const treeDir = path.join(rootDir, 'assets-source', 'models', 'tree_small_02');
  const texDir = path.join(treeDir, 'textures');
  fs.mkdirSync(texDir, { recursive: true });

  const files = [
    { name: 'tree_small_02_1k.gltf', url: 'https://dl.polyhaven.org/file/ph-assets/Models/gltf/1k/tree_small_02/tree_small_02_1k.gltf' },
    { name: 'tree_small_02.bin', url: 'https://dl.polyhaven.org/file/ph-assets/Models/gltf/8k/tree_small_02/tree_small_02.bin' },
    { name: 'textures/tree_small_02_branch_nor_gl_1k.jpg', url: 'https://dl.polyhaven.org/file/ph-assets/Models/jpg/1k/tree_small_02/tree_small_02_branch_nor_gl_1k.jpg' },
    { name: 'textures/tree_small_02_branch_diff_1k.jpg', url: 'https://dl.polyhaven.org/file/ph-assets/Models/jpg/1k/tree_small_02/tree_small_02_branch_diff_1k.jpg' },
    { name: 'textures/tree_small_02_branch_arm_1k.jpg', url: 'https://dl.polyhaven.org/file/ph-assets/Models/jpg/1k/tree_small_02/tree_small_02_branch_arm_1k.jpg' },
    { name: 'textures/tree_small_02_leaves_nor_gl_1k.jpg', url: 'https://dl.polyhaven.org/file/ph-assets/Models/jpg/1k/tree_small_02/tree_small_02_leaves_nor_gl_1k.jpg' },
    { name: 'textures/tree_small_02_leaves_diff_1k.jpg', url: 'https://dl.polyhaven.org/file/ph-assets/Models/jpg/1k/tree_small_02/tree_small_02_leaves_diff_1k.jpg' },
    { name: 'textures/tree_small_02_leaves_arm_1k.jpg', url: 'https://dl.polyhaven.org/file/ph-assets/Models/jpg/1k/tree_small_02/tree_small_02_leaves_arm_1k.jpg' },
    { name: 'textures/tree_small_02_nor_gl_1k.jpg', url: 'https://dl.polyhaven.org/file/ph-assets/Models/jpg/1k/tree_small_02/tree_small_02_nor_gl_1k.jpg' },
    { name: 'textures/tree_small_02_diff_1k.jpg', url: 'https://dl.polyhaven.org/file/ph-assets/Models/jpg/1k/tree_small_02/tree_small_02_diff_1k.jpg' },
    { name: 'textures/tree_small_02_arm_1k.jpg', url: 'https://dl.polyhaven.org/file/ph-assets/Models/jpg/1k/tree_small_02/tree_small_02_arm_1k.jpg' }
  ];

  for (const f of files) {
    await downloadFile(f.url, path.join(treeDir, f.name));
  }

  const gltfInput = path.join(treeDir, 'tree_small_02_1k.gltf');
  const simplifiedGlb = path.join(treeDir, 'tree_small_02_simplified.glb');
  const webpGlb = path.join(treeDir, 'tree_small_02_webp.glb');
  const finalGlb = path.join(rootDir, 'public', 'assets', 'models', 'tree_small_02.glb');

  console.log('[Optimize] Simplifying tree geometry with gltf-transform...');
  // Ratio 0.05 targets ~30,000 vertices from 500,000+, keeping overall shape while meeting triangle budget
  execSync(`npx gltf-transform simplify "${gltfInput}" "${simplifiedGlb}" --ratio 0.05 --error 0.01`, { stdio: 'inherit' });

  console.log('[Optimize] Compressing textures to WebP...');
  execSync(`npx gltf-transform webp "${simplifiedGlb}" "${webpGlb}"`, { stdio: 'inherit' });

  console.log('[Optimize] Compressing geometry with Meshopt...');
  execSync(`npx gltf-transform meshopt "${webpGlb}" "${finalGlb}"`, { stdio: 'inherit' });

  const finalStat = fs.statSync(finalGlb);
  console.log(`[Success] Final optimized tree model: ${finalGlb} (${(finalStat.size / 1024 / 1024).toFixed(2)} MB)`);
}

prepareTree().catch((err) => {
  console.error('[Error]:', err);
  process.exit(1);
});
