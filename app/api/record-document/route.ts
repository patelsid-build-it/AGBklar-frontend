// @ts-nocheck
import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
// helper: start of current month (billing)
function getMonthStartISO() {
  const d = new Date();
  d.setUTCHours(0,0,0,0);
  d.setUTCDate(1);
  d.setUTCMonth(d.getUTCMonth());
  return d.toISOString();
}

export const POST = async (req) => {
  try {
    const authHeader = req.headers.get("authorization") || "";
    if (!authHeader.startsWith("Bearer ")) return NextResponse.json({ error: "Missing auth" }, { status: 401 });
    const token = authHeader.replace("Bearer ", "");

    // 1) get user by token using Supabase Admin
    const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);
    if (userError || !userData?.user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    const user = userData.user;

    // 2) fetch profile (plan)
    const { data: profileRows } = await supabaseAdmin
      .from("profiles")
      .select("plan")
      .eq("id", user.id)
      .limit(1)
      .maybeSingle();

    const plan = profileRows?.plan ?? "starter";

    // 3) count docs for this billing period (month start)
    const monthStart = getMonthStartISO();
    const { count } = await supabaseAdmin
      .from("documents")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gte("created_at", monthStart);

    // quota
    const freeLimit = 5;
    const proLimit = 100;
    const used = count || 0;
    const limit = plan === "pro" ? proLimit : freeLimit;
    if (used >= limit) {
      return NextResponse.json({ error: "Quota exceeded", used, limit }, { status: 403 });
    }

    // 4) Insert doc record (you may include filename from body)
    const body = await req.json();
    const filename = body.filename || "uploaded.pdf";
    const insertRes = await supabaseAdmin
      .from("documents")
      .insert([{ user_id: user.id, filename, pages: body.pages || null }]);

    return NextResponse.json({ ok: true, used: used + 1, limit });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
