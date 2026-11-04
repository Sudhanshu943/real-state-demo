import type { Preferences, OverlayState, UiState, RenderPreference } from './types';
import { DEFAULT_PREFERENCES, savePreferences, clearPreferences } from './storage';

export type Action =
  | { type: 'SAVE'; unitId: string }
  | { type: 'UNSAVE'; unitId: string }
  | { type: 'ADD_COMPARE'; unitId: string }
  | { type: 'REPLACE_COMPARE'; oldId: string; newId: string }
  | { type: 'REMOVE_COMPARE'; unitId: string }
  | { type: 'OPEN_OVERLAY'; overlay: OverlayState }
  | { type: 'CLOSE_OVERLAY' }
  | { type: 'SET_RENDER_PREFERENCE'; preference: RenderPreference }
  | { type: 'RESET_DEMO' }
  | { type: 'HYDRATE_PREFERENCES'; preferences: Preferences }
  | { type: 'SET_NOTICE'; notice: string | null };

export const initialUiState: UiState = {
  preferences: DEFAULT_PREFERENCES,
  activeOverlay: null,
  notice: null
};

export function experienceReducer(state: UiState, action: Action): UiState {
  switch (action.type) {
    case 'SAVE': {
      if (state.preferences.savedIds.includes(action.unitId)) {
        return state;
      }
      const updatedSaved = [...state.preferences.savedIds, action.unitId];
      const newPrefs: Preferences = {
        ...state.preferences,
        savedIds: updatedSaved
      };
      savePreferences(newPrefs);
      return {
        ...state,
        preferences: newPrefs,
        notice: 'Residence saved'
      };
    }

    case 'UNSAVE': {
      const updatedSaved = state.preferences.savedIds.filter((id) => id !== action.unitId);
      const updatedCompare = state.preferences.compareIds.filter((id) => id !== action.unitId);
      const newPrefs: Preferences = {
        ...state.preferences,
        savedIds: updatedSaved,
        compareIds: updatedCompare
      };
      savePreferences(newPrefs);
      return {
        ...state,
        preferences: newPrefs,
        notice: 'Residence removed from saved'
      };
    }

    case 'ADD_COMPARE': {
      // Adding to compare automatically saves the home
      const isSaved = state.preferences.savedIds.includes(action.unitId);
      const updatedSaved = isSaved
        ? state.preferences.savedIds
        : [...state.preferences.savedIds, action.unitId];

      if (state.preferences.compareIds.includes(action.unitId)) {
        return state;
      }

      // Check capacity
      if (state.preferences.compareIds.length >= 2) {
        // Full: open replacement modal, but keep unit saved!
        const newPrefs = { ...state.preferences, savedIds: updatedSaved };
        savePreferences(newPrefs);
        return {
          ...state,
          preferences: newPrefs,
          activeOverlay: { kind: 'replace-compare', candidateId: action.unitId }
        };
      }

      const updatedCompare = [...state.preferences.compareIds, action.unitId];
      const newPrefs: Preferences = {
        ...state.preferences,
        savedIds: updatedSaved,
        compareIds: updatedCompare
      };
      savePreferences(newPrefs);
      return {
        ...state,
        preferences: newPrefs,
        notice: 'Added to comparison'
      };
    }

    case 'REPLACE_COMPARE': {
      const idx = state.preferences.compareIds.indexOf(action.oldId);
      if (idx === -1) return state;

      const updatedCompare = [...state.preferences.compareIds];
      updatedCompare[idx] = action.newId;

      // Ensure candidate is also in saved
      const updatedSaved = state.preferences.savedIds.includes(action.newId)
        ? state.preferences.savedIds
        : [...state.preferences.savedIds, action.newId];

      const newPrefs: Preferences = {
        ...state.preferences,
        savedIds: updatedSaved,
        compareIds: updatedCompare
      };
      savePreferences(newPrefs);
      return {
        ...state,
        preferences: newPrefs,
        activeOverlay: null,
        notice: 'Comparison updated'
      };
    }

    case 'REMOVE_COMPARE': {
      const updatedCompare = state.preferences.compareIds.filter((id) => id !== action.unitId);
      const newPrefs: Preferences = {
        ...state.preferences,
        compareIds: updatedCompare
      };
      savePreferences(newPrefs);
      return {
        ...state,
        preferences: newPrefs
      };
    }

    case 'OPEN_OVERLAY':
      return {
        ...state,
        activeOverlay: action.overlay
      };

    case 'CLOSE_OVERLAY':
      return {
        ...state,
        activeOverlay: null
      };

    case 'SET_RENDER_PREFERENCE': {
      const newPrefs: Preferences = {
        ...state.preferences,
        renderPreference: action.preference
      };
      savePreferences(newPrefs);
      return {
        ...state,
        preferences: newPrefs
      };
    }

    case 'RESET_DEMO':
      clearPreferences();
      return {
        preferences: { ...DEFAULT_PREFERENCES },
        activeOverlay: null,
        notice: 'Demo reset to initial state'
      };

    case 'HYDRATE_PREFERENCES':
      return {
        ...state,
        preferences: action.preferences
      };

    case 'SET_NOTICE':
      return {
        ...state,
        notice: action.notice
      };

    default:
      return state;
  }
}
