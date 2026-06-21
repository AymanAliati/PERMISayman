import { readSharedState, saveSharedImage, writeSharedState } from "./_storage.js";
import { randomUUID } from "node:crypto";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const body = parseBody(req);
  const id = body.id || randomUUID();
  const metadata = body.metadata || {};
  const imageUrl = await saveSharedImage(body.imageDataUrl, `${id}-original`);
  const thumbUrl = await saveSharedImage(body.thumbDataUrl, `${id}-thumb`);
  const error = {
    ...metadata,
    id,
    imageUrl: imageUrl || metadata.imageUrl || "",
    thumbUrl: thumbUrl || metadata.thumbUrl || "",
    date: metadata.date || new Date().toISOString(),
    reviewed: Boolean(metadata.reviewed)
  };

  const state = await readSharedState();
  state.errors = [error, ...(state.errors || []).filter((item) => item.id !== id)];
  await writeSharedState(state);
  return res.status(200).json({ ok: true, error });
}

function parseBody(req) {
  if (!req.body) return {};
  if (typeof req.body === "string") return JSON.parse(req.body);
  return req.body;
}
