---
titre: "RGPD : les réflexes du développeur"
cours: 23-droit-numerique
notions: ["les 6 bases légales du RGPD", "consentement vs contrat vs intérêt légitime", "données personnelles vs données sensibles (Art. 9)", "minimisation des données", "limitation des finalités", "limitation de conservation", "privacy by design", "privacy by default", "réflexes de code du développeur"]
outcomes:
  - "sait nommer les 6 bases légales et choisir la base appropriée pour un traitement donné"
  - "sait distinguer une donnée personnelle d'une donnée sensible au sens de l'Art. 9"
  - "sait appliquer minimisation, limitation de finalité et de conservation dès la conception"
  - "sait traduire privacy by design / by default en décisions de code concrètes"
  - "sait identifier ce qui relève du dev vs ce qui doit remonter au juriste / DPO"
prerequis: ["00-introduction-au-droit-du-numerique"]
next: 02-consentement-cookies-et-traceurs
libs: []
tribuzen: "conformité RGPD du back-office TribuZen — classer chaque traitement par base légale, isoler les données de santé et de mineurs"
last-reviewed: 2026-07
---

<!-- FLAG-REVIEW: droit/légal — valider par Sylvain + juriste avant diffusion publique -->

> **⚠️ Ceci n'est PAS un conseil juridique.** Ce module donne des **principes et des réflexes de développeur** pour dialoguer avec les bonnes personnes et écrire du code respectueux du RGPD. Il ne remplace pas l'analyse d'un **juriste, d'un DPO ou d'un avocat**. Toute décision de conformité (choix d'une base légale, qualification d'une donnée, durée de conservation) doit être **validée par un expert**. Les articles, seuils et régimes évoqués sont des **ordres de grandeur** : le droit évolue, la source qui fait foi est **[cnil.fr](https://www.cnil.fr)**.

# RGPD : les réflexes du développeur

> **Outcomes — tu sauras FAIRE :** choisir la base légale d'un traitement, distinguer donnée personnelle et donnée sensible, appliquer minimisation / finalité / conservation dès la conception, et savoir quoi remonter au juriste.
> **Difficulté :** :star::star::star:

## 1. Cas concret d'abord

Tu développes le formulaire d'inscription de TribuZen, l'app d'organisation familiale. Le product owner te tend cette maquette de champs à stocker :

```
Inscription TribuZen
  - email                     (obligatoire)
  - mot de passe              (obligatoire)
  - prénom du parent          (obligatoire)
  - date de naissance complète du parent
  - prénom de chaque enfant
  - date de naissance de chaque enfant
  - allergies / régime alimentaire de chaque enfant
  - "diagnostic médical" (champ libre : TSA, TDAH, asthme…)
  - photo de profil de la famille (adultes ET enfants)
```

Avant d'écrire la moindre migration Prisma, **quatre questions** doivent te venir en réflexe :

1. **De quoi ai-je réellement besoin ?** La date de naissance *complète* du parent, ou juste « majeur oui/non » ? (→ minimisation)
2. **Au nom de quoi je collecte chaque donnée ?** Le service lui-même, un consentement, une obligation légale ? (→ base légale)
3. **Y a-t-il des données à régime renforcé ?** Les allergies et le « diagnostic médical » sont des **données de santé** ; les photos et données d'**enfants** ajoutent une couche de sensibilité. (→ Art. 9 + mineurs)
4. **Qu'est-ce qui n'est PAS ma décision ?** Le choix final d'une base légale, la durée de conservation légale, la qualification d'une donnée sensible : ça se **valide avec un juriste / DPO**.

Ce module te donne les réflexes pour répondre aux trois premières questions — et pour savoir exactement où s'arrête la quatrième. Les **droits des personnes** (accès, effacement, portabilité…) et leur implémentation font l'objet du **module 03**.

---

## 2. Théorie complète, concise

### 2.1 Donnée personnelle : la définition large

