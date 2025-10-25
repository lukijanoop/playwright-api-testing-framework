// Import Playwright's HTTP request functionality
import { request, APIRequestContext } from '@playwright/test';

/**
 * ApiClient - A reusable HTTP client that makes API testing easier
 * Think of this as a wrapper around Playwright's request functionality
 */
export class ApiClient {
  // Private variables (can only be accessed inside this class)
  private context: APIRequestContext | null = null;  // The HTTP context for making requests
  private baseURL: string;                           // The base URL for all API calls
  private headers: Record<string, string>;           // Headers to send with every request

  /**
   * Constructor - runs when we create a new ApiClient
   * @param baseURL - The base URL for the API (e.g., 'https://api.example.com')
   * @param headers - Additional headers to include with requests (optional)
   */
  constructor(baseURL: string, headers: Record<string, string> = {}) {
    this.baseURL = baseURL;                                      // Save the base URL
    this.headers = {                                             // Set default headers
      'Accept': 'application/json',                              // Tell API we want JSON responses
      'Content-Type': 'application/json',                        // Tell API we send JSON data
      ...headers                                                 // Add any additional headers
    };
  }

  /**
   * Create an HTTP context for making requests
   * @param token - Optional authentication token for Bearer authentication
   */
  async createContext(token?: string): Promise<void> {
    // If we have a token, add it to our headers
    const headers = token 
      ? { ...this.headers, 'Authorization': `Bearer ${token}` }  // Add token to headers
      : this.headers;                                            // Use headers without token

    // Create a new HTTP context with our base URL and headers
    this.context = await request.newContext({
      baseURL: this.baseURL,                                     // Set base URL
      extraHTTPHeaders: headers                                  // Set headers for all requests
    });
  }

  /**
   * Make a GET request (fetch data)
   * @param endpoint - The API endpoint to call (e.g., '/users')
   * @param params - Optional query parameters (e.g., { limit: 10 })
   */
  async get(endpoint: string, params?: Record<string, any>) {
    // Check if we have a valid context (must call createContext first)
    if (!this.context) throw new Error('Context not initialized');
    
    // Make the GET request
    const response = await this.context.get(endpoint, { params });
    // Validate and format the response
    return this.validateResponse(response);
  }

  /**
   * Make a POST request (send data to create something)
   * @param endpoint - The API endpoint to call
   * @param data - The data to send in the request body
   */
  async post(endpoint: string, data: any) {
    // Check if we have a valid context
    if (!this.context) throw new Error('Context not initialized');
    
    // Make the POST request with data
    const response = await this.context.post(endpoint, { data });
    // Validate and format the response
    return this.validateResponse(response);
  }

  /**
   * Make a PUT request (update existing data)
   * @param endpoint - The API endpoint to call
   * @param data - The updated data to send
   */
  async put(endpoint: string, data: any) {
    // Check if we have a valid context
    if (!this.context) throw new Error('Context not initialized');
    
    // Make the PUT request with data
    const response = await this.context.put(endpoint, { data });
    // Validate and format the response
    return this.validateResponse(response);
  }

  /**
   * Make a DELETE request (remove something)
   * @param endpoint - The API endpoint to call
   */
  async delete(endpoint: string) {
    // Check if we have a valid context
    if (!this.context) throw new Error('Context not initialized');
    
    // Make the DELETE request
    const response = await this.context.delete(endpoint);
    // Validate and format the response
    return this.validateResponse(response);
  }

  /**
   * Validate and format an API response
   * @param response - The raw response from Playwright
   * @returns Formatted response with status, success flag, data, and headers
   */
  private async validateResponse(response: any) {
    // Parse the JSON response body
    const body = await response.json();
    
    // Return a nicely formatted response object
    return {
      status: response.status(),        // HTTP status code (200, 404, etc.)
      ok: response.ok(),               // Success flag (true if status is 2xx)
      data: body,                      // The actual response data
      headers: response.headers()      // Response headers
    };
  }

  /**
   * Clean up the HTTP context when we're done
   * Important to call this to free up resources
   */
  async dispose() {
    if (this.context) {
      // Close the HTTP context
      await this.context.dispose();
      // Reset to null
      this.context = null;
    }
  }
}

// Pre-configured API clients for common testing APIs
// You can import these directly in your tests instead of creating new ones

/** Ready-to-use client for DummyJSON API */
export const dummyJsonClient = new ApiClient('https://dummyjson.com');

/** Ready-to-use client for ReqRes.in API */
export const reqresClient = new ApiClient('https://reqres.in/api');