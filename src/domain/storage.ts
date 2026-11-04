import type { Preferences } from './types';

export const STORAGE_KEY = 'aurel.demo.v1';

export const DEFAULT_PREFERENCES: Preferences = {
  savedIds: [],
  compareIds: [],
  renderPreference: 'auto'
};

const VALID_UNIT_IDS = new Set(['A0401', 'A0402', 'A0801', 'A0802', 'A1201', 'A1202']);

export function loadPreferences(): Preferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PREFERENCES };

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return { ...DEFAULT_PREFERENCES };
    }

    if (parsed.version !== 1) {
      return { ...DEFAULT_PREFERENCES };
    }

    // Sanitize savedIds
    const rawSaved = Array.isArray(parsed.savedIds) ? parsed.savedIds : [];
    const validSaved: string[] = Array.from(new Set<string>(rawSaved.filter((id: unknown): id is string => typeof id === 'string' && VALID_UNIT_IDS.has(id))));

    // Sanitize compareIds (must be subset of saved, max 2)
    const rawCompare = Array.isArray(parsed.compareIds) ? parsed.compareIds : [];
    const validCompare: string[] = Array.from(new Set<string>(rawCompare.filter((id: unknown): id is string => typeof id === 'string' && validSaved.includes(id)))).slice(0, 2);

    // Sanitize renderPreference
    const renderPref = parsed.renderPreference === 'simplified' ? 'simplified' : 'auto';

    return {
      savedIds: validSaved,
      compareIds: validCompare,
      renderPreference: renderPref
    };
  } catch {
    // LocalStorage quota or access denied fallback
    return { ...DEFAULT_PREFERENCES };
  }
}

export function savePreferences(prefs: Preferences): boolean {
  try {
    // Sanitize before saving
    const saved = Array.from(new Set(prefs.savedIds.filter((id) => VALID_UNIT_IDS.has(id))));
    const compare = Array.from(new Set(prefs.compareIds.filter((id) => saved.includes(id)))).slice(0, 2);

    const payload = {
      version: 1,
      savedIds: saved,
      compareIds: compare,
      renderPreference: prefs.renderPreference === 'simplified' ? 'simplified' : 'auto'
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return true;
  } catch {
    return false;
  }
}

export function clearPreferences(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore storage access error
  }
}
