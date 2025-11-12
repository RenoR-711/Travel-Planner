import { useState, useEffect } from "react";
import AddTripForm from "./AddTripForm";

interface Trip {
    id?: string;
    title: string;
    location: string;
    date: Date | null;
    image: string;
    notes: string;
}

export default function TripsPage() {
    const [trips, setTrips] = useState<Trip[]>([]);

    
    // Beim ersten Laden: Daten aus localStorage holen
    useEffect(() => {
        const savedTrips = localStorage.getItem("trips");
        if (savedTrips) {
            // Dates als ISO-Strings -> wieder in Date-Objekte umwandeln
            const parsed = JSON.parse(savedTrips).map((trip: Trip) => ({
                ...trip,
                date: trip.date ? new Date(trip.date) : null,
            }));
            setTrips(parsed);
        }
    }, []);

    // Wenn sich trips ändert: in localStorage speichern
    useEffect(() => {
        localStorage.setItem("trips", JSON.stringify(trips));
    }, [trips]);

    // Funktion, die AddTripForm aufruft
    const handleAddTrip = (newTrip: Trip) => {
        setTrips((prevTrips) => [...prevTrips, newTrip]);
    };

    return (
        <div className="p-4">
            <AddTripForm onAddTrip={handleAddTrip} />

            <h2 className="text-xl font-semibold mt-6 mb-4 text-gray-800">
                Deine Reisen 🌍
            </h2>

            {trips.length === 0 ? (
                <p className="text-gray-500">Noch keine Reisen gespeichert.</p>
            ) : (
                <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {trips.map((trip) => (
                        <li
                            key={trip.id}
                            className="bg-white shadow-md rounded-xl overflow-hidden"
                        >
                            <img
                                src={trip.image}
                                alt={trip.title}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-3">
                                <h3 className="font-semibold text-lg">{trip.title}</h3>
                                <p className="text-sm text-gray-600">{trip.location}</p>
                                {trip.date && (
                                    <p className="text-sm text-gray-500">
                                        {trip.date.toLocaleDateString("de-DE")}
                                    </p>
                                )}
                                {trip.notes && (
                                    <p className="text-sm text-gray-700 mt-1">{trip.notes}</p>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
