import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface MapViewProps {
  location: string;
}

const defaultCenter: [number, number] = [48.8566, 2.3522]; // Paris als Fallback

// 🧭 Beispiel: einfache Marker-Icons (da Leaflet-Standard in Vite nicht funktioniert)
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapView({ location }: Readonly<MapViewProps>) {
  // Optional: hier könnte man später automatisch Koordinaten via API holen
  // mit Geocoding dynamisch machen
  const [coords, setCoords] = useState<[number, number]>(defaultCenter);
  
  // 🧠 Lesbare Variante des Ortsnamens (z. B. "berlin" → "Berlin")
  const displayLocation =
    location.charAt(0).toUpperCase() + location.slice(1).toLowerCase();

  // 🧠 Ort → Koordinaten (Geocoding)
  useEffect(() => {
    if (!location) return;

    const fetchCoords = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            location
          )}`
        );
        const data = await response.json();

        // ✅ Modern & sicher mit optional chaining
        const lat = Number.parseFloat(data?.[0]?.lat ?? "");
        const lon = Number.parseFloat(data?.[0]?.lon ?? "");

        if (!Number.isNaN(lat) && !Number.isNaN(lon)) {
          setCoords([lat, lon]);
        } else {
          console.warn("Ort nicht gefunden:", location);
          setCoords(defaultCenter);
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Koordinaten:", error);
        setCoords(defaultCenter);
      }
    };

    fetchCoords();
  }, [location]);

  return (
    <div className="h-64 w-full rounded-lg overflow-hidden border">
      <MapContainer
        center={coords}
        zoom={4}
        scrollWheelZoom={false}
        className="h-full w-full"
        key={location}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coords} icon={markerIcon}>
          <Popup>{displayLocation}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
