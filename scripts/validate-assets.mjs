import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const assetsJsonPath = path.join(rootDir, 'src', 'data', 'assets.json');
const assetsData = JSON.parse(fs.readFileSync(assetsJsonPath, 'utf8'));

let errors = [];

console.log('--- AUREL Asset Register Validation ---');
console.log(`Selected Routes: Building=${assetsData.selectedRoutes.building}, Tour=${assetsData.selectedRoutes.tour}`);

const assetMap = new Map();
for (const asset of assetsData.assets) {
  assetMap.set(asset.id, asset);
}

for (const asset of assetsData.assets) {
  // Check fallback reference
  if (asset.fallbackId && !assetMap.has(asset.fallbackId)) {
    errors.push(`Asset ${asset.id} references nonexistent fallback ${asset.fallbackId}`);
  }

  // Check required assets
  const isRequired =
    asset.requiredFor === 'all' ||
    (asset.requiredFor === 'mesh' && assetsData.selectedRoutes.tour === 'mesh') ||
    (asset.requiredFor === 'glb' && assetsData.selectedRoutes.building === 'glb') ||
    (asset.requiredFor === 'panorama' && assetsData.selectedRoutes.tour === 'panorama');

  if (isRequired) {
    if (asset.status !== 'ready') {
      errors.push(`Required asset ${asset.id} has status '${asset.status}' instead of 'ready'`);
    }

    if (asset.localPath) {
      const fullPath = path.join(rootDir, 'public', asset.localPath);
      if (!fs.existsSync(fullPath)) {
        errors.push(`Asset ${asset.id} file missing on disk: ${fullPath}`);
      }
    } else if (asset.sourceCodePath) {
      const fullPath = path.join(rootDir, asset.sourceCodePath);
      if (!fs.existsSync(fullPath)) {
        errors.push(`Asset ${asset.id} code source missing on disk: ${fullPath}`);
      }
    } else {
      errors.push(`Asset ${asset.id} has neither localPath nor sourceCodePath`);
    }
  }
}

if (errors.length > 0) {
  console.error('\nValidation Failed:');
  for (const err of errors) {
    console.error(`- ${err}`);
  }
  process.exit(1);
} else {
  console.log(`\nAll ${assetsData.assets.length} registered assets validated successfully.`);
  process.exit(0);
}
