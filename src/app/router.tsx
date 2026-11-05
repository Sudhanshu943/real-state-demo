import { createHashRouter } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { ExplorePage } from '../pages/ExplorePage';
import { ComparePage } from '../pages/ComparePage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { AssetStudio } from '../pages/AssetStudio';

export const router = createHashRouter([
  ...(import.meta.env.DEV ? [{path: '/asset-studio',element: <AssetStudio/>}] : []),
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/explore/*',
    element: <ExplorePage />
  },
  {
    path: '/compare',
    element: <ComparePage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]);
