---
title: "About — DoneAt"
description: "About DoneAt, a local-first work-shift countdown for the browser, iPhone, iPad, Android, Mac and Windows."
heading: "About DoneAt"
intro: "A local-first shift timer you can leave open. No DoneAt account, no ads, and optional private iCloud sync on iPhone and iPad."
---

## Why this project exists

Remaining time, progress, and optional earnings are easier to hold when they sit in one calm place. DoneAt is that utility.

You can [start in the browser](https://off.rainif.com/en), or keep it on a phone or computer from the [download](/en/download) page.

Off Work Countdown is now DoneAt. The countdown is the same; only the name on the door is shorter.

## On iPhone and iPad in 3.2.0

The countdown, scheduling and the Apple Watch app are free:

- Build and review your schedule on one monthly calendar, with fixed weekdays, alternating weeks, shift rotations, free scheduling or manual timing.
- Choose a country or region in Work Hours & Schedule and your schedule follows its public holidays and makeup workdays. If you updated from an earlier version, turn holidays on there once.
- Check your shift and clock-out countdown on Apple Watch. The Watch app is free and does not need DoneAt Plus.

DoneAt also helps you look back at your work and plan time for what comes next:

- Explore weekly and monthly records, tap a time segment for details, or double-tap a day for a closer look. The last seven days are free; DoneAt Plus adds older records, the yearly view and editing past days.
- With Plus, add life milestones and career stages to see work in context, including past estimates and your current work stage.
- With Plus, plan tasks and use the focus timer with work and rest sessions.
- On a new device, quick setup can bring back records already synced to your own iCloud.

These features are part of the native iPhone and iPad app. The [download page](/en/download) explains the options for each platform.

## On Android

The Android app on [Google Play](https://play.google.com/store/apps/details?id=com.rainif.doneat) follows the same schedule rules as iPhone. The countdown, scheduling and public holidays are free:

- Plan on one monthly calendar with fixed weekdays, alternating weeks, rotations and overnight shifts, or paint shifts onto a free schedule with a tap or a swipe.
- Choose a country or region in Hours & schedule and your schedule follows its public holidays.
- Check the time left from a home-screen widget or the ongoing notification, without opening the app.
- Look back on the last seven days of records, try three time-off searches, and import or export your data for free. DoneAt Plus adds older records, the Year and Life views, reports, Focus, unlimited time-off searches and shift alarms.

Android keeps your data on the phone. iCloud sync is not part of the Android app; Android’s own backup can include records and settings if you have it turned on, and a backup export moves your records between iPhone and Android.

## Where your data goes

Working hours, workdays, salary and preferences stay on the device you are using by default. The countdown and earnings estimate are computed there. On iPhone and iPad, you can choose to sync schedules, records, salary and settings across your devices. Optional iCloud sync uses your private iCloud. DoneAt cannot read it. Mac, Windows and the web timer remain local. These work settings are not sent to DoneAt servers.

The Android app is available on [Google Play](https://play.google.com/store/apps/details?id=com.rainif.doneat), which handles its Plus purchases. In builds with server verification enabled, DoneAt’s purchase-verification service on Cloudflare checks purchase status and exact expiry with Google. It processes purchase tokens and stores their hashes with entitlement state. Salary and work records stay outside this service. See the [privacy policy](/en/privacy) for purchase verification, system backups and deletion.

In Android versions with review access enabled, an authorized reviewer may enter a reusable code for temporary Plus access without a purchase or DoneAt account. This optional service collects a random installation public key and authentication metadata, keeps installation sessions for seven days after the last renewal, and does not link them to Play orders or receive salary, schedules or work records. Each authorization lasts at most 24 hours. See [optional Android review access](/en/privacy#optional-android-review-access) for the information processed, renewal, revocation and deletion.

The official site and the web timer record page views, loading performance, and a small set of aggregate events. An event carries only a name, never your schedule, salary, account, or advertising identifier. Hosting and analytics providers may still receive ordinary connection metadata such as an IP address and user agent, as they do on any website. The [privacy](/en/privacy) page has the details.

Day-to-day use does not need a DoneAt account. A GitHub desktop build asks GitHub on launch whether a newer release exists; that request carries no account, salary, or usage data, and an installer downloads only after you choose to update. A Microsoft Store build does not check for updates itself.

Opening an external link or a sharing service reaches that destination on its own terms. Native reminders are scheduled by the operating system. For local and synced data removal, see the privacy policy; on iPhone and iPad, synced data can be removed separately from Records & Data settings.

## Important limits

Salary and time totals are estimates for personal reference. They are not payroll records, and they are not legal, tax, employment, or financial advice. Reminders should not be used for safety-critical or legally required timing.

The software is provided under the [MPL-2.0](https://github.com/ififi2017/Off-Work-Countdown/blob/main/LICENSING.md) licence, as is and without warranty, to the extent permitted by law. The licence text in the repository is the controlling legal notice.

## Free countdown, optional Plus

The countdown stays free. On iPhone and iPad, DoneAt Plus adds full records, life views and focus tools, with monthly, yearly or lifetime purchase options through the App Store. On Android, the same options are bought through Google Play. Purchases do not carry over between the App Store and Google Play. Prices and any available trial are shown before purchase in the app.

Turning on iCloud sync requires Plus. Once enabled, sync continues after a subscription expires. Your existing records remain stored, and export and deletion remain available without an active subscription.

## Open source

The project is released under the [MPL-2.0](https://github.com/ififi2017/Off-Work-Countdown/blob/main/LICENSING.md) licence. You can inspect the code or build your own version from the public [GitHub repository](https://github.com/ififi2017/Off-Work-Countdown).

Historical MIT permissions remain valid. Brand and artwork permissions are separate; third-party components retain their own licenses. [Brand guidelines](https://github.com/ififi2017/Off-Work-Countdown/blob/main/TRADEMARKS.md)

The holiday templates include national-calendar data generated with [Vacanza Holidays 0.83](https://github.com/vacanza/holidays) and mainland China public-holiday and makeup-workday data from [holiday-cn](https://github.com/NateScarlet/holiday-cn). Both sources are available under the MIT licence:

- Vacanza Holidays: Copyright © Vacanza Team and individual contributors, dr-prodigy (2017–2023), and ryanss (2014–2017). [Read the complete licence](/licenses/vacanza-holidays-0.83.txt).
- holiday-cn: Copyright © 2019 NateScarlet. [Read the complete licence](/licenses/holiday-cn.txt).

### Android liquid glass

The Android app uses [Backdrop (AndroidLiquidGlass) 2.0.1](https://github.com/Kyant0/AndroidLiquidGlass) by Kyant, with [Shapes 1.2.1](https://github.com/Kyant0/Shapes), to draw glass blur, refraction and shapes on the device. DoneAt’s bottom navigation adapts the project’s `LiquidBottomTabs` example for its own navigation, dragging, accessibility, right-to-left layouts and reduced-motion behavior.

Both libraries are distributed under Apache License 2.0. Their complete licence texts are available here: [Backdrop](/licenses/backdrop-2.0.1.txt) and [Shapes](/licenses/shapes-1.2.1.txt), and in the Android app under Settings → About → Acknowledgements. These rendering libraries do not send app content or device identifiers to their authors.

## Feedback

Write to [hello@doneat.app](mailto:hello@doneat.app), or open a [GitHub Issue](https://github.com/ififi2017/Off-Work-Countdown/issues).
