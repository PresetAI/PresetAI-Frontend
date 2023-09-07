import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Error, Home, Pricing, PrivateRoute } from './pages';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Project = lazy(() => import('./pages/Project'));
const UserAPIKey = lazy(() => import('./pages/UserAPIKey'));
const UserSubscriptionPlan = lazy(() => import('./pages/UserSubscriptionPlan'));
const ProjectDetailPlayground = lazy(
  () => import('./pages/ProjectDetailPlayground')
);
const ProjectDetailFileManagement = lazy(
  () => import('./pages/ProjectDetailFileManagement')
);
const ProjectDetailUploadDataSource = lazy(
  () => import('./pages/ProjectDetailUploadDataSource')
);
const ProjectDetailUploadHistory = lazy(
  () => import('./pages/ProjectDetailUploadHistory')
);
const ProjectDetailAPIKey = lazy(() => import('./pages/ProjectDetailAPIKey'));

const routes = [
  { path: '/', element: <Home />, auth: false },
  { path: '/pricing', element: <Pricing />, auth: false },
  { path: '/dashboard', element: <Dashboard />, auth: true },
  { path: '/projects', element: <Project />, auth: true },
  { path: '/user/api-keys', element: <UserAPIKey />, auth: true },
  {
    path: '/user/subscription-plan',
    element: <UserSubscriptionPlan />,
    auth: true,
  },
  {
    path: '/project/playground/:projectId',
    element: <ProjectDetailPlayground />,
    auth: true,
  },
  {
    path: '/project/file-management/:projectId',
    element: <ProjectDetailFileManagement />,
    auth: true,
  },
  {
    path: '/project/upload-data-source/:projectId',
    element: <ProjectDetailUploadDataSource />,
    auth: true,
  },
  {
    path: '/project/upload-history/:projectId',
    element: <ProjectDetailUploadHistory />,
    auth: true,
  },
  {
    path: '/project/api-keys/:projectId',
    element: <ProjectDetailAPIKey />,
    auth: true,
  },
  { path: '*', element: <Error />, auth: false },
];

function App() {
  return (
    <Suspense fallback="">
      <Routes>
        {routes.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                route.auth ? (
                  <PrivateRoute>{route.element}</PrivateRoute>
                ) : (
                  route.element
                )
              }
            />
          );
        })}
      </Routes>
    </Suspense>
  );
}

export default App;
