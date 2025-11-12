import { useState, useEffect, useMemo } from "react";

interface BucketItem {
    id: string;
    name: string;
    category: string;
    done: boolean;
    budget?: number;
    spent?: number;
}

const STORAGE_KEY = "bucketList";
const CATEGORIES = [
    "Alle",
    "Abenteuer",
    "Städte",
    "Natur",
    "Kultur",
    "Entspannung",
];

// 🎨 Farben pro Kategorie
const CATEGORY_COLORS: Record<string, string> = {
    Abenteuer: "bg-orange-100 text-orange-700 border-orange-300",
    Städte: "bg-blue-100 text-blue-700 border-blue-300",
    Natur: "bg-green-100 text-green-700 border-green-300",
    Kultur: "bg-purple-100 text-purple-700 border-purple-300",
    Entspannung: "bg-pink-100 text-pink-700 border-pink-300",
    Alle: "bg-gray-100 text-gray-600 border-gray-300",
};

export default function BucketList() {
    const [items, setItems] = useState<BucketItem[]>(() => {
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
    const [category, setCategory] = useState("Abenteuer");
    const [filter, setFilter] = useState("Alle");
    const [sortBy, setSortBy] = useState("name");
    const [sortAsc, setSortAsc] = useState(true);

    // 💾 Speichern bei jeder Änderung
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch (error) {
            console.error("Fehler beim Speichern der Packliste:", error);
        }
    }, [items]);

    // 📊 Gesamtbudget berechnen via useMemo
    const totals = useMemo(() => {
        const totalBudget = items.reduce((sum, i) => sum + (i.budget ?? 0), 0);
        const totalSpent = items.reduce((sum, i) => sum + (i.spent ?? 0), 0);
        const remaining = totalBudget - totalSpent;
        const percent =
            totalBudget > 0 ? Math.min((totalSpent / totalBudget) * 100, 100) : 0;
        return { totalBudget, totalSpent, remaining, percent };
    }, [items]);

    // 🔧 Allgemeine Update-Funktion → ersetzt tiefe Verschachtelung
    const updateItem = (id: string, field: keyof BucketItem, value: any) => {
        setItems((prev) =>
            prev.map((it) => (it.id === id ? { ...it, [field]: value } : it))
        );
    };

    // ➕ Neues Ziel hinzufügen
    const addItem = () => {
        if (!newItem.trim()) return;
        const item: BucketItem = {
            id: crypto.randomUUID?.() ?? Date.now().toString(),
            name: newItem.trim(),
            category,
            done: false,
            budget: 0,
            spent: 0,
        };
        setItems((prev) => [...prev, item]);
        setNewItem("");
    };

    // ✅ Ziel abhaken
    const toggleDone = (id: string) =>
        updateItem(id, "done", !items.find((i) => i.id === id)?.done);

    // ❌ Ziel löschen
    const deleteItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    // 🧹 Alles löschen
    const clearAll = () => {
        if (confirm("Bucket Liste wirklich leeren?")) {
            setItems([]);
            localStorage.removeItem(STORAGE_KEY);
        }
    };

    // 🧠 Filter + Sortierung anwenden
    const filteredItems = useMemo(() => {
        const order = sortAsc ? 1 : -1;
        return [...items]
            .filter((item) => filter === "Alle" || item.category === filter)
            .sort((a, b) => {
                switch (sortBy) {
                    case "name":
                        return order * a.name.localeCompare(b.name);
                    case "category":
                        return order * a.category.localeCompare(b.category);
                    case "done":
                        return order * (Number(a.done) - Number(b.done));
                    case "budget":
                        return order * ((a.budget ?? 0) - (b.budget ?? 0));
                    default:
                        return 0;
                }
            });
    }, [items, filter, sortBy, sortAsc]);

    return (
        <div className="bg-gray-100 min-h-screen px-4 py-8 sm:px-6 lg:px-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 text-center mb-8">
                🪣 Bucket List
            </h1>

            {/* 💰 Gesamtbudget-Anzeige */}
            <div className="max-w-lg mx-auto bg-white shadow-md rounded-2xl p-4 mb-6">
                <div className="flex justify-between text-sm sm:text-base font-medium text-gray-700">
                    <span>Budget: {totals.totalBudget.toFixed(0)} €</span>
                    <span>Ausgegeben: {totals.totalSpent.toFixed(0)} €</span>
                    <span
                        className={`font-semibold ${totals.remaining >= 0 ? "text-green-600" : "text-red-600"
                            }`}
                    >
                        Übrig: {totals.remaining.toFixed(0)} €
                    </span>
                </div>

                <div className="w-full bg-gray-200 h-3 rounded-full mt-3">
                    <div
                        className="h-3 bg-blue-600 rounded-full transition-all"
                        style={{ width: `${totals.percent}%` }}
                    ></div>
                </div>
            </div>
            {/* 💰 Gesamtbudget-Anzeige  Ende */}

            <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-8 space-y-5">
                {/* 🧭 Filter & Sortierung */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-700 text-sm font-medium">Filter:</span>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 text-xs"
                        >
                            {CATEGORIES.map((cat) => (
                                <option key={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-gray-700 text-sm font-medium">
                            Sortieren nach:
                        </span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 text-xs"
                        >
                            <option value="name">Name (A–Z)</option>
                            <option value="category">Kategorie</option>
                            <option value="done">Status</option>
                            <option value="budget">Budget (€)</option>
                        </select>

                        <button
                            onClick={() => setSortAsc(!sortAsc)}
                            className="text-gray-500 w-6 h-8 flex items-center justify-center rounded-full hover:text-blue-600"
                        >
                            {sortAsc ? "▲" : "▼"}
                        </button>
                    </div>
                </div>

                {/* ➕ Neues Ziel */}
                <div className="flex flex-col sm:flex-row gap-3">
                    {/* Zeile 1: Name */}
                    <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addItem()}
                        className="flex-1 min-w-[250px] border rounded-lg p-2"
                        placeholder="z. B. Nordlichter sehen 🌌"
                    />
                    {/* Zeile 2: Kategorie + Button */}
                    <div className="flex gap-3">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="min-w-[120px] border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 text-xs"
                        >
                            {CATEGORIES.filter((c) => c !== "Alle").map((cat) => (
                                <option key={cat}>{cat}</option>
                            ))}
                        </select>
                        <button
                            onClick={addItem}
                            className="bg-blue-700 text-white w-6 h-8 flex items-center justify-center rounded-full hover:bg-blue-500 transition"
                            title="Ziel hinzufügen"
                        >
                            ➕
                        </button>
                    </div>
                </div>

                {/* Liste */}
                {filteredItems.length === 0 ? (
                    <p className="text-center text-gray-500 py-6 text-sm sm:text-base">
                        Noch keine Träume hinzugefügt ✨
                    </p>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {filteredItems.map((item) => {
                            const remaining =
                                item.budget !== undefined && item.spent !== undefined
                                    ? item.budget - item.spent
                                    : undefined;

                            return (
                                <li key={item.id} className="py-3 border-b border-gray-200">
                                    <div className="flex justify-between items-center">
                                        {/* 🏷️ Checkbox + Name + Kategorie */}
                                        <label className="flex items-center gap-2 flex-1">
                                            <input
                                                type="checkbox"
                                                checked={item.done}
                                                onChange={() => toggleDone(item.id)}
                                                className="h-4 w-4 accent-blue-600"
                                            />

                                            <span
                                                className={`text-base sm:text-lg ${item.done
                                                        ? "line-through text-gray-400"
                                                        : "text-gray-800"
                                                    }`}
                                            >
                                                {item.name}
                                            </span>
                                            {/* 🏷️ Kategorie-Tag */}
                                            <span
                                                className={`inline-block mt-1 text-xs font-medium border rounded-full px-2 py-0.5  ${CATEGORY_COLORS[item.category] ||
                                                    CATEGORY_COLORS["Alle"]
                                                    }`}
                                            >
                                                {item.category}
                                            </span>
                                        </label>
                                        {/* 🗑️ Rechte Seite: Löschen */}
                                        <button
                                            onClick={() => deleteItem(item.id)}
                                            className="text-red-500 text-white w-6 h-8 flex items-center justify-center rounded-full hover:text-red-700 transition"
                                            title="Ziel löschen"
                                        >
                                            🗑️
                                        </button>
                                    </div>

                                    {/* 💰 Budget / Ausgaben */}
                                    <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-gray-700">
                                        <label className="flex items-center gap-1 text-gray-600 font-medium text-xs text-left mb-1">
                                            Budget (€)
                                            <input
                                                type="number"
                                                value={item.budget ?? 0}
                                                onChange={(e) =>
                                                    updateItem(item.id, "budget", Number(e.target.value))
                                                }
                                                className="w-20 border rounded-lg p-1 text-right"
                                            />
                                        </label>

                                        <label className=" flex items-center gap-1 text-gray-600 font-medium text-xs mb-1">
                                            Ausgaben (€)
                                            <input
                                                type="number"
                                                value={item.spent ?? 0}
                                                onChange={(e) =>
                                                    updateItem(item.id, "spent", Number(e.target.value))
                                                }
                                                className="w-20 border rounded-lg p-1 text-right"
                                            />
                                        </label>

                                        {remaining !== undefined && (
                                            <span
                                                className={`font-medium ${remaining >= 0 ? "text-green-600" : "text-red-600"
                                                    }`}
                                            >
                                                Rest: {remaining.toFixed(0)} €
                                            </span>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
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
