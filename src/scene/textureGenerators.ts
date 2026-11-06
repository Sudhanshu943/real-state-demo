import * as THREE from 'three';

// Cache generated textures in memory to avoid redundant canvas rendering
const textureCache = new Map<string, THREE.CanvasTexture>();

/**
 * Procedural Travertine Stone Base Color Texture (sRGB Color Space).
 * Provenance: Project Original procedural code for AUREL, inspired by travertine reference photography from ambientCG (Travertine001).
 */
export function getTravertineTexture(): THREE.CanvasTexture {
  if (textureCache.has('travertine_diff')) {
    return textureCache.get('travertine_diff')!;
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
    ctx.fillStyle = 'rgba(125, 112, 96, 0.14)';
    for (let i = 0; i < 220; i++) {
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
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  textureCache.set('travertine_diff', texture);
  return texture;
}

/**
 * Procedural Travertine Normal Map (Linear NoColorSpace, OpenGL +Y Green Convention).
 */
export function getTravertineNormalTexture(): THREE.CanvasTexture {
  if (textureCache.has('travertine_nor')) {
    return textureCache.get('travertine_nor')!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Neutral tangent normal: RGB(128, 128, 255) -> Vector (0, 0, 1)
    ctx.fillStyle = 'rgb(128, 128, 255)';
    ctx.fillRect(0, 0, 512, 512);

    // Depressed horizontal sediment pores (OpenGL format: top edge -Y, bottom edge +Y)
    for (let y = 0; y < 512; y += 6) {
      if (Math.random() > 0.4) {
        ctx.fillStyle = 'rgb(128, 140, 248)';
        ctx.fillRect(0, y, 512, 2);
        ctx.fillStyle = 'rgb(128, 116, 248)';
        ctx.fillRect(0, y + 2, 512, 2);
      }
    }

    // Porous pit indents with spherical tangent normal perturbation
    for (let i = 0; i < 220; i++) {
      const px = Math.random() * 512;
      const py = Math.random() * 512;
      const pw = 3 + Math.random() * 8;
      const ph = 1.5 + Math.random() * 3;

      // Inner bevel: left/top indented, right/bottom highlighted
      ctx.fillStyle = 'rgb(110, 145, 230)';
      ctx.beginPath();
      ctx.ellipse(px, py, pw, ph, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgb(145, 112, 230)';
      ctx.beginPath();
      ctx.ellipse(px + 1, py + 1, pw * 0.8, ph * 0.8, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.NoColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  textureCache.set('travertine_nor', texture);
  return texture;
}

/**
 * Procedural Travertine Roughness Map (Linear NoColorSpace).
 */
export function getTravertineRoughnessTexture(): THREE.CanvasTexture {
  if (textureCache.has('travertine_rough')) {
    return textureCache.get('travertine_rough')!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Base honed stone roughness (~0.62)
    ctx.fillStyle = 'rgb(158, 158, 158)';
    ctx.fillRect(0, 0, 512, 512);

    // Subtle grain variation
    for (let y = 0; y < 512; y += 4) {
      const v = Math.floor(150 + Math.random() * 20);
      ctx.fillStyle = `rgb(${v}, ${v}, ${v})`;
      ctx.fillRect(0, y, 512, 2);
    }

    // Pores have higher roughness (diffuse light scattering)
    ctx.fillStyle = 'rgb(215, 215, 215)';
    for (let i = 0; i < 220; i++) {
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
  texture.colorSpace = THREE.NoColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  textureCache.set('travertine_rough', texture);
  return texture;
}

/**
 * Procedural Brushed Satin Bronze Color Texture (sRGB Color Space).
 * Provenance: Project Original procedural code for AUREL.
 */
export function getBronzeTexture(): THREE.CanvasTexture {
  if (textureCache.has('bronze_diff')) {
    return textureCache.get('bronze_diff')!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#654B33';
    ctx.fillRect(0, 0, 256, 256);

    // Fine brushed anisotropic streaks
    for (let y = 0; y < 256; y++) {
      const alpha = 0.04 + Math.random() * 0.07;
      ctx.fillStyle = Math.random() > 0.4 ? `rgba(165, 125, 90, ${alpha})` : `rgba(65, 45, 28, ${alpha})`;
      ctx.fillRect(0, y, 256, 1);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 4);
  textureCache.set('bronze_diff', texture);
  return texture;
}

/**
 * Procedural Brushed Bronze Roughness Map (Linear NoColorSpace).
 */
export function getBronzeRoughnessTexture(): THREE.CanvasTexture {
  if (textureCache.has('bronze_rough')) {
    return textureCache.get('bronze_rough')!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Satin metallic roughness (~0.32)
    ctx.fillStyle = 'rgb(82, 82, 82)';
    ctx.fillRect(0, 0, 256, 256);

    for (let y = 0; y < 256; y++) {
      const v = Math.floor(75 + Math.random() * 20);
      ctx.fillStyle = `rgb(${v}, ${v}, ${v})`;
      ctx.fillRect(0, y, 256, 1);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.NoColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 4);
  textureCache.set('bronze_rough', texture);
  return texture;
}

/**
 * Procedural Oak Parquetry Color Texture (sRGB Color Space).
 * Provenance: Project Original procedural code for AUREL, inspired by oak veneer photography.
 */
export function getOakTexture(): THREE.CanvasTexture {
  if (textureCache.has('oak_diff')) {
    return textureCache.get('oak_diff')!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#856645';
    ctx.fillRect(0, 0, 512, 512);

    const boardWidth = 64;
    for (let x = 0; x < 512; x += boardWidth) {
      for (let y = 0; y < 512; y++) {
        const grain = 0.03 + Math.sin(y * 0.08 + x * 0.02) * 0.02 + Math.random() * 0.03;
        ctx.fillStyle = `rgba(62, 42, 24, ${grain})`;
        ctx.fillRect(x, y, boardWidth, 1);
      }
      // Micro seam between boards
      ctx.fillStyle = 'rgba(38, 25, 14, 0.40)';
      ctx.fillRect(x, 0, 2, 512);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  textureCache.set('oak_diff', texture);
  return texture;
}

/**
 * Procedural Oak Normal Map (Linear NoColorSpace, OpenGL +Y convention).
 */
export function getOakNormalTexture(): THREE.CanvasTexture {
  if (textureCache.has('oak_nor')) {
    return textureCache.get('oak_nor')!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = 'rgb(128, 128, 255)';
    ctx.fillRect(0, 0, 512, 512);

    const boardWidth = 64;
    for (let x = 0; x < 512; x += boardWidth) {
      // Recessed groove: left side +X (red 150), right side -X (red 106)
      ctx.fillStyle = 'rgb(150, 128, 235)';
      ctx.fillRect(x, 0, 1, 512);
      ctx.fillStyle = 'rgb(106, 128, 235)';
      ctx.fillRect(x + 1, 0, 1, 512);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.NoColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  textureCache.set('oak_nor', texture);
  return texture;
}

// ---------------------------------------------------------------------------
// Real PBR Textures (ambientCG & Poly Haven CC0) with strict Color Spaces
// ---------------------------------------------------------------------------
const pbrTextureCache = new Map<string, THREE.Texture>();

/**
 * Real PBR Travertine Stone Textures (ambientCG Travertine001, CC0).
 * Color: sRGBColorSpace
 * Normal: NoColorSpace (OpenGL +Y)
 * Roughness: NoColorSpace
 */
export function getPBRTravertineTextures() {
  const loader = new THREE.TextureLoader();

  if (!pbrTextureCache.has('pbr_trav_diff')) {
    const colorTex = loader.load(
      '/assets/textures/stone/travertine001_1k_color.webp',
      undefined,
      undefined,
      (err) => console.warn('[PBR] Failed loading travertine color', err)
    );
    colorTex.colorSpace = THREE.SRGBColorSpace;
    colorTex.wrapS = THREE.RepeatWrapping;
    colorTex.wrapT = THREE.RepeatWrapping;
    colorTex.repeat.set(1, 1);
    colorTex.anisotropy = 4;
    pbrTextureCache.set('pbr_trav_diff', colorTex);
  }

  if (!pbrTextureCache.has('pbr_trav_nor')) {
    const norTex = loader.load(
      '/assets/textures/stone/travertine001_1k_normal.webp',
      undefined,
      undefined,
      (err) => console.warn('[PBR] Failed loading travertine normal', err)
    );
    norTex.colorSpace = THREE.NoColorSpace;
    norTex.wrapS = THREE.RepeatWrapping;
    norTex.wrapT = THREE.RepeatWrapping;
    norTex.repeat.set(1, 1);
    norTex.anisotropy = 4;
    pbrTextureCache.set('pbr_trav_nor', norTex);
  }

  if (!pbrTextureCache.has('pbr_trav_rough')) {
    const roughTex = loader.load(
      '/assets/textures/stone/travertine001_1k_roughness.webp',
      undefined,
      undefined,
      (err) => console.warn('[PBR] Failed loading travertine roughness', err)
    );
    roughTex.colorSpace = THREE.NoColorSpace;
    roughTex.wrapS = THREE.RepeatWrapping;
    roughTex.wrapT = THREE.RepeatWrapping;
    roughTex.repeat.set(1, 1);
    roughTex.anisotropy = 4;
    pbrTextureCache.set('pbr_trav_rough', roughTex);
  }

  return {
    map: pbrTextureCache.get('pbr_trav_diff')!,
    normalMap: pbrTextureCache.get('pbr_trav_nor')!,
    roughnessMap: pbrTextureCache.get('pbr_trav_rough')!
  };
}

/**
 * Real PBR Brushed Bronze Textures (ambientCG Metal030, CC0).
 * Color: sRGBColorSpace
 * Normal: NoColorSpace (OpenGL +Y)
 * Roughness: NoColorSpace
 */
export function getPBRBronzeTextures() {
  const loader = new THREE.TextureLoader();

  if (!pbrTextureCache.has('pbr_bronze_diff')) {
    const colorTex = loader.load(
      '/assets/textures/metal/metal030_1k_color.webp',
      undefined,
      undefined,
      (err) => console.warn('[PBR] Failed loading bronze color', err)
    );
    colorTex.colorSpace = THREE.SRGBColorSpace;
    colorTex.wrapS = THREE.RepeatWrapping;
    colorTex.wrapT = THREE.RepeatWrapping;
    colorTex.repeat.set(2, 4);
    colorTex.anisotropy = 4;
    pbrTextureCache.set('pbr_bronze_diff', colorTex);
  }

  if (!pbrTextureCache.has('pbr_bronze_nor')) {
    const norTex = loader.load(
      '/assets/textures/metal/metal030_1k_normal.webp',
      undefined,
      undefined,
      (err) => console.warn('[PBR] Failed loading bronze normal', err)
    );
    norTex.colorSpace = THREE.NoColorSpace;
    norTex.wrapS = THREE.RepeatWrapping;
    norTex.wrapT = THREE.RepeatWrapping;
    norTex.repeat.set(2, 4);
    norTex.anisotropy = 4;
    pbrTextureCache.set('pbr_bronze_nor', norTex);
  }

  if (!pbrTextureCache.has('pbr_bronze_rough')) {
    const roughTex = loader.load(
      '/assets/textures/metal/metal030_1k_roughness.webp',
      undefined,
      undefined,
      (err) => console.warn('[PBR] Failed loading bronze roughness', err)
    );
    roughTex.colorSpace = THREE.NoColorSpace;
    roughTex.wrapS = THREE.RepeatWrapping;
    roughTex.wrapT = THREE.RepeatWrapping;
    roughTex.repeat.set(2, 4);
    roughTex.anisotropy = 4;
    pbrTextureCache.set('pbr_bronze_rough', roughTex);
  }

  return {
    map: pbrTextureCache.get('pbr_bronze_diff')!,
    normalMap: pbrTextureCache.get('pbr_bronze_nor')!,
    roughnessMap: pbrTextureCache.get('pbr_bronze_rough')!
  };
}

/**
 * Real PBR Concrete Pavers Textures (Poly Haven concrete_pavers_02, CC0).
 * Color: sRGBColorSpace
 * Normal: NoColorSpace (OpenGL +Y)
 * Roughness: NoColorSpace
 */
export function getPBRPavingTextures(repeatX = 8, repeatY = 8) {
  const loader = new THREE.TextureLoader();

  if (!pbrTextureCache.has('pbr_paver_diff')) {
    const colorTex = loader.load(
      '/assets/textures/paving/concrete_pavers_02_1k_color.webp',
      undefined,
      undefined,
      (err) => console.warn('[PBR] Failed loading paver color', err)
    );
    colorTex.colorSpace = THREE.SRGBColorSpace;
    colorTex.wrapS = THREE.RepeatWrapping;
    colorTex.wrapT = THREE.RepeatWrapping;
    colorTex.repeat.set(repeatX, repeatY);
    colorTex.anisotropy = 4;
    pbrTextureCache.set('pbr_paver_diff', colorTex);
  }

  if (!pbrTextureCache.has('pbr_paver_nor')) {
    const norTex = loader.load(
      '/assets/textures/paving/concrete_pavers_02_1k_normal.webp',
      undefined,
      undefined,
      (err) => console.warn('[PBR] Failed loading paver normal', err)
    );
    norTex.colorSpace = THREE.NoColorSpace;
    norTex.wrapS = THREE.RepeatWrapping;
    norTex.wrapT = THREE.RepeatWrapping;
    norTex.repeat.set(repeatX, repeatY);
    norTex.anisotropy = 4;
    pbrTextureCache.set('pbr_paver_nor', norTex);
  }

  if (!pbrTextureCache.has('pbr_paver_rough')) {
    const roughTex = loader.load(
      '/assets/textures/paving/concrete_pavers_02_1k_roughness.webp',
      undefined,
      undefined,
      (err) => console.warn('[PBR] Failed loading paver roughness', err)
    );
    roughTex.colorSpace = THREE.NoColorSpace;
    roughTex.wrapS = THREE.RepeatWrapping;
    roughTex.wrapT = THREE.RepeatWrapping;
    roughTex.repeat.set(repeatX, repeatY);
    roughTex.anisotropy = 4;
    pbrTextureCache.set('pbr_paver_rough', roughTex);
  }

  return {
    map: pbrTextureCache.get('pbr_paver_diff')!,
    normalMap: pbrTextureCache.get('pbr_paver_nor')!,
    roughnessMap: pbrTextureCache.get('pbr_paver_rough')!
  };
}
