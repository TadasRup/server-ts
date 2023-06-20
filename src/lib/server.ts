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
    const isBinaryFile = req.url?.endsWith('.png') || req.url?.endsWith('.jpg') || req.url?.endsWith('.webp') || req.url?.endsWith('.eot') || req.url?.endsWith('.ttf');
    const isAPI = req.url?.startsWith('/api/');
    const isPage = !isTextFile && !isBinaryFile && !isAPI;

    if (isTextFile) {
        res.setHeader('Content-Type', 'text/plain');
        res.end('Tekstinio failo turinys');
    } else if (isBinaryFile) {
        res.setHeader('Content-Type', 'application/octet-stream');
        res.end('Binarinio failo turinys');
    } else if (isAPI) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'API atsakymas' }));
    } else if (isPage) {
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Puslapio turinys</h1></body></html>');
    } else if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html');
        const responseContent = `<!DOCTYPE html>
        <!-- HTML content -->
        `;
        res.end(responseContent);
    } else {
        res.statusCode = 404;
        res.end('Klaida: Puslapis nerastas');
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
