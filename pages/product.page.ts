import { Page, expect } from '@playwright/test';
import { GenericPage } from './generic.page';

export class ProductPage extends GenericPage {
    constructor(page: Page) {
        super(page);
    }

    async assertProductDetails(name: string, price: string): Promise<void> {
        const productName = this.page.locator('h2.name');
        const productPrice = this.page.locator('h3.price-container');

        await expect(productName).toHaveText(name);
        await expect(productPrice).toHaveText(price);
    }

    async addToCart(): Promise<void> {
        await this.page.click('a.btn-success');
        const alertPromise = this.page.waitForEvent('dialog');
        const alert = await alertPromise;
        expect(alert.message()).toBe('Product added');
        await alert.accept();
    }
}
