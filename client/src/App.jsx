import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import NavBar from "./components/Navbar.jsx"; 

function App() {

  return (
    <div className="min-h-screen bg-base-200">
       <NavBar/>
      <main className="mx-auto max-w-7xl px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="about" element={<AboutPage/>} />
          </Routes>
      </main>
    </div>
  );
}

export default App;
