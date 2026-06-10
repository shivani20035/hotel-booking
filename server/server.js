import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");
import { clerkMiddleware } from '@clerk/express'

import express from "express";
import "dotenv/config";
import cors from "cors";

import connectDB from "./config/db.js";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
connectDB();



const app=express()
app.use(cors())

//middleware
app.use(express.json())
app.use(clerkMiddleware())

//Api to listen to clerk
app.use("api/clerk",clerkWebhooks)




app.get('/',(req, res)=> res.send("API is working fine"))

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));