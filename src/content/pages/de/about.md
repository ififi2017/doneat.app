---
title: "Über — DoneAt"
description: "Über DoneAt, einen lokalen Schicht-Countdown für Browser, iPhone, iPad, Mac und Windows."
heading: "Über DoneAt"
intro: "Ein lokaler Schicht-Timer, den du offen lassen kannst. Kein DoneAt-Konto, keine Werbung und optional private iCloud-Synchronisierung auf iPhone und iPad."
---

## Warum es dieses Projekt gibt

Restzeit, Fortschritt und optionaler Verdienst lassen sich besser verfolgen, wenn sie an einem ruhigen Ort zu finden sind. DoneAt ist dieses Werkzeug.

Du kannst [im Browser starten](https://off.rainif.com/de) oder die App auf Smartphone oder Computer von der [Download-Seite](/de/download) holen.

Off Work Countdown heißt jetzt DoneAt. Der Countdown ist derselbe; nur der Name an der Tür ist kürzer.

## Auf iPhone und iPad in 3.2.0

Der Countdown, die Planung und die Apple-Watch-App sind kostenlos:

- Plane und überprüfe deinen Zeitplan in einem Monatskalender – mit festen Wochentagen, Wechselwochen, Schichtrotation, freier Eingabe oder manuellem Timing.
- Wähle unter „Arbeitszeiten und Zeitplan" ein Land oder eine Region, und die App übernimmt Feiertage und Nachholarbeitstage. Bei einem Update von einer älteren Version einmal dort aktivieren.
- Sieh deinen Schicht-Countdown auf der Apple Watch. Die Watch-App ist kostenlos und braucht kein DoneAt Plus.

DoneAt hilft dir auch, deine Arbeit rückblickend zu betrachten und Zeit für das Kommende zu planen:

- Durchsuche Wochen- und Monatsübersichten, tippe auf ein Zeitfenster für Details oder doppeltippe auf einen Tag für mehr. Die letzten sieben Tage sind kostenlos; DoneAt Plus fügt ältere Aufzeichnungen, die Jahresansicht und das Bearbeiten vergangener Tage hinzu.
- Mit Plus fügst du Lebensmeilensteine und Karrierephasen hinzu, um Arbeit im Kontext zu sehen – inklusive früherer Schätzungen und deiner aktuellen Arbeitsphase.
- Mit Plus planst du Aufgaben und nutzt den Fokus-Timer mit Arbeits- und Pauseneinheiten.
- Auf einem neuen Gerät kann die Schnelleinrichtung bereits synchronisierte Daten aus deiner eigenen iCloud wiederherstellen.

Diese Funktionen gehören zur nativen iPhone- und iPad-App. Die [Download-Seite](/de/download) erklärt die Optionen je Plattform.

## Wo deine Daten liegen

Arbeitszeiten, Arbeitstage, Gehalt und Einstellungen bleiben standardmäßig auf dem verwendeten Gerät. Der Countdown und der geschätzte Verdienst werden dort berechnet. Auf iPhone und iPad kannst du Zeitpläne, Aufzeichnungen, Gehalt und Einstellungen geräteübergreifend synchronisieren. Die optionale iCloud-Synchronisierung nutzt deine private iCloud – DoneAt kann sie nicht lesen. Mac, Windows und der Web-Timer bleiben lokal. Diese Arbeitseinstellungen werden nicht an DoneAt-Server gesendet.

Die offizielle Website und der Web-Timer zeichnen Seitenaufrufe, Ladezeiten und wenige aggregierte Ereignisse auf. Ein Ereignis trägt nur einen Namen, niemals Zeitplan, Gehalt, Konto oder Werbe-ID. Hosting- und Analyseanbieter können dennoch Verbindungsmetadaten wie IP-Adresse und User-Agent erhalten, wie bei jeder Website. Details stehen auf der [Datenschutz](/de/privacy)-Seite.

Ein DoneAt-Konto ist im Alltag nicht nötig. Ein GitHub-Desktop-Build fragt beim Start, ob eine neuere Version vorliegt; diese Anfrage enthält kein Konto, Gehalt oder Nutzungsdaten, und ein Installer wird erst nach Bestätigung heruntergeladen. Ein Microsoft-Store-Build prüft nicht selbst auf Updates.

Ein externer Link oder ein Teilen-Dienst führt zu dessen eigenem Nutzungsbereich. Erinnerungen werden lokal vom Betriebssystem geplant. Zum Entfernen lokaler und synchronisierter Daten siehe die Datenschutzrichtlinie; auf iPhone und iPad können synchronisierte Daten in den Einstellungen unter „Aufzeichnungen und Daten" separat entfernt werden.

## Wichtige Einschränkungen

Gehalt und Zeitangaben sind Schätzungen zur persönlichen Orientierung. Sie sind keine Lohnabrechnungen und keine Rechts-, Steuer-, Arbeits- oder Finanzberatung. Erinnerungen sollten nicht für sicherheitskritische oder gesetzlich vorgeschriebene Abläufe verwendet werden.

Die Software wird unter der MIT-Lizenz so wie sie ist und ohne Gewähr bereitgestellt, soweit gesetzlich zulässig. Der Lizenztext im Repository ist der maßgebliche rechtliche Hinweis.

## Kostenloser Countdown, optionales Plus

Der Countdown bleibt kostenlos. Auf iPhone und iPad fügt DoneAt Plus vollständige Aufzeichnungen, Lebensansichten und Fokus-Tools hinzu, mit monatlichen, jährlichen oder einmaligen Kaufoptionen über den App Store. Preise und eine eventuelle Testphase werden vor dem Kauf in der App angezeigt.

Das Einschalten der iCloud-Synchronisierung erfordert Plus. Einmal aktiviert, läuft die Synchronisierung nach Ablauf eines Abonnements weiter. Vorhandene Aufzeichnungen bleiben gespeichert, Export und Löschung sind auch ohne aktives Abo verfügbar.

## Open Source

Das Projekt steht unter der MIT-Lizenz. Du kannst den Code einsehen oder eine eigene Version vom öffentlichen [GitHub-Repository](https://github.com/ififi2017/Off-Work-Countdown) bauen.

Die Feiertagsvorlagen enthalten Kalendertagsdaten, generiert mit [Vacanza Holidays 0.83](https://github.com/vacanza/holidays), sowie Feiertags- und Nachholarbeitstage für Festlandchina von [holiday-cn](https://github.com/NateScarlet/holiday-cn). Beide Quellen stehen unter der MIT-Lizenz:

- Vacanza Holidays: Copyright © Vacanza Team und einzelne Mitwirkende, dr-prodigy (2017–2023) und ryanss (2014–2017). [Lizenz lesen](/licenses/vacanza-holidays-0.83.txt).
- holiday-cn: Copyright © 2019 NateScarlet. [Lizenz lesen](/licenses/holiday-cn.txt).

## Android

Android befindet sich in der Testphase. Käufe werden über Google Play abgewickelt. Bei aktivierter Serverprüfung verarbeitet DoneAt auf Cloudflare Kauftokens und speichert deren Hashes mit dem Berechtigungsstatus; Gehalt und Arbeitsaufzeichnungen werden nicht übertragen. Einzelheiten zu Prüfung, Sicherungen und Löschung stehen in der [Datenschutzerklärung](/de/privacy#android).

Die Android-Navigation verwendet [Backdrop (AndroidLiquidGlass) 2.0.1](https://github.com/Kyant0/AndroidLiquidGlass) von Kyant und [Shapes 1.2.1](https://github.com/Kyant0/Shapes). DoneAt hat das Beispiel `LiquidBottomTabs` für Navigation, Ziehen, Barrierefreiheit, Rechts-nach-links-Darstellung und reduzierte Bewegung angepasst. Die Effekte werden lokal gezeichnet; App-Inhalte und Gerätekennungen werden nicht an die Autoren gesendet. Beide Bibliotheken stehen unter Apache License 2.0: [Backdrop-Lizenz](/licenses/backdrop-2.0.1.txt), [Shapes-Lizenz](/licenses/shapes-1.2.1.txt). Die vollständigen Texte sind auch unter Einstellungen → Über → Danksagungen enthalten.

## Feedback

Schreib an [hello@doneat.app](mailto:hello@doneat.app) oder erstelle ein [GitHub Issue](https://github.com/ififi2017/Off-Work-Countdown/issues).
