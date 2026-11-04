# RD AI LABS
# WEBSITE DEPLOYMENT & MAINTENANCE GUIDE

**Project:** RD AI Labs Official Website  
**Version:** 1.0  
**Last updated:** November 2026

## 1. Project information

| Item | Details |
|---|---|
| Website | https://rdailabs.com |
| WWW website | https://www.rdailabs.com |
| GitHub repository | https://github.com/rd-ai-labs/RD-AI-LABS-website |
| Production branch | `main` |
| Frontend | React + Vite |
| Hosting | Cloudflare |
| Domain registrar | GoDaddy |

## 2. Initial project setup

Install Node.js (LTS), Git and Visual Studio Code.

Clone the repository:

```bash
git clone https://github.com/rd-ai-labs/RD-AI-LABS-website.git
cd RD-AI-LABS-website
```

If the repository contains `package-lock.json`, install the exact dependencies:

```bash
npm ci
```

Start the local development server:

```bash
npm run dev
```

Open the local URL shown in the terminal (usually `http://localhost:5173`).

## 3. Website update and GitHub workflow

Before starting work, get the latest code:

```bash
git checkout main
git pull origin main
```

Make the required changes and test them locally:

```bash
npm run dev
npm run build
```

If the build fails, fix the errors before publishing.

Stage and commit your changes:

```bash
git add .
git commit -m "Describe the website update"
```

For a direct push (only if authorized):

```bash
git push origin main
```

**Recommended team workflow:** Create a feature branch, push it and open a pull request. Have another developer review and approve it before merging into `main`.

```bash
git checkout -b feature/describe-update
git add .
git commit -m "Describe the website update"
git push -u origin feature/describe-update
```

## 4. Cloudflare deployment

Cloudflare dashboard: https://dash.cloudflare.com/

The RD AI Labs website is hosted on Cloudflare. **The current deployment integration must be verified before relying on automatic deployment.**

### Verify the configuration

1. Sign in to Cloudflare using an authorized company account.
2. Open **Workers & Pages** and select the RD AI Labs website project.
3. Open the project settings and find its build/deployment configuration.
4. Verify the connected GitHub repository and production branch.

Expected settings for a standard React + Vite project (confirm against the actual project):

