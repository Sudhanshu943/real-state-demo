import { execSync } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import draco3d from 'draco3dgltf';
import { MeshoptDecoder } from 'meshoptimizer';

const root = path.resolve(import.meta.dirname, '..');
const publicModels = path.join(root, 'public', 'assets', 'models');
const tempDir = path.join(root, 'assets-source', 'temp');

async function getTriangleCount(filePath) {
  await MeshoptDecoder.ready;
  const io = new NodeIO()
    .registerExtensions(ALL_EXTENSIONS)
    .registerDependencies({
      'draco3d.decoder': await draco3d.createDecoderModule(),
      'meshopt.decoder': MeshoptDecoder
    });

  const doc = await io.read(filePath);
  let totalTriangles = 0;
  for (const mesh of doc.getRoot().listMeshes()) {
    for (const prim of mesh.listPrimitives()) {
      const indices = prim.getIndices();
      const count = indices ? indices.getCount() / 3 : prim.getAttribute('POSITION').getCount() / 3;
      totalTriangles += count;
    }
  }
  return totalTriangles;
}

async function main() {
  fs.mkdirSync(tempDir, { recursive: true });
  console.log('[Vegetation Pipeline] 1. Preparing shrub_01 (target: ~1,000 tris)...');
  const shrubSrc = path.join(root, 'assets-source', 'models', 'shrub_01', 'shrub_01_simplified.glb');
  const shrubTemp = path.join(tempDir, 'shrub_temp.glb');
  const shrubFinal = path.join(publicModels, 'shrub_01.glb');

  // Simplify shrub to ~990 triangles
  execSync(`npx gltf-transform simplify "${shrubSrc}" "${shrubTemp}" --ratio 0.08 --error 0.05`, { stdio: 'inherit' });
  execSync(`npx gltf-transform meshopt "${shrubTemp}" "${shrubFinal}"`, { stdio: 'inherit' });

  const shrubTris = await getTriangleCount(shrubFinal);
  console.log(`[Vegetation Pipeline] shrub_01 final triangles: ${shrubTris}`);

  console.log('\n[Vegetation Pipeline] 2. Preparing tree_small_02 (target: ~5,000 tris)...');
  const treeSrc = path.join(root, 'assets-source', 'models', 'tree_small_02', 'tree_small_02_webp.glb');
  const treeTemp = path.join(tempDir, 'tree_temp.glb');
  const treeFinal = path.join(publicModels, 'tree_small_02.glb');

  // Simplify tree to ~5,295 triangles
  execSync(`npx gltf-transform simplify "${treeSrc}" "${treeTemp}" --ratio 0.05 --error 0.05`, { stdio: 'inherit' });
  execSync(`npx gltf-transform meshopt "${treeTemp}" "${treeFinal}"`, { stdio: 'inherit' });

  const treeTris = await getTriangleCount(treeFinal);
  console.log(`[Vegetation Pipeline] tree_small_02 final triangles: ${treeTris}`);

  // Clean up temp
  fs.rmSync(tempDir, { recursive: true, force: true });

  const treePlacements = 6;
  const shrubPlacements = 28; // 24 plaza + 4 roof
  const totalVegetationTris = treePlacements * treeTris + shrubPlacements * shrubTris;

  console.log('\n================ VEGETATION GEOMETRY BUDGET AUDIT ================');
  console.log(`Tree Instances: ${treePlacements} x ${treeTris} = ${treePlacements * treeTris} triangles`);
  console.log(`Shrub Instances: ${shrubPlacements} x ${shrubTris} = ${shrubPlacements * shrubTris} triangles`);
  console.log(`Total Rendered Vegetation Triangles: ${totalVegetationTris}`);
  console.log(`Budget Limit: 60,000 triangles`);
  console.log(`Budget Status: ${totalVegetationTris <= 60000 ? 'PASSED (UNDER BUDGET)' : 'EXCEEDED'}`);
  console.log('==================================================================\n');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
