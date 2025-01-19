import { Page, expect } from '@playwright/test';
import { MainPage } from './MainPage';

export class GenericStorePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goToMainPage(): Promise<MainPage> {
        await this.page.locator('.navbar-brand').click();
        await this.page.waitForLoadState('networkidle');
        return new MainPage(this.page);
    }

    async comparePageScreenshot(snapshotName: string): Promise<void> {
        const screenshot = await this.page.screenshot();
        expect(screenshot).toMatchSnapshot(snapshotName);
    }
}
