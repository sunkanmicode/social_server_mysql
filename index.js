import express  from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./src/routes/usersRoute.js";
import authRouter from "./src/routes/authRoute.js";

const app = express();

//MIDDLEWARE
app.use(express.json())
app.use(cors());
app.use(cookieParser());




app.use("/api/users", userRouter)
app.use("/api/auth", authRouter);

app.listen(8080, ()=>{
    console.log("App start at port 8080")
})