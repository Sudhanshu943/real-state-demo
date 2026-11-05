# Installed 3D asset tooling

The application already uses Three.js, React Three Fiber and Drei. The following development tools prepare authored assets for that existing renderer:

- `@gltf-transform/cli`: inspect, validate and optimize GLB/glTF assets.
- `gltfjsx`: generate React Three Fiber components from named model nodes and materials.

They are project-local development dependencies, recorded in package-lock.json. They do not add a second renderer to the homepage.

## Start with a source asset

Keep the editable Blender source outside the public delivery directory. Export a GLB with explicit names for floors, units and customizable material slots. Record third-party asset sources and licenses. Do not place an unlicensed model in the public folder.

## Inspect and validate

```powershell
npm run model:inspect -- path/to/source.glb
npm run model:validate -- path/to/source.glb
```

## Prepare a delivery model

```powershell
npm run model:optimize -- path/to/source.glb public/assets/models/building.glb --texture-compress webp
```

Inspect optimization options before applying them to interactive architecture. Flattening or joining meshes may remove independently selectable floors or material boundaries. Preserve those nodes when the application needs them. Configure the browser loader for the compression extensions used by the chosen output settings.

## Generate an editable React component

```powershell
npm run model:jsx -- public/assets/models/building.glb --types --output src/scene/BuildingAsset.tsx
```

Review generated node names and material ownership. Integrate the component with existing camera controls and unit selection only after validating the model. Keep original source files and compare before/after views.

The tools are installed and their command-line entry points verified. No external building model has been imported yet, and no Blender desktop installation is included in this npm setup.

## Verification and dependency notes

Verified a temporary textured GLB through optimization, glTF validation, and typed JSX generation, including gltfjsx's transform mode. Production build and all 17 existing unit tests pass.

The project overrides `sharp` to `^0.35.5` to replace the older vulnerable image-processing version pulled in by gltfjsx. Use Node 20.9 or newer for that dependency. The installed tools were verified with Node 25.8.0.

`npm audit --omit=dev` reports no vulnerabilities. The full audit still reports seven development-dependency findings: five moderate findings in the CLI/glob chain and Vitest mocker, and two critical findings in the existing Vitest/tinypool chain. This installation does not force a major Vitest upgrade or downgrade the model tooling to older releases; those dependency updates need a separate compatibility pass.
