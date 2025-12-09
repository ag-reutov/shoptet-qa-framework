# k6 Performance Testing

Basic performance testing for the Shoptet e-commerce platform using [k6](https://k6.io/).

## Overview

This directory contains k6 performance test scripts that showcase:

- Load testing capabilities
- Custom metrics and thresholds
- API endpoint validation
- Real-world scenario simulation

## Test Scenarios

### 1. Homepage Load Test (`performance-homepage.js`)

**Purpose:** Measure homepage performance under simulated load

**Load Profile:**

- Ramp up to 5 users over 10s
- Sustain 10 users for 30s
- Ramp down to 0 users

**Metrics:**

- `page_load_time` - Time to load homepage
- `errors` - Count of failed requests
- `success_rate` - Percentage of successful responses

**Thresholds:**

- 95th percentile response time < 500ms
- 99th percentile response time < 1000ms
- Failure rate < 10%

### 2. Checkout Flow Test (`performance-checkout.js`)

**Purpose:** Measure end-to-end checkout flow performance

**Simulated Flow:**

1. Load homepage
2. Navigate to clothing category
3. Add product to cart
4. Navigate to checkout page

**Load Profile:**

- Ramp up to 3 users over 5s
- Sustain 5 users for 20s
- Ramp down to 0 users

**Metrics:**

- `checkout_flow_duration` - Total time to complete checkout flow
- `cart_add_duration` - Time to add product to cart
- `checkout_success_rate` - Percentage of successful checkouts

**Thresholds:**

- 95th percentile checkout time < 2000ms
- 99th percentile checkout time < 3000ms
- Cart add time 95th percentile < 800ms

### 3. API Endpoints Test (`performance-api.js`)

**Purpose:** Validate API endpoint response times

**Tested Endpoints:**

- `/` - Homepage
- `/obleceni/` - Clothing category
- `/kosik/` - Shopping cart

**Metrics:**

- `api_response_time` - Response time for each endpoint
- `api_success_rate` - Percentage of successful responses

**Thresholds:**

- 95th percentile response time < 300ms
- Failure rate < 10%

## Running Tests

### Run individual tests

```bash
# Homepage load test
npm run perf:homepage

# Checkout flow test
npm run perf:checkout

# API endpoints test
npm run perf:api

# All tests sequentially
npm run perf:all
```

### Run with custom options

```bash
# Run with custom duration
k6 run -d 5m k6/performance-homepage.js

# Run with custom VU (Virtual Users)
k6 run -u 10 -d 1m k6/performance-homepage.js

# Run with summary output
k6 run -d 30s k6/performance-homepage.js --summary-export=results.json
```

### View results

```bash
# Results are printed to console after each test
# Look for the summary section with:
# ✓ Passed thresholds
# ✗ Failed thresholds (if any)
```

## Sample Output

```
     data_received..................: 245 kB   8.2 kB/s
     data_sent.......................: 23 kB    767 B/s
     http_req_blocked................: avg=121.32ms min=8ms    med=88ms    max=387ms   p(90)=250ms p(95)=300ms
     http_req_connecting.............: avg=0s     min=0s    med=0s    max=0s   p(90)=0s   p(95)=0s
     http_req_duration...............: avg=127.82ms min=29ms   med=68ms    max=412ms   p(90)=289ms p(95)=369ms ✓
     http_req_failed.................: 0%      ✓
     http_req_receiving..............: avg=32.18ms min=8ms    med=23ms    max=159ms   p(90)=76ms  p(95)=105ms
     http_req_sending................: avg=2.3ms  min=0s    med=2ms    max=11ms    p(90)=4ms   p(95)=5ms
     http_req_tls_handshaking........: avg=118.02ms min=0s    med=84ms    max=368ms   p(90)=243ms p(95)=289ms
     http_req_waiting................: avg=93.33ms min=9ms    med=37ms    max=353ms   p(90)=222ms p(95)=278ms
     http_requests...................: 50     1.667475/s
     http_rps..........................: 1.67
     iteration_duration..............: avg=4.09s  min=4.01s  med=4.05s   max=4.48s   p(90)=4.22s p(95)=4.3s
     iterations.......................: 50     1.667475/s
     page_load_time...................: avg=127.82ms min=29ms   med=68ms    max=412ms   p(90)=289ms p(95)=369ms
     success_rate.....................: 100%   ✓
     vus............................: 0       min=0  max=5
     vus_max..........................: 5       min=5  max=5
```

## Integration with CI/CD

These tests can be integrated into GitHub Actions:

```yaml
- name: Run performance tests
  run: npm run perf:all
```

## Best Practices

1. **Baseline Metrics:** Run tests regularly to establish performance baselines
2. **Threshold Tuning:** Adjust thresholds based on actual application performance
3. **Load Profiles:** Vary VU and duration to simulate different scenarios
4. **Think Time:** Includes realistic delays between actions (sleep)
5. **Error Handling:** Monitor failure rates and response times

## Resources

- [k6 Documentation](https://k6.io/docs/)
- [k6 API Reference](https://k6.io/docs/javascript-api/)
- [k6 Best Practices](https://k6.io/docs/testing-guides/load-testing/)

## Future Enhancements

- [ ] Login flow performance test
- [ ] Payment processing simulation
- [ ] Database-backed test data
- [ ] Real-time metrics dashboard
- [ ] Integration with monitoring tools (Datadog, New Relic)
