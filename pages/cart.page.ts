import { Page, expect } from '@playwright/test';
import { GenericPage } from './generic.page';
import testData from "../config/testData.json";

export class CartPage extends GenericPage {
    private CART_URL : string = testData.URLS.cartPage;
    private productLocator : string = '#tbodyid .success';
    private productName : string = 'td:nth-child(2)';
    private productPrice : string = 'td:nth-child(3)';
    private productDelete : string = 'a:has-text("Delete")';

    constructor(page: Page) {
        super(page);
    }

    async navigate(): Promise<void> {
        await this.page.goto(this.CART_URL);
        await this.page.waitForLoadState('networkidle');
    }

    async assertCartContainsProductByIndex(
        productIndex: number,
        productList: { name: string; price: string }[]
    ): Promise<void> {
        const productName = productList[productIndex].name;
        const productPrice = productList[productIndex].price;

        const productRows = this.page.locator(this.productLocator);
        await expect(productRows).toHaveCount(productIndex + 1);

        const lastProduct = productRows.nth(productIndex);
        const lastProductName = lastProduct.locator(this.productName);
        const lastProductPrice = lastProduct.locator(this.productPrice);

        await expect(lastProductName).toHaveText(productName);
        await expect(lastProductPrice).toHaveText(productPrice);
    }

    async deleteProduct(productName: string): Promise<void> {
        const productRows = this.page.locator(this.productLocator);
        await expect(productRows).toBeVisible();

        for (let i = 0; i < await productRows.count(); i++) {
            const productText = await productRows.nth(i).locator(this.productName).textContent();

            if (productText?.trim() === productName) {
                const deleteButton = productRows.nth(i).locator(this.productDelete);
                await deleteButton.click();
                await this.page.waitForSelector(this.productLocator, { state: 'detached' });

                return;
            }
        }

        throw new Error(`Product with name "${productName}" not found in the cart.`);
    }

    async getAmountOfProducts(): Promise<number> {
        const productRows = this.page.locator(this.productLocator);

        return await productRows.count();
    }
}
