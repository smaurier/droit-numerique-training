<!-- FLAG-REVIEW: droit/légal — valider par Sylvain + juriste avant diffusion publique -->

> ⚠️ **Ceci N'EST PAS un conseil juridique.** Ce lab est un exercice de **cartographie et de raisonnement** pour un développeur : savoir *de quoi on parle* et *qui décide quoi*. Aucune des réponses ci-dessous ne remplace l'avis d'un **juriste, avocat ou DPO**. Ne prends aucune décision de conformité réelle sur la seule base de ce lab.

# Lab 00 — Cartographier les obligations qui touchent TribuZen

> **Outcome :** à la fin, tu sais dresser la carte des cadres légaux (RGPD / DSA / AI Act / RGAA) qui touchent une fonctionnalité de TribuZen, et trancher pour chaque point *qui décide* (dev vs juriste/DPO).
> **Vrai livrable :** un tableau de cartographie + une checklist « qui décide quoi », rédigés à la main (Markdown, tableur, ou papier). **Pas de code.**
> **Feedback :** le coach valide ton raisonnement en session — pas de correcteur automatique.

---

## Énoncé

Tu es le développeur de **TribuZen** (app d'organisation familiale : données d'adultes **et de mineurs**, photos, géolocalisation, partage entre familles). Le product owner te remet **cinq fonctionnalités** au backlog. Ta mission n'est pas de les coder, mais de produire deux livrables d'analyse.

**Les cinq fonctionnalités :**

