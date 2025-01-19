import { test } from '@playwright/test';
import { MainPage } from '../pages/MainPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { TEST_PRODUCTS } from '../config/testData.json';

test('productCouldBeDeletedFromCart', async ({ page }) => {
    const mainPage = new MainPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await mainPage.navigate();
    await mainPage.selectProductByIndex(1, TEST_PRODUCTS); // Select Iphone 6 32gb

    await productPage.addToCart();
    await cartPage.navigate();

    const productRows = cartPage.page.locator('#tbodyid .success');
    await productRows.locator('a:has-text("Delete")').click();
    await cartPage.page.waitForTimeout(1000); // Wait for deletion

    await expect(productRows).toHaveCount(0);
});
