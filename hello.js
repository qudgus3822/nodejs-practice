const http = require("http");

let count = 0;

const server = http.createServer((req, res) => {
  log(count);
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.write("Hello World\n");
  setTimeout(() => {
    res.end("nodejs\n");
  }, 2000);
});

function log(c) {
  console.log(c);
  count++;
}

server.listen(8000, () => console.log("hello node.js"));
