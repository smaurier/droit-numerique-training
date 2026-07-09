<!-- FLAG-REVIEW: droit/légal — valider par Sylvain + juriste avant diffusion publique -->

# Lab 02 — Consentement, cookies et traceurs

> **⚠️ Ceci n'est pas un conseil juridique.** Ce lab est un exercice de **réflexe développeur** : auditer des traceurs et concevoir un bandeau alignés sur des principes. Les décisions de conformité (finalités retenues, durées, statut d'exemption, texte juridique, cookie wall) reviennent à un **juriste/DPO**. La source qui fait foi est **[cnil.fr](https://www.cnil.fr/fr/cookies-et-autres-traceurs)**, pas ce document. Aucun élément ci-dessous n'est une règle figée à appliquer sans validation.

> **Outcome :** à la fin, tu sais auditer une liste de traceurs (exempté / soumis à consentement), repérer ce qui casse un consentement, et concevoir sur le papier un bandeau cookies aligné sur les recommandations CNIL — en sachant ce que tu dois faire remonter au juriste.
> **Vrai outil :** l'analyse elle-même (grille de conformité + maquette de bandeau en texte/wireframe). Pas de harnais, pas de test-runner. C'est un lab **juridique / conception**, pas un lab de code.
> **Feedback :** le coach valide en session (grille ci-dessous). Pas d'auto-correcteur.

---

## Énoncé

Le PO de TribuZen te transmet la liste des traceurs présents sur l'app en bêta, plus une maquette de bandeau fournie par un prestataire. On te demande : *« Dis-nous si c'est conforme, et sinon corrige. »*

### Partie A — Auditer les traceurs

Voici les traceurs embarqués (données de départ — à recopier dans ton analyse) :

| # | Traceur | Ce qu'il fait | Déposé quand ? |
|---|---|---|---|
| 1 | `tz_session` (cookie) | garde l'utilisateur connecté | au login |
| 2 | `tz_lang` (localStorage) | mémorise la langue FR/EN choisie | au choix de langue |
| 3 | Google Analytics (config par défaut) | statistiques de visites | au chargement de la page |
| 4 | Pixel Meta (Facebook) | reciblage publicitaire | au chargement de la page |
| 5 | Bouton de partage X/Twitter (tracant) | partage + mesure | au chargement de la page |
| 6 | `tz_cart` (cookie) | mémorise l'abonnement en cours de souscription | à l'ajout au panier |

**Ta tâche :** pour chaque traceur, produire une ligne de décision : **exempté** / **soumis à consentement** / **à faire trancher par le DPO**, avec une **justification en une phrase** (la finalité). Puis lister **les traceurs qui ne devraient PAS être déposés « au chargement »** en l'état.

### Partie B — Concevoir un bandeau conforme

À partir de la maquette non conforme du prestataire ci-dessous, tu conçois une version alignée sur les recommandations CNIL. **Livrable = un wireframe texte + une note de 5 lignes** expliquant en quoi ta version corrige les défauts (pas de code de production ; un pseudo-wireframe suffit).

Maquette non conforme fournie :

```text
┌────────────────────────────────────────────────┐
│ Ce site utilise des cookies pour améliorer      │
│ votre expérience. En poursuivant votre          │
│ navigation, vous les acceptez.      [ OK ]      │
└────────────────────────────────────────────────┘
```

### Partie C — La note au juriste

Rédige une **courte liste (3 à 5 points) de ce que tu fais remonter au DPO/juriste** avant mise en ligne — c'est-à-dire ce que **tu ne décides pas seul** en tant que développeur.

**Pas de gap-fill, pas de code lourd.** Tu produis trois livrables papier : tableau d'audit (A), wireframe + note (B), liste de remontées (C).

---

## Étapes (en friction)

1. **Classe chaque traceur (A)** à la seule lumière de sa **finalité**. Résiste au réflexe « analytics = OK » : confronte-le au §2.2 du module.
2. **Isole les traceurs déposés « au chargement » qui ne devraient pas l'être** avant consentement. Explique la conséquence (violation art. 82).
3. **Diagnostique la maquette (B)** avec la grille libre / spécifique / éclairé / univoque : nomme *chaque* qualité cassée.
4. **Dessine ton bandeau** : place les boutons refuser/accepter au même niveau, ajoute la granularité par finalité, et un point d'entrée « Gérer mes choix » persistant.
5. **Écris ta note au juriste (C)** : distingue ce qui est une décision technique de ce qui est une décision juridique.
6. **Relis-toi contre une seule question :** « ai-je présenté une durée / un seuil / une règle comme absolue ? » Si oui, reformule en principe + renvoi cnil.fr.

---

## Corrigé complet commenté

> Corrigé de **référence pédagogique**, pas un avis juridique. Un juriste pourrait nuancer selon le contexte réel de TribuZen.

### Partie A — Audit des traceurs

| # | Traceur | Verdict | Justification (finalité) |
|---|---|---|---|
| 1 | `tz_session` | **Exempté** | authentification, strictement nécessaire au service demandé |
| 2 | `tz_lang` | **Exempté** | personnalisation d'interface demandée par l'utilisateur (langue) |
| 3 | Google Analytics (défaut) | **Soumis à consentement** (à faire trancher DPO) | mesure d'audience tierce ; exemptée seulement si conditions strictes CNIL réunies — non démontré ici |
| 4 | Pixel Meta | **Soumis à consentement** | publicité personnalisée / reciblage |
| 5 | Bouton partage X traçant | **Soumis à consentement** | bouton réseau social qui trace |
| 6 | `tz_cart` | **Exempté** | mémorisation du panier, nécessaire à la souscription |

**Traceurs à NE PAS déposer « au chargement » en l'état :** #3 (GA), #4 (Pixel Meta), #5 (bouton X). Les déposer avant tout choix de l'utilisateur viole le principe « rien avant le consentement » (art. 82 loi Informatique et Libertés). Ils doivent être chargés **conditionnellement**, après un consentement actif et spécifique.

**Commentaire :** l'erreur classique serait de classer GA « exempté » d'office. Correct : soumis à consentement **par défaut**, exemption à démontrer avec le DPO en confrontant la config réelle à la liste CNIL. Le dev signale, le DPO tranche.

### Partie B — Bandeau conforme

**Diagnostic de la maquette fournie :**

- **Univoque cassé** — « en poursuivant votre navigation vous les acceptez » : pas d'acte positif clair.
- **Libre cassé** — un seul bouton « OK », aucun refus au même niveau.
- **Spécifique cassé** — aucune granularité par finalité.
- **« Rien avant le choix » violé** si GA/Pixel/X se chargent à l'affichage du bandeau.

**Wireframe corrigé :**

```text
┌──────────────────────────────────────────────────────────────┐
│ TribuZen utilise des traceurs pour la mesure d'audience, la   │
│ publicité et le partage social. Le service fonctionne sans    │
│ aucun de ces traceurs.                                        │
│                                                              │
│ [ Tout refuser ]     [ Personnaliser ]     [ Tout accepter ]  │
│                                                              │
│ Politique traceurs · Gérer mes choix (accessible à tout       │
│ moment depuis le pied de page)                                │
└──────────────────────────────────────────────────────────────┘

Écran « Personnaliser » : un interrupteur par finalité,
tous OFF par défaut —
   [ ] Mesure d'audience   [ ] Publicité   [ ] Partage social
   ( [ Enregistrer mes choix ] )
```

**Note (5 lignes) — pourquoi c'est conforme :**
1. Refuser est **aussi simple** qu'accepter : « Tout refuser » et « Tout accepter » au même niveau, premier écran.
2. **Granularité** par finalité via « Personnaliser », interrupteurs **OFF par défaut** (pas de case pré-cochée).
3. **Rien n'est déposé** avant un clic actif — les scripts marketing sont chargés conditionnellement.
4. **Retrait** garanti par « Gérer mes choix » persistant en pied de page.
5. **Information claire et par couches** : message court + politique détaillée accessible.

### Partie C — Note au juriste (ce que le dev ne décide pas seul)

1. La **liste exacte des finalités** et le texte juridique du bandeau et de la politique traceurs.
2. Le statut d'**exemption de Google Analytics** (config réelle vs conditions strictes CNIL).
3. Les **durées** : conservation du choix, durée de vie des traceurs, durée de conservation de la preuve de consentement.
4. L'opportunité éventuelle d'un **cookie wall** (appréciation au cas par cas — décision juridique).
5. Le format et la base légale du **registre des consentements** (la preuve est elle-même un traitement).

**Pourquoi ce corrigé est correct :** il classe par finalité (pas par techno), refuse le piège « analytics exempté », rend le bandeau conforme aux principes CNIL sans inventer de durée chiffrée, et sépare nettement décision technique (implémentation, chargement conditionnel) et décision juridique (finalités, durées, exemptions, cookie wall). Rien n'y est présenté comme une règle absolue : tout renvoie à cnil.fr et au juriste.

---

## Variante J+30 (fading)

**Même exercice, contrainte ajoutée — en 25 minutes, sans rouvrir le module ni ce corrigé :**

Le PO ajoute deux traceurs et une exigence :

1. Un **SDK de test A/B tiers** (mesure de conversion, recoupe les visites).
2. Un cookie de **prévention de la fraude au paiement**.
3. Le PO veut que le bandeau soit **traduit en anglais** pour la bêta internationale — et il demande : *« Est-ce que la version anglaise change quelque chose côté conformité ? »*

**Attendu :** classer les deux nouveaux traceurs (fraude → exempté ; A/B tiers → soumis à consentement), et répondre au PO que la **langue ne change pas** les principes RGPD/CNIL mais que l'information doit être **compréhensible par l'utilisateur** dans la langue servie (donc bandeau localisé). Signaler que la conformité hors UE peut soulever d'autres questions → à faire remonter au juriste.

**Critère de réussite :** aucune règle présentée comme absolue, chaque verdict justifié par la finalité, et la séparation dev/juriste tenue.

---

## Application TribuZen

Dans le repo `smaurier/tribuzen`, cet audit se matérialise ici :

```text
tribuzen/
  src/
    components/
      consent/
        CookieBanner.vue        ← wireframe de la Partie B, en vrai composant
        ConsentManager.ts       ← chargement conditionnel des scripts marketing
    server/
      consent/
        consent-log.ts          ← registre des consentements (preuve, durée définie avec DPO)
  docs/
    conformite/
      audit-traceurs.md         ← le tableau de la Partie A, tenu à jour
```

**Différences avec le lab :**

- Ici tu produis une **analyse papier** ; dans le produit, `CookieBanner.vue` implémente réellement le refus aussi simple que l'acceptation et le chargement conditionnel.
- Le tableau d'audit devient un **document de conformité vivant** (`audit-traceurs.md`), relu à chaque ajout de traceur.
- Les décisions laissées « au juriste » dans la Partie C doivent être **effectivement tranchées** avant mise en production — le dev garde une trace de ces validations.

**Commit cible :**
```
docs(conformite): audit traceurs TribuZen + specs bandeau conforme CNIL (à valider juriste)
```
