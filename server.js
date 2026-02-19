const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 4000;
const LOG_FILE = path.join(__dirname, 'requests.log');

function logRequest(method, route) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] Method: ${method} | Route: ${route}\n`;
  fs.appendFile(LOG_FILE, logEntry, (err) => {
    if (err) console.error('Failed to write to log file:', err);
  });
}

const server = http.createServer((req, res) => {
  const route = req.url;
  const method = req.method;

  logRequest(method, route);

  res.setHeader('Content-Type', 'text/html');

  switch (route) {
    case '/':
      res.writeHead(200);
      res.end('<h1>Welcome to the Home Page</h1>');
      break;

    case '/about':
      res.writeHead(200);
      res.end('<h1>About Us</h1><p>This is the about page.</p>');
      break;

    case '/contact':
      res.writeHead(200);
      res.end('<h1>Contact Us</h1><p>Reach us at contact@example.com</p>');
      break;

    default:
      res.writeHead(404);
      res.end('<h1>404 - Page Not Found</h1>');
      break;
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Logs being written to: ${LOG_FILE}`);
});
