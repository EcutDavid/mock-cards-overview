import faker from 'faker';
import providers from './providers';

const ITEM_COUNT = 100;

const mockData = [];
for (let i = 0; i < ITEM_COUNT; i++) {
  mockData.push({});
}

const LARGEST_DISCOUNT = 95;
const MAX_TYPE_COUNT = 4;
for (const element of mockData) {
  const providerIndex = Number.parseInt(Math.random() * providers.length);
  element.name = providers[providerIndex].couponName;
  element.provider = providers[providerIndex].name;

  // At least 5% discount...
  element.discountPercentage = Number.parseInt(Math.random() * LARGEST_DISCOUNT) + 5;

  // Atleast 1 type exist...
  const typeCount = Number.parseInt(Math.random() * MAX_TYPE_COUNT) + 1;
  for (let i = 0; i < typeCount; i++) {
    if (!element.types) element.types = [faker.commerce.product()];
    element.types.push(faker.commerce.product());
  }
}

export default mockData;
