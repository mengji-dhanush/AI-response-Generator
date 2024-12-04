const express=require("express");
const app=express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const GEMINI_API_KEY=process.env.GEMINI_API_KEY;

let port=3000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"index.html"));
});

app.post("/generate",async (req,res)=>{
    let prompt=req.body.prompt;
    const result = await model.generateContent(prompt);
    res.send(result.response.text());
});

app.listen(port,()=>{
    console.log("server started listening on port:",port);
});