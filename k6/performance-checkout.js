import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Counter, Rate } from 'k6/metrics';

/**
 * Performance Test - Checkout Flow
 *
 * Simulates:
 * - Homepage load
 * - Add product to cart
 * - Navigate to checkout
 * - Measure performance at each step
 */

// Custom metrics
const checkoutTime = new Trend('checkout_flow_duration');
const cartAddTime = new Trend('cart_add_duration');
const errorCount = new Counter('checkout_errors');
const checkoutSuccess = new Rate('checkout_success_rate');

export const options = {
  stages: [
    { duration: '5s', target: 3 }, // Ramp up to 3 users
    { duration: '20s', target: 5 }, // Stay at 5 users
    { duration: '5s', target: 0 }, // Ramp down
  ],
  thresholds: {
    checkout_flow_duration: ['p(95)<2000', 'p(99)<3000'],
    cart_add_duration: ['p(95)<800'],
    http_req_failed: ['rate<0.1'],
  },
};

export default function () {
  const startTime = new Date().getTime();

  // Step 1: Load homepage
  const homeResponse = http.get('https://755742.myshoptet.com/', {
    headers: {
      'User-Agent': 'k6-checkout-test',
    },
  });

  check(homeResponse, {
    'homepage loads': (r) => r.status === 200,
  });

  sleep(1);

  // Step 2: Navigate to clothing category
  const categoryResponse = http.get('https://755742.myshoptet.com/obleceni/', {
    headers: {
      'User-Agent': 'k6-checkout-test',
    },
  });

  check(categoryResponse, {
    'category page loads': (r) => r.status === 200,
  });

  sleep(1);

  // Step 3: Simulate add to cart (POST request would be here in real scenario)
  const cartStartTime = new Date().getTime();

  const cartResponse = http.get('https://755742.myshoptet.com/kosik/', {
    headers: {
      'User-Agent': 'k6-checkout-test',
    },
  });

  const cartDuration = new Date().getTime() - cartStartTime;
  cartAddTime.add(cartDuration);

  check(cartResponse, {
    'cart page loads': (r) => r.status === 200,
  });

  sleep(1);

  // Step 4: Navigate to checkout
  const checkoutResponse = http.get('https://755742.myshoptet.com/objednavka/krok-1/', {
    headers: {
      'User-Agent': 'k6-checkout-test',
    },
  });

  const totalDuration = new Date().getTime() - startTime;
  checkoutTime.add(totalDuration);

  const checkoutCheck = check(checkoutResponse, {
    'checkout page loads': (r) => r.status === 200,
    'checkout < 2 seconds': (r) => totalDuration < 2000,
  });

  if (checkoutCheck) {
    checkoutSuccess.add(1);
  } else {
    errorCount.add(1);
  }

  sleep(1);
}
