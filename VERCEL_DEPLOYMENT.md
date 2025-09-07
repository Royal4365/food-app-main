# Deploying to Vercel

This guide will help you deploy your Food App to Vercel.

## Prerequisites

1. A [Vercel](https://vercel.com) account
2. A PostgreSQL database (we recommend [Neon](https://neon.tech) for serverless PostgreSQL)
3. Your project code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### 1. Prepare Your Database

Ensure you have a PostgreSQL database ready for production use. Copy your database connection string as you'll need it for the environment variables.

### 2. Connect Your Repository to Vercel

1. Log in to your Vercel account
2. Click "Add New" → "Project"
3. Import your Git repository
4. Select the repository containing your Food App

### 3. Configure Environment Variables

Add the following environment variables in the Vercel project settings:

- `DATABASE_URL`: Your PostgreSQL connection string
- `NEXTAUTH_URL`: Your production URL (e.g., https://your-app.vercel.app)
- `NEXTAUTH_SECRET`: A secure random string for NextAuth.js
- `JWT_SECRET`: A secure random string for JWT authentication

You can generate secure random strings using this command:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Deploy Your Application

1. Click "Deploy" in the Vercel dashboard
2. Wait for the build and deployment to complete
3. Once deployed, Vercel will provide you with a URL to access your application

### 5. Verify Deployment

1. Visit your deployed application URL
2. Test key functionality to ensure everything works as expected
3. Check that authentication, restaurant listings, and menu items are working correctly

## Handling Large Files and node_modules

When deploying to Vercel, you might encounter issues with large files or the node_modules directory:

1. **node_modules**: This directory is automatically excluded during deployment. Vercel will install dependencies based on your package.json file.

2. **File Size Limits**: Vercel has a 100MB limit for files. If you're trying to upload large files, consider:
   - Using a CDN for large assets
   - Storing files in a separate storage service
   - Breaking down large files into smaller chunks

3. **.vercelignore**: A .vercelignore file has been added to your project to explicitly exclude node_modules and other unnecessary files during deployment.

## Troubleshooting

### Database Connection Issues

If you encounter database connection problems:

1. Verify your `DATABASE_URL` is correct
2. Ensure your database allows connections from Vercel's IP addresses
3. Check that SSL settings are properly configured

### Build Failures

If your build fails:

1. Check the build logs in Vercel
2. Ensure all dependencies are correctly installed
3. Verify that your code works locally with `npm run build`

## Continuous Deployment

Vercel automatically deploys your application when you push changes to your repository. To disable this behavior, you can configure deployment settings in the Vercel dashboard.

## Custom Domains

To use a custom domain:

1. Go to your project settings in Vercel
2. Navigate to the "Domains" section
3. Add your custom domain and follow the verification steps

## Support

If you need help with your deployment, refer to the [Vercel documentation](https://vercel.com/docs) or contact Vercel support.