---
titre: "Propriété intellectuelle et licences open source"
cours: 23-droit-numerique
notions: ["licences open source (MIT, Apache 2.0, GPL, AGPL)", "permissif vs copyleft", "copyleft faible vs fort (LGPL)", "compatibilité de licences", "obligations d'attribution et de partage", "contamination copyleft (AGPL et le SaaS)", "propriété du code généré par IA (zone grise)", "PI en équipe : clause de cession et cas du salarié", "audit des licences des dépendances"]
outcomes:
  - "sait classer une licence OSS courante en permissive ou copyleft et nommer ses obligations principales"
  - "sait repérer le risque de contamination d'une dépendance copyleft (GPL/AGPL) dans un SaaS"
  - "sait auditer les licences des dépendances npm et signaler une licence incompatible"
  - "sait qu'une clause de cession de droits est nécessaire pour la PI produite en équipe et distingue le salarié du prestataire"
  - "sait identifier le code généré par IA comme une zone grise à remonter au juriste, sans trancher seul"
prerequis: ["00-introduction-au-droit-du-numerique", "01-rgpd-reflexes-developpeur", "02-consentement-cookies-et-traceurs", "03-droits-des-personnes", "04-dpia-analyse-impact", "05-dpa-et-sous-traitants", "06-cgu-mentions-et-obligations-plateforme"]
next: 08-accessibilite-legale-et-conformite
libs: []
tribuzen: "hygiène de licence de TribuZen — auditer les dépendances pour qu'aucune AGPL ne contamine le SaaS, et choisir la licence du projet"
last-reviewed: 2026-07
---

<!-- FLAG-REVIEW: droit/légal — valider par Sylvain + juriste avant diffusion publique -->

> **⚠️ Ceci n'est PAS un conseil juridique.** Ce module donne des **principes et des réflexes de développeur** sur les licences open source et la propriété intellectuelle. Il ne remplace pas l'analyse d'un **juriste, d'un avocat en PI ou d'un conseil en propriété industrielle**. Le choix d'une licence pour ton produit, la portée d'une obligation copyleft dans ton cas précis, la titularité d'un code généré par IA ou la rédaction d'une clause de cession sont des **décisions juridiques** à faire **valider par un expert**. Les descriptions de licences ci-dessous sont des **résumés de principes** : le texte qui fait foi est la licence elle-même, et les références utiles sont **[choosealicense.com](https://choosealicense.com)** et **[opensource.org/licenses](https://opensource.org/licenses)**.

# Propriété intellectuelle et licences open source

> **Outcomes — tu sauras FAIRE :** classer une licence en permissif/copyleft, repérer une contamination AGPL dans un SaaS, auditer les licences de tes dépendances, et savoir ce qui relève de la clause de cession ou du renvoi juriste.
> **Difficulté :** :star::star::star:

## 1. Cas concret d'abord

Tu prépares la première mise en production de TribuZen. Deux décisions tombent sur ton bureau le même jour :

1. Le product owner veut ajouter une **belle bibliothèque de graphiques** pour le tableau de bord familial. Tu en trouves une parfaite sur npm… publiée sous **licence AGPL-3.0**.
2. Un ami développeur propose de **contribuer bénévolement** un module d'export PDF le week-end. « On verra pour le contrat plus tard. »

Et pendant que tu code, ton assistant IA te génère **80 % d'un composant** que tu adaptes ensuite.

Avant de `npm install` quoi que ce soit ou de merger la première PR de ton ami, **quatre questions** doivent te venir en réflexe :

1. **Cette dépendance m'oblige à quoi ?** Une licence AGPL sur un SaaS peut t'obliger à **publier tout le code source** de TribuZen. Est-ce que je veux ça ? (→ contamination copyleft)
2. **Sous quelle licence je publie MON code ?** Fermé (propriétaire) ? Permissif (MIT) ? Ce n'est pas un détail cosmétique, ça engage le modèle du produit. (→ choix de licence)
3. **À qui appartient le code que mon ami écrit ?** Sans écrit, **il en garde les droits** — même bénévole. (→ clause de cession)
4. **Qu'est-ce qui n'est PAS ma décision ?** La titularité d'un code généré par IA, la portée exacte d'une obligation copyleft dans mon cas, la rédaction d'une cession : ça se **valide avec un juriste**.

