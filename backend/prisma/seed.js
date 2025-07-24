// prisma/seed.js
import { PrismaClient } from '../generated/prisma/index.js'

const prisma = new PrismaClient();

async function main() {
  await prisma.incident.deleteMany();
  await prisma.camera.deleteMany();

  // Seed Cameras
  await prisma.camera.createMany({
    data: [
      { name: 'Main Gate', location: 'North Entrance' },
      { name: 'Shop Floor', location: 'Warehouse Section A' },
      { name: 'Office Lobby', location: 'Admin Block' },
    ],
  });

  const cameraList = await prisma.camera.findMany();

  const types = ['Motion', 'Intrusion', 'Object Removed', 'Tampering'];
  const now = new Date();
  const incidents = [];

  for (let i = 0; i < 12; i++) {
    incidents.push({
      cameraId: cameraList[i % cameraList.length].id,
      timestamp: new Date(now.getTime() - i * 2 * 60 * 60 * 1000),
      type: types[i % types.length],
      thumbnail: `https://placehold.co/200x150?text=Incident+${i + 1}`,
      resolved: i % 3 === 0,
    });
  }

  await prisma.incident.createMany({ data: incidents });

  console.log('✅ Seed successful!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
