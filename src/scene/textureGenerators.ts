import * as THREE from 'three';

// Cache generated textures in memory to avoid redundant canvas rendering
const textureCache = new Map<string, THREE.CanvasTexture>();

/**
 * Creates a procedural travertine stone texture with subtle sedimentary striations and pores
 */
export function getTravertineTexture(): THREE.CanvasTexture {
  if (textureCache.has('travertine')) {
    return textureCache.get('travertine')!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Base pale ivory/sand stone
    ctx.fillStyle = '#C8BEAE';
    ctx.fillRect(0, 0, 512, 512);

    // Subtle horizontal sedimentary layers
    for (let y = 0; y < 512; y += 4) {
      const alpha = 0.03 + Math.sin(y * 0.05) * 0.02 + Math.random() * 0.02;
      ctx.fillStyle = Math.random() > 0.5 ? `rgba(160, 148, 132, ${alpha})` : `rgba(220, 212, 200, ${alpha})`;
      ctx.fillRect(0, y, 512, 2 + Math.random() * 3);
    }

    // Organic porous travertine pits
    ctx.fillStyle = 'rgba(130, 118, 102, 0.12)';
    for (let i = 0; i < 180; i++) {
      const px = Math.random() * 512;
      const py = Math.random() * 512;
      const pw = 4 + Math.random() * 12;
      const ph = 1.5 + Math.random() * 3;
      ctx.beginPath();
      ctx.ellipse(px, py, pw, ph, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  textureCache.set('travertine', texture);
  return texture;
}

/**
 * Creates a procedural brushed satin bronze texture with fine anisotropic grain
 */
export function getBronzeTexture(): THREE.CanvasTexture {
  if (textureCache.has('bronze')) {
    return textureCache.get('bronze')!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#5A432F';
    ctx.fillRect(0, 0, 256, 256);

    // Brushed metal grain lines
    for (let y = 0; y < 256; y++) {
      const alpha = 0.04 + Math.random() * 0.06;
      ctx.fillStyle = Math.random() > 0.4 ? `rgba(140, 110, 80, ${alpha})` : `rgba(60, 42, 28, ${alpha})`;
      ctx.fillRect(0, y, 256, 1);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 6);
  textureCache.set('bronze', texture);
  return texture;
}

/**
 * Creates a procedural oak woodgrain parquetry texture
 */
export function getOakTexture(): THREE.CanvasTexture {
  if (textureCache.has('oak')) {
    return textureCache.get('oak')!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#826242';
    ctx.fillRect(0, 0, 512, 512);

    // Parquet board lines
    const boardWidth = 64;
    for (let x = 0; x < 512; x += boardWidth) {
      // Wood grain inside plank
      for (let y = 0; y < 512; y++) {
        const grain = 0.03 + Math.sin(y * 0.08 + x * 0.02) * 0.02 + Math.random() * 0.03;
        ctx.fillStyle = `rgba(62, 42, 24, ${grain})`;
        ctx.fillRect(x, y, boardWidth, 1);
      }
      // Seam between boards
      ctx.fillStyle = 'rgba(40, 26, 14, 0.35)';
      ctx.fillRect(x, 0, 2, 512);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  textureCache.set('oak', texture);
  return texture;
}
