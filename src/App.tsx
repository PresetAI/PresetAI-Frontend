import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Home,
  Dashboard,
  Project,
  UserAPIKey,
  Pricing,
  ProjectDetailPlayground,
  ProjectDetailFileManagement,
  ProjectDetailUploadDataSource,
  ProjectDetailUploadHistory,
  ProjectDetailAPIKey,
  Error,
  PrivateRoute,
} from './pages';

const routes = [
  { path: '/', element: <Home />, auth: false },
  { path: '/pricing', element: <Pricing />, auth: false },
  { path: '/dashboard', element: <Dashboard />, auth: true },
  { path: '/projects', element: <Project />, auth: true },
  { path: '/user/api-keys', element: <UserAPIKey />, auth: true },
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
  );
}

export default App;
