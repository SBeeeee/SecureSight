import express from "express";
import { fetchIncidents,resolveIncident,fetchIncidentCounts } from "../controllers/incident.controller.js";

const router = express.Router()

router.get('/', fetchIncidents)
router.patch('/:id/resolve', resolveIncident)
router.get('/getcount',fetchIncidentCounts)

export default router;