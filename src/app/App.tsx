import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ExperienceProvider, useExperience } from './providers';
import { AppErrorBoundary } from './AppErrorBoundary';
import { SavedDrawer } from '../features/saved/SavedDrawer';
import { ReplaceCompareModal } from '../features/saved/ReplaceCompareModal';
import { ViewingModal } from '../features/enquiry/ViewingModal';
import { AboutDemoDialog } from '../components/AboutDemoDialog';

function GlobalOverlays() {
  const { state, dispatch } = useExperience();

  return (
    <>
      <SavedDrawer />
      <ReplaceCompareModal />
      <ViewingModal />
      <AboutDemoDialog
        isOpen={state.activeOverlay?.kind === 'about-demo'}
        onClose={() => dispatch({ type: 'CLOSE_OVERLAY' })}
      />
    </>
  );
}

export function App() {
  return (
    <AppErrorBoundary>
      <ExperienceProvider>
        <RouterProvider router={router} />
        <GlobalOverlays />
      </ExperienceProvider>
    </AppErrorBoundary>
  );
}
