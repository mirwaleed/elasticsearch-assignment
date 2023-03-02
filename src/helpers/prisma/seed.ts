import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);
  try {
    for (let index = 0; index < 150000; index++) {
      const carResponse = await prisma.cars.create({
        data: {
          make: `make_${index}`,
          model: faker.vehicle.model(),
          manufacturer: faker.vehicle.manufacturer(),
          name: faker.vehicle.vehicle(),
          description: faker.lorem.paragraph(10),
          mileage: faker.datatype.number(),
          color: faker.vehicle.color(),
          engine_type: faker.helpers.arrayElement([
            'Petrol',
            'CNG',
            'Diesel',
            'Hybrid',
          ]),
          engine_capacity: faker.datatype.number(),
          transmission: faker.helpers.arrayElement(['Automatic', 'Manual']),
          assembly: faker.helpers.arrayElement(['Local', 'Imported']),
          type: faker.vehicle.type(),
        },
      });
      console.log(`Created user with id: ${carResponse.id}`);
    }
  } catch (error) {
    console.log(error);
  }

  console.log(`Seeding finished.`);
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
