const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');
const PORT = 3456;


function parse(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('error', (error) => reject(error));
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => resolve(JSON.parse(body)));
    });
}


const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(__dirname, 'main.css'), 'utf8');
const js = fs.readFileSync(path.join(__dirname, 'main.js'), 'utf8');


const handlers = async (req, res) => {

    const { pathname } = url.parse(req.url, true);
    const method = req.method;
    console.log(`${method} ${pathname}`);

    if (pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        return res.end(html);
    }

    if (pathname === '/main.css') {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        return res.end(css);
    }

    if (pathname === '/main.js') {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        return res.end(js);
    }

    if (pathname === '/predict' && method === 'POST') {
        const body = await parse(req);
        console.log(`body`, body);
        const headers = { 'Content-Type': 'application/json' };
        const opts = { method: 'POST', headers, body: JSON.stringify(body) };
        const response = await fetch(body.endpoint, opts);
        const json = await response.json();
        console.log(`json`, json);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(json));
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
};


const server = http.createServer(handlers);
server.listen(PORT, () => { console.log(`Server running on ${PORT}`) });