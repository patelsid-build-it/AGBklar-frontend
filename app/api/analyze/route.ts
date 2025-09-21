import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { textContent, documentType = 'AGB' } = await request.json();

    if (!textContent) {
      return NextResponse.json({ error: 'No text content provided' }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
    }

    // Truncate text if too long (OpenAI has token limits)
    const maxLength = 12000; // Roughly 3000 tokens
    const truncatedText = textContent.length > maxLength 
      ? textContent.substring(0, maxLength) + '...' 
      : textContent;

    const prompt = `Analysiere das folgende ${documentType} Dokument und erstelle eine klare, verständliche Zusammenfassung auf Deutsch. 

Fokussiere auf:
1. Wichtige Rechte und Pflichten
2. Kündigungsbedingungen
3. Kosten und Gebühren
4. Datenschutz und Haftung
5. Besondere Klauseln oder Risiken

Dokument:
${truncatedText}

Erstelle eine strukturierte Zusammenfassung mit klaren Überschriften und verständlicher Sprache.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Du bist ein Experte für deutsche Rechtstexte und AGB. Erstelle klare, verständliche Zusammenfassungen von Verträgen und Geschäftsbedingungen."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1500,
      temperature: 0.3,
    });

    const summary = completion.choices[0]?.message?.content;

    if (!summary) {
      return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      summary: summary,
      documentType: documentType,
      originalLength: textContent.length,
      processedLength: truncatedText.length
    });

  } catch (error) {
    console.error('Analysis error:', error);
    
    if (error instanceof Error && error.message.includes('API key')) {
      return NextResponse.json(
        { error: 'OpenAI API key is invalid or missing' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to analyze document' },
      { status: 500 }
    );
  }
}
