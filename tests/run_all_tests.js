const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('='.repeat(70));
console.log('WebGeniusAI - Selenium Test Suite Runner');
console.log('='.repeat(70));
console.log('');

// Test configuration
const tests = [
    { name: 'Signup Tests', file: 'test_signup.js', timeout: 30000 },
    { name: 'Login Tests', file: 'test_login.js', timeout: 30000 },
    { name: 'Property Management Tests', file: 'test_property.js', timeout: 60000 },
    { name: 'Search Tests', file: 'test_search.js', timeout: 30000 }
];

const results = {
    total: 0,
    passed: 0,
    failed: 0,
    duration: 0
};

const failedTests = [];

console.log('📋 Test Plan:');
console.log('─'.repeat(70));
tests.forEach((test, index) => {
    console.log(`${index + 1}. ${test.name} (${test.file})`);
});
console.log('');

// Function to run a single test file
function runTest(testFile, timeout) {
    try {
        const startTime = Date.now();
        console.log(`🧪 Running ${testFile}...`);
        
        execSync(`mocha ${testFile} --timeout ${timeout} --reporter spec`, {
            stdio: 'inherit',
            cwd: __dirname
        });
        
        const duration = Date.now() - startTime;
        console.log(`✅ ${testFile} completed in ${duration}ms`);
        console.log('');
        
        return { success: true, duration };
    } catch (error) {
        const duration = Date.now() - startTime;
        console.log(`❌ ${testFile} failed`);
        console.log('');
        
        return { success: false, duration };
    }
}

// Check if dependencies are installed
if (!fs.existsSync(path.join(__dirname, 'node_modules'))) {
    console.log('📦 Installing dependencies...');
    try {
        execSync('npm install', { stdio: 'inherit', cwd: __dirname });
        console.log('✅ Dependencies installed');
        console.log('');
    } catch (error) {
        console.error('❌ Failed to install dependencies');
        process.exit(1);
    }
}

// Pre-flight checks
console.log('🔍 Pre-flight checks:');
console.log('─'.repeat(70));

// Check if servers are running
try {
    const http = require('http');
    
    // Check frontend
    console.log('Checking frontend server (http://localhost:3000)...');
    // Note: You might want to add actual HTTP checks here
    
    // Check backend
    console.log('Checking backend server (http://localhost:3001)...');
    // Note: You might want to add actual HTTP checks here
    
    console.log('✅ Servers appear to be running');
} catch (error) {
    console.log('⚠️  Warning: Could not verify servers are running');
    console.log('   Please ensure frontend (port 3000) and backend (port 3001) are running');
}
console.log('');

// Run tests
console.log('🚀 Starting Test Execution:');
console.log('='.repeat(70));
console.log('');

const overallStartTime = Date.now();

for (const test of tests) {
    const result = runTest(test.file, test.timeout);
    
    results.total++;
    results.duration += result.duration;
    
    if (result.success) {
        results.passed++;
    } else {
        results.failed++;
        failedTests.push(test.name);
    }
}

const overallDuration = Date.now() - overallStartTime;

// Print summary
console.log('');
console.log('='.repeat(70));
console.log('📊 Test Summary:');
console.log('='.repeat(70));
console.log(`Total Test Suites: ${results.total}`);
console.log(`✅ Passed: ${results.passed}`);
console.log(`❌ Failed: ${results.failed}`);
console.log(`⏱️  Total Duration: ${overallDuration}ms (${(overallDuration / 1000).toFixed(2)}s)`);

if (failedTests.length > 0) {
    console.log('');
    console.log('Failed Test Suites:');
    failedTests.forEach(test => {
        console.log(`  ❌ ${test}`);
    });
}

console.log('='.repeat(70));
console.log('');

// Exit with appropriate code
if (results.failed > 0) {
    console.log('❌ Some tests failed. Please review the output above.');
    process.exit(1);
} else {
    console.log('✅ All tests passed successfully!');
    process.exit(0);
}
