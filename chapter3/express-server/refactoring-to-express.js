const express = require("express");
const url = require("url");
const app = express();
const port = 3000;
let posts = [];

app.listen(port, () => console.log(`ok express server - ${port}`));

const user = (req, res) => {
  const userInfo = url.parse(req.url, true).query;
  res.json(`[user] name : ${userInfo.name}, age : ${userInfo.age}`);
};

const feed = (req, res) => {
  res.json(`<ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
        </ul>`);
};

const notFound = (req, res) => {
  res.statusCode = 404;
  res.end("Not Found\n");
};

app.get("/", (req, res) => {
  res.set("Content-Type", "text/html; charset=utf-8");
  res.end("Hello World\n");
});

app.get("/user", user);
app.get("/feed", feed);
