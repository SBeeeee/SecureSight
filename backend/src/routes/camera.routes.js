import express from "express";
import { fetchCameras } from "../controllers/camera.controllers.js";

const router = express.Router()

router.get('/all',fetchCameras);

export default router;