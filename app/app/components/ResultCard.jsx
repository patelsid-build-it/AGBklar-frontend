// components/ResultCard.jsx
export default function ResultCard({ data }) {
  if (!data) return null;
  const clauses = data.clauses || [];
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold">Zusammenfassung</h3>
      <p className="text-sm text-gray-700 mt-2">{data.overall_summary}</p>
      <div className="mt-4">
        <h4 className="font-medium">Erkannte Klauseln</h4>
        <ul className="mt-2 space-y-3">
          {clauses.map((c, i) => (
            <li key={i} className="p-3 border rounded">
              <div className="flex justify-between items-start">
                <div>
                  <strong className="capitalize">{c.type.replaceAll("_"," ")}</strong>
                  <div className="text-sm text-gray-600">{c.summary}</div>
                </div>
                <div className={`text-sm font-bold ${c.risk_level === 'high' ? 'text-red-600' : c.risk_level === 'medium' ? 'text-yellow-600' : 'text-green-600'}`}>
                  {c.risk_level}
                </div>
              </div>
              <details className="mt-2 text-xs text-gray-700">
                <summary className="cursor-pointer">Originaltext</summary>
                <div className="mt-1 whitespace-pre-wrap">{c.text_original}</div>
              </details>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 text-xs text-gray-500">
        Dies ist eine automatisierte Übersicht. Keine Rechtsberatung nach RDG.
      </div>
    </div>
  );
}
