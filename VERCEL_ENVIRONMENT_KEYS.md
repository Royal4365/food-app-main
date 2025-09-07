# Vercel Environment Keys Guide

## Required Environment Variables

For your Vercel deployment, you need to set up the following environment variables in the Vercel dashboard:

### 1. JWT_SECRET

This is used for signing JWT tokens in your custom authentication system.

```
JWT_SECRET="a-very-long-and-secure-random-string-for-jwt-tokens"
```

**How to generate a secure JWT_SECRET:**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Example output: `7c4c1c8c9b8f7b8e7d8e7f8e7d8e7f8e7d8e7f8e7d8e7f8e7d8e7f8e7d8e7f`

### 2. NEXTAUTH_URL

This should be the full URL of your Vercel deployment.

```
NEXTAUTH_URL="https://your-app-name.vercel.app"
```

Replace `your-app-name` with the actual name of your Vercel deployment.

### 3. NEXTAUTH_SECRET

This is used by NextAuth.js for encryption.

```
NEXTAUTH_SECRET="another-very-long-and-secure-random-string"
```

**How to generate a secure NEXTAUTH_SECRET:**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Example output: `3e292a9f8d7e6b5c4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f`

## Setting Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Click on "Settings" tab
4. Navigate to "Environment Variables" section
5. Add each of the above variables with their respective values
6. Click "Save" to apply the changes
7. Redeploy your application for the changes to take effect

## Important Security Notes

- **Never share** these secret keys publicly or commit them to your repository
- Generate **unique keys** for each environment (development, staging, production)
- Use **strong, random values** for all secret keys
- Consider using a **secrets manager** for production environments

## Verifying Your Environment Variables

After deployment, you can verify that your environment variables are correctly set by:

1. Checking if authentication works properly
2. Verifying that JWT tokens are being generated and validated
3. Confirming that protected routes are accessible only to authenticated users

If you encounter any issues, double-check your environment variables in the Vercel dashboard and ensure they match the format shown above.