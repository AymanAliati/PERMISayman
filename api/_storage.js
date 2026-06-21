import { del, list, put } from "@vercel/blob";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const dataDir = join(root, "server", "data");
const statePath = join(dataDir, "state.json");
const STATE_KEY = "permisayman/state.json";

export const defaultState = {
  examDate: "2026-06-30",
  tasks: {},
  courseChecks: {},
  series: {},
  videos: {},
  videoChecks: {},
  errors: [],
  updatedAt: ""
};

export async function readSharedState() {
  if (hasBlobToken()) {
    const existing = await findBlob(STATE_KEY);
    if (!existing) return defaultState;
    const response = await fetch(existing.url, { cache: "no-store" });
    if (!response.ok) return defaultState;
    return { ...defaultState, ...(await response.json()) };
  }

  try {
    return { ...defaultState, ...JSON.parse(readFileSync(statePath, "utf8")) };
  } catch {
    return defaultState;
  }
}

export async function writeSharedState(state) {
  const nextState = { ...defaultState, ...state, updatedAt: new Date().toISOString() };
  if (hasBlobToken()) {
    await put(STATE_KEY, JSON.stringify(nextState, null, 2), {
      access: "public",
      contentType: "application/json",
      allowOverwrite: true
    });
    return;
  }

  mkdirSync(dataDir, { recursive: true });
  writeFileSync(statePath, JSON.stringify(nextState, null, 2), "utf8");
}

export async function saveSharedImage(dataUrl, pathname) {
  if (!dataUrl) return "";
  const match = String(dataUrl).match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
  if (!match) throw new Error("Image invalide");
  const buffer = Buffer.from(match[2], "base64");
  const contentType = match[1];
  const extension = contentType.includes("png") ? "png" : contentType.includes("webp") ? "webp" : "jpg";
  const key = `permisayman/uploads/${pathname}.${extension}`;

  if (!hasBlobToken()) return "";
  const blob = await put(key, buffer, {
    access: "public",
    contentType,
    allowOverwrite: true
  });
  return blob.url;
}

export async function deleteSharedImage(url) {
  if (!hasBlobToken() || !url) return;
  await del(url).catch(() => {});
}

function hasBlobToken() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function findBlob(pathname) {
  const result = await list({ prefix: pathname, limit: 1 });
  return result.blobs.find((blob) => blob.pathname === pathname) || null;
}
