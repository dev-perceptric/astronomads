# Deploy to Hostinger

Astronomads runs as a Hostinger **Node.js web app** (Next.js with a server, for city search). It needs the **Business** web hosting plan or a Cloud plan. Premium and Single plans can't run it.

## First deploy

1. In hPanel: **Websites → Add Website → Node.js web app**.
2. **Connect with GitHub**, pick `dev-perceptric/astronomads`, and set **Branch** to the branch you want live.
3. Check the settings Hostinger fills in:
   - Framework: **Next.js**
   - Node version: **22** (20 or newer is required; `package.json` asks for 20+)
   - Build command: `npm run build`
   - Output directory: `.next`
   - Hostinger turns on Next.js standalone mode itself and starts the server. Nothing to add.
4. Environment variables: none needed today.
5. **Deploy**. The build takes about 1 to 2 minutes (the limit is 15).
6. Open the temporary address Hostinger gives you and check: the home page, drawing a chart, city search, and the Today page.

## Your domain

1. Point the domain at Hostinger: set Hostinger's nameservers at your registrar (simplest), or add A records for `@` and `www` to the hosting IP shown in hPanel. Changes can take up to 24 to 48 hours.
2. Attach the domain to the Node.js app in hPanel.
3. **Security → SSL → Install SSL** (free, renews by itself), then turn on **Force HTTPS**.

## After that

- Every push to the connected branch rebuilds and redeploys by itself.
- Build logs for the last 10 builds are in the app's dashboard.
- Apps sleep after a while with no visitors, so the first visit after a quiet spell is slower while it wakes.

## Checked before deploying

The app was built and run in standalone mode, the same way Hostinger runs it: the home and chart pages load, and city search and city lookup by ID answer from the bundled GeoNames data.
