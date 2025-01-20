import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/main.page';
import { ProductPage } from '../pages/product.page';
import { CartPage } from '../pages/cart.page';
import { TEST_PRODUCTS } from '../config/testData.json';
import { CustomExpect } from '../utils/feature';

test('001_productCouldBeAddedToCart', async ({ page }) => {
    const mainPage = new MainPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await mainPage.navigate()
    await mainPage.selectProductByIndex(0, TEST_PRODUCTS);

    await productPage.assertProductDetails(TEST_PRODUCTS[0].name, "$" + TEST_PRODUCTS[0].price + " *includes tax");
    await productPage.addToCart();

    await cartPage.navigate();
    await cartPage.assertCartContainsProductByIndex(0, TEST_PRODUCTS);
});

test('003_mainPageHaveCorrectLayout', async ({ page }) => {
    const mainPage = new MainPage(page);

    await mainPage.navigate();
    await mainPage.comparePageScreenshot('main-page-layout.png');
});

test('004_mainPageShouldLoadFasterThan15sec', async ({ page }) => {
    const mainPage = new MainPage(page);

    const startTime = Date.now();
    await mainPage.navigate();
    const endTime = Date.now();
    const loadingTime = endTime - startTime;

    await CustomExpect.toBeLessThan(loadingTime, 15000, 'Expected main page loading time to be less than 15 seconds');
});