Ce module te donne les réflexes pour répondre techniquement aux trois premières questions — et pour savoir précisément où s'arrête la quatrième.

---

## 2. Théorie complète, concise

### 2.1 Ce qu'est une licence (et pourquoi « pas de licence » est le pire cas)

Une **licence** est le contrat par lequel l'auteur d'un logiciel autorise autrui à l'utiliser, le modifier, le redistribuer — et sous quelles conditions. Le code est protégé par le **droit d'auteur** dès sa création : par défaut, **tous droits réservés**.

Réflexe dev, contre-intuitif : un dépôt public **sans fichier de licence n'est pas « libre »**. En l'absence de licence, la loi s'applique par défaut, donc **personne n'a le droit** de le réutiliser légalement. « Public sur GitHub » ≠ « open source ». L'open source, c'est **une licence explicite** qui accorde des droits.

### 2.2 Permissif vs copyleft : le grand partage

Toutes les licences OSS approuvées par l'OSI (Open Source Initiative) autorisent l'usage, la modification et le partage. Elles se répartissent en deux familles selon ce qu'elles **exigent en retour** :

- **Permissives** (MIT, Apache 2.0, BSD, ISC) : tu peux réutiliser, modifier, **même dans un produit propriétaire et fermé**. La contrepartie est minimale : conserver l'avis de copyright et de licence.
- **Copyleft** (GPL, AGPL, LGPL) : tu peux réutiliser et modifier, **mais** les œuvres dérivées doivent rester **sous la même licence** — c'est-à-dire rester ouvertes. Le copyleft « propage » l'ouverture en aval.

Un moyen mnémotechnique : **permissif = « fais ce que tu veux, cite-moi » ; copyleft = « sers-toi, mais rends à la communauté »**.

### 2.3 Les quatre licences à connaître par cœur

