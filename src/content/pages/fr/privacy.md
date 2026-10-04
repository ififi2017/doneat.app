---
title: "Politique de confidentialité — DoneAt"
description: "Comment DoneAt stocke les données localement par défaut, propose une synchronisation iCloud privée optionnelle sur iPhone et iPad, et gère les analyses et services tiers."
heading: "Politique de confidentialité"
intro: "Cette page explique comment DoneAt stocke et traite les informations : le site officiel, le minuteur web, et les apps sur iPhone, iPad, Mac et Windows."
updatedLabel: "Dernière mise à jour"
updated: "6 septembre 2026"
---

## Données stockées par DoneAt

Les informations que vous entrez sont stockées localement par défaut : dans le stockage local du navigateur pour le minuteur web, et dans le dossier de données de l'application sur iPhone, iPad, Mac et Windows. DoneAt ne fournit pas de comptes produit et n'envoie pas ces informations aux serveurs DoneAt.

Sur iPhone et iPad, vous pouvez choisir d'activer la synchronisation iCloud. Elle stocke vos plannings, relevés, salaire, préférences de rappel, apparence, langue, profil de vie et données de concentration dans la base de données iCloud privée associée à votre compte Apple. L'autorisation des notifications, la protection biométrique, les paramètres d'Activité en direct, le minuteur de travail actuel et l'état d'intégration restent sur chaque appareil. Le minuteur web, l'app Mac et l'app Windows restent en stockage local et ne participent pas à cette synchronisation.

Le compte à rebours, la progression et l'estimation des gains sont calculés sur votre appareil à partir de ces informations.

Cela inclut généralement :

- Heures de début et de fin, jours ouvrés, paramètres de pause ou d'heures supplémentaires
- Montant du salaire, période de paie et historique salarial de carrière
- Relevés de travail et corrections, étapes de carrière, jalons ou dates de vie que vous choisissez d'entrer
- Titres de tâches de concentration, plans, sessions et paramètres de repos
- Préférences de notifications et de rappels
- Langue et apparence

## Synchronisation iCloud optionnelle

La synchronisation est désactivée par défaut. Lorsque vous l'activez sur iPhone ou iPad, le service CloudKit d'Apple stocke les données décrites ci-dessus dans la base de données privée associée à votre compte Apple. DoneAt ne reçoit pas de copie sur ses propres serveurs. Les appareils utilisant le même compte Apple peuvent récupérer et synchroniser ces données ; cela nécessite un compte iCloud disponible et une connexion réseau.

Activer la synchronisation nécessite DoneAt Plus. La synchronisation déjà activée continue après l'expiration de l'abonnement. Désactiver la synchronisation arrête la synchronisation sur cet appareil et conserve à la fois sa copie locale actuelle et la copie iCloud existante. La désactiver ne supprime aucune des deux copies.

## Exportations de sauvegarde

Sur iPhone et iPad, une exportation de sauvegarde n'est créée que lorsque vous choisissez Exporter. Une sauvegarde complète inclut vos relevés, paramètres synchronisés, salaire et historique salarial de carrière, profil de vie, et tâches et sessions de concentration. Vous pouvez aussi exporter sans le profil de vie ; cette option inclut toujours le salaire et l'historique de carrière.

L'exportation est un fichier JSON lisible, pas une archive protégée par mot de passe. Choisissez un emplacement de stockage et des destinataires appropriés pour les informations qu'il contient. Les fichiers que vous enregistrez ou partagez sont des copies séparées ; supprimer des données dans DoneAt ne supprime pas ces fichiers.

## Achats Plus

Sur iPhone et iPad, Apple gère les abonnements Plus et les achats à vie via l'App Store. DoneAt utilise StoreKit pour vérifier l'état d'achat et restaurer l'accès. DoneAt ne reçoit pas les détails de votre carte de paiement et n'envoie pas votre statut d'achat à un serveur de compte DoneAt.

L'expiration d'un abonnement ne supprime pas vos relevés existants. L'exportation et la suppression restent disponibles sans abonnement actif.

## Site officiel

