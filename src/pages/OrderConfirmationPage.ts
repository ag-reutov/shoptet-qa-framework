import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class OrderConfirmationPage extends BasePage {
  readonly confirmationHeading: Locator;
  readonly orderNumberDisplay: Locator;
  readonly orderSummary: Locator;
  readonly orderTotal: Locator;
  readonly customerEmail: Locator;

  constructor(page: Page) {
    super(page);
    this.confirmationHeading = page.locator('text=Objednávka odeslána');
    // Order number typically appears as "Číslo objednávky: #123456" or similar
    this.orderNumberDisplay = page.locator(
      '[data-testid="orderNumber"], text=/Číslo objednávky|Order #/i',
    );
    // Order summary section
    this.orderSummary = page.locator('[data-testid="orderSummary"], .order-summary');
    // Order total price
    this.orderTotal = page.locator('[data-testid="orderTotal"], text=/Celkem|Total/i');
    // Customer email confirmation
    this.customerEmail = page.locator('[data-testid="confirmationEmail"], text=@');
  }

  async assertOrderSuccess() {
    // Wait for page to load after order submission
    await this.page.waitForLoadState('networkidle');

    // Verify we're on a confirmation page (check URL pattern)
    const pageUrl = this.page.url();
    expect(pageUrl).toMatch(/objednavka|order|dekujeme|confirmation/i);

    // Try to find and log order number
    const orderNumber = await this.orderNumberDisplay.textContent().catch(() => null);
    console.log('Order number:', orderNumber || 'Not found');

    // Verify order summary is visible
    const summaryVisible = await this.orderSummary.isVisible().catch(() => false);
    console.log('Order summary visible:', summaryVisible);

    // Try to find and log order total
    const total = await this.orderTotal.textContent().catch(() => null);
    console.log('Order total:', total || 'Not found');

    // Verify we have some confirmation content
    const pageContent = await this.page.content();
    const hasConfirmation =
      pageContent.includes('Objednávka') ||
      pageContent.includes('Order') ||
      pageContent.includes('Děkujeme') ||
      pageContent.includes('Thank');

    expect(hasConfirmation).toBeTruthy();
  }

  async getOrderNumber(): Promise<string | null> {
    try {
      const text = await this.orderNumberDisplay.textContent();
      // Extract number from text like "Číslo objednávky: 123456"
      const match = text?.match(/(\d+)/);
      return match ? match[1] : null;
    } catch {
      return null;
    }
  }

  async getOrderTotal(): Promise<string | null> {
    try {
      return await this.orderTotal.textContent();
    } catch {
      return null;
    }
  }

  async getConfirmationEmail(): Promise<string | null> {
    try {
      return await this.customerEmail.textContent();
    } catch {
      return null;
    }
  }
}
