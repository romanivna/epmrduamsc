const compression = require('compression');
const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const PORT = process.argv[2] || 3000;

const STATIC_URL = '/static';
const distUrl = '/build';

app.use(compression());

app.use(STATIC_URL, express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, distUrl)));

app.get('*', (req, res, next) => { console.log(req.url, req.method); next();})
app.get('/api/v1/*', onGetRequest);
app.post('/api/v1/*', onPostRequest);
app.delete('/api/v1/*', onDeleteRequest);
app.put('/api/v1/*', onPutRequest);

app.get('/applications*', onGetRequest);
app.post('/applications*', onPostRequest);
app.delete('/applications*', onDeleteRequest);

app.listen(PORT, function () {
  console.log(`Proxy server is running on ${PORT}`);
});

/**
* GET request handler
*/
function onGetRequest(req,res){
	onRequest(req,res,"GET");
}

/**
* POST request handler
*/
function onPostRequest(req,res){
	onRequest(req,res,"POST");
}

/**
 * DELETE request handler
 */
function onDeleteRequest(req, res){
  console.log('delete')    
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
function onRequest(client_req, client_res,type) {
  console.log('serve: ' + client_req.url);

  var options = {
    hostname: 'ecsc00a01491.epam.com',
    port: 9094, //develop server
    path: client_req.url,
    method: type
  };

  var proxy = http.request(options, function (res) {
    console.log(res.headers);
    console.log(res.statusCode);
    console.log(res.statusMessages);

    res.pipe(client_res, {
      end: true
    });
  });

  client_req.pipe(proxy, {
    end: true
  });
}