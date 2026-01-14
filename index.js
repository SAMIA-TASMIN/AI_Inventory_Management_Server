require("dotenv").config();
const express = require("express");
const app = express();
const admin = require("firebase-admin");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const serviceAccount = require("./ai-inventory-management-2575b-firebase-adminsdk-fbsvc-52566f2a04.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.at3dlqg.mongodb.net/?appName=Cluster0`;
// const uri =
//   "mongodb+srv://faravi:wrZAPJSNhCVnZ9Vu@cluster0.at3dlqg.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const ModelDatabase = client.db("ModelDB");
    const models = ModelDatabase.collection("models");
    const purchased = ModelDatabase.collection("purchased");

    // Users APu
    app.post("/users", async (req, res) => {
      const newUsers = req.body;
      const result = await users.insertOne(newUsers);
      res.send(result);
    });

    // Models API

    app.post("/models", async (req, res) => {
      const body = req.body;
      console.log(body);
      const result = await models.insertOne(body);
      console.log("result", result);
      res.send(result);
    });

    app.get("/recentModels", async (req, res) => {
      const cursor = await models
        .find({})
        .limit(6)
        .sort({ createdAt: 1 })
        .toArray();
      res.send(cursor);
    });

    app.get("/models", async (req, res) => {
      const data = await models.find({}).toArray();
      res.send(data);
    });

    
    app.get("/models/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      console.log("query", query);
      const data = await models.findOne(query);
      console.log(data);
      res.send(data);
    });
    app.delete("/models/:id",async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await models.deleteOne(query)
      res.send(result)
    });

    app.patch("/models/:id", async (req, res) => {
      const id = req.params.id;
      const updatedData = req.body;
      const query = { _id: new ObjectId(id) };
      const updateData = {
        $set: updatedData,
      };

      const result = await models.updateOne(query, updateData, {});
      res.send(result);
    });

    app.get('/mymodel',async(req,res)=>{
      const email = req.query.email;
      console.log(email);
      const query ={}
      if(email){
       query.createdBy = email
      }
      const result = await models.find(query).toArray()
      res.send(result)

    })

    app.post('/purchasedModel',async(req,res)=>{
      const body = req.body;
      const result = await purchased.insertOne(body);
      console.log(result);
      res.send(result)
    })

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
