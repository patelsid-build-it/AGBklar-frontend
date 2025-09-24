// @ts-nocheck
import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../lib/supabaseAdmin";

export async function POST(req) {
  const body = await req.json();
  const { id, full_name = "", plan = "starter" } = body;
  try {
    await supabaseAdmin.from("profiles").upsert({ id, full_name, plan });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
