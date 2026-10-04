---
title: "Informativa sulla privacy — DoneAt"
description: "Come DoneAt memorizza i dati localmente di default, offre sincronizzazione privata opzionale iCloud su iPhone e iPad, e gestisce analisi e servizi di terze parti."
heading: "Informativa sulla privacy"
intro: "Questa pagina spiega come DoneAt memorizza ed elabora le informazioni: il sito ufficiale, il timer web e le app su iPhone, iPad, Mac e Windows."
updatedLabel: "Ultimo aggiornamento"
updated: "6 settembre 2026"
---

## Dati memorizzati da DoneAt

Le informazioni che inserisci vengono memorizzate localmente di default: nel local storage del browser sul timer web, e nei dati dell'applicazione su iPhone, iPad, Mac e Windows. DoneAt non fornisce account di prodotto né invia queste informazioni ai server DoneAt.

Su iPhone e iPad puoi attivare la sincronizzazione iCloud. Memorizza i tuoi programmi, record, stipendio, preferenze dei promemoria, aspetto, lingua, profilo di vita e dati di Concentrazione nel tuo database privato iCloud sotto il tuo Account Apple. L'autorizzazione alle notifiche, la protezione biometrica, le impostazioni delle Attività in tempo reale, il timer di lavoro corrente e lo stato di onboarding restano su ogni dispositivo. Il timer web, l'app Mac e l'app Windows restano locali e non fanno parte di questa sincronizzazione.

Il conto alla rovescia, il progresso e la stima dei guadagni vengono calcolati sul tuo dispositivo da queste informazioni.

Questo tipicamente include:

- Orari di inizio e fine, giorni lavorativi e impostazioni di pausa o straordinario
- Importo dello stipendio, periodo di pagamento e storico salariale
- Record di lavoro e correzioni, fasi di carriera e traguardi di vita o date che scegli di inserire
- Titoli delle attività di concentrazione, piani, sessioni e impostazioni di riposo
- Preferenze di notifica e promemoria
- Lingua e aspetto

## Sincronizzazione opzionale iCloud

La sincronizzazione è disattivata di default. Quando la attivi su iPhone o iPad, il servizio CloudKit di Apple memorizza i dati descritti sopra nel database privato associato al tuo Account Apple. DoneAt non riceve una copia sui propri server. I dispositivi che usano lo stesso Account Apple possono recuperare e sincronizzare quei dati; questo richiede un account iCloud disponibile e una connessione di rete.

Attivare la sincronizzazione richiede DoneAt Plus. La sincronizzazione già attivata continua dopo la scadenza di un abbonamento. Disattivare la sincronizzazione ferma la sincronizzazione su quel dispositivo e mantiene sia la sua copia locale corrente che la copia iCloud esistente. Disattivarla non elimina nessuna delle due copie.

## Esportazioni di backup

Su iPhone e iPad, un'esportazione di backup viene creata solo quando scegli Esporta. Un backup completo include i tuoi record, le impostazioni sincronizzate, lo stipendio e lo storico salariale, il profilo di vita, e le attività e sessioni di concentrazione. Puoi anche esportare senza il profilo di vita; quell'opzione include comunque stipendio e storico di carriera. Il foglio di condivisione di sistema ti permette di scegliere dove salvare o condividere il file.

L'esportazione è un file JSON leggibile, non un archivio protetto da password. Scegli una posizione di archiviazione e destinatari appropriati per le informazioni che contiene. I file che salvi o condividi sono copie separate; eliminare dati in DoneAt non elimina quei file.

## Acquisti Plus

Su iPhone e iPad, Apple gestisce gli abbonamenti Plus e gli acquisti a vita tramite l'App Store. DoneAt usa StoreKit per verificare lo stato di acquisto e ripristinare l'accesso, e mantiene un record locale del diritto verificato e di un'eventuale data di scadenza. DoneAt non riceve i dati della tua carta di pagamento né invia il tuo stato di acquisto a un server account DoneAt. Apple elabora le informazioni di acquisto secondo le proprie politiche.

