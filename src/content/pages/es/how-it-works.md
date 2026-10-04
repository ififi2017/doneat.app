---
title: "Cómo funciona — DoneAt"
description: "Cómo DoneAt maneja los turnos nocturnos y cómo se deriva la tarifa horaria de un salario mensual usando 21,75 días laborables."
heading: "Cómo funciona"
intro: "La aritmética detrás de la cuenta regresiva, la barra de progreso y la cifra de ganancias, para que puedas verificar si los números coinciden con tu contrato."
---

## Definir un turno

Un turno es una hora de inicio y una hora de fin. Cuando inicias la cuenta regresiva, ambas se anclan a hoy y el temporizador corre hasta el final de ese turno.

Si la hora de fin es anterior a la de inicio, el turno cruza la medianoche. Un turno de 22:00 a 06:00 abierto a la 01:00 pertenece a la noche que ya comenzó, no a una nueva que empiece esta noche, así que el tiempo restante es cinco horas en lugar de veintinueve.

## La barra de progreso

El progreso es la parte del turno que ya ha pasado, medida contra su duración total en lugar de ocho horas fijas. Un turno de seis horas y uno de doce horas marcan 50% a la mitad.

El valor se mantiene entre 0 y 100, así que llegar temprano o quedarse tarde nunca empuja la barra fuera de su rango.

## Convertir un salario mensual en una tarifa diaria

Si introduces un salario mensual, se convierte a una tarifa diaria antes de distribuirse en el turno. El divisor por defecto es 21,75 días laborables al mes.

Ese número no es arbitrario. Un año tiene 365 días, de los cuales 104 caen en fin de semana, dejando 261 días laborables. Dividido entre doce meses, eso es exactamente 21,75. Es la base salarial mensual prescrita por regulación en China continental. Si trabajas en otro lugar, o tu contrato cuenta diferente, trátalo como un punto de partida más que como una regla: tu propio contrato es lo que decide.

Si tu contrato cuenta diferente, por ejemplo una semana de seis días o una de cuatro días, cambia los días laborables por mes y todas las cifras se actualizan. Introducir un salario diario omite este paso.

## Ganancias durante el turno

La cantidad mostrada es la tarifa diaria multiplicada por la proporción del turno completado, actualizada cada segundo. A la mitad has ganado la mitad de la tarifa diaria; cuando la cuenta regresiva llega a cero se muestra la cantidad completa.

Esta es una estimación lineal. No modela multiplicadores de horas extra, pausas no pagadas, bonos, impuestos o seguridad social, así que trátala como una sensación de progreso más que como una nómina.

## Dónde viven tus datos

Tus horarios, salario y preferencias se almacenan en el dispositivo que usas por defecto. En iPhone y iPad puedes sincronizarlos a través de tu base de datos privada de iCloud. Mac, Windows y el temporizador web siguen siendo locales y no se unen a esa sincronización. DoneAt no envía estos datos a sus propios servidores.

Como la cuenta regresiva y la estimación de ganancias se calculan localmente, DoneAt también funciona sin conexión una vez que se ha cargado o instalado. Borrar los datos locales elimina la copia de ese dispositivo; si la sincronización con iCloud está activada, usa los ajustes de Registros y datos para eliminar la copia sincronizada por separado.
