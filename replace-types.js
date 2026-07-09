const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (f !== 'node_modules' && f !== '.next' && f !== '.git') {
        walkDir(dirPath, callback);
      }
    } else if (f.endsWith('.tsx') || f.endsWith('.ts')) {
      callback(path.join(dir, f));
    }
  });
}

const replacements = [
  {
    regex: /import\s+(?:type\s+)?\{\s*Conference\s*\}\s+from\s+["']@\/lib\/sanity\/types["']/g,
    replace: 'import type { Conference } from "@/lib/sanity/conference/types"'
  },
  {
    regex: /import\s+(?:type\s+)?\{\s*Gallery\s*\}\s+from\s+["']@\/lib\/sanity\/types["']/g,
    replace: 'import type { Gallery } from "@/lib/sanity/gallery/types"'
  },
  {
    regex: /import\s+(?:type\s+)?\{\s*Blog\s*\}\s+from\s+["']@\/lib\/sanity\/types["']/g,
    replace: 'import type { Blog } from "@/lib/sanity/blog/types"'
  },
  {
    regex: /import\s+(?:type\s+)?\{\s*GalleryImage\s*\}\s+from\s+["']@\/lib\/sanity\/types["']/g,
    replace: 'import type { GalleryImage } from "@/lib/sanity/gallery/types"'
  },
  {
    regex: /import\s+\{\s*GALLERY_CATEGORY_LABELS\s*(?:,\s*type\s+GalleryImageCategory\s*)?\}\s+from\s+["']@\/lib\/sanity\/types["']/g,
    replace: 'import { GALLERY_CATEGORY_LABELS, type GalleryImageCategory } from "@/lib/sanity/gallery/types"'
  },
  {
    regex: /import\s+\{\s*GALLERY_CATEGORY_LABELS\s*\}\s+from\s+["']@\/lib\/sanity\/types["']/g,
    replace: 'import { GALLERY_CATEGORY_LABELS } from "@/lib/sanity/gallery/types"'
  }
];

function processFiles(dir) {
  walkDir(dir, (filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    replacements.forEach(({regex, replace}) => {
      content = content.replace(regex, replace);
    });
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  });
}

processFiles(path.join(__dirname, 'app'));
processFiles(path.join(__dirname, 'components'));
processFiles(path.join(__dirname, 'lib'));

console.log("Done");
