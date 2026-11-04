import type { ProjectSeedData } from './types';

export interface ValidationReport {
  isValid: boolean;
  errors: string[];
}

export function validateProjectData(data: unknown): ValidationReport {
  const errors: string[] = [];

  if (!data || typeof data !== 'object') {
    return { isValid: false, errors: ['Project data is not an object'] };
  }

  const projectData = data as Partial<ProjectSeedData>;

  if (projectData.schemaVersion !== 1) {
    errors.push(`Expected schemaVersion 1, got ${projectData.schemaVersion}`);
  }

  if (!projectData.project || projectData.project.id !== 'aurel') {
    errors.push('Missing or invalid project metadata');
  }

  if (!projectData.building || projectData.building.id !== 'aurel-a') {
    errors.push('Missing or invalid building metadata');
  }

  const collections = projectData.collections || [];
  if (collections.length !== 3) {
    errors.push(`Expected 3 collections, got ${collections.length}`);
  }
  const collectionIds = new Set(collections.map((c) => c.id));

  const units = projectData.units || [];
  if (units.length !== 6) {
    errors.push(`Expected 6 units, got ${units.length}`);
  }

  const plans = projectData.plans || [];
  const planIds = new Set(plans.map((p) => p.id));

  const tours = projectData.tours || [];
  const tourIds = new Set(tours.map((t) => t.id));

  const unitIds = new Set<string>();
  const proxies = new Set<string>();

  for (const unit of units) {
    if (unitIds.has(unit.id)) {
      errors.push(`Duplicate unit ID: ${unit.id}`);
    }
    unitIds.add(unit.id);

    if (proxies.has(unit.sceneNodeId)) {
      errors.push(`Duplicate unit scene node: ${unit.sceneNodeId}`);
    }
    proxies.add(unit.sceneNodeId);

    if (!collectionIds.has(unit.collectionId)) {
      errors.push(`Unit ${unit.id} references invalid collection: ${unit.collectionId}`);
    }

    if (!planIds.has(unit.planId)) {
      errors.push(`Unit ${unit.id} references invalid plan: ${unit.planId}`);
    }

    if (!tourIds.has(unit.tourId)) {
      errors.push(`Unit ${unit.id} references invalid tour: ${unit.tourId}`);
    }

    if (![4, 8, 12].includes(unit.floor)) {
      errors.push(`Unit ${unit.id} has invalid floor: ${unit.floor}`);
    }

    if (unit.internalAreaM2 <= 0 || unit.terraceAreaM2 <= 0 || unit.samplePriceINR <= 0) {
      errors.push(`Unit ${unit.id} has non-positive numeric fields`);
    }

    if (!unit.isDemo) {
      errors.push(`Unit ${unit.id} must have isDemo: true`);
    }

    if (unit.areaDefinition !== 'illustrative-internal') {
      errors.push(`Unit ${unit.id} must declare illustrative-internal area definition`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
