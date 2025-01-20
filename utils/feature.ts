import { expect } from '@playwright/test';

export class CustomExpect {
    static async toBeTrue(condition: boolean, message: string): Promise<void> {
        if (!condition) {
            throw new Error(message);
        }
    }

    static async toBeLessThan(actual: number, expected: number, message: string): Promise<void> {
        if (!(actual < expected)) {
            throw new Error(`${message} (Actual: ${actual}, Expected less than: ${expected})`);
        }
    }
}
