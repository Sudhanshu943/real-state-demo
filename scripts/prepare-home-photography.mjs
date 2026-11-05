import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// Selected photographic references, verified on their original free-photo pages.
// This is a build-time acquisition tool, not a runtime Unsplash API integration.
const selections = [
  ['facade','0FR6Ky5VpYI','Garvit Nama','Apartment balconies and glazed facades','Modern apartment buildings photographed from below','50% 45%'],
  ['living','yQvGZRrnk30','GoodLifeConstruction','Light-filled residential living room','A photographed living room with pale seating, wood floors and large windows','50% 58%'],
  ['garden','KJ3BwWPA3mI','Georgi Kalaydzhiev','Planted courtyard and outdoor seating','A real planted garden patio with outdoor seating','50% 55%'],
  ['penthouse','pIwKVAFT0sI','Franco Debartolo','Contemporary residential interior','A photographed contemporary living room with a large sectional sofa and generous windows','50% 55%'],
  ['roof','IFKgs02kdQ0','HANS-Y','Rooftop garden and pergola','A photographed roof garden with planting beds, a path and a timber pergola','50% 55%'],
  ['lounge','zSG-kd-L6vw','Frames For Your Heart','Contemporary communal lounge','A real hotel lounge with designer seating and warm wood finishes','50% 55%'],
  ['wellness','EC4mdytpvmk','Palak Pitroda','Contemporary fitness studio','A photographed fitness studio with exercise equipment and large windows','50% 52%'],
  ['arrival','E1s8dCPmMI8','Vladimir Ivanenko','Sunlit arrival and reception','A photographed sunlit hotel lobby and reception space','50% 55%'],
  ['district','TH0QnwA_Tl8','Fons Heijnsbroek','Canalside urban green space','A photographed Amsterdam canalside park with mature trees and people relaxing','50% 50%'],
];

await mkdir(path.join(root,'assets-source/home-photography'),{recursive:true});
await mkdir(path.join(root,'public/assets/photography'),{recursive:true});
const records = {};
let previous = {};
try { previous=JSON.parse(await readFile(path.join(root,'src/data/homePhotography.json'),'utf8')); } catch { /* First acquisition. */ }
for (const [id, photoId, photographer, title, alt, position] of selections) {
  const sourceUrl = `https://unsplash.com/photos/${photoId}`;
  let downloadUrl = previous[id]?.photoId===photoId ? previous[id].downloadUrl : undefined;
  if (!downloadUrl) {
    const response = await fetch(sourceUrl, {signal:AbortSignal.timeout(30000)});
    if (!response.ok) throw new Error(`${id}: source returned ${response.status}`);
    const html = await response.text();
    if (!html.includes('Unsplash License')) throw new Error(`${id}: expected free-photo license not found`);
    const og = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i)?.[1];
    if (!og) throw new Error(`${id}: image source unavailable`);
    const original = new URL(og.replaceAll('&amp;','&'));
    if (original.hostname !== 'images.unsplash.com' || !original.pathname.startsWith('/photo-')) throw new Error(`${id}: unexpected image source`);
    // Fetch the actual photograph, not the branded OpenGraph social-preview image.
    downloadUrl = `${original.origin}${original.pathname}?fm=jpg&fit=max&w=1800&q=88`;
  }
  const sourcePath = path.join(root,`assets-source/home-photography/${id}-${photoId}.jpg`);
  let bytes;
  try { bytes = await readFile(sourcePath); }
  catch {
    const download = await fetch(downloadUrl,{signal:AbortSignal.timeout(45000)});
    if(!download.ok)throw new Error(`${id}: download returned ${download.status}`);
    bytes = Buffer.from(await download.arrayBuffer());
    await sharp(bytes).metadata();
    await writeFile(sourcePath,bytes);
  }
  const variants = {};
  for(const width of [640,1280]) {
    const localPath = `/assets/photography/${id}-${width}.webp`;
    const output = await sharp(bytes).rotate().resize({width,withoutEnlargement:true}).webp({quality:83}).toBuffer();
    await writeFile(path.join(root,'public',localPath),output);
    variants[width] = localPath;
  }
  const {width,height} = await sharp(bytes).rotate().metadata();
  records[id] = {id,photoId,photographer,title,alt,position,width,height,sourceUrl,downloadUrl,license:'Unsplash License',licenseUrl:'https://unsplash.com/license',role:'Reference photography; not the AUREL property',variants};
  console.log(`Prepared ${id}: ${photographer}`);
}
await writeFile(path.join(root,'src/data/homePhotography.json'),JSON.stringify(records,null,2)+'\n');
const registerPath = path.join(root,'src/data/assets.json');
const register = JSON.parse(await readFile(registerPath,'utf8'));
for(const photo of Object.values(records)) for(const size of [640,1280]) {
  const entry = {
    id:`home-photo-${photo.id}-${size}`,kind:'image',requiredFor:'all',status:'ready',
    localPath:photo.variants[size].replace(/^\//,''),sourceCodePath:null,
    creator:photo.photographer,sourceUrl:photo.sourceUrl,license:photo.license,
    provenanceEvidence:'assets-source/home-photography/README.md',fallbackId:null,
    usage:photo.role,
  };
  const index=register.assets.findIndex(asset=>asset.id===entry.id);
  if(index===-1)register.assets.push(entry);else register.assets[index]=entry;
}
await writeFile(registerPath,JSON.stringify(register,null,2)+'\n');
await writeFile(path.join(root,'assets-source/home-photography/README.md'),
  '# Homepage photographic references\n\nSelected real-space photographs, not generated images or AUREL property documentation. Verified source pages on 2026-11-05. Images are used under the Unsplash License: https://unsplash.com/license.\n\n'+
  Object.values(records).map(p=>`- **${p.id}** — ${p.photographer}: ${p.sourceUrl}`).join('\n')+
  '\n\nRebuild optimized local delivery files with `node scripts/prepare-home-photography.mjs`. This command downloads source photographs only if missing. Runtime visitors do not contact Unsplash. Source JPGs are kept outside public/.\n');
