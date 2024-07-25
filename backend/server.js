import dotenv from 'dotenv'
import connectDB from "./config/connecttoDB.js";
import express, {json} from 'express'
import cors from 'cors'
import faucetRoutes from "./routes/faucetRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import dailyRoutes from  './routes/dailyRoutes.js'
import remindersRoutes from "./routes/reminder.js";
import cookieParser from "cookie-parser";
import reflinkRoutes from "./routes/reflinkRoutes.js";

if (process.env.NODE_ENV != 'production') {
    dotenv.config()
}

connectDB()


const app = express()
app.use(express.json())
app.use(cors({
    origin: true,
    credentials: true,
}))
app.use(cookieParser())
app.get("/",(req,res)=>{
    res.json({hello :"world"})
})
app.use('/', faucetRoutes)
app.use('/', dailyRoutes)
app.use('/', usersRoutes)
app.use('/', reflinkRoutes)
app.use('/', remindersRoutes)

app.listen(process.env.PORT || 3000 || 5000)