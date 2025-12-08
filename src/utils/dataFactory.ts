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

export const buildCustomer = (): Customer => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email().toLowerCase(),
  password: faker.internet.password({ length: 12, memorable: true }),
  phone: faker.phone.number('+420 6## ### ###'),
  street: faker.location.streetAddress(),
  city: faker.location.city(),
  zip: faker.location.zipCode(),
  country: 'Czech Republic',
});

export const buildCredentials = () => ({
  email: faker.internet.email().toLowerCase(),
  password: faker.internet.password({ length: 12 }),
});
