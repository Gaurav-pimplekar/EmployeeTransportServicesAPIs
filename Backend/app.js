import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./utils/db.js";
import userRouter from "./routes/user.route.js";
import employeeRouter from "./routes/employee.route.js"
import vehicleRouter from "./routes/vehicle.route.js"
import driverRouter from "./routes/driver.route.js"
import pairRouter from "./routes/pair.route.js"
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());


app.use(userRouter);
app.use(employeeRouter);
app.use(vehicleRouter);
app.use(driverRouter);
app.use(pairRouter);
connectDB();

const port = process.env.PORT;

app.listen(port, ()=>{
  console.log("app listening on port "+port);
})