# Col

**PWA de collecte de points d'intérêt et jeu de rôle géolocalisé en plein air**

→ [Essayer l'application](https://halteverte.github.io/Col/)

---

## Ce que fait Col

Col est une application web progressive (PWA) qui fonctionne **hors ligne sur mobile**, conçue pour explorer un territoire réel à pied. Elle combine :

- une **carte interactive** basée sur des tuiles vectorielles locales (PMTiles) — aucune dépendance à Google Maps ou à un serveur tiers
- un **système de collecte de POI** (points d'intérêt) géolocalisés, avec données persistantes en local
- une **couche RPG** : quêtes, ressources, recettes de craft, zones de terrain — le territoire devient un terrain de jeu
- un **carnet de bord** avec historique de trajets au format GPX
- une gestion **offline-first** via service worker : l'application reste utilisable sans connexion

## Stack technique

| Composant | Technologie |
|---|---|
| Application | PWA vanilla JS (sans framework) |
| Cartographie | MapLibre GL + PMTiles (tuiles vectorielles embarquées) |
| Persistance | IndexedDB / localStorage |
| Offline | Service Worker avec stratégie cache-first |
| Format trajets | GPX natif |
| Déploiement | GitHub Pages |

## Ce que ce projet démontre

- Capacité à concevoir et livrer une **application complète de A à Z** sans framework imposé
- Maîtrise de la **cartographie web** et des formats géospatiaux (GPX, PMTiles, GeoJSON)
- Architecture **offline-first** adaptée aux usages terrain et aux contraintes de connectivité
- Gestion de données structurées complexes (quêtes, inventaire, zones, waypoints) côté client

## Contexte de développement

Projet personnel développé en autodidacte, en parallèle d'une activité professionnelle dans l'administration publique. 77 commits, release stable v1.0 (mars 2026).

Ce projet est représentatif de ma démarche : identifier un besoin concret, concevoir une solution technique adaptée, et la livrer de façon autonome.

---

*Autres projets en cours : serveur MCP en Go (déploiement cloud), projets Rust/Vue.js, outils IA appliqués au secteur public.*
