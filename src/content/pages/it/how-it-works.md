---
title: "Come funziona — DoneAt"
description: "Come DoneAt gestisce i turni notturni e come la tariffa oraria deriva da uno stipendio mensile usando 21,75 giorni lavorativi."
heading: "Come funziona"
intro: "L'aritmetica dietro il conto alla rovescia, la barra di avanzamento e la cifra dei guadagni, così puoi verificare se i numeri corrispondono al tuo contratto."
---

## Definire un turno

Un turno è un orario di inizio e un orario di fine. Quando avvii il conto alla rovescia, entrambi sono ancorati a oggi e il timer corre fino alla fine di quel turno.

Se l'orario di fine è prima dell'orario di inizio, il turno attraversa la mezzanotte. Un turno dalle 22:00 alle 06:00 aperto all'01:00 appartiene alla sera già iniziata, non a una nuova che inizia stanotte, quindi il tempo rimanente è cinque ore invece di ventinove.

## La barra di avanzamento

L'avanzamento è la parte del turno già trascorsa, misurata sulla sua durata totale invece che su otto ore fisse. Un turno di sei ore e uno di dodici ore leggono entrambi 50% a metà.

Il valore resta tra 0 e 100, quindi arrivare presto o restare tardi non spinge mai la barra fuori dal suo intervallo.

## Convertire uno stipendio mensile in tariffa giornaliera

Se inserisci uno stipendio mensile, viene convertito in una tariffa giornaliera prima di essere distribuito sul turno. Il divisore predefinito è 21,75 giorni lavorativi al mese.

Quel numero non è arbitrario. Un anno ha 365 giorni, di cui 104 cadono nel weekend, lasciando 261 giorni lavorativi. Diviso per dodici mesi, fa esattamente 21,75. È la base salariale mensile prescritta dalla normativa in Cina continentale. Se lavori altrove, o il tuo contratto conta diversamente, trattalo come punto di partenza piuttosto che come regola — il tuo contratto è ciò che decide.

Se il tuo contratto conta diversamente, ad esempio una settimana di sei giorni o di quattro giorni, cambia i giorni lavorativi al mese e tutte le cifre si aggiornano. Inserire uno stipendio giornaliero salta questo passaggio.

## Guadagni durante il turno

L'importo mostrato è la tariffa giornaliera moltiplicata per la proporzione di turno completata, aggiornata ogni secondo. A metà hai guadagnato metà della tariffa giornaliera; quando il conto alla rovescia raggiunge zero viene mostrato l'importo completo.

Questa è una stima lineare. Non modella moltiplicatori per straordinari, pause non pagate, bonus, tasse o previdenza sociale, quindi trattala come una sensazione di progresso piuttosto che come una busta paga.

## Dove risiedono i tuoi dati

I tuoi orari, stipendio e preferenze sono memorizzati sul dispositivo che stai usando di default. Su iPhone e iPad puoi sincronizzarli tramite il tuo database privato iCloud. Mac, Windows e il timer web restano locali e non si uniscono a quella sincronizzazione. DoneAt non invia questi dati ai propri server.

Poiché il conto alla rovescia e la stima dei guadagni sono calcolati localmente, DoneAt funziona anche senza connessione una volta caricato o installato. Cancellare i dati locali rimuove la copia di quel dispositivo; se la sincronizzazione iCloud è attiva, usa le impostazioni Record e dati per rimuovere la copia sincronizzata separatamente.
