import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import NavBar from "./components/Navbar.jsx";

function App() {
  return (
    <div className="min-h-screen bg-base-200">
      <NavBar />
      {/* px here matches the negative margins used in hero-bg bleed */}
      <main className="px-4 sm:px-6 lg:px-8 pb-12">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
