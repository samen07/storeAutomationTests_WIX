import { Page, expect } from '@playwright/test';
import { GenericStorePage } from './GenericStorePage';

export class CartPage extends GenericStorePage {
    constructor(page: Page) {
        super(page);
    }

    async navigate(): Promise<void> {
        await this.page.goto('https://www.demoblaze.com/cart.html');
        await this.page.waitForLoadState('networkidle');
    }

    async assertCartContainsProductByIndex(
        productIndex: number,
        productList: { name: string; price: string }[]
    ): Promise<void> {
        const productName = productList[productIndex].name;
        const productPrice = productList[productIndex].price;

        const productRows = this.page.locator('#tbodyid .success');
        await expect(productRows).toHaveCount(productIndex + 1);

        const lastProduct = productRows.nth(productIndex);
        const lastProductName = lastProduct.locator('td:nth-child(2)');
        const lastProductPrice = lastProduct.locator('td:nth-child(3)');

        await expect(lastProductName).toHaveText(productName);
        await expect(lastProductPrice).toHaveText(productPrice);
    }
}
