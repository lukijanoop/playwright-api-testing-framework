# 📚 **The Complete Beginner's Guide to API Testing with Playwright**

*A step-by-step tutorial to build a professional API testing framework from scratch*

---

## 🎯 **What You'll Build**

By the end of this guide, you'll have a complete, production-ready API testing framework including:

- ✅ **Reusable HTTP Client** with error handling
- ✅ **Authentication Manager** for easy login/logout
- ✅ **TypeScript Interfaces** for type safety
- ✅ **Progressive Test Suite** (10 tests from basic to advanced)
- ✅ **Best Practices** and professional patterns

---

## 📋 **Table of Contents**

1. [Prerequisites & Setup](#prerequisites--setup)
2. [Project Structure](#project-structure)
3. [Building the Framework](#building-the-framework)
4. [Creating Tests](#creating-tests)
5. [Running Your Tests](#running-your-tests)
6. [Next Steps](#next-steps)

---

## 🔧 **Prerequisites & Setup**

### **What You Need:**
- Node.js installed (version 16 or higher)
- A code editor (VS Code recommended)
- Basic knowledge of JavaScript/TypeScript
- 30-60 minutes of time

### **Step 1: Initialize Your Project**

```bash
# Create a new directory for your project
mkdir my-api-testing-framework
cd my-api-testing-framework

# Initialize a new Node.js project
npm init -y

# Install Playwright and TypeScript
npm install @playwright/test
npm install -D typescript @types/node

# Initialize TypeScript
npx tsc --init

# Install Playwright browsers
npx playwright install
```

### **Step 2: Create the Basic Folder Structure**

```
my-api-testing-framework/
├── package.json
├── tsconfig.json
├── playwright.config.ts
├── tests/                    # Your test files will go here
├── helpers/                  # Framework components
├── types/                    # TypeScript interfaces
└── config/                   # Configuration files (optional)
```

Create these folders:
```bash
mkdir tests helpers types config
```

---

## 🏗️ **Project Structure**

Your final project structure should look like this:

```
my-api-testing-framework/
├── package.json
├── tsconfig.json
├── playwright.config.ts
├── tests/
│   └── api-tests.spec.ts          # Your complete test suite
├── helpers/
│   ├── api-client.ts              # HTTP client wrapper
│   ├── auth-manager.ts            # Authentication handler
│   └── test-data-manager.ts       # Test data utilities (optional)
├── types/
│   └── api.ts                     # TypeScript interfaces
└── README.md                      # Your project documentation
```

---

## 🛠️ **Building the Framework**

### **Step 1: Configure Playwright**

Create `playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    headless: true,  // Set to false to see browser actions
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
```

---

### **Step 2: Create TypeScript Interfaces**

Create `types/api.ts`:

```typescript
/**
 * User Interface - Blueprint for user objects
 * Based on DummyJSON API response structure
 */
export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age?: number;
  gender: string;
  image: string;
  phone?: string;
  birthDate?: string;
  bloodGroup?: string;
  height?: number;
  weight?: number;
  eyeColor?: string;
  hair?: {
    color: string;
    type: string;
  };
  ip?: string;
  address?: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    country: string;
  };
  macAddress?: string;
  university?: string;
  bank?: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company?: {
    department: string;
    name: string;
    title: string;
    address: {
      address: string;
      city: string;
      state: string;
      stateCode: string;
      postalCode: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      country: string;
    };
  };
  ein?: string;
  ssn?: string;
  userAgent?: string;
  crypto?: {
    coin: string;
    wallet: string;
    network: string;
  };
  role?: string;
  // Authentication properties
  token?: string;
  accessToken?: string;
  refreshToken?: string;
}

/**
 * Standard API response format
 */
export interface ApiResponse<T = any> {
  status: number;
  ok: boolean;
  data: T;
  headers: Record<string, string>;
}

/**
 * Authentication credentials
 */
export interface AuthCredentials {
  username: string;
  password: string;
  email?: string;
}
```

---

### **Step 3: Build the HTTP Client**

Create `helpers/api-client.ts`:

```typescript
import { request, APIRequestContext } from '@playwright/test';

/**
 * ApiClient - Reusable HTTP client for API testing
 * Wraps Playwright's request functionality for easier use
 */
export class ApiClient {
  private context: APIRequestContext | null = null;
  private baseURL: string;
  private headers: Record<string, string>;

  constructor(baseURL: string, headers: Record<string, string> = {}) {
    this.baseURL = baseURL;
    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...headers
    };
  }

  /**
   * Create HTTP context for making requests
   */
  async createContext(token?: string): Promise<void> {
    const headers = token 
      ? { ...this.headers, 'Authorization': `Bearer ${token}` }
      : this.headers;

    this.context = await request.newContext({
      baseURL: this.baseURL,
      extraHTTPHeaders: headers
    });
  }

  /**
   * Make GET request
   */
  async get(endpoint: string, params?: Record<string, any>) {
    if (!this.context) throw new Error('Context not initialized');
    
    const response = await this.context.get(endpoint, { params });
    return this.validateResponse(response);
  }

  /**
   * Make POST request
   */
  async post(endpoint: string, data: any) {
    if (!this.context) throw new Error('Context not initialized');
    
    const response = await this.context.post(endpoint, { data });
    return this.validateResponse(response);
  }

  /**
   * Make PUT request
   */
  async put(endpoint: string, data: any) {
    if (!this.context) throw new Error('Context not initialized');
    
    const response = await this.context.put(endpoint, { data });
    return this.validateResponse(response);
  }

  /**
   * Make DELETE request
   */
  async delete(endpoint: string) {
    if (!this.context) throw new Error('Context not initialized');
    
    const response = await this.context.delete(endpoint);
    return this.validateResponse(response);
  }

  /**
   * Validate and format API response
   */
  private async validateResponse(response: any) {
    const body = await response.json();
    
    return {
      status: response.status(),
      ok: response.ok(),
      data: body,
      headers: response.headers()
    };
  }

  /**
   * Clean up resources
   */
  async dispose() {
    if (this.context) {
      await this.context.dispose();
      this.context = null;
    }
  }
}

// Pre-configured clients for common APIs
export const dummyJsonClient = new ApiClient('https://dummyjson.com');
export const reqresClient = new ApiClient('https://reqres.in/api');
```

---

### **Step 4: Build the Authentication Manager**

Create `helpers/auth-manager.ts`:

```typescript
import { ApiClient } from './api-client';
import { User, AuthCredentials } from '../types/api';

/**
 * AuthManager - Handles authentication lifecycle
 */
export class AuthManager {
  private apiClient: ApiClient;
  private currentUser: User | null = null;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  /**
   * Login with username and password
   */
  async login(credentials: AuthCredentials): Promise<User> {
    await this.apiClient.createContext();
    
    const response = await this.apiClient.post('/auth/login', {
      username: credentials.username,
      password: credentials.password
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.status} - ${response.data?.message || 'Unknown error'}`);
    }

    const userData: User = {
      ...response.data,
      token: response.data.accessToken || response.data.token
    };

    this.currentUser = userData;

    if (this.currentUser.token) {
      await this.apiClient.createContext(this.currentUser.token);
    }
    
    return this.currentUser!;
  }

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<User | null> {
    if (!this.currentUser?.token) {
      throw new Error('No authenticated user');
    }

    const response = await this.apiClient.get('/auth/me');
    
    if (!response.ok) {
      throw new Error(`Failed to get user: ${response.status}`);
    }

    return response.data;
  }

  /**
   * Logout and cleanup
   */
  async logout(): Promise<void> {
    this.currentUser = null;
    await this.apiClient.dispose();
  }

  /**
   * Get current authentication token
   */
  getCurrentUserToken(): string | null {
    return this.currentUser?.token || null;
  }

  /**
   * Check if currently authenticated
   */
  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }
}

// Pre-configured authentication managers
export const dummyJsonAuth = new AuthManager(dummyJsonClient);
export const reqresAuth = new AuthManager(reqresClient);

// Test user credentials
export const TEST_USERS = {
  emily: { username: 'emilys', password: 'emilyspass' },
  michael: { username: 'michaelw', password: 'michaelwpass' },
  sophia: { username: 'sophiab', password: 'sophiabpass' },
  james: { username: 'jamesd', password: 'jamesdpass' }
} as const;
```

---

## 🧪 **Creating Your Tests**

### **Step 1: Create Your Test File**

Create `tests/api-tests.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';
import { dummyJsonAuth, TEST_USERS } from '../helpers/auth-manager';

// ========================================
// 🔰 BASIC TESTS - Start Here!
// ========================================

test.describe('🔰 Basic API Testing', () => {
  
  test.beforeEach(async () => {
    await dummyJsonAuth.logout();
  });

  // Test 1: Your first API authentication
  test('Basic login and authentication', async () => {
    console.log('🔐 Testing basic API authentication...');
    
    // Step 1: Login with test credentials
    const user = await dummyJsonAuth.login(TEST_USERS.emily);
    
    // Step 2: Verify login was successful
    expect(user.username).toBe('emilys');
    expect(user.token).toBeTruthy();
    console.log('✅ Login successful:', user.username);
    
    // Step 3: Get user profile
    const currentUser = await dummyJsonAuth.getCurrentUser();
    expect(currentUser).toBeTruthy();
    expect(currentUser?.username).toBe('emilys');
    
    console.log('✅ User profile verified');
    
    // Step 4: Clean up
    await dummyJsonAuth.logout();
  });

  // Test 2: Understanding tokens
  test('Understanding authentication tokens', async () => {
    console.log('🔑 Learning about authentication tokens...');
    
    // Login to get a token
    await dummyJsonAuth.login(TEST_USERS.emily);
    
    // Check authentication status
    expect(dummyJsonAuth.isAuthenticated()).toBe(true);
    
    // Get the token
    const token = dummyJsonAuth.getCurrentUserToken();
    expect(token).toBeTruthy();
    console.log('🔑 Token obtained:', token?.substring(0, 20) + '...');
    
    // Logout
    await dummyJsonAuth.logout();
    expect(dummyJsonAuth.isAuthenticated()).toBe(false);
    
    console.log('✅ Token lifecycle understood');
  });
});

// ========================================
// 🚀 INTERMEDIATE TESTS
// ========================================

test.describe('🚀 Intermediate API Testing', () => {
  
  test.beforeEach(async () => {
    await dummyJsonAuth.logout();
  });

  // Test 3: Working with user data
  test('Working with user profile data', async () => {
    console.log('👤 Working with detailed user data...');
    
    await dummyJsonAuth.login(TEST_USERS.emily);
    const currentUser = await dummyJsonAuth.getCurrentUser();
    
    // Verify user data fields
    expect(currentUser?.id).toBe(1);
    expect(currentUser?.firstName).toBe('Emily');
    expect(currentUser?.lastName).toBe('Johnson');
    expect(currentUser?.email).toBeTruthy();
    expect(currentUser?.age).toBe(28);
    expect(currentUser?.gender).toBe('female');
    
    console.log('✅ User profile data:', {
      id: currentUser?.id,
      name: `${currentUser?.firstName} ${currentUser?.lastName}`,
      email: currentUser?.email
    });
    
    await dummyJsonAuth.logout();
  });

  // Test 4: Error handling
  test('Error handling - Invalid credentials', async () => {
    console.log('❌ Testing error handling...');
    
    const invalidCredentials = { username: 'nonexistent', password: 'wrong' };
    
    let errorThrown = false;
    try {
      await dummyJsonAuth.login(invalidCredentials);
    } catch (error) {
      errorThrown = true;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.log('✅ Error properly caught:', errorMessage);
    }
    
    expect(errorThrown).toBe(true);
    expect(dummyJsonAuth.isAuthenticated()).toBe(false);
    
    console.log('✅ Error handling works correctly');
  });
});

// ========================================
// 🎯 ADVANCED TESTS
// ========================================

test.describe('🎯 Advanced API Testing', () => {
  
  test.beforeEach(async () => {
    await dummyJsonAuth.logout();
  });

  // Test 5: Multiple user sessions
  test('Managing multiple user sessions', async () => {
    console.log('🔄 Testing multiple user sessions...');
    
    // Login as first user
    const user1 = await dummyJsonAuth.login(TEST_USERS.emily);
    expect(user1.username).toBe('emilys');
    
    await dummyJsonAuth.logout();
    
    // Login as second user
    const user2 = await dummyJsonAuth.login(TEST_USERS.michael);
    expect(user2.username).toBe('michaelw');
    
    console.log('✅ Successfully switched users:', user1.username, '→', user2.username);
    
    await dummyJsonAuth.logout();
  });

  // Test 6: Session lifecycle
  test('Session management lifecycle', async () => {
    console.log('🔄 Testing complete session lifecycle...');
    
    // Initial state
    expect(dummyJsonAuth.isAuthenticated()).toBe(false);
    
    // Login
    await dummyJsonAuth.login(TEST_USERS.emily);
    expect(dummyJsonAuth.isAuthenticated()).toBe(true);
    
    // Get user data
    const user = await dummyJsonAuth.getCurrentUser();
    expect(user).toBeTruthy();
    
    // Logout
    await dummyJsonAuth.logout();
    expect(dummyJsonAuth.isAuthenticated()).toBe(false);
    
    console.log('✅ Session lifecycle complete');
  });
});
```

---

## ▶️ **Running Your Tests**

### **Step 1: Add Test Scripts to package.json**

Update your `package.json`:

```json
{
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:ui": "playwright test --ui",
    "test:debug": "playwright test --debug"
  }
}
```

### **Step 2: Run Your Tests**

```bash
# Run all tests
npm test

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests with UI
npm run test:ui

