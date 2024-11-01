const exporess = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Person = require("./person-model");

mongoose.set("strictQuery", false);

const app = exporess();
app.use(bodyParser.json());

app.listen(3000, async () => {
  console.log("서버가 시작되었습니다.");
  const mongodbUri =
    "mongodb+srv://qudgus3822:!as22414578@cluster0.qv7mr.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";
  mongoose.connect(mongodbUri, {
    useNewUrlParser: true,
  });
});

app.get("/person", async (req, res) => {
  const person = await Person.find({});
  res.send(person);
});

app.get("/person/:email", async (req, res) => {
  const person = await Person.findOne({ email: req.params.email });
  res.send(person);
});

app.post("/person", async (req, res) => {
  const person = new Person(req.body);
  await person.save();
  res.send(person);
});

app.put("/person/:email", async (req, res) => {
  const person = await Person.findOneAndUpdate(
    { email: req.params.email },
    { $set: req.body },
    { new: true }
  );
  console.log(person);
  res.send(person);
});

app.delete("/person/:email", async (req, res) => {
  await Person.deleteMany({ email: req.params.email });
  res.send({ success: true });
});
