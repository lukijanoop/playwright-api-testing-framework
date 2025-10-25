/**
 * Complete API Testing Framework - All Tests in One File
 * 
 * This file demonstrates the complete API testing framework from basic to advanced.
 * Each test is carefully commented to help beginners understand API testing concepts.
 * 
 * Learning Path:
 * 1. Start with BASIC TESTS (lines ~20-100)
 * 2. Move to INTERMEDIATE TESTS (lines ~100-200) 
 * 3. Finish with ADVANCED TESTS (lines ~200-400)
 */

import { test, expect } from '@playwright/test';           // Basic Playwright testing tools
import { dummyJsonAuth, TEST_USERS } from '../helpers/auth-manager';  // Our authentication framework

// ========================================
// 🔰 BASIC TESTS - Start Here!
// ========================================

test.describe('🔰 Basic API Testing', () => {
  
  // Clean state before each test in this group
  test.beforeEach(async () => {
    await dummyJsonAuth.logout();
  });

  // Test 1: Your first API authentication
  test('Basic login and authentication', async () => {
    console.log('🔐 Testing basic API authentication...');
    
    // Step 1: Login with test credentials using our framework
    const user = await dummyJsonAuth.login(TEST_USERS.emily);
    
    // Step 2: Verify the login was successful
    expect(user.username).toBe('emilys');           // Check username
    expect(user.token).toBeTruthy();                // Check we got a token
    console.log('✅ Login successful:', user.username);
    
    // Step 3: Get current user profile to verify authentication
    const currentUser = await dummyJsonAuth.getCurrentUser();
    expect(currentUser).toBeTruthy();               // Check we got user data
    expect(currentUser?.username).toBe('emilys');   // Verify username
    
    console.log('✅ User profile verified');
    
    // Step 4: Clean up
    await dummyJsonAuth.logout();
  });

  // Test 2: Understanding authentication tokens
  test('Understanding authentication tokens', async () => {
    console.log('🔑 Learning about authentication tokens...');
    
    // Login to get a token
    await dummyJsonAuth.login(TEST_USERS.emily);
    
    // Check if we're authenticated (returns true/false)
    expect(dummyJsonAuth.isAuthenticated()).toBe(true);
    
    // Get the actual token value
    const token = dummyJsonAuth.getCurrentUserToken();
    expect(token).toBeTruthy();                     // Token should exist
    
    // Print first 20 characters for learning (real tokens are very long)
    console.log('🔑 Token obtained:', token?.substring(0, 20) + '...');
    
    // Clean up
    await dummyJsonAuth.logout();
    expect(dummyJsonAuth.isAuthenticated()).toBe(false); // Should be false now
    
    console.log('✅ Token lifecycle understood');
  });

  // Test 3: UI testing basics (not API)
  test('UI testing vs API testing', async ({ page }) => {
    console.log('🖥️ Testing UI automation (different from API)...');
    
    // This is UI testing - we interact with a web page
    await page.goto('https://playwright.dev/');
    
    // Check if the page title contains "Playwright"
    await expect(page).toHaveTitle(/Playwright/);
    
    console.log('✅ UI test completed (this is different from API testing)');
  });
});

// ========================================
// 🚀 INTERMEDIATE TESTS - Ready for More?
// ========================================

