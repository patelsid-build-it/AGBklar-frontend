// app/impressum/page.jsx
export default function Impressum() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Impressum</h1>
      <p><strong>Betreiber:</strong> Dein Name / Firmenname</p>
      <p><strong>Adresse:</strong> Musterstraße 1, 12345 Stadt, Deutschland</p>
      <p><strong>Kontakt:</strong> support@agbklar.de</p>
      <p><strong>Handelsregister:</strong> Amtsgericht Musterstadt, HRB 12345</p>
      <p><strong>USt-IdNr:</strong> DE123456789</p>
      <p className="mt-4 text-sm text-gray-600">
        Hinweis: Dies ist ein Muster-Impressum. Bitte prüfe mit einem Anwalt.
      </p>
    </div>
  );
}
