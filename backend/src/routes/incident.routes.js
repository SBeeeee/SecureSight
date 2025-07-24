import express from "express";
import { fetchIncidents,resolveIncident } from "../controllers/incident.controller.js";

const router = express.Router()

router.get('/', fetchIncidents)
router.patch('/:id/resolve', resolveIncident)

export default router;