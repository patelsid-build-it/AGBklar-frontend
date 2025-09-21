import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-center p-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        AGBKlar.de
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Verstehe endlich, was in deinen Verträgen steht. 
        KI-gestützte AGB-Zusammenfassungen – klar und verständlich.
      </p>
      <form 
        action="https://formspree.io/f/xrbyzegz" 
        method="POST" 
        className="flex gap-2"
      >
        <input 
          type="email" 
          name="email" 
          required 
          placeholder="Deine E-Mail" 
          className="px-4 py-2 border rounded-lg w-72"
        />
        <button 
          type="submit" 
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          Join Waitlist
        </button>
      </form>
    </main>
  );
}
