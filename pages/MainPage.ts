import { Page } from '@playwright/test';
import { GenericStorePage } from './GenericStorePage';

export class MainPage extends GenericStorePage {
    private productSelector = (productName: string) => `a:has-text("${productName}")`;

    constructor(page: Page) {
        super(page);
    }

    async navigate(): Promise<void> {
        await this.page.goto('https://www.demoblaze.com/index.html');
        await this.page.waitForLoadState('networkidle');
    }

    async selectProductByName(productName: string, productList: { name: string }[]): Promise<void> {
        await this.page.locator(this.productSelector(productName)).click();
    }

    async selectProductByIndex(productIndex: number, productList: { name: string }[]): Promise<void> {
        const productName = productList[productIndex].name;
        await this.page.locator(this.productSelector(productName)).click();
    }
}
