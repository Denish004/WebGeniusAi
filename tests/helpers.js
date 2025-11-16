const { Builder } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

/**
 * Create a new WebDriver instance
 */
async function createDriver() {
    const options = new edge.Options();
    // Uncomment the line below to run in headless mode
    // options.addArguments('--headless');
    options.addArguments('--disable-gpu');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--window-size=1920,1080');

    const driver = await new Builder()
        .forBrowser('MicrosoftEdge')
        .setEdgeOptions(options)
        .build();

    await driver.manage().setTimeouts({ implicit: 10000 });
    return driver;
}

/**
 * Generate random email for testing
 */
function generateRandomEmail() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `testuser${timestamp}${random}@test.com`;
}

/**
 * Generate random username
 */
function generateRandomUsername() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `testuser${timestamp}${random}`;
}

/**
 * Wait for element and perform action
 */
async function waitAndClick(driver, locator, timeout = 10000) {
    const element = await driver.wait(
        async () => {
            try {
                const el = await driver.findElement(locator);
                if (await el.isDisplayed()) {
                    return el;
                }
            } catch (e) {
                return null;
            }
        },
        timeout,
        `Element not found: ${locator}`
    );
    await element.click();
    return element;
}

/**
 * Wait for element and send keys
 */
async function waitAndSendKeys(driver, locator, text, timeout = 10000) {
    const element = await driver.wait(
        async () => {
            try {
                const el = await driver.findElement(locator);
                if (await el.isDisplayed()) {
                    return el;
                }
            } catch (e) {
                return null;
            }
        },
        timeout,
        `Element not found: ${locator}`
    );
    await element.clear();
    await element.sendKeys(text);
    return element;
}

/**
 * Sleep for specified milliseconds
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    createDriver,
    generateRandomEmail,
    generateRandomUsername,
    waitAndClick,
    waitAndSendKeys,
    sleep
};
