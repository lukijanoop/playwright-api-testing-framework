// Import our API client and TypeScript types
import { ApiClient } from './api-client';                                    // Our HTTP client
import { User, AuthCredentials, ApiResponse } from '../types/api';           // TypeScript interfaces

/**
 * AuthManager - Handles all authentication-related operations
 * This class makes it easy to login, logout, and manage user sessions
 */
export class AuthManager {
  // Private variables (can only be accessed inside this class)
  private apiClient: ApiClient;           // The HTTP client for making API calls
  private currentUser: User | null = null; // Currently logged-in user (null if not logged in)

  /**
   * Constructor - runs when we create a new AuthManager
   * @param apiClient - The HTTP client to use for authentication requests
   */
  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;  // Save the HTTP client for later use
  }

  /**
   * Login with username and password
   * @param credentials - Object containing username and password
   * @returns Promise that resolves to the logged-in user object
   */
  async login(credentials: AuthCredentials): Promise<User> {
    // Create an HTTP context (required before making any API calls)
    await this.apiClient.createContext();
    
    // Send login request to the /auth/login endpoint
    const response = await this.apiClient.post('/auth/login', {
      // Send username and password in the request body
      username: credentials.username,
      password: credentials.password
    });

    // Check if the login was successful
    if (!response.ok) {
      // If login failed, throw an error with helpful information
      throw new Error(`Login failed: ${response.status} - ${response.data?.message || 'Unknown error'}`);
    }

    // Create a user object from the API response
    const userData: User = {
      ...response.data,                                    // Copy all data from API response
      token: response.data.accessToken || response.data.token  // Get token from response
    };

    // Remember the current user (so we know who's logged in)
    this.currentUser = userData;

    // Create a new HTTP context that includes the authentication token
    // This ensures all future API calls include the token automatically
    if (this.currentUser.token) {
      await this.apiClient.createContext(this.currentUser.token);
    }
    
    // Return the user information
    return this.currentUser!;
  }

  /**
   * Get the current user's profile information
   * @returns Promise that resolves to the current user's data, or null if not logged in
   */
  async getCurrentUser(): Promise<User | null> {
    // Check if we have a valid user and token
    if (!this.currentUser?.token) {
      throw new Error('No authenticated user');
    }

    // Call the /auth/me endpoint to get current user info
    const response = await this.apiClient.get('/auth/me');
    
    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`Failed to get user: ${response.status}`);
    }

    // Return the user data from the API response
    return response.data;
  }

  /**
   * Logout and clean up the session
   */
  async logout(): Promise<void> {
    // Forget the current user
    this.currentUser = null;
    // Clean up the HTTP client
    await this.apiClient.dispose();
  }

  /**
   * Get the authentication token for the current user
   * @returns The token string, or null if no user is logged in
   */
  getCurrentUserToken(): string | null {
    // Return the token if we have a current user, otherwise null
    return this.currentUser?.token || null;
  }

  /**
   * Check if someone is currently logged in
   * @returns True if a user is logged in, false otherwise
   */
  isAuthenticated(): boolean {
    // Return true if we have a current user, false otherwise
    return this.currentUser !== null;
  }
}

// Import pre-configured API clients
import { dummyJsonClient, reqresClient } from './api-client';

/**
 * Pre-configured AuthManager for DummyJSON API
 * You can import and use this directly in your tests
 */
export const dummyJsonAuth = new AuthManager(dummyJsonClient);

/**
 * Pre-configured AuthManager for ReqRes.in API
 * You can import and use this directly in your tests
 */
export const reqresAuth = new AuthManager(reqresClient);

/**
 * Test user credentials for DummyJSON
 * These are pre-configured users that exist in the DummyJSON database
 * You can use these for testing without creating your own accounts
 */
export const TEST_USERS = {
  emily: { username: 'emilys', password: 'emilyspass' },    // Emily Johnson (ID: 1)
  michael: { username: 'michaelw', password: 'michaelwpass' }, // Michael Williams (ID: 2)
  sophia: { username: 'sophiab', password: 'sophiabpass' },    // Sophia Brown (ID: 3)
  james: { username: 'jamesd', password: 'jamesdpass' }        // James Davis (ID: 4)
} as const;