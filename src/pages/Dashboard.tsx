//Dashboard mit localStorage

import { useState, useEffect } from "react";
import AddTripForm from "../components/AddTripForm";
import TripCard from "../components/TripCard";
import EditTripForm from "../components/EditTripForm";
import type { Trip } from "../types";

/**
 * Dashboard-Komponente
 * ---------------------
 * 👉 zeigt alle geplanten Reisen an
 * 👉 erlaubt das Hinzufügen neuer Reisen
 * 👉 speichert sie automatisch im localStorage
 */
export default function Dashboard() {
  // 🧠 State: "trips" speichert alle Reisen
  const [trips, setTrips] = useState<Trip[]>([]);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);

  // 🔄 1. Beim ersten Laden: gespeicherte Trips aus localStorage laden
  useEffect(() => {
    try {
      const saved = localStorage.getItem("trips");
      if (!saved) return;

      const parsed: Trip[] = JSON.parse(saved);

      // Datum-Feld in echte Date-Objekte umwandeln
      const withDates = parsed.map((t) => ({
        ...t,
        date: t.date ? new Date(t.date) : null,
      }));

      setTrips(withDates);
    } catch (error) {
      console.error("Fehler beim Laden der Reisen:", error);
    }
  }, []);

  // 💾 2. Änderungen automatisch speichern
  useEffect(() => {
    try {
      // Nur speichern, wenn tatsächlich etwas vorhanden ist
      if (trips.length > 0) {
        localStorage.setItem("trips", JSON.stringify(trips));
      }
    } catch (error) {
      console.error("Fehler beim Speichern der Reisen:", error);
    }
  }, [trips]);

  // ➕ Funktion: wird von AddTripForm aufgerufen, wenn neue Reise hinzugefügt wird
  const addTrip = (newTrip: Trip) => {
    // Optional: ID hinzufügen (hilfreich für Key)
    const id =
      newTrip.id ??
      (typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : Date.now().toString());

    const tripWithId = { ...newTrip, id };
    setTrips((prev) => [...prev, tripWithId]);
  };

  // ✏️ Reise bearbeiten starten
  const startEditTrip = (id: string) => {
    const trip = trips.find((t) => t.id === id);
    if (trip) setEditingTrip(trip);
  };

  // 💾 Änderungen speichern
  const saveEditedTrip = (updatedTrip: Trip) => {
    setTrips((prev) =>
      prev.map((t) => (t.id === updatedTrip.id ? updatedTrip : t))
    );
    setEditingTrip(null);
  };

  // 🗑️ Reise löschen
  const deleteTrip = (id: string) => {
    if (confirm("Reise wirklich löschen?")) {
      setTrips((prev) => prev.filter((t) => t.id !== id));
    }
  };

 
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
        🌍 Travel Planner
      </h1>

      {/* Formular: entweder Neu oder Bearbeiten */}
      {editingTrip ? (
        <EditTripForm
          trip={editingTrip}
          onSave={saveEditedTrip}
          onCancel={() => setEditingTrip(null)}
        />
      ) : (
          <AddTripForm onAddTrip={addTrip} />
      )}

      {/* Liste der gespeicherten Reisen */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {trips.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            Noch keine Reisen geplant ✈️
          </p>
        ) : (
            trips.map((trip) => (
              <TripCard
                key={trip.id}
                id={trip.id}
                location={trip.location}
                date={trip.date ? trip.date.toLocaleDateString() : ""}
                notes={trip.notes}
                title={trip.title}
                image={trip.image}
                onEdit={startEditTrip}
                onDelete={deleteTrip}
            />
          ))
        )}
      </div>
    </div>
  );
}
