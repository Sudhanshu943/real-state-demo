import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function processTextures() {
  const publicDir = path.join(rootDir, 'public', 'assets');
  const stoneOutDir = path.join(publicDir, 'textures', 'stone');
  const metalOutDir = path.join(publicDir, 'textures', 'metal');
  const hdriOutDir = path.join(publicDir, 'hdri');

  fs.mkdirSync(stoneOutDir, { recursive: true });
  fs.mkdirSync(metalOutDir, { recursive: true });
  fs.mkdirSync(hdriOutDir, { recursive: true });

  const tasks = [
    // Travertine 001
    {
      in: path.join(rootDir, 'assets-source', 'textures', 'stone', 'unpacked', 'Travertine001_1K-JPG_Color.jpg'),
      out: path.join(stoneOutDir, 'travertine001_1k_color.webp'),
      options: { quality: 85 }
    },
    {
      in: path.join(rootDir, 'assets-source', 'textures', 'stone', 'unpacked', 'Travertine001_1K-JPG_NormalGL.jpg'),
      out: path.join(stoneOutDir, 'travertine001_1k_normal.webp'),
      options: { quality: 95 } // high fidelity for normal vector vectors
    },
    {
      in: path.join(rootDir, 'assets-source', 'textures', 'stone', 'unpacked', 'Travertine001_1K-JPG_Roughness.jpg'),
      out: path.join(stoneOutDir, 'travertine001_1k_roughness.webp'),
      options: { quality: 85 }
    },
    // Metal 030
    {
      in: path.join(rootDir, 'assets-source', 'textures', 'metal', 'unpacked', 'Metal030_1K-JPG_Color.jpg'),
      out: path.join(metalOutDir, 'metal030_1k_color.webp'),
      options: { quality: 85 }
    },
    {
      in: path.join(rootDir, 'assets-source', 'textures', 'metal', 'unpacked', 'Metal030_1K-JPG_NormalGL.jpg'),
      out: path.join(metalOutDir, 'metal030_1k_normal.webp'),
      options: { quality: 95 }
    },
    {
      in: path.join(rootDir, 'assets-source', 'textures', 'metal', 'unpacked', 'Metal030_1K-JPG_Roughness.jpg'),
      out: path.join(metalOutDir, 'metal030_1k_roughness.webp'),
      options: { quality: 85 }
    }
  ];

  console.log('[Assets] Converting PBR textures to WebP...');
  for (const t of tasks) {
    await sharp(t.in).webp(t.options).toFile(t.out);
    const stat = fs.statSync(t.out);
    console.log(`- Created ${path.relative(rootDir, t.out)}: ${stat.size.toLocaleString()} bytes`);
  }

  // Copy HDRI
  const hdriSrc = path.join(rootDir, 'assets-source', 'hdri', 'kloofendal_48d_partly_cloudy_puresky_1k.hdr');
  const hdriDest = path.join(hdriOutDir, 'kloofendal_48d_1k.hdr');
  fs.copyFileSync(hdriSrc, hdriDest);
  const hdriStat = fs.statSync(hdriDest);
  console.log(`- Copied ${path.relative(rootDir, hdriDest)}: ${hdriStat.size.toLocaleString()} bytes`);

  console.log('[Assets] Finished preparing exterior assets.');
}

processTextures().catch((err) => {
  console.error('[Assets] Error:', err);
  process.exit(1);
});
