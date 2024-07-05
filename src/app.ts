import  express  from 'express';
import { Application } from "express-serve-static-core";
import cors from "cors"
import router from './app/routes/index.route';


const app:Application=express()
// parsers
app.use(express.json());
app.use(cors());



// routes
app.use('/api',router)

app.get('/',(req,res)=>{
  res.send('hello world!')
})



export default app;
