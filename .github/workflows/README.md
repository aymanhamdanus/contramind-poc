# GitHub Actions Workflows

This directory contains GitHub Actions workflows for automating CI/CD processes.

## Workflows

### 1. CI Workflow (`ci.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests targeting `main` or `develop` branches

**Features:**
- Tests on multiple Node.js versions (18.x, 20.x)
- Runs linter (`npm run lint`)
- Builds the application (`npm run build`)
- Uploads build artifacts for retention

**Note:** The linter step has `continue-on-error: true` since eslint is not currently configured in the project dependencies.

### 2. Vercel Deployment Workflow (`vercel-deploy.yml`)

**Triggers:**
- Push to `main` branch (production deployment)
- Pull requests (preview deployment)

**Features:**
- Automatically deploys to Vercel
- Production deployment for `main` branch
- Preview deployments for pull requests
- Builds the application before deployment

## Setup Instructions

### Vercel Deployment Setup

To enable automatic Vercel deployments, you need to add the following secrets to your GitHub repository:

1. **VERCEL_TOKEN**: Your Vercel authentication token
   - Go to Vercel → Settings → Tokens
   - Create a new token
   - Add it as a repository secret

2. **VERCEL_ORG_ID**: Your Vercel organization/team ID
   - Run `vercel whoami` or check your Vercel project settings
   - Add it as a repository secret

3. **VERCEL_PROJECT_ID**: Your Vercel project ID
   - Find this in your Vercel project settings
   - Add it as a repository secret

### Adding Secrets to GitHub

1. Go to your repository on GitHub
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add each of the three secrets mentioned above

### Optional: Adding Tests

Currently, the project doesn't have a test suite. To add tests:

1. Install a testing framework (e.g., Vitest, Jest)
2. Add test scripts to `package.json`
3. Update the CI workflow to include a test step

Example test script addition:
```json
"scripts": {
  "test": "vitest",
  "test:ci": "vitest run"
}
```

Then update `ci.yml` to include:
```yaml
- name: Run tests
  run: npm run test:ci
```

## Workflow Status

You can view the status of workflows in the "Actions" tab of your GitHub repository.
