import { createServer } from "node:http";
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";

const root = fileURLToPath(new URL("..", import.meta.url));
const distDir = join(root, "dist");
const dataDir = join(root, "server", "data");
const uploadDir = join(root, "server", "uploads");
const statePath = join(dataDir, "state.json");
const port = Number(process.env.PORT || 5173);

const defaultState = {
  examDate: "2026-06-30",
  tasks: {},
  courseChecks: {},
  series: {},
  videos: {},
  videoChecks: {},
  errors: []
};

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml"
};

mkdirSync(dataDir, { recursive: true });
mkdirSync(uploadDir, { recursive: true });
if (!existsSync(statePath)) writeState(defaultState);

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname === "/api/state" && req.method === "GET") {
      return sendJson(res, readState());
    }

    if (url.pathname === "/api/state" && req.method === "PUT") {
      const body = await readJson(req);
      writeState({ ...defaultState, ...body });
      return sendJson(res, { ok: true });
    }

    if (url.pathname === "/api/errors" && req.method === "POST") {
      const body = await readJson(req, 40 * 1024 * 1024);
      const state = readState();
      const id = body.id || randomUUID();
      const image = saveDataUrl(body.imageDataUrl, `${id}-original`);
      const thumb = saveDataUrl(body.thumbDataUrl, `${id}-thumb`);
      const error = {
        ...body.metadata,
        id,
        imageUrl: image ? `/uploads/${image}` : "",
        thumbUrl: thumb ? `/uploads/${thumb}` : "",
        date: body.metadata?.date || new Date().toISOString(),
        reviewed: Boolean(body.metadata?.reviewed)
      };
      state.errors = [error, ...(state.errors || []).filter((item) => item.id !== id)];
      writeState(state);
      return sendJson(res, { ok: true, error });
    }

    if (url.pathname.startsWith("/api/errors/") && req.method === "DELETE") {
      const id = decodeURIComponent(url.pathname.split("/").pop());
      const state = readState();
      state.errors = (state.errors || []).filter((item) => item.id !== id);
      writeState(state);
      return sendJson(res, { ok: true });
    }

    if (url.pathname.startsWith("/uploads/")) {
      return serveFile(res, join(uploadDir, decodeURIComponent(url.pathname.replace("/uploads/", ""))), uploadDir);
    }

    const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
    const filePath = join(distDir, decodeURIComponent(pathname));
    if (existsSync(filePath) && statSync(filePath).isFile()) return serveFile(res, filePath, distDir);
    return serveFile(res, join(distDir, "index.html"), distDir);
  } catch (error) {
    sendJson(res, { ok: false, error: error.message }, 500);
  }
}).listen(port, "0.0.0.0", () => {
  console.log(`PERMISayman partagé: http://127.0.0.1:${port}`);
});

function readState() {
  try {
    return { ...defaultState, ...JSON.parse(readFileSync(statePath, "utf8")) };
  } catch {
    return defaultState;
  }
}

function writeState(state) {
  writeFileSync(statePath, JSON.stringify({ ...defaultState, ...state }, null, 2), "utf8");
}

function readJson(req, maxSize = 10 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > maxSize) {
        req.destroy();
        reject(new Error("Payload trop grand"));
      }
    });
    req.on("end", () => resolve(data ? JSON.parse(data) : {}));
    req.on("error", reject);
  });
}

function saveDataUrl(dataUrl, basename) {
  if (!dataUrl) return "";
  const match = String(dataUrl).match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
  if (!match) throw new Error("Image invalide");
  const ext = mimeToExt(match[1]);
  const filename = `${basename}${ext}`;
  writeFileSync(join(uploadDir, filename), Buffer.from(match[2], "base64"));
  return filename;
}

function mimeToExt(mime) {
  if (mime.includes("png")) return ".png";
  if (mime.includes("webp")) return ".webp";
  return ".jpg";
}

function serveFile(res, filePath, allowedRoot) {
  const resolved = normalize(filePath);
  if (!resolved.startsWith(normalize(allowedRoot))) return sendText(res, "Forbidden", 403);
  if (!existsSync(resolved) || !statSync(resolved).isFile()) return sendText(res, "Not found", 404);
  const ext = extname(resolved).toLowerCase();
  res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
  res.end(readFileSync(resolved));
}

function sendJson(res, payload, status = 200) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function sendText(res, text, status = 200) {
  res.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(text);
}
