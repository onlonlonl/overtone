// Overtone · 泛音
// Edge Function: overtone-api
// Deploy with: supabase functions deploy overtone-api --project-ref YOUR_PROJECT_REF
// Or via Claude with Supabase MCP (verify_jwt: false)

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  const url = new URL(req.url);
  const path = url.pathname.replace("/overtone-api", "") || "/";
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const sb = createClient(supabaseUrl, supabaseKey);

  try {
    // GET /performances — list all performances
    if (req.method === "GET" && (path === "/" || path === "/performances")) {
      const { data, error } = await sb
        .from("piano_performances")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) return json({ error: error.message }, 500);
      return json(data);
    }

    // POST /performances — create a new performance
    if (req.method === "POST" && (path === "/" || path === "/performances")) {
      const body = await req.json();
      const { data, error } = await sb
        .from("piano_performances")
        .insert({
          title: body.title || "Untitled",
          message: body.message || null,
          notes: body.notes,
          duration_ms: body.duration_ms,
          note_count: body.note_count,
          performer: body.performer || "user",
        })
        .select()
        .single();
      if (error) return json({ error: error.message }, 500);
      return json(data, 201);
    }

    // PATCH /performances/:id — update (for Lux responses)
    if (req.method === "PATCH" && path.startsWith("/performances/")) {
      const id = path.split("/").pop();
      const body = await req.json();
      const update: Record<string, unknown> = {};
      if (body.response !== undefined) update.response = body.response;
      if (body.title !== undefined) update.title = body.title;
      const { data, error } = await sb
        .from("piano_performances")
        .update(update)
        .eq("id", id)
        .select()
        .single();
      if (error) return json({ error: error.message }, 500);
      return json(data);
    }

    return json({ error: "Not found" }, 404);
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});
