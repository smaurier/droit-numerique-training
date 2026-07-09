<!-- FLAG-REVIEW: droit/légal — valider par Sylvain + juriste avant diffusion publique -->

# Lab 06 — CGU, mentions légales et obligations de plateforme

> **⚠️ Ceci n'est PAS un conseil juridique.** Cet exercice entraîne un **réflexe de développeur** : savoir dresser la liste des documents légaux d'un service, repérer les catégories d'informations obligatoires, et identifier les dispositifs de plateforme à prévoir. Ce que tu produiras (liste de mentions, points DSA / mineurs) est une **proposition à faire valider par un juriste**. Les catégories et obligations évoquées ne forment **pas une liste exhaustive figée** et évoluent. Les sources qui font foi sont **[entreprendre.service-public.gouv.fr](https://entreprendre.service-public.gouv.fr/vosdroits/F31228)** (mentions légales), **[digital-strategy.ec.europa.eu](https://digital-strategy.ec.europa.eu/en/policies/digital-services-act)** (DSA) et **[cnil.fr](https://www.cnil.fr)** (données).

> **Outcome :** à la fin, tu sais **dresser la liste des mentions légales obligatoires** d'un service, **distinguer les quatre documents légaux**, et **identifier les points DSA + protection des mineurs** applicables à une plateforme qui héberge du contenu utilisateur, en distinguant ce que le dev implémente de ce qu'il remonte.
> **Vrai outil :** un document d'analyse (Markdown, Notion ou Google Doc) — c'est le format réel d'une note de cadrage juridique de projet. Aucun code, aucun harnais.
> **Feedback :** le coach valide en session (grille ci-dessous). Pas d'auto-correcteur.

---

## Énoncé

TribuZen ouvre en beta publique. Tu dois produire une **note de cadrage des pages légales et des obligations de plateforme**, à remettre au juriste pour rédaction/validation. Rappel du contexte : TribuZen permet à des familles de **partager des albums photo**, de **publier des messages** dans un fil commun et d'**inviter d'autres familles**. Des adultes **et des enfants** y publient et y apparaissent. Une offre payante « Premium » est prévue.

### Ta production (README-only, aucun code)

**Livrable A — Cartographie des documents.** Un tableau qui liste les **quatre documents** attendus, ce que chacun couvre pour TribuZen, et **qui le rédige / le valide** (dev, éditeur, DPO, juriste).

| Document | Ce qu'il couvre pour TribuZen | Rédige / valide | À l'URL |
|---|---|---|---|

**Livrable B — Liste des mentions légales obligatoires.** Dresse la **liste par catégories** des informations que devra contenir la page `/mentions-legales` de TribuZen (éditeur, hébergeur, contact, directeur de publication…). Pour chaque catégorie, note si l'info est connue ou **à réclamer** à l'éditeur. Termine par la mention « liste **non exhaustive**, à valider — source service-public.fr ».

**Livrable C — Points DSA + mineurs.** Une courte note (8 à 12 lignes) qui identifie :
1. Les **dispositifs de plateforme** à prévoir dès la beta (signalement de contenu, transparence de la modération) et ce que le dev implémente concrètement.
2. Les **points de protection des mineurs** applicables (pas de pub ciblée, réglages protecteurs par défaut, zones grises).
3. Au moins **une incertitude** que tu remontes explicitement au juriste (ex. qualification DSA exacte de TribuZen, régime du contenu publié par un enfant).

---

## Étapes (en friction)

