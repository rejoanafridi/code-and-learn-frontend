# Code Learn Platform 
Backend - [Backend Code and Learn](https://github.com/rejoanafridi/learn-and-code-backend)
This is a coding learning platform built with React and Vite. It includes authentication with Clerk, a tutorial browser, and an interactive code editor.

## Features

-   User authentication with both traditional login and social login via Clerk
-   Interactive tutorials with step-by-step instructions
-   Code editor with syntax highlighting
-   Track progress through tutorials

## Getting Started

1. Clone the repository
2. Install dependencies:
    ```
    npm install
    ```
3. Set up environment variables:
    ```
    VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    CLERK_SECRET_KEY=your_clerk_secret_key
    ```
4. Start the development server:
    ```
    npm run dev
    ```

## Authentication with Clerk

This project uses [Clerk](https://clerk.com) for authentication and user management. The authentication flow works as follows:

1. Users can sign in through the Clerk authentication UI or with social providers
2. After authentication with Clerk, the frontend sends the session token to the backend
3. The backend verifies the token, finds or creates the user in the database, and returns a JWT
4. This JWT is then used for all subsequent API calls

For full setup instructions, see the [CLERK_SETUP.md](./CLERK_SETUP.md) file.

## Backend Integration

The backend API expects:

-   A POST endpoint at `/api/auth/social-login` that accepts a Clerk token
-   The token is verified using the Clerk SDK and the CLERK_SECRET_KEY
-   User information is extracted and a user is created or retrieved from the database
-   A JWT token is returned for subsequent API calls

## Tech Stack

-   React + Vite
-   Clerk for authentication
-   Monaco Editor for code editing
-   i18next for internationalization
-   React Hook Form for form handling
-   Tailwind CSS for styling
