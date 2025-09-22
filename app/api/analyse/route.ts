export const dynamic = "force-dynamic";
// @ts-nocheck
import { NextResponse } from "next/server";
import OpenAI from "openai";
import pdf from "pdf-parse";

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
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const text = await pdf(buffer);

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: text.text.slice(0, 6000) },
    ],
    temperature: 0,
  });

  let result;
  try {
    result = JSON.parse(completion.choices[0].message?.content || "{}");
  } catch (err) {
    result = { error: "Parsing JSON failed", raw: completion.choices[0].message?.content };
  }

  return NextResponse.json(result);
}
