import { readSharedState, writeSharedState } from "./_storage.js";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json(await readSharedState());
  }

  if (req.method === "PUT") {
    await writeSharedState(parseBody(req));
    return res.status(200).json({ ok: true });
  }

  res.setHeader("Allow", "GET, PUT");
  return res.status(405).json({ ok: false, error: "Method not allowed" });
}

function parseBody(req) {
  if (!req.body) return {};
  if (typeof req.body === "string") return JSON.parse(req.body);
  return req.body;
}
