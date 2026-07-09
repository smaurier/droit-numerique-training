---
titre: Droits des personnes — les implémenter côté dev
cours: 23-droit-numerique
notions: ["droit d'accès", "droit de rectification", "droit d'effacement (droit à l'oubli)", "droit à la portabilité", "droit d'opposition", "droit à la limitation", "délai de réponse (ordre de grandeur)", "export de données", "suppression en cascade", "anonymisation vs suppression"]
outcomes:
  - "sait citer les six droits RGPD des personnes et ce que chacun oblige le produit à faire"
  - "sait concevoir un endpoint d'export de données couvrant l'intégralité du périmètre d'un utilisateur"
  - "sait concevoir une suppression de compte en cascade et choisir entre suppression et anonymisation selon la finalité"
  - "sait situer le délai de réponse en ordre de grandeur et renvoyer à la source officielle CNIL"
prerequis: [00-introduction-au-droit-du-numerique, 01-rgpd-reflexes-developpeur]
next: 04-dpia-analyse-impact
libs: []
tribuzen: "back-office TribuZen — endpoints /me/export et /me/delete, suppression en cascade des données famille/enfants/photos, anonymisation des données à conservation légale"
last-reviewed: 2026-07
---

<!-- FLAG-REVIEW: droit/légal — valider par Sylvain + juriste avant diffusion publique -->

# Droits des personnes — les implémenter côté dev

> **Outcomes — tu sauras FAIRE :** citer les six droits RGPD, concevoir un endpoint d'export complet, concevoir une suppression de compte en cascade, choisir entre suppression et anonymisation.
> **Difficulté :** :star::star::star:
>
> ⚠️ **Ceci n'est pas un conseil juridique.** Ce module donne des **réflexes de développeur** pour construire un produit qui *respecte techniquement* les droits des personnes. Il ne remplace ni un juriste, ni un DPO, ni un avocat. Toute décision juridique (un refus d'effacement, un délai, une obligation de conservation) doit être **validée par un juriste / DPO**. Les délais cités sont donnés **en ordre de grandeur** ; la source qui fait foi est **[cnil.fr](https://www.cnil.fr/fr/les-droits-pour-maitriser-vos-donnees-personnelles)**, et le droit évolue.

## 1. Cas concret d'abord

Tu es dev sur TribuZen. Un mail arrive au support :

> « Bonjour, nous quittons l'application. Merci de **supprimer notre compte**, toutes nos données, **et surtout les photos de nos enfants**. Envoyez-nous aussi **une copie de tout ce que vous avez sur nous** avant. — La famille Diallo »

Cette famille exerce **deux droits** en une phrase : le **droit d'effacement** (« supprimez tout ») et le **droit d'accès / à la portabilité** (« envoyez-nous une copie »). Le support te transfère le ticket : *« Techniquement, on fait quoi ? »*

Les mauvaises réponses qui coûtent cher :

- **« Je fais un `DELETE FROM users WHERE id = ...` et c'est réglé. »** → Non. Il reste les familles, les routines, le journal, les **photos sur le stockage objet**, les entrées liées par clé étrangère. Suppression incomplète = non-conformité.
- **« Je supprime tout, y compris les factures. »** → Non. Les factures sont soumises à une **obligation légale de conservation** (comptabilité). On ne les efface pas : on les **anonymise**.
- **« On leur enverra ça quand on aura le temps. »** → Non. Il existe un **délai de réponse** (ordre de grandeur : ~1 mois — voir §2). Le produit doit rendre l'opération faisable *dans les temps*.

Ce module te donne le cadre pour répondre à ce ticket **par une conception**, pas par une improvisation. Le point de départ juridique reste : *qu'est-ce que la loi oblige ?* — et ça, tu le fais **valider par un juriste/DPO**. Ton travail de dev : que le produit le **rende possible et traçable**.

---

## 2. Théorie complète, concise

### 2.1 Les six droits que le produit doit rendre possibles

Le RGPD donne aux personnes une série de droits sur leurs données. Six d'entre eux ont un **impact direct sur ce que tu construis** :

| Droit | Ce que la personne demande | Ce que le produit doit savoir faire |
|-------|----------------------------|-------------------------------------|
| **Accès** | « Quelles données avez-vous sur moi ? » | Rassembler et restituer **toutes** les données de la personne, + les finalités, destinataires, durées de conservation |
| **Rectification** | « Cette donnée est fausse, corrigez-la » | Permettre la modification d'une donnée inexacte (souvent : l'utilisateur édite lui-même son profil) |
| **Effacement** (droit à l'oubli) | « Supprimez mes données » | Supprimer les données **en cascade**, sauf ce qui est soumis à une base légale de conservation (→ anonymiser) |
| **Portabilité** | « Rendez-moi mes données pour les réutiliser ailleurs » | Exporter dans un **format structuré, lisible par machine** (JSON, CSV) les données *fournies par la personne* |
| **Opposition** | « Arrêtez d'utiliser mes données pour X » (ex : marketing) | Pouvoir **désactiver une finalité** sans supprimer le compte (opt-out, flags de consentement) |
| **Limitation** | « Gelez mes données le temps d'un litige » | Marquer des données comme **« gelées »** : conservées mais non traitées/utilisées |

> **Nuance dev importante.** *Accès* et *portabilité* se ressemblent mais diffèrent :
> - **Accès** = une copie *lisible par un humain*, de **toutes** les données te concernant (y compris celles que le produit a dérivées ou reçues de tiers).
> - **Portabilité** = les données que la personne a **elle-même fournies**, dans un **format machine** réutilisable ailleurs, quand le traitement repose sur le **consentement ou un contrat**.
>
> En pratique, un bon export JSON bien structuré sert souvent les deux — mais **le périmètre n'est pas identique**. Fais trancher le périmètre exact par le DPO.

La CNIL recense d'autres droits (droit à l'information, droit de ne pas faire l'objet d'une décision automatisée, déréférencement…). Le panorama complet et à jour : **[cnil.fr — Les droits pour maîtriser vos données personnelles](https://www.cnil.fr/fr/les-droits-pour-maitriser-vos-donnees-personnelles)**.

### 2.2 Délai de réponse — ordre de grandeur, pas une vérité gravée

Quand une personne exerce un droit, l'organisme doit répondre **dans un délai encadré**. **Ordre de grandeur : environ un mois** à compter de la demande, avec une **prolongation possible** (souvent évoquée jusqu'à ~trois mois) lorsque la demande est **complexe ou multiple**, à condition d'en informer la personne et d'en expliquer la raison.

