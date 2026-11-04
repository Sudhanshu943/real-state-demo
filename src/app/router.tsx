import { createHashRouter } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { ExplorePage } from '../pages/ExplorePage';
import { ComparePage } from '../pages/ComparePage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const router = createHashRouter([
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
