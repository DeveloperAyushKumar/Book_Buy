import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import cors from "cors"
import bookRoutes from "./src/books/book.route.js"
// const express = require('express')ll

const app = express()
const port =process.env.PORT|| 3000

//middlewares
app.use(express.json())
app.use(cors(
  {
    origin:["http://localhost:5173"],
    credentials:true,
  }
))

//routes
app.use("/api/books",bookRoutes)
async function main() {
  await mongoose.connect(process.env.DB_URL) // makes connection to the db
  
}

main().then(()=>console.log("mongoDb connected successfully")).catch(err=>console.log(err))
app.use('/', (req, res) => {
  res.send('Hello World!')
}

)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})