<p align="center">
  <img src="./public/logo.png" alt="Travel Planner Logo" width="120" />
</p>

<h1 align="center">🌍 Travel Planner</h1>

<p align="center">
  Dein smarter Reise-Organisator mit <strong>Trip-Dashboard</strong>, <strong>Packliste</strong> und <strong>Bucket List</strong>.<br/>
  Gebaut mit ❤️ in <a href="https://react.dev" target="_blank"><b>React</b></a>, <a href="https://www.typescriptlang.org/" target="_blank"><b>TypeScript</b></a> & <a href="https://tailwindcss.com/" target="_blank"><b>TailwindCSS</b></a>.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.0-blue?logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Vite-Fast%20Builds-yellow?logo=vite" />
  <img src="https://img.shields.io/badge/License-MIT-green" />
</p>

---

## ✨ Features

### 🌍 **Reise-Dashboard**

- Reisen anlegen mit Titel, Ort, Datum, Notizen und Bild  
- Bestehende Trips bearbeiten oder löschen  
- Speicherung im Browser via `localStorage`

### 🎒 **Packliste**

- Dinge hinzufügen, abhaken oder löschen  
- Fortschritt bleibt beim Neuladen erhalten  
- Speicherort: `localStorage["packingList"]`

### 🪣 **Bucket List**

- Persönliche Ziele mit Kategorie, Budget und Ausgaben  
- Sortier- und Filteroptionen  
- Dynamischer Fortschrittsbalken für Budget
- Vollständige Speicherung im `localStorage["bucketList"]`

### 🔍 **Filter & Sortierung**

- Sortiere nach Name, Kategorie, Budget oder Status und filtere Ziele z. B. nach Abenteuer oder Natur.
  
---

## 🖼️ Vorschau

| Dashboard                                            | Packliste                                              | Bucket List                                             |
| ---------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------- |
| ![Dashboard Screenshot](./src/screenshots/dashboard.png) | ![Packliste Screenshot](./src/screenshots/packinglist.png) | ![Bucket List Screenshot](./src/screenshots/bucketlist.png) |


---

## 🧱 Tech Stack

```bash
| Technologie         | Beschreibung                 |
| ------------------- | ---------------------------- |
| ⚛️ **React**        | UI-Framework                 |
| 🧩 **TypeScript**   | Typisierte Komponenten       |
| 🎨 **TailwindCSS**  | Styling & Responsive Design  |
| 🌐 **React Router** | Navigation zwischen Seiten   |
| ⚡ **Vite**         | Entwicklungsserver & Bundler |
| 💾 **localStorage** | Persistente Datenspeicherung |
```

## 📁 Projektstruktur

```bash
travel-planner/
├── src/
│ ├── components/
│ │ ├── Navbar.tsx
│ │ ├── TripCard.tsx
│ │ ├── AddTripForm.tsx
│ │ ├── EditTripForm.tsx
│ ├── pages/
│ │ ├── Dashboard.tsx
│ │ ├── PackingList.tsx
│ │ ├── BucketList.tsx
│ ├── types/
│ │ └── Trip.ts
│ ├── App.tsx
│ ├── main.tsx
│ └── index.css
├── public/
│ └── index.html
├── package.json
└── README.md
```

## ⚙️ Installation

https://renor-711.github.io/Travel-Planner/

```bash
# 1️⃣ Projekt klonen
git clone https://renor-711.github.io/Travel-Planner/
cd travel-planner

# 2️⃣ Abhängigkeiten installieren
npm install

# 3️⃣ Entwicklungsserver starten
npm run dev
```

👉 Danach öffne: <http://localhost:5173>

## 🗺️ Navigation

| Seite         | Pfad          | Beschreibung                  |
| ------------- | ------------- | ----------------------------- |
| 🏠 Dashboard   | `/`           | Übersicht aller Reisen        |
| 🎒 Packliste   | `/packlist`   | Persönliche Reise-Packliste   |
| 🪣 Bucket List | `/bucketlist` | Lebensziele mit Budgetplanung |

---
## 💡 Tipps

- Alle Daten werden **automatisch gespeichert**
- Um alle Daten zu löschen:
- Öffne die Browser-Konsole → localStorage.clear()
- Deployment über **Vercel** oder **Netlify** ist in Sekunden möglich

## 🔒 Datenschutz

Alle Daten werden **nur lokal** im Browser gespeichert.  
Keine Cloud, kein Tracking, keine externen Server (Drittanbieter-Dienste).
Du behältst volle Kontrolle über deine Daten. ✅

## 🌟 Roadmap (Zukunftsplan)

- [ ] 📤 Export als CSV oder PDF
- [ ] ☁️ Cloud Sync (z. B. mit Firebase)
- [x] 📅 Kalenderintegration für Trips
- [x] 📍 Kartenansicht mit Leaflet-Integration

## 👨‍💻 Autor

Travel Planner
von [✈️ Renumol Reinhardt]  
📧 renu711@hotmail.de  
🌐 https://renor-711.github.io/Portfolio-Website/