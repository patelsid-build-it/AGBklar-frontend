// components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-10">
      <div className="max-w-4xl mx-auto px-4 py-6 text-sm text-gray-600">
        <div>
          © {new Date().getFullYear()} AGBklar —{" "}
          <a href="/impressum" className="underline">Impressum</a> •{" "}
          <a href="/privacy" className="underline">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
