import { getIncidents,toggleResolved } from "../Services/incident.services.js";

export async function fetchIncidents(req, res) {
    try {
      const { resolved } = req.query
      const isResolved = resolved === "true"; // Converts "true" or "false" string to boolean
      const incidents = await getIncidents(isResolved);
      res.status(200).json({
        incidents,
        success:true,
        message:"Incidents recieved"
      })
      
    } catch (err) {
      res.status(500).json({ 
        error: err.message ,
        success:false,
        message:"Issue faced to get incidents"
      })
    }
  }

export async function resolveIncident(req, res) {
    try {
      const { id } = req.params
      const updated = await toggleResolved(id)
      res.status(200).json({
        success:true,
        message:"Incident resolve state flipped",
        updated,
      })
    } catch (err) {
      res.status(500).json({
         error: err.message ,
        success:false,
        message:"Issue faced to change resolve status",

        })
    }
  }