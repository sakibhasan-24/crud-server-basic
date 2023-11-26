const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://sakibhasan7724:MfwhsMgoK2E6zLvf@mern-learning.cleqqgb.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
// middleware
app.use(cors());
app.use(express.json());
async function serverRunning() {
  const usersList = client.db("usersList");
  const userCollection = usersList.collection("usersCollection");
  try {
    await client.connect();
    // read data===get
    app.get("/users", async (req, res) => {
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    // create data
    app.post("/users", async (req, res) => {
      const users = req.body;
      console.log(users);
      const result = await userCollection.insertOne(users);
      res.send(result);
    });
    // delete data

    app.delete("/users/:id", async function (req, res) {
      const { id } = req.params;
      // console.log(`Delete record with id ${id}`);
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
}
serverRunning().catch((e) => console.log(e));

app.get("/", (req, res) => res.send("Hello Server"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
