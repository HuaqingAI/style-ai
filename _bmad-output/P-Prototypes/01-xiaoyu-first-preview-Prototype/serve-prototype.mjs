import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const prototypeRoot = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(prototypeRoot, '..');
const port = Number(process.env.PORT || 17864);

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg'
};

createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url || '/', `http://127.0.0.1:${port}`);
    const requestPath = decodeURIComponent(
      requestUrl.pathname === '/'
        ? '/01-xiaoyu-first-preview-Prototype/01.1-start-login.html'
        : requestUrl.pathname
    );
    const filePath = path.normalize(path.join(root, requestPath));

    if (!filePath.startsWith(root)) {
      response.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Forbidden');
      return;
    }

    const bytes = await readFile(filePath);
    response.writeHead(200, {
      'Content-Type': contentTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream'
    });
    response.end(bytes);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
}).listen(port, '127.0.0.1', () => {
  console.log(`Style AI prototype server: http://127.0.0.1:${port}`);
});
