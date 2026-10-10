# 23 — Droit du numérique pour développeurs

![VitePress](https://img.shields.io/badge/-VitePress-646CFF?style=flat-square&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
[![fullstack-autotraining](https://img.shields.io/badge/curriculum-fullstack--autotraining-4C1?style=flat-square)](https://github.com/smaurier/fullstack-autotraining)

> **Prérequis** : NestJS + AWS + Stripe. À faire avant beta TribuZen.

Cours court. Objectif : savoir de quoi tu parles quand on te parle de RGPD, DPA, CGU, DPIA. Ce n'est pas un cours de droit — c'est un cours de dev qui sait ce qu'il signe et ce qu'il construit.

<!-- labs-gestes:start -->
## Labs — refonte du 22/09/2026 : un lab = un geste métier complet

> Règle qualité 5 du parcours : chaque lab est **un geste métier complet**, sous deux formes — **Zéro** (construire de zéro un artefact réel et entier) ou **Intervention** (modifier de l'existant avec consommateurs, findings avant code, non-régression). Un lab n'entre en file qu'avec un **oracle exécutable** (`src/` starter · `test/` · `solution/` séparée). Pour ce cours spécifiquement, la cible n'est **pas** un empilement de labs-gestes : c'est **un seul lab-geste avec oracle + des fiches coach-validées** (analyse/décision argumentée, pas de code — un dev qui code un "oracle" sur un jugement juridique produirait un faux sentiment de certitude). Cible détaillée : [`docs/gestes-complets.md`](../docs/gestes-complets.md). **État au 10/10/2026 : COMPLET — 1/1 lab-geste avec oracle + 9/9 fiches.**

| # | Entrée | Forme | Geste | Oracle |
|---|--------|-------|-------|--------|
| — | [`lab-01-checklist-rgpd-tribuzen`](labs/lab-01-checklist-rgpd-tribuzen/README.md) | Zéro | registre de traitements + privacy by default sur le vrai formulaire d'inscription TribuZen (module 01 §3) ; DPA hors oracle (module 05, contractuel) | ✅ vérifié (30 tests, solution GREEN / starter RED) |
| 00 | [`fiche-00-introduction-au-droit-du-numerique`](labs/fiche-00-introduction-au-droit-du-numerique/README.md) | Fiche | cartographie des obligations qui touchent TribuZen, qui tranche quoi (dev vs juriste/DPO) | ✅ coach-validée |
| 01 | [`fiche-01-rgpd-reflexes-developpeur`](labs/fiche-01-rgpd-reflexes-developpeur/README.md) | Fiche | classement des données TribuZen par base légale, repérage Art.9 / mineurs | ✅ coach-validée |
| 02 | [`fiche-02-consentement-cookies-et-traceurs`](labs/fiche-02-consentement-cookies-et-traceurs/README.md) | Fiche | audit des traceurs TribuZen + conception d'un bandeau conforme | ✅ coach-validée |
| 03 | [`fiche-03-droits-des-personnes`](labs/fiche-03-droits-des-personnes/README.md) | Fiche | parcours « supprimer mon compte » / « exporter mes données » | ✅ coach-validée |
| 04 | [`fiche-04-dpia-analyse-impact`](labs/fiche-04-dpia-analyse-impact/README.md) | Fiche | DPIA amorcée sur la feature Sorties (mineurs + géoloc) | ✅ coach-validée |
| 05 | [`fiche-05-dpa-et-sous-traitants`](labs/fiche-05-dpa-et-sous-traitants/README.md) | Fiche | registre des sous-traitants + checklist avant intégration | ✅ coach-validée |
| 06 | [`fiche-06-cgu-mentions-et-obligations-plateforme`](labs/fiche-06-cgu-mentions-et-obligations-plateforme/README.md) | Fiche | mentions légales obligatoires + points DSA/mineurs | ✅ coach-validée |
| 07 | [`fiche-07-propriete-intellectuelle-et-licences`](labs/fiche-07-propriete-intellectuelle-et-licences/README.md) | Fiche | audit des licences des dépendances + choix de licence projet | ✅ coach-validée |
| 08 | [`fiche-08-accessibilite-legale-et-conformite`](labs/fiche-08-accessibilite-legale-et-conformite/README.md) | Fiche (capstone) | checklist de conformité globale TribuZen avant lancement | ✅ coach-validée |

**Note numérotation (10/10/2026) :** `lab-01-checklist-rgpd-tribuzen` (oracle, auto-correcteur) et l'ancien `lab-01-rgpd-reflexes-developpeur` portaient le même préfixe `lab-01` — source de confusion entre le seul lab avec oracle exécutable et une fiche coach-validée. Les 9 fiches historiques (`lab-00` à `lab-08`) ont été renommées `fiche-00` à `fiche-08` ; les renvois des modules (`Fiche associée :`) ont été mis à jour en conséquence.

<!-- labs-gestes:end -->

## Modules

| # | Module | Durée |
|---|--------|-------|
| 00 | [Introduction au droit du numérique](modules/00-introduction-au-droit-du-numerique.md) | 30 min |
| 01 | [RGPD — réflexes dev](modules/01-rgpd-reflexes-developpeur.md) | 60 min |
| 02 | [Consentement, cookies et traceurs](modules/02-consentement-cookies-et-traceurs.md) | 45 min |
| 03 | [Droits des personnes](modules/03-droits-des-personnes.md) | 45 min |
| 04 | [DPIA — analyse d'impact](modules/04-dpia-analyse-impact.md) | 45 min |
| 05 | [Contrats sous-traitants (DPA)](modules/05-dpa-et-sous-traitants.md) | 30 min |
| 06 | [CGU, mentions et obligations plateforme](modules/06-cgu-mentions-et-obligations-plateforme.md) | 45 min |
| 07 | [Propriété intellectuelle et licences](modules/07-propriete-intellectuelle-et-licences.md) | 45 min |
| 08 | [Accessibilité légale et conformité (capstone)](modules/08-accessibilite-legale-et-conformite.md) | 30 min |

## TribuZen deliverables

- Checklist légale complète avant beta
- Politique de confidentialité TribuZen adaptée (données enfants Art. 9)
- DPA signés : Scaleway, Stripe, Sentry, PostHog
- Savoir quoi déléguer à un avocat spécialisé numérique
