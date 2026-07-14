import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Landing from './pages/Landing';
import Login from './pages/Login';

import { GoogleOAuthProvider } from '@react-oauth/google';
import Dashboard from './pages/Dashboard';
import Upgrade from './pages/Upgrade';
import MockCheckout from './pages/MockCheckout';
import Lore from './pages/Lore';

function AnimatedRoutes() {
  const location = useLocation();
  return (
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
  );
}

export default function App() {
  return (
    <GoogleOAuthProvider clientId="dummy-client-id">
      <Router>
        <AnimatedRoutes />
      </Router>
    </GoogleOAuthProvider>
  );
}