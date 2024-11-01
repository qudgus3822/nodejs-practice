const express = require("express");
const url = require("url");
const app = express();
const cors = require("cors");
const port = 4000;
let posts = [
  {
    id: 1,
    title: "title1",
    writer: "김병현",
    text: "게시글 입니다.",
    createDate: Date(),
  },
  {
    id: 2,
    title: "title2",
    writer: "김병현",
    text: "게시글 입니다.",
    createDate: Date(),
  },
  {
    id: 3,
    title: "title3",
    writer: "김병현",
    text: "게시글 입니다.",
    createDate: Date(),
  },
  {
    id: 4,
    title: "title4",
    writer: "김병현",
    text: "게시글 입니다.",
    createDate: Date(),
  },
];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// CORS 설정 (모든 도메인 허용)
app.use(cors());

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
  res.json(posts);
});

app.post("/posts", (req, res) => {
  const { title, name, text } = req.body;
  posts.push({ id: posts.length + 1, title, name, text, createDate: Date() });
  res.json({ title, name, text });
});

app.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  const filterPosts = posts.filter((post) => post.id !== +id);
  const isLengthChanged = posts.length !== filterPosts.length;
  posts = filterPosts;
  if (isLengthChanged) {
    res.json({ message: "success" });
    return;
  }
  res.json({ message: "fail" });
});

app.get("/user", user);
app.get("/feed", feed);
