# Flavour Atlas: iOS app

**No Mac? Read SETUP.md.** It publishes the app from GitHub's cloud Macs. The steps below are for building on your own Mac.

A flavour-pairing guide for chefs, packaged as a native iPhone app with Capacitor. All the content is built into the app, so it runs fully offline.

## What's in this folder

| Path | What it is |
| --- | --- |
| `src/index.html` | The whole app. Edit this file to change the app. |
| `src/privacy.html` | Privacy policy page to host for the App Store listing |
| `scripts/build.mjs` | Builds `www/` from `src/` with bundled fonts so the app works offline |
| `ios/` | The Xcode project (iPhone, portrait, iOS 15+) |
| `assets/` | Source images for the app icon and splash screen |
| `store/listing.md` | App Store text: name, subtitle, description, keywords, review notes |
| `store/screenshots/` | Five App Store screenshots at 1320 × 2868 |

Native features: local notifications (Daily spark), the iOS share sheet, haptics, and on-device storage that survives app updates. These matter for review because Apple rejects apps that are only a wrapped website (guideline 4.2).

## 1. What you need

- **A Mac with Xcode 26 or later.** Apple only accepts uploads built with Xcode 26 and the iOS 26 SDK. Install it from the Mac App Store.
- **Node.js 22 or later** from nodejs.org.
- **An Apple Developer Program membership,** US$99 a year (charged in your local currency), at developer.apple.com/programs. Enrol as an individual, or as an organisation (for example under Woodstock), which requires a D-U-N-S number. Approval can take a day or two.

## 2. Open the project

In Terminal, from this folder:

```
npm install
npm run ios
```

This builds the app, syncs it into the iOS project and opens Xcode. Xcode downloads the Capacitor packages on first open. That takes a minute or two.

## 3. Sign it and run it on your iPhone

1. In Xcode, select **App** in the left sidebar, then the **App** target, then **Signing & Capabilities**.
2. Turn on **Automatically manage signing** and pick your **Team** (your developer account).
3. The bundle ID is `com.maneksingh.flavouratlas`. You can change it here, but it has to be unique on the App Store and can't change after the first upload. If you do change it, update `appId` in `capacitor.config.json` to match.
4. Plug in your iPhone, choose it at the top of the window and press **Run** (▶). The first time, approve the developer on the phone under Settings › General › VPN & Device Management.

## 4. Test before you submit

- Turn on airplane mode: everything should still work.
- My book › Daily spark › On: allow notifications, then check that one arrives at the set time. To test sooner, change the time to the next hour.
- Add your own ingredient, add a pairing with a note, save a combo, then force-quit and reopen. Everything should still be there.
- Share a combo and a backup to check the share sheet.

## 5. Host the privacy policy

Apple needs a public privacy policy URL. First, replace `[YOUR SUPPORT EMAIL]` in `src/privacy.html`. Then put the page anywhere public, for example on your website, as a GitHub Pages site, or as a page on Woodstock's site.

## 6. Create the App Store listing

1. Go to appstoreconnect.apple.com › Apps › **+** › New App. Choose iOS, the name, primary language English (Canada or U.S.), your bundle ID, and any SKU (e.g. `flavouratlas001`).
2. Fill in the listing from `store/listing.md`, and upload the screenshots from `store/screenshots/` to the 6.9-inch iPhone slot.
3. **App Privacy:** choose "Data Not Collected".
4. **Pricing:** free, or set a price. You also need to complete Agreements, Tax and Banking if the app is paid.
5. **Age rating:** answer None throughout (4+).

## 7. Upload and submit

1. In Xcode, set the destination at the top to **Any iOS Device (arm64)**.
2. Choose **Product › Archive**. When it finishes, the Organizer opens.
3. Click **Distribute App › App Store Connect › Upload**.
4. After about 15–30 minutes, the build appears in App Store Connect under TestFlight. You can install it on your phone through the TestFlight app and test it there first.
5. On the version page, select the build, paste the **App Review notes** from `store/listing.md`, and click **Add for Review**, then **Submit**.

Review usually takes one to three days. If Apple asks questions, answer them in App Store Connect.

## Updating the app later

1. Edit `src/index.html`. Ingredients are the lines in the `RAW` block, in this format: `name|category|tastes|seasons|pairings (* = classic)|other names`.
2. Run `npm run sync`.
3. In Xcode, raise the **Version** (e.g. 1.1) or **Build** number, then archive and upload again.

To change the icon or splash, replace the files in `assets/` and run `npm run assets`.

## Android later

Run `npm install @capacitor/android && npx cap add android` to set this project up for Google Play as well.
