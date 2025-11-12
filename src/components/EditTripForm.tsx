import { useState } from "react";
import type { Trip } from "../types";

interface EditTripFormProps {
    trip: Trip;
    onSave: (updatedTrip: Trip) => void;
    onCancel: () => void;
}

export default function EditTripForm({ trip, onSave, onCancel }: Readonly<EditTripFormProps>) {
    const [form, setForm] = useState<Trip>(trip);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(form);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col gap-2"
        >
            <h2 className="font-semibold text-lg mb-2 text-blue-600">
                ✏️ Reise bearbeiten
            </h2>

            <input
                type="text"
                name="title"
                placeholder="Titel"
                value={form.title}
                onChange={handleChange}
                className="border p-2 rounded"
            />

            <input
                type="text"
                name="location"
                placeholder="Ort"
                value={form.location}
                onChange={handleChange}
                className="border p-2 rounded"
            />

            <input
                type="date"
                name="date"
                value={
                    form.date
                        ? new Date(form.date).toISOString().split("T")[0]
                        : ""
                }
                onChange={(e) =>
                    setForm({ ...form, date: new Date(e.target.value) })
                }
                className="border p-2 rounded"
            />

            <input
                type="text"
                name="image"
                placeholder="Bild-URL"
                value={form.image}
                onChange={handleChange}
                className="border p-2 rounded"
            />

            <textarea
                name="notes"
                placeholder="Notizen"
                value={form.notes}
                onChange={handleChange}
                className="border p-2 rounded resize-none"
            />

            <div className="flex gap-2 mt-3">
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                    💾 Speichern
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition"
                >
                    Abbrechen
                </button>
            </div>
        </form>
    );
}
