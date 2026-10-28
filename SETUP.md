# Publish Flavour Atlas without a Mac

GitHub builds the app on Apple computers in the cloud, signs it, and uploads it with the listing and screenshots. You do a few one-time setup steps, then publishing is a button press.

**Cost:** the Apple Developer Program is US$99 a year. GitHub's cloud Macs are free when the repository is **public**, which means anyone can see the code. A private repository works too, but it uses up GitHub's free monthly minutes quickly.

---

## 1. Join the Apple Developer Program (do this first)

1. Go to developer.apple.com/programs and click **Enroll**. Sign in with your Apple ID.
2. Choose **Individual**, or **Organization** if you want a company name on the listing (that needs a D-U-N-S number).
3. Pay the fee. Approval usually takes 24–48 hours, and you'll get an email.
4. Once approved, open developer.apple.com/account › **Membership details** and copy your **Team ID** (10 characters, e.g. `A1B2C3D4E5`).

## 2. Put the project on GitHub

1. Make a free account at github.com.
2. Click **+** › **New repository**. Name it `flavour-atlas`, choose **Public**, leave everything else empty, and click **Create repository**.
3. Connect GitHub to Claude and tell me the repository name, and I'll upload the project for you.

## 3. Turn on the support website

In the repository on github.com:

1. **Settings › Pages** › under *Build and deployment*, set **Source** to **GitHub Actions**.
2. **Settings › Secrets and variables › Actions › Variables** tab › **New repository variable**. Name it `SUPPORT_EMAIL` and set it to the email you want customers to use.
3. **Actions** tab › **Support and privacy website** › **Run workflow**.

Your pages will be live at `https://YOUR-GITHUB-NAME.github.io/flavour-atlas/` and `.../privacy.html`.

## 4. Give GitHub permission to upload to the App Store

In **App Store Connect** (appstoreconnect.apple.com):

1. **Users and Access › Integrations › App Store Connect API** › **Team Keys** › **+**.
2. Name it `GitHub`, set access to **Admin** (needed so Apple can sign the app in the cloud), then click **Generate**.
3. Copy the **Issuer ID** (at the top) and the **Key ID**, then click **Download** to get the `.p8` file. Apple only lets you download it once, so keep it safe.

In GitHub, go to **Settings › Secrets and variables › Actions › Secrets** › **New repository secret** and add these four:

| Name | Value |
| --- | --- |
| `APPLE_TEAM_ID` | Team ID from step 1 |
| `ASC_KEY_ID` | Key ID |
| `ASC_ISSUER_ID` | Issuer ID |
| `ASC_KEY_P8` | Open the .p8 file in TextEdit and paste everything, including the BEGIN and END lines |

## 5. Register the app with Apple (one time)

1. developer.apple.com/account › **Identifiers** › **+** › **App IDs** › **App** › Continue.
2. Description: `Flavour Atlas`. Bundle ID: **Explicit**, `com.maneksingh.flavouratlas`. Click Continue, then Register.
3. appstoreconnect.apple.com › **Apps** › **+** › **New App**:
   - Platform: iOS
   - Name: Flavour Atlas (if it's taken, try one of the backups in `store/listing.md`)
   - Primary language: **English (Canada)**
   - Bundle ID: pick `com.maneksingh.flavouratlas`
   - SKU: `flavouratlas001`

## 6. Build and upload

GitHub › **Actions** › **Build and upload to App Store** › **Run workflow** (keep the defaults) › **Run workflow**.

It takes about 15–25 minutes. A green tick means it worked. About 15–30 minutes after that, the build shows up in App Store Connect under **TestFlight**, where you can install it on your iPhone through Apple's TestFlight app and try it.

## 7. Finish the listing and submit (first time only)

In App Store Connect, open the app:

- **App Privacy** › Get Started › choose **No, we do not collect data** › Publish.
- **Pricing and Availability** › Free (or set a price) and pick your countries.
- **Age Rating** › answer None or No to every question.
- On the **1.0** version page: under *Build*, click **+** and pick your build. Fill in *App Review Information* (your name, phone, email) and check *Sign-in required* is off.
- The text and screenshots were already uploaded by step 6. Check that they look right.

Then click **Add for Review** › **Submit**. You can also run the workflow again and choose **submit latest build for review**.

Review usually takes 1–3 days, and Apple emails you when the app is live.

---

## Updating the app later

1. Change the app in `src/index.html`, or ask me to.
2. Run **Build and upload to App Store**, setting **version** to the next number (1.1, 1.2…).
3. In App Store Connect, add a short "What's New" note, pick the new build and submit.

## If a run fails

Open the failed run, click the red step, and send me a screenshot of the error. Common causes:
- **Missing repository secrets:** one of the four secrets in step 4 is missing or misspelled.
- **No suitable application records:** step 5 isn't done yet, or the bundle ID doesn't match.
- **Signing or permission errors:** the API key needs **Admin** access.
