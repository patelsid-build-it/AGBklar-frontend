// components/Header.jsx
"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener?.subscription?.unsubscribe?.();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <header className="bg-white border-b">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="AGBklar" className="h-8 w-8 object-contain" />
          <span className="font-semibold text-lg">AGBklar</span>
        </a>

        <nav className="flex items-center gap-4">
          <a href="/upload" className="text-sm">Upload</a>
          <a href="/impressum" className="text-sm">Impressum</a>
          <a href="/privacy" className="text-sm">Privacy</a>

          {user ? (
            <>
              <span className="text-sm text-gray-600 hidden sm:inline">{user.email}</span>
              <button
                onClick={signOut}
                className="ml-2 px-3 py-1 rounded-md bg-red-500 text-white text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <a href="/register" className="px-3 py-1 rounded-md bg-black text-white text-sm">
              Sign up / Login
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
