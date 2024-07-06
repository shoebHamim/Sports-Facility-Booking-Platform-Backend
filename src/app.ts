import  express  from 'express';
import { Application } from "express-serve-static-core";
import cors from "cors"
import router from './app/routes/index.route';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';


const app:Application=express()
// parsers
app.use(express.json());
app.use(cors());

// routes
app.use('/api',router)

// root path
app.get('/',(req,res)=>{
  res.send('hello world!')
})

// middlewares
app.use(globalErrorHandler)


export default app;
