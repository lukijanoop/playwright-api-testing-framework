# 🎯 API Testing Framework - Complete Guide

## What We've Built

A **production-ready API testing framework** using Playwright that provides:

### 📁 **Project Structure**
```
mock-api/
├── helpers/
│   ├── api-client.ts          # Generic HTTP client
│   ├── auth-manager.ts        # Authentication management
│   └── test-data-manager.ts   # Test data utilities
├── types/
│   └── api.ts                 # TypeScript interfaces
└── tests/
    ├── example.spec.ts        # Simple framework examples
    └── api-framework-demo.spec.ts # Complete framework demo
```

### 🚀 **Key Features**

#### 1. **ApiClient** - Generic HTTP Client
```typescript
const client = new ApiClient('https://api.example.com');
await client.createContext('bearer-token');
const response = await client.get('/users');
```

#### 2. **AuthManager** - Authentication Handler
```typescript
const auth = new AuthManager(apiClient);
const user = await auth.login({ username: 'user', password: 'pass' });
const profile = await auth.getCurrentUser();
auth.logout();
```

#### 3. **TestDataManager** - Data Storage
```typescript
testData.set('userId', 123);
const userId = testData.get('userId');
const email = testData.generateTestEmail('signup');
```

## 🎯 **Benefits Over Raw Playwright**

| Feature | Before (Raw) | After (Framework) |
|---------|-------------|------------------|
| **Code Reuse** | ❌ Copy-paste everywhere | ✅ Centralized helpers |
| **Type Safety** | ❌ No TypeScript support | ✅ Full TypeScript |
| **Error Handling** | ❌ Manual every time | ✅ Centralized validation |
| **Authentication** | ❌ Repeat token logic | ✅ One-liner login |
| **Data Management** | ❌ Global variables | ✅ Thread-safe storage |
| **Test Organization** | ❌ Hard to scale | ✅ Modular structure |

## 📋 **Real-World Example**

### Before (Raw Playwright):
```typescript
// 50+ lines of repetitive code
test('user signup', async () => {
  const apiContext = await request.newContext({
    baseURL: 'https://api.example.com',
    extraHTTPHeaders: { 'Accept': 'application/json' }
  });
  
  const loginResponse = await apiContext.post('/auth/login', {
    data: { username: 'user', password: 'pass' }
  });
  
  const loginData = await loginResponse.json();
  
  const authContext = await request.newContext({
    baseURL: 'https://api.example.com',
    extraHTTPHeaders: {
      'Authorization': `Bearer ${loginData.accessToken}`,
      'Accept': 'application/json'
    }
  });
  
  const response = await authContext.post('/users', {
    data: { name: 'John Doe', email: 'john@example.com' }
  });
  
  // ... more repetitive code
});
```

### After (With Framework):
```typescript
// 15 lines of clean, readable code
test('user signup', async () => {
  const auth = new AuthManager(apiClient);
  await auth.login({ username: 'user', password: 'pass' });
  
  const response = await apiClient.post('/users', {
    name: 'John Doe', 
    email: 'john@example.com'
  });
  
  expect(response.status).toBe(201);
});
```

## 🔧 **Framework Components Explained**

### **ApiClient.ts**
- **Purpose**: Reusable HTTP client with built-in error handling
- **Key Methods**: `get()`, `post()`, `put()`, `delete()`
- **Features**: Automatic JSON parsing, response validation, context management

### **AuthManager.ts**
- **Purpose**: Handle authentication lifecycle
- **Key Methods**: `login()`, `getCurrentUser()`, `logout()`
- **Features**: Token management, session tracking, automatic context updates

### **TestDataManager.ts**
- **Purpose**: Thread-safe data storage during tests
- **Key Methods**: `set()`, `get()`, `generateTestEmail()`
- **Features**: Global state management, test data generation

## 🎓 **Best Practices Implemented**

1. **Separation of Concerns** - Each helper has one responsibility
2. **TypeScript Types** - Full type safety throughout
3. **Error Handling** - Centralized validation and error reporting
4. **Resource Management** - Proper cleanup and disposal
5. **Test Isolation** - Each test is independent
6. **Reusability** - Components can be used across different projects

## 🚀 **How to Use This Framework**

1. **Copy the helper files** to your project
2. **Import what you need**:
   ```typescript
   import { dummyJsonAuth, TEST_USERS } from './helpers/auth-manager';
   import { apiClient } from './helpers/api-client';
   ```
3. **Use in your tests**:
   ```typescript
   test('my test', async () => {
     const user = await dummyJsonAuth.login(TEST_USERS.emily);
     // ... your test logic
   });
   ```

## 🎯 **Production Ready Features**

✅ **Scalable Architecture** - Easy to add new endpoints  
✅ **Maintainable Code** - Clear separation of concerns  
✅ **Type Safety** - Full TypeScript support  
✅ **Error Handling** - Comprehensive validation  
✅ **Reusability** - Build once, use everywhere  
✅ **Performance** - Optimized for speed  

This framework can handle enterprise-level API testing while remaining simple and intuitive! 🎉