import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/MainPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { TEST_PRODUCTS } from '../config/testData.json';

test('productCouldBeAddedToCart', async ({ page }) => {
    const mainPage = new MainPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await mainPage.navigate();
    await mainPage.selectProductByIndex(0, TEST_PRODUCTS); // Select Nexus 6

    await productPage.assertProductDetails(TEST_PRODUCTS[0].name, TEST_PRODUCTS[0].price);
    await productPage.addToCart();

    await cartPage.navigate();
    await cartPage.assertCartContainsProductByIndex(0, TEST_PRODUCTS); // Check Nexus 6 in cart
});

test('mainPageHaveCorrectLayout', async ({ page }) => {
    const mainPage = new MainPage(page);

    await mainPage.navigate();
    await mainPage.comparePageScreenshot('main-page-layout.png');
});
