import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';

// Placeholder for Dashboard (we will build this next)
function Dashboard() {
  return <div className="min-h-screen bg-[#030303] text-white flex items-center justify-center text-4xl font-serif">Welcome to the Secret Vault</div>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}