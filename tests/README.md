# Selenium E2E Testing Suite for WebGeniusAI

Comprehensive end-to-end testing suite using Selenium WebDriver with Microsoft Edge for the WebGeniusAI property management application.

## Test Coverage

### 1. Signup Tests (test_signup.js)
- ✅ TC001: Successful signup with valid details
- ✅ TC002: Fail signup with existing email
- ✅ TC003: Fail signup with invalid email format
- ✅ TC004: Fail signup with weak password
- ✅ TC005: Fail signup with empty fields

### 2. Login Tests (test_login.js)
- ✅ TC006: Successful login with valid credentials
- ✅ TC007: Fail login with invalid email
- ✅ TC008: Fail login with invalid password
- ✅ TC009: Fail login with empty credentials
- ✅ TC010: SQL injection protection test
- ✅ TC011: Logout functionality

### 3. Property Management Tests (test_property.js)
- ✅ TC012: Add new property with valid details
- ✅ TC013: Fail to add property with missing fields
- ✅ TC014: Fail to add property with invalid price
- ✅ TC015: Update existing property successfully
- ✅ TC016: Fail to update property with invalid data
- ✅ TC017: Delete property successfully
- ✅ TC018: Confirm before deleting property
- ✅ TC019: Display property details correctly
- ✅ TC020: Validate property image upload

### 4. Search Tests (test_search.js)
- ✅ TC021: Search by valid location
- ✅ TC022: Search by valid name
- ✅ TC023: Search by BHK
- ✅ TC024: Search by price range
- ✅ TC025: Return no results for non-existent property
- ✅ TC026: Handle special characters in search
- ✅ TC027: Empty search shows all properties
- ✅ TC028: Filter by area
- ✅ TC029: Filter by rating/stars
- ✅ TC030: Handle very long search queries
- ✅ TC031: Case-insensitive search
- ✅ TC032: Partial word matches
- ✅ TC033: Multi-criteria search
- ✅ TC034: Display search results count
- ✅ TC035: Maintain search query after refresh

## Prerequisites

1. **Node.js** (v14 or higher)
2. **Microsoft Edge Browser** (comes pre-installed on Windows 10/11)
3. **EdgeDriver** (automatically managed by Selenium 4.x)

### Install EdgeDriver (Optional - Selenium handles this automatically)

**Windows:**
```powershell
# EdgeDriver is auto-downloaded by Selenium, but you can install manually:
# Check Edge version: edge://version
# Download from: https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/
# Or use chocolatey:
choco install selenium-edge-driver
```

**Note:** Selenium WebDriver 4.x includes automatic driver management, so manual installation is usually not needed.

## Installation

1. Navigate to the tests directory:
```bash
cd tests
```

2. Install dependencies:
```bash
npm install
```

## Running Tests

### Before Running Tests

1. **Start the Backend Server:**
```bash
cd backend
npm start
```

2. **Start the Frontend Server:**
```bash
cd frontend
npm start
```

Make sure both servers are running:
- Backend: http://localhost:3001
- Frontend: http://localhost:3000

### Run All Tests
```bash
npm test
```

### Run Specific Test Suites

**Signup Tests:**
```bash
npm run test:signup
```

**Login Tests:**
```bash
npm run test:login
```

**Property Tests:**
```bash
npm run test:property
```

**Search Tests:**
```bash
npm run test:search
```

**All Tests:**
```bash
npm run test:all
```

## Configuration

### Test Settings

Edit `helpers.js` to configure:

**Headless Mode** (run without opening browser):
```javascript
// Uncomment this line in helpers.js
options.addArguments('--headless');
```

**Timeout Settings:**
```javascript
// In each test file, modify:
describe('Test Suite', function() {
    this.timeout(60000); // 60 seconds
});
```

### Test Credentials

Update credentials in test files:

**test_login.js:**
```javascript
const VALID_EMAIL = 'admin@test.com';
const VALID_PASSWORD = 'admin123';
```

**test_property.js:**
```javascript
const ADMIN_EMAIL = 'admin@test.com';
const ADMIN_PASSWORD = 'admin123';
```

## Test Results

Tests will output:
- ✓ Green checkmarks for passing tests
- ✗ Red X for failing tests
- Detailed error messages for failures
- Console logs for debugging

Example output:
```
  Property Management Tests
    ✓ TC012: Should successfully add a new property (3245ms)
    ✓ TC013: Should fail to add property with missing fields (1532ms)
    ✓ TC015: Should successfully update property (2789ms)
```

## Common Issues

### ChromeDriver Version Mismatch
**Error:** `SessionNotCreatedError: session not created: This version of ChromeDriver only supports Chrome version XX`

**Solution:**
1. Check your Chrome version: `chrome://version`
2. Download matching ChromeDriver from https://chromedriver.chromium.org/
3. Or run: `npm install chromedriver@latest`

### Port Already in Use
**Error:** `EADDRINUSE: address already in use`

**Solution:**
Make sure no other instances of the app are running on ports 3000 or 3001.

### Element Not Found
**Error:** `NoSuchElementError`

**Solution:**
- Check if selectors match your current UI
- Increase timeout in `helpers.js`
- Verify page has fully loaded

### Application Not Running
**Error:** `ECONNREFUSED`

**Solution:**
Ensure both frontend and backend servers are running.

## Best Practices

1. **Run tests in order:** Signup → Login → Property Management → Search
2. **Clean test data:** Manually clear test data from database periodically
3. **Update selectors:** If UI changes, update selectors in test files
4. **Screenshot on failure:** Add screenshot capture for failed tests (optional)
5. **Run individually:** Test one suite at a time when debugging

## Extending Tests

### Adding New Tests

1. Create new test file: `test_newfeature.js`
2. Follow the pattern from existing tests:

```javascript
const { By } = require('selenium-webdriver');
const { expect } = require('chai');
const { createDriver, waitAndClick, sleep } = require('./helpers');

describe('New Feature Tests', function() {
    let driver;
    
    beforeEach(async function() {
        driver = await createDriver();
    });
    
    afterEach(async function() {
        if (driver) await driver.quit();
    });
    
    it('TC036: Should test new feature', async function() {
        // Your test code here
    });
});
```

3. Add to package.json scripts:
```json
"test:newfeature": "mocha test_newfeature.js --timeout 30000"
```

## CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/tests.yml`:

```yaml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v2
      with:
        node-version: '16'
    
    - name: Install dependencies
      run: |
        cd tests
        npm install
    
    - name: Run tests
      run: |
        cd tests
        npm test
```

## Test Data

### Sample Admin Credentials
- Email: admin@test.com
- Password: admin123
- Type: Admin

### Sample Property Data
- Name: Test Property
- Location: Mumbai, India
- Price: 25000
- Area: 1200 sq ft
- BHK: 2
- Rating: 4

## Support

For issues or questions:
1. Check the test output logs
2. Review the helpers.js utility functions
3. Verify application is running correctly
4. Check ChromeDriver compatibility

## License

MIT
