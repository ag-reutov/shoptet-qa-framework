import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Counter, Rate } from 'k6/metrics';

/**
 * Performance Test - Homepage Load
 *
 * Demonstrates:
 * - Basic load testing with k6
 * - Custom metrics (Trend, Counter, Rate)
 * - Threshold assertions
 * - Think time between requests
 */

// Custom metrics
const pageLoadTime = new Trend('page_load_time');
const errorCount = new Counter('errors');
const successRate = new Rate('success_rate');

// Test configuration
export const options = {
  stages: [
    { duration: '10s', target: 5 }, // Ramp up to 5 users
    { duration: '30s', target: 10 }, // Stay at 10 users
    { duration: '10s', target: 0 }, // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'], // Response time thresholds
    http_req_failed: ['rate<0.1'], // Max 10% failure rate
    success_rate: ['rate>0.9'], // Min 90% success
  },
};

export default function () {
  // Test homepage load
  const response = http.get('https://755742.myshoptet.com/', {
    headers: {
      'User-Agent': 'k6-performance-test',
      Accept: 'text/html,application/xhtml+xml',
    },
  });

  // Collect metrics
  pageLoadTime.add(response.timings.duration);
  successRate.add(response.status === 200);

  // Validate response
  const checkResult = check(response, {
    'status is 200': (r) => r.status === 200,
    'has content': (r) => r.body.length > 0,
    'has title': (r) => r.body.includes('Shoptet'),
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  if (!checkResult) {
    errorCount.add(1);
  }

  // Think time - simulate user reading the page
  sleep(2);
}
