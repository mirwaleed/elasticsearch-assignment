import elasticClient from './client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const allCars = await prisma.cars.findMany();

    const operations = allCars.flatMap((doc: any) => [
      { index: { _index: 'name' } },
      { id: doc.id, name: doc.name, make: doc.make, model: doc.model },
    ]);

    const bulkResponse = await elasticClient.bulk({
      refresh: true,
      operations,
    });
    console.log(bulkResponse);
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
