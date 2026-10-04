---
title: "Comment ça marche — DoneAt"
description: "Comment DoneAt gère les quarts traversant minuit et comment le taux journalier est calculé à partir d'un salaire mensuel avec 21,75 jours ouvrés."
heading: "Comment ça marche"
intro: "L'arithmétique derrière le compte à rebours, la barre de progression et l'estimation des gains, pour que vous puissiez vérifier si les chiffres correspondent à votre contrat."
---

## Définition d'un quart

Un quart est simplement une heure de début et une heure de fin. Quand vous lancez le compte à rebours, les deux sont ancrées à la date du jour et le minuteur décompte jusqu'à la fin du quart.

Si l'heure de fin est antérieure à l'heure de début, le quart traverse minuit. Un quart 22h00-06h00 ouvert à 01h00 appartient à la soirée déjà commencée, pas à une nouvelle commençant ce soir. Le temps restant est donc 5 heures, pas 29.

## La barre de progression

La progression est la part du quart déjà écoulée, mesurée par rapport à sa durée totale et non par rapport à 8 heures fixes. Un quart de 6 heures et un quart de 12 heures affichent tous deux 50 % à mi-chemin.

La valeur est maintenue entre 0 et 100 ; arriver tôt ou rester tard ne pousse jamais la barre hors de sa plage.

## Conversion d'un salaire mensuel en taux journalier

Si vous entrez un salaire mensuel, il doit être converti en taux journalier avant d'être réparti sur le quart. Le diviseur par défaut est 21,75 jours ouvrés par mois.

Ce nombre n'est pas arbitraire. Une année a 365 jours, dont 104 tombent le week-end, laissant 261 jours ouvrés. Divisés sur 12 mois, cela fait exactement 21,75. C'est la base de salaire mensuel prescrite par la réglementation en Chine continentale. Si vous êtes employé ailleurs ou si votre contrat calcule différemment, considérez-le comme un point de départ — c'est votre contrat qui décide.

Si votre contrat calcule différemment, par exemple une semaine de 6 ou 4 jours, modifiez le nombre de jours ouvrés par mois et tous les montants seront mis à jour. Entrer un salaire journalier directement saute cette étape.

## Gains pendant le quart

Le montant affiché est le taux journalier multiplié par la proportion du quart écoulée, mis à jour chaque seconde. À mi-chemin, vous avez gagné la moitié du taux journalier ; quand le compte atteint zéro, le montant total est affiché.

C'est une estimation linéaire. Elle ne modélise pas les heures supplémentaires majorées, les pauses non payées, les primes, les impôts ou les cotisations sociales. Considérez-la comme un indicateur de progression, pas comme un bulletin de paie.

## Où vivent vos données

Vos horaires, salaire et préférences sont stockés sur l'appareil que vous utilisez par défaut. Sur iPhone et iPad, vous pouvez choisir de les synchroniser via votre base de données iCloud privée. Mac, Windows et le minuteur web restent locaux et ne participent pas à cette synchronisation. DoneAt n'envoie pas ces données à ses propres serveurs.

Le compte à rebours et l'estimation des gains étant calculés localement, l'app fonctionne aussi sans connexion une fois chargée. Effacer les données locales supprime la copie de cet appareil ; si la synchronisation iCloud est activée, utilisez les paramètres « Relevés et données » pour supprimer la copie synchronisée séparément.