La scadenza di un abbonamento non elimina i tuoi record esistenti. L'esportazione e l'eliminazione restano disponibili senza un abbonamento attivo.

## Sito ufficiale

[doneat.app](https://doneat.app) è un sito web statico. Non raccoglie il tuo turno o stipendio. Aprire la radice del sito, o un percorso breve come `/privacy` o `/download`, segue la lingua del tuo browser e ti invia a quell'atrio o alla pagina di supporto in inglese o cinese semplificato. La lingua resta nell'URL della pagina; questo sito non imposta un cookie di lingua.

Per ospitare le pagine, Vercel può elaborare informazioni di connessione ordinarie come indirizzo IP e identificatore del browser secondo la propria informativa sulla privacy. Questo progetto non memorizza quelle informazioni né le usa per creare un profilo su di te.

Il sito ufficiale usa le analisi senza cookie di Vercel per misurare visualizzazioni di pagina e prestazioni di caricamento, e un piccolo insieme di contatori aggregati per vedere quali voci usano le persone. Gli eventi provengono da una lista fissa e pubblica — ad esempio `hall_view`, `download_view`, `download_from_web`, `web_timer_open` o `app_store_open` — e vengono incrementati per giorno. La richiesta porta solo il nome dell'evento. Non include un identificatore utente, sessione, lingua, programma o stipendio, e non può essere usata per identificare o tracciare una persona.

La lista completa degli eventi è in questo repository in [`src/lib/analytics-events.ts`](https://github.com/ififi2017/doneat.app/blob/main/src/lib/analytics-events.ts).

## Analisi del timer web

Il timer web su [off.rainif.com](https://off.rainif.com) usa anch'esso le analisi senza cookie di Vercel per misurare visualizzazioni di pagina e prestazioni di caricamento. Usa un insieme separato e limitato di contatori aggregati per capire l'uso generale delle funzionalità.

Gli eventi di prodotto provengono da un'altra lista fissa e pubblica, come `share_open` o `countdown_start`, e vengono aggregati per giorno. Non contengono identificatori utente, informazioni di sessione, programmi o dati salariali e non possono essere usati per identificare o tracciare un individuo.

La lista completa degli eventi di prodotto è disponibile nel repository open source del prodotto. I provider di hosting e analisi possono elaborare informazioni di connessione standard secondo le rispettive informative sulla privacy. Questo progetto non memorizza separatamente quelle informazioni né le usa per creare profili utente.

## Cookie

Il timer web usa un cookie chiamato `i18nextLng` per memorizzare un codice lingua così che le visite successive possano aprirsi nella lingua che hai scelto. Viene impostato alla prima visita dalla lingua attualmente visualizzata, si aggiorna quando cambi lingua, scade dopo un anno e può essere rimosso nel tuo browser.

Né il sito ufficiale né il timer web usano cookie pubblicitari o di tracciamento cross-site. Le analisi descritte sopra non si basano su cookie.

## Condividere un conto alla rovescia

L'URL di un link di condivisione contiene solo gli orari di inizio e fine. Non contiene informazioni sullo stipendio. Una persona che apre il link può vedere solo gli orari del turno. Le immagini del conto alla rovescia condivise omettono anch'esse lo stipendio. Un'esportazione di backup è diversa: può contenere stipendio e gli altri dati personali elencati sopra.

Se scegli di condividere tramite un servizio social di terze parti, si applica l'informativa sulla privacy di quel servizio.

## App su telefono e computer

Le app iPhone, iPad, Mac e Windows non raccolgono analisi di utilizzo.

Una build desktop installata da GitHub controlla all'avvio se esiste una versione più recente. La richiesta non contiene account, stipendio o dati di utilizzo, e un installer viene scaricato solo dopo che confermi un aggiornamento. Se GitHub non è raggiungibile direttamente, puoi scegliere di riprovare tramite un mirror di terze parti. Gli aggiornamenti scaricati da entrambi i canali vengono verificati nella firma prima dell'installazione.

Una build installata da Microsoft Store non avvia controlli di aggiornamento. Gli aggiornamenti sono forniti da Microsoft Store.

I promemoria vengono programmati e visualizzati localmente dal sistema operativo. Le app accedono anche alla rete quando apri un link esterno o scegli di condividere tramite un servizio di terze parti.

## Widget, Attività in tempo reale e protezione del dispositivo

Widget e Attività in tempo reale usano le informazioni necessarie per mostrare il tuo timer e progresso, incluse le informazioni di Concentrazione dove applicabile. Non includono lo stipendio. Anche le notifiche locali omettono lo stipendio. Queste superfici possono essere visibili sulla tua schermata Home o di blocco; puoi gestire la loro visibilità e i permessi di notifica nelle impostazioni dell'app e del sistema.

Quando DoneAt ti chiede di autenticarti per proteggere guadagni o record, l'autenticazione viene gestita dal dispositivo tramite Face ID, Touch ID o il suo codice. DoneAt riceve il risultato dell'autenticazione, non i tuoi dati biometrici o codice. Questa protezione viene configurata separatamente su ogni dispositivo.

## Servizi di terze parti

DoneAt usa i seguenti servizi per ospitare pagine, misurare il sito ufficiale e il timer web, distribuire app e aprire link che scegli:

- Vercel — hosting del sito ufficiale e del timer web; misurazione di visualizzazioni di pagina e prestazioni su entrambi
- Upstash — archiviazione dei conteggi di eventi aggregati giornalieri per il sito ufficiale e il timer web
- GitHub — codice sorgente, informazioni sui rilasci e controlli di aggiornamento per build desktop distribuite da GitHub
- Apple — distribuzione app, pagamenti Plus e verifica acquisti tramite App Store e StoreKit, e sincronizzazione privata iCloud quando scegli di attivarla su iPhone o iPad
- Microsoft — distribuzione e aggiornamenti per l'inserzione Microsoft Store che apri
- Un mirror di download di terze parti, usato solo quando lo scegli da una build desktop distribuita da GitHub
- Il servizio social di terze parti che scegli quando condividi un conto alla rovescia

## Eliminare i tuoi dati

Sul timer web, cancella i dati di questo sito nel tuo browser, inclusi local storage e il cookie della lingua. Su Mac o Windows, disinstalla l'app ed elimina i suoi dati.

Su iPhone e iPad, la disinstallazione rimuove i dati memorizzati su quel dispositivo. Se hai attivato la sincronizzazione iCloud, la copia privata iCloud resta disponibile per gli altri tuoi dispositivi. Elimina da iCloud nelle impostazioni Record e dati di DoneAt elimina la copia iCloud e cancella i record sincronizzati associati sui dispositivi connessi a quell'Account Apple quando sincronizzano. Rimuovere i record solo da questo dispositivo lascia la copia iCloud disponibile per il ripristino. I file di backup che hai precedentemente esportato devono essere eliminati separatamente dai luoghi dove li hai salvati o condivisi.

DoneAt non può accedere al tuo Account Apple né eliminare i suoi dati privati iCloud per tuo conto. DoneAt non può nemmeno accedere o eliminare i tuoi dati locali da un server.

## Modifiche a questa informativa

Quando questa informativa viene aggiornata, verrà rivista anche la data di ultimo aggiornamento in cima alla pagina. Le modifiche sostanziali saranno elencate nelle note di rilascio, e le versioni precedenti sono disponibili nello storico dei commit del repository open source.

## Contattaci

Le domande su questa informativa, o su come vengono gestite le informazioni, vanno a [hello@doneat.app](mailto:hello@doneat.app). Problemi di prodotto e suggerimenti possono essere inviati anche tramite [GitHub Issues](https://github.com/ififi2017/Off-Work-Countdown/issues).

Se identifichi una differenza tra questa informativa e il comportamento effettivo del prodotto, scrivi a quell'indirizzo o apri un issue.