1. **Journal de bord familial** — chaque parent note des événements du quotidien (parfois de la santé de l'enfant : allergie, rendez-vous médical).
2. **Partage de photos** des enfants entre les membres d'une même famille.
3. **Carte de géolocalisation** montrant la position des enfants en temps réel.
4. **Assistant IA** qui lit le journal de bord et propose des routines.
5. **Newsletter** hebdomadaire avec des conseils parentalité.

### Livrable 1 — Tableau de cartographie

Pour **chaque** fonctionnalité, remplis une ligne :

| Fonctionnalité | Cadre(s) légal(aux) concerné(s) (RGPD / DSA / AI Act / RGAA) | Pourquoi (1 phrase) | Point de vigilance côté dev |
|---|---|---|---|

> Contrainte : une fonctionnalité peut relever de **plusieurs** cadres. Ne te limite pas à un seul.

### Livrable 2 — Checklist « qui décide quoi »

Prends la fonctionnalité **la plus sensible** de la liste (à toi de justifier laquelle) et décompose-la en **6 à 8 décisions/actions**. Pour chacune, indique qui la porte : **DEV**, **JURISTE/DPO**, ou **LES DEUX**.

| Décision / action | DEV | JURISTE/DPO | LES DEUX |
|---|:---:|:---:|:---:|

Termine par **une phrase** : quelle est *ta* limite de dev sur cette fonctionnalité, et à quel moment précis tu escalades.

---

## Étapes (en friction)

1. **Relis la carte du module 00** (section 2.2) sans copier — reformule de mémoire à quoi sert chaque cadre.
2. **Classe chaque fonctionnalité** dans le tableau. Pour chacune, pose-toi : *quelles données ? sur qui (adulte/mineur) ? est-ce partagé ? y a-t-il de l'IA ? est-ce dans l'UI que tout le monde doit pouvoir utiliser ?*
3. **Repère les cumuls.** Au moins une fonctionnalité doit toucher plus d'un cadre — trouve-la et explique pourquoi.
4. **Choisis la plus sensible** et justifie ton choix en une phrase.
5. **Découpe-la en décisions/actions** et attribue chacune à DEV / JURISTE-DPO / LES DEUX. Force-toi à mettre au moins une action dans chaque colonne.
6. **Écris ta limite de dev** : la phrase « je fais X, mais je n'ai pas à décider Y, donc j'escalade au moment où… ».
7. **Vérifie une source officielle** pour au moins un cadre que tu as cité (voir liens plus bas) — sans en tirer d'article/seuil figé, juste pour confirmer *à quoi sert* le texte.

---

## Grille d'évaluation

| Critère | Attendu | ✔ |
|---|---|:--:|
| Couverture des 4 cadres | RGPD, DSA, AI Act, RGAA sont tous mobilisés au moins une fois à bon escient | |
| Cumuls repérés | Au moins une fonctionnalité correctement rattachée à plusieurs cadres (ex. géoloc enfants = RGPD **et** vigilance DSA mineurs) | |
| Distinction des rôles | La checklist sépare clairement ce qui relève du dev de la décision juridique | |
| Réflexe « escalade » | La limite de dev est formulée : quoi implémenter vs quoi ne pas décider seul | |
| Sourcing | Au moins une source officielle consultée, sans transformer un chiffre en vérité figée | |
| Posture | Aucune décision juridique tranchée « à la place » du juriste/DPO | |

---

## Corrigé indicatif (à confronter, pas à recopier)

> ⚠️ Corrigé **pédagogique**, non juridique. Un juriste/DPO peut aboutir à une analyse différente selon le contexte réel.

**Livrable 1 — cartographie (proposition) :**

| Fonctionnalité | Cadre(s) | Pourquoi | Vigilance dev |
|---|---|---|---|
| Journal de bord (santé enfant) | RGPD | Données personnelles, potentiellement sensibles (santé) et sur un mineur | Séparer/chiffrer les données sensibles ; minimiser ; prévoir l'effacement |
| Partage de photos d'enfants | RGPD + DSA | Données perso de mineurs + contenu partagé entre utilisateurs | Contrôle d'accès strict à la famille ; qui a consenti ? escalader |
| Géolocalisation temps réel des enfants | RGPD (+ vigilance DSA mineurs) | Donnée sensible par le contexte, sur une personne vulnérable | Minimiser (position à la demande plutôt que continue) ; escalader avant de coder |
| Assistant IA sur le journal | AI Act + RGPD | Système d'IA à situer sur l'échelle de risque + traitement de données perso | Assurer la transparence (l'utilisateur sait qu'une IA lit) ; situer le risque |
| Newsletter parentalité | RGPD (+ DSA transparence pub) | Traitement d'emails à une finalité marketing | Prévoir un consentement/opt-out propre ; ne pas réutiliser les emails du service |

*Note : le RGAA n'est rattaché à aucune fonctionnalité en particulier car il est **transverse** — toute l'UI doit être accessible. Le signaler est un bon réflexe.*

**Livrable 2 — checklist sur la géolocalisation (proposition) :**

| Décision / action | DEV | JURISTE/DPO | LES DEUX |
|---|:---:|:---:|:---:|
| Choisir position « à la demande » plutôt que tracking continu (minimisation) | ✔ | | |
| Restreindre la visibilité de la position à la famille (contrôle d'accès) | ✔ | | |
| Prévoir l'effacement de l'historique de position | ✔ | | |
| Décider si/quelle base légale autorise ce traitement d'un mineur | | ✔ | |
| Décider de la forme du consentement pour un mineur | | ✔ | |
| Rédiger l'information aux utilisateurs (mentions) | | ✔ | |
| Décider si une analyse d'impact (DPIA) est nécessaire | | | ✔ |
| Signaler le risque et attendre l'aval avant de livrer | | | ✔ |

**Limite de dev (exemple) :** *« J'implémente une version minimisée et sécurisée de la géoloc, mais je ne décide pas si c'est légalement autorisé ni sous quelle base pour un mineur — j'escalade au DPO dès l'ouverture du ticket, et je ne merge rien avant son aval. »*

---

## Variante J+30 (fading)

Un mois plus tard, **sans rouvrir ce lab ni le module 00** :

1. On te donne **une seule** nouvelle fonctionnalité inventée par toi (ex. « badge public de récompense partagé sur les réseaux »).
2. En **15 minutes**, produis directement la ligne de cartographie **et** la phrase « limite de dev / point d'escalade ».
3. Contrainte ajoutée : cite **la source officielle** que tu irais consulter en premier, et pourquoi — sans en extraire de chiffre.

**Critère de réussite :** tu mobilises le bon cadre du premier coup et tu sais dire ce que tu ne décides pas seul.

---

## Application TribuZen

Ce lab produit un artefact réutilisable dans le vrai projet : une **matrice de conformité** vivante, à garder dans le repo (par ex. `docs/conformite/cartographie.md`) et à mettre à jour à chaque nouvelle fonctionnalité. Elle sert de point de départ à la revue avec le DPO et alimentera la **synthèse conformité** du module 08 (capstone).

> ⚠️ Cette matrice est un **outil de dialogue** dev ↔ juriste/DPO, pas une preuve de conformité. La conformité réelle se valide avec un expert.

---

## Sources officielles (à consulter, jamais à figer en article/seuil)

- RGPD — **cnil.fr** (comprendre le RGPD, principes, droits des personnes)
- DSA — **digital-strategy.ec.europa.eu** (Digital Services Act)
- AI Act — **digital-strategy.ec.europa.eu** (regulatory framework on AI)
- RGAA — **accessibilite.numerique.gouv.fr**