1. **Sépare les quatre documents** — ne fusionne pas CGU et confidentialité. Nomme l'objet précis de chacun.
2. **Trace la frontière rédaction** — pour chaque document, qui tient la plume (le juriste rédige les CGU/CGV ; le dev n'improvise pas).
3. **Liste les mentions légales par catégorie** — relis les catégories service-public.fr avant de trancher. N'invente pas d'obligation, ne présente pas ta liste comme exhaustive.
4. **Distingue « hébergeur » et « plateforme »** — l'hébergeur des mentions légales (prestataire technique) n'est pas l'obligation DSA (TribuZen héberge le contenu des familles).
5. **Décris le socle DSA** — un signalement facile du contenu illicite, une modération transparente (décision motivée, contestation). Précise ce que le dev code vs ce que le juriste qualifie.
6. **Applique la protection des mineurs** — traduis les principes en réglages par défaut protecteurs ; ne traite pas le contenu des enfants comme celui des adultes.
7. **Marque ce qui se remonte** — toute qualification (périmètre DSA, régime mineurs), tout texte (CGU/CGV) porte la mention « à valider juriste ».

> Contrainte : tu ne tranches **seul** que ce qui relève du dev (pages à construire, dispositifs à implémenter, défauts protecteurs). Tout le reste porte « à valider juriste ».

---

## Grille d'évaluation (le coach valide en session)

| Critère | Attendu | ✓/✗ |
|---|---|---|
| **Quatre documents distincts** | mentions légales / CGU / CGV / confidentialité séparés, chacun avec son objet et son URL | |
| **Frontière rédaction** | CGU/CGV attribuées au juriste ; mentions légales relues juriste ; le dev ne « rédige » pas le droit | |
| **Mentions légales** | catégories citées (éditeur, hébergeur, contact, directeur de publication) ; liste présentée comme **non exhaustive**, renvoi service-public.fr | |
| **Hébergeur ≠ plateforme** | distinction faite entre l'hébergeur (mentions légales) et l'obligation DSA (héberger le contenu des utilisateurs) | |
| **Socle DSA** | signalement de contenu illicite **et** transparence de la modération (décision motivée + contestation) identifiés | |
| **Gradation DSA** | conscience que les obligations sont graduées ; qualification exacte de TribuZen remontée au juriste | |
| **Mineurs** | pas de pub ciblée + réglages protecteurs par défaut + prudence visibilité, appliqués aux enfants | |
| **Frontière dev/juriste** | ≥ 1 incertitude explicitement remontée ; aucun seuil/délai présenté comme figé | |

Réussite = tous les critères cochés **et** au moins une incertitude honnêtement remontée plutôt que tranchée en force.

---

## Coach — relances de session (≥ 3)

Le coach ne corrige pas ligne à ligne : il **fait raisonner**. Trois relances minimum :

1. **« Ce document, c'est toi qui le rédiges ou le juriste ? »** — sur les CGU/CGV. Objectif : que Sylvain place la frontière rédaction lui-même, au lieu de coller un template. Creuser : que se passe-t-il si une clause du template est abusive ?
2. **« Quand tu dis "hébergeur", tu parles de quoi ? »** — forcer la distinction entre l'hébergeur des mentions légales (le prestataire technique) et l'obligation DSA (TribuZen héberge le contenu des familles). Deux notions, un même mot.
3. **« Un enfant publie dans le fil commun : c'est le même traitement qu'un adulte ? »** — faire émerger la protection renforcée (pas de ciblage, défaut protecteur) et repérer la zone grise à remonter (validation parentale ?).

(Relance bonus si le temps le permet : **« TribuZen est petit : le DSA le concerne quand même ? »** — vérifier que le socle signalement/transparence n'est pas écarté au prétexte de la taille, et que la qualification exacte est remontée au juriste.)

---

## Variante J+30 (fading)

Refais la note de cadrage **de mémoire, en 25 minutes**, sans rouvrir le module ni ce corrigé, avec **deux ajouts** :

1. TribuZen ouvre les **invitations entre familles** : un contenu peut désormais être vu par des personnes hors du foyer. Ajoute à ta note DSA le **dispositif de signalement** vu par un tiers et le **réglage de visibilité par défaut** que tu imposes (by default).
2. Rédige la **phrase exacte** que tu enverrais au juriste pour lever **une** incertitude de qualification (ex. « TribuZen est-il une "plateforme en ligne" au sens du DSA, et quels seuils s'appliquent ? »).

**Critère de réussite :** l'ouverture aux tiers déclenche un réglage **protecteur par défaut** (pas de partage large automatique), le bouton « Signaler » reste accessible au tiers, et ta question au juriste est **précise et actionnable**.

---

## Application TribuZen

Ce lab produit la **note de cadrage légal** de TribuZen avant beta publique. Dans le repo `smaurier/tribuzen`, elle se matérialise ainsi :

```
tribuzen/
  docs/
    cadrage-legal.md          ← Livrables A + B + C (à remettre au juriste)
  src/
    pages/
      legal/                  ← mentions-legales, cgu (textes fournis par le juriste)
    moderation/
      report/                 ← dispositif de signalement (DSA)
      decision/               ← messages de modération + contestation (DSA)
```

Cette note pilote ensuite des choix de code réels :
- elle liste les pages `/legal/*` à construire et l'info à réclamer à l'éditeur pour les mentions légales ;
- elle ouvre le chantier des **dispositifs DSA** (signalement, transparence de la modération) ;
- elle fixe les **défauts protecteurs** pour les mineurs (visibilité privée, pas de ciblage).

**Ce qui reste hors périmètre du dev** : la rédaction des CGU/CGV, la validation des mentions légales et la qualification DSA / mineurs reviennent au **juriste**. Le lab t'entraîne à préparer un cadrage *défendable*, pas à signer le droit.

**Commit cible :**
```
docs(legal): cadrage TribuZen — mentions légales, CGU/CGV, socle DSA, protection mineurs
```
