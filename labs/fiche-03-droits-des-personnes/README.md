<!-- FLAG-REVIEW: droit/légal — valider par Sylvain + juriste avant diffusion publique -->

# Lab 03 — Concevoir « supprimer mon compte » + « exporter mes données » (TribuZen)

> **Outcome :** à la fin, tu sais **concevoir** (analyse + pseudo-conception) un parcours de suppression de compte en cascade et un parcours d'export de données conformes aux droits des personnes RGPD — en identifiant le périmètre, l'ordre des opérations, ce qu'on supprime vs anonymise, et ce qu'on renvoie au juriste/DPO.
> **Vrai outil :** aucun code exécutable requis. Livrables = **documents de conception** (schéma de périmètre, pseudo-code, tableau de décision suppression/anonymisation, note « à valider par le juriste »). Papier, Markdown ou tableur — pas de harnais, pas de test-runner.
> **Feedback :** le coach valide la conception en session (grille ci-dessous). Pas d'auto-correcteur.
>
> ⚠️ **Ceci n'est pas un conseil juridique.** Ce lab entraîne un **réflexe de conception dev**. Les décisions juridiques (ce qu'on doit conserver, le délai exact, la formulation d'un refus) reviennent à un **juriste / DPO**. Source qui fait foi pour les droits et délais : **[cnil.fr — Les droits pour maîtriser vos données personnelles](https://www.cnil.fr/fr/les-droits-pour-maitriser-vos-donnees-personnelles)**. Le droit évolue.

---

## Contexte

Rappel du ticket (module 03, §1) :

> « Nous quittons l'application. Merci de **supprimer notre compte** et **toutes nos données, surtout les photos de nos enfants**. Envoyez-nous **une copie de tout** avant. — La famille Diallo »

TribuZen stocke, pour cette famille :

- **Base principale** : `users`, `families`, `children`, `routines`, `journal_entries`, `invoices`.
- **Stockage objet** (bucket) : photos de profil, **photos des enfants**.
- **Systèmes tiers** : Stripe (abonnement), un index de recherche, un cache.
- **Contrainte connue** : les **factures** sont soumises à une obligation légale de conservation.

---

## Énoncé

Produis **quatre livrables de conception** (pas de code de production complet — de la pseudo-conception).

### Livrable A — Cartographie du périmètre

Liste **tous les lieux** où vivent des données de la famille Diallo (tables, bucket, tiers, sauvegardes, caches, index). Pour chacun : *quelle donnée, sensible ou non, mineur concerné ou non*.

### Livrable B — Parcours « exporter mes données »

Conçois l'endpoint d'export (pseudo-code). Il doit :
- couvrir **tout** le périmètre du livrable A ;
- produire un **format structuré lisible par machine** (JSON/CSV) ;
- **séparer** les rubriques « données fournies par la personne » (portabilité) et « données dérivées / reçues de tiers » (accès seul) ;
- décrire la **livraison sécurisée** (comment le fichier arrive à la personne sans fuite).

### Livrable C — Parcours « supprimer mon compte »

Conçois la suppression en cascade (pseudo-code **ordonné**). Il doit :
- traiter les **effets externes** (Stripe) et le **stockage objet** (photos enfants), pas seulement la base ;
- ordonner la cascade (des feuilles vers la racine) ;
- **isoler les factures** en anonymisation, pas suppression ;
- prévoir la **traçabilité** (journal de l'opération pour l'accountability).

### Livrable D — Tableau de décision suppression / anonymisation + note juriste

Pour **chaque** catégorie de donnée du livrable A : **supprimer** ou **anonymiser** ? + justification en une ligne. Termine par une **note « À faire valider par le juriste/DPO »** listant tout ce qui n'est **pas** une décision de dev (périmètre exact, délai, données à conserver, refus éventuel, niveau de vérification d'identité).

---

## Étapes (en friction)

1. **Ne code rien tout de suite.** Commence par le livrable A à la main : ouvre le graphe de données et traque *chaque* endroit — le piège n°1 est d'oublier le bucket.
2. **Vérification d'identité en premier** dans les deux parcours : écris explicitement l'étape « authentifier le demandeur avant d'agir ».
3. **Export avant suppression** : la famille veut la copie *avant*. Ordonne les deux parcours en conséquence.
4. **Sépare accès et portabilité** dans le livrable B : deux rubriques distinctes, pas un dump indifférencié.
5. **Ordonne la cascade** dans le livrable C : écris l'ordre feuilles → racine et justifie-le (clés étrangères).
6. **Marque chaque décision juridique** que tu *n'as pas* le droit de trancher seul avec un tag `[JURISTE]` dans le livrable D.
7. **Relis contre le délai** : ta conception rend-elle l'opération faisable dans l'ordre de grandeur d'~1 mois sans extraction manuelle géante ?

