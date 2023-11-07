import express from "express";
import {PORT, mongoDbUrl} from "./config.js";
import mongoose from "mongoose";
import {Product} from "./models/product.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    console.log(req);
    return res.status(400).send("Jai Shree Ram")
})

app.post("/product", async (request, response) => {
    try {
        if (!request.body.title || !request.body.seller || !request.body.launchYear) {
            return response.status(400).send({
                message: "Please send all required fields: Title,Seller,Launch Year"
            })
        }

        // If successfull request then create entry in Database

        const newProduct = {
            title: request.body.title,
            seller: request.body.seller,
            launchYear: request.body.launchYear
        }
        const product = await Product.create(newProduct);
        return response.status(201).send(product);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({message: error.message})
    }
});

app.get("/products", async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({
            count: products.length,
            data: products
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({message: error});
    }
});

app.get("/product/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        return res.status(200).json(product);
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({message: error});
    }
})
app.put("/products/:id", async (request,response)=>{
    try{
        if (!request.body.title || !request.body.seller || !request.body.launchYear) {
            return response.status(400).send({
                message: "Please send all required fields: Title,Seller,Launch Year"
            })
        }
        const {id} = request.params;
        const result = await Product.findByIdAndUpdate(id,request.body);
        if(!result){
            return response.status(404).json({message:"Product Not Found!"});
        }
    } catch(error){
        console.log(error);
        response.status(500).send({message:error.message})
    }
})

mongoose.connect(mongoDbUrl)
    .then(() => {
        console.log("You connection to database is successful.");
        app.listen(PORT, () => {
            console.log(`connected on ${PORT}`)
        });
    })
    .catch((error) => {
        console.log(error);
    });

