import { deleteSharedImage, readSharedState, writeSharedState } from "../_storage.js";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "DELETE") {
    res.setHeader("Allow", "DELETE");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { id } = req.query;
  const state = await readSharedState();
  const error = (state.errors || []).find((item) => item.id === id);
  state.errors = (state.errors || []).filter((item) => item.id !== id);
  await writeSharedState(state);
  if (error) {
    await deleteSharedImage(error.imageUrl);
    await deleteSharedImage(error.thumbUrl);
  }
  return res.status(200).json({ ok: true });
}
