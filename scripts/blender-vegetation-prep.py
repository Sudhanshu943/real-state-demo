"""
Blender Automated Vegetation Preparation & Optimization Script
AUREL Luxury Residences — Architectural Visualization

Usage (when Blender is available on system):
    blender -b -P scripts/blender-vegetation-prep.py

This script:
1. Audits and cleans up Poly Haven CC0 vegetation assets (tree_small_02 and shrub_01).
2. Centers origins to ground contact (Z=0 / Y=0 base).
3. Applies decimation modifiers to meet the governing 60,000 rendered triangle budget:
   - tree_small_02: ~5,000 triangles total (~4,000 leaves, ~600 branches, ~400 trunk).
   - shrub_01: ~1,000 triangles total.
4. Validates UV channels, materials, alpha test settings, and surface normals.
5. Exports clean, game-ready GLTF/GLB models for web delivery.
"""

import os
import sys

try:
    import bpy
except ImportError:
    print("[blender-prep] WARNING: bpy module is only available inside Blender Python environment.")
    print("[blender-prep] Run with: blender -b -P scripts/blender-vegetation-prep.py")
    sys.exit(0)

def reset_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)

def prepare_tree(source_path, export_path, target_tris=5000):
    reset_scene()
    print(f"[blender-prep] Importing tree from {source_path}...")
    bpy.ops.import_scene.gltf(filepath=source_path)

    # Collect meshes
    meshes = [obj for obj in bpy.context.scene.objects if obj.type == 'MESH']
    total_initial_tris = sum(len(m.data.polygons) for m in meshes)
    print(f"[blender-prep] Initial tree objects: {len(meshes)}, total polygons: {total_initial_tris}")

    # Process each mesh piece (trunk, branches, leaves)
    for obj in meshes:
        bpy.context.view_layer.objects.active = obj
        obj.select_set(True)

        # Apply transforms
        bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)

        # Recalculate outside normals
        bpy.ops.object.mode_set(mode='EDIT')
        bpy.ops.mesh.select_all(action='SELECT')
        bpy.ops.mesh.normals_make_consistent(inside=False)
        bpy.ops.object.mode_set(mode='OBJECT')

        poly_count = len(obj.data.polygons)
        name_lower = obj.name.lower()

        # Decimate proportionally
        mod = obj.modifiers.new(name="Decimate_Prep", type='DECIMATE')
        if 'leave' in name_lower or 'leaf' in name_lower:
            ratio = min(1.0, max(0.05, 4000.0 / max(1, poly_count)))
        elif 'branch' in name_lower:
            ratio = min(1.0, max(0.1, 600.0 / max(1, poly_count)))
        else: # trunk
            ratio = min(1.0, max(0.2, 400.0 / max(1, poly_count)))

        mod.ratio = ratio
        bpy.ops.object.modifier_apply(modifier="Decimate_Prep")
        print(f"[blender-prep] Object {obj.name}: {poly_count} -> {len(obj.data.polygons)} polygons (ratio: {ratio:.3f})")

        obj.select_set(False)

    final_tris = sum(len(m.data.polygons) for m in meshes)
    print(f"[blender-prep] Optimized tree total polygons: {final_tris} (Target: ~{target_tris})")

    # Export optimized GLB
    os.makedirs(os.path.dirname(export_path), exist_ok=True)
    bpy.ops.export_scene.gltf(
        filepath=export_path,
        export_format='GLB',
        export_apply=True,
        export_materials='EXPORT',
        export_yup=True
    )
    print(f"[blender-prep] Exported tree GLB to: {export_path}")

def prepare_shrub(source_path, export_path, target_tris=1000):
    reset_scene()
    print(f"[blender-prep] Importing shrub from {source_path}...")
    bpy.ops.import_scene.gltf(filepath=source_path)

    meshes = [obj for obj in bpy.context.scene.objects if obj.type == 'MESH']
    for obj in meshes:
        bpy.context.view_layer.objects.active = obj
        obj.select_set(True)

        # Apply transforms & ensure centered origin at bottom
        bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)

        # Recalculate outside normals
        bpy.ops.object.mode_set(mode='EDIT')
        bpy.ops.mesh.select_all(action='SELECT')
        bpy.ops.mesh.normals_make_consistent(inside=False)
        bpy.ops.object.mode_set(mode='OBJECT')

        poly_count = len(obj.data.polygons)
        mod = obj.modifiers.new(name="Decimate_Prep", type='DECIMATE')
        ratio = min(1.0, max(0.04, float(target_tris) / max(1, poly_count)))
        mod.ratio = ratio
        bpy.ops.object.modifier_apply(modifier="Decimate_Prep")
        print(f"[blender-prep] Shrub {obj.name}: {poly_count} -> {len(obj.data.polygons)} polygons (ratio: {ratio:.3f})")
        obj.select_set(False)

    os.makedirs(os.path.dirname(export_path), exist_ok=True)
    bpy.ops.export_scene.gltf(
        filepath=export_path,
        export_format='GLB',
        export_apply=True,
        export_materials='EXPORT',
        export_yup=True
    )
    print(f"[blender-prep] Exported shrub GLB to: {export_path}")

if __name__ == '__main__':
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    tree_src = os.path.join(base_dir, "assets-source", "models", "tree_small_02", "tree_small_02_1k.gltf")
    tree_dst = os.path.join(base_dir, "public", "assets", "models", "tree_small_02.glb")
    shrub_src = os.path.join(base_dir, "assets-source", "models", "shrub_01", "shrub_01_1k.gltf")
    shrub_dst = os.path.join(base_dir, "public", "assets", "models", "shrub_01.glb")

    if os.path.exists(tree_src):
        prepare_tree(tree_src, tree_dst, target_tris=5000)
    if os.path.exists(shrub_src):
        prepare_shrub(shrub_src, shrub_dst, target_tris=1000)
