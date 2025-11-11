import { useState, useEffect } from "react";

interface Item {
    id: string;
    name: string;
    packed: boolean;
}

const STORAGE_KEY = "packingList";

export default function PackingList() {
    const [items, setItems] = useState<Item[]>(() => {
        // 🔄 Laden aus localStorage beim Start
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            const parsed = saved ? JSON.parse(saved) : [];
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    });

    const [newItem, setNewItem] = useState("");

    // 💾 Speichern bei jeder Änderung
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch (error) {
            console.error("Fehler beim Speichern der Packliste:", error);
        }
    }, [items]);

    // ➕ Neues Item hinzufügen
    const addItem = () => {
        if (!newItem.trim()) return;
        const item: Item = {
            id: (crypto as any).randomUUID?.() ?? Date.now().toString(),
            name: newItem.trim(),
            packed: false,
        };
        setItems((prev) => [...prev, item]);
        setNewItem("");
    };

    // ✅ Eintrag abhaken
    const togglePacked = (id: string) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, packed: !item.packed } : item
            )
        );
    };

    // ❌ Item löschen
    const deleteItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    // 🧹 Alles löschen
    const clearAll = () => {
        if (confirm("Packliste wirklich leeren?")) {
            setItems([]);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen px-4 py-8 sm:px-6 lg:px-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 text-center mb-8">
                🎒 Packliste
            </h1>

            <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-8 space-y-5">
                {/* Eingabe */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addItem()}
                        className="flex-1 border rounded-lg p-2"
                        placeholder="z. B. Sonnenbrille"
                    />
                    <button
                        onClick={addItem}
                        className="bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"                    >
                        ➕
                    </button>
                </div>

                {/* Liste */}
                {items.length === 0 ? (
                    <p className="text-center text-gray-500 py-6 text-sm sm:text-base">Noch nichts gepackt ✈️</p>
                ) : (
                <ul className="divide-y divide-gray-200">
                    {items.map((item) => (
                        <li key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={item.packed}
                                    onChange={() => togglePacked(item.id)}
                                    className="h-4 w-4 accent-blue-600"
                                />
                                <span
                                    className={`text-base sm:text-lg ${item.packed
                                            ? "line-through text-gray-400"
                                            : "text-gray-800"
                                        }`}
                                >
                                    {item.name}
                                </span>
                            </label>
                            <button
                                onClick={() => deleteItem(item.id)}
                                className="text-red-500 text-white w-6 h-8 flex items-center justify-center rounded-full hover:text-red-700 transition self-end sm:self-auto"
                            >
                                🗑️
                            </button>
                        </li>
                    ))}
                    </ul>
                )}

                {/* Liste leeren */}
                {items.length > 0 && (
                    <button
                        onClick={clearAll}
                        className="w-full bg-red-500 text-white py-2 sm:py-3 rounded-lg hover:bg-red-600 transition font-medium text-sm sm:text-base"
                    >
                        Liste leeren
                    </button>
                )}
            </div>
        </div>
    );
}