test.describe('🚀 Intermediate API Testing', () => {
  
  test.beforeEach(async () => {
    await dummyJsonAuth.logout();
  });

  // Test 4: Working with user profile data
  test('Working with user profile data', async () => {
    console.log('👤 Working with detailed user data...');
    
    // Login first
    await dummyJsonAuth.login(TEST_USERS.emily);
    
    // Get user profile
    const currentUser = await dummyJsonAuth.getCurrentUser();
    
    // Verify all the profile data fields
    expect(currentUser?.id).toBe(1);                        // User ID
    expect(currentUser?.firstName).toBe('Emily');           // First name
    expect(currentUser?.lastName).toBe('Johnson');          // Last name
    expect(currentUser?.email).toBeTruthy();                // Email exists
    expect(currentUser?.age).toBe(28);                      // Age
    expect(currentUser?.gender).toBe('female');             // Gender
    expect(currentUser?.image).toBeTruthy();                // Profile image
    
    // Print formatted user info
    console.log('✅ User profile data:', {
      id: currentUser?.id,
      name: `${currentUser?.firstName} ${currentUser?.lastName}`,
      email: currentUser?.email,
      age: currentUser?.age,
      gender: currentUser?.gender
    });
    
    await dummyJsonAuth.logout();
  });

  // Test 5: Error handling - What happens when login fails?
  test('Error handling - Invalid credentials', async () => {
    console.log('❌ Testing error handling...');
    
    // Try to login with wrong credentials
    const invalidCredentials = { username: 'nonexistent', password: 'wrong' };
    
    // This should throw an error - we use try/catch to handle it
    let errorThrown = false;
    try {
      await dummyJsonAuth.login(invalidCredentials);
    } catch (error) {
      errorThrown = true;
      // Handle the error properly - it could be of any type
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.log('✅ Error properly caught:', errorMessage);
    }
    
    // Verify that an error was indeed thrown
    expect(errorThrown).toBe(true);
    expect(dummyJsonAuth.isAuthenticated()).toBe(false); // Should not be logged in
    
    console.log('✅ Error handling works correctly');
  });

  // Test 6: Session management
  test('Session management lifecycle', async () => {
    console.log('🔄 Testing complete session lifecycle...');
    
    // Step 1: Initially not logged in
    expect(dummyJsonAuth.isAuthenticated()).toBe(false);
    
    // Step 2: Login
    await dummyJsonAuth.login(TEST_USERS.emily);
    expect(dummyJsonAuth.isAuthenticated()).toBe(true);
    
    // Step 3: Verify we have a token
    let token = dummyJsonAuth.getCurrentUserToken();
    expect(token).toBeTruthy();
    
    // Step 4: Get user data while logged in
    const user = await dummyJsonAuth.getCurrentUser();
    expect(user).toBeTruthy();
    
    // Step 5: Logout
    await dummyJsonAuth.logout();
    expect(dummyJsonAuth.isAuthenticated()).toBe(false);
    
    // Step 6: Token should be null after logout
    token = dummyJsonAuth.getCurrentUserToken();
    expect(token).toBeNull();
    
    console.log('✅ Session lifecycle complete');
  });
});

// ========================================
// 🎯 ADVANCED TESTS - Master Level!
// ========================================

