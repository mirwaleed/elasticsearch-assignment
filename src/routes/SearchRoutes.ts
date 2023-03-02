import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { IReq, IRes } from './types/express/misc';
import elasticClient from '@src/helpers/elasticSearch/client';

const prisma = new PrismaClient();

// **** Functions **** //

const search = async (req: IReq, res: IRes) => {
  const { id }: { id?: string } = req.query;
  const car = await prisma.cars.findUnique({
    where: { id: parseInt(id ?? '0') },
  });

  return res.status(HttpStatusCodes.OK).json({ car });
};

const add = async (req: IReq, res: IRes) => {
  let bulkResponse: any = [];
  try {
    for (let index = 0; index < (process?.env?.NO_OF_RECORDS ?? 1); index++) {
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
    }

    const allCars = await prisma.cars.findMany();
    const operations = allCars.flatMap((doc: any) => [
      { index: { _index: 'name2' } },
      { id: doc.id, name: doc.name, make: doc.make, model: doc.model },
    ]);
    bulkResponse = await elasticClient.bulk({
      refresh: true,
      operations,
    });
  } catch (error) {
    console.log(error);
  } finally {
    return res.status(HttpStatusCodes.OK).send('data successfully added');
  }
};

const elasticSearch = async (req: IReq, res: IRes) => {
  const { query }: any = req.body;
  const body = await elasticClient.search({ query });

  return res.status(HttpStatusCodes.OK).json(body);
};

// **** Export default **** //

export default {
  search,
  add,
  elasticSearch,
} as const;
