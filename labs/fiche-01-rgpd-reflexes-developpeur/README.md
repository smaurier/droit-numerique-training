<!-- FLAG-REVIEW: droit/légal — valider par Sylvain + juriste avant diffusion publique -->

# Lab 01 — RGPD : les réflexes du développeur

> **⚠️ Ceci n'est PAS un conseil juridique.** Cet exercice entraîne un **réflexe de développeur** : savoir cartographier des données et poser les bonnes questions. Les qualifications que tu produiras (base légale, donnée sensible, durée) sont des **propositions à faire valider par un juriste / DPO / avocat**. La source qui fait foi est **[cnil.fr](https://www.cnil.fr)** ; les principes évoqués évoluent.

> **Outcome :** à la fin, tu sais **cartographier les données d'un produit**, proposer une **base légale par traitement**, repérer les **données sensibles (Art. 9)** et les **données de mineurs**, et distinguer ce que le dev tranche de ce qu'il remonte.
> **Vrai outil :** un tableau d'analyse (Markdown, Notion ou Google Sheet) — c'est le format réel d'un registre de traitements naissant. Aucun code, aucun harnais.
> **Feedback :** le coach valide en session (grille ci-dessous). Pas d'auto-correcteur.

---

## Énoncé

Voici les données que TribuZen s'apprête à collecter au lancement. Ton travail : **produire une analyse de conformité** sous forme de tableau, puis **une courte note de décisions**.

Données en entrée (périmètre du MVP TribuZen) :

```
COMPTE / AUTHENTIFICATION
  - email du parent
  - mot de passe (haché)
  - prénom du parent
  - date de naissance complète du parent

FAMILLE
  - nom de famille
  - prénom de chaque enfant
  - date de naissance de chaque enfant
  - photo de profil de la famille (adultes + enfants)

SANTÉ / QUOTIDIEN
  - allergies alimentaires de chaque enfant
  - "notes médicales" (champ libre : TSA, TDAH, asthme, traitements…)

USAGE
  - adresse IP à chaque connexion (journaux)
  - newsletter produit (oui/non)
  - notifications push marketing (oui/non)

FACTURATION
  - nom, adresse postale
  - historique des paiements
```

### Ta production (README-only, aucun code)

**Livrable A — Tableau d'analyse.** Une ligne par donnée, avec les colonnes :

| Donnée | Personnelle ? | Sensible Art. 9 ? | Concerne un mineur ? | Base légale proposée | Minimisation possible ? | À remonter au juriste ? |
|---|---|---|---|---|---|---|

**Livrable B — Note de décisions (5 à 10 lignes).** Tu y expliques :
1. Quelle donnée tu **supprimes ou transformes** au nom de la minimisation (et par quoi tu la remplaces).
2. Quelles données tu **isoles et chiffres** (et pourquoi).
3. Quelles **incertitudes** tu remontes explicitement au juriste / DPO (au moins une, argumentée).

---

## Étapes (en friction)