> ⚠️ Ne présente **jamais** « 1 mois » ou « 3 mois » comme un chiffre absolu et actionnable seul. Ce sont des **ordres de grandeur**. Le délai exact, ses points de départ et ses exceptions relèvent du juriste/DPO et de la source officielle : **[cnil.fr](https://www.cnil.fr/fr/les-droits-pour-maitriser-vos-donnees-personnelles)**.

Conséquence côté dev : la conception doit rendre la réponse **réalisable sans effort manuel démesuré**. Un export qui demande trois jours d'extraction SQL à la main est un **risque de conformité** autant qu'un risque d'équipe.

### 2.3 Implémenter le droit d'accès / portabilité : l'export de données

Principe : un **seul point d'entrée** (`GET /me/export`) qui **agrège tout le périmètre** de l'utilisateur en un document structuré.

```ts
// Pseudo-conception — pas un module de prod à copier tel quel
// Objectif : montrer le PÉRIMÈTRE et la STRUCTURE, pas le framework

async function exportUserData(userId: string): Promise<UserExport> {
  // 1. Rassembler TOUT le périmètre — pas seulement la table users
  const profile   = await users.findById(userId);
  const families  = await families.findByOwner(userId);
  const children  = await children.findByFamilies(families.map(f => f.id));
  const routines  = await routines.findByFamilies(families.map(f => f.id));
  const journal   = await journalEntries.findByUser(userId);
  const photos    = await mediaRefs.findByUser(userId); // URLs/métadonnées, pas les binaires ici
  const invoices  = await invoices.findByUser(userId);  // inclus dans l'accès, à cadrer avec le DPO

  // 2. Structurer de façon LISIBLE — clés explicites, pas un dump SQL
  return {
    exportedAt: new Date().toISOString(),
    subject: { id: userId },
    profile,
    families,
    children,   // ⚠️ données de mineurs — voir §4
    routines,
    journal,
    media: photos,
    billing: invoices,
  };
}
```

Points de conception :

- **Format machine + lisible** : JSON structuré (ou CSV par entité). Pas de dump SQL brut, pas de PDF non exploitable.
- **Périmètre exhaustif** : si une donnée existe *quelque part* (base principale, cache, stockage objet, logs applicatifs), elle appartient au périmètre — ou elle est justifiée hors périmètre par une raison documentée.
- **Livraison sécurisée** : l'export contient des données personnelles (et sensibles). Lien temporaire authentifié, jamais un fichier public deviné par URL.

### 2.4 Implémenter le droit d'effacement : la suppression en cascade

Supprimer un compte, ce n'est **pas** supprimer une ligne. C'est parcourir **tout le graphe** de données rattachées à la personne.

```ts
// Pseudo-conception — l'ordre compte : des enfants vers la racine
async function deleteAccount(userId: string): Promise<void> {
  // 1. Effets externes d'abord (irréversibles côté tiers)
  await billing.cancelSubscription(userId);      // ex : Stripe

  // 2. Purge du stockage objet — les binaires ne partent PAS avec la ligne SQL
  await objectStore.deletePrefix(`users/${userId}/`);   // photos des enfants incluses
  await objectStore.deletePrefix(`families/.../photos`);

  // 3. Cascade en base — soit ON DELETE CASCADE (FK), soit suppression ordonnée
  await journalEntries.deleteByUser(userId);
  await routines.deleteByFamilies(userId);
  await children.deleteByFamilies(userId);       // ⚠️ données de mineurs
  await families.deleteByOwner(userId);

  // 4. Données à conservation légale : NE PAS supprimer -> anonymiser (§2.5)
  await invoices.anonymizeByUser(userId);

  // 5. La ligne racine en dernier
  await users.delete(userId);
}
```

Deux façons de gérer la cascade, à décider **à la conception** :

- **`ON DELETE CASCADE`** au niveau des clés étrangères : la base propage la suppression. Robuste, mais **ne touche pas** le stockage objet (photos) ni les systèmes externes.
- **Suppression applicative ordonnée** (comme ci-dessus) : plus de contrôle, tu gères explicitement l'ordre, le stockage objet et les tiers.

Dans les deux cas : ce qui vit **hors de la base** (fichiers, index de recherche, caches, sauvegardes, sous-traitants) ne disparaît **pas** tout seul.

### 2.5 Anonymisation vs suppression — le choix qui évite l'erreur

Tu **ne peux pas toujours tout supprimer** : certaines données ont une **base légale de conservation** (ex : factures pour obligation comptable). Deux stratégies :

| | **Suppression** | **Anonymisation** |
|---|---|---|
| Effet | La donnée n'existe plus | La donnée reste, mais **ne peut plus être rattachée** à une personne |
| Quand | Donnée sans motif de conservation | Donnée qu'on **doit** garder (obligation légale) mais qui contient de l'identifiant |
| Exemple TribuZen | Journal, routines, photos | Facture : on garde montant/date, on **efface nom/email/adresse** ou on remplace par un pseudonyme irréversible |

> **Piège de vocabulaire.** **Anonymiser ≠ pseudonymiser.**
> - **Pseudonymisation** : on remplace l'identifiant par un jeton, mais une **table de correspondance** permet de revenir en arrière → **toujours de la donnée personnelle** au sens RGPD.
> - **Anonymisation** : le lien vers la personne est **irréversible**, personne ne peut ré-identifier → **sort** du champ RGPD.
>
> Si tu peux « re-relier », tu as **pseudonymisé**, pas anonymisé. La frontière est subtile et **c'est au DPO/juriste de valider** qu'une anonymisation est réellement irréversible.

---

## 3. Worked examples

### Exemple 1 — Répondre au ticket de la famille Diallo (conception)

La demande combine **effacement** + **accès**. Séquence de conception :

1. **Vérifier l'identité** du demandeur (ne pas exporter/supprimer sur simple email non authentifié — risque d'usurpation). Souvent : demande depuis le compte connecté, ou vérification renforcée par le support.
2. **D'abord l'accès** (ils veulent une copie *avant*) : déclencher `GET /me/export` → livrer un JSON structuré via lien sécurisé temporaire.
3. **Puis l'effacement** : `deleteAccount(userId)` — cascade base + purge stockage objet (photos enfants) + annulation abonnement.
4. **Traiter les factures à part** : anonymisation, pas suppression (obligation légale). Documenter *pourquoi* certaines données subsistent, pour pouvoir l'expliquer.
5. **Tracer l'opération** : qui a demandé, quand, ce qui a été exporté, ce qui a été supprimé, ce qui a été conservé-anonymisé (accountability).
6. **Rester dans l'ordre de grandeur du délai** (~1 mois — §2.2).

