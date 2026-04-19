# HRPRO Static Website

A multi-page static website for **hrpro.co.in**, built with **HTML, CSS, and JavaScript**.

## Pages Included

- `index.html` - Home
- `about.html` - About
- `services.html` - Services
- `expertise.html` - Expertise areas
- `industries.html` - Industries served
- `team.html` - Key resources / expert panel
- `contact.html` - Contact form

## Deploying on GitHub

1. Create a GitHub repository.
2. Upload all files from this folder to the repository root.
3. Go to **Settings > Pages**.
4. Under **Build and deployment**, choose:
   - **Source:** Deploy from a branch
   - **Branch:** `main` (or your default branch) and `/root`
5. Save. GitHub Pages will publish the site.

## Connect Contact Form to Google Sheets

This project is static, so form submissions are designed to go to a **Google Apps Script Web App**.

### Step 1: Create the Google Sheet

Create a Google Sheet with this header row in the first sheet:

`submittedAt | name | company | email | phone | service | industry | message`

### Step 2: Create Apps Script

In Google Sheets:
1. Click **Extensions > Apps Script**
2. Replace the default code with the contents of `google-apps-script.js`
3. Save the project

### Step 3: Deploy the script

1. Click **Deploy > New deployment**
2. Choose **Web app**
3. Execute as: **Me**
4. Who has access: **Anyone**
5. Deploy and copy the web app URL

### Step 4: Add the endpoint to the site

Open `contact.html` and replace:

`PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE`

with your deployed Apps Script web app URL.

## Notes

- The brief included one incomplete item: **"Lead ??"**. That was intentionally omitted from the live-facing site until the final profile is confirmed.
- You can later add logo files, brand colors, domain-specific contact details, and testimonials.
