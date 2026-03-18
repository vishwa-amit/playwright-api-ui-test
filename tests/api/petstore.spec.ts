import { test, expect } from '@playwright/test';

test.describe('Swagger Petstore API', () => {
  test('should create a pet and retrieve it successfully', async ({ request }) => {
    const petId = Date.now();

    const petPayload = {
      id: petId,
      name: 'playwright-pet',
      status: 'available',
      category: {
        id: 1,
        name: 'dogs'
      },
      photoUrls: ['https://example.com/dog.png'],
      tags: [
        {
          id: 1,
          name: 'e2e'
        }
      ]
    };

    const createResponse = await request.post('https://petstore.swagger.io/v2/pet', {
      data: petPayload,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    expect(createResponse.ok()).toBeTruthy();
    expect(createResponse.status()).toBe(200);

    const createBody = await createResponse.json();
    expect(createBody.id).toBe(petId);
    expect(createBody.name).toBe('playwright-pet');
    expect(createBody.status).toBe('available');

    const getResponse = await request.get(`https://petstore.swagger.io/v2/pet/${petId}`);

    expect(getResponse.ok()).toBeTruthy();
    expect(getResponse.status()).toBe(200);

    const getBody = await getResponse.json();
    expect(getBody.id).toBe(petId);
    expect(getBody.name).toBe('playwright-pet');
    expect(getBody.status).toBe('available');
  });
});