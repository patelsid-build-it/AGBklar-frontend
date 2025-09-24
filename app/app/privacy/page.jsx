// app/privacy/page.jsx
export default function Privacy() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Datenschutzerklärung</h1>
      <p className="mb-2">
        Wir verarbeiten personenbezogene Daten gemäß DSGVO. Diese Seite beschreibt welche Daten wir verarbeiten und zu welchen Zwecken.
      </p>

      <h2 className="font-semibold mt-4">1. Verantwortlicher</h2>
      <p>AGBklar — Ansprechpartner: support@agbklar.de</p>

      <h2 className="font-semibold mt-4">2. Zweck der Verarbeitung</h2>
      <p>
        Verarbeitung von Account-Informationen, Speicherung von anonymisierten Analysen. Roh-PDFs werden nur mit ausdrücklicher Zustimmung gespeichert.
      </p>

      <h2 className="font-semibold mt-4">3. Rechtsgrundlage</h2>
      <p>Art.6(1)(b) DSGVO für Vertragsabwicklung; Art.6(1)(a) für Einwilligung.</p>

      <h2 className="font-semibold mt-4">4. Rechte der betroffenen Personen</h2>
      <p>
        Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit. Kontakt: support@agbklar.de
      </p>

      <p className="mt-4 text-sm text-gray-500">
        Diese Datenschutzerklärung ist eine Vorlage. Bitte anpassen und ggf. juristisch prüfen.
      </p>
    </div>
  );
}
