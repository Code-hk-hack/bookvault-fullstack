import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';

import Dashboard from './pages/Dashboard';
import Upgrade from './pages/Upgrade';
import MockCheckout from './pages/MockCheckout';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upgrade" element={<Upgrade />} />
        <Route path="/mock-checkout" element={<MockCheckout />} />
      </Routes>
    </Router>
  );
}