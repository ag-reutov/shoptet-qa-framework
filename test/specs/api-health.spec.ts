import { test, expect } from '@playwright/test';

test.describe('API Health Checks', () => {

    test('Homepage should return 200 OK', async ({ request }) => {
        // 1. Start the timer
        const startTime = Date.now();
        
        // 2. Send request
        const response = await request.get('/');
        
        // 3. Stop the timer
        const duration = Date.now() - startTime;

        // 4. Assertions
        expect(response.status(), 'Server should respond with 200 OK').toBe(200);
        expect(response.headers()['content-type']).toContain('text/html');
        
        // 5. Performance Check
        console.log(`Response time: ${duration}ms`);
        expect(duration).toBeLessThan(2000);
    });

    test('Cart endpoint should exist', async ({ request }) => {
        const response = await request.get('/kosik/');
        expect(response.status()).toBe(200);
    });

});