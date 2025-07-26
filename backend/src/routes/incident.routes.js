import express from "express";
import { fetchIncidents,resolveIncident,fetchIncidentCounts,assignIncident,fetchMyAssignedIncidents,fetchUnassignedIncidents } from "../controllers/incident.controller.js";
import { auth } from "../middleware/auth.middleware.js";
const router = express.Router()

router.get('/', fetchIncidents)
router.patch('/:id/resolve', resolveIncident)
router.get('/getcount',fetchIncidentCounts)
router.post("/assign",assignIncident);
router.get("/assigned",auth,fetchMyAssignedIncidents);
router.get("/unassigned",auth,fetchUnassignedIncidents);

export default router;