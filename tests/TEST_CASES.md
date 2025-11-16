# Test Cases - WebGeniusAi Complete Workflow

## Test Suite Overview
**Test Suite Name:** Complete Workflow Test - Signup to Search  
**Test Framework:** Mocha + Selenium WebDriver  
**Browser:** Microsoft Edge  
**Base URL:** http://localhost:3000  
**Total Test Cases:** 23

---

## Test Cases Table

| TC ID | Phase | Test Case Name | Description | Test Data | Expected Result | Status |
|-------|-------|----------------|-------------|-----------|-----------------|--------|
| **PHASE 1: ADMIN SIGNUP & LOGOUT** |
| TC001 | 1 | Navigate to Signup Page | Verify navigation to signup page | URL: /signup | Page loads successfully with title "React App" | ✅ |
| TC002 | 1 | Admin Signup - Valid Details | Test admin signup with valid credentials | UserType: Admin<br>Email: testadmin{timestamp}@gmail.com<br>Password: Admin@Pass123! | Admin account created successfully, redirected to dashboard | ✅ |
| TC003 | 1 | Admin Logout | Verify admin can logout successfully | Click user menu → Logout | User logged out, redirected to login/home page | ✅ |
| **PHASE 2: LOGIN WITH WRONG CREDENTIALS** |
| TC004 | 2 | Login - Wrong Email | Test login failure with incorrect email | Email: wrong@email.com<br>Password: Admin@Pass123! | Login fails, error message displayed, stays on login page | ✅ |
| TC005 | 2 | Login - Wrong Password | Test login failure with incorrect password | Email: {admin-email}<br>Password: Wrong@Pass999! | Login fails, error message displayed, stays on login page | ✅ |
| **PHASE 3: LOGIN WITH CORRECT CREDENTIALS** |
| TC006 | 3 | Login - Correct Credentials | Test successful login with valid credentials | Email: {admin-email}<br>Password: Admin@Pass123! | Login successful, redirected to dashboard | ✅ |
| **PHASE 4: ADD PROPERTY WITH DETAILS AND IMAGES** |
| TC007 | 4 | Navigate to List Property | Navigate to property listing form | URL: /listproperty | Property form page loads successfully | ✅ |
| TC008 | 4 | Fill Property Details - All Fields | Fill all property form fields with valid data | Name: Test Property {timestamp}<br>Location: Andheri West, Mumbai<br>Tags: Furnished Parking Modern<br>BHK: 3<br>Price: 35000<br>Category: 4 stars<br>Amenities: Electricity<br>Area: 1500 sq ft<br>Description: Beautiful 3BHK apartment... | All fields filled successfully | ✅ |
| TC009 | 4 | Upload Property Images | Upload images from public folder | Image: logo192.png from public folder | Image uploaded successfully | ✅ |
| TC010 | 4 | Submit Property Form | Submit the property listing | Click "Add product" button | Property created successfully, URL contains property ID | ✅ |
| **PHASE 5: MODIFY PROPERTY (COMMENTED OUT)** |
| TC011 | 5 | Navigate to Update Property | Navigate to update property page | URL: /update | Update page loads successfully | ⏸️ Disabled |
| TC012 | 5 | Select Property to Modify | Select a property for modification | Click Update/Edit on property | Property selected for editing | ⏸️ Disabled |
| TC013 | 5 | Modify Property Details | Update property fields | Price: 38000<br>Area: 1600 sq ft<br>Star: 5 | Fields updated successfully | ⏸️ Disabled |
| TC014 | 5 | Save Modified Property | Save the property modifications | Click Save/Submit button | Property updated successfully | ⏸️ Disabled |
| **PHASE 6: DELETE PROPERTY (COMMENTED OUT)** |
| TC015 | 6 | Navigate to Delete Property | Navigate to delete property page | URL: /delete | Delete page loads successfully | ⏸️ Disabled |
| TC016 | 6 | Delete Property | Delete a property with confirmation | Click Delete button → Confirm | Property deleted successfully | ⏸️ Disabled |
| **PHASE 7: LOGOUT ADMIN** |
| TC017 | 7 | Admin Logout After Operations | Logout admin user after property operations | Click user menu → Logout | Admin logged out successfully | ✅ |
| **PHASE 8: SIGNUP AS REGULAR USER** |
| TC018 | 8 | User Signup - Valid Details | Test user signup with valid credentials | UserType: User<br>Email: testuser{timestamp}@gmail.com<br>Password: User@Pass123! | User account created successfully | ✅ |
| **PHASE 9: LOGIN AS USER** |
| TC019 | 9 | User Login - Correct Credentials | Test user login with valid credentials | Email: {user-email}<br>Password: User@Pass123! | User logged in successfully | ✅ |
| **PHASE 10: TEST SEARCH FUNCTIONALITY** |
| TC020 | 10 | Navigate to Properties Page | Navigate to properties listing page | URL: /properties | Properties page loads successfully | ✅ |
| TC021 | 10 | Search - Slow Typing (Real-time) | Search by typing slowly "mum" | Type: 'm' (wait 800ms)<br>Type: 'u' (wait 800ms)<br>Type: 'm' (wait 800ms) | Real-time search filters properties as user types | ✅ |
| TC022 | 10 | Search - Location Filter | Search properties by location | Search term: "Mumbai" | Properties in Mumbai displayed | ✅ |
| TC023 | 10 | Search - BHK Filter | Search properties by BHK | Search term: "3" | 3 BHK properties displayed | ✅ |