Ce qui relève du **juriste/DPO** ici et **pas** de toi seul : décider si une donnée doit être conservée, formuler un éventuel refus partiel, fixer le délai exact.

### Exemple 2 — Distinguer accès et portabilité sur une même donnée

Une utilisatrice demande « toutes mes données ».

- **Son profil, ses routines, son journal** (qu'elle a saisis, traitement fondé sur le contrat) → dans l'export de **portabilité** *et* d'**accès**.
- **Un score d'engagement calculé par TribuZen** à partir de son usage → relève de l'**accès** (elle a le droit de savoir qu'il existe), mais **pas forcément de la portabilité** (elle ne l'a pas *fourni*, il est *dérivé*).
- **Conclusion dev** : un export unique bien pensé peut couvrir les deux, mais tu **sépares les rubriques** (« données que vous avez fournies » vs « données dérivées ») pour que le périmètre soit clair — et tu fais **valider ce découpage par le DPO**.

---

## 4. Pièges & misconceptions

### PIÈGE #1 — « Supprimer le compte = `DELETE` sur la ligne user »

Faux. Les données rattachées (familles, enfants, journal), les **binaires du stockage objet** (photos), les entrées dans les **sauvegardes**, les **caches**, les **index de recherche** et les **sous-traitants** ne partent pas avec la ligne racine. Le correct : **cascade explicite** couvrant *tous* les lieux de stockage, stockage objet compris.

### PIÈGE #2 — « J'efface tout, factures comprises »

Faux et **contre-productif** : les factures relèvent souvent d'une **obligation légale de conservation**. On ne les supprime pas, on les **anonymise** (retirer l'identifiant, garder le nécessaire comptable). Supprimer une donnée qu'on devait conserver est **aussi** une faute que conserver une donnée qu'on devait supprimer.

