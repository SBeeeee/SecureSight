import prisma from "../config/database.js";

export async function getCameras() {
    return await prisma.camera.findMany({
      include: {
        incidents: true, 
      },
    });
  }
