const http = require("http");
const routes = require('./routes')

const requestListener = routes;

const server = http.createServer(requestListener);

console.log(process.pid)
server.listen(3000);