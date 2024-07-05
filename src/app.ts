import  express  from 'express';
import { Application } from "express-serve-static-core";
import cors from "cors"


const app:Application=express()
// parsers
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
  res.send('hello world!')
})



export default app;
