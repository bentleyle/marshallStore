const http = require ('http');
const app = require ('./app');
const port = process.env.PORT || 2804;

const server = http.createServer (app);
server.listen (port, () => {
  console.log ('server.listen' + port);
});
