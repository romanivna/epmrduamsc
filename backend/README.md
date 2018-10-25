## Server for mocking
Server created in Node.js, using Express.js and json-server as middleware.
### How to run

For first run *npm install* command from */backend* folder:
```
npm install
```

To run server (*3000* port by default):
```
npm start
```
Or with specified port:
```
npm start 3001
```
### Routes
Requests on routes started with **localhost:3000/api** response as JSON file. All static JSONs store in *backend/db.json* file.

For example, you have next db.json:
```
{
  "articles": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "users": [
    { "id": 1, "name": "Anton" }
  ]
}
```
If you go **localhost:3000/api/articles/1**, you will get:
```
{
  "id": 1, "title": "json-server", "author": "typicode"
}
```
Read more about possible requests: [json-server](https://www.npmjs.com/package/json-server)

If you go **localhost:3000/static/some.file**, you will get *some.file* from *backend/static* folder. Or response with code 404, if file does not exist.

**All another routes** will response with **index.html** from *build* directory.
