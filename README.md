# 23 — Droit du numérique pour développeurs

![VitePress](https://img.shields.io/badge/-VitePress-646CFF?style=flat-square&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
[![fullstack-autotraining](https://img.shields.io/badge/curriculum-fullstack--autotraining-4C1?style=flat-square)](https://github.com/smaurier/fullstack-autotraining)

> **Prérequis** : NestJS + AWS + Stripe. À faire avant beta TribuZen.

Cours court. Objectif : savoir de quoi tu parles quand on te parle de RGPD, DPA, CGU, DPIA. Ce n'est pas un cours de droit — c'est un cours de dev qui sait ce qu'il signe et ce qu'il construit.

<!-- labs-gestes:start -->
## Labs — refonte du 22/09/2026 : un lab = un geste métier complet

> Règle qualité 5 du parcours : chaque lab est **un geste métier complet**, sous deux formes — **Zéro** (construire de zéro un artefact réel et entier) ou **Intervention** (modifier de l'existant avec consommateurs, findings avant code, non-régression). Un lab n'entre en file qu'avec un **oracle exécutable** (`src/` starter · `test/` · `solution/` séparée). Les labs historiques de ce cours (un concept par lab, sans oracle) restent dans `labs/` jusqu'à remplacement et **ne sont plus la file**. Cible détaillée : [`docs/gestes-complets.md`](../docs/gestes-complets.md). État : **1/2 avec oracle**.

| # | Lab | Forme | Geste | Oracle |
|---|-----|-------|-------|--------|
| 01 | [`lab-01-checklist-rgpd-tribuzen`](labs/lab-01-checklist-rgpd-tribuzen/README.md) | Zéro | registre de traitements + privacy by default sur le vrai formulaire d'inscription TribuZen (module 01 §3) ; DPA hors oracle (module 05, contractuel) | ✅ vérifié |
| 02 | `fiches` | Fiche | RGPD, CGU, PI, accessibilité légale | · à écrire |

<!-- labs-gestes:end -->

## Modules

| # | Module | Durée |
|---|--------|-------|
| 01 | [RGPD — réflexes dev](modules/01-rgpd-reflexes.md) | 60 min |
| 02 | [DPIA — quand et comment](modules/02-dpia.md) | 45 min |
| 03 | [CGU, Mentions légales, Politique confidentialité](modules/03-cgu-mentions.md) | 45 min |
| 04 | [Contrats sous-traitants (DPA)](modules/04-dpa-sous-traitants.md) | 30 min |
| 05 | [Propriété intellectuelle SaaS](modules/05-propriete-intellectuelle.md) | 45 min |
| 06 | [Accessibilité légale RGAA](modules/06-accessibilite-legale.md) | 30 min |

## TribuZen deliverables

- Checklist légale complète avant beta
- Politique de confidentialité TribuZen adaptée (données enfants Art. 9)
- DPA signés : Scaleway, Stripe, Sentry, PostHog
- Savoir quoi déléguer à un avocat spécialisé numérique