| Setting | Expected value |
|---|---|
| GitHub repository | `rd-ai-labs/RD-AI-LABS-website` |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` if the app is at the repository root |

### If GitHub automatic deployment is enabled

1. Merge approved changes into `main`.
2. Cloudflare should start a production deployment.
3. Open the project's **Deployments** section.
4. Check that the latest production deployment succeeds.
5. Visit https://rdailabs.com and test the updated website.

If GitHub integration is not enabled, follow the existing authorized manual deployment procedure. Do not assume the deployment method or upload files until the current setup has been confirmed.

## 5. Domain and DNS management

The domain is registered with GoDaddy and the website is hosted on Cloudflare.

Domains to verify:

- https://rdailabs.com
- https://www.rdailabs.com

When investigating a domain issue:

1. Check the domain status and nameservers in GoDaddy.
2. Identify which provider is authoritative for DNS.
3. Check the relevant DNS records at that provider.
4. Check that both domains are configured under the Cloudflare Pages project's custom domains, if Pages is being used.
5. Check domain verification and SSL/TLS status.
6. Test both URLs.

**DNS precautions:**

- Do not change nameservers or delete DNS records without authorization.
- Preserve MX and other email-related records.
- Record existing DNS values before making an approved change.
- Do not copy DNS values from unrelated tutorials or projects.

## 6. Common deployment problems

### Build failed

1. Open the failed deployment in Cloudflare.
2. Read the build logs and identify the specific error.
3. Reproduce and fix the issue locally.
4. Run `npm ci` (if using `package-lock.json`) and `npm run build`.
5. Commit and push the fix through the team's approved workflow.

### Website shows old content

1. Check that the latest production deployment succeeded.
2. Confirm the correct branch and commit were deployed.
3. Hard-refresh with `Ctrl + Shift + R`.
4. Test in a private/incognito browser window.

### 522 connection timeout

A 522 indicates that Cloudflare timed out connecting to an origin server. First confirm the site's hosting architecture. For a Cloudflare Pages site, check the Pages deployment, custom-domain configuration and DNS routing. If another origin server is involved, check its availability and firewall rules. Do not randomly change DNS records.

### WWW domain is not working

1. Confirm `www.rdailabs.com` is configured as a custom domain where required.
2. Verify its DNS record at the authoritative DNS provider.
3. Check domain verification and SSL/TLS status.
4. Test both the root and WWW domains.

### Blank page or route returns 404

1. Open browser Developer Tools (`F12`).
2. Check the Console and Network tabs for JavaScript or asset-loading errors.
3. Review the Cloudflare build logs.
4. Check Vite asset paths and the `base` configuration.
5. If the site is a single-page application and direct route visits fail, verify whether a Cloudflare Pages fallback rule is needed before changing routing configuration.

## 7. Rollback – restore a previous version

If a deployment causes a serious production issue:

1. Notify the responsible team member.
2. Open the project in Cloudflare.
3. Open **Deployments** and identify the last known-good production deployment.
4. Check whether the project supports rollback or redeployment of that deployment.
5. Follow the available Cloudflare procedure and verify the live website.

Alternatively, revert the problematic Git commit through the team's approved review process:

```bash
git checkout main
git pull origin main
git revert COMMIT_ID
```

Replace `COMMIT_ID` with the actual commit ID. Push or merge the revert using the approved workflow. If Git integration is enabled, the resulting production-branch update should trigger a new deployment.

Do not force-push or reset the shared production branch as a routine rollback method.

## 8. Add a new developer

### GitHub

1. An organization owner or authorized administrator opens https://github.com/rd-ai-labs.
2. Open organization **Settings** and find **People/Members**.
3. Invite the developer using their GitHub username or email.
4. Grant only the permissions needed for their role.
5. Have the developer accept the invitation.
6. Confirm they can access `rd-ai-labs/RD-AI-LABS-website`.

Suggested access levels:

| Role | Suggested repository permission |
|---|---|
| Developer | Write |
| Technical lead | Maintain |
| Repository administrator | Admin |

Use the organization's actual team and permission policies.

### Cloudflare

If the developer needs deployment or DNS responsibilities, an authorized Cloudflare administrator must invite them separately and assign the minimum required permissions. GitHub access does not automatically grant Cloudflare access.

## 9. Security rules

- Use individual company-approved accounts; never share passwords.
- Enable two-factor authentication.
- Never commit `.env` files, passwords, API secrets or recovery codes.
- Do not put private API keys in frontend code or `VITE_` variables; Vite exposes those values to the browser.
- Store required deployment secrets only in approved secure settings.
- Do not modify production DNS or delete production resources without authorization.

## 10. Final deployment checklist

Before an update is considered complete:

- [ ] Changes tested locally.
- [ ] `npm run build` succeeds.
- [ ] Changes committed and reviewed according to team policy.
- [ ] Approved changes merged into `main`.
- [ ] Cloudflare production deployment succeeds.
- [ ] Correct commit is deployed.
- [ ] `https://rdailabs.com` works.
- [ ] `https://www.rdailabs.com` works.
- [ ] Main website features and mobile layout are checked.

---

## Project handover details to maintain

| Item | Current information |
|---|---|
| Project | RD AI Labs Official Website |
| Repository | `rd-ai-labs/RD-AI-LABS-website` |
| Production branch | `main` |
| Framework | React + Vite |
| Hosting | Cloudflare |
| Domain registrar | GoDaddy |
| Deployment integration | **To be verified in Cloudflare** |
| Cloudflare project name | To be recorded by the technical owner |
| Authoritative DNS provider | To be verified |
| Technical owner | RD AI Labs Development Team |

**Do not store passwords, API secrets, recovery codes or private tokens in this document.**

**Document owner:** RD AI Labs Development Team  
**Review:** Update this guide whenever the project, hosting, domain or deployment workflow changes.

**RD AI LABS – TAP THE UNTAPPED**
