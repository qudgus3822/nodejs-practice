const MongoClient = require("mongodb").MongoClient;

const uri =
  "mongodb+srv://qudgus3822:!as22414578@cluster0.qv7mr.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, { useNewUrlParser: true });

async function main() {
  try {
    await client.connect();
    console.log("몽고디비 접속 성공");

    const collection = client.db("test").collection("person");

    await collection.insertOne({ name: "병현", age: 33 });
    console.log("문서 추가 성공");

    const documents = await collection.find({ name: "andy" }).toArray();

    console.log("찾은 문서", documents);

    await collection.updateOne({ name: "andy" }, { $set: { age: 35 } });
    console.log("문서 업데이트");

    const updatedDocuments = await collection.find({ name: "andy" }).toArray();

    console.log("업데이트된 문서", updatedDocuments);

    await collection.deleteOne({name:"andy"});

    await client.close();
  } catch (e) {
    console.error(e);
  }
}

main();
