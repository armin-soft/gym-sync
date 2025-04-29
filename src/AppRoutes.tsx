
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoadingScreen } from './components/LoadingScreen';

// Lazy load components for better performance
const Dashboard = lazy(() => import('./pages/Index'));
const Students = lazy(() => import('./pages/students'));
const Exercises = lazy(() => import('./pages/exercises'));
const Diet = lazy(() => import('./pages/diet'));
const Supplements = lazy(() => import('./pages/supplements'));
const Trainer = lazy(() => import('./pages/trainer'));
const Reports = lazy(() => import('./pages/reports'));

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={
        <Suspense fallback={<LoadingScreen />}>
          <Dashboard />
        </Suspense>
      } />
      <Route path="/students/*" element={
        <Suspense fallback={<LoadingScreen />}>
          <Students />
        </Suspense>
      } />
      <Route path="/exercises/*" element={
        <Suspense fallback={<LoadingScreen />}>
          <Exercises />
        </Suspense>
      } />
      <Route path="/diet/*" element={
        <Suspense fallback={<LoadingScreen />}>
          <Diet />
        </Suspense>
      } />
      <Route path="/supplements/*" element={
        <Suspense fallback={<LoadingScreen />}>
          <Supplements />
        </Suspense>
      } />
      <Route path="/trainer/*" element={
        <Suspense fallback={<LoadingScreen />}>
          <Trainer />
        </Suspense>
      } />
      <Route path="/reports/*" element={
        <Suspense fallback={<LoadingScreen />}>
          <Reports />
        </Suspense>
      } />
    </Routes>
  );
};

export default AppRoutes;
