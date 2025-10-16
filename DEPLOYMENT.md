# FTP Deployment Setup

This project uses GitHub Actions to automatically deploy to cPanel via FTP when changes are pushed to the main branch.

## Required GitHub Secrets

To enable FTP deployment, you need to configure the following secrets in your GitHub repository:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add the following secrets:

### Required Secrets:

- **`FTP_SERVER`**: Your cPanel FTP server address (e.g., `ftp.yourdomain.com` or IP address)
- **`FTP_USERNAME`**: Your cPanel FTP username
- **`FTP_PASSWORD`**: Your cPanel FTP password

### Optional Secrets:

- **`FTP_SERVER_DIR`**: The directory on the server where files should be uploaded (defaults to `./public_html/`)

## How It Works

1. **Trigger**: The workflow runs automatically on pushes to `main` or `master` branch, or manually via workflow dispatch
2. **Build**: Installs dependencies and builds the production CSS using Tailwind
3. **Prepare**: Creates a deployment directory with only production files
4. **Deploy**: Uploads files to cPanel via FTP using the configured credentials

## Files Included in Deployment

The following files and directories are included in the deployment:
- `index.html` - Main page
- `favicon.png` - Site favicon
- `css/` - All CSS files (including built styles)
- `js/` - All JavaScript files
- `images/` - All image assets
- `thank-you/` - Thank you page directory

## Files Excluded from Deployment

The following files are excluded from deployment:
- `node_modules/` - Dependencies
- `package.json`, `package-lock.json` - Package files
- `tailwind.config.js` - Tailwind configuration
- `input.css` - Source CSS file
- `README.md` - Documentation
- `.github/` - GitHub workflow files
- `deploy-github.sh` - Deployment script
- `.git/` - Git files
- `.DS_Store`, `Thumbs.db` - System files
- `*.log`, `*.map` - Log and source map files

## Manual Deployment

You can also trigger the deployment manually:
1. Go to the **Actions** tab in your GitHub repository
2. Select the "Deploy to cPanel via FTP" workflow
3. Click **Run workflow** and select the branch

## Troubleshooting

If deployment fails, check:
1. FTP credentials are correct
2. FTP server allows connections from GitHub Actions IPs
3. Target directory exists and has write permissions
4. No firewall blocking FTP connections
