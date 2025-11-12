import { useEffect, useState } from "react";

interface WeatherInfoProps {
    location: string;
}

interface WeatherData {
    temp: number;
    description: string;
    icon: string;
}

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY; // 🔑 aus .env-Datei

export default function WeatherInfo({ location }: Readonly<WeatherInfoProps>) {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!location) return;

        const fetchWeather = async () => {
            try {
                if (!API_KEY) {
                    console.error("❌ Kein API-Key gefunden! Bitte .env prüfen.");
                    setError("API-Key fehlt.");
                    return;
                }

                setLoading(true);
                setError(null);

                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
                        location
                    )}&appid=${API_KEY}&units=metric&lang=de`
                );

                const data = await response.json();

                if (data.cod !== 200) {
                    throw new Error(data.message || "Ort nicht gefunden");
                }

                setWeather({
                    temp: data.main.temp,
                    description: data.weather[0].description,
                    icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                });
            } catch (err: any) {
                console.error("Fehler beim Laden des Wetters:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [location]);

    // Ladezustände
    if (loading) return <p className="text-sm text-gray-400">Wetter wird geladen …</p>;
    if (error) return <p className="text-sm text-red-500">⚠️ {error}</p>;
    if (!weather) return null;

    // Anzeige des Wetters
    return (
        <article className="flex items-center gap-3 mt-3 bg-blue-50 rounded-lg p-2 shadow-sm">
            <img
                src={weather.icon}
                alt={weather.description}
                className="h-10 w-10"
            />
            <div>
                <p className="font-medium text-blue-700">{location}</p>
                <p className="text-sm text-gray-700 capitalize">
                    {weather.description}, {Math.round(weather.temp)}°C
                </p>
            </div>
        </article>
    ); 
} 
