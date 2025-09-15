#!/bin/bash

# Animal Heroes Donation Page - GitHub Pages Deployment Script
# This script helps you deploy your donation website to GitHub Pages

echo "🚀 Animal Heroes Donation Page - GitHub Pages Deployment"
echo "======================================================="

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install it first:"
    echo "   https://git-scm.com/"
    exit 1
fi

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
fi

# Get repository URL from user
echo ""
read -p "🔗 Enter your GitHub repository URL (e.g., https://github.com/username/repo.git): " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "❌ Repository URL cannot be empty!"
    exit 1
fi

echo ""
echo "🔧 Setting up deployment..."

# Add all files to git
echo "📁 Adding files to Git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Deploy Animal Heroes donation page to GitHub Pages"

# Add remote origin
echo "🔗 Adding remote origin..."
git remote remove origin 2>/dev/null || true
git remote add origin $REPO_URL

# Push to GitHub
echo "🚀 Pushing to GitHub..."
if git push -u origin main; then
    echo "✅ Push successful!"
elif git push -u origin master; then
    echo "✅ Push successful!"
else
    echo "❌ Push failed. Please check your repository URL and try again."
    echo "💡 Make sure:"
    echo "   - The repository exists on GitHub"
    echo "   - You have push access to the repository"
    echo "   - Your GitHub credentials are configured"
    exit 1
fi

echo ""
echo "🎉 Your code is now on GitHub!"
echo ""
echo "📋 Next steps:"
echo "1. Go to your repository on GitHub: $REPO_URL"
echo "2. Click 'Settings' tab"
echo "3. Scroll down to 'Pages' section"
echo "4. Under 'Source', select 'GitHub Actions'"
echo "5. Your site will be available at:"
echo "   https://$(echo $REPO_URL | sed 's/.*github.com\///' | sed 's/\.git$//' | sed 's/.*\///')"
echo ""
echo "⏱️  It may take 5-10 minutes for the site to be available."
echo ""
echo "🔄 For future updates, run:"
echo "   git add ."
echo "   git commit -m 'Update website'"
echo "   git push origin main"
echo ""
echo "🌐 To open your repository:"
echo "   gh repo view --web"
echo "   (if you have GitHub CLI installed)"


