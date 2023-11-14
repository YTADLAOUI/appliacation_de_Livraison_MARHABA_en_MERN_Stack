import Express  from "express";
const app= Express()
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
dotenv.config()
app.use(cookieParser());


const PORT=process.env.SERVER_PORT
console.log(PORT)
app.listen(
  PORT,()=>{
    console.log(`server run in ${PORT}...`)
  }
)