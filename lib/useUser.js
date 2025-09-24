import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export function useUser() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.unsubscribe();
  }, []);
  return user;
}