Résumés de **principes** (source : [choosealicense.com](https://choosealicense.com/licenses/)). Le texte de la licence prime toujours.

| Licence | Famille | Ce que tu dois faire | Point saillant |
|---|---|---|---|
| **MIT** | Permissive | Conserver l'avis de copyright + licence. | Ultra-simple, la plus répandue. React, Vue, Express, Tailwind. |
| **Apache 2.0** | Permissive | Conserver les avis + **documenter les modifications** + respecter la clause **brevets**. | Comme MIT + **protection explicite sur les brevets**. TypeScript, Kubernetes. |
| **GPL-3.0** | Copyleft **fort** | Si tu **distribues** un binaire dérivé, fournir **tout le code source** sous GPL. | L'ouverture se propage à l'œuvre dérivée distribuée. |
| **AGPL-3.0** | Copyleft **fort + réseau** | Comme GPL, **et** « l'usage en réseau vaut distribution » : même en SaaS, les utilisateurs peuvent exiger le **code source**. | **Le piège du SaaS** : pas besoin de « livrer » un binaire pour déclencher l'obligation. |

Et une nuance utile :

- **LGPL** = copyleft **faible**. Tu peux **lier** une bibliothèque LGPL depuis un logiciel propriétaire sans « contaminer » tout ton code ; seules les **modifications de la bibliothèque elle-même** restent sous LGPL. C'est le compromis « je partage mes modifs de la lib, pas toute mon appli ».

> Ces catégories (fort / faible / réseau) sont des **principes**. La qualification exacte de « œuvre dérivée », de « liaison » ou de « distribution » **dans ton architecture précise** est une question juridique. En cas de doute réel sur une obligation : **remonter au juriste**, ne pas trancher au feeling.

### 2.4 La contamination AGPL, ou pourquoi un SaaS doit se méfier

C'est **le** point où un dev peut engager tout le produit sans le vouloir. Le raisonnement historique du copyleft GPL : l'obligation de partager le source ne se déclenche qu'à la **distribution** d'un binaire. Or un SaaS ne distribue rien — l'utilisateur se connecte à un serveur. Beaucoup d'entreprises utilisaient donc du GPL côté serveur sans jamais ouvrir leur code.

L'**AGPL ferme cette faille** : elle assimile **l'accès via le réseau à une distribution**. Concrètement, si une brique AGPL est intégrée au cœur de TribuZen et sert les utilisateurs, ceux-ci peuvent être en droit de réclamer **l'intégralité du code source** de TribuZen sous AGPL.

**Réflexe dev** : avant d'ajouter une dépendance AGPL (ou GPL) à un produit propriétaire, **stop**. Chercher une alternative permissive, ou une **édition commerciale** de la même brique (beaucoup d'éditeurs vendent une licence commerciale qui lève l'obligation AGPL), ou remonter la décision. Ne jamais l'installer « pour tester en prod » sans avoir posé la question.

### 2.5 Compatibilité de licences

Assembler plusieurs briques, c'est **combiner** des licences — et toutes ne s'entendent pas.

- **Permissif → copyleft** : une brique MIT peut être intégrée dans un projet GPL (le résultat devient GPL). Sens compatible.
- **Copyleft → permissif** : l'inverse **ne marche pas**. Tu ne peux pas ré-embarquer du GPL dans un produit MIT/propriétaire fermé sans respecter la GPL. Sens incompatible.
- Certaines licences copyleft sont **mutuellement incompatibles** entre versions/familles.

**Réflexe dev** : la licence la plus « contraignante » du lot **tire l'ensemble vers elle**. Un projet propriétaire vit sereinement avec des dépendances **permissives** ; il doit **surveiller** toute dépendance copyleft.

### 2.6 Obligations concrètes : attribution et partage

Même les licences permissives ont des **obligations** — les oublier est une violation, pas un détail.

- **Attribution** (MIT, Apache, BSD) : conserver l'avis de copyright et le texte de licence. En pratique : un fichier `NOTICE` / `THIRD-PARTY-LICENSES` qui liste les dépendances et leurs licences.
- **Documentation des modifications** (Apache 2.0) : signaler les fichiers que tu as modifiés.
- **Partage du source** (GPL/AGPL) : fournir le code source correspondant, sous la même licence.

Réflexe dev : générer un **fichier d'attributions** est automatisable (§3) et devrait faire partie du build d'un produit sérieux.

### 2.7 Qui détient le code généré par IA ? (zone grise — on ne tranche pas)

Ici, **le module s'arrête volontairement au constat**. L'état du droit sur la **titularité d'une œuvre générée par IA** est **mouvant et non stabilisé**, et varie selon les juridictions. Quelques repères de **prudence**, pas des vérités :

- Le droit d'auteur suppose classiquement une **création humaine**. Un code « brut » entièrement produit par une IA, sans apport humain caractérisé, **soulève une vraie question** de protégeabilité — sans réponse tranchée universelle.
- Les **CGU de l'outil** (assistant IA, service de complétion) fixent des conditions sur l'usage des sorties : elles se **lisent** avant de s'engager, car elles varient d'un fournisseur à l'autre et dans le temps.
- Un risque distinct existe : une IA entraînée sur du code sous licence peut, dans de rares cas, **reproduire des fragments** rattachés à une licence contraignante. D'où la prudence à **relire et comprendre** ce qui est généré, jamais copier des blocs entiers en aveugle.

> **Zone grise assumée.** Ce module **ne donne pas** de réponse ferme à « qui possède le code généré par IA » ni à « puis-je le protéger / le revendre ». Ces questions dépendent de la juridiction, du contrat de l'outil, du degré d'apport humain, et de décisions de justice qui évoluent. **Toute décision engageante sur ce point doit être posée à un juriste / avocat en PI.** Le réflexe dev se limite à : **relire, comprendre, adapter**, tracer ce qui a été généré, et **remonter la question** plutôt que d'affirmer.

### 2.8 PI en équipe : la clause de cession, et le cas particulier du salarié

En droit français, **payer quelqu'un pour créer ne transfère pas automatiquement les droits d'auteur**. Sans écrit, l'auteur (le développeur) **conserve** ses droits patrimoniaux sur le code produit. D'où deux situations à distinguer — **principes** à faire préciser par un juriste :

- **Prestataire / freelance / contributeur bénévole** : il faut une **clause de cession de droits** écrite et explicite (droits cédés, étendue, territoire, durée, rémunération). Sans elle, le code livré n'appartient pas vraiment à l'entreprise qui l'a commandé.
- **Salarié en CDI/CDD** : le régime est **différent** — le droit prévoit des dispositions spécifiques pour les créations de salariés dans le cadre de leurs fonctions (et un régime distinct, encadré, pour le **logiciel** notamment). Ce n'est **pas** un blanc-seing automatique universel : les modalités précises se **vérifient avec un juriste** et se **sécurisent par une clause** dans le contrat de travail.

**Réflexe dev / fondateur** : dès qu'une **autre personne** touche au code (ami, freelance, alternant, cofondateur), la question « à qui appartient ce code ? » se pose **avant** le premier commit, pas après. Le dev repère le besoin ; **le juriste rédige** la clause.

---

## 3. Worked examples

### Exemple 1 — Auditer les licences des dépendances de TribuZen

Objectif : savoir **quelles licences** transitent dans le projet et **bloquer** les copyleft indésirables. Outil : `license-checker` (ou `license-checker-rspack`), lancé à la racine d'un projet Node.

```bash
# 1. Vue d'ensemble : combien de dépendances par type de licence
npx license-checker --summary

# Exemple de sortie (illustratif) :
#   ├─ MIT: 812
#   ├─ ISC: 61
#   ├─ Apache-2.0: 44
#   ├─ BSD-3-Clause: 22
#   └─ AGPL-3.0: 1        ← 🚩 celle-ci mérite un STOP immédiat

# 2. Autoriser SEULEMENT les licences compatibles avec un SaaS propriétaire.
#    Le check échoue (exit code ≠ 0) si une dépendance sort de la liste blanche.
npx license-checker --onlyAllow "MIT;Apache-2.0;BSD-2-Clause;BSD-3-Clause;ISC;0BSD"

# 3. Générer le rapport d'attribution (obligation des licences permissives)
npx license-checker --csv --out THIRD-PARTY-LICENSES.csv
```

Lecture du résultat, étape par étape :

1. Le `--summary` donne la **photo** : ici, une dépendance **AGPL-3.0** ressort. Dans un SaaS propriétaire, c'est un **signal rouge** (§2.4).
2. Le `--onlyAllow` transforme l'audit en **garde-fou automatisable** : intégré en CI, il **casse le build** si quelqu'un ajoute demain une dépendance GPL/AGPL. C'est le vrai gain — la conformité devient **passive** au lieu de reposer sur la vigilance humaine.
3. Le CSV devient le fichier d'**attribution** (`THIRD-PARTY-LICENSES`), qui satisfait l'obligation de citer les auteurs des dépendances permissives (§2.6).

Ce que le dev décide : la **liste blanche technique** et le **garde-fou CI**. Ce qui remonte : « peut-on faire une exception pour telle brique GPL ? » → **décision juridique**.

### Exemple 2 — Que faire face à la belle lib AGPL du §1 ?

Arbre de décision, dans l'ordre :

1. **Existe-t-il un équivalent permissif ?** (une lib de graphiques MIT/Apache). → Si oui, **on prend celui-là**. Fin.
2. **Sinon, l'éditeur propose-t-il une licence commerciale ?** Beaucoup de projets AGPL vendent une **édition commerciale** qui lève l'obligation d'ouverture. → décision **budget + juridique**, on remonte.
3. **Sinon, la brique peut-elle être isolée** de façon à ne pas constituer une œuvre dérivée du cœur (ex. service séparé) ? → **question juridique délicate** : la frontière « œuvre dérivée » ne se tranche **pas** au feeling d'un dev. On remonte.
4. **Par défaut, si le doute persiste : on n'installe pas.** Le coût d'une erreur (devoir ouvrir tout le code de TribuZen) est sans commune mesure avec le confort d'une jolie lib.

Le dev **cadre les options techniques** (1 et 3) ; le **juriste tranche** les options contractuelles (2 et 3).

---

## 4. Pièges & misconceptions

### PIÈGE #1 — « C'est sur GitHub, donc c'est libre »

Un dépôt **public sans licence** n'est **pas** open source : par défaut, **tous droits réservés**. Le rendre visible n'accorde aucun droit de réutilisation. Réflexe : chercher le fichier `LICENSE` **avant** de copier du code d'un repo public.

### PIÈGE #2 — « On est un SaaS, le copyleft ne nous concerne pas »

Vrai pour la **GPL** classique (pas de distribution de binaire), **faux pour l'AGPL** : l'usage en réseau **vaut distribution**. Une dépendance AGPL au cœur d'un SaaS peut obliger à **publier tout le code**. C'est précisément le trou que l'AGPL a été conçue pour boucher.

### PIÈGE #3 — Confondre permissif et « sans obligation »

MIT et Apache sont permissifs **mais pas sans conditions** : il faut **conserver l'avis de copyright et de licence** (et documenter les modifs pour Apache). Livrer un produit qui embarque du MIT **sans** fichier d'attribution est déjà une **violation** de licence.

### PIÈGE #4 — Croire qu'on possède le code d'un freelance parce qu'on l'a payé

En droit français, **le paiement ne vaut pas cession** des droits d'auteur. Sans **clause de cession écrite**, le prestataire (ou le contributeur bénévole) **garde** ses droits. Le cas du **salarié** est différent et encadré, mais lui-même **se sécurise par une clause** et se vérifie avec un juriste — ce n'est pas un automatisme à supposer.

### PIÈGE #5 — Trancher soi-même « le code de l'IA m'appartient »

La titularité et la protégeabilité d'un code **généré par IA** sont une **zone grise** mouvante, dépendante de la juridiction, des CGU de l'outil et de l'apport humain. Affirmer « c'est à moi, je peux le protéger/le vendre » **sans validation** engage l'entreprise sur un terrain instable. Réflexe : **relire, comprendre, adapter**, tracer, et **remonter la question** au juriste.

### PIÈGE #6 — Mélanger des licences incompatibles « parce que ça compile »

Le compilateur ne connaît pas le droit. Embarquer du **GPL** dans un produit propriétaire fermé « parce que ça marche » est une **violation**, pas une astuce. La compatibilité de licences se **vérifie**, elle ne se déduit pas du fait que le build passe.

---

## 5. Ancrage TribuZen

TribuZen est un **SaaS propriétaire** qui manipule des données sensibles de familles. Deux enjeux de PI structurent le projet, et ce sont **des choix de dev** avant d'être des choix d'avocat :

- **Hygiène de licence des dépendances.** Le produit ne doit embarquer **aucune dépendance AGPL** (et surveiller les GPL) qui risquerait de forcer l'ouverture du code. Cela se traduit par un **garde-fou CI** : `license-checker --onlyAllow` en pipeline, qui casse le build sur toute licence hors liste blanche. Le fichier `THIRD-PARTY-LICENSES` satisfait l'attribution des libs permissives.
- **Titularité du code produit.** Tant que Sylvain code seul, la question est simple. **Dès qu'un tiers contribue** (ami, freelance, futur associé), une **clause de cession** doit précéder le premier commit — à **faire rédiger par un juriste**. Le code généré par IA est **relu et adapté**, tracé, et toute question de titularité est **remontée**, pas tranchée.

Choisir la **licence de TribuZen lui-même** (rester propriétaire/fermé, ce qui est le cas par défaut d'un SaaS) est une décision **produit + juridique**, pas un réglage technique.

Fichiers concernés dans `smaurier/tribuzen` :
```
tribuzen/
  package.json               ← les dépendances : chacune apporte SA licence
  .github/workflows/ci.yml   ← garde-fou : license-checker --onlyAllow (casse le build)
  THIRD-PARTY-LICENSES.csv   ← attribution des dépendances permissives
  LICENSE                    ← (absent si propriétaire) — décision produit + juridique
  docs/
    licences-audit.md        ← résultat de l'audit + décisions (livrable du lab)
```

> Ce qui relève du dev : **auditer**, poser le **garde-fou CI**, produire l'**attribution**, repérer les risques (AGPL, tiers contributeur). Ce qui relève du juriste : **choisir la licence** du produit, **rédiger la cession**, trancher la **titularité du code IA** et la portée d'une **obligation copyleft**.

---

## 6. Points clés

1. Pas de fichier de licence = **tous droits réservés** ; « public sur GitHub » ≠ open source.
2. **Permissif** (MIT, Apache) = réutilisable même en propriétaire, contre attribution ; **copyleft** (GPL, AGPL) = les dérivés restent ouverts.
3. **Apache 2.0** = MIT + clause **brevets** + documentation des modifs ; **LGPL** = copyleft **faible** (lier sans tout contaminer).
4. **AGPL** = le piège du SaaS : l'**usage réseau vaut distribution**, donc obligation possible de **publier tout le code**.
5. **Compatibilité** : la licence la plus contraignante tire l'ensemble ; permissif→copyleft OK, l'inverse non.
6. Même les permissives ont des **obligations** : attribution (fichier `THIRD-PARTY-LICENSES`), doc des modifs pour Apache.
7. Auditer les dépendances avec `license-checker` ; en faire un **garde-fou CI** (`--onlyAllow`).
8. En équipe, **payer ≠ posséder** : une **clause de cession** écrite est nécessaire pour prestataire/bénévole ; le **salarié** relève d'un régime distinct à sécuriser par contrat.
9. La **titularité du code généré par IA** est une **zone grise** : relire/comprendre/adapter, tracer, et **remonter au juriste** — ne pas trancher seul.

---

## 7. Seeds Anki

```
Un dépôt public sur GitHub sans fichier LICENSE, est-ce open source ?|Non. Sans licence explicite, c'est « tous droits réservés » par défaut : personne n'a le droit de le réutiliser. Public ≠ libre.
Quelle est la différence entre une licence permissive et une licence copyleft ?|Permissive (MIT, Apache) : réutilisable même dans un produit propriétaire, contre attribution. Copyleft (GPL, AGPL) : les œuvres dérivées doivent rester sous la même licence (rester ouvertes).
Qu'apporte Apache 2.0 par rapport à MIT ?|Une clause explicite sur les brevets et l'obligation de documenter les modifications, en plus de l'attribution.
Pourquoi l'AGPL est-elle un piège pour un SaaS ?|Elle assimile l'usage via le réseau à une distribution : même sans livrer de binaire, les utilisateurs peuvent exiger le code source complet du service. Le GPL classique, lui, ne se déclenche qu'à la distribution d'un binaire.
Qu'est-ce que la LGPL (copyleft faible) ?|On peut lier une bibliothèque LGPL depuis un logiciel propriétaire sans contaminer tout le code ; seules les modifications de la bibliothèque elle-même restent sous LGPL.
Peut-on intégrer du code GPL dans un produit MIT/propriétaire fermé ?|Non. Permissif vers copyleft fonctionne (le résultat devient copyleft), mais copyleft vers permissif/propriétaire est incompatible : la licence la plus contraignante tire l'ensemble.
Les licences permissives (MIT/Apache) sont-elles sans obligation ?|Non : il faut au minimum conserver l'avis de copyright et de licence (attribution), typiquement via un fichier THIRD-PARTY-LICENSES ; Apache exige aussi de documenter les modifications.
En France, payer un freelance pour du code suffit-il à en devenir propriétaire ?|Non. Le paiement ne vaut pas cession des droits d'auteur : il faut une clause de cession écrite et explicite. Le cas du salarié relève d'un régime distinct, à sécuriser par contrat et à vérifier avec un juriste.
À qui appartient le code généré par IA ?|Zone grise mouvante selon la juridiction, les CGU de l'outil et l'apport humain. On ne tranche pas seul : relire/comprendre/adapter, tracer, et remonter la question à un juriste / avocat en PI.
Comment auditer les licences des dépendances d'un projet Node ?|Avec license-checker : --summary pour la photo, --onlyAllow "MIT;Apache-2.0;..." comme garde-fou CI qui casse le build sur une licence hors liste blanche, --csv pour le fichier d'attribution.
```

---

## Pont vers le lab

> Lab associé : `labs/lab-07-propriete-intellectuelle-et-licences/README.md`. Audit des licences des dépendances de TribuZen + décision argumentée sur la licence du projet. Analyse et décision, pas de code de production — feedback coach en session.
