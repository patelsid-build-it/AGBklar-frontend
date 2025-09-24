// app/upload/page.jsx
"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import LoadingSpinner from "../../components/LoadingSpinner";
import ResultCard from "../../components/ResultCard";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!file) return setError("Bitte wähle eine PDF-Datei.");

    // get session token
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (!token) {
      window.location.href = "/login";
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Server error");
      }
      const json = await res.json();
      setResult(json);

      // record usage
      await fetch("/api/record-document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ filename: file.name }),
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">AGB hochladen</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded-md"
          disabled={loading}
        >
          {loading ? "Analysiere..." : "Analyse starten"}
        </button>
      </form>

      {loading && <div className="mt-4"><LoadingSpinner /></div>}
      {error && <div className="mt-4 text-red-600">{error}</div>}
      {result && (
        <div className="mt-6">
          <ResultCard data={result} />
        </div>
      )}
    </div>
  );
}
