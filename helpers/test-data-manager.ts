/**
 * TestDataManager - A utility class for managing test data during test execution
 * Think of this as a temporary storage system for your test data
 * Like a notebook where you can write down values and read them back later
 */

export class TestDataManager {
  // Static instance (singleton pattern - only one instance exists)
  private static instance: TestDataManager;
  
  // Internal storage - a Map is like a dictionary or key-value store
  // It lets us store data with a name (key) and retrieve it later using that name
  private testData: Map<string, any> = new Map();

  /**
   * Get the singleton instance of TestDataManager
   * This ensures there's only one instance of this class in your entire test run
   * @returns The single TestDataManager instance
   */
  static getInstance(): TestDataManager {
    // If we don't have an instance yet, create one
    if (!TestDataManager.instance) {
      TestDataManager.instance = new TestDataManager();
    }
    // Return the instance (create it if it doesn't exist, or return existing one)
    return TestDataManager.instance;
  }

  /**
   * Store a value with a key name for later retrieval
   * @param key - The name to store the data under (like a variable name)
   * @param value - The data to store (can be anything: numbers, objects, arrays, etc.)
   */
  set(key: string, value: any): void {
    // Store the value with the key in our internal Map
    this.testData.set(key, value);
  }

  /**
   * Retrieve a previously stored value
   * @param key - The name the data was stored under
   * @returns The stored data, or undefined if nothing was stored with that key
   */
  get<T>(key: string): T | undefined {
    // Get and return the value stored with this key
    return this.testData.get(key);
  }

  /**
   * Check if data is stored with a specific key
   * @param key - The key to check for
   * @returns True if data exists with this key, false otherwise
   */
  has(key: string): boolean {
    // Check if the key exists in our Map
    return this.testData.has(key);
  }

  /**
   * Remove data stored with a specific key
   * @param key - The key to remove
   * @returns True if something was deleted, false if nothing was found
   */
  delete(key: string): boolean {
    // Delete the data stored with this key
    return this.testData.delete(key);
  }

  /**
   * Clear ALL stored data
   * This removes everything you've stored (use carefully!)
   */
  clear(): void {
    // Clear the entire Map (removes all stored data)
    this.testData.clear();
  }

  // === CONVENIENCE METHODS FOR COMMON TEST SCENARIOS ===

  /**
   * Store user data with a user ID as the key
   * @param userId - The ID of the user (e.g., 1, 2, 3)
   * @param userData - The user data to store
   */
  setUser(userId: number, userData: any): void {
    // Store user data with a key like "user_1", "user_2", etc.
    this.set(`user_${userId}`, userData);
  }

  /**
   * Retrieve user data by user ID
   * @param userId - The ID of the user to retrieve
   * @returns The stored user data, or undefined if not found
   */
  getUser(userId: number): any {
    // Get user data stored with key "user_{userId}"
    return this.get(`user_${userId}`);
  }

  /**
   * Store the last API response for later reference
   * @param response - The response data to store
   */
  setLastResponse(response: any): void {
    // Store the response with the key "last_response"
    this.set('last_response', response);
  }

  /**
   * Get the most recently stored response
   * @returns The last response that was stored
   */
  getLastResponse(): any {
    // Get the data stored with key "last_response"
    return this.get('last_response');
  }

  /**
   * Store an authentication token
   * @param token - The authentication token to store
   */
  setToken(token: string): void {
    // Store the token with the key "auth_token"
    this.set('auth_token', token);
  }

  /**
   * Get the stored authentication token
   * @returns The token, or undefined if none was stored
   */
  getToken(): string | undefined {
    // Get the data stored with key "auth_token"
    return this.get('auth_token');
  }

  // === DATA GENERATION METHODS ===

  /**
   * Generate a unique test email address
   * This creates emails that are unlikely to conflict with existing ones
   * @param testName - Name to include in the email (e.g., "signup", "login")
   * @returns A unique email address like "signup_1234567890@test.example.com"
   */
  generateTestEmail(testName: string): string {
    // Get current time in milliseconds (creates a unique number)
    const timestamp = Date.now();
    // Create and return the unique email
    return `${testName}_${timestamp}@test.example.com`;
  }

  /**
   * Generate a unique test username
   * This creates usernames that are unlikely to conflict with existing ones
   * @param testName - Name to include in the username (e.g., "testuser")
   * @returns A unique username like "testuser_1234567890"
   */
  generateTestUsername(testName: string): string {
    // Get current time in milliseconds (creates a unique number)
    const timestamp = Date.now();
    // Create and return the unique username
    return `${testName}_${timestamp}`;
  }
}

/**
 * Global instance for easy access throughout your tests
 * Instead of calling TestDataManager.getInstance() everywhere,
 * you can just import and use 'testData' directly
 */
export const testData = TestDataManager.getInstance();