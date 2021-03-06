const express = require('express')
const bodyParser =require('body-parser');
const cors =require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()



const app = express()

 app.use(bodyParser.json());
app.use(cors());

const port = 5000;

               

                      const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0ltwi.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
                      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
                      client.connect(err => {
                      const productCollection = client.db("ecommerce").collection("products");
                    console.log('database connected');
                
                
                app.post("/addProduct",(req,res)=>{
                    const product = req.body;
                    console.log(product);
                    productcollection.insertOne(product)
                    .then(result => {
                        console.log(result);
                    })
                    
                })
              
                
                app.get('/products/:id',(req , res) =>{
                  
                  productCollection.find({id:req.params.id})
                  .toArray(documents => {
                    res.send(documents[0]);
                  })
                })


                  app.get('/products',(req , res) =>{
                    productCollection.find({})
                    .toArray((err , documents) => {
                      res.send(documents);
                    })
                  })

                });

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || port)