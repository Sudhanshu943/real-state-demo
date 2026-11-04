import { describe, it, expect } from 'vitest';
import { parseHashRoute } from '../domain/navigation';
import { filterUnits } from '../domain/selectors';
import projectData from '../data/project.json';
import type { Unit } from '../domain/types';

describe('U11-U12: Navigation & Filter Contracts', () => {
  const units = projectData.units as Unit[];

  it('U11: filters intersect cleanly (floor + collection), clear filters preserves floor', () => {
    // Floor 4 + skyline should be empty because Floor 4 has only garden residences
    const filtered = filterUnits(units, { collection: 'skyline', aspect: 'all', status: 'all' }, 4);
    expect(filtered.length).toBe(0);

    // Clear collection filter preserves floor 4
    const cleared = filterUnits(units, { collection: 'all', aspect: 'all', status: 'all' }, 4);
    expect(cleared.length).toBe(2);
    expect(cleared.map((u) => u.id)).toEqual(['A0401', 'A0402']);
  });

  it('U12: invalid floor or unit URL auto-normalizes with notice', () => {
    // Nonexistent floor 7
    const floorResult = parseHashRoute('#/explore/floors/7');
    expect(floorResult.isInvalid).toBe(true);
    expect(floorResult.selection.kind).toBe('building');
    expect(floorResult.normalizedPath).toBe('#/explore/building');

    // Nonexistent unit A9999
    const unitResult = parseHashRoute('#/explore/homes/A9999');
    expect(unitResult.isInvalid).toBe(true);
    expect(unitResult.selection.kind).toBe('building');

    // Invalid room inside valid unit
    const roomResult = parseHashRoute('#/explore/homes/A0801/tour/dungeon');
    expect(roomResult.isInvalid).toBe(true);
    expect(roomResult.selection).toEqual({
      kind: 'tour',
      unitId: 'A0801',
      roomId: 'living'
    });
    expect(roomResult.normalizedPath).toBe('#/explore/homes/A0801/tour/living');
  });

  it('U12: valid routes parse correctly', () => {
    const homeRoute = parseHashRoute('#/');
    expect(homeRoute.isInvalid).toBe(false);

    const floorRoute = parseHashRoute('#/explore/floors/8');
    expect(floorRoute.selection).toEqual({ kind: 'floor', floor: 8 });

    const unitRoute = parseHashRoute('#/explore/homes/A0801?tab=plan');
    expect(unitRoute.selection).toEqual({ kind: 'unit', unitId: 'A0801', tab: 'plan' });

    const tourRoute = parseHashRoute('#/explore/homes/A0801/tour/bedroom');
    expect(tourRoute.selection).toEqual({ kind: 'tour', unitId: 'A0801', roomId: 'bedroom' });
  });
});
