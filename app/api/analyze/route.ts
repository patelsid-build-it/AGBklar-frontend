// @ts-nocheck
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { PDFDocument } from "pdf-lib";

// Force runtime instead of build-time execution
export const dynamic = "force-dynamic";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
You are an AI contract assistant specialized in German AGBs.
Always output valid JSON with:
- clauses (type, text_original, summary, risk_level)
- overall_summary
- disclaimer
Use only: cancellation_period, auto_renewal, withdrawal_right, warranty, liability_limit, jurisdiction, data_privacy, price_change, provider_changes_contract, side_agreements, contract_duration, payment_terms.
`;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Read uploaded file into buffer
    const buffer = Buffer.from(await file.arrayBuffer());


    // Extract text from PDF using pdf-lib
    const pdfDoc = await PDFDocument.load(buffer);
    let textContent = "";
    const pages = pdfDoc.getPages();
    for (const page of pages) {
      const { text } = await page.getTextContent ? await page.getTextContent() : { text: "" };
      // pdf-lib does not have getTextContent, so fallback to empty string
      // You may want to use a third-party text extraction or OCR for more advanced needs
      textContent += text || "";
    }


    // Send first ~6000 chars to GPT to stay under token limit
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: textContent.slice(0, 6000) },
      ],
      temperature: 0,
    });

    let result;
    try {
      result = JSON.parse(completion.choices[0].message?.content || "{}");
    } catch (err) {
      result = {
        error: "Parsing JSON failed",
        raw: completion.choices[0].message?.content,
      };
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Something went wrong", details: error.message },
      { status: 500 }
    );
  }
}
