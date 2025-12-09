import http from 'k6/http';
import { check } from 'k6';
import { Trend, Rate } from 'k6/metrics';

/**
 * Performance Test - API Endpoints
 *
 * Tests:
 * - API response times
 * - Endpoint availability
 * - Response validation
 */

const apiResponseTime = new Trend('api_response_time');
const apiSuccess = new Rate('api_success_rate');

export const options = {
  stages: [
    { duration: '5s', target: 2 },
    { duration: '10s', target: 3 },
    { duration: '5s', target: 0 },
  ],
  thresholds: {
    api_response_time: ['p(95)<300'],
    http_req_failed: ['rate<0.1'],
  },
};

export default function () {
  // Test homepage endpoint
  const homepageResponse = http.get('https://755742.myshoptet.com/');
  apiResponseTime.add(homepageResponse.timings.duration);

  const homepageCheck = check(homepageResponse, {
    'homepage status 200': (r) => r.status === 200,
    'homepage response < 300ms': (r) => r.timings.duration < 300,
  });

  apiSuccess.add(homepageCheck);

  // Test category endpoint
  const categoryResponse = http.get('https://755742.myshoptet.com/obleceni/');
  apiResponseTime.add(categoryResponse.timings.duration);

  const categoryCheck = check(categoryResponse, {
    'category status 200': (r) => r.status === 200,
    'category response < 300ms': (r) => r.timings.duration < 300,
  });

  apiSuccess.add(categoryCheck);

  // Test cart endpoint
  const cartResponse = http.get('https://755742.myshoptet.com/kosik/');
  apiResponseTime.add(cartResponse.timings.duration);

  const cartCheck = check(cartResponse, {
    'cart status 200': (r) => r.status === 200,
    'cart response < 300ms': (r) => r.timings.duration < 300,
  });

  apiSuccess.add(cartCheck);
}
