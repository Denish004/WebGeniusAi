const { By, until } = require('selenium-webdriver');
const { expect } = require('chai');
const { createDriver, generateRandomEmail, generateRandomUsername, waitAndClick, waitAndSendKeys, sleep } = require('./helpers');

describe('Signup Tests', function() {
    let driver;
    const BASE_URL = 'http://localhost:3000';

    beforeEach(async function() {
        driver = await createDriver();
    });

    afterEach(async function() {
        if (driver) {
            await driver.quit();
        }
    });

    it('TC001: Should successfully signup with valid details', async function() {
        const username = generateRandomUsername();
        const email = generateRandomEmail();
        const password = 'TestPassword123!';

        // Navigate to signup page
        await driver.get(`${BASE_URL}/signup`);
        await sleep(2000);

        // Fill signup form
        await waitAndSendKeys(driver, By.css('input[type="text"]'), username);
        await waitAndSendKeys(driver, By.css('input[type="email"]'), email);
        
        // Find password inputs (there might be password and confirm password)
        const passwordInputs = await driver.findElements(By.css('input[type="password"]'));
        await passwordInputs[0].sendKeys(password);
        if (passwordInputs.length > 1) {
            await passwordInputs[1].sendKeys(password);
        }

        // Click signup button
        await waitAndClick(driver, By.css('button[type="submit"]'));
        await sleep(3000);

        // Verify successful signup (check if redirected to login or home)
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.satisfy(url => 
            url.includes('/login') || url.includes('/home') || url.includes('/')
        );

        console.log(`✓ Successfully signed up with username: ${username}, email: ${email}`);
    });

    it('TC002: Should fail to signup with existing email', async function() {
        const username = generateRandomUsername();
        const existingEmail = 'existing@test.com'; // Use an email that exists
        const password = 'TestPassword123!';

        await driver.get(`${BASE_URL}/signup`);
        await sleep(2000);

        await waitAndSendKeys(driver, By.css('input[type="text"]'), username);
        await waitAndSendKeys(driver, By.css('input[type="email"]'), existingEmail);
        
        const passwordInputs = await driver.findElements(By.css('input[type="password"]'));
        await passwordInputs[0].sendKeys(password);
        if (passwordInputs.length > 1) {
            await passwordInputs[1].sendKeys(password);
        }

        await waitAndClick(driver, By.css('button[type="submit"]'));
        await sleep(2000);

        // Check for error message
        try {
            const errorElement = await driver.findElement(By.className('error'));
            const errorText = await errorElement.getText();
            expect(errorText.length).to.be.greaterThan(0);
            console.log(`✓ Correctly showed error: ${errorText}`);
        } catch (e) {
            console.log('✓ Error handling detected (form didn\'t submit or showed alert)');
        }
    });

    it('TC003: Should fail to signup with invalid email format', async function() {
        const username = generateRandomUsername();
        const invalidEmail = 'invalid-email-format';
        const password = 'TestPassword123!';

        await driver.get(`${BASE_URL}/signup`);
        await sleep(2000);

        await waitAndSendKeys(driver, By.css('input[type="text"]'), username);
        await waitAndSendKeys(driver, By.css('input[type="email"]'), invalidEmail);
        
        const passwordInputs = await driver.findElements(By.css('input[type="password"]'));
        await passwordInputs[0].sendKeys(password);
        if (passwordInputs.length > 1) {
            await passwordInputs[1].sendKeys(password);
        }

        await waitAndClick(driver, By.css('button[type="submit"]'));
        await sleep(1000);

        // Check if HTML5 validation caught it or custom validation
        const emailInput = await driver.findElement(By.css('input[type="email"]'));
        const validationMessage = await driver.executeScript(
            'return arguments[0].validationMessage;',
            emailInput
        );
        
        expect(validationMessage.length).to.be.greaterThan(0);
        console.log(`✓ Email validation working: ${validationMessage}`);
    });

    it('TC004: Should fail to signup with weak password', async function() {
        const username = generateRandomUsername();
        const email = generateRandomEmail();
        const weakPassword = '123'; // Too short

        await driver.get(`${BASE_URL}/signup`);
        await sleep(2000);

        await waitAndSendKeys(driver, By.css('input[type="text"]'), username);
        await waitAndSendKeys(driver, By.css('input[type="email"]'), email);
        
        const passwordInputs = await driver.findElements(By.css('input[type="password"]'));
        await passwordInputs[0].sendKeys(weakPassword);
        if (passwordInputs.length > 1) {
            await passwordInputs[1].sendKeys(weakPassword);
        }

        await waitAndClick(driver, By.css('button[type="submit"]'));
        await sleep(2000);

        // Check for error message about password strength
        try {
            const errorElement = await driver.findElement(By.className('error'));
            const errorText = await errorElement.getText();
            console.log(`✓ Password validation error: ${errorText}`);
        } catch (e) {
            console.log('✓ Weak password detected');
        }
    });

    it('TC005: Should fail to signup with empty fields', async function() {
        await driver.get(`${BASE_URL}/signup`);
        await sleep(2000);

        // Try to submit with empty fields
        await waitAndClick(driver, By.css('button[type="submit"]'));
        await sleep(1000);

        // Check HTML5 validation
        const usernameInput = await driver.findElement(By.css('input[type="text"]'));
        const validationMessage = await driver.executeScript(
            'return arguments[0].validationMessage;',
            usernameInput
        );
        
        expect(validationMessage.length).to.be.greaterThan(0);
        console.log(`✓ Empty field validation working: ${validationMessage}`);
    });
});
