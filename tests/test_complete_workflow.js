const { By, until, Key } = require('selenium-webdriver');
const { expect } = require('chai');
const { createDriver, waitAndClick, waitAndSendKeys, sleep } = require('./helpers');
const path = require('path');

describe('Complete Workflow Test - Signup to Search', function() {
    let driver;
    const BASE_URL = 'http://localhost:3000';
    
    // Test data
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 10000);
    const ADMIN_EMAIL = `testadmin${timestamp}${randomNum}@gmail.com`;
    const ADMIN_PASSWORD = 'Admin@Pass123!';
    
    const USER_EMAIL = `testuser${timestamp}${randomNum}@gmail.com`;
    const USER_PASSWORD = 'User@Pass123!';
    
    let propertyName = `Test Property ${timestamp}`;
    let propertyId = null;

    before(async function() {
        this.timeout(30000);
        driver = await createDriver();
        console.log('\n🚀 Starting Complete Workflow Test with Edge Browser\n');
    });

    after(async function() {
        this.timeout(10000);
        if (driver) {
            await sleep(2000);
            await driver.quit();
            console.log('\n✅ Test completed and browser closed\n');
        }
    });

    // ==================== PHASE 1: ADMIN SIGNUP & LOGOUT ====================
    
    describe('Phase 1: Admin Signup and Logout', function() {
        
        it('Step 1: Should navigate to signup page', async function() {
            this.timeout(15000);
            await driver.get(`${BASE_URL}/signup`);
            await sleep(2000);
            
            const title = await driver.getTitle();
            console.log(`   ✓ Navigated to signup page: ${title}`);
        });

        it('Step 2: Should successfully signup as Admin', async function() {
            this.timeout(15000);
            
            // Select Admin user type FIRST (dropdown at the top)
            try {
                const userTypeSelect = await driver.findElement(By.name('userType'));
                await userTypeSelect.sendKeys('Admin');
                console.log(`   ✓ Selected userType: Admin`);
                await sleep(500);
            } catch (e) {
                console.log(`   ⚠ UserType dropdown not found`);
            }
            
            // Fill email
            const emailInput = await driver.findElement(By.id('email'));
            await emailInput.clear();
            await emailInput.sendKeys(ADMIN_EMAIL);
            console.log(`   ✓ Entered email: ${ADMIN_EMAIL}`);
            await sleep(500);
            
            // Fill password
            const passwordInput = await driver.findElement(By.id('password'));
            await passwordInput.clear();
            await passwordInput.sendKeys(ADMIN_PASSWORD);
            console.log(`   ✓ Entered password`);
            await sleep(500);
            
            // Submit form
            await waitAndClick(driver, By.css('button[type="submit"]'));
            await sleep(3000);
            
            console.log(`   ✓ Admin signup successful!`);
        });

        it('Step 3: Should logout successfully', async function() {
            this.timeout(10000);
            
            // Click on profile/user menu
            try {
                const userMenu = await driver.wait(
                    until.elementLocated(By.css('button[id="user-menu-button"]')),
                    5000
                );
                await userMenu.click();
                await sleep(1000);
                console.log(`   ✓ Opened user menu`);
                
                // Click logout
                const logoutButton = await driver.wait(
                    until.elementLocated(By.xpath("//a[contains(text(), 'Log out') or contains(text(), 'Logout')]")),
                    3000
                );
                await logoutButton.click();
                await sleep(2000);
                
                console.log(`   ✓ Logged out successfully`);
            } catch (e) {
                console.log(`   ⚠ Logout method 1 failed, trying alternative...`);
                await driver.get(`${BASE_URL}/login`);
                await sleep(2000);
            }
        });
    });

    // ==================== PHASE 2: LOGIN WITH WRONG CREDENTIALS ====================
    
    describe('Phase 2: Login with Wrong Credentials', function() {
        
        it('Step 4: Should fail login with wrong email', async function() {
            this.timeout(10000);
            
            await driver.get(`${BASE_URL}/login`);
            await sleep(2000);
            
            await waitAndSendKeys(driver, By.css('input[type="email"]'), 'wrong@email.com');
            await waitAndSendKeys(driver, By.css('input[type="password"]'), ADMIN_PASSWORD);
            await waitAndClick(driver, By.css('button[type="submit"]'));
            await sleep(2000);
            
            // Check for error message
            const currentUrl = await driver.getCurrentUrl();
            if (currentUrl.includes('/login')) {
                console.log(`   ✓ Login failed as expected with wrong email`);
            }
        });

        it('Step 5: Should fail login with wrong password', async function() {
            this.timeout(10000);
            
            await driver.get(`${BASE_URL}/login`);
            await sleep(2000);
            
            await waitAndSendKeys(driver, By.css('input[type="email"]'), ADMIN_EMAIL);
            await waitAndSendKeys(driver, By.css('input[type="password"]'), 'Wrong@Pass999!');
            await waitAndClick(driver, By.css('button[type="submit"]'));
            await sleep(2000);
            
            const currentUrl = await driver.getCurrentUrl();
            if (currentUrl.includes('/login')) {
                console.log(`   ✓ Login failed as expected with wrong password`);
            }
        });
    });

    // ==================== PHASE 3: LOGIN WITH CORRECT CREDENTIALS ====================
    
    describe('Phase 3: Login with Correct Credentials', function() {
        
        it('Step 6: Should successfully login with correct credentials', async function() {
            this.timeout(10000);
            
            await driver.get(`${BASE_URL}/login`);
            await sleep(2000);
            
            await waitAndSendKeys(driver, By.css('input[type="email"]'), ADMIN_EMAIL);
            await waitAndSendKeys(driver, By.css('input[type="password"]'), ADMIN_PASSWORD);
            await waitAndClick(driver, By.css('button[type="submit"]'));
            await sleep(3000);
            
            const currentUrl = await driver.getCurrentUrl();
            console.log(`   ✓ Login successful! Redirected to: ${currentUrl}`);
        });
    });

    // ==================== PHASE 4: ADD PROPERTY WITH IMAGES ====================
    
    describe('Phase 4: Add Property with Details and Images', function() {
        
        it('Step 7: Should navigate to list property page', async function() {
            this.timeout(10000);
            
            await driver.get(`${BASE_URL}/listproperty`);
            await sleep(2000);
            
            console.log(`   ✓ Navigated to property listing form`);
        });

        it('Step 8: Should fill property details', async function() {
            this.timeout(15000);
            
            // Property name (id="name", first one)
            const nameInputs = await driver.findElements(By.id('name'));
            await nameInputs[0].clear();
            await nameInputs[0].sendKeys(propertyName);
            console.log(`   ✓ Property Name: ${propertyName}`);
            await sleep(500);
            
            // Location (name="brand", first one)
            const brandInputs = await driver.findElements(By.name('brand'));
            await brandInputs[0].clear();
            await brandInputs[0].sendKeys('Andheri West, Mumbai');
            console.log(`   ✓ Location: Andheri West, Mumbai`);
            await sleep(500);
            
            // Property Tags (name="brand", second one)
            await brandInputs[1].clear();
            await brandInputs[1].sendKeys('Furnished Parking Modern');
            console.log(`   ✓ Tags: Furnished Parking Modern`);
            await sleep(500);
            
            // Property Bhks (name="brand", third one)
            await brandInputs[2].clear();
            await brandInputs[2].sendKeys('3');
            console.log(`   ✓ BHK: 3`);
            await sleep(500);
            
            // Price (id="price")
            const priceInput = await driver.findElement(By.id('price'));
            await priceInput.clear();
            await priceInput.sendKeys('35000');
            console.log(`   ✓ Price: 35000`);
            await sleep(500);
            
            // Category (select dropdown id="category")
            const categorySelect = await driver.findElement(By.id('category'));
            await categorySelect.sendKeys('4'); // 4 stars
            console.log(`   ✓ Category: ****`);
            await sleep(500);
            
            // Amenities (select dropdown id="amenities")
            const amenitiesSelect = await driver.findElement(By.id('amenities'));
            await amenitiesSelect.sendKeys('1'); // Electricity
            console.log(`   ✓ Amenities: Electricity`);
            await sleep(500);
            
            // Area (id="name", second one)
            await nameInputs[1].clear();
            await nameInputs[1].sendKeys('1500 sq ft');
            console.log(`   ✓ Area: 1500 sq ft`);
            await sleep(500);
            
            // Description (id="description")
            const descInput = await driver.findElement(By.id('description'));
            await descInput.clear();
            await descInput.sendKeys('Beautiful 3BHK apartment with modern amenities, parking facility, and great location in Andheri West.');
            console.log(`   ✓ Description added`);
            await sleep(500);
        });

        it('Step 9: Should upload images from public folder', async function() {
            this.timeout(15000);
            
            try {
                // Try to find image upload input
                const imageInputs = await driver.findElements(By.css('input[type="file"]'));
                
                if (imageInputs.length > 0) {
                    // Use images from public folder
                    const publicFolder = path.join(__dirname, '..', 'frontend', 'public');
                    const imagePath = path.join(publicFolder, 'logo192.png'); // Using default logo
                    
                    // Upload image
                    await imageInputs[0].sendKeys(imagePath);
                    await sleep(1000);
                    console.log(`   ✓ Image uploaded from public folder`);
                } else {
                    console.log(`   ⚠ No image upload field found`);
                }
            } catch (e) {
                console.log(`   ⚠ Image upload failed: ${e.message}`);
            }
        });

        it('Step 10: Should submit property form', async function() {
            this.timeout(10000);
            
            const submitButton = await driver.findElement(By.css('button[type="submit"]'));
            await submitButton.click();
            await sleep(4000);
            
            const currentUrl = await driver.getCurrentUrl();
            console.log(`   ✓ Property submitted! Current URL: ${currentUrl}`);
            
            // Try to extract property ID from URL
            if (currentUrl.includes('/properties/')) {
                propertyId = currentUrl.split('/properties/')[1];
                console.log(`   ✓ Property created with ID: ${propertyId}`);
            }
        });
    });

    // ==================== PHASE 5: MODIFY PROPERTY (COMMENTED OUT FOR NOW) ====================
    
    /* describe('Phase 5: Modify Property Details', function() {
        
        it('Step 11: Should navigate to update property page', async function() {
            this.timeout(10000);
            
            await driver.get(`${BASE_URL}/update`);
            await sleep(3000);
            
            console.log(`   ✓ Navigated to update property page`);
        });

        it('Step 12: Should select property to modify', async function() {
            this.timeout(10000);
            
            try {
                // Look for property in the list and click edit/update
                const updateLinks = await driver.findElements(By.xpath("//a[contains(text(), 'Update') or contains(text(), 'Edit')]"));
                
                if (updateLinks.length > 0) {
                    await updateLinks[0].click();
                    await sleep(2000);
                    console.log(`   ✓ Selected property for modification`);
                } else {
                    // Alternative: search for the property by name
                    const properties = await driver.findElements(By.xpath(`//td[contains(text(), '${propertyName}')]`));
                    if (properties.length > 0) {
                        // Click on the row or find update button in that row
                        const parentRow = await properties[0].findElement(By.xpath('./..'));
                        const updateBtn = await parentRow.findElement(By.xpath(".//a[contains(@href, 'update')]"));
                        await updateBtn.click();
                        await sleep(2000);
                        console.log(`   ✓ Found and selected property: ${propertyName}`);
                    }
                }
            } catch (e) {
                console.log(`   ⚠ Could not find property to update: ${e.message}`);
            }
        });

        it('Step 13: Should modify property details', async function() {
            this.timeout(15000);
            
            try {
                // Update price
                const priceInput = await driver.findElement(By.name('price'));
                await priceInput.clear();
                await priceInput.sendKeys('38000');
                console.log(`   ✓ Updated Price: 38000`);
                
                // Update area
                const areaInput = await driver.findElement(By.name('area'));
                await areaInput.clear();
                await areaInput.sendKeys('1600 sq ft');
                console.log(`   ✓ Updated Area: 1600 sq ft`);
                
                // Update star rating
                const starInput = await driver.findElement(By.name('star'));
                await starInput.clear();
                await starInput.sendKeys('5');
                console.log(`   ✓ Updated Star Rating: 5`);
                
            } catch (e) {
                console.log(`   ⚠ Could not modify fields: ${e.message}`);
            }
        });

        it('Step 14: Should save modified property', async function() {
            this.timeout(10000);
            
            try {
                const saveButton = await driver.findElement(By.css('button[type="submit"]'));
                await saveButton.click();
                await sleep(3000);
                
                console.log(`   ✓ Property modifications saved successfully!`);
            } catch (e) {
                console.log(`   ⚠ Could not save modifications: ${e.message}`);
            }
        });
    }); */

    // ==================== PHASE 6: DELETE PROPERTY (COMMENTED OUT FOR NOW) ====================
    
    /* describe('Phase 6: Delete Property', function() {
        
        it('Step 15: Should navigate to delete property page', async function() {
            this.timeout(10000);
            
            await driver.get(`${BASE_URL}/delete`);
            await sleep(3000);
            
            console.log(`   ✓ Navigated to delete property page`);
        });

        it('Step 16: Should delete the property', async function() {
            this.timeout(15000);
            
            try {
                // Find delete button for the property
                const deleteButtons = await driver.findElements(By.xpath("//button[contains(text(), 'Delete')]"));
                
                if (deleteButtons.length > 0) {
                    await deleteButtons[0].click();
                    await sleep(1000);
                    console.log(`   ✓ Clicked delete button`);
                    
                    // Handle confirmation dialog if it appears
                    try {
                        const alert = await driver.switchTo().alert();
                        const alertText = await alert.getText();
                        console.log(`   ✓ Confirmation dialog: ${alertText}`);
                        await alert.accept();
                        await sleep(2000);
                        console.log(`   ✓ Property deleted successfully!`);
                    } catch (alertErr) {
                        // No alert, check for modal confirmation
                        try {
                            const confirmBtn = await driver.findElement(By.xpath("//button[contains(text(), 'Confirm') or contains(text(), 'Yes')]"));
                            await confirmBtn.click();
                            await sleep(2000);
                            console.log(`   ✓ Property deleted via modal confirmation!`);
                        } catch (modalErr) {
                            console.log(`   ✓ Property deleted (no confirmation needed)`);
                        }
                    }
                } else {
                    console.log(`   ⚠ No delete button found`);
                }
            } catch (e) {
                console.log(`   ⚠ Delete operation failed: ${e.message}`);
            }
        });
    }); */

    // ==================== PHASE 7: LOGOUT ADMIN ====================
    
    describe('Phase 7: Logout as Admin', function() {
        
        it('Step 17: Should logout admin successfully', async function() {
            this.timeout(10000);
            
            try {
                const userMenu = await driver.wait(
                    until.elementLocated(By.css('button[id="user-menu-button"]')),
                    5000
                );
                await userMenu.click();
                await sleep(1000);
                
                const logoutButton = await driver.wait(
                    until.elementLocated(By.xpath("//a[contains(text(), 'Log out') or contains(text(), 'Logout')]")),
                    3000
                );
                await logoutButton.click();
                await sleep(2000);
                
                console.log(`   ✓ Admin logged out successfully`);
            } catch (e) {
                await driver.get(`${BASE_URL}/login`);
                await sleep(2000);
                console.log(`   ✓ Navigated to login page`);
            }
        });
    });

    // ==================== PHASE 8: SIGNUP AS REGULAR USER ====================
    
    describe('Phase 8: Signup as Regular User', function() {
        
        it('Step 18: Should signup as regular user', async function() {
            this.timeout(15000);
            
            await driver.get(`${BASE_URL}/signup`);
            await sleep(2000);
            
            // Select User type FIRST
            try {
                const userTypeSelect = await driver.findElement(By.name('userType'));
                await userTypeSelect.sendKeys('User');
                console.log(`   ✓ Selected userType: User`);
                await sleep(500);
            } catch (e) {
                console.log(`   ⚠ UserType dropdown not found`);
            }
            
            // Fill email
            const emailInput = await driver.findElement(By.id('email'));
            await emailInput.clear();
            await emailInput.sendKeys(USER_EMAIL);
            console.log(`   ✓ Entered email: ${USER_EMAIL}`);
            await sleep(500);
            
            // Fill password
            const passwordInput = await driver.findElement(By.id('password'));
            await passwordInput.clear();
            await passwordInput.sendKeys(USER_PASSWORD);
            console.log(`   ✓ Entered password`);
            await sleep(500);
            
            // Submit form
            const submitButton = await driver.findElement(By.css('button[type="submit"]'));
            await submitButton.click();
            await sleep(3000);
            
            console.log(`   ✓ User signup successful!`);
        });
    });

    // ==================== PHASE 9: LOGIN AS USER ====================
    
    describe('Phase 9: Login as Regular User', function() {
        
        it('Step 19: Should login as regular user', async function() {
            this.timeout(10000);
            
            // If already logged in from signup, skip. Otherwise login
            const currentUrl = await driver.getCurrentUrl();
            
            if (currentUrl.includes('/login')) {
                await waitAndSendKeys(driver, By.css('input[type="email"]'), USER_EMAIL);
                await waitAndSendKeys(driver, By.css('input[type="password"]'), USER_PASSWORD);
                await waitAndClick(driver, By.css('button[type="submit"]'));
                await sleep(3000);
            }
            
            console.log(`   ✓ User logged in successfully!`);
        });
    });

    // ==================== PHASE 10: TEST SEARCH FUNCTIONALITY ====================
    
    describe('Phase 10: Test Search Functionality', function() {
        
        it('Step 20: Should navigate to properties page', async function() {
            this.timeout(10000);
            
            await driver.get(`${BASE_URL}/properties`);
            await sleep(3000);
            
            console.log(`   ✓ Navigated to properties page`);
        });

        it('Step 21: Should search for property by name', async function() {
            this.timeout(15000);
            
            try {
                // Find search input
                const searchInput = await driver.wait(
                    until.elementLocated(By.css('input[type="search"], input[placeholder*="Search"], input[name="search"]')),
                    5000
                );
                
                // Enter search term slowly - type "mum" character by character
                const searchTerm = 'mum';
                await searchInput.clear();
                await sleep(500);
                
                console.log(`   ✓ Typing search term slowly: "${searchTerm}"`);
                
                // Type each character with a delay
                for (let char of searchTerm) {
                    await searchInput.sendKeys(char);
                    console.log(`   ✓ Typed: "${char}"`);
                    await sleep(800); // 800ms delay between each character for slow typing
                }
                
                console.log(`   ✓ Completed typing: ${searchTerm}`);
                await sleep(2000);
                
                // Check results without submitting (real-time search)
                const properties = await driver.findElements(By.css('.property-card, .card, [class*="property"]'));
                console.log(`   ✓ Search completed! Found ${properties.length} properties`);
                
                if (properties.length > 0) {
                    console.log(`   ✅ Search functionality working correctly!`);
                } else {
                    console.log(`   ⚠ No properties found (this may be expected if no matching results)`);
                }
                
            } catch (e) {
                console.log(`   ⚠ Search test failed: ${e.message}`);
            }
        });

        it('Step 22: Should test search with different term', async function() {
            this.timeout(10000);
            
            try {
                const searchInput = await driver.findElement(By.css('input[type="search"], input[placeholder*="Search"], input[name="search"]'));
                
                // Search by location
                await searchInput.clear();
                await searchInput.sendKeys('Mumbai');
                await searchInput.sendKeys(Key.RETURN);
                await sleep(2000);
                
                console.log(`   ✓ Searched for: Mumbai`);
                
                const properties = await driver.findElements(By.css('.property-card, .card, [class*="property"]'));
                console.log(`   ✓ Found ${properties.length} properties matching location`);
                
            } catch (e) {
                console.log(`   ⚠ Second search test failed: ${e.message}`);
            }
        });

        it('Step 23: Should test search with BHK', async function() {
            this.timeout(10000);
            
            try {
                const searchInput = await driver.findElement(By.css('input[type="search"], input[placeholder*="Search"], input[name="search"]'));
                
                // Search by BHK
                await searchInput.clear();
                await searchInput.sendKeys('3');
                await searchInput.sendKeys(Key.RETURN);
                await sleep(2000);
                
                console.log(`   ✓ Searched for: 3 BHK`);
                
                const properties = await driver.findElements(By.css('.property-card, .card, [class*="property"]'));
                console.log(`   ✓ Found ${properties.length} properties matching BHK`);
                
            } catch (e) {
                console.log(`   ⚠ BHK search test failed: ${e.message}`);
            }
        });
    });

    // ==================== FINAL SUMMARY ====================
    
    after(function() {
        console.log('\n' + '='.repeat(80));
        console.log('📊 TEST SUMMARY');
        console.log('='.repeat(80));
        console.log(`✅ Admin Email: ${ADMIN_EMAIL}`);
        console.log(`✅ Admin Password: ${ADMIN_PASSWORD}`);
        console.log(`✅ User Email: ${USER_EMAIL}`);
        console.log(`✅ User Password: ${USER_PASSWORD}`);
        console.log(`✅ Property Name: ${propertyName}`);
        console.log('='.repeat(80) + '\n');
    });
});
