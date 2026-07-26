import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const html = readFileSync(path.join(root, 'index.html'), 'utf8');
const ids = new Set([...html.matchAll(/id="([^"]+)"/g)].map((m) => m[1]));
const getElementCalls = [...html.matchAll(/document\.getElementById\(['"]([^'"]+)['"]\)/g)].map((m) => m[1]);
const missing = [...new Set(getElementCalls)].filter((id) => !ids.has(id));
if (missing.length) {
  console.error(`Missing DOM ids referenced by script: ${missing.join(', ')}`);
  process.exit(1);
}
const scriptMatch = html.match(/<script>([\s\S]*)<\/script>/);
if (!scriptMatch) {
  console.error('No inline script block found.');
  process.exit(1);
}
try {
  new vm.Script(scriptMatch[1], { filename: 'index.html' });
  console.log('Verified DOM ids referenced by script are present and the inline script parses successfully.');
} catch (error) {
  console.error('Inline script parsing failed:', error.message);
  process.exit(1);
}