1. **Passe chaque donnée au filtre « personnelle ? »** — dans le doute, oui.
2. **Repère les données de l'Art. 9** — relis la définition CNIL avant de trancher. N'invente pas de catégorie.
3. **Marque les données de mineurs** — enfants = vigilance renforcée.
4. **Propose une base légale** pour chaque traitement (contrat / consentement / obligation légale / intérêt légitime). Justifie en une demi-ligne.
5. **Cherche la minimisation** — pour chaque champ, demande-toi « en ai-je *vraiment* besoin, sous cette forme ? ». La date de naissance complète du parent est un piège volontaire.
6. **Sépare les finalités** — un même email peut servir à l'auth, à la facture, à la newsletter : est-ce la même base ?
7. **Marque ce qui se remonte** — toute qualification sensible, toute durée, tout cas ambigu (les photos d'enfants notamment).
8. **Rédige la note B** — décisions dev d'un côté, questions au juriste de l'autre.

> Contrainte : tu ne dois trancher **seul** que ce qui relève du dev (schéma, isolation, minimisation, défauts). Tout le reste porte la mention « à valider juriste / DPO ».

---

## Grille d'évaluation (le coach valide en session)

| Critère | Attendu | ✓/✗ |
|---|---|---|
| **Donnée personnelle** | IP, UUID, combinaisons reconnues comme personnelles (pas seulement email/nom) | |
| **Art. 9** | allergies + notes médicales identifiées comme **santé** ; aucune sur-qualification abusive | |
| **Mineurs** | prénoms, dates de naissance, santé et **photos d'enfants** marqués | |
| **Bases légales** | auth/famille = contrat ; santé = consentement explicite ; facture = obligation légale ; journaux IP = intérêt légitime ; newsletter/push = consentement | |
| **Minimisation** | date de naissance complète du parent supprimée/transformée (ex. `isAdult`) | |
| **Finalités séparées** | l'email n'est pas réutilisé d'une finalité à l'autre sans base propre | |
| **Frontière dev/juriste** | ≥ 1 incertitude explicitement remontée (photos d'enfants, durées, qualif santé) | |
| **Posture** | aucune base légale ni durée présentée comme une vérité figée ; renvoi cnil.fr | |

Réussite = tous les critères cochés **et** au moins une incertitude honnêtement remontée plutôt que tranchée en force.

---

## Coach — relances de session (≥ 3)

Le coach ne corrige pas ligne à ligne : il **fait raisonner**. Trois relances minimum :

1. **« Cette donnée, tu la stockes AU NOM DE QUOI ? »** — force à nommer la base légale, pas à la deviner. Si la réponse est « c'est dans les CGU », creuser : la donnée est-elle *objectivement nécessaire* au service ?
2. **« En as-tu vraiment besoin sous cette forme ? »** — sur la date de naissance complète du parent, sur l'IP en clair, sur le champ « notes médicales » en texte libre. Faire émerger la minimisation.
3. **« Ça, tu le décides ou tu le remontes ? »** — sur la qualification des photos d'enfants et sur les durées de conservation. Objectif : que Sylvain trace lui-même la frontière dev / juriste, sans qu'on la lui donne.

(Relance bonus si le temps le permet : **« Quelle est la différence entre pseudonymiser l'enfant par un UUID et l'anonymiser ? »** — vérifier que le piège pseudo/anonyme est intégré.)

---

## Variante J+30 (fading)

Refais l'analyse **de mémoire, en 25 minutes**, sans rouvrir le module ni ce corrigé, avec **deux ajouts** :

1. Nouvelle donnée : **géolocalisation en temps réel** de chaque membre (fonction « où est ma famille »). Qualifie-la, propose une base, et décide by design du **réglage par défaut**.
2. Pour **une seule** donnée de ton choix, rédige la phrase exacte que tu enverrais au DPO pour lever l'incertitude (formulation d'une vraie question de conformité).

**Critère de réussite :** la géoloc est traitée comme donnée sensible *potentielle* (elle peut révéler des habitudes, un lieu de culte, un état de santé), placée en **opt-in / off par défaut**, et ta question au DPO est **précise et actionnable**.

---

## Application TribuZen

Ce lab produit le **premier registre des traitements** de TribuZen. Dans le repo `smaurier/tribuzen`, il se matérialise ainsi :

```
tribuzen/
  docs/
    registre-traitements.md   ← ton tableau (Livrable A) devient ce fichier
    conformite-notes.md       ← ta note de décisions (Livrable B) + questions DPO
```

Ce registre pilote ensuite des choix de code réels :
- il justifie chaque colonne du `schema.prisma` (si aucune base légale, la colonne n'existe pas) ;
- il isole les données Art. 9 (santé) dans un module chiffré à part ;
- il ouvre le chantier **DPIA** (module 04) pour les données de santé et de mineurs.

**Ce qui reste hors périmètre du dev** : la validation finale du registre, des bases et des durées revient au **juriste / DPO**. Le lab t'entraîne à préparer un registre *défendable*, pas à le signer.

**Commit cible :**
```
docs(conformite): registre des traitements TribuZen v0 — bases légales, données Art. 9, mineurs
```
