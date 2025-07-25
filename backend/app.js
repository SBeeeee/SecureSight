import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from  "cors";
import incidentrouter from './src/routes/incident.routes.js'
import camerarouter from './src/routes/camera.routes.js'
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb" })); // allows you to parse the body of the request
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000", // Allow your frontend origin
    credentials: true, // If you're using cookies/sessions
  }));

app.use("/api/incidents",incidentrouter);
app.use("/api/camera",camerarouter);

app.listen(PORT,()=>{
    console.log("Server is running on http://localhost:" + PORT);
})