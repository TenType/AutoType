import { createServer } from 'http';

export default function keepAlive() {
    const server = createServer((req, res) => {
        res.writeHead(200);
        res.end();
    });

    server.listen(8080);
}
