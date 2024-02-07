import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Hello from '../component/pages/Hello';
import Latex from '../component/pages/Latex';
import Paper from '../component/pages/Paper';
import NavBar from '../component/modules/Navbar';
import Card from '../component/pages/Card';

export default function App() {
  return (
    <div className="main-page">
      <Router basename="/">
        <NavBar />
        <Routes>
          <Route path="/" element={<Hello />} />
          <Route path="/latex" element={<Latex />} />
          <Route path="/paper" element={<Paper />} />
          <Route path="/card" element={<Card />} />
        </Routes>
      </Router>
    </div>
  );
}
