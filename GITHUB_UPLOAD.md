# Uploading to GitHub from Terminal

## Prerequisites

1. **Install Git**
   - Download Git from [git-scm.com](https://git-scm.com/downloads)
   - Follow the installation instructions for Windows
   - Restart your terminal after installation
   - Verify installation with `git --version`

2. **GitHub Account**
   - Create an account at [github.com](https://github.com) if you don't have one

## Setting Up Your Repository

### First-time Setup

1. **Initialize Git in your project folder**
   ```bash
   git init
   ```

2. **Configure your identity**
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

3. **Create a new repository on GitHub**
   - Go to [github.com/new](https://github.com/new)
   - Name your repository (e.g., "food-app")
   - Choose public or private
   - Do NOT initialize with README, .gitignore, or license
   - Click "Create repository"

4. **Link your local repository to GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/food-app.git
   ```

## Uploading Your Code

1. **Add your files to staging**
   ```bash
   git add .
   ```

2. **Commit your changes**
   ```bash
   git commit -m "Initial commit"
   ```

3. **Push to GitHub**
   ```bash
   git push -u origin main
   ```
   Note: If you're using an older version of Git, you might need to use `master` instead of `main`.

## Handling Large Files and node_modules

1. **The `.gitignore` file** in your project already excludes:
   - `node_modules/` directory
   - Various log files
   - Environment files
   - Build outputs

2. **If you encounter issues with large files:**
   - Consider using [Git LFS](https://git-lfs.github.com/) for large files
   - Break large assets into smaller components
   - Use external storage for very large assets

## Authentication

1. **GitHub now requires token-based authentication for HTTPS**
   - Go to GitHub → Settings → Developer settings → Personal access tokens
   - Generate a new token with appropriate permissions
   - Use this token instead of your password when prompted

2. **Alternatively, set up SSH authentication**
   - Generate SSH keys: `ssh-keygen -t ed25519 -C "your.email@example.com"`
   - Add the public key to your GitHub account
   - Use SSH URL: `git remote add origin git@github.com:yourusername/food-app.git`

## Subsequent Updates

After initial setup, use these commands to update your repository:

```bash
# Add changes
git add .

# Commit with message
git commit -m "Description of changes"

# Push to GitHub
git push
```

## Troubleshooting

- **Authentication failures**: Ensure you're using a personal access token or SSH key
- **Large file errors**: Check if you're trying to push files larger than GitHub's limit (100MB)
- **Merge conflicts**: Pull latest changes with `git pull` before pushing