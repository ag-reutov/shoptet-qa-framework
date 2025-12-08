import { faker } from '@faker-js/faker';

export type Customer = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  street: string;
  city: string;
  zip: string;
  country: string;
};

export const buildCustomer = (): Customer => {
  // Generate valid Czech mobile number: 705 + 6 random digits
  const digit1 = faker.number.int({ min: 0, max: 9 });
  const digit2 = faker.number.int({ min: 0, max: 9 });
  const digit3 = faker.number.int({ min: 0, max: 9 });
  const digit4 = faker.number.int({ min: 0, max: 9 });
  const digit5 = faker.number.int({ min: 0, max: 9 });
  const digit6 = faker.number.int({ min: 0, max: 9 });
  const phone = `+420 705 ${digit1}${digit2}${digit3} ${digit4}${digit5}${digit6}`;

  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password({ length: 12, memorable: true }),
    phone,
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    zip: faker.location.zipCode(),
    country: 'Czech Republic',
  };
};

export const buildCredentials = () => ({
  email: faker.internet.email().toLowerCase(),
  password: faker.internet.password({ length: 12 }),
});
