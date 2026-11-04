import { describe, it, expect } from 'vitest';
import projectData from '../data/project.json';
import { validateProjectData } from '../domain/validateProject';

describe('U01-U03: Project Seed Contract & Validator', () => {
  it('U01: canonical project.seed.json passes validation completely', () => {
    const report = validateProjectData(projectData);
    expect(report.isValid).toBe(true);
    expect(report.errors).toEqual([]);
  });

  it('U02: catches invalid references or broken identifiers', () => {
    const brokenData = JSON.parse(JSON.stringify(projectData));
    brokenData.units[0].collectionId = 'invalid-collection';
    brokenData.units[1].planId = 'invalid-plan';

    const report = validateProjectData(brokenData);
    expect(report.isValid).toBe(false);
    expect(report.errors.some((e) => e.includes('invalid collection'))).toBe(true);
    expect(report.errors.some((e) => e.includes('invalid plan'))).toBe(true);
  });

  it('U03: rejects negative metrics or invalid floors', () => {
    const badMetricsData = JSON.parse(JSON.stringify(projectData));
    badMetricsData.units[0].internalAreaM2 = -50;
    badMetricsData.units[1].floor = 7; // not in 4, 8, 12

    const report = validateProjectData(badMetricsData);
    expect(report.isValid).toBe(false);
    expect(report.errors.some((e) => e.includes('non-positive numeric fields'))).toBe(true);
    expect(report.errors.some((e) => e.includes('invalid floor'))).toBe(true);
  });
});
