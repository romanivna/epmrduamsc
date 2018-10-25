const express     = require('express');
const jsonServer  = require('json-server');
const path        = require('path');
const http        = require('http');
const server      = jsonServer.create();
const router      = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

const port      = process.argv[2] || 3000;
const apiUrl    = '/api';
const staticUrl = '/static';
const distUrl   = '/build';

const middlewareResponseWrapper = function (req, res, next) {
  const send = res.send;
  if (req.originalUrl === '/api/__rules' ||
      req.originalUrl === '/api/db') {
    if (next) next();
    return;
  }
  res.send = function (message) {
    message = '{\n"data": ' + message + '\n}';
    send.call(this, message);
  };
  if (next) next();
};

server.use(staticUrl, express.static(path.join(__dirname, 'static')));

server.get('/api/v1/*', onGetRequest);
server.post('/api/v1/*', onPostRequest);
server.delete('/api/v1/*', onDeleteRequest);
server.put('/api/v1/*', onPutRequest);
server.get('/applications*', onGetRequest);
server.post('/applications*', onPostRequest);
server.delete('/applications*', onDeleteRequest);

server.use(apiUrl, middlewares, middlewareResponseWrapper);
server.use(apiUrl, router);

server.use(express.static(path.join(__dirname, distUrl)));
server.use('*', (req, res) => {
  let reqUrl      = req.baseUrl;
  let staticRegex = new RegExp(`^${staticUrl}`, 'gi');
  let serve = express.static(path.join(__dirname, distUrl));

  if (reqUrl.match(staticRegex) ) {
    res.status(403)
      .end('Not found .....');
    return;
  }

  serve(req, res);
});


/**
 * GET request handler
 */
function onGetRequest(req,res){
  onRequest(req, res, "GET");
}

/**
 * POST request handler
 */
function onPostRequest(req, res){
  onRequest(req, res, "POST");
}

/**
 * DELETE request handler
 */
function onDeleteRequest(req, res){
  onRequest(req, res, "DELETE");
}

/**
 * PUT request handler
 */
function onPutRequest(req, res){
  onRequest(req, res, "PUT");
}

/**
 *Request handler
 */
function onRequest(client_req, client_res, type) {
  console.log('serve: ' + client_req.url);

  var options = {
    hostname: 'ecsc00a01491.epam.com',
    port: 9094, //develop server
    path: client_req.url,
    method: type,
    headers: client_req.headers
  };

  var proxy = http.request(options, function (res) {
    res.pipe(client_res, {
      end: true
    });
  });

  client_req.pipe(proxy, {
    end: true
  });
}

server.listen(port, function () {
  console.log(`Server is running on ${port}`);
});