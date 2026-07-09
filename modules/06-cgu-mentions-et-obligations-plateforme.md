---
titre: "CGU, mentions légales et obligations de plateforme"
cours: 23-droit-numerique
notions: ["mentions légales obligatoires (éditeur, hébergeur, contact)", "CGU vs CGV", "politique de confidentialité", "loi LCEN", "DSA (Digital Services Act)", "signalement de contenu illicite", "transparence de la modération", "obligations des plateformes en ligne", "protection des mineurs en ligne", "clauses abusives", "frontière dev / juriste"]
outcomes:
  - "sait nommer les catégories d'informations obligatoires d'une page mentions légales (éditeur, hébergeur, contact)"
  - "sait distinguer CGU, CGV, mentions légales et politique de confidentialité, et ce que chacun couvre"
  - "sait citer les grands principes d'obligations d'une plateforme au titre du DSA (signalement, transparence, modération)"
  - "sait identifier les points de vigilance renforcée pour la protection des mineurs en ligne"
  - "sait distinguer ce que le dev implémente de ce qu'un juriste doit rédiger et valider"
prerequis: ["00-introduction-au-droit-du-numerique", "01-rgpd-reflexes-developpeur", "02-consentement-cookies-et-traceurs", "03-droits-des-personnes", "04-dpia-analyse-impact", "05-dpa-et-sous-traitants"]
next: 07-propriete-intellectuelle-et-licences
libs: []
tribuzen: "pages légales de TribuZen (mentions légales, CGU, politique de confidentialité) + dispositifs DSA (signalement de contenu, transparence de la modération) et protection renforcée des enfants sur la plateforme"
last-reviewed: 2026-07
---

<!-- FLAG-REVIEW: droit/légal — valider par Sylvain + juriste avant diffusion publique -->

