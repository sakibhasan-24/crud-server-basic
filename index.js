const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
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
app.use(cors());
app.use(express.json());
async function serverRunning() {
  const usersList = client.db("usersList");
  const userCollection = usersList.collection("usersCollection");
  try {
    await client.connect();
    // read data===get
    // create data
    app.post("/users", async (req, res) => {
      const users = req.body;
      console.log(users);
      const result = await userCollection.insertOne(users);
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
}
serverRunning().catch((e) => console.log(e));
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

app.get("/", (req, res) => res.send("Hello Server"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
