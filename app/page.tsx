export default function Home() {
  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-bold mb-4">AGBklar — Verträge verstehen</h1>
      <p className="text-lg text-gray-600 mb-6">
        Lade deine AGB hoch und erhalte eine verständliche Zusammenfassung mit Risikohinweisen.
      </p>
      <div className="flex justify-center gap-3">
        <a href="/upload" className="px-6 py-3 bg-black text-white rounded-md">Upload & Analyse</a>
        <a href="/register" className="px-6 py-3 border rounded-md">Anmelden</a>
      </div>
      <p className="mt-8 text-sm text-gray-500">
        Freemium: 5 Dokumente kostenlos — Pro: 4.99€/Monat (100 Dokumente)
      </p>
    </div>
  );
}
