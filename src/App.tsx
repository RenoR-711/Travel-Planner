import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import PackingList from "./pages/PackingList";
import { useEffect } from "react";
import BucketList from "./pages/BucketList";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="font-sans min-h-screen bg-gray-100">
      {/* 🧭 Navigation oben */}
      <Navbar />
      <ScrollToTop />

      {/* 🔀 Seiteninhalt */}
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/packlist" element={<PackingList />} />
          <Route path="/bucket" element={<BucketList />} /> {/* 🪣 */}
        </Routes>
      </main>
    </div>
  );
}
