import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

const thumbnailPlaceholder = `data:image/jpeg;base64,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`;

async function main() {
  // Step 1: Clear existing data


  // Step 2: Create cameras
  const cameraData = [
    { name: 'Shop Floor A', location: 'Manufacturing Unit' },
    { name: 'Vault', location: 'Basement Security Zone' },
    { name: 'Entrance', location: 'Main Lobby' },
  ];
  await prisma.camera.createMany({ data: cameraData });

  const cameras = await prisma.camera.findMany();
  const incidentTypes = ['Unauthorised Access', 'Gun Threat', 'Face Recognised'];
  const now = new Date();

  // Step 3: Create 12 incidents over 24 hours
  const incidents = Array.from({ length: 12 }).map((_, i) => ({
    cameraId: cameras[i % cameras.length].id,
    timestamp: new Date(now.getTime() - i * 2 * 60 * 60 * 1000), // every 2 hrs ago
    type: incidentTypes[i % incidentTypes.length],
    thumbnail: thumbnailPlaceholder,
    resolved: i % 4 === 0, // every 4th incident resolved
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