> **⚠️ Ceci n'est PAS un conseil juridique.** Ce module donne des **principes et des réflexes de développeur** pour comprendre les documents légaux d'un service en ligne et dialoguer avec les bonnes personnes. Il ne remplace pas l'analyse d'un **juriste ou d'un avocat**. La rédaction et la validation des CGU, CGV, mentions légales et politique de confidentialité, ainsi que la qualification des obligations DSA d'une plateforme, relèvent d'un **expert**. Les catégories d'informations, régimes et obligations évoqués sont des **principes** : ils ne forment pas une liste exhaustive et figée, le droit évolue. Les sources qui font foi sont **[service-public.fr / entreprendre.service-public.gouv.fr](https://entreprendre.service-public.gouv.fr)** (mentions légales, obligations), **[digital-strategy.ec.europa.eu](https://digital-strategy.ec.europa.eu/en/policies/digital-services-act)** (DSA) et **[cnil.fr](https://www.cnil.fr)** (données personnelles).

# CGU, mentions légales et obligations de plateforme

> **Outcomes — tu sauras FAIRE :** nommer les catégories d'informations obligatoires d'une page mentions légales, distinguer CGU / CGV / mentions légales / politique de confidentialité, citer les grands principes des obligations DSA d'une plateforme, et repérer les points de vigilance mineurs.
> **Difficulté :** :star::star::star:

## 1. Cas concret d'abord

TribuZen, l'app d'organisation familiale, s'apprête à ouvrir en beta publique. Le product owner te confie le footer et te demande de « brancher les pages légales » :

```
Footer TribuZen
  - Mentions légales   → /mentions-legales   (page vide à remplir)
  - CGU                → /cgu                (page vide à remplir)
  - Confidentialité    → /confidentialite    (renvoi RGPD)
  - Signaler un contenu → ?                  (rien de prévu)
```

TribuZen permet à des familles de **partager des albums photo**, de **publier des messages** dans un fil commun, et bientôt d'**inviter d'autres familles**. Des adultes **et des enfants** y publient du contenu.

Avant d'écrire la moindre ligne, **quatre questions** doivent te venir en réflexe :

1. **Qui doit apparaître dans les mentions légales ?** L'éditeur (celui qui publie le service), l'hébergeur, un contact — quelles catégories exactement ? (→ obligation LCEN)
2. **CGU, CGV, confidentialité : c'est la même chose ?** Non. Chacun couvre un périmètre distinct et n'est pas rédigé par la même personne. (→ distinguer les documents)
3. **Dès qu'on héberge du contenu d'utilisateurs, quelles obligations ai-je ?** Signalement de contenu illicite, transparence de la modération : ce sont des obligations de **plateforme** (DSA). (→ dispositifs à implémenter)
4. **Qu'est-ce qui n'est PAS ma décision ?** Le texte des CGU, la qualification de TribuZen au regard du DSA, le régime applicable aux mineurs : ça se **rédige et se valide avec un juriste**. Le dev *branche les dispositifs*, il ne *rédige pas le droit*.

Ce module te donne les réflexes pour répondre aux trois premières questions au niveau **principes** — et pour savoir où s'arrête la quatrième.

---

## 2. Théorie complète, concise

### 2.1 Quatre documents distincts, à ne pas confondre

Un service en ligne s'appuie sur plusieurs documents qui **ne se recouvrent pas** :

| Document | Ce qu'il couvre (principe) | Qui le rédige |
|---|---|---|
| **Mentions légales** | *Qui* édite et héberge le service : identité de l'éditeur, de l'hébergeur, contact. Obligation issue de la **loi LCEN**. | Souvent l'éditeur à partir d'un modèle officiel, relu juriste |
| **CGU** (Conditions Générales d'Utilisation) | Les *règles d'usage* du service : ce que l'utilisateur peut / ne peut pas faire, responsabilités, résiliation. | Juriste / avocat |
| **CGV** (Conditions Générales de Vente) | Les *conditions commerciales* dès qu'il y a **vente / abonnement payant** : prix, paiement, rétractation, garanties. | Juriste / avocat |
| **Politique de confidentialité** | Le *traitement des données personnelles* (RGPD, Art. 13/14) : finalités, bases légales, droits, sous-traitants. | Éditeur + DPO, relu juriste |

**Réflexe dev** : ces quatre pages sont **distinctes** et vivent chacune à leur URL. Ne pas fusionner « CGU » et « confidentialité » dans une seule page fourre-tout. La politique de confidentialité a déjà été traitée côté RGPD (modules 01 à 05) ; ce module se concentre sur **mentions légales**, **CGU/CGV** et **obligations de plateforme (DSA)**.

### 2.2 Mentions légales : les catégories obligatoires (loi LCEN)

En France, tout site professionnel doit afficher des **mentions légales facilement accessibles**. Selon service-public.fr, les informations obligatoires relèvent de **grandes catégories** :

- **Identité de l'éditeur** : dénomination / nom, adresse, immatriculation (RCS), numéro de TVA intracommunautaire le cas échéant.
- **Coordonnées de contact** : e-mail et téléphone permettant un contact effectif (pas seulement un formulaire opaque).
- **Hébergeur** : nom, adresse et contact de l'hébergeur du site.
- **Directeur de la publication** : la personne responsable du contenu publié.
- **Régimes particuliers** : pour les activités réglementées, informations supplémentaires (autorité de tutelle, etc.).

> **Principe, pas liste figée.** Le contenu exact dépend de la forme juridique (personne physique, société), de l'activité et évolue. La source qui fait foi est **[entreprendre.service-public.gouv.fr — mentions légales d'un site](https://entreprendre.service-public.gouv.fr/vosdroits/F31228)**. Le défaut de mentions légales est **sanctionné**. Le dev construit la page ; **le juriste valide** que rien ne manque.

**Réflexe dev** : une page `/mentions-legales`, **accessible depuis le footer de chaque page**, remplie à partir du modèle officiel puis relue.

### 2.3 CGU et CGV : usage vs vente

- **CGU** = les **règles du jeu** du service. Objet, conditions d'accès (dont un éventuel **âge minimum**), obligations de l'utilisateur, propriété intellectuelle, limitation de responsabilité dans les limites légales, suspension/résiliation, droit applicable, modalités de modification.
- **CGV** = tout ce qui touche à la **transaction** dès qu'il y a un paiement : caractéristiques et prix TTC, modalités de paiement, **droit de rétractation** du consommateur, garanties légales, médiation en cas de litige.

**Réflexe dev** : les CGU/CGV sont un **texte juridique rédigé par un juriste**, pas un document que le dev improvise à partir d'un template trouvé en ligne. Le dev intègre le texte fourni, gère l'**acceptation** (case à cocher, horodatage, versioning) et un **préavis de modification**. Il ne décide pas des clauses.

### 2.4 Clauses abusives : ce qu'un texte ne peut pas imposer

Certaines clauses sont **réputées non écrites** (nulles) même si l'utilisateur les a « acceptées ». En droit français, une clause qui crée un **déséquilibre significatif** au détriment du consommateur peut être écartée par le juge. Exemples de red flags fréquents :

- « Nous modifions les CGU sans préavis » → un préavis raisonnable est attendu.
- « Vous renoncez à tout recours » → une renonciation générale aux droits est fragile.
- « Nous transmettons vos données à nos partenaires » sans base ni information → **violation RGPD**.
- « Nous sommes propriétaires de tout contenu que vous créez » → à manier avec prudence (les souvenirs et photos d'une famille lui appartiennent).

**Réflexe dev** : si tu **repères** une clause de ce type dans un contrat SaaS que tu intègres (fournisseur, partenaire), tu la **signales**, tu ne la valides pas seul. La qualification « abusive » est **juridique**.

### 2.5 DSA : les obligations d'une plateforme qui héberge du contenu

Dès que TribuZen **héberge et diffuse du contenu créé par ses utilisateurs** (photos, messages, invitations), il entre dans le champ du **Digital Services Act (DSA)**, le règlement européen sur les services numériques. Le DSA impose des obligations **graduées selon la taille** de la plateforme. Les grands principes, selon la Commission européenne :

- **Mécanisme de signalement facile à utiliser** : les utilisateurs doivent pouvoir signaler simplement un contenu, un bien ou un service **illicite** ; la plateforme doit traiter ces signalements.
- **Transparence des décisions de modération** : quand un contenu est retiré ou un compte suspendu, la plateforme doit **expliquer sa décision** à la personne concernée, et prévoir une voie de **contestation / recours**.
- **Transparence de la publicité** : une publicité doit être identifiée comme telle, avec qui la finance et pourquoi elle est montrée à cet utilisateur.
- **Analyse et atténuation des risques** : les obligations les plus lourdes (analyse des risques systémiques) visent les **très grandes plateformes** (seuil élevé d'utilisateurs actifs dans l'UE). Une petite app comme TribuZen a des obligations **plus légères**, mais le **socle** signalement + transparence de la modération reste pertinent.

> **Principe, pas seuil figé.** L'exacte qualification de TribuZen (hébergeur ? plateforme en ligne ? seuils applicables ?) est une **analyse juridique**. Les seuils, catégories et régimes sont fixés par le règlement et évoluent. Source : **[digital-strategy.ec.europa.eu — Digital Services Act](https://digital-strategy.ec.europa.eu/en/policies/digital-services-act)**.

**Réflexe dev** : ce qui te revient, c'est **implémenter les dispositifs** — un bouton « Signaler ce contenu », un flux qui journalise le signalement, un message clair quand un contenu est retiré, une voie de contestation. Ce qui revient au juriste : dire **quelles** obligations s'appliquent réellement à TribuZen.

### 2.6 Protection des mineurs en ligne

Les enfants font l'objet d'une **protection renforcée**, à la croisée du RGPD (données de mineurs, vue au module 01) et du DSA. Grands principes côté DSA, selon la Commission :

- **Mesures pour réduire l'exposition** des mineurs à des contenus inadaptés à leur âge.
- **Interdiction de la publicité ciblée** dirigée vers les mineurs à partir de leurs données personnelles.
- **Prise en compte du bien-être et de la sécurité** des enfants dans la conception du service.

Pour TribuZen, où des **enfants publient et apparaissent** (photos, messages), cela oriente des **choix de conception** : pas de ciblage publicitaire sur les mineurs, réglages de visibilité protecteurs par défaut (rappel du *privacy by default*, module 01), prudence sur ce qu'un mineur peut rendre visible.

> **Principe.** Le régime précis applicable aux mineurs se **cadre avec un juriste**. Le dev traduit les principes en réglages par défaut protecteurs et signale les zones grises (ex. « un enfant peut-il publier dans le fil commun sans validation d'un parent ? »).

### 2.7 La frontière dev / juriste, appliquée aux pages légales

| Ce que le dev fait | Ce que le juriste fait |
|---|---|
| Construire la page `/mentions-legales` depuis le modèle officiel | Valider qu'aucune mention obligatoire ne manque |
| Intégrer le texte des CGU/CGV, gérer acceptation + versioning + préavis | **Rédiger** les CGU/CGV, qualifier les clauses |
| Implémenter le bouton « Signaler », le flux et les messages de modération | Dire quelles obligations DSA s'appliquent réellement |
| Coder des réglages protecteurs par défaut pour les mineurs | Cadrer le régime juridique applicable aux mineurs |

**Réflexe dev** : en cas de doute sur un **texte** ou une **qualification**, on ne devine pas, on **remonte**.

---

## 3. Worked examples

### Exemple 1 — Router les besoins TribuZen vers le bon document

Le PO liste des besoins en vrac. Le dev les **classe** dans le bon document (et repère qui doit trancher). **Ce tableau est une proposition de développeur, à faire valider par un juriste.**

| Besoin exprimé | Document concerné | Qui tranche |
|---|---|---|
| « Afficher qui édite l'app et où c'est hébergé » | Mentions légales | Éditeur + juriste valide |
| « Interdire la revente de compte, définir la résiliation » | CGU | Juriste rédige |
| « Gérer l'abonnement payant Premium, la rétractation » | CGV | Juriste rédige |
| « Expliquer ce qu'on fait des données de santé des enfants » | Politique de confidentialité | DPO + juriste |
| « Permettre de signaler une photo inappropriée » | Dispositif DSA (signalement) | Dev implémente, juriste qualifie |
| « Prévenir l'utilisateur quand on retire son message » | Dispositif DSA (transparence modération) | Dev implémente |
| « Pas de pub ciblée sur les enfants » | Protection mineurs (DSA + RGPD) | Dev applique le principe, juriste cadre |

Lecture dev :
1. On **ne mélange pas** les documents : quatre pages distinctes, plus les dispositifs DSA dans l'app.
2. Les **textes** (CGU/CGV) sont rédigés par le juriste ; le dev **branche** et **versionne**.
3. Les **dispositifs** (signalement, transparence) sont du code que le dev possède — mais leur *déclenchement légal* est qualifié par le juriste.

### Exemple 2 — Un dispositif de signalement, côté conception (sans code)

Le besoin « signaler une photo » se traduit en un **flux** que le dev conçoit. On raisonne en principes, pas en implémentation :

```
Signalement d'un contenu (principe DSA — à valider juriste)
  1. Point d'entrée VISIBLE et FACILE : bouton « Signaler » sur chaque contenu partagé.
  2. Le signalement est ENREGISTRÉ (qui, quoi, quand, motif) — traçabilité.
  3. Le contenu signalé entre dans une FILE de traitement (revue humaine).
  4. DÉCISION expliquée : si retrait, la personne à l'origine du contenu est INFORMÉE du motif.
  5. Voie de CONTESTATION offerte à la personne concernée.
```

Ce que le dev **décide seul** : l'ergonomie du bouton, le modèle de données du signalement, la file. Ce qu'il **remonte** : les **motifs légaux** de retrait, le **délai** de traitement attendu, la formulation de la décision — ce sont des points juridiques. Aucun délai, aucun seuil ne se grave dans le code sans validation.

---

## 4. Pièges & misconceptions

### PIÈGE #1 — Fusionner CGU et politique de confidentialité

Ce sont **deux documents distincts** : les CGU fixent les *règles d'usage*, la politique de confidentialité traite les *données personnelles* (RGPD). Les fusionner dans une page unique brouille les deux régimes et complique la mise à jour. Réflexe : une page par document, une URL par document.

### PIÈGE #2 — « J'ai trouvé un template de CGU, je le colle »

Un modèle de CGU trouvé en ligne n'est **pas adapté** à ton service, à ton pays et à ton régime. Le copier crée un faux sentiment de conformité et peut importer des clauses **abusives** ou inapplicables. Le dev **intègre** un texte rédigé par un juriste ; il ne le **rédige** pas.

### PIÈGE #3 — Croire qu'une clause « acceptée » est toujours valable

Cliquer « J'accepte » ne rend pas une clause **abusive** valide. Une clause créant un déséquilibre significatif au détriment du consommateur peut être **réputée non écrite** par le juge. L'acceptation technique n'efface pas le droit.

### PIÈGE #4 — Penser que le DSA ne concerne que les géants

Les obligations les plus lourdes (analyse des risques systémiques) visent les **très grandes plateformes**, mais le **socle** — signalement de contenu illicite, transparence de la modération — concerne largement les services qui hébergent du contenu utilisateur. Ne pas prévoir de bouton « Signaler » au prétexte que « TribuZen est petit » est une erreur. La qualification exacte se fait **avec un juriste**.

### PIÈGE #5 — Traiter le contenu des mineurs comme celui des adultes

Les mineurs bénéficient d'une **protection renforcée** : pas de publicité ciblée à partir de leurs données, réglages protecteurs par défaut, prudence sur la visibilité. Appliquer à un enfant les mêmes défauts qu'à un adulte (partage public, ciblage) est une **faute de conception**, pas un simple réglage produit.

### PIÈGE #6 — Confondre « hébergeur » (mentions légales) et « obligations de plateforme » (DSA)

Dans les **mentions légales**, l'« hébergeur » désigne le prestataire technique qui héberge *ton* site (à mentionner). Dans le **DSA**, les obligations de « plateforme » concernent le fait que *ton service* héberge et diffuse le contenu *de tes utilisateurs*. Ce sont deux notions différentes portées par le même mot « héberger ».

---

## 5. Ancrage TribuZen

TribuZen est à la fois un **éditeur de service** (il doit ses mentions légales, ses CGU) et une **plateforme** (il héberge photos et messages de familles, dont des enfants). Les principes de ce module structurent directement le produit :

- **Mentions légales** → page `/mentions-legales` accessible depuis le footer, remplie depuis le modèle officiel, relue par le juriste.
- **CGU / CGV** → textes rédigés par le juriste ; le dev gère l'**acceptation horodatée**, le **versioning** et le **préavis de modification**.
- **Confidentialité** → déjà cadrée par les modules 01 à 05 (RGPD) ; renvoi depuis les CGU.
- **DSA — signalement** → bouton « Signaler ce contenu » sur chaque album/message, flux de traitement journalisé.
- **DSA — transparence** → message clair et motivé quand un contenu est retiré, voie de contestation.
- **Mineurs** → aucun ciblage publicitaire sur les enfants ; visibilité **privée par défaut** ; zones grises (publication d'un enfant dans le fil) remontées au juriste.

Fichiers concernés dans `smaurier/tribuzen` :
```
tribuzen/
  src/
    pages/
      legal/
        mentions-legales.md   ← modèle officiel rempli, relu juriste
        cgu.md                ← texte fourni par le juriste, versionné
    moderation/
      report/                 ← dispositif de signalement (DSA)
      decision/               ← messages de modération + contestation (DSA)
  docs/
    conformite-plateforme.md  ← périmètre DSA + protection mineurs (à valider juriste)
```

> Ce qui relève du dev : **construire les pages**, **intégrer** les textes, **implémenter** les dispositifs (signalement, transparence), coder des **défauts protecteurs** pour les mineurs. Ce qui relève du juriste : **rédiger** les CGU/CGV, **valider** les mentions légales, **qualifier** les obligations DSA et le régime mineurs.

---

## 6. Points clés

1. Quatre documents distincts : mentions légales (qui édite/héberge), CGU (règles d'usage), CGV (vente), politique de confidentialité (données perso) — une URL chacun.
2. Mentions légales (loi LCEN) = catégories obligatoires : éditeur, hébergeur, contact, directeur de publication ; accessibles depuis chaque page ; source service-public.fr.
3. CGU/CGV se **rédigent par un juriste** ; le dev intègre, gère acceptation, versioning et préavis — il n'improvise pas depuis un template.
4. Une clause **abusive** peut être réputée non écrite même « acceptée » : le clic n'efface pas le droit.
5. DSA = dès qu'on héberge du contenu utilisateur : socle **signalement de contenu illicite** + **transparence de la modération** (décision motivée, voie de recours).
6. Les obligations DSA sont **graduées** selon la taille ; les plus lourdes visent les très grandes plateformes, mais le socle concerne aussi les petits services.
7. Mineurs = protection renforcée : pas de publicité ciblée, réglages protecteurs par défaut, prudence sur la visibilité.
8. « Hébergeur » (mentions légales, prestataire technique) ≠ « plateforme » (DSA, on héberge le contenu des autres).
9. Le dev **construit les pages et implémente les dispositifs** ; le juriste **rédige les textes et qualifie les obligations**. En cas de doute : remonter, ne pas deviner.

---

## 7. Seeds Anki

```
Quels sont les quatre documents légaux distincts d'un service en ligne ?|Mentions légales (qui édite/héberge), CGU (règles d'usage), CGV (conditions de vente), politique de confidentialité (données personnelles). Une URL chacun.
Cite trois catégories d'informations obligatoires dans les mentions légales (loi LCEN).|Parmi : identité de l'éditeur (dénomination, adresse, RCS), coordonnées de contact (e-mail, téléphone), identité de l'hébergeur, directeur de la publication. Source : service-public.fr.
Quelle est la différence entre CGU et CGV ?|CGU = règles d'usage du service (accès, obligations, résiliation). CGV = conditions commerciales dès qu'il y a paiement (prix, rétractation, garanties).
Le développeur doit-il rédiger les CGU ?|Non : les CGU/CGV sont rédigées par un juriste. Le dev les intègre, gère l'acceptation horodatée, le versioning et le préavis de modification.
Une clause abusive « acceptée » par l'utilisateur est-elle valable ?|Non : une clause créant un déséquilibre significatif peut être réputée non écrite par le juge, même si l'utilisateur a cliqué « J'accepte ».
Quel est le socle d'obligations DSA pour une plateforme qui héberge du contenu utilisateur ?|Un mécanisme de signalement facile du contenu illicite + la transparence des décisions de modération (décision motivée à la personne, voie de contestation).
Les obligations DSA sont-elles les mêmes pour toutes les plateformes ?|Non, elles sont graduées selon la taille. Les plus lourdes (analyse des risques systémiques) visent les très grandes plateformes ; le socle signalement/transparence concerne aussi les petits services.
Quels principes de protection des mineurs le DSA impose-t-il ?|Réduire l'exposition à des contenus inadaptés, interdire la publicité ciblée dirigée vers les mineurs, prendre en compte leur bien-être et sécurité dans la conception.
Quelle est la différence entre l'« hébergeur » des mentions légales et la « plateforme » au sens DSA ?|Hébergeur (mentions légales) = prestataire technique hébergeant ton site. Plateforme (DSA) = ton service héberge et diffuse le contenu de tes utilisateurs.
```

---

## Pont vers le lab

> Lab associé : `labs/lab-06-cgu-mentions-et-obligations-plateforme/README.md`. Analyse de conformité : lister les mentions légales obligatoires de TribuZen et les points DSA / mineurs applicables. Analyse et décision argumentée — pas de code, feedback coach en session.
