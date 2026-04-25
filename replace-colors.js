import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, 'src');

const replaceRules = [
  { search: /bg-slate-950/g, replace: 'bg-gray-50' },
  { search: /bg-slate-900/g, replace: 'bg-white' },
  { search: /bg-slate-800/g, replace: 'bg-gray-100' },
  { search: /bg-slate-700/g, replace: 'bg-gray-200' },
  { search: /border-slate-800/g, replace: 'border-gray-200' },
  { search: /border-slate-700/g, replace: 'border-gray-300' },
  { search: /text-slate-300/g, replace: 'text-gray-600' },
  { search: /text-slate-400/g, replace: 'text-gray-500' },
  { search: /text-slate-500/g, replace: 'text-gray-400' },
  { search: /text-white/g, replace: 'text-gray-900' },
  { search: /cyan-500/g, replace: 'red-600' },
  { search: /cyan-400/g, replace: 'red-500' },
  { search: /cyan-900/g, replace: 'red-100' },
  { search: /cyan-950/g, replace: 'red-50' },
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      for (const rule of replaceRules) {
        content = content.replace(rule.search, rule.replace);
      }

      fs.writeFileSync(fullPath, content);
    }
  }
}

let indexCssPath = path.join(__dirname, 'src', 'index.css');
if (fs.existsSync(indexCssPath)) {
    let indexCss = fs.readFileSync(indexCssPath, 'utf8');
    indexCss = indexCss.replace('background-color: #030712; /* slate-950 */', 'background-color: #f9fafb; /* gray-50 */');
    indexCss = indexCss.replace('color: #f8fafc;', 'color: #111827; /* gray-900 */');
    indexCss = indexCss.replace('rgba(6, 182, 212, 0.3); /* cyan-500 with opacity */', 'rgba(220, 38, 38, 0.3); /* red-600 with opacity */');
    fs.writeFileSync(indexCssPath, indexCss);
}

processDirectory(directoryPath);
console.log("Colors replaced!");