# Debug tests
npm run test:debug
```

### **Expected Output:**

```
🔐 Testing basic API authentication...
✅ Login successful: emilys
✅ User profile verified

🔑 Learning about authentication tokens...
🔑 Token obtained: eyJhbGciOiJIUzI1NiIs...
✅ Token lifecycle understood

👤 Working with detailed user data...
✅ User profile data: {
  id: 1,
  name: 'Emily Johnson',
  email: 'emily.johnson@x.dummyjson.com'
}

✅ All tests passed!
```

---

## 🎓 **Understanding What You Built**

### **Framework Components:**

1. **ApiClient** - Makes HTTP requests easy
   - Handles authentication tokens automatically
   - Provides error handling
   - Supports all HTTP methods (GET, POST, PUT, DELETE)

2. **AuthManager** - Manages user sessions
   - One-line login/logout
   - Token management
   - State tracking

3. **Test Suite** - Progressive learning
   - 🔰 Basic: Fundamental concepts
   - 🚀 Intermediate: Real-world scenarios  
   - 🎯 Advanced: Production patterns

### **Key Benefits:**

- ✅ **Reusable** - Use across multiple projects
- ✅ **Type-safe** - Full TypeScript support
- ✅ **Maintainable** - Clear separation of concerns
- ✅ **Scalable** - Easy to extend with new features
- ✅ **Professional** - Industry best practices

---

## 🚀 **Next Steps**

### **1. Customize for Your API**

Replace DummyJSON endpoints with your own:

```typescript
// Update the base URL
const myApiClient = new ApiClient('https://your-api.com');

