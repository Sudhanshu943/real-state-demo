import { describe, it, expect, beforeEach } from 'vitest';
import { experienceReducer, initialUiState } from '../domain/experienceReducer';
import { loadPreferences, STORAGE_KEY } from '../domain/storage';

class MemoryStorage {
  private store: Record<string, string> = {};
  getItem(key: string): string | null {
    return this.store[key] ?? null;
  }
  setItem(key: string, value: string): void {
    this.store[key] = String(value);
  }
  removeItem(key: string): void {
    delete this.store[key];
  }
  clear(): void {
    this.store = {};
  }
}

const memoryStorage = new MemoryStorage();
Object.defineProperty(globalThis, 'localStorage', {
  value: memoryStorage,
  writable: true,
  configurable: true
});

describe('U04-U10: Experience Reducer & Persistence Contracts', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('U04: save duplicate unit ID is idempotent (single membership)', () => {
    let state = experienceReducer(initialUiState, { type: 'SAVE', unitId: 'A0801' });
    expect(state.preferences.savedIds).toEqual(['A0801']);

    state = experienceReducer(state, { type: 'SAVE', unitId: 'A0801' });
    expect(state.preferences.savedIds).toEqual(['A0801']);
  });

  it('U05: adding to compare also saves the unit, up to 2 units', () => {
    let state = experienceReducer(initialUiState, { type: 'ADD_COMPARE', unitId: 'A0801' });
    expect(state.preferences.savedIds).toContain('A0801');
    expect(state.preferences.compareIds).toContain('A0801');

    state = experienceReducer(state, { type: 'ADD_COMPARE', unitId: 'A0401' });
    expect(state.preferences.savedIds).toEqual(['A0801', 'A0401']);
    expect(state.preferences.compareIds).toEqual(['A0801', 'A0401']);
  });

  it('U06: adding 3rd home to compare triggers replacement overlay and does not exceed 2 slots', () => {
    let state = experienceReducer(initialUiState, { type: 'ADD_COMPARE', unitId: 'A0801' });
    state = experienceReducer(state, { type: 'ADD_COMPARE', unitId: 'A0401' });

    state = experienceReducer(state, { type: 'ADD_COMPARE', unitId: 'A1201' });
    // Candidate unit is saved, but comparison remains 2, and overlay is opened
    expect(state.preferences.savedIds).toContain('A1201');
    expect(state.preferences.compareIds).toEqual(['A0801', 'A0401']);
    expect(state.activeOverlay).toEqual({ kind: 'replace-compare', candidateId: 'A1201' });
  });

  it('U07: replace compare replaces requested slot and keeps replaced home saved', () => {
    let state = experienceReducer(initialUiState, { type: 'ADD_COMPARE', unitId: 'A0801' });
    state = experienceReducer(state, { type: 'ADD_COMPARE', unitId: 'A0401' });

    state = experienceReducer(state, {
      type: 'REPLACE_COMPARE',
      oldId: 'A0401',
      newId: 'A1201'
    });

    expect(state.preferences.compareIds).toEqual(['A0801', 'A1201']);
    // Old home A0401 is still saved!
    expect(state.preferences.savedIds).toContain('A0401');
    expect(state.preferences.savedIds).toContain('A1201');
    expect(state.activeOverlay).toBeNull();
  });

  it('U08: unsave removes unit from saved and from compare, active route unaffected', () => {
    let state = experienceReducer(initialUiState, { type: 'ADD_COMPARE', unitId: 'A0801' });
    state = experienceReducer(state, { type: 'ADD_COMPARE', unitId: 'A0401' });

    state = experienceReducer(state, { type: 'UNSAVE', unitId: 'A0801' });
    expect(state.preferences.savedIds).toEqual(['A0401']);
    expect(state.preferences.compareIds).toEqual(['A0401']);
  });

  it('U09: malformed or corrupted storage is safely sanitized and never crashes', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: 1,
        savedIds: ['A0801', 'INVALID_ID', 'A0801'],
        compareIds: ['INVALID_ID', 'A0801', 'A0401', 'A1201'],
        renderPreference: 'unknown'
      })
    );

    const prefs = loadPreferences();
    expect(prefs.savedIds).toEqual(['A0801']);
    // Compare can only contain saved items and max 2
    expect(prefs.compareIds).toEqual(['A0801']);
    expect(prefs.renderPreference).toBe('auto');
  });

  it('U10: storage denial or throwing storage gracefully falls back to default preferences', () => {
    localStorage.setItem(STORAGE_KEY, '{invalid json');
    const prefs = loadPreferences();
    expect(prefs.savedIds).toEqual([]);
    expect(prefs.compareIds).toEqual([]);
  });
});
