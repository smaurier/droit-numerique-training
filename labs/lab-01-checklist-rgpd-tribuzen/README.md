# Lab 01 — De zéro : checklist RGPD appliquée à TribuZen (DPIA, privacy by default)

> **Outcome :** à la fin, le VRAI formulaire d'inscription TribuZen (module 01 §3, Exemple 1
> — adultes, mineurs, données de santé, photos) est classé champ par champ : base légale
> proposée, données Art. 9 isolées et déclenchant une DPIA, incertitudes remontées au
> juriste — jamais tranchées seul (piège #5). Plus le privacy-by-default sur les albums
> photo (Exemple 2).
> **Vrai geste :** le code PROPOSE et REMONTE, il ne décide jamais seul d'une base légale ou
> d'une qualification de donnée sensible — exactement le rôle du développeur en pratique.
> **Feedback :** `npm run lab:01` — RED tant que `src/registreTraitements.ts` ne satisfait
> pas l'oracle (30 tests, dont un test au niveau des TYPES). `npm run solution:01` prouve
> l'oracle.

## Prérequis technique

```bash
cd 23-droit-numerique/labs
npm install
```

## Lire avant (une lecture bornée)

- Module [`01-rgpd-reflexes-developpeur.md`](../../modules/01-rgpd-reflexes-developpeur.md) —
  **la source de vérité de ce lab.** §2.4 (bases légales), §2.8 (privacy by design/by
  default), §3 Exemple 1 (le tableau de classification EXACT que ce lab reproduit en code) et
  Exemple 2 (l'album photo), pièges #2, #3, #5.
- Module [`04-dpia-analyse-impact.md`](../../modules/04-dpia-analyse-impact.md) — pourquoi une
  donnée Art. 9 déclenche une DPIA.

## Énoncé

Lis les commentaires en tête de `src/registreTraitements.ts`. Implémente :

1. `classifierChamp` — les trois règles du module (Art. 9 → consentement explicite + DPIA ;
   nécessaire au service → contrat, sauf mineur qui reste remonté ; ni l'un ni l'autre →
   consentement, toujours remonté).
2. `proposerRegistre` — applique la classification à toute la liste de champs.
3. `creerAlbumPhoto` / `partagerAlbum` — privacy by default : la création n'accepte MÊME PAS
   de paramètre de visibilité, l'élargissement est un geste séparé et explicite.

**Le piège à éviter.** Le dev **propose et documente**, il n'a pas autorité pour **valider**
une base légale (piège #5, module 01). Le champ `aRemonterAuJuriste` n'est pas un détail :
c'est la différence entre un registre honnête et un registre qui fait semblant de trancher
des questions juridiques à la place du DPO.

## Étapes (en friction)

1. `npm run lab:01` : RED.
2. `classifierChamp` : les trois branches, dans l'ordre — Art.9 d'abord (le cas le plus
   contraignant l'emporte), puis nécessaire/non nécessaire.
3. `proposerRegistre` : un simple `.map`.
4. `creerAlbumPhoto` : ne prend JAMAIS `visibility` en paramètre — le type l'empêche.
5. `partagerAlbum` : retourne un NOUVEL objet, ne mute jamais l'original.

## Vérifier

```bash
cd 23-droit-numerique/labs
npm run lab:01
npm run solution:01
```

**Ce que l'oracle vérifie (30 tests)**

`classifierChamp` reproduit EXACTEMENT le tableau du module (email, mot de passe, prénom
parent/enfant, date de naissance enfant, allergies, photo famille — la date de naissance
COMPLÈTE du parent n'y figure pas : la minimisation l'a déjà supprimée, remplacée par
`isAdult`). Piège #2 : une donnée non objectivement nécessaire n'a jamais la base contrat.
Piège #5 : Art.9 et mineur sont TOUJOURS remontés, un champ adulte/routine ne l'est pas.
`proposerRegistre` préserve l'ordre. `creerAlbumPhoto` : toujours `PRIVATE`, et un test au
niveau des **types** (`@ts-expect-error`) prouve qu'on ne peut même pas essayer de passer
`visibility` à la création. `partagerAlbum` : immutabilité (nouvel objet, original intact).

## Variante J+30 (fading)

Ajoute un champ `dureeDeConservationJours` à `ClassificationChamp`, calculé selon la
finalité (données de facturation : 10 ans légal ; données marketing : 3 ans après le dernier
contact) — et vérifie que le calcul, comme tout le reste, reste une PROPOSITION à faire
valider, jamais une durée appliquée automatiquement sans revue.

## Application TribuZen

Même geste sur le VRAI `docs/registre-traitements.md` de `tribuzen-api`, généré à partir de
ce module puis relu par un juriste avant publication — jamais publié tel quel. Commit :
`docs(rgpd): registre de traitements proposé pour le formulaire d'inscription`.