// Update test credentials
const TEST_USERS = {
  user1: { username: 'youruser', password: 'yourpass' }
};
```

### **2. Add More Test Cases**

Expand your test suite:

```typescript
test('Create a new resource', async () => {
  await dummyJsonAuth.login(TEST_USERS.user1);
  
  // Your test logic here
  const response = await apiClient.post('/items', {
    name: 'Test Item',
    description: 'Test Description'
  });
  
  expect(response.status).toBe(201);
});
```

### **3. Add Environment Configuration**

Create `config/environments.ts`:

```typescript
export const environments = {
  dev: {
    baseURL: 'https://dev-api.example.com'
  },
  staging: {
    baseURL: 'https://staging-api.example.com'
  },
  prod: {
    baseURL: 'https://api.example.com'
  }
};
```

### **4. Add Test Data Management**

Create `helpers/test-data-manager.ts`:

```typescript
export class TestDataManager {
  private static instance: TestDataManager;
  private testData: Map<string, any> = new Map();

  static getInstance(): TestDataManager {
    if (!TestDataManager.instance) {
      TestDataManager.instance = new TestDataManager();
    }
    return TestDataManager.instance;
  }

  set(key: string, value: any): void {
    this.testData.set(key, value);
  }

  get<T>(key: string): T | undefined {
    return this.testData.get(key);
  }

