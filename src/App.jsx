import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Cases from './pages/Cases';
import Solutions from './pages/Solutions';
import Contact from './pages/Contact';
import TelegramOrder from './pages/TelegramOrder';

function App() {
  return (
    <Router>
      <div className="min-h-screen relative overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tg-order" element={<TelegramOrder />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
