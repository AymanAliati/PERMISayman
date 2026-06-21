import { readSharedState, writeSharedState } from "./_storage.js";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json(await readSharedState());
  }

  if (req.method === "PUT") {
    const state = parseBody(req);
    await writeSharedState(state);
    return res.status(200).json({ ok: true, state: { ...state, updatedAt: new Date().toISOString() } });
  }

  res.setHeader("Allow", "GET, PUT");
  return res.status(405).json({ ok: false, error: "Method not allowed" });
}

function parseBody(req) {
  if (!req.body) return {};
  if (typeof req.body === "string") return JSON.parse(req.body);
  return req.body;
}
