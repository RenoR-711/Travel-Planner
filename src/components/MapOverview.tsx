import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { Trip } from "../types";

// 🧭 Marker-Icon (Vite-kompatibel)
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapOverview({ trips }: { trips: Trip[] }) {
  const [markers, setMarkers] = useState<
    { lat: number; lon: number; title: string; location: string }[]
  >([]);

  useEffect(() => {
    const fetchAllCoords = async () => {
      const newMarkers: {
        lat: number;
        lon: number;
        title: string;
        location: string;
      }[] = [];

      for (const trip of trips) {
        if (!trip.location) continue;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              trip.location,
            )}`,
          );
          const data = await res.json();
          if (data && data.length > 0) {
            newMarkers.push({
              lat: parseFloat(data[0].lat),
              lon: parseFloat(data[0].lon),
              title: trip.title,
              location: trip.location,
            });
          }
        } catch (err) {
          console.error("Fehler beim Geocoding:", err);
        }
      }

      setMarkers(newMarkers);
    };

    if (trips.length > 0) {
      fetchAllCoords();
    } else {
      setMarkers([]);
    }
  }, [trips]);

  const defaultCenter: [number, number] = [48.8566, 2.3522]; // Paris Fallback

  return (
    <div className="h-[400px] w-full rounded-xl overflow-hidden border mt-8">
      <MapContainer
        center={defaultCenter}
        zoom={3}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers.map((m, index) => (
          <Marker
            key={index}
            position={[m.lat, m.lon]}
            icon={markerIcon}
            title={m.location}
          >
            <Popup>
              <strong>{m.title}</strong>
              <br />
              {m.location}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
