import {expect, test} from '@playwright/test';
import { MainPage } from '../pages/main.page';
import { ProductPage } from '../pages/product.page';
import { CartPage } from '../pages/cart.page';
import { TEST_PRODUCTS } from '../config/testData.json';
import {CustomExpect} from "../utils/feature";

test('002_productCouldBeDeletedFromCart', async ({ page }) => {
    const mainPage = new MainPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await mainPage.navigate();
    await mainPage.selectProductByIndex(1, TEST_PRODUCTS);

    await productPage.addToCart();
    await cartPage.navigate();

    expect(await cartPage.getAmountOfProducts()).toEqual(1);
    await cartPage.deleteProduct(TEST_PRODUCTS[1].name);

    const productCount = await cartPage.getAmountOfProducts();
    expect(productCount).toEqual(0);
});

test('005_cartPageShouldLoadFasterThan15sec', async ({ page }) => {
    const cartPage = new CartPage(page);

    const startTime = Date.now();
    await cartPage.navigate();
    const endTime = Date.now();
    const loadingTime = endTime - startTime;

    await CustomExpect.toBeLessThan(loadingTime, 15000, 'Expected cart page loading time to be less than 15 seconds');
});
