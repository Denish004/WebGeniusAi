# Quick Start Guide - Selenium Testing

## Step 1: Install Dependencies

Open PowerShell and navigate to the tests directory:

```powershell
cd c:\Users\denis\Projects\WebGeniusAi\tests
npm install
```

## Step 2: Make Sure Application is Running

### Terminal 1 - Start Backend:
```powershell
cd c:\Users\denis\Projects\WebGeniusAi\backend
npm start
```

### Terminal 2 - Start Frontend:
```powershell
cd c:\Users\denis\Projects\WebGeniusAi\frontend
npm start
```

Wait until both servers are running:
- Backend: http://localhost:3001
- Frontend: http://localhost:3000

## Step 3: Run Tests

### Option A: Run All Tests
```powershell
cd c:\Users\denis\Projects\WebGeniusAi\tests
npm test
```

### Option B: Run Individual Test Suites

**Signup Tests Only:**
```powershell
npm run test:signup
```

**Login Tests Only:**
```powershell
npm run test:login
```

**Property Management Tests Only:**
```powershell
npm run test:property
```

**Search Tests Only:**
```powershell
npm run test:search
```

### Option C: Run Custom Test Runner
```powershell
node run_all_tests.js
```

## What to Expect

- Browser windows will open automatically
- Tests will interact with the application (filling forms, clicking buttons, etc.)
- You'll see green ✓ for passing tests and red ✗ for failing tests
- Each test suite takes 10-60 seconds to complete

## Test Coverage

✅ **35 Test Cases Total:**

1. **Signup (5 tests)** - Valid signup, invalid email, weak password, etc.
2. **Login (6 tests)** - Valid login, wrong credentials, SQL injection, logout
3. **Property Management (9 tests)** - Add, update, delete properties
4. **Search (15 tests)** - Search by location, name, BHK, price, etc.

## Troubleshooting

### ChromeDriver Issues
If you get ChromeDriver errors:
```powershell
npm install chromedriver@latest
```

### Tests Failing
1. Make sure both servers are running
2. Check if you have an admin account:
   - Email: admin@test.com
   - Password: admin123
3. Clear browser cache
4. Try running tests individually

### Port Already in Use
```powershell
# Kill processes on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Kill processes on port 3001
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

## Need Help?

Check the detailed README.md file in the tests directory for more information.
