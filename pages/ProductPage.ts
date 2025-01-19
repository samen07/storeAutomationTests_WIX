import { Page, expect } from '@playwright/test';
import { GenericStorePage } from './GenericStorePage';

export class ProductPage extends GenericStorePage {
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
        this.page.once('dialog', async (dialog) => {
            expect(dialog.message()).toBe('Product added');
            await dialog.accept();
        });
        await this.page.click('a.btn.btn-success');
    }
}
