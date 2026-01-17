require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.at3dlqg.mongodb.net/?appName=Cluster0`;

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

    // Users API
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

    // ✅ NEW - Search Route
    app.get("/models/search", async (req, res) => {
      const searchTerm = req.query.q || "";
      
      const query = searchTerm 
        ? { name: { $regex: searchTerm, $options: 'i' } }
        : {};
        
      const data = await models.find(query).toArray();
      res.send(data);
    });

    // ✅ MODIFIED - Filter Route (শুধু framework এর জন্য)
    app.get("/models/filter", async (req, res) => {
      const { framework } = req.query;
      
      const query = {};
      
      if (framework) {
        query.framework = framework;
      }
      
      const data = await models.find(query).toArray();
      res.send(data);
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

    app.delete("/models/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await models.deleteOne(query);
      res.send(result);
    });

    // ✅ MODIFIED - Existing PATCH route
    app.patch("/models/:id", async (req, res) => {
      const id = req.params.id;
      const updatedData = req.body;
      const query = { _id: new ObjectId(id) };
      
      // Check if $inc operator is used
      const updateData = updatedData.$inc 
        ? { $inc: updatedData.$inc }
        : { $set: updatedData };

      const result = await models.updateOne(query, updateData, {});
      res.send(result);
    });

    app.get('/mymodel', async (req, res) => {
      const email = req.query.email;
      console.log(email);
      const query = {};
      if (email) {
        query.createdBy = email;
      }
      const result = await models.find(query).toArray();
      res.send(result);
    });

    app.post('/purchasedModel', async (req, res) => {
      const body = req.body;
      const result = await purchased.insertOne(body);
      console.log(result);
      res.send(result);
    });

    app.get('/purchasedModel', async (req, res) => {
      const email = req.query.email;
      const query = {};
      if (email) {
        query.createdBy = email;
      }
      const result = await purchased.find(query).toArray();
      res.send(result);
    });

   
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