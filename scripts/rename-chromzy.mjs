#!/usr/bin/env node
/**
 * Replace Chromadrift branding with Chromzy across the project.
 *
 * Usage:
 *   node scripts/rename-chromzy.mjs              # dry-run (default)
 *   node scripts/rename-chromzy.mjs --apply      # write changes
 *   node scripts/rename-chromzy.mjs --apply --no-domain   # name only, keep chromadrift.xyz URLs
 *   node scripts/rename-chromzy.mjs --apply --rename-files
 */

import { readdirSync, readFileSync, renameSync, statSync, writeFileSync } from "fs";
import { dirname, join, relative } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, "..");

const args = new Set(process.argv.slice(2));
const APPLY = args.has("--apply");
const RENAME_FILES = args.has("--rename-files");
const SKIP_DOMAIN = args.has("--no-domain");

const SKIP_DIRS = new Set([
  ".git",
  "node_modules",
  ".cursor",
]);

const TEXT_EXTENSIONS = new Set([
  ".html", ".css", ".js", ".mjs", ".md", ".txt", ".xml", ".svg", ".json", ".toml", ".example",
]);

const SELF = "scripts/rename-chromzy.mjs";

/** Longest-first so partial matches never fire first. */
function buildReplacements() {
  const pairs = [];
  if (!SKIP_DOMAIN) {
    pairs.push(["CHROMADRIFT.XYZ", "CHROMZY.COM"]);
    pairs.push(["chromadrift.xyz", "chromzy.com"]);
  }
  pairs.push(
    ["CHROMADRIFT", "CHROMZY"],
    ["Chromadrift", "Chromzy"],
    ["chromadrift", "chromzy"],
    ["_chromadrift", "_chromzy"],
  );
  return pairs;
}

function applyReplacements(text, replacements) {
  let out = text;
  let count = 0;
  for (const [from, to] of replacements) {
    if (!out.includes(from)) continue;
    const parts = out.split(from);
    count += parts.length - 1;
    out = parts.join(to);
  }
  return { text: out, count };
}

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const abs = join(dir, name);
    const rel = relative(ROOT, abs);
    if (SKIP_DIRS.has(name)) continue;
    const st = statSync(abs);
    if (st.isDirectory()) {
      walk(abs, files);
    } else {
      files.push(rel);
    }
  }
  return files;
}

function isTextFile(rel) {
  const ext = rel.slice(rel.lastIndexOf(".")).toLowerCase();
  return TEXT_EXTENSIONS.has(ext);
}

function renamePaths(files) {
  const renames = [];
  for (const rel of files) {
    if (!/chromadrift/i.test(rel)) continue;
    const next = rel.replace(/chromadrift/gi, (m) => {
      if (m === "CHROMADRIFT") return "CHROMZY";
      if (m === "Chromadrift") return "Chromzy";
      return "chromzy";
    });
    if (next !== rel) renames.push({ from: rel, to: next });
  }
  return renames;
}

const replacements = buildReplacements();
const allFiles = walk(ROOT);
const textFiles = allFiles.filter((f) => f !== SELF && isTextFile(f));

let filesChanged = 0;
let totalHits = 0;
const changed = [];

for (const rel of textFiles) {
  const abs = join(ROOT, rel);
  const before = readFileSync(abs, "utf8");
  const { text: after, count } = applyReplacements(before, replacements);
  if (count === 0) continue;
  totalHits += count;
  filesChanged += 1;
  changed.push({ rel, count });
  if (APPLY) writeFileSync(abs, after, "utf8");
}

const fileRenames = RENAME_FILES ? renamePaths(allFiles) : [];

if (RENAME_FILES && fileRenames.length) {
  for (const { from, to } of fileRenames) {
    const fromAbs = join(ROOT, from);
    const toAbs = join(ROOT, to);
    if (APPLY) renameSync(fromAbs, toAbs);
  }
}

const mode = APPLY ? "APPLIED" : "DRY-RUN";
console.log(`\n[${mode}] Chromadrift → Chromzy`);
console.log(`Domain swap: ${SKIP_DOMAIN ? "skipped" : "chromadrift.xyz → chromzy.com"}`);
console.log(`Files scanned: ${textFiles.length}`);
console.log(`Files ${APPLY ? "updated" : "would update"}: ${filesChanged}`);
console.log(`Replacements ${APPLY ? "made" : "found"}: ${totalHits}\n`);

if (changed.length) {
  for (const { rel, count } of changed.sort((a, b) => b.count - a.count)) {
    console.log(`  ${count.toString().padStart(3)}  ${rel}`);
  }
} else {
  console.log("  (no matches — already renamed?)");
}

if (fileRenames.length) {
  console.log(`\nFile renames ${APPLY ? "applied" : "planned"}: ${fileRenames.length}`);
  for (const { from, to } of fileRenames) {
    console.log(`  ${from} → ${to}`);
  }
}

if (!APPLY && (filesChanged > 0 || fileRenames.length > 0)) {
  console.log("\nRe-run with --apply to write changes.");
}

if (!APPLY && filesChanged === 0 && fileRenames.length === 0) {
  process.exit(0);
}

process.exit(0);
