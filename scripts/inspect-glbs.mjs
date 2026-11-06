import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import draco3d from 'draco3dgltf';
import { MeshoptDecoder } from 'meshoptimizer';

async function main() {
  await MeshoptDecoder.ready;
  const io = new NodeIO()
    .registerExtensions(ALL_EXTENSIONS)
    .registerDependencies({
      'draco3d.decoder': await draco3d.createDecoderModule(),
      'meshopt.decoder': MeshoptDecoder
    });

  const files = process.argv.slice(2).length > 0 ? process.argv.slice(2) : [
    'public/assets/models/shrub_01.glb',
    'public/assets/models/tree_small_02.glb'
  ];

  for (const file of files) {
    try {
      const doc = await io.read(file);
      let totalTriangles = 0;
      let meshCount = 0;
      for (const mesh of doc.getRoot().listMeshes()) {
        meshCount++;
        for (const prim of mesh.listPrimitives()) {
          const indices = prim.getIndices();
          const count = indices ? indices.getCount() / 3 : prim.getAttribute('POSITION').getCount() / 3;
          totalTriangles += count;
          console.log(`  Mesh ${mesh.getName() || meshCount} Prim: ${count} tris, material: ${prim.getMaterial()?.getName()}`);
        }
      }
      console.log(`${file} => Total Meshes: ${meshCount}, Total Triangles: ${totalTriangles}\n`);
    } catch (e) {
      console.error(file, e);
    }
  }
}

main();
