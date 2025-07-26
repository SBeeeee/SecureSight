import { getIncidents, toggleResolved, getIncidentCounts, getAssignedIncidents, getUnassignedIncidents, assignIncidentToUser } from "../Services/incident.services.js";

export async function fetchIncidents(req, res) {
  try {
    const { resolved } = req.query
    const isResolved = resolved === "true"; // Converts "true" or "false" string to boolean
    const incidents = await getIncidents(isResolved);
    res.status(200).json({
      incidents,
      success: true,
      message: "Incidents recieved"
    })

  } catch (err) {
    res.status(500).json({
      error: err.message,
      success: false,
      message: "Issue faced to get incidents"
    })
  }
}

export async function resolveIncident(req, res) {
  try {
    const { id } = req.params
    const updated = await toggleResolved(id)
    res.status(200).json({
      success: true,
      message: "Incident resolve state flipped",
      updated,
    })
  } catch (err) {
    res.status(500).json({
      error: err.message,
      success: false,
      message: "Issue faced to change resolve status",

    })
  }
}

export async function fetchIncidentCounts(req, res) {
  try {
    const counts = await getIncidentCounts();
    res.status(200).json({
      success: true,
      message: "Incident counts fetched",
      counts,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      error: err.message,
      success: false,
      message: "Failed to fetch incident counts",
    });
  }
}

export const assignIncident = async (req, res) => {
  try {
    const { incidentId, userId } = req.body;
    const updated = await assignIncidentToUser(incidentId, userId);
    res.status(200).json({ success: true, incident: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchMyAssignedIncidents = async (req, res) => {
  try {
    const userId = req.user.id;
    const assigned = await getAssignedIncidents(userId);
    res.status(200).json({ success: true, incidents: assigned });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchUnassignedIncidents = async (req, res) => {
  try {
    const incidents = await getUnassignedIncidents();
    res.status(200).json({ success: true, incidents });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};