---

## Grille d'évaluation (le coach valide en session)

| Critère | Attendu | OK ? |
|---|---|---|
| Périmètre exhaustif | Base **+ stockage objet (photos enfants) + tiers + caches/index** listés | ☐ |
| Vérification d'identité | Présente et **avant** toute action, dans les deux parcours | ☐ |
| Ordre export→suppression | Export livré avant l'effacement | ☐ |
| Accès vs portabilité | Rubriques **séparées** dans l'export | ☐ |
| Cascade ordonnée | Feuilles → racine, stockage objet purgé, Stripe annulé | ☐ |
| Factures | **Anonymisées**, pas supprimées, avec justification | ☐ |
| Anonymisation vraie | Distinction anonymisation (irréversible) / pseudonymisation posée | ☐ |
| Données de mineurs | Photos enfants explicitement traitées (export + purge bucket) | ☐ |
| Traçabilité | Journalisation de l'opération prévue (accountability) | ☐ |
| Frontière dev/juriste | Décisions juridiques taguées `[JURISTE]`, pas tranchées par le dev | ☐ |
| Délai | Conception réaliste dans l'ordre de grandeur, renvoi à cnil.fr | ☐ |

**Seuil :** une conception « bonne » coche périmètre exhaustif, cascade ordonnée + stockage objet, factures anonymisées, et frontière dev/juriste. Les manquer = à retravailler.

---

## Coach — points de relance (≥ 3)

Le coach **ne donne pas la réponse** ; il relance :

1. **« Où sont les photos des enfants, exactement ? »** — si le stagiaire n'a listé que des tables SQL, le bucket manque : la suppression sera incomplète et une photo d'enfant traînera. Faire retrouver le lieu de stockage objet.
2. **« Cet email de demande, il vient de qui ? »** — pousser à insérer la **vérification d'identité** avant toute action. Que se passe-t-il si c'est un ex-conjoint mal intentionné ?
3. **« Tu supprimes la facture. Le comptable est d'accord ? »** — amener à découvrir l'**obligation de conservation** et le basculement suppression → **anonymisation**.
4. **« Ton `user_8f3a`, tu peux remonter au vrai nom ? »** — si oui, ce n'est **pas** de l'anonymisation mais de la **pseudonymisation** : la donnée reste personnelle.
5. **« Cette décision-là (garder / refuser / délai), c'est toi qui la prends ? »** — ramener à la **frontière dev/juriste** : le dev outille, le DPO tranche. Faire ajouter le tag `[JURISTE]`.
6. **« Combien de temps met ta procédure si tu la lances aujourd'hui ? »** — confronter à l'**ordre de grandeur du délai** et au risque d'une extraction manuelle non tenable.

---

## Variante J+30 (fading)

Reprends l'exercice **de mémoire, sans rouvrir le module 03**, en **30 minutes**, avec **une contrainte ajoutée** :

> La famille ne veut plus supprimer **tout** le compte : elle exerce un **droit d'opposition ciblé** — « arrêtez d'utiliser nos données pour les **suggestions de routines par IA**, mais **on garde le compte** ».

Conçois ce que ça change :
- Pas de suppression de compte : il faut un **flag de consentement / opt-out** par finalité.
- Quelles données cesse-t-on d'utiliser (et non de stocker) ? Quelle différence entre **opposition** (arrêter un usage) et **limitation** (geler) et **effacement** (supprimer) ?
- Où, dans la conception, se branche ce flag pour que la finalité « suggestions IA » soit réellement désactivée ?

**Critère de réussite :** tu distingues clairement opposition / limitation / effacement et tu places le flag de finalité au bon endroit — sans transformer un opt-out en suppression de compte.

---

## Application TribuZen

Dans `smaurier/tribuzen`, ces parcours se matérialisent côté API :

```
tribuzen-api/
  src/
    me/
      me.controller.ts            ← GET /me/export, DELETE /me
      account-deletion.service.ts ← cascade base + purge bucket + Stripe + anonymisation factures
      data-export.service.ts      ← agrégation du périmètre, rubriques accès/portabilité
    consent/
      consent.service.ts          ← flags d'opposition par finalité (variante J+30)
```

> ⚠️ Avant toute mise en production : **faire valider par un juriste/DPO** le périmètre exact de l'export, la liste des données à conserver, le délai de réponse et le niveau de vérification d'identité. Ce lab produit une **conception dev**, pas une conformité juridique.

**Commit cible (quand la conception sera implémentée, hors lab) :**
```
feat(me): export de données + suppression de compte en cascade (droits des personnes)
```
