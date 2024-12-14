import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 20; i++) {
    // Create a Product
    await prisma.product.create({
      data: {
        event: `${faker.location.city()} ${faker.helpers.arrayElement([
          'F1 Grand Prix',
          'MotoGP Grand Prix',
          'Rallycross',
          'Superbike',
          'IndyCar',
        ])}`,
        type: faker.helpers.arrayElement([
          'General Admission',
          'VIP',
          'Grandstand',
        ]),
        price: faker.number.int({ min: 50, max: 1000 }),
        availability: faker.datatype.boolean(),
        seat: `${faker.helpers.arrayElement(['Section A', 'Section B', 'Section C'])} Row ${faker.number.int({
          min: 1,
          max: 30,
        })} Seat ${faker.number.int({ min: 1, max: 100 })}`,
      },
    });

    // Create a Profile
    await prisma.profile.create({
      data: {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(), // Secure random password
      },
    });
  }
}

main()
  .then(async () => {
    console.log('Database seeded successfully!');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
