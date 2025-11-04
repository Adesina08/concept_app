import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import AdminConceptSetup from './pages/AdminConceptSetup.jsx';
import AdminFeedbackDashboard from './pages/AdminFeedbackDashboard.jsx';
import ClientConceptSubmission from './pages/ClientConceptSubmission.jsx';

const navItems = [
  { path: '/', label: 'Admin Concept Setup' },
  { path: '/admin-dashboard', label: 'Admin Feedback Dashboard' },
  { path: '/client-submission', label: 'Client Concept Submission' },
];

const App = () => (
  <div className="min-h-screen bg-[#111422] text-white">
    <header className="border-b border-[#232948] bg-[#191e33]">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <h1 className="text-xl font-bold tracking-[-0.015em]">Stitch Design Concepts</h1>
        <nav className="flex flex-wrap gap-3 text-sm font-medium">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `rounded-full px-3 py-1 transition-colors ${isActive ? 'bg-[#2b4bee] text-white' : 'bg-transparent text-[#929bc9] hover:text-white'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
    <main className="mx-auto flex max-w-5xl justify-center px-4 py-6">
      <Routes>
        <Route path="/" element={<AdminConceptSetup />} />
        <Route path="/admin-dashboard" element={<AdminFeedbackDashboard />} />
        <Route path="/client-submission" element={<ClientConceptSubmission />} />
      </Routes>
    </main>
  </div>
);

export default App;
