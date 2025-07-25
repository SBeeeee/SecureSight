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