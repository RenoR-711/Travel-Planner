//Trips speichern in localStorage
//AddTripForm kümmert sich nur um Eingabe/Validierung und übergibt den Datensatz nach außen; die Eltern speichern/anzeigen ihn.

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // wichtig: CSS importieren!
import { v4 as uuidv4 } from "uuid";
import type { Trip } from "../types";

interface AddTripFormProps {
  onAddTrip: (trip: Trip) => void;
}

export default function AddTripForm({ onAddTrip }: Readonly<AddTripFormProps>) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [image, setImage] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !location || !date) {
      setError("Bitte alle Felder ausfüllen!");
      return;
    }
    //setError besser als alert(). Teil des Codes, der eine Fehlermeldung im Formular anzeigt, wenn Pflichtfelder leer sind.

    // Neuen Trip erstellen
    const newTrip: Trip = {
      id: uuidv4(),
      title: title.trim(),
      location: location.trim(),
      date,
      image: image.trim() || "https://source.unsplash.com/featured/?travel",
      notes: notes.trim(),
    };

    // Trip an die Eltern-Komponente weitergeben
    onAddTrip(newTrip);

    // Formular zurücksetzen
    setTitle("");
    setLocation("");
    setDate(null);
    setImage("");
    setNotes("");
    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md p-4 rounded-2xl max-w-md mx-auto mt-6 space-y-4"
    >
      <h2 className="text-xl font-semibold text-blue-600">Neue Reise ✈️</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Neuen Trip hinzufügen{" "}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full border rounded-lg p-2"
            placeholder="z. B. Sommerurlaub"
          />
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Reiseziel{" "}
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 w-full border rounded-lg p-2"
            placeholder="z. B. Paris"
          />
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Datum
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            className="mt-1 w-full border rounded-lg p-2"
            dateFormat="dd.MM.yyyy"
            placeholderText="Datum wählen"
          />
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Bilder{" "}
          <textarea
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mt-1 w-full border rounded-lg p-2"
            placeholder="https://..."
          />
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Notizen{" "}
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 w-full border rounded-lg p-2"
            placeholder="Was möchtest du dort machen?"
          />
        </label>
      </div>

      {/* Fehleranzeige */}
      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        ➕ Reise hinzufügen
      </button>
    </form>
  );
}
