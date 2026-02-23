"use strict";
/**
 * Captures viewport screenshots of each project page and saves them as
 * the thumbnail images used on the home page tiles.
 *
 * Prerequisites:
 *   - puppeteer installed: npm install
 *   - Dev server running: npm run dev (or use --start-server)
 *
 * Usage:
 *   npm run script capture-thumbnails
 *   npm run script capture-thumbnails -- --start-server
 *   BASE_URL=http://localhost:3000 npm run script capture-thumbnails
 *
 * Output: overwrites src/snek.png, src/tictactoe.png, src/pokedex.png
 */
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var http_1 = __importDefault(require("http"));
var path_1 = __importDefault(require("path"));
var puppeteer_1 = __importDefault(require("puppeteer"));
// When run from scripts/build/, __dirname is scripts/build so we need two levels up for repo root
var PROJECT_ROOT = path_1.default.resolve(__dirname, "..", "..");
var SRC_DIR = path_1.default.join(PROJECT_ROOT, "src");
var BASE_URL =
  (_a = process.env.BASE_URL) !== null && _a !== void 0
    ? _a
    : "http://localhost:3000";
var VIEWPORT_WIDTH = 800;
var VIEWPORT_HEIGHT = 400;
var ROUTES = [
  { path: "/snek", filename: "snek.png" },
  { path: "/tic-tac-toe", filename: "tictactoe.png" },
  { path: "/pokedex", filename: "pokedex.png" },
];
function waitForServer(url, maxAttempts, intervalMs) {
  if (maxAttempts === void 0) {
    maxAttempts = 30;
  }
  if (intervalMs === void 0) {
    intervalMs = 500;
  }
  return new Promise(function (resolve, reject) {
    var urlObj = new URL(url);
    var attempts = 0;
    function tryOnce() {
      var req = http_1.default.request(
        {
          hostname: urlObj.hostname,
          port: urlObj.port || 80,
          path: "/",
          method: "HEAD",
          timeout: 2000,
        },
        function () {
          return resolve();
        },
      );
      req.on("error", function () {
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
function startDevServer() {
  return __awaiter(this, void 0, void 0, function () {
    var child;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          child = (0, child_process_1.spawn)("npm", ["run", "dev"], {
            cwd: PROJECT_ROOT,
            stdio: "inherit",
            shell: true,
          });
          return [4 /*yield*/, waitForServer(BASE_URL)];
        case 1:
          _a.sent();
          return [
            2 /*return*/,
            function () {
              child.kill("SIGTERM");
            },
          ];
      }
    });
  });
}
function captureThumbnails(startServer) {
  if (startServer === void 0) {
    startServer = false;
  }
  return __awaiter(this, void 0, void 0, function () {
    var stopServer,
      browser,
      _i,
      ROUTES_1,
      _a,
      routePath,
      filename,
      url,
      outPath,
      page;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          stopServer = null;
          if (!startServer) return [3 /*break*/, 2];
          console.log("Starting dev server...");
          return [4 /*yield*/, startDevServer()];
        case 1:
          stopServer = _b.sent();
          console.log("Dev server ready.");
          _b.label = 2;
        case 2:
          _b.trys.push([2, , 12, 15]);
          return [4 /*yield*/, puppeteer_1.default.launch({ headless: true })];
        case 3:
          browser = _b.sent();
          (_i = 0), (ROUTES_1 = ROUTES);
          _b.label = 4;
        case 4:
          if (!(_i < ROUTES_1.length)) return [3 /*break*/, 11];
          (_a = ROUTES_1[_i]), (routePath = _a.path), (filename = _a.filename);
          url = "".concat(BASE_URL).concat(routePath);
          outPath = path_1.default.join(SRC_DIR, filename);
          console.log("Capturing ".concat(url, " -> ").concat(filename));
          return [4 /*yield*/, browser.newPage()];
        case 5:
          page = _b.sent();
          return [
            4 /*yield*/,
            page.setViewport({
              width: VIEWPORT_WIDTH,
              height: VIEWPORT_HEIGHT,
            }),
          ];
        case 6:
          _b.sent();
          return [
            4 /*yield*/,
            page.goto(url, { waitUntil: "networkidle0", timeout: 15000 }),
          ];
        case 7:
          _b.sent();
          return [
            4 /*yield*/,
            page.screenshot({
              path: outPath,
              type: "png",
            }),
          ];
        case 8:
          _b.sent();
          return [4 /*yield*/, page.close()];
        case 9:
          _b.sent();
          console.log("  Saved ".concat(outPath));
          _b.label = 10;
        case 10:
          _i++;
          return [3 /*break*/, 4];
        case 11:
          return [3 /*break*/, 15];
        case 12:
          if (!browser) return [3 /*break*/, 14];
          return [4 /*yield*/, browser.close()];
        case 13:
          _b.sent();
          _b.label = 14;
        case 14:
          if (stopServer) {
            console.log("Stopping dev server...");
            stopServer();
          }
          return [7 /*endfinally*/];
        case 15:
          return [2 /*return*/];
      }
    });
  });
}
var startServer = process.argv.includes("--start-server");
captureThumbnails(startServer).then(
  function () {
    console.log("Done.");
    process.exit(0);
  },
  function (err) {
    console.error(err);
    process.exit(1);
  },
);
