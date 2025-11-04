import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import AdminConceptSetup from './pages/AdminConceptSetup.jsx';
import AdminFeedbackDashboard from './pages/AdminFeedbackDashboard.jsx';
import ClientConceptSubmission from './pages/ClientConceptSubmission.jsx';
import ConceptRefinementDetails from './pages/ConceptRefinementDetails.jsx';
import FeedbackOverviewDashboard from './pages/FeedbackOverviewDashboard.jsx';
import FinalReportInsights from './pages/FinalReportInsights.jsx';
import IterationHistory from './pages/IterationHistory.jsx';
import LoginSignup from './pages/LoginSignup.jsx';
import RespondentDashboard from './pages/RespondentDashboard.jsx';
import RespondentFeedbackInterface from './pages/RespondentFeedbackInterface.jsx';
import RespondentLogin from './pages/RespondentLogin.jsx';
import UserProfile from './pages/UserProfile.jsx';

const navItems = [
  { path: '/', label: 'Admin Concept Setup' },
  { path: '/admin-dashboard', label: 'Admin Feedback Dashboard' },
  { path: '/client-submission', label: 'Client Concept Submission' },
  { path: '/concept-refinement-details', label: 'Concept Refinement Details' },
  { path: '/feedback-overview-dashboard', label: 'Feedback Overview Dashboard' },
  { path: '/final-report-insights', label: 'Final Report & Insights' },
  { path: '/iteration-history', label: 'Iteration History' },
  { path: '/login-signup', label: 'Login' },
  { path: '/respondent-login', label: 'Respondent Login' },
  { path: '/respondent-dashboard', label: 'Respondent Dashboard' },
  { path: '/respondent-feedback', label: 'Respondent Feedback' },
  { path: '/user-profile', label: 'User Profile' },
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
                `rounded-full px-3 py-1 transition-colors ${
                  isActive ? 'bg-[#2b4bee] text-white' : 'bg-transparent text-[#929bc9] hover:text-white'
                }`
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
        <Route path="/concept-refinement-details" element={<ConceptRefinementDetails />} />
        <Route path="/concept-refinement-details/:conceptId" element={<ConceptRefinementDetails />} />
        <Route path="/feedback-overview-dashboard" element={<FeedbackOverviewDashboard />} />
        <Route path="/final-report-insights" element={<FinalReportInsights />} />
        <Route path="/final-report-insights/:conceptId" element={<FinalReportInsights />} />
        <Route path="/iteration-history" element={<IterationHistory />} />
        <Route path="/iteration-history/:conceptId" element={<IterationHistory />} />
        <Route path="/login-signup" element={<LoginSignup />} />
        <Route path="/respondent-login" element={<RespondentLogin />} />
        <Route path="/respondent-dashboard" element={<RespondentDashboard />} />
        <Route path="/respondent-feedback" element={<RespondentFeedbackInterface />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </main>
  </div>
);

export default App;
