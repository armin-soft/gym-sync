
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Index';
import Students from './pages/students';
import Exercises from './pages/exercises';
import Diet from './pages/diet';
import Supplements from './pages/supplements';
import Trainer from './pages/trainer';
import Reports from './pages/reports';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/students" element={<Students />} />
      <Route path="/exercises/*" element={<Exercises />} />
      <Route path="/diet/*" element={<Diet />} />
      <Route path="/supplements/*" element={<Supplements />} />
      <Route path="/trainer/*" element={<Trainer />} />
      <Route path="/reports/*" element={<Reports />} />
    </Routes>
  );
};

export default AppRoutes;
