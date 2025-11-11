import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
      {/* 🌍 App-Titel */}
      <h1 className="text-xl font-bold">🌍 Travel Planner</h1>

      <div className="flex items-center gap-4">
        <Link
          to="/"
          className={`px-4 py-2 rounded-lg font-medium transition ${location.pathname === "/"
              ? "bg-white text-blue-600 shadow"
              : "hover:bg-blue-500"
            }`}
        >
          Reisen
        </Link>

        <Link
          to="/packlist"
          className={`px-4 py-2 rounded-lg font-medium transition ${location.pathname === "/packlist"
              ? "bg-white text-blue-600 shadow"
              : "hover:bg-blue-500"
            }`}
        >
          Packliste
        </Link>

        <Link
          to="/bucket"
          className={`px-4 py-2 rounded-lg font-medium transition ${location.pathname === "/bucket"
            ? "bg-white text-blue-600 shadow"
            : "hover:bg-blue-500"
            }`}
        >
          Bucket List
        </Link>

        {/* ➕ Neues Ziel */}
        {/* <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition">
          Neues Ziel +
        </button> */}
      </div>
    </nav>
  );
}
