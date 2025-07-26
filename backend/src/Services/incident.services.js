import prisma from "../config/database.js";

export async function getIncidents(resolved) {
  return await prisma.incident.findMany({
    where: {
      resolved: resolved,
    },
  })
}

export async function toggleResolved(id) {
  const existing = await prisma.incident.findUnique({
    where: { id: Number(id) }
  })
  if (!existing) throw new Error('Incident not found')

  const updated = await prisma.incident.update({
    where: { id: Number(id) },
    data: { resolved: !existing.resolved }
  })

  return updated
}

export async function getIncidentCounts() {
  const resolvedCount = await prisma.incident.count({
    where: { resolved: true },
  });

  const unresolvedCount = await prisma.incident.count({
    where: { resolved: false },
  });

  return {
    resolved: resolvedCount,
    unresolved: unresolvedCount,
  };
}      

export async function assignIncidentToUser(incidentId, userId) {
  return await prisma.incident.update({
    where: { id: Number(incidentId) },
    data: { assignedToId: Number(userId) },
  });
}

export async function getAssignedIncidents(userId) {
  return await prisma.incident.findMany({
    where: { assignedToId: userId },
    include: {
      camera: true,
    },
  });
}

export async function getUnassignedIncidents() {
  return await prisma.incident.findMany({
    where: { assignedToId: null },
    include: {
      camera: true,
    },
  });
}