Une **donnée personnelle** est toute information se rapportant à une personne physique **identifiée ou identifiable**, directement ou indirectement. C'est volontairement **très large** : un email, un nom, mais aussi un identifiant technique (IP, cookie, UUID device), une géolocalisation, ou une combinaison de champs anodins qui, ensemble, ré-identifient quelqu'un.

Réflexe dev : dès qu'une ligne de ta base peut être **reliée à une personne**, elle est concernée par le RGPD. Un UUID « anonyme » qui pointe vers un profil réel reste une donnée personnelle (il est **pseudonymisé**, pas anonymisé).

### 2.2 Donnée sensible (Art. 9) : le régime renforcé

Certaines données forment une **catégorie particulière** dite « sensible ». Selon la CNIL, il s'agit des informations qui révèlent :

- l'origine raciale ou ethnique supposée,
- les opinions politiques,
- les convictions religieuses ou philosophiques,
- l'appartenance syndicale,
- les données **génétiques** et **biométriques** (à des fins d'identification unique),
- les données de **santé**,
- les données concernant la **vie sexuelle** ou l'**orientation sexuelle**.

Le principe est une **interdiction de traiter** ces données, sauf exceptions (par exemple le **consentement explicite** de la personne). Concrètement, pour TribuZen : allergies, régime médical, « diagnostic » (TSA, TDAH, asthme) = **données de santé** = Art. 9.

> Principe, pas seuil figé : la liste, les exceptions et leur portée sont fixées par le RGPD et interprétées par la CNIL. Vérifier sur **[cnil.fr — donnée sensible](https://www.cnil.fr/fr/definition/donnee-sensible)** et faire **valider la qualification par un juriste / DPO**.

**Réflexe dev** : une donnée Art. 9 ne se traite pas « comme les autres ». Elle appelle typiquement chiffrement renforcé, isolation, consentement explicite, et souvent une **analyse d'impact (DPIA)** — sujet du module 04. En cas de doute sur la qualification : on **ne devine pas**, on remonte.

### 2.3 Le cas des mineurs

Les données d'enfants appellent une **vigilance particulière** (information adaptée, rôle des titulaires de l'autorité parentale, prudence sur le consentement). Ce n'est pas une 8ᵉ catégorie « sensible » au sens de l'Art. 9, mais le régime de protection est **renforcé** dans la pratique et la doctrine CNIL. Pour TribuZen, qui manipule prénoms, dates de naissance, santé **et photos d'enfants**, c'est un point de conformité majeur → à cadrer avec le juriste. La CNIL traite ce sujet sous « **les droits numériques des mineurs** ».

### 2.4 Les 6 bases légales — et comment choisir

Tout traitement de données personnelles doit reposer sur **une** des six bases légales du RGPD (Art. 6). Choisir la base est, selon la CNIL, **une opération décisive à faire AVANT de démarrer** le traitement.

| Base légale | Quand l'utiliser (principe) | Exemple TribuZen |
|---|---|---|
| **Consentement** | La personne accepte librement, de façon spécifique, éclairée et **révocable**. | Newsletter, notifications marketing, données de santé (consentement *explicite*). |
| **Contrat** | La donnée est **objectivement nécessaire** à l'exécution du service demandé. | Email + mot de passe pour authentifier ; organisation familiale = cœur du service. |
| **Obligation légale** | Une loi **claire et précise** impose de traiter la donnée. | Conservation des factures (obligation comptable). |
| **Mission d'intérêt public** | Réservée surtout aux autorités publiques. | Non applicable à TribuZen. |
| **Intérêts vitaux** | Nécessaire pour **sauver une vie**. | Non applicable en usage courant. |
| **Intérêt légitime** | Intérêt de l'organisation, après **test de mise en balance** avec les droits des personnes. À éviter pour les données sensibles. | Journaux de sécurité, prévention de la fraude. |

Points de vigilance CNIL :
- **Contrat** ≠ « je l'ai écrit dans les CGU ». La donnée doit être *réellement nécessaire* au service.
- **Obligation légale** = il faut une **loi** imperative, pas un simple usage interne.
- **Intérêt légitime** exige de documenter la **mise en balance** (mes intérêts vs droits de la personne).
- Base à **fixer avant** le développement, pas à justifier après coup.

> La base légale d'un traitement est une **décision juridique**. Le dev *propose* et *documente* ; le juriste / DPO *valide*. Source : **[cnil.fr — les bases légales](https://www.cnil.fr/fr/les-bases-legales)**.

### 2.5 Minimisation des données

Ne collecte **que** ce qui est strictement nécessaire à la finalité. C'est le réflexe le plus rentable pour un dev, parce qu'il se traduit directement en schéma de base.

```ts
// ❌ On collecte plus que nécessaire
interface Parent {
  birthDate: Date // date de naissance complète — pourquoi ?
}

// ✅ Si le besoin réel est « l'utilisateur est-il majeur ? »
interface Parent {
  isAdult: boolean // on ne stocke que la réponse à la vraie question
}
```

Chaque champ « au cas où » est une **dette de conformité** : plus de surface à sécuriser, à exporter, à supprimer, à justifier.

### 2.6 Limitation des finalités

Une donnée collectée pour une finalité **déclarée** ne peut pas être détournée pour une autre sans nouvelle base.

```ts
// La donnée « email » a plusieurs finalités possibles.
// Chaque finalité a SA base légale — on ne les mélange pas.
//   authentification      → base : contrat
//   facture / reçu        → base : obligation légale
//   newsletter produit    → base : consentement (opt-in séparé)
```

**Réflexe dev** : sépare les usages dans le code (colonnes / tables / flags de consentement distincts) plutôt que de réutiliser un même champ pour tout.

### 2.7 Limitation de la conservation

Les données ne se gardent **pas indéfiniment** : durée liée à la finalité, puis suppression ou anonymisation. Le dev traduit ça en **job de purge** et en champs `expiresAt` / `deletedAt`.

```ts
// Illustration — la durée EXACTE dépend de la finalité et se valide avec le juriste.
const RETENTION = {
  applicationLogs: 'quelques mois',      // sécurité / exploitation
  inactiveAccount: 'anonymiser après X', // X = à cadrer juridiquement
  invoices:        'obligation légale',  // conservation imposée par la loi
} as const
```

> Aucune de ces durées n'est un chiffre à graver dans le code sans validation. Le **principe** (durée limitée + justifiée) est le point dev ; le **combien** est juridique.

### 2.8 Privacy by design & by default

Deux obligations de l'Art. 25, qui parlent directement au dev :

- **Privacy by design** : la protection des données est pensée **dès la conception** (schéma, architecture, choix techniques), pas ajoutée après. Ex. : E2EE pour les données de santé décidé *avant* d'écrire le back.
- **Privacy by default** : par **défaut**, le réglage le plus protecteur. Ex. : un partage de photo de famille est **privé par défaut**, pas public ; les cases de consentement marketing sont **décochées** par défaut.

C'est là que le dev a le plus de pouvoir : ces deux principes se jouent presque entièrement dans **tes choix de code**.

---

## 3. Worked examples

### Exemple 1 — Choisir la base légale champ par champ (TribuZen)

On reprend le formulaire d'inscription du §1 et on qualifie chaque donnée. **Attention : ce tableau est une proposition de développeur, à faire valider par un juriste / DPO.**

| Donnée | Personnelle ? | Sensible (Art. 9) ? | Base proposée | Pourquoi |
|---|---|---|---|---|
| email | oui | non | Contrat | nécessaire pour authentifier |
| mot de passe (hash) | oui | non | Contrat | nécessaire au service |
| prénom parent | oui | non | Contrat | identification dans l'app |
| date de naissance parent | oui | non | — | **minimiser** → remplacer par `isAdult` |
| prénom enfant | oui | non (mais **mineur**) | Contrat | organisation familiale |
| date de naissance enfant | oui | non (mais **mineur**) | Contrat | fonctions liées à l'âge |
| allergies / diagnostic | oui | **OUI (santé)** | Consentement **explicite** | Art. 9 → régime renforcé + DPIA (module 04) |
| photo famille (enfants) | oui | non par nature* | Consentement | image de mineurs → prudence, privé par défaut |

\* Une photo peut *révéler* une donnée sensible (santé, origine) selon le contexte — d'où la prudence. **À qualifier avec un juriste.**

Lecture dev de ce tableau :
1. On **supprime** la date de naissance complète du parent (minimisation).
2. On **isole** les données de santé dans un stockage chiffré à part, sous consentement explicite.
3. On marque les entités « enfant » pour appliquer les règles mineurs.
4. On **note les incertitudes** (photos) et on les **remonte** au lieu de trancher seul.

### Exemple 2 — Privacy by default dans une migration

Le PO demande « le partage d'un album photo de la famille ». Traduction *by default* :

```prisma
model PhotoAlbum {
  id         String     @id @default(uuid())
  familyId   String
  // ✅ Privacy by default : visibilité la plus protectrice par défaut.
  //    L'utilisateur doit AGIR pour élargir, jamais l'inverse.
  visibility Visibility @default(PRIVATE)
  createdAt  DateTime   @default(now())
}

enum Visibility {
  PRIVATE   // par défaut — album visible de la seule famille
  SHARED    // choix explicite de l'utilisateur
}
```

Le réflexe : le **défaut** protège. Un album d'enfants qui serait `PUBLIC` par défaut serait une faute de conception — pas seulement un mauvais réglage produit.

---

## 4. Pièges & misconceptions

### PIÈGE #1 — « Pseudonymisé » cru « anonymisé »

Remplacer un nom par un UUID **ne rend pas la donnée anonyme** si une table de correspondance permet de remonter à la personne. C'est de la **pseudonymisation** : la donnée reste personnelle et soumise au RGPD. L'anonymisation vraie est **irréversible**.

### PIÈGE #2 — « C'est dans les CGU, donc j'ai la base contrat »

La base **contrat** exige que la donnée soit *objectivement nécessaire* au service. Mentionner un traitement dans les CGU **ne crée pas** de base légale. Collecter le numéro de téléphone « pour le marketing » sous prétexte de CGU relève du **consentement**, pas du contrat.

### PIÈGE #3 — Traiter une donnée de santé comme une donnée ordinaire

Les allergies ou un « diagnostic » saisis dans un champ libre sont des **données de santé (Art. 9)**. Les stocker dans la même table que le prénom, sans consentement explicite ni chiffrement renforcé, est une erreur de conception classique. Réflexe : **isoler + chiffrer + consentement explicite + remonter pour DPIA**.

### PIÈGE #4 — Confondre minimisation et limitation de finalité

- **Minimisation** = *combien* de données je collecte (le moins possible).
- **Limitation de finalité** = *pour quoi* je les utilise (uniquement l'usage déclaré).
On peut minimiser correctement et **quand même** violer la finalité en réutilisant un email de facturation pour du marketing.

### PIÈGE #5 — Croire que le dev choisit la base légale

Le dev **propose et documente** ; il n'a pas autorité pour **valider** une base légale, une durée de conservation légale ou la qualification d'une donnée sensible. Trancher seul ces points, c'est engager la conformité de l'entreprise sans mandat. Le bon réflexe est de **remonter au juriste / DPO**.

---

## 5. Ancrage TribuZen

TribuZen manipule, dès l'inscription, un cocktail à haut risque : données d'**adultes et de mineurs**, **photos**, et **données de santé** d'enfants. Les réflexes de ce module structurent directement le back-office :

- **Minimisation** → le schéma Prisma ne contient que les champs justifiés ; `isAdult: boolean` au lieu de la date de naissance complète du parent.
- **Bases légales** → chaque traitement est étiqueté (contrat / consentement / obligation légale) dans un **registre** (même un simple tableau au départ), relu par le juriste.
- **Art. 9** → les données de santé (allergies, diagnostic) vivent dans un stockage **chiffré isolé**, sous **consentement explicite**, et déclenchent l'étude d'une **DPIA** (module 04).
- **Mineurs** → les entités « enfant » portent un marqueur qui conditionne visibilité, partage et rétention.
- **Privacy by default** → albums photo `PRIVATE` par défaut ; consentements marketing **décochés** par défaut.

Fichiers concernés dans `smaurier/tribuzen` :
```
tribuzen/
  prisma/
    schema.prisma          ← minimisation + visibilité PRIVATE par défaut
  src/
    users/                 ← séparation des finalités (auth / facture / marketing)
    health/                ← données Art. 9 isolées + chiffrées
  docs/
    registre-traitements.md ← base légale par traitement (relu juriste)
```

> Ce qui relève du dev : le **schéma**, l'**isolation technique**, les **défauts protecteurs**, la **documentation**. Ce qui relève du juriste / DPO : **valider** les bases, les durées, la qualification Art. 9 et le régime mineurs.

---

## 6. Points clés

1. Donnée personnelle = toute info reliable à une personne identifiable (y compris UUID pseudonymisé).
2. Donnée sensible (Art. 9) = santé, biométrie, opinions, orientation… → interdiction de principe sauf exception (souvent consentement **explicite**).
3. Données de mineurs = vigilance renforcée, à cadrer avec le juriste.
4. Six bases légales ; les 3 utiles au dev SaaS : **contrat**, **consentement**, **intérêt légitime**. La base se fixe **avant** de développer.
5. Minimisation = collecter le strict nécessaire ; chaque champ « au cas où » est une dette.
6. Limitation de finalité = ne pas détourner une donnée de l'usage déclaré ; séparer les usages dans le code.
7. Limitation de conservation = durée justifiée + job de purge ; le *principe* est dev, le *combien* est juridique.
8. Privacy by design/by default = protection dès la conception, réglage le plus protecteur par défaut.
9. Le dev **propose et documente**, le juriste / DPO **valide**. En cas de doute : remonter, ne pas deviner.

---

## 7. Seeds Anki

```
Qu'est-ce qu'une donnée personnelle au sens du RGPD ?|Toute information se rapportant à une personne physique identifiée ou identifiable, directement ou indirectement (email, IP, UUID pseudonymisé, combinaison de champs).
Quelle est la différence entre pseudonymisation et anonymisation ?|Pseudonymisation = réversible via une table de correspondance, la donnée reste personnelle et soumise au RGPD. Anonymisation = irréversible, sort du RGPD.
Cite trois catégories de données sensibles (Art. 9).|Parmi : santé, données génétiques, biométriques, opinions politiques, convictions religieuses/philosophiques, appartenance syndicale, vie/orientation sexuelle, origine raciale/ethnique.
Quelles sont les 6 bases légales du RGPD ?|Consentement, contrat, obligation légale, mission d'intérêt public, intérêts vitaux, intérêt légitime.
Pourquoi « c'est écrit dans les CGU » ne suffit pas pour la base contrat ?|La base contrat exige que la donnée soit objectivement nécessaire au service. Une mention en CGU ne crée pas de base légale ; un usage marketing relève du consentement.
Quelle est la différence entre minimisation et limitation de finalité ?|Minimisation = combien de données on collecte (le minimum). Limitation de finalité = pour quoi on les utilise (seulement l'usage déclaré).
Que signifie privacy by default pour un développeur ?|Par défaut, le réglage le plus protecteur : album privé plutôt que public, cases de consentement décochées, visibilité restreinte tant que l'utilisateur n'élargit pas.
Le développeur choisit-il la base légale d'un traitement ?|Non : il propose et documente. La validation (base légale, durée de conservation, qualification Art. 9) revient au juriste / DPO.
Comment traiter une donnée de santé (allergie, diagnostic) dans TribuZen ?|Donnée Art. 9 : isoler dans un stockage chiffré, consentement explicite, et remonter pour une éventuelle DPIA — ne pas la mettre dans la table profil ordinaire.
```

---

## Pont vers le lab

> Lab associé : `labs/lab-01-rgpd-reflexes-developpeur/README.md`. Analyse de conformité : classer les données de TribuZen par base légale et repérer les données sensibles / mineurs. Analyse et décision argumentée — pas de code, feedback coach en session.
