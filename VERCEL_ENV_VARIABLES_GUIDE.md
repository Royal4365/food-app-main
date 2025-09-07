# Vercel Environment Variables Guide

## Overview

This guide explains how to set up environment variables in Vercel for your food delivery application. The deployment error you encountered was due to missing environment variables, specifically the `.env.local` file not being found during the build process.

## Solution Implemented

We've made the following changes to fix the deployment issue:

1. Modified `scripts/setup-db.js` to check for environment variables directly from Vercel before looking for `.env.local` files
2. Created a new script `scripts/vercel-env-setup.js` that generates a `.env.local` file during build using Vercel environment variables
3. Updated `vercel-build.js` to run the environment setup script before database setup

## Setting Up Environment Variables in Vercel

To complete the fix, you need to add your environment variables to your Vercel project:

1. **Log in to your Vercel dashboard**
2. **Select your food-app project**
3. **Go to Settings > Environment Variables**
4. **Add the following environment variables:**

   | Name | Value | Environment |
   |------|-------|-------------|
   | `DATABASE_URL` | `postgresql://neondb_owner:npg_jpX5e2wPcrYs@ep-fancy-violet-a1df44to-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require` | Production, Preview, Development |
   | `NEXTAUTH_URL` | Your Vercel deployment URL (e.g., `https://your-app-name.vercel.app`) | Production |
   | `NEXTAUTH_URL` | `http://localhost:3000` | Preview, Development |
   | `NEXTAUTH_SECRET` | `a14223483baabc9d57c3d7e886bebaa66b3c5da1582da3b9b8692ffd64fbb6d1` | Production, Preview, Development |
   | `JWT_SECRET` | `1e39c3aa2ae1ff031d4ef3250eb89fea8052a6b80a048ba0a16cfd40947b28cb` | Production, Preview, Development |

5. **Click Save**

## Verifying Your Setup

After adding the environment variables:

1. **Trigger a new deployment** by pushing a small change to your repository or using the "Redeploy" button in the Vercel dashboard
2. **Monitor the build logs** to ensure the environment setup and database setup complete successfully
3. **Test your deployed application** to verify that database connections are working

## Troubleshooting

If you still encounter issues:

1. **Check build logs** for specific error messages
2. **Verify database connection** - ensure your NeonDB instance is active and accepting connections
3. **Check environment variables** - make sure they are correctly set in Vercel without typos
4. **Database permissions** - ensure your database user has the necessary permissions

## Local Development

For local development, you can continue using your `.env.local` file. The changes we've made only affect the Vercel deployment process and won't impact your local development workflow.