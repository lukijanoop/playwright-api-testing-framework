/**
 * User Interface - Defines the structure of a user object
 * This is like a blueprint that tells TypeScript what properties a user should have
 * Based on DummyJSON API response structure
 */
export interface User {
  id: number;              // Unique identifier for the user (e.g., 1, 2, 3)
  username: string;        // Login username (e.g., "emilys")
  email: string;           // User's email address (e.g., "emily@email.com")
  firstName: string;       // User's first name (e.g., "Emily")
  lastName: string;        // User's last name (e.g., "Johnson")
  maidenName?: string;     // User's maiden name (optional)
  age?: number;            // User's age (optional)
  gender: string;          // User's gender (e.g., "female", "male")
  image: string;           // URL to user's profile picture
  phone?: string;          // User's phone number (optional)
  birthDate?: string;      // User's birth date (optional)
  bloodGroup?: string;     // User's blood group (optional)
  height?: number;         // User's height in cm (optional)
  weight?: number;         // User's weight in kg (optional)
  eyeColor?: string;       // User's eye color (optional)
  hair?: {                 // User's hair information (optional)
    color: string;
    type: string;
  };
  ip?: string;             // User's IP address (optional)
  address?: {              // User's address information (optional)
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
  macAddress?: string;     // User's MAC address (optional)
  university?: string;     // User's university (optional)
  bank?: {                 // User's bank information (optional)
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company?: {              // User's company information (optional)
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
  ein?: string;            // Employee Identification Number (optional)
  ssn?: string;            // Social Security Number (optional)
  userAgent?: string;      // User's browser information (optional)
  crypto?: {               // User's cryptocurrency information (optional)
    coin: string;
    wallet: string;
    network: string;
  };
  role?: string;           // User's role (optional)
  // Authentication properties
  token?: string;          // Authentication token (optional - may not always be present)
  accessToken?: string;    // Access token for API authentication (optional)
  refreshToken?: string;   // Refresh token for renewing authentication (optional)
}

/**
 * ApiResponse Interface - Standard format for all API responses
 * T = any means "T can be any type" - makes this flexible for different APIs
 */
export interface ApiResponse<T = any> {
  status: number;                    // HTTP status code (200, 404, 500, etc.)
  ok: boolean;                       // Success flag (true if status is 2xx)
  data: T;                           // The actual response data from the API
  headers: Record<string, string>;   // HTTP response headers (metadata about the response)
}

/**
 * AuthCredentials Interface - Defines what we need for login
 * This ensures we have the required fields for authentication
 */
export interface AuthCredentials {
  username: string;   // Username for login (required)
  password: string;   // Password for login (required)
  email?: string;     // Email address (optional - some APIs need it, others don't)
}

/**
 * TestData Interface - Structure for organizing test data
 * This can be useful for storing and managing data used in tests
 */
export interface TestData {
  users: User[];      // Array of user objects
  products: any[];    // Array of product objects (any = flexible, can be any structure)
  orders: any[];      // Array of order objects (any = flexible, can be any structure)
}