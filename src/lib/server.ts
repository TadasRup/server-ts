import http, { IncomingMessage, ServerResponse } from 'node:http';

type Server = {
    init: () => void;
    httpServer: any;
}

const server = {} as Server;

server.httpServer = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    console.log(req.url);
    let responseContent = '';

    if (req.url === '/') {
        responseContent = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Sherlock</title>
            <link rel="stylesheet" href="main.css">
        </head>
        
        <body style="background-color: #ebecee;">
            <main style="width: 40%; margin: auto; margin-top: 100px;">
                <img src="Sherlock.png" alt="Sherlock in moon night background with pipe" style="float: left; width: 50%;">
                <div style="float: left; width: 50%; width: 50%; float: left; margin-top: 10%; text-align: center; font-size: 20px; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
                 <h1 style="color:#343e48; font-size: 4em; margin: 0;">404</h1>
                 <p style="color: #696a7e;">Looks like this page is missing. Don't worry though, our best man is on the case.</p>
                 <p style="font-size: 0.7em; color: #91969c; margin-top: 20px;">Meanwhile, why don't try again by going</p>
                 <a style="background-color: #696e8b; padding: 0.8em; text-decoration: none; color: white; font-size: 0.8em;" href="#">BACK HOME</a>
                </div>
            </main>
        </body>
        </html>`
    }

    if (req.url === '/css/main.css') {
        responseContent = `body {
            background-color: #ebecee;
        }
        
        main {
            width: 40%;
            margin: auto;
            margin-top: 100px;
        }
        
        img {
            float: left;
            width: 50%;
        }
        
        div {
            float: left;
            width: 50%;
            width: 50%;
            float: left;
            margin-top: 10%;
            text-align: center;
            font-size: 20px;
            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
            sans-serif;
        }
        
        h1 {
            color:#343e48;
            font-size: 4em;
            margin: 0;
        }
        
        p:nth-of-type(1) {
            color: #696a7e;
        }
        
        p:nth-of-type(2) {
            font-size: 0.7em;
            color: #91969c;
            margin-top: 20px;
        }
        
        a {
            background-color: #696e8b;
            padding: 0.8em;
            text-decoration: none;
            color: #fff;
            font-size: 0.8em;
        }`;
    }

    if (req.url ==='/css/button.css') {
        responseContent = ``;
    }


    if (req.url ==='/favicon.ico') {
        responseContent = 'FAVICON ICO FAILAS';
    }

    return res.end(responseContent);
})

server.init = () => {
   server.httpServer.listen(4410, () => {
    console.log('Serveris sukasi ant http://localhost:4410/');
   });
};

export { server };
