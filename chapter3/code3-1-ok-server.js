const http = require("http");
const url = require("url");
const server = http.createServer((req, res) => {
  const path = url.parse(req.url, true).pathname;
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");

  if (path in urlMap) {
    urlMap[path](req, res);
  } else {
    notFound(req, res);
  }
});

server.listen(3000, () => console.log("ok server"));

const user = (req, res) => {
  const userInfo = url.parse(req.url, true).query;
  res.end(`[user] name : ${userInfo.name}, age : ${userInfo.age}`);
};

const feed = (req, res) => {
  res.end(`<ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
        </ul>`);
};

const notFound = (req, res) => {
  res.statusCode = 404;
  res.end("Not Found\n");
};

const urlMap = {
  "/": (req, res) => res.end("Hello World\n"),
  "/user": user,
  "/feed": feed,
};
