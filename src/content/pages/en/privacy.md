---
title: "Privacy Policy — DoneAt"
description: "How DoneAt stores data on your device, and how the official site and web timer handle hosting, analytics and third-party services."
heading: "Privacy Policy"
intro: "This page explains how DoneAt stores and processes information: the official site, the web timer, and the apps on iPhone, iPad, Mac and Windows."
updatedLabel: "Last updated"
updated: "29 August 2026"
---

## Data stored on your device

Information you enter is stored locally: in the browser’s local storage on the web timer, and in the application’s data on iPhone, iPad, Mac and Windows. It is not uploaded to our servers or associated with a user account, because DoneAt does not provide accounts.

The countdown, progress and earnings estimate are calculated on your device from this information.

This typically includes:

- Start and end times, workdays, and break or overtime settings
- Salary amount and pay period
- Notification and reminder preferences
- Language and appearance

## Official site

[doneat.app](https://doneat.app) is a static website. It does not collect your shift or salary. Opening the site root follows your browser language and sends you to that hall. Language stays in the page URL; this site does not set a language cookie.

To host the pages, Vercel may process ordinary connection information such as an IP address and browser identifier under its own privacy policy. This project does not store that information or use it to create a profile of you.

## Web timer analytics

The web timer at [off.rainif.com](https://off.rainif.com) uses Vercel’s cookieless analytics to measure page views and loading performance. It also uses a limited set of aggregate counters to understand overall feature usage.

Product events come from a fixed, public list, such as `share_open` or `countdown_start`, and are aggregated by day. They do not contain user identifiers, session information, schedules or salary data and cannot be used to identify or track an individual.

The complete event list is available in the open-source repository. Hosting and analytics providers may process standard connection information under their respective privacy policies. This project does not separately store that information or use it to create user profiles.

## Cookies

The web timer uses a cookie named `i18nextLng` to store a language code so that later visits can open in the language you chose. It is set on the first visit from the language currently displayed, updates when you change languages, expires after one year, and can be removed in your browser.

Neither the official site nor the web timer uses advertising or cross-site tracking cookies. The analytics described above do not rely on cookies.

## Sharing a countdown

The URL of a share link contains only the start and end times. It does not contain salary information. A person who opens the link can view only the shift times.

If you choose to share through a third-party social service, that service’s privacy policy applies.

## Apps on your phone and computer

The iPhone, iPad, Mac and Windows apps do not collect usage analytics.

A desktop build installed from GitHub checks for a newer release when it starts. The request contains no account, salary or usage data, and an installer is downloaded only after you confirm an update. If GitHub cannot be reached directly, you may choose to retry through a third-party mirror. Updates downloaded through either channel are signature-checked before installation.

A build installed from the Microsoft Store does not initiate update checks. Updates are provided by the Microsoft Store.

Reminders are scheduled and displayed locally by the operating system. The apps also access the network when you open an external link or choose to share through a third-party service.

## Third-party services

DoneAt uses the following services to host pages, measure the web timer, distribute apps and open links you choose:

- Vercel — hosting of the official site and the web timer; page-view and performance measurement on the web timer
- Upstash — storage of aggregate product event counts for the web timer
- GitHub — source code, release information, and update checks for GitHub-distributed desktop builds
- Apple — distribution of the App Store listing you open
- Microsoft — distribution and updates for the Microsoft Store listing you open
- A third-party download mirror, used only when you choose it from a GitHub-distributed desktop build
- The third-party social service you choose when sharing a countdown

## Deleting local data

On the web timer, clear this site’s data in your browser, including local storage and the language cookie. On a phone or computer, uninstall the app and delete its data.

Because this local data is not transmitted to our servers, we cannot access or delete it on the server on your behalf.

## Changes to this policy

When this policy is updated, the last-updated date at the top of the page will also be revised. Material changes will be listed in the release notes, and previous versions are available in the open-source repository’s commit history.

## Contact us

Questions about this policy, or about how information is handled, go to [hello@doneat.app](mailto:hello@doneat.app). Product issues and suggestions may also be submitted through [GitHub Issues](https://github.com/ififi2017/Off-Work-Countdown/issues).

If you identify a difference between this policy and the product’s actual behavior, write to that address or open an issue.
