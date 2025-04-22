# Clerk Authentication Setup

This project uses [Clerk](https://clerk.com) for authentication and user management. Follow these steps to set up Clerk in your project:

## Setup Steps

### 1. Create a Clerk Account and Project

1. Go to [https://clerk.com](https://clerk.com) and sign up for an account
2. Create a new application in the Clerk dashboard
3. Configure your application settings, including:
    - Authentication methods (social providers, email/password, etc.)
    - Appearance settings
    - Redirect URLs

### 2. Get Your API Keys

1. In your Clerk dashboard, go to the "API Keys" section
2. You'll need both the Publishable Key and Secret Key

### 3. Configure Environment Variables

Add the following variables to your `.env` file:

```
VITE_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
```

**Important**: The secret key should never be exposed to the client. It's used only in your backend.

## Usage

### Frontend Integration

The project is already set up with:

1. `ClerkProvider` in the app root (`main.jsx`)
2. Social login component (`SocialLogin.jsx`)
3. Authentication page components (`ClerkAuthPage.jsx`)

### Backend Integration

The backend handler (`src/backend/auth-handler.js`) provides a template for verifying Clerk tokens and creating users in your database.

To implement this in your server, you need to:

1. Install the required packages: `npm install @clerk/clerk-sdk-node`
2. Create an endpoint at `/api/auth/social-login` that processes requests
3. Adapt the handler code to your server framework (Express, Koa, etc.)
4. Implement proper user creation/retrieval in your database

## Authentication Flow

1. Client authenticates with Clerk (either via social login or email/password)
2. Client receives a session token from Clerk
3. Client sends this token to your backend at `/api/auth/social-login`
4. Backend verifies the token using Clerk's SDK
5. Backend finds or creates the user in your database
6. Backend generates your internal JWT/session token
7. Client receives your token and uses it for subsequent API calls

## Support

If you need help, refer to:

-   [Clerk Documentation](https://clerk.com/docs)
-   [Clerk React SDK Documentation](https://clerk.com/docs/references/react/overview)
-   [Clerk Node.js SDK Documentation](https://clerk.com/docs/references/backend/overview)
