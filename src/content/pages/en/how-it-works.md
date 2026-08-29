---
title: "How it works — DoneAt"
description: "How DoneAt handles overnight shifts, and how the hourly figure is derived from a monthly salary using 21.75 working days."
heading: "How it works"
intro: "The arithmetic behind the countdown, the progress bar and the earnings figure, so you can tell whether the numbers match your own contract."
---

## Defining a shift

A shift is a start time and an end time. When you start the countdown, both are anchored to today and the timer runs to the end of that shift.

If the end time is earlier than the start time, the shift crosses midnight. A 22:00 to 06:00 shift opened at 01:00 belongs to the evening that has already begun, not to a new one starting tonight, so the remaining time is five hours rather than twenty-nine.

## The progress bar

Progress is the share of the shift that has already passed, measured against its full length rather than against a fixed eight hours. A six-hour shift and a twelve-hour shift both read 50% at the halfway point.

The value stays between 0 and 100, so arriving early or staying late never pushes the bar outside its range.

## Turning a monthly salary into a daily rate

If you enter a monthly salary, it is converted to a daily rate before it is spread across the shift. The default divisor is 21.75 working days per month.

That number is not arbitrary. A year has 365 days, of which 104 fall on weekends, leaving 261 working days. Divided across twelve months, that is exactly 21.75. It is the monthly salary base prescribed by regulation in mainland China. If you are employed somewhere else, or your contract counts differently, treat it as a starting point rather than a rule — your own contract is what decides.

If your contract counts differently, for example a six-day week or a four-day week, change the working days per month and every figure updates. Entering a daily salary skips this step.

## Earnings during the shift

The amount shown is the daily rate multiplied by the proportion of the shift completed, updated once a second. At the halfway point you have earned half the daily rate; when the countdown reaches zero the full amount is shown.

This is a straight-line estimate. It does not model overtime multipliers, unpaid breaks, bonuses, tax or social insurance, so treat it as a sense of progress rather than a payslip.

## Where your data lives

Your hours, salary and preferences are stored on the device you are using. They are never transmitted to a server, so they are not synchronised between your phone and your computer. Clearing the app or browser data erases them.

Because everything is computed locally, DoneAt also works with no connection once it has been loaded or installed.
