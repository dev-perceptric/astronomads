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
4. Environment variables: none needed to run the site. Accounts need the ones below.
5. **Deploy**. The build takes about 1 to 2 minutes (the limit is 15).
6. Open the temporary address Hostinger gives you and check: the home page, drawing a chart, city search, and the Today page.

## Your domain

1. Point the domain at Hostinger: set Hostinger's nameservers at your registrar (simplest), or add A records for `@` and `www` to the hosting IP shown in hPanel. Changes can take up to 24 to 48 hours.
2. Attach the domain to the Node.js app in hPanel.
3. **Security → SSL → Install SSL** (free, renews by itself), then turn on **Force HTTPS**.

## Turn on accounts

Accounts (sign in, up to 200 saved birth profiles) need a MySQL database. The site runs without one, and the account page shows "Accounts open soon" until it is set up.

1. hPanel → **Databases → MySQL Databases**: create a database and a user. Note the database name, user name and password.
2. Open the Node.js app's dashboard → **Environment variables** and add:
   - `DB_HOST` = `127.0.0.1` (use this, not `localhost`)
   - `DB_PORT` = `3306`
   - `DB_NAME`, `DB_USER`, `DB_PASSWORD` = the values from step 1

   Or one `DATABASE_URL` = `mysql://USER:PASSWORD@127.0.0.1:3306/NAME` in place of the five.
3. For password reset emails: hPanel → **Emails**, create a mailbox such as `hello@astronomads.com`, then add:
   - `SMTP_HOST` = `smtp.hostinger.com`
   - `SMTP_PORT` = `465`
   - `SMTP_USER` = the mailbox address
   - `SMTP_PASS` = the mailbox password
   - `MAIL_FROM` = `Astronomads <hello@astronomads.com>` (optional)
   - `SITE_URL` = `https://astronomads.com` (the reset links point here)
4. Redeploy (or restart the app). The tables are created by themselves on the first request.
5. Check: open `/account`, create an account, add a profile, sign out and back in. Then use "Forgot your password?" and confirm the email arrives.

## After that

- Every push to the connected branch rebuilds and redeploys by itself.
- Build logs for the last 10 builds are in the app's dashboard.
- Apps sleep after a while with no visitors, so the first visit after a quiet spell is slower while it wakes.

## Checked before deploying

The app was built and run in standalone mode, the same way Hostinger runs it: the home and chart pages load, and city search and city lookup by ID answer from the bundled GeoNames data.
