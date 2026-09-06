---
title: "Privacy Policy — DoneAt"
description: "How DoneAt stores data locally by default, offers optional private iCloud sync on iPhone and iPad, and handles analytics and third-party services."
heading: "Privacy Policy"
intro: "This page explains how DoneAt stores and processes information: the official site, the web timer, and the apps on iPhone, iPad, Mac and Windows."
updatedLabel: "Last updated"
updated: "6 September 2026"
---

## Data stored by DoneAt

Information you enter is stored locally by default: in the browser’s local storage on the web timer, and in the application’s data on iPhone, iPad, Mac and Windows. DoneAt does not provide product accounts or send this information to DoneAt servers.

On iPhone and iPad, you can choose to turn on iCloud sync. It stores your schedules, records, salary, reminder preferences, appearance, language, life profile and Focus data in your private iCloud database under your Apple Account. Notification authorization, biometric protection, Live Activity settings, the current work timer and onboarding state stay on each device. The web timer, Mac app and Windows app remain local and are not part of this sync.

The countdown, progress and earnings estimate are calculated on your device from this information.

This typically includes:

- Start and end times, workdays, and break or overtime settings
- Salary amount, pay period and career salary history
- Work records and corrections, career stages, and life milestones or dates you choose to enter
- Focus task titles, plans, sessions and rest settings
- Notification and reminder preferences
- Language and appearance

## Optional iCloud sync

Sync is off by default. When you enable it on iPhone or iPad, Apple’s CloudKit service stores the data described above in the private database associated with your Apple Account. DoneAt does not receive a copy on its own servers. Devices using the same Apple Account can recover and sync that data; this requires an available iCloud account and a network connection.

Enabling sync requires DoneAt Plus. Sync that is already enabled continues after a subscription expires. Turning sync off stops synchronization on that device and keeps both its current local copy and the existing iCloud copy. Turning it off does not delete either copy.

## Backup exports

On iPhone and iPad, a backup export is created only when you choose Export. A full backup includes your records, synced settings, salary and career salary history, life profile, and Focus tasks and sessions. You can also export without the life profile; that option still includes salary and career history. The system share sheet then lets you choose where to save or share the file.

The export is a readable JSON file, not a password-protected archive. Choose a storage location and recipients appropriate for the information it contains. Files you save or share are separate copies; deleting data in DoneAt does not delete those files.

## Plus purchases

On iPhone and iPad, Apple handles Plus subscriptions and lifetime purchases through the App Store. DoneAt uses StoreKit to verify purchase status and restore access, and keeps a local record of the verified entitlement and any expiry date. DoneAt does not receive your payment card details or send your purchase status to a DoneAt account server. Apple processes purchase information under its own policies.

A subscription expiring does not delete your existing records. Export and deletion remain available without an active subscription.

## Official site

