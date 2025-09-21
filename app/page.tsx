'use client';

import React, { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [summary, setSummary] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
      setSummary('');
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Analyze with AI (now handles PDF parsing directly)
      const analyzeResponse = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!analyzeResponse.ok) {
        const errorData = await analyzeResponse.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const analyzeData = await analyzeResponse.json();
      
      // Format the structured response for display
      if (analyzeData.clauses && analyzeData.overall_summary) {
        let formattedSummary = `## Gesamtübersicht\n${analyzeData.overall_summary}\n\n`;
        
        if (analyzeData.clauses.length > 0) {
          formattedSummary += `## Wichtige Klauseln\n`;
          analyzeData.clauses.forEach((clause: any) => {
            formattedSummary += `\n**${clause.type}** (Risiko: ${clause.risk_level})\n`;
            formattedSummary += `${clause.summary}\n`;
          });
        }
        
        if (analyzeData.disclaimer) {
          formattedSummary += `\n## Hinweis\n${analyzeData.disclaimer}`;
        }
        
        setSummary(formattedSummary);
      } else if (analyzeData.error) {
        setError(analyzeData.error);
      } else {
        setSummary(JSON.stringify(analyzeData, null, 2));
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-center p-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        AGBKlar.de
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl">
        Verstehe endlich, was in deinen Verträgen steht. 
        KI-gestützte AGB-Zusammenfassungen – klar und verständlich.
      </p>

      {/* File Upload Section */}
      <div className="w-full max-w-md mb-8">
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="w-full mb-4"
              disabled={isUploading}
            />
            <p className="text-sm text-gray-500">
              Nur PDF-Dateien bis 10MB
            </p>
          </div>
          
          <button
            type="submit"
            disabled={!file || isUploading}
            className="w-full px-4 py-2 bg-black text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isUploading ? 'Analysiere...' : 'AGB Analysieren'}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {summary && (
          <div className="mt-6 p-4 bg-white border rounded-lg text-left">
            <h3 className="font-bold text-lg mb-3">AGB-Analyse:</h3>
            <div className="prose prose-sm max-w-none">
              {summary.split('\n').map((line, index) => {
                if (line.startsWith('##')) {
                  return (
                    <h4 key={index} className="font-bold text-base mt-4 mb-2 text-gray-800">
                      {line.replace('##', '')}
                    </h4>
                  );
                } else if (line.startsWith('**') && line.endsWith('**')) {
                  return (
                    <h5 key={index} className="font-semibold text-sm mt-3 mb-1 text-gray-700">
                      {line.replace(/\*\*/g, '')}
                    </h5>
                  );
                } else if (line.trim()) {
                  return (
                    <p key={index} className="mb-2 text-sm leading-relaxed">
                      {line}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}
      </div>

      {/* Email Signup Section */}
      <div className="border-t pt-8 w-full max-w-md">
        <p className="text-sm text-gray-600 mb-4">
          Oder melde dich für Updates an:
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
            className="px-4 py-2 bg-gray-600 text-white rounded-lg"
          >
            Join Waitlist
          </button>
        </form>
      </div>
    </main>
  );
}
