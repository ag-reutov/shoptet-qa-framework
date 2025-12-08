import { test, expect } from '@playwright/test';
import { validateJson, echoSchema } from '../../src/utils/apiSchema';
import { buildCustomer } from '../../src/utils/dataFactory';

test.describe('API Health Checks', () => {
  test('Homepage should return 200 OK', async ({ request }) => {
    const startTime = Date.now();
    const response = await request.get('/');
    const duration = Date.now() - startTime;

    expect(response.status(), 'Server should respond with 200 OK').toBe(200);
    expect(response.headers()['content-type']).toContain('text/html');
    expect(duration).toBeLessThan(2000);
  });

  test('Cart endpoint should exist', async ({ request }) => {
    const response = await request.get('/kosik/');
    expect(response.status()).toBe(200);
  });

  test('@api echo endpoint matches contract', async ({ request }) => {
    const customer = buildCustomer();
    const response = await request.get('https://postman-echo.com/get', {
      params: { email: customer.email },
    });

    expect(response.ok()).toBeTruthy();

    const parsed = await validateJson(response, echoSchema);
    expect(parsed.url).toContain('postman-echo.com/get');
    expect(parsed.args?.email).toBe(customer.email);
  });
});