[doneat.app](https://doneat.app) is a static website. It does not collect your shift or salary. Opening the site root, or a short path such as `/privacy` or `/download`, follows your browser language and sends you to that hall or to the English or Simplified Chinese support page. Language stays in the page URL; this site does not set a language cookie.

To host the pages, Vercel may process ordinary connection information such as an IP address and browser identifier under its own privacy policy. This project does not store that information or use it to create a profile of you.

The official site uses Vercel’s cookieless analytics to measure page views and loading performance, and a small set of aggregate counters to see which entries people use. Events come from a fixed, public list — for example `hall_view`, `download_view`, `web_timer_open`, or `app_store_open` — and are incremented by day. The request carries only the event name. It does not include a user identifier, session, language, schedule, or salary, and cannot be used to identify or track a person.

The complete event list is in this repository at [`src/lib/analytics-events.ts`](https://github.com/ififi2017/doneat.app/blob/main/src/lib/analytics-events.ts).

## Web timer analytics

The web timer at [off.rainif.com](https://off.rainif.com) also uses Vercel’s cookieless analytics to measure page views and loading performance. It uses a separate, limited set of aggregate counters to understand overall feature usage.

Product events come from another fixed, public list, such as `share_open` or `countdown_start`, and are aggregated by day. They do not contain user identifiers, session information, schedules or salary data and cannot be used to identify or track an individual.

The complete product event list is available in the product’s open-source repository. Hosting and analytics providers may process standard connection information under their respective privacy policies. This project does not separately store that information or use it to create user profiles.

## Cookies

The web timer uses a cookie named `i18nextLng` to store a language code so that later visits can open in the language you chose. It is set on the first visit from the language currently displayed, updates when you change languages, expires after one year, and can be removed in your browser.

Neither the official site nor the web timer uses advertising or cross-site tracking cookies. The analytics described above do not rely on cookies.

## Sharing a countdown

The URL of a share link contains only the start and end times. It does not contain salary information. A person who opens the link can view only the shift times. Countdown share images also omit salary. A backup export is different: it can contain salary and the other personal data listed above.

If you choose to share through a third-party social service, that service’s privacy policy applies.

## Apps on your phone and computer

The iPhone, iPad, Mac and Windows apps do not collect usage analytics.

A desktop build installed from GitHub checks for a newer release when it starts. The request contains no account, salary or usage data, and an installer is downloaded only after you confirm an update. If GitHub cannot be reached directly, you may choose to retry through a third-party mirror. Updates downloaded through either channel are signature-checked before installation.

A build installed from the Microsoft Store does not initiate update checks. Updates are provided by the Microsoft Store.

Reminders are scheduled and displayed locally by the operating system. The apps also access the network when you open an external link or choose to share through a third-party service.

## Widgets, Live Activities and device protection

Widgets and Live Activities use the information needed to show your timer and progress, including Focus information where applicable. They do not include salary. Local notifications also omit salary. These surfaces may be visible on your Home Screen or Lock Screen; you can manage their visibility and notification permissions in the app and system settings.

When DoneAt asks you to authenticate to protect earnings or records, authentication is handled by the device through Face ID, Touch ID or its passcode. DoneAt receives the authentication result, not your biometric data or passcode. This protection is configured separately on each device.

## Third-party services

DoneAt uses the following services to host pages, measure the official site and the web timer, distribute apps and open links you choose:

- Vercel — hosting of the official site and the web timer; page-view and performance measurement on both
- Upstash — storage of daily aggregate event counts for the official site and the web timer
- GitHub — source code, release information, and update checks for GitHub-distributed desktop builds
- Apple — app distribution, Plus payments and purchase verification through the App Store and StoreKit, and private iCloud sync when you choose to enable it on iPhone or iPad
- Microsoft — distribution and updates for the Microsoft Store listing you open
- A third-party download mirror, used only when you choose it from a GitHub-distributed desktop build
- The third-party social service you choose when sharing a countdown

## Deleting your data

On the web timer, clear this site’s data in your browser, including local storage and the language cookie. On Mac or Windows, uninstall the app and delete its data.

On iPhone and iPad, uninstalling removes the data stored on that device. If you enabled iCloud sync, the private iCloud copy remains available to your other devices. Delete from iCloud in DoneAt’s Records & Data settings deletes the iCloud copy and clears the associated synced records on devices signed in to that Apple Account when they next sync. Removing records only from this device leaves the iCloud copy available to restore. Backup files you previously exported must be deleted separately from the places where you saved or shared them.

DoneAt cannot access your Apple Account or delete its private iCloud data on your behalf. DoneAt also cannot access or delete your local data from a server.

## Changes to this policy

When this policy is updated, the last-updated date at the top of the page will also be revised. Material changes will be listed in the release notes, and previous versions are available in the open-source repository’s commit history.

## Contact us

Questions about this policy, or about how information is handled, go to [hello@doneat.app](mailto:hello@doneat.app). Product issues and suggestions may also be submitted through [GitHub Issues](https://github.com/ififi2017/Off-Work-Countdown/issues).

If you identify a difference between this policy and the product’s actual behavior, write to that address or open an issue.
