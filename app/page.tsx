"use client";
import { useState } from "react";

export default function Home() {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload(e: any) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", e.target.file.files[0]);

    const res = await fetch("/api/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setSummary(data);
    setLoading(false);
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4">AGBKlar.de</h1>
      <form onSubmit={handleUpload} className="flex flex-col items-center gap-4">
        <input type="file" name="file" accept=".pdf,.txt" required />
        <button type="submit" className="px-4 py-2 bg-black text-white rounded-lg">
          Analyse hochladen
        </button>
      </form>

      {loading && <p className="mt-4">Analysiere Dokument... ⏳</p>}

      {summary && (
        <div className="mt-6 p-4 border w-full max-w-xl text-left bg-white shadow">
          <h2 className="font-bold mb-2">Zusammenfassung</h2>
          <pre className="whitespace-pre-wrap text-sm">
            {JSON.stringify(summary, null, 2)}
          </pre>
        </div>
      )}
    </main>
  );
}
