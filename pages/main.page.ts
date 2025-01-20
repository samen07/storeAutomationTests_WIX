import { Page } from '@playwright/test';
import { GenericPage } from './generic.page';
import testData from "../config/testData.json";

export class MainPage extends GenericPage {
    private productSelector = (productName: string) => `a:has-text("${productName}")`;
    private TEST_URL : string = testData.URLS.mainPage;


    constructor(page: Page) {
        super(page);
    }

    async navigate(): Promise<MainPage> {
        await this.page.goto(this.TEST_URL);
        await this.page.waitForLoadState('networkidle');

        return this;
    }

    async selectProductByName(productName: string, productList: { name: string }[]): Promise<void> {
        await this.page.locator(this.productSelector(productName)).click();
        await this.page.waitForLoadState('networkidle');
    }

    async selectProductByIndex(productIndex: number, productList: { name: string }[]): Promise<void> {
        const productName = productList[productIndex].name;
        await this.page.locator(this.productSelector(productName)).click();
        await this.page.waitForLoadState('networkidle');
    }
}
