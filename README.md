# Leonida
Map interactive GTA VI

Carte interactive de GTA 6 (Leonida) en français, installable comme une appli sur iPhone, iPad et ordinateur, avec suivi de progression.

**Ouvrir la carte : https://tomfoot2-lab.github.io/Leonida/**

## Sauvegarde

La progression est gardée à trois endroits :

1. **Un Gist secret sur ton compte GitHub** (synchro entre appareils, une copie par jour gardée 30 jours). À activer dans l'onglet « Sauvegarde » avec un jeton GitHub qui n'a que le droit `gist`.
2. **L'appareil** (stockage du navigateur ou de l'appli installée), même hors connexion.
3. **Un fichier `.json`** que tu télécharges et ranges où tu veux (iCloud Drive, Google Drive…).

Le jeton GitHub reste sur l'appareil. Il n'est jamais envoyé ailleurs qu'à `api.github.com`.

## Contenu

- `index.html` : l'appli (une seule page).
- `data.json` : 5 842 lieux et objets, 105 catégories en français.
- `t/` : morceaux de la carte (zooms 0 à 5).
- `sw.js`, `manifest.webmanifest`, `icons/` : installation et fonctionnement hors ligne.
- `vendor/` : [Leaflet](https://leafletjs.com) 1.9.4 (licence BSD-2, voir `vendor/LEAFLET-LICENSE.txt`).
- Pictogrammes des catégories : [Tabler Icons](https://tabler.io/icons) (licence MIT, voir `vendor/TABLER-ICONS-LICENSE.txt`).

## Crédits

Carte, tuiles et données : [Open GTA 6 Map](https://github.com/fbritoferreira/gta6) (fbritoferreira), licence [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.fr).
Modifications : catégories et noms adaptés en français, descriptions traduites automatiquement, tuiles réassemblées et allégées.

Photos des fiches : captures du jeu © Rockstar Games / Take-Two Interactive, non couvertes par la licence CC BY. Elles ne sont pas copiées dans ce dépôt : la carte les affiche directement depuis Open GTA 6 Map (site du projet, ou copie de son dépôt via jsDelivr pour les plus récentes). Les photos déjà vues sont gardées dans le cache de l'appareil pour le hors ligne.

Projet de fan non officiel, sans lien avec Rockstar Games ni Take-Two Interactive. Grand Theft Auto et les noms associés appartiennent à leurs propriétaires.
