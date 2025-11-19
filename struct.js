import fs from "fs";
import path from "path";
import { jsPDF } from "jspdf";

// --- CONFIG ---

// Only include these folders if found:
const INCLUDE_DIRS = [
  "src", "frontend", "backend", "templates", "public", "static", "styles", "api"
];

// Always include these top-level files:
const INCLUDE_FILES = [
  "package.json", "vite.config.js", "manage.py",
  "requirements.txt", ".env", "README.md"
];

// Folders to always ignore
const IGNORE_DIRS = [
  "node_modules", ".git", ".vscode", "__pycache__", "dist", "build",
  "env", "venv", "staticfiles", "coverage", ".idea", ".next", "logs"
];

// Allowed extensions (for relevant code files)
const KEEP_EXT = [
  ".js", ".jsx", ".ts", ".tsx", ".py", ".html", ".css", ".json", ".env", ""
];

// --- HELPER FUNCTIONS ---
function shouldIncludeDir(name, level = 0) {
  if (IGNORE_DIRS.includes(name)) return false;
  if (level === 0 && INCLUDE_DIRS.length > 0) {
    return INCLUDE_DIRS.includes(name);
  }
  return true;
}

function buildTree(dir, prefix = "", level = 0) {
  let result = "";
  const items = fs.readdirSync(dir, { withFileTypes: true })
    .filter(item => {
      if (item.isDirectory()) return shouldIncludeDir(item.name, level);
      if (level === 0 && INCLUDE_FILES.includes(item.name)) return true;
      if (item.isFile()) {
        const ext = path.extname(item.name);
        return KEEP_EXT.includes(ext);
      }
      return false;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  items.forEach((item, index) => {
    const isLast = index === items.length - 1;
    const connector = isLast ? "└── " : "├── ";
    const nextPrefix = prefix + (isLast ? "    " : "│   ");
    const fullPath = path.join(dir, item.name);

    result += `${prefix}${connector}${item.name}\n`;

    if (item.isDirectory()) {
      result += buildTree(fullPath, nextPrefix, level + 1);
    }
  });

  return result;
}

// --- MAIN EXECUTION ---
const ROOT = process.cwd();
console.log(`📂 Scanning clean project structure in: ${ROOT}`);

const tree = buildTree(ROOT);
fs.writeFileSync("project_structure_final.txt", tree, "utf8");

// Create PDF
const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
pdf.setFont("courier", "normal");
pdf.setFontSize(9);

let y = 10;
for (const line of tree.split("\n")) {
  if (y > 280) {
    pdf.addPage();
    y = 10;
  }
  pdf.text(line, 10, y);
  y += 5;
}

pdf.save("project_structure_final.pdf");

console.log("✅ Clean final structure saved as project_structure_final.txt and project_structure_final.pdf");