---

## Test Data Summary

### Admin Credentials
- **Email:** `testadmin{timestamp}{random}@gmail.com`
- **Password:** `Admin@Pass123!`
- **User Type:** Admin

### Regular User Credentials
- **Email:** `testuser{timestamp}{random}@gmail.com`
- **Password:** `User@Pass123!`
- **User Type:** User

### Property Test Data
- **Name:** `Test Property {timestamp}`
- **Location:** Andheri West, Mumbai
- **Tags:** Furnished Parking Modern
- **BHK:** 3
- **Price:** ₹35,000
- **Category:** 4 stars (****)
- **Amenities:** Electricity
- **Area:** 1500 sq ft
- **Description:** Beautiful 3BHK apartment with modern amenities, parking facility, and great location in Andheri West.

### Search Test Data
- **Search Term 1:** mum (typed slowly character by character)
- **Search Term 2:** Mumbai (location search)
- **Search Term 3:** 3 (BHK search)

---

## Test Environment

| Component | Details |
|-----------|---------|
| **Frontend URL** | http://localhost:3000 |
| **Backend URL** | http://localhost:3001 |
| **Browser** | Microsoft Edge (latest) |
| **WebDriver** | EdgeDriver (msedgedriver.exe) |
| **Test Framework** | Mocha v10.2.0 |
| **Assertion Library** | Chai v4.3.10 |
| **Automation Tool** | Selenium WebDriver v4.15.0 |
| **Operating System** | Windows |

---

## Test Execution

### Prerequisites
1. Backend server running on port 3001
2. Frontend server running on port 3000
3. EdgeDriver installed and in PATH
4. Node.js dependencies installed
5. MongoDB running (for database operations)

### Run Commands
```bash
# Run complete workflow test
npm run test:workflow

# Run all tests
npm run test:all

# Run individual test files
npm run test:signup
npm run test:login
npm run test:property
npm run test:search
```

### Timeout Settings
- **Default Test Timeout:** 120000ms (2 minutes)
- **Individual Test Timeout:** 10000-15000ms
- **Browser Initialization:** 30000ms

---

## Test Metrics

| Metric | Value |
|--------|-------|
| **Total Test Cases** | 23 |
| **Active Test Cases** | 19 |
| **Disabled Test Cases** | 4 (Update/Delete phases) |
| **Critical Test Cases** | 8 (Signup, Login, Add Property, Search) |
| **Estimated Execution Time** | 2-3 minutes |

---

## Status Legend
- ✅ **Active** - Test case is enabled and running
- ⏸️ **Disabled** - Test case is commented out (not currently running)
- ❌ **Failed** - Test case failed during execution
- ⚠️ **Warning** - Test passed with warnings

---

## Test Coverage

### Functional Coverage
- ✅ User Authentication (Signup/Login/Logout)
- ✅ Property CRUD Operations (Create only - Update/Delete disabled)
- ✅ Search Functionality (Text-based matching)
- ✅ Form Validation
- ✅ Image Upload
- ✅ Real-time Search

### User Roles Tested
- ✅ Admin (Property management)
- ✅ Regular User (Property search)

### Browsers Tested
- ✅ Microsoft Edge

---

## Notes
1. **Unique Credentials:** Each test run generates unique email addresses using timestamp to avoid conflicts
2. **Strong Passwords:** All passwords follow security requirements (uppercase, lowercase, numbers, special characters)
3. **Image Upload:** Uses default images from public folder (logo192.png)
4. **Real-time Search:** Tests character-by-character typing with 800ms delays
5. **Update/Delete:** Currently disabled for testing purposes (can be enabled by uncommenting)

---

## Future Enhancements
- [ ] Enable Update Property test cases
- [ ] Enable Delete Property test cases
- [ ] Add negative test cases for property form validation
- [ ] Add test cases for image upload failure scenarios
- [ ] Add test cases for search with no results
- [ ] Add cross-browser testing (Chrome, Firefox)
- [ ] Add mobile responsive testing
- [ ] Add performance testing
- [ ] Add accessibility testing

---

**Last Updated:** November 17, 2025  
**Test Suite Version:** 1.0  
**Maintained By:** QA Team
