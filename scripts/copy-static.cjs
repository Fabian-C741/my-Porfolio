const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

fs.mkdirSync(dist, { recursive: true });

function copyFile(name) {
  const src = path.join(root, name);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(dist, name));
    console.log(`copied ${name}`);
  }
}

function copyDir(name) {
  const src = path.join(root, name);
  if (fs.existsSync(src)) {
    fs.cpSync(src, path.join(dist, name), { recursive: true });
    console.log(`copied ${name}/`);
  }
}

copyFile('index.html');
copyFile('script.js');

const cv = fs.readdirSync(root).find(f => /^CV-.+\.pdf$/i.test(f));
if (cv) copyFile(cv);

for (const d of ['assets', 'workers', 'docs']) copyDir(d);