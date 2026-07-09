<!-- FLAG-REVIEW: droit/légal — valider par Sylvain + juriste avant diffusion publique -->

# Lab 07 — Propriété intellectuelle et licences open source

> **⚠️ Ceci n'est PAS un conseil juridique.** Cet exercice entraîne un **réflexe de développeur** : savoir auditer les licences d'un projet et poser les bonnes questions sur la titularité du code. Les conclusions que tu produiras (compatibilité d'une licence, choix de la licence du projet, portée d'une obligation copyleft, titularité d'un code IA ou clause de cession) sont des **propositions à faire valider par un juriste / avocat en PI**. Les références qui font foi sont **[choosealicense.com](https://choosealicense.com)** et **[opensource.org/licenses](https://opensource.org/licenses)**, et le **texte de chaque licence**.

> **Outcome :** à la fin, tu sais **auditer les licences des dépendances** d'un projet Node, **repérer une licence à risque** (GPL/AGPL) pour un SaaS propriétaire, **produire un fichier d'attribution**, et **argumenter** quelle licence retenir pour le projet — en traçant la frontière dev / juriste.
> **Vrai outil :** `license-checker` (npm) sur un vrai `package.json` + un document d'audit en Markdown. C'est le format réel d'un audit de conformité de licences. Pas de harnais, pas de code de production.
> **Feedback :** le coach valide en session (grille ci-dessous). Pas d'auto-correcteur.

---

## Énoncé

TribuZen est un **SaaS propriétaire** (données de familles, y compris mineurs). Tu es responsable de son **hygiène de licence** avant la première mise en production. Deux livrables, **aucun code de production** — de l'analyse et de la décision.

### Contexte fourni

Voici un extrait (illustratif) du résultat d'un `license-checker --summary` sur les dépendances de TribuZen :

```
MIT: 806
ISC: 58
Apache-2.0: 41
BSD-3-Clause: 19
BSD-2-Clause: 7
0BSD: 3
Python-2.0: 1
CC-BY-4.0: 1        ← licence de contenu, pas de code — à qualifier
LGPL-3.0: 1
GPL-3.0: 1          ← 🚩
AGPL-3.0: 1         ← 🚩🚩
UNLICENSED: 1       ← 🚩 (dépendance interne ? ou publiée sans licence ?)
```

Et trois faits de contexte :

1. Un **ami développeur** a proposé de contribuer bénévolement un module d'export PDF le week-end. Aucun écrit pour l'instant.
2. Environ **la moitié du code** du dashboard a été **générée par un assistant IA**, puis relue et adaptée par Sylvain.
3. Le product owner demande : « **On met TribuZen sous quelle licence ?** » — il croit qu'il faut « forcément une licence open source ».

### Ta production (README-only, aucun code de production)

**Livrable A — Tableau d'audit des licences.** Une ligne par licence présente ci-dessus, avec les colonnes :

| Licence | Famille (permissive / copyleft faible / copyleft fort) | Compatible SaaS propriétaire ? | Action | À remonter au juriste ? |
|---|---|---|---|---|

Pour chaque ligne à risque, précise **l'action concrète** (accepter / remplacer par un équivalent permissif / chercher une licence commerciale / isoler / investiguer / bloquer).

**Livrable B — Note de décisions (8 à 15 lignes).** Tu y traites :
1. **Le garde-fou** : quelle **liste blanche** tu passes à `license-checker --onlyAllow`, et pourquoi tu l'ajoutes en CI.
2. **L'AGPL et la GPL** : que fais-tu de ces deux dépendances, et selon quel arbre de décision (§Exemple 2 du module) ?
3. **La licence de TribuZen** : propriétaire/fermé ou open source ? Argumente (c'est un SaaS produit). Note que ce choix se **valide côté juridique + produit**.
4. **Les contributeurs & l'IA** : qu'exiges-tu de l'ami dev **avant** son premier commit ? Que fais-tu du code généré par IA ? Quelles **questions** remontes-tu au juriste (au moins une, précise) ?

---

## Étapes (en friction)

1. **Lance l'audit sur un vrai projet.** Dans n'importe quel projet Node à toi (ou un `create-vite` neuf), exécute `npx license-checker --summary` et observe la vraie distribution des licences. Le but : voir de tes yeux combien de MIT vs autres.
2. **Classe chaque licence** du contexte en permissive / copyleft faible / copyleft fort. En cas de doute, va lire la fiche sur **[choosealicense.com](https://choosealicense.com/licenses/)** — n'invente pas la catégorie.
3. **Marque les incompatibles** pour un SaaS propriétaire. Rappel : la **GPL** classique est moins gênante en SaaS que l'**AGPL** (usage réseau = distribution). La **LGPL** (copyleft faible) se traite à part. `UNLICENSED` et `CC-BY-4.0` demandent une investigation, pas un rejet réflexe.
4. **Écris la liste blanche** `--onlyAllow` et explique pourquoi la mettre **en CI** (conformité passive plutôt que vigilance humaine).
5. **Applique l'arbre de décision** à l'AGPL et à la GPL : équivalent permissif ? édition commerciale ? isolation ? sinon on n'installe pas.
6. **Tranche la licence du projet** — mais présente-la comme une **proposition** produit + juridique, pas comme un fait acquis.
7. **Traite le facteur humain** : clause de cession pour l'ami (avant le premier commit), traçage du code IA, et la ou les **questions** que tu poses au juriste.
8. **Rédige la note B** : décisions dev d'un côté, ce qui remonte au juriste de l'autre.

> Contrainte : tu ne tranches **seul** que ce qui relève du dev (audit, liste blanche, garde-fou CI, attribution, repérage des risques). Le **choix de licence du produit**, la **rédaction de la cession**, la **titularité du code IA** et la **portée d'une obligation copyleft** portent la mention « à valider juriste ».

---

## Grille d'évaluation (le coach valide en session)

| Critère | Attendu | ✓/✗ |
|---|---|---|
| **Classement** | permissif (MIT/Apache/BSD/ISC/0BSD) vs copyleft fort (GPL/AGPL) vs copyleft faible (LGPL) correctement distingués | |
| **AGPL** | identifiée comme le risque majeur pour un SaaS (usage réseau = distribution) et traitée par l'arbre de décision, pas installée « pour voir » | |
| **GPL vs AGPL** | la nuance SaaS est comprise (GPL classique ≠ AGPL) et non confondue | |
| **UNLICENSED / CC-BY** | ne sont pas rejetées ni acceptées à l'aveugle : investigation / qualification demandée | |
| **Garde-fou CI** | `--onlyAllow` proposé avec liste blanche cohérente + justification « conformité passive en CI » | |
| **Attribution** | fichier d'attribution (`THIRD-PARTY-LICENSES`) prévu pour les libs permissives | |
| **Licence du projet** | choix argumenté (SaaS → propriétaire par défaut est défendable) ET présenté comme décision produit + juridique, pas comme un dogme « open source obligatoire » | |
| **Contributeur / cession** | clause de cession exigée AVANT le premier commit de l'ami ; « payer/bénévole ≠ posséder » intégré | |
| **Code IA** | traité comme zone grise : relu/adapté/tracé, question remontée, aucune affirmation tranchée de titularité | |
| **Posture** | aucune licence ni obligation présentée comme vérité figée ; renvoi choosealicense.com / opensource.org + juriste | |

Réussite = tous les critères cochés **et** au moins une incertitude (AGPL, licence du projet, titularité IA) honnêtement **remontée** plutôt que tranchée en force.

---

## Coach — relances de session (≥ 3)

Le coach ne corrige pas ligne à ligne : il **fait raisonner**. Trois relances minimum :

1. **« Cette dépendance AGPL, si tu la mets en prod, elle t'oblige à QUOI ? »** — force à énoncer le mécanisme (usage réseau = distribution → publier tout le code du SaaS). Si la réponse est « rien, on est un SaaS », creuser la différence GPL / AGPL. Objectif : que le piège du SaaS soit compris, pas récité.
2. **« La licence de TribuZen, c'est toi qui la décides ? »** — sur le choix propriétaire vs open source. Faire émerger que le dev **propose et argumente** (SaaS → fermé est cohérent), mais que la décision **finale** est produit + juridique. Débusquer le dogme « il faut forcément de l'open source ».
3. **« Ton ami commit ce week-end : à qui appartient son code ? »** — sur la clause de cession. « Il est bénévole » / « c'est un pote » ne change rien : sans écrit, il **garde** ses droits. Faire dire *quand* la clause doit exister (avant le premier commit) et *qui* la rédige (juriste).

(Relance bonus si le temps le permet : **« Le composant que l'IA t'a généré, tu peux le breveter ou le revendre comme "ton" œuvre ? »** — vérifier que la zone grise est intégrée : on ne tranche pas, on remonte.)

---

## Variante J+30 (fading)

Refais l'audit **de mémoire, en 25 minutes**, sans rouvrir le module ni ce corrigé, avec **deux ajouts** :

1. Nouvelle dépendance dans le `--summary` : **`SSPL-1.0`** (Server Side Public License, ex. certaines versions de MongoDB). Elle n'est **pas** approuvée OSI. Qualifie-la, dis si elle a sa place dans un SaaS propriétaire, et quelle **action** tu prends (indice : c'est encore plus contraignant que l'AGPL pour un service, et son statut « open source » est contesté — à investiguer, pas à supposer).
2. Rédige la **phrase exacte** que tu enverrais au juriste pour lever **une** incertitude de ton choix (ex. « peut-on garder telle brique GPL isolée dans un microservice sans contaminer le cœur ? »). Formulation d'une vraie question de conformité, précise et actionnable.

**Critère de réussite :** la SSPL est traitée comme une licence **à risque et à statut contesté** (investigation + remontée, pas d'installation réflexe), et ta question au juriste est **précise et actionnable**.

---

## Application TribuZen

Ce lab produit le **premier audit de licences** de TribuZen et son **garde-fou** de conformité. Dans le repo `smaurier/tribuzen`, il se matérialise ainsi :

```
tribuzen/
  docs/
    licences-audit.md          ← ton tableau (Livrable A) + note de décisions (Livrable B)
  .github/workflows/ci.yml     ← étape license-checker --onlyAllow (casse le build sur licence hors liste)
  THIRD-PARTY-LICENSES.csv     ← attribution des dépendances permissives (npx license-checker --csv)
  LICENSE                      ← présent seulement si un jour open source ; absent tant que propriétaire
```

Cet audit pilote ensuite des choix réels :
- il **bloque en CI** toute future dépendance GPL/AGPL avant qu'elle n'atteigne la prod ;
- il justifie l'absence (ou la présence) d'un fichier `LICENSE` selon la décision produit + juridique ;
- il **ouvre le chantier contractuel** dès qu'un tiers contribue : clause de cession à faire rédiger avant tout commit externe.

**Ce qui reste hors périmètre du dev** : le **choix final** de la licence du produit, la **rédaction** de la clause de cession, la **titularité** du code généré par IA et la **portée** d'une obligation copyleft dans le cas précis reviennent au **juriste / avocat en PI**. Le lab t'entraîne à préparer un audit *défendable* et un garde-fou *automatisé*, pas à signer les décisions juridiques.

**Commit cible :**
```
docs(conformite): audit des licences TribuZen v0 — liste blanche CI, risque AGPL écarté, licence produit à valider
```
