/**
 * Captures viewport screenshots of each project page and saves them as
 * the thumbnail images used on the home page tiles.
 *
 * Prerequisites:
 *   - puppeteer installed: npm install
 *   - Chrome (uses system Chrome on macOS if present, else Puppeteer's)
 *   - Dev server running: npm run dev (or use --start-server)
 *
 * Usage:
 *   npm run script capture-thumbnails
 *   npm run script capture-thumbnails -- --start-server
 *   BASE_URL=http://localhost:3000 npm run script capture-thumbnails
 *
 * Output: overwrites src/snek.png, src/tictactoe.png, src/pokedex.png
 */

import { ChildProcess, spawn } from "child_process";
import fs from "fs";
import http from "http";
import path from "path";
import puppeteer, { Browser } from "puppeteer";

const SYSTEM_CHROME_MAC =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

function getChromeExecutablePath(): string | undefined {
  if (process.platform === "darwin" && fs.existsSync(SYSTEM_CHROME_MAC)) {
    return SYSTEM_CHROME_MAC;
  }
  return undefined;
}

// When run from scripts/build/, __dirname is scripts/build so we need two levels up for repo root
const PROJECT_ROOT = path.resolve(__dirname, "..", "..");
const SRC_DIR = path.join(PROJECT_ROOT, "src");

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

const VIEWPORT_WIDTH = 1920;
const VIEWPORT_HEIGHT = 1080;

const ROUTES: { path: string; filename: string }[] = [
  { path: "/snek", filename: "snek.png" },
  { path: "/tic-tac-toe", filename: "tictactoe.png" },
  { path: "/pokedex", filename: "pokedex.png" },
  { path: "/w6rdle", filename: "w6rdle.png" },
];

function waitForServer(
  url: string,
  maxAttempts = 30,
  intervalMs = 500,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    let attempts = 0;

    function tryOnce(): void {
      const req = http.request(
        {
          hostname: urlObj.hostname,
          port: urlObj.port || 80,
          path: "/",
          method: "HEAD",
          timeout: 2000,
        },
        () => resolve(),
      );
      req.on("error", () => {
        attempts++;
        if (attempts >= maxAttempts) {
          reject(new Error("Server did not become ready"));
        } else {
          setTimeout(tryOnce, intervalMs);
        }
      });
      req.end();
    }

    tryOnce();
  });
}

async function startDevServer(): Promise<() => void> {
  const child: ChildProcess = spawn("npm", ["run", "dev"], {
    cwd: PROJECT_ROOT,
    stdio: "inherit",
    shell: true,
  });
  await waitForServer(BASE_URL);
  return () => {
    child.kill("SIGTERM");
  };
}

async function captureThumbnails(startServer = false): Promise<void> {
  let stopServer: (() => void) | null = null;
  if (startServer) {
    console.log("Starting dev server...");
    stopServer = await startDevServer();
    console.log("Dev server ready.");
  }

  let browser: Browser | undefined;
  try {
    const executablePath = getChromeExecutablePath();
    browser = await puppeteer.launch({
      headless: true,
      ...(executablePath && { executablePath }),
    });

    for (const { path: routePath, filename } of ROUTES) {
      const url = `${BASE_URL}${routePath}`;
      const outPath = path.join(SRC_DIR, filename);

      console.log(`Capturing ${url} -> ${filename}`);
      const page = await browser.newPage();
      await page.setViewport({
        width: VIEWPORT_WIDTH,
        height: VIEWPORT_HEIGHT,
      });
      await page.goto(url, { waitUntil: "networkidle0", timeout: 15000 });
      await page.screenshot({
        path: outPath,
        type: "png",
      });
      await page.close();
      console.log(`  Saved ${outPath}`);
    }
  } finally {
    if (browser) await browser.close();
    if (stopServer) {
      console.log("Stopping dev server...");
      stopServer();
    }
  }
}

const startServer = process.argv.includes("--start-server");
captureThumbnails(startServer).then(
  () => {
    console.log("Done.");
    process.exit(0);
  },
  (err: unknown) => {
    console.error(err);
    process.exit(1);
  },
);