### PIÈGE #3 — Confondre anonymisation et pseudonymisation

Remplacer `nom` par `user_8f3a` **n'est pas** anonymiser si une table permet de remonter à la personne. C'est de la **pseudonymisation** → **toujours de la donnée personnelle**. L'anonymisation vraie est **irréversible**. Décision à **faire valider** : une « anonymisation » réversible n'en est pas une.

### PIÈGE #4 — Confondre droit d'accès et droit à la portabilité

Ce ne sont **pas** deux noms pour la même chose. L'accès = **tout**, lisible par un humain. La portabilité = les données **fournies par la personne**, en **format machine**, sous consentement/contrat. Périmètres différents → ne code pas « un seul export » sans distinguer les rubriques.

### PIÈGE #5 — Exporter/supprimer sans vérifier l'identité

Répondre à un « supprimez mon compte » venu d'un email non authentifié ouvre la porte à l'**usurpation** (quelqu'un supprime ou aspire le compte d'autrui). Toujours **authentifier** le demandeur avant d'agir. Le *comment* (niveau de vérification) se cadre avec le DPO.

### PIÈGE #6 — Traiter les données de mineurs comme les autres

Les enfants (photos, prénoms, éventuelles données de santé) appellent une **vigilance renforcée**. Une suppression incomplète qui laisse traîner **la photo d'un enfant** dans un bucket est un incident sérieux. Ces données sont au cœur de la **DPIA** (module 04) — ne les traite jamais « comme le reste » sans le signaler.

---

## 5. Ancrage TribuZen

TribuZen manipule des données d'adultes **et de mineurs** : profils, structure familiale, routines, journal, **photos d'enfants**, facturation. Les droits des personnes s'y matérialisent par deux endpoints de back-office et une règle de conservation :

```
tribuzen-api/
  src/
    me/
      me.controller.ts        ← GET /me/export   (accès + portabilité)
                                 DELETE /me       (effacement en cascade)
      account-deletion.service.ts  ← cascade base + purge stockage objet + anonymisation factures
    billing/
      invoices.service.ts     ← anonymizeByUser() : garde le comptable, efface l'identité
```

Règles de conception TribuZen :

