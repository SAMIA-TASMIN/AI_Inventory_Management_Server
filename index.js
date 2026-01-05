const express = require('express')
const app = express()
const admin = require("firebase-admin");
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())



const serviceAccount = require("./ai-inventory-management-2575b-firebase-adminsdk-fbsvc-52566f2a04.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const uri = "mongodb+srv://faravi:wrZAPJSNhCVnZ9Vu@cluster0.at3dlqg.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    
    const ModelDatabase = client.db('ModelDB');
    const models = ModelDatabase.collection('models');

    app.post('/models',async(req,res)=>{
      const body = req.body;
      console.log(body);
      const result = await models.insertOne(body);
      console.log("result",result);
      res.send(result)
    })
    
    app.get('/recentModels',async(req,res)=>{
      const cursor = await models.find({}).limit(6).sort({createdAt:1}).toArray();
      res.send(cursor)
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
    
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
