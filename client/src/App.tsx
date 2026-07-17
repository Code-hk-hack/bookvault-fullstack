import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Code splitting: pages load only when needed
const Landing = lazy(() => import('./pages/Landing'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Lore = lazy(() => import('./pages/Lore'));
const Upgrade = lazy(() => import('./pages/Upgrade'));
const MockCheckout = lazy(() => import('./pages/MockCheckout'));

// Slim loading state while code-split chunks load
function PageFallback() {
  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center">
      <div className="text-red-500 font-serif text-xl animate-pulse">Awakening the archives...</div>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Suspense fallback={<PageFallback />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lore" element={<Lore />} />
          <Route path="/upgrade" element={<Upgrade />} />
          <Route path="/mock-checkout" element={<MockCheckout />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

export default function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || 'dummy-client-id'}>
      <Router>
        <AnimatedRoutes />
      </Router>
    </GoogleOAuthProvider>
  );
}