import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Home,
  Dashboard,
  Project,
  ProjectDetail,
  Error,
  PrivateRoute,
} from './pages';

const routes = [
  { path: '/', element: <Home />, auth: false },
  { path: '/dashboard', element: <Dashboard />, auth: true },
  { path: '/project', element: <Project />, auth: true },
  { path: '/projects/:id', element: <ProjectDetail />, auth: true },
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
