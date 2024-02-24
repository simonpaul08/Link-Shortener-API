import express from "express";
import { connectToDB } from "./config/connectDB.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import LinkRoutes from './routes/linkRoutes.js';
import { redirectToOriginal } from "./controllers/linkControllers.js";
dotenv.config()

connectToDB()

const PORT = process.env.PORT;

const app = express()

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: "Server is running." })
})

app.use("/link", LinkRoutes)
app.get("/:id", redirectToOriginal)

app.listen(PORT, () => {
    mongoose.connection.once('open', () => {
        console.log('Connected To DB');
        console.log(`server running on port ${PORT}`);
    })
})
