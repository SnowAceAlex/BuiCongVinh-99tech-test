import { PrismaClient } from "../src/generated/prisma/client.js";
const prisma = new PrismaClient();

async function seed() {
  await prisma.resource.createMany({
    data: [
      {
        name: "Resource 1",
        description: "Description 1",
      },
      {
        name: "Resource 2",
        description: "Description 2",
      },
    ],
  });
  console.log("Seed completed");
}

seed().then(() => prisma.$disconnect());
