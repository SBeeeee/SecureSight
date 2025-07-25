import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

const imageUrls = [
  'pic1.jpeg',
  'pic2.jpeg',
  'pic3.jpeg',
  'pic4.jpeg',
];

async function main() {
  const cameraData = [
    { name: 'Shop Floor A', location: 'Manufacturing Unit' },
    { name: 'Vault', location: 'Basement Security Zone' },
    { name: 'Entrance', location: 'Main Lobby' },
  ];
  await prisma.camera.createMany({ data: cameraData });

  const cameras = await prisma.camera.findMany();
  const incidentTypes = ['Unauthorised Access', 'Gun Threat', 'Face Recognised'];
  const now = new Date();

  const incidents = Array.from({ length: 12 }).map((_, i) => ({
    cameraId: cameras[i % cameras.length].id,
    timestamp: new Date(now.getTime() - i * 2 * 60 * 60 * 1000),
    type: incidentTypes[i % incidentTypes.length],
    thumbnail: imageUrls[i % imageUrls.length], // 🔁 fixed
    resolved: i % 4 === 0,
  }));

  await prisma.incident.createMany({ data: incidents });

  console.log('✅ Seeded cameras and incidents successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
