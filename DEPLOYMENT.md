# Vercel Deployment Guide

## 🚀 Deploy PPF Calculator to Vercel

This guide will help you deploy your PPF Calculator Flask application to Vercel.

### Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Git Repository**: Your code should be in a Git repository (GitHub, GitLab, or Bitbucket)
3. **Vercel CLI** (Optional): Install with `npm i -g vercel`

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: PPF Calculator"
   git remote add origin YOUR_REPOSITORY_URL
   git push -u origin main
   ```

2. **Import in Vercel**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your repository
   - Vercel will automatically detect it's a Python project

3. **Configure Settings**
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty
   - **Install Command**: `pip install -r requirements.txt`

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be available at `https://your-project-name.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Configuration Files

The following files are already configured for Vercel deployment:

#### `vercel.json`
```json
{
  "version": 2,
  "builds": [
    {
      "src": "app.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "dest": "/static/$1"
    },
    {
      "src": "/(.*)",
      "dest": "app.py"
    }
  ],
  "functions": {
    "app.py": {
      "includeFiles": "templates/**"
    }
  }
}
```

#### `requirements.txt`
```
Flask==2.3.3
Werkzeug==2.3.7
Jinja2==3.1.2
MarkupSafe==2.1.3
itsdangerous==2.1.2
click==8.1.7
```

### Environment Variables

If you need to set environment variables:

1. **Via Vercel Dashboard**
   - Go to Project Settings
   - Navigate to "Environment Variables"
   - Add your variables

2. **Via Vercel CLI**
   ```bash
   vercel env add VARIABLE_NAME
   ```

### Custom Domain (Optional)

1. **Add Domain**
   - Go to Project Settings in Vercel Dashboard
   - Navigate to "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

### Troubleshooting

#### Common Issues

1. **Build Failures**
   - Check if all dependencies are in `requirements.txt`
   - Ensure Python version compatibility

2. **Template Not Found**
   - Verify `templates/` directory structure
   - Check `vercel.json` includes templates

3. **Static Files Not Loading**
   - Ensure static files are in `static/` directory
   - Check static file routes in `vercel.json`

4. **Import Errors**
   - Make sure all imports are available in the deployment environment
   - Check for relative imports that might break

#### Logs and Debugging

1. **View Deployment Logs**
   - In Vercel Dashboard: Go to Deployments → Click on deployment → View logs
   - Via CLI: `vercel logs`

2. **Runtime Logs**
   - Check Function logs in Vercel Dashboard
   - Use `print()` statements for debugging (they appear in logs)

### Performance Optimization

1. **Cold Starts**
   - Vercel functions have cold starts
   - First request might be slower

2. **Static Asset Optimization**
   - Use CDN for external libraries (Chart.js is already via CDN)
   - Optimize images and CSS

### Security Considerations

1. **Environment Variables**
   - Use environment variables for sensitive data
   - Never commit secrets to repository

2. **HTTPS**
   - Vercel provides HTTPS by default
   - All traffic is encrypted

### Monitoring

1. **Analytics**
   - Enable Vercel Analytics in project settings
   - Monitor traffic and performance

2. **Uptime Monitoring**
   - Use external services like UptimeRobot
   - Set up alerts for downtime

### Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- **Support**: [vercel.com/support](https://vercel.com/support)

---

## 📋 Deployment Checklist

- [ ] Code pushed to Git repository
- [ ] `vercel.json` configured
- [ ] `requirements.txt` updated
- [ ] Static files in `static/` directory
- [ ] Templates in `templates/` directory
- [ ] Environment variables set (if needed)
- [ ] Domain configured (if using custom domain)
- [ ] Deployment tested and working
- [ ] Analytics enabled (optional)
- [ ] Monitoring set up (optional)

Your PPF Calculator is now ready for production! 🎉 