test.describe('🎯 Advanced API Testing', () => {
  
  test.beforeEach(async () => {
    await dummyJsonAuth.logout();
  });

  // Test 7: Multiple user sessions
  test('Managing multiple user sessions', async () => {
    console.log('🔄 Testing multiple user sessions...');
    
    // Login as first user (Emily)
    const user1 = await dummyJsonAuth.login(TEST_USERS.emily);
    expect(user1.username).toBe('emilys');
    console.log('👤 Logged in as:', user1.username);
    
    // Get user1's profile
    const profile1 = await dummyJsonAuth.getCurrentUser();
    expect(profile1?.firstName).toBe('Emily');
    
    // Logout from user1
    await dummyJsonAuth.logout();
    expect(dummyJsonAuth.isAuthenticated()).toBe(false);
    
    // Login as second user (Michael)
    const user2 = await dummyJsonAuth.login(TEST_USERS.michael);
    expect(user2.username).toBe('michaelw');
    console.log('👤 Switched to:', user2.username);
    
    // Get user2's profile
    const profile2 = await dummyJsonAuth.getCurrentUser();
    expect(profile2?.firstName).toBe('Michael');
    
    // Verify we can switch between users
    console.log('✅ Successfully switched users:', profile1?.firstName, '→', profile2?.firstName);
    
    // Clean up
    await dummyJsonAuth.logout();
  });

  // Test 8: Authentication state validation
  test('Authentication state validation', async () => {
    console.log('🧪 Comprehensive authentication state testing...');
    
    // Test 1: Initial state (should be logged out)
    expect(dummyJsonAuth.isAuthenticated()).toBe(false);
    expect(dummyJsonAuth.getCurrentUserToken()).toBeNull();
    
    // Test 2: After login (should be authenticated)
    const user = await dummyJsonAuth.login(TEST_USERS.emily);
    expect(dummyJsonAuth.isAuthenticated()).toBe(true);
    expect(dummyJsonAuth.getCurrentUserToken()).toBeTruthy();
    
    // Test 3: Verify token is associated with correct user
    const token = dummyJsonAuth.getCurrentUserToken();
    expect(user.token).toBe(token);
    
    // Test 4: Profile data matches login credentials
    const profile = await dummyJsonAuth.getCurrentUser();
    expect(profile?.username).toBe(user.username);
    expect(profile?.id).toBe(user.id);
    
    // Test 5: After logout (should be logged out again)
    await dummyJsonAuth.logout();
    expect(dummyJsonAuth.isAuthenticated()).toBe(false);
    expect(dummyJsonAuth.getCurrentUserToken()).toBeNull();
    
    console.log('✅ All authentication states validated');
  });

  // Test 9: Real-world scenario - User workflow simulation
  test('Real-world user workflow simulation', async () => {
    console.log('🌍 Simulating real-world user workflow...');
    
    // Scenario: A user logs in, checks their profile, then logs out
    
    // Step 1: User visits the app (implicit in API testing)
    console.log('👤 User opens the application');
    
    // Step 2: User logs in
    const user = await dummyJsonAuth.login(TEST_USERS.emily);
    console.log('🔐 User logged in successfully');
    
    // Step 3: User checks their profile information
    const profile = await dummyJsonAuth.getCurrentUser();
    console.log('📋 User views their profile:', {
      name: `${profile?.firstName} ${profile?.lastName}`,
      email: profile?.email
    });
    
    // Step 4: User performs actions (here we just verify data)
    expect(profile?.username).toBe('emilys');
    expect(profile?.age).toBe(28);
    expect(profile?.company?.department).toBe('Engineering');
    
    // Step 5: User logs out
    await dummyJsonAuth.logout();
    console.log('🚪 User logged out');
    
    // Step 6: Verify session ended
    expect(dummyJsonAuth.isAuthenticated()).toBe(false);
    
    console.log('✅ Complete user workflow simulated successfully');
  });

  // Test 10: Performance and reliability
  test('Performance - Multiple rapid operations', async () => {
    console.log('⚡ Testing performance with multiple operations...');
    
    const startTime = Date.now(); // Start timing
    
    // Perform multiple login/logout cycles
    for (let i = 0; i < 3; i++) {
      console.log(`🔄 Cycle ${i + 1}/3`);
      
      // Quick login
      await dummyJsonAuth.login(TEST_USERS.emily);
      expect(dummyJsonAuth.isAuthenticated()).toBe(true);
      
      // Quick profile check
      const profile = await dummyJsonAuth.getCurrentUser();
      expect(profile).toBeTruthy();
      
      // Quick logout
      await dummyJsonAuth.logout();
      expect(dummyJsonAuth.isAuthenticated()).toBe(false);
    }
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    console.log(`⚡ Completed 3 login cycles in ${duration}ms`);
    console.log(`⚡ Average per cycle: ${Math.round(duration / 3)}ms`);
    
    // Should complete in reasonable time (under 10 seconds for 3 cycles)
    expect(duration).toBeLessThan(10000);
    
    console.log('✅ Performance test passed');
  });
});

// ========================================
// 📚 SUMMARY AND LEARNING NOTES
// ========================================

/**
 * CONGRATULATIONS! You've completed all API testing examples!
 * 
 * What you've learned:
 * ✅ Basic API authentication
 * ✅ Token management and validation
 * ✅ User profile data handling
 * ✅ Error handling for failed logins
 * ✅ Session lifecycle management
 * ✅ Multiple user session handling
 * ✅ Authentication state validation
 * ✅ Real-world workflow simulation
 * ✅ Performance testing
 * 
 * Next steps for your own projects:
 * 1. Copy the helpers/ folder to your project
 * 2. Adapt the test patterns to your specific API
 * 3. Add your own test cases using the framework
 * 4. Explore more advanced Playwright features
 * 
 * Framework components used:
 * - AuthManager: Handles authentication
 * - ApiClient: Makes HTTP requests
 * - TEST_USERS: Pre-configured test credentials
 * 
 * Happy testing! 🚀
 */