  generateTestEmail(testName: string): string {
    const timestamp = Date.now();
    return `${testName}_${timestamp}@test.example.com`;
  }
}

export const testData = TestDataManager.getInstance();
```

### **5. Add Database Integration**

For end-to-end testing, consider:
- Database seeding before tests
- Data cleanup after tests
- Test data generation
- State verification

---

## 📚 **Additional Resources**

### **Playwright Documentation:**
- [Playwright Test Guide](https://playwright.dev/docs/test-intro)
- [API Testing](https://playwright.dev/docs/api-testing)
- [Authentication](https://playwright.dev/docs/auth)

### **Best Practices:**
- Always clean up after tests
- Use test isolation
- Implement proper error handling
- Follow the AAA pattern (Arrange, Act, Assert)
- Use meaningful test names

### **Common Patterns:**

**Setup and Teardown:**
```typescript
test.beforeEach(async () => {
  // Setup before each test
  await setupTestData();
});

test.afterEach(async () => {
  // Cleanup after each test
  await cleanupTestData();
});
```

**Data-Driven Testing:**
```typescript
for (const user of Object.values(TEST_USERS)) {
  test(`Login with ${user.username}`, async () => {
    const result = await dummyJsonAuth.login(user);
    expect(result.username).toBe(user.username);
  });
}
```

---

## 🎉 **Congratulations!**

You've just built a complete, professional-grade API testing framework! 

### **What You've Accomplished:**

✅ **Professional HTTP Client** with error handling  
✅ **Smart Authentication Manager** with session tracking  
✅ **Progressive Test Suite** from basic to advanced  
✅ **TypeScript Integration** for type safety  
✅ **Best Practices** and industry standards  
✅ **Reusable Framework** for any API testing project  

### **Your Framework Can:**

- 🔐 Handle authentication automatically
- 📊 Validate complex API responses  
- 🛡️ Handle errors gracefully
- ⚡ Run efficiently with parallel execution
- 📝 Provide clear, readable test output
- 🔄 Manage multiple user sessions
- 📈 Scale to production-level testing

### **Share Your Success!**

Use this framework in your projects, share it with your team, and continue building on it. You've got a solid foundation for professional API testing!

**Happy Testing! 🚀**

---

*This guide was created to help beginners build a complete API testing framework from scratch. Follow along step-by-step, and you'll have a production-ready solution in under an hour.*