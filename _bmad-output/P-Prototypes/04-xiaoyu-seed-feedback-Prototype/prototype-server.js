const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const port = Number(process.env.PORT || 18084);
const host = '127.0.0.1';

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp'
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${host}:${port}`);
  let pathname = decodeURIComponent(url.pathname.replace(/^\/+/, ''));
  if (!pathname) pathname = 'P-Prototypes/04-xiaoyu-seed-feedback-Prototype/04.1-result-quick-feedback-panel.html';

  const file = path.resolve(root, pathname);
  if (!file.startsWith(root)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(file, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    res.writeHead(200, {
      'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream'
    });
    fs.createReadStream(file).pipe(res);
  });
});

server.listen(port, host, () => {
  console.log(`Style AI Scenario 04 prototype server: http://${host}:${port}/`);
});
