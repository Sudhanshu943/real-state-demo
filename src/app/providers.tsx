import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { UiState, ProjectSeedData } from '../domain/types';
import { experienceReducer, initialUiState, type Action } from '../domain/experienceReducer';
import { loadPreferences } from '../domain/storage';
import projectDataRaw from '../data/project.json';

const projectData = projectDataRaw as ProjectSeedData;

interface ExperienceContextType {
  state: UiState;
  dispatch: React.Dispatch<Action>;
  project: ProjectSeedData;
}

const ExperienceContext = createContext<ExperienceContextType | null>(null);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(experienceReducer, initialUiState);

  useEffect(() => {
    // Hydrate persisted preferences
    const stored = loadPreferences();
    dispatch({ type: 'HYDRATE_PREFERENCES', preferences: stored });
  }, []);

  return (
    <ExperienceContext.Provider value={{ state, dispatch, project: projectData }}>
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperience(): ExperienceContextType {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error('useExperience must be used within an ExperienceProvider');
  }
  return context;
}
