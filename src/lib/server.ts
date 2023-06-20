import { existsSync, readFileSync } from 'node:fs';
import http, { IncomingMessage, ServerResponse } from 'node:http';

type Server = {
    init: () => void;
     // httpServer: typeof http.createServer;
    httpServer: any;
}

const server = {} as Server;

server.httpServer = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    console.log(req.url);

    const isTextFile = req.url?.endsWith('.css') || req.url?.endsWith('.js') || req.url?.endsWith('.svg');
    const isBinaryFile = req.url?.endsWith('.ico') || req.url?.endsWith('.png') || req.url?.endsWith('.jpg') || req.url?.endsWith('.webp') || req.url?.endsWith('.eot') || req.url?.endsWith('.ttf');
    const isAPI = req.url?.startsWith('/api/');
    const isPage = !isTextFile && !isBinaryFile && !isAPI;
    let content: any;

    if (isTextFile) {
        res.setHeader('Content-Type', 'text/plain');
        if (existsSync(process.env.PWD + '/public' + req.url)) {
            content = readFileSync(process.env.PWD + '/public' + req.url);
        }
    } else if (isBinaryFile) {
        res.setHeader('Content-Type', 'application/octet-stream');
        content = 'Binarinio failo turinys';
    } else if (isAPI) {
        res.setHeader('Content-Type', 'application/json');
        content = JSON.stringify({ message: 'API atsakymas' });
    } else if (isPage) {
        const pageFile = req.url === '/' ? 'index.html' : req.url?.substring(1).split('/').join('_') + '.html';
        if (existsSync(process.env.PWD + '/public/pages/' + pageFile)) {
            content = readFileSync(process.env.PWD  + '/public/pages/' + pageFile);
        }
    }

    if (content) {
        res.end(content);
    } else {
        res.statusCode = 404;
        res.end(readFileSync(process.env.PWD + '/public/pages/not-found.html'));
    }

    // puslapio html
    // failai:
    // - tekstiniai:
    //      - css failu
    //      - js failu
    //      - svg failu
    // - ne tekstiniai:
    //      - img failu
    //      - fonts failu
    //      - video failu
    //      - audio failu
    //      - pdf failu
    // duomenu JSON
});


server.init = () => {
    server.httpServer.listen(4410, () => {
        console.log('Serveris sukasi ant http://localhost:4410');
    });
};

export { server };
