import MapView from "./MapView";
import WeatherInfo from "./WeatherInfo";

interface TripCardProps {
  id?: string;
  title: string;
  location: string;
  date: string;
  image: string;
  notes: string;
  onEdit?: (id: string) => void; 
  onDelete?: (id: string) => void;
}

export default function TripCard({
  id,
  title,
  location,
  date,
  image,
  notes,
  onEdit,
  onDelete,
}: Readonly<TripCardProps>) {
  return (
    <article className="bg-white rounded-2xl shadow-md overflow-hidden border hover:shadow-lg transition">
      <div className="p-4">
        {/* 📋 Infos */}
        <h2 className="flex justify-center text-xl font-semibold text-blue-600">{title}</h2>
        <p className="flex justify-center text-sm text-gray-500">{location}</p>
        <p className="flex justify-center text-sm text-gray-400 mb-2">{date}</p>

        {/* ✏️ Bearbeiten-Button (wenn vorhanden) */}
        {onEdit && id && (
          <div className="flex justify-center mt-3">
          <button
            onClick={() => onEdit(id)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            ✏️ Bearbeiten
            </button>
          </div>
        )}

        {/* 🖼️ Bild */}
        <img
          src={image || "https://source.unsplash.com/featured/?travel"}
          //alt={location}
          alt={`${title} in ${location}`}
          className="h-40 w-full object-cover"
        />

        {/* 📝 Notizen */}
        {notes && (
          <p className="text-gray-700 text-sm mt-2 whitespace-pre-line">
            {notes}
          </p>
        )}

        {/* 🗺️ Karte */}
        <div className="mt-3">
          <MapView location={location} />
        </div>

        {/* 🌤️ Wetter */}
        <div className="mt-3">
          <WeatherInfo location={location} />
        </div>

        {/* 🌤️ Wetter */}
        {onDelete && id && (
          <div className="flex justify-center mt-3">
          <button
            onClick={() => onDelete(id)}
            className="bg-red-500 text-white text-sm font-medium px-3 py-1 rounded-lg hover:bg-red-600 transition"
          >
            🗑️ Löschen
            </button>
          </div>
        )}
      
      </div>
    </article>
  );
}