- **Export** : `GET /me/export` renvoie un JSON structuré couvrant profil, familles, enfants, routines, journal, références média, facturation ; livré par **lien temporaire authentifié**.
- **Effacement** : `DELETE /me` déclenche la cascade — journal → routines → enfants → familles → user, **plus** purge du préfixe de stockage objet contenant **les photos des enfants**, **plus** annulation de l'abonnement Stripe.
- **Conservation** : les **factures** sont **anonymisées**, pas supprimées (obligation comptable).
- **Traçabilité** : chaque exercice de droit est journalisé (qui, quand, quoi) pour l'accountability.

> Ces choix techniques **doivent être validés par un juriste/DPO** avant la beta : périmètre exact de l'export, données à conserver, délai, formulation d'un éventuel refus. Le dev **rend la chose possible et traçable** ; il ne **décide pas** du droit.

---

## 6. Points clés

1. Six droits ont un impact dev : **accès, rectification, effacement, portabilité, opposition, limitation**.
2. **Accès ≠ portabilité** : accès = tout, lisible humain ; portabilité = données *fournies*, format machine, sous consentement/contrat.
3. Le **délai de réponse** est un **ordre de grandeur** (~1 mois, prolongeable) — la source qui fait foi est **cnil.fr**, jamais un chiffre récité.
4. L'**export** part d'un seul endpoint qui agrège **tout le périmètre** (base + stockage objet + facturation), en JSON structuré, livré de façon sécurisée.
5. L'**effacement** est une **cascade** couvrant base **et** stockage objet **et** systèmes tiers — jamais un simple `DELETE` de ligne.
6. Ce qu'on doit conserver (factures) s'**anonymise**, ne se supprime pas.
7. **Anonymiser ≠ pseudonymiser** : seule l'anonymisation *irréversible* sort du RGPD.
8. Toujours **vérifier l'identité** du demandeur ; traiter les **données de mineurs** avec une vigilance renforcée.
9. Le dev **implémente et trace** ; **le juriste/DPO décide** du droit, du périmètre et des délais.

---

## 7. Seeds Anki

```
Quels sont les six droits RGPD à impact dev ?|Accès, rectification, effacement (oubli), portabilité, opposition, limitation.
Différence entre droit d'accès et droit à la portabilité ?|Accès = copie lisible par un humain de TOUTES les données te concernant (dérivées comprises). Portabilité = données que TU as fournies, en format machine réutilisable, quand le traitement repose sur consentement ou contrat. Périmètres différents.
Quel est l'ordre de grandeur du délai de réponse à une demande de droit ?|Environ un mois, prolongeable (souvent évoqué jusqu'à ~3 mois) si la demande est complexe. Ordre de grandeur seulement — la source qui fait foi est cnil.fr, le droit évolue.
Pourquoi supprimer un compte ne peut pas être un simple DELETE sur la ligne user ?|Les données rattachées (familles, enfants, journal), les binaires du stockage objet (photos), sauvegardes, caches, index et sous-traitants ne partent pas avec la ligne racine. Il faut une suppression en cascade couvrant tous les lieux de stockage.
Suppression ou anonymisation pour une facture lors d'un effacement de compte ?|Anonymisation. La facture est soumise à une obligation légale de conservation : on garde le nécessaire comptable et on efface/pseudonymise l'identité. Supprimer une donnée qu'on devait conserver est aussi une faute.
Différence entre anonymisation et pseudonymisation ?|Pseudonymisation = l'identifiant est remplacé mais une table de correspondance permet de revenir en arrière → reste de la donnée personnelle. Anonymisation = lien vers la personne irréversible → sort du champ RGPD. Si on peut re-relier, ce n'est pas de l'anonymisation.
Avant d'exporter ou supprimer sur demande, quelle étape est indispensable ?|Vérifier l'identité du demandeur, sinon risque d'usurpation (quelqu'un supprime ou aspire le compte d'autrui). Le niveau de vérification se cadre avec le DPO.
Qui décide du droit (périmètre, refus, délai exact) : le dev ou le juriste/DPO ?|Le juriste/DPO décide du droit ; le dev rend l'exercice possible et traçable. Ce module n'est pas un conseil juridique.
```

---

## Pont vers le lab

> Lab associé : `labs/lab-03-droits-des-personnes/README.md`. Concevoir (analyse + pseudo-conception, pas d'impl complète) le parcours « supprimer mon compte » et « exporter mes données » de TribuZen, conforme aux droits des personnes — grille + coach + variante J+30, disclaimer et FLAG-REVIEW inclus.