[doneat.app](https://doneat.app) est un site web statique. Il ne collecte pas vos horaires ou votre salaire. Ouvrir la racine du site ou un chemin court comme `/privacy` suit la langue de votre navigateur et vous dirige vers le hall approprié ou la page de support en anglais ou chinois simplifié. La langue reste dans l'URL de la page ; ce site ne définit pas de cookie de langue.

Le site officiel utilise l'analyse sans cookie de Vercel pour mesurer les vues de pages et les performances de chargement, ainsi que quelques compteurs agrégés. Les événements proviennent d'une liste fixe et publique — par exemple `hall_view`, `download_view`, `download_from_web`. La requête ne contient que le nom de l'événement. Elle n'inclut pas d'identifiant utilisateur, de session, de langue, d'horaires ou de salaire.

## Analyse du minuteur web

Le minuteur web sur [off.rainif.com](https://off.rainif.com) utilise également l'analyse sans cookie de Vercel pour mesurer les vues de pages et les performances de chargement. Il utilise un ensemble séparé et limité de compteurs agrégés.

Les événements produit proviennent d'une autre liste fixe et publique, comme `share_open` ou `countdown_start`. Ils ne contiennent pas d'identifiants utilisateur, d'informations de session, d'horaires ou de données salariales.

## Cookies

Le minuteur web utilise un cookie nommé `i18nextLng` pour stocker un code de langue afin que les visites ultérieures s'ouvrent dans la langue que vous avez choisie. Il est défini lors de la première visite, mis à jour lorsque vous changez de langue, expire après un an et peut être supprimé dans votre navigateur.

Ni le site officiel ni le minuteur web n'utilisent de cookies publicitaires ou de suivi inter-sites.

## Partage d'un compte à rebours

L'URL d'un lien de partage ne contient que les heures de début et de fin. Elle ne contient pas d'informations salariales. Les images de partage de compte à rebours omettent également le salaire. Une exportation de sauvegarde est différente : elle peut contenir le salaire et les autres données personnelles listées ci-dessus.

Si vous choisissez de partager via un service social tiers, la politique de confidentialité de ce service s'applique.

## Apps sur votre téléphone et ordinateur

Les apps iPhone, iPad, Mac et Windows ne collectent pas d'analyses d'utilisation.

Une version de bureau installée depuis GitHub vérifie s'il existe une nouvelle version au démarrage. La requête ne contient ni compte, ni salaire, ni données d'utilisation. Si vous ne pouvez pas vous connecter directement à GitHub, vous pouvez réessayer via un miroir tiers.

Une version installée depuis le Microsoft Store n'initie pas de vérifications de mise à jour. Les mises à jour sont fournies par le Microsoft Store.

Les rappels sont planifiés et affichés localement par le système d'exploitation.

## Widgets, Activités en direct et protection de l'appareil

Les widgets et Activités en direct utilisent les informations nécessaires pour afficher votre minuteur et votre progression. Ils n'incluent pas le salaire. Les notifications locales omettent également le salaire.

Lorsque DoneAt vous demande de vous authentifier pour protéger les gains ou les relevés, l'authentification est gérée par l'appareil via Face ID, Touch ID ou son code d'accès. DoneAt reçoit le résultat de l'authentification, pas vos données biométriques ou votre code.

## Services tiers

DoneAt utilise les services suivants pour héberger les pages, mesurer le site officiel et le minuteur web, distribuer les apps et ouvrir les liens que vous choisissez :

- Vercel — hébergement du site officiel et du minuteur web ; mesure des vues de pages et des performances sur les deux
- Upstash — stockage des compteurs d'événements agrégés quotidiens
- GitHub — code source, informations de version, vérifications de mise à jour pour les versions de bureau distribuées par GitHub
- Apple — distribution d'apps, paiements Plus et vérification d'achat via l'App Store et StoreKit, et synchronisation iCloud privée optionnelle
- Microsoft — distribution et mises à jour pour la liste Microsoft Store que vous ouvrez
- Un miroir de téléchargement tiers, utilisé uniquement lorsque vous le choisissez
- Le service social tiers que vous choisissez lors du partage d'un compte à rebours

## Suppression de vos données

Sur le minuteur web, effacez les données de ce site dans votre navigateur, y compris le stockage local et le cookie de langue. Sur Mac ou Windows, désinstallez l'app et supprimez ses données.

Sur iPhone et iPad, la désinstallation supprime les données stockées sur cet appareil. Si vous avez activé la synchronisation iCloud, la copie iCloud privée reste disponible pour vos autres appareils. « Supprimer d'iCloud » dans les paramètres « Relevés et données » de DoneAt supprime la copie iCloud et efface les relevés synchronisés associés sur les appareils connectés à ce compte Apple lors de la prochaine synchronisation.

DoneAt ne peut pas accéder à votre compte Apple ni supprimer ses données iCloud privées en votre nom. DoneAt ne peut pas non plus accéder à vos données locales ou les supprimer depuis un serveur.

## Modifications de cette politique

Lorsque cette politique est mise à jour, la date de dernière mise à jour en haut de la page sera également révisée. Les modifications importantes seront listées dans les notes de version, et les versions précédentes sont disponibles dans l'historique des commits du dépôt open source.

## Nous contacter

Pour les questions sur cette politique ou sur la façon dont les informations sont gérées, contactez-nous à [hello@doneat.app](mailto:hello@doneat.app). Les problèmes et suggestions concernant le produit peuvent également être soumis via [GitHub Issues](https://github.com/ififi2017/Off-Work-Countdown/issues).
