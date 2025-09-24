// components/CookieBanner.jsx
"use client";
import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const accepted = localStorage.getItem("cookies_accepted");
    if (!accepted) setShow(true);
  }, []);
  function accept() {
    localStorage.setItem("cookies_accepted", "1");
    setShow(false);
  }
  if (!show) return null;
  return (
    <div className="fixed bottom-4 right-4 bg-white border p-3 rounded shadow-sm w-11/12 max-w-md">
      <div className="text-sm">
        Wir nutzen Cookies für die Funktionalität. Siehe{" "}
        <a className="underline" href="/privacy">Privacy</a>.
      </div>
      <div className="mt-2 flex justify-end">
        <button onClick={accept} className="px-3 py-1 bg-black text-white rounded">
          Akzeptieren
        </button>
      </div>
    </div>
  );
}
