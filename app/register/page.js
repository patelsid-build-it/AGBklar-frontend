"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleEmailSignup(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password
    }, { redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/` });

    if (error) alert(error.message);
    else alert("Check your email for confirmation link.");
  }

  async function handleGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/` }
    });
    if (error) alert(error.message);
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create account</h1>
      <form onSubmit={handleEmailSignup} className="flex flex-col gap-3">
        <input required type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} className="p-2 border"/>
        <input required type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} className="p-2 border"/>
        <button className="p-2 bg-black text-white">Sign up</button>
      </form>
      <div className="mt-4">
        <button onClick={handleGoogle} className="p-2 border">Sign up with Google</button>
      </div>
    </div>
  );
}
