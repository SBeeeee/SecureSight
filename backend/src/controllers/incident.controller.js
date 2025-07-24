import { getIncidents,toggleResolved } from "../Services/incident.services.js";

export async function fetchIncidents(req, res) {
    try {
      const { resolved = 'false' } = req.query
      const incidents = await getIncidents(resolved)
      res.json(incidents)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

export async function resolveIncident(req, res) {
    try {
      const { id } = req.params
      const updated = await toggleResolved(id)
      res.json(updated)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }