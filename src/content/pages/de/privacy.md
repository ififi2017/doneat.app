---
title: "Datenschutzrichtlinie — DoneAt"
description: "Wie DoneAt Daten standardmäßig lokal speichert, optionale private iCloud-Synchronisierung auf iPhone und iPad bietet sowie Analysen und Drittanbieterdienste handhabt."
heading: "Datenschutzrichtlinie"
intro: "Diese Seite erklärt, wie DoneAt Informationen speichert und verarbeitet: die offizielle Website, den Web-Timer und die Apps auf iPhone, iPad, Mac und Windows."
updatedLabel: "Letzte Aktualisierung"
updated: "6. September 2026"
---

## Von DoneAt gespeicherte Daten

Eingegebene Informationen werden standardmäßig lokal gespeichert: im Local Storage des Browsers beim Web-Timer und in den App-Daten auf iPhone, iPad, Mac und Windows. DoneAt bietet keine Produktkonten und sendet diese Informationen nicht an DoneAt-Server.

Auf iPhone und iPad kannst du die iCloud-Synchronisierung aktivieren. Sie speichert Zeitpläne, Aufzeichnungen, Gehalt, Erinnerungseinstellungen, Darstellung, Sprache, Lebensprofil und Fokus-Daten in deiner privaten iCloud unter deinem Apple-Account. Benachrichtigungseinstellungen, biometrischer Schutz, Live-Aktivitäts-Einstellungen, der aktuelle Arbeitstimer und der Onboarding-Status bleiben auf jedem Gerät. Der Web-Timer, die Mac-App und die Windows-App bleiben lokal und sind nicht Teil dieser Synchronisierung.

Countdown, Fortschritt und Verdienstschätzung werden auf deinem Gerät aus diesen Informationen berechnet.

Typischerweise umfasst das:

- Start- und Endzeiten, Arbeitstage sowie Pausen- oder Überstundeneinstellungen
- Gehaltsbetrag, Zahlungszeitraum und Gehaltshistorie
- Arbeitsaufzeichnungen und Korrekturen, Karrierephasen und Lebensmeilensteine oder Daten, die du eingibst
- Fokus-Aufgabentitel, Pläne, Sitzungen und Pauseneinstellungen
- Benachrichtigungs- und Erinnerungseinstellungen
- Sprache und Darstellung

## Optionale iCloud-Synchronisierung

Die Synchronisierung ist standardmäßig aus. Wenn du sie auf iPhone oder iPad aktivierst, speichert Apples CloudKit-Dienst die oben beschriebenen Daten in der privaten Datenbank deines Apple-Accounts. DoneAt erhält keine Kopie auf eigenen Servern. Geräte mit demselben Apple-Account können diese Daten wiederherstellen und synchronisieren; das erfordert einen verfügbaren iCloud-Account und eine Netzwerkverbindung.

Die Aktivierung der Synchronisierung erfordert DoneAt Plus. Bereits aktivierte Synchronisierung läuft nach Ablauf eines Abonnements weiter. Das Deaktivieren stoppt die Synchronisierung auf diesem Gerät und behält sowohl die lokale Kopie als auch die iCloud-Kopie. Das Deaktivieren löscht keine der beiden Kopien.

## Backup-Exporte

Auf iPhone und iPad wird ein Backup-Export nur erstellt, wenn du „Exportieren" wählst. Ein vollständiges Backup enthält deine Aufzeichnungen, synchronisierte Einstellungen, Gehalt und Gehaltshistorie, Lebensprofil sowie Fokus-Aufgaben und -Sitzungen. Du kannst auch ohne Lebensprofil exportieren; diese Option enthält dennoch Gehalt und Gehaltshistorie. Das System-Sharesheet lässt dich dann wählen, wo du die Datei speicherst oder teilst.

Der Export ist eine lesbare JSON-Datei, kein passwortgeschütztes Archiv. Wähle einen Speicherort und Empfänger, die zu den enthaltenen Informationen passen. Gespeicherte oder geteilte Dateien sind separate Kopien; das Löschen von Daten in DoneAt löscht diese Dateien nicht.

## Plus-Käufe

Auf iPhone und iPad wickelt Apple Plus-Abonnements und Einmalkäufe über den App Store ab. DoneAt nutzt StoreKit, um den Kaufstatus zu verifizieren und den Zugang wiederherzustellen, und speichert lokal einen Nachweis des verifizierten Anspruchs und ein eventuelles Ablaufdatum. DoneAt erhält keine Kartendaten und sendet den Kaufstatus nicht an einen DoneAt-Kontoserver. Apple verarbeitet Kaufinformationen nach eigenen Richtlinien.

Ein ablaufendes Abonnement löscht keine vorhandenen Aufzeichnungen. Export und Löschung bleiben ohne aktives Abonnement verfügbar.

## Offizielle Website

[doneat.app](https://doneat.app) ist eine statische Website. Sie erfasst keine Schicht- oder Gehaltsdaten. Das Öffnen des Stammverzeichnisses oder eines kurzen Pfads wie `/privacy` oder `/download` folgt der Browsersprache und leitet zur jeweiligen Sprachhalle oder zur englischen bzw. chinesischen Support-Seite. Die Sprache steht in der URL; diese Website setzt keinen Sprach-Cookie.

Zum Hosten der Seiten kann Vercel gewöhnliche Verbindungsinformationen wie IP-Adresse und Browser-Kennung nach eigener Datenschutzrichtlinie verarbeiten. Dieses Projekt speichert diese Informationen nicht und erstellt daraus kein Profil.

Die offizielle Website nutzt Vercels cookielose Analyse zur Messung von Seitenaufrufen und Ladezeiten sowie wenige aggregierte Zähler, um zu sehen, welche Einträge genutzt werden. Ereignisse stammen aus einer festen, öffentlichen Liste – z. B. `hall_view`, `download_view`, `download_from_web`, `web_timer_open` oder `app_store_open` – und werden tageweise erhöht. Die Anfrage enthält nur den Ereignisnamen. Sie enthält keine Nutzerkennung, Sitzung, Sprache, Zeitplan oder Gehalt und kann nicht zur Identifikation oder Verfolgung einer Person verwendet werden.

Die vollständige Ereignisliste befindet sich in diesem Repository unter [`src/lib/analytics-events.ts`](https://github.com/ififi2017/doneat.app/blob/main/src/lib/analytics-events.ts).

## Web-Timer-Analyse

Der Web-Timer unter [off.rainif.com](https://off.rainif.com) nutzt ebenfalls Vercels cookielose Analyse für Seitenaufrufe und Ladezeiten. Er verwendet ein separates, begrenztes Set aggregierter Zähler, um die allgemeine Funktionsnutzung zu verstehen.

Produkt-Ereignisse stammen aus einer anderen festen, öffentlichen Liste, z. B. `share_open` oder `countdown_start`, und werden tageweise aggregiert. Sie enthalten keine Nutzerkennungen, Sitzungsinformationen, Zeitpläne oder Gehaltsdaten und können nicht zur Identifikation oder Verfolgung einer Person verwendet werden.

Die vollständige Produkt-Ereignisliste ist im Open-Source-Repository des Produkts verfügbar. Hosting- und Analyseanbieter können Standard-Verbindungsinformationen nach eigenen Datenschutzrichtlinien verarbeiten. Dieses Projekt speichert diese Informationen nicht separat und erstellt daraus keine Nutzerprofile.

## Cookies

Der Web-Timer verwendet ein Cookie namens `i18nextLng`, um einen Sprachcode zu speichern, damit spätere Besuche in der gewählten Sprache öffnen. Es wird beim ersten Besuch mit der angezeigten Sprache gesetzt, aktualisiert sich beim Sprachwechsel, läuft nach einem Jahr ab und kann im Browser gelöscht werden.

Weder die offizielle Website noch der Web-Timer verwenden Werbe- oder Cross-Site-Tracking-Cookies. Die oben beschriebene Analyse beruht nicht auf Cookies.

## Einen Countdown teilen

Die URL eines Teilen-Links enthält nur Start- und Endzeit. Sie enthält keine Gehaltsinformationen. Wer den Link öffnet, sieht nur die Schichtzeiten. Countdown-Teilbilder zeigen ebenfalls kein Gehalt. Ein Backup-Export ist anders: Er kann Gehalt und die anderen oben aufgeführten personenbezogenen Daten enthalten.

Wenn du dich entscheidest, über einen Drittanbieter-Social-Dienst zu teilen, gilt dessen Datenschutzrichtlinie.

## Apps auf Smartphone und Computer

Die iPhone-, iPad-, Mac- und Windows-Apps erfassen keine Nutzungsanalysen.

Ein von GitHub installierter Desktop-Build prüft beim Start, ob eine neuere Version vorliegt. Die Anfrage enthält kein Konto, Gehalt oder Nutzungsdaten, und ein Installer wird erst nach Bestätigung heruntergeladen. Wenn GitHub nicht direkt erreichbar ist, kannst du einen Drittanbieter-Mirror wählen. Updates von beiden Kanälen werden vor der Installation signaturgeprüft.

Ein aus dem Microsoft Store installierter Build initiiert keine Update-Prüfungen. Updates werden vom Microsoft Store bereitgestellt.

Erinnerungen werden lokal vom Betriebssystem geplant und angezeigt. Die Apps greifen auch auf das Netzwerk zu, wenn du einen externen Link öffnest oder über einen Drittanbieterdienst teilst.

## Widgets, Live-Aktivitäten und Geräteschutz

Widgets und Live-Aktivitäten nutzen die Informationen, die zur Anzeige von Timer und Fortschritt nötig sind, einschließlich Fokus-Informationen, wo zutreffend. Sie enthalten kein Gehalt. Lokale Benachrichtigungen zeigen ebenfalls kein Gehalt. Diese Oberflächen können auf dem Home- oder Sperrbildschirm sichtbar sein; du kannst ihre Sichtbarkeit und Benachrichtigungsberechtigungen in den App- und Systemeinstellungen verwalten.

Wenn DoneAt zur Authentifizierung auffordert, um Verdienst oder Aufzeichnungen zu schützen, erfolgt die Authentifizierung durch das Gerät über Face ID, Touch ID oder den Gerätecode. DoneAt erhält das Authentifizierungsergebnis, nicht deine biometrischen Daten oder den Code. Dieser Schutz wird auf jedem Gerät separat konfiguriert.

## Drittanbieterdienste

DoneAt nutzt folgende Dienste zum Hosten von Seiten, zur Messung der offiziellen Website und des Web-Timers, zur App-Verteilung und zum Öffnen gewählter Links:

- Vercel – Hosting der offiziellen Website und des Web-Timers; Seitenaufruf- und Leistungsmessung auf beiden
- Upstash – Speicherung täglicher aggregierter Ereigniszähler für die offizielle Website und den Web-Timer
- GitHub – Quellcode, Release-Informationen und Update-Prüfungen für GitHub-verteilte Desktop-Builds
- Apple – App-Verteilung, Plus-Zahlungen und Kaufverifizierung über App Store und StoreKit sowie private iCloud-Synchronisierung, wenn du sie auf iPhone oder iPad aktivierst
- Microsoft – Verteilung und Updates für den Microsoft-Store-Eintrag, den du öffnest
- Ein Drittanbieter-Download-Mirror, nur verwendet, wenn du ihn aus einem GitHub-verteilten Desktop-Build wählst
- Der Drittanbieter-Social-Dienst, den du beim Teilen eines Countdowns wählst

## Deine Daten löschen

Lösche im Web-Timer die Daten dieser Website in deinem Browser, einschließlich Local Storage und Sprach-Cookie. Auf Mac oder Windows deinstalliere die App und lösche ihre Daten.

Auf iPhone und iPad entfernt die Deinstallation die auf diesem Gerät gespeicherten Daten. Wenn du die iCloud-Synchronisierung aktiviert hattest, bleibt die private iCloud-Kopie für deine anderen Geräte verfügbar. „Aus iCloud löschen" in den DoneAt-Einstellungen unter „Aufzeichnungen und Daten" löscht die iCloud-Kopie und entfernt die zugehörigen synchronisierten Aufzeichnungen auf Geräten, die mit diesem Apple-Account angemeldet sind, beim nächsten Sync. „Nur von diesem Gerät entfernen" lässt die iCloud-Kopie zur Wiederherstellung verfügbar. Zuvor exportierte Backup-Dateien müssen separat von den Orten gelöscht werden, an denen du sie gespeichert oder geteilt hast.

DoneAt kann nicht auf deinen Apple-Account zugreifen oder dessen private iCloud-Daten in deinem Namen löschen. DoneAt kann auch deine lokalen Daten nicht von einem Server aus aufrufen oder löschen.

## Änderungen an dieser Richtlinie

Bei Aktualisierungen dieser Richtlinie wird auch das Datum „Letzte Aktualisierung" oben auf der Seite angepasst. Wesentliche Änderungen werden in den Release Notes aufgeführt, und frühere Versionen sind im Commit-Verlauf des Open-Source-Repositories verfügbar.

## Kontakt

Fragen zu dieser Richtlinie oder zur Datenverarbeitung gehen an [hello@doneat.app](mailto:hello@doneat.app). Produktprobleme und Vorschläge können auch über [GitHub Issues](https://github.com/ififi2017/Off-Work-Countdown/issues) eingereicht werden.

Wenn du einen Unterschied zwischen dieser Richtlinie und dem tatsächlichen Produktverhalten feststellst, schreib an diese Adresse oder eröffne ein Issue.
