import http from 'http';
import app from './app.js';

const port = 8000;

const server = http.createServer(app);

server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
