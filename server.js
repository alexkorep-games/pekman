const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  // map requests to files
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

  // prevent directory traversal
  if (!filePath.startsWith(__dirname)) {
    res.statusCode = 400;
    return res.end('Bad Request');
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      return res.end('Not Found');
    }

    const ext = path.extname(filePath);
    const types = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
    };
    res.setHeader('Content-Type', types[ext] || 'application/octet-stream');
    res.end(data);
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
