import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import cors from "cors"
import admineRoute from "./src/users/user.route.js"
import bookRoutes from "./src/books/book.route.js"
import orderRoutes from "./src/orders/order.route.js"
import statsRoutes from "./src/stats/admin.route.js"
// const express = require('express')ll
import authRoutes from "./src/auth/auth.route.js"
import passport from "./src/auth/passport.config.js";
import session from "express-session";
import cookieParser from "cookie-parser";
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
// app.use(helmet());
// app.use(cookieParser());
app.use(session({ secret: process.env.JWT_SECRET_KEY, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/api/books",bookRoutes)
app.use("/api/orders",orderRoutes)
app.use("/api/stats",statsRoutes)
app.use("/api/auth",authRoutes)




// db connection
async function main() {
  await mongoose.connect(process.env.DB_URL) // makes connection to the db
  
}

main().then(()=>console.log("mongoDb connected successfully")).catch(err=>console.log(err))
app.use('/', (req, res) => {
  res.send('Hello World')
}

)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})