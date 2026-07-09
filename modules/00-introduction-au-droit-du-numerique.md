---
titre: Introduction au droit du numérique (pour développeurs)
cours: 23-droit-numerique
notions: ["pourquoi le dev est concerné", "panorama RGPD", "panorama DSA", "panorama AI Act", "panorama RGAA", "responsable de traitement vs sous-traitant", "rôle dev vs juriste vs DPO", "où finit la responsabilité du dev", "carte du cours"]
outcomes:
  - "sait expliquer pourquoi un développeur est concerné par le droit du numérique"
  - "sait situer RGPD, DSA, AI Act et RGAA — à quoi sert chacun et qui il vise"
  - "sait distinguer ce qui relève du dev, du juriste et du DPO"
  - "sait identifier où finit sa responsabilité de dev et quand escalader à un expert"
prerequis: []
next: 01-rgpd-reflexes-developpeur
libs: []
tribuzen: "conformité transverse — TribuZen traite des données d'adultes ET de mineurs, photos, géolocalisation, partage familial"
last-reviewed: 2026-07
---

<!-- FLAG-REVIEW: droit/légal — valider par Sylvain + juriste avant diffusion publique -->

> ⚠️ **Ceci N'EST PAS un conseil juridique.** Ce module donne des **réflexes de développeur** et un panorama pour savoir *de quoi on parle* et *à qui poser la question*. Toute décision juridique concrète (base légale à retenir, qualification d'un traitement, rédaction d'un contrat, appréciation d'un risque) doit être validée par un **juriste, un avocat ou un DPO**. Le droit évolue : les principes cités ici renvoient toujours à une **source officielle** (CNIL, Commission européenne, Légifrance), jamais à un article/seuil figé.

# Introduction au droit du numérique (pour développeurs)

> **Outcomes — tu sauras FAIRE :** expliquer pourquoi un dev est concerné par le droit, situer RGPD/DSA/AI Act/RGAA, distinguer le rôle du dev de celui du juriste/DPO, et savoir où finit ta responsabilité.
> **Difficulté :** :star::star:

## 1. Cas concret d'abord

Tu es le seul développeur de **TribuZen**, une app d'organisation familiale. Un lundi matin, trois choses arrivent en même temps :

1. Une utilisatrice t'écrit : *« Je veux que vous supprimiez toutes les données de mon fils de 8 ans. »*
2. Le product owner te demande d'ajouter une **fonction de partage de photos** entre familles, et une **carte** qui montre « où sont les enfants » en temps réel.
3. Un collègue propose de brancher un **assistant IA** qui lit le journal de bord des familles pour « suggérer des routines ».

Aucune de ces trois demandes n'est « juste du code ». Chacune touche une obligation légale :

| Demande | Loi concernée | Question que TU dois te poser |
|---|---|---|
| Supprimer les données du fils | RGPD (droits des personnes) | Ai-je un moyen d'effacer *vraiment* toutes les données d'une personne ? |
| Partage de photos + géoloc d'enfants | RGPD (données sensibles, mineurs) + DSA (protection des mineurs) | Qui a consenti ? Est-ce que je minimise ? Est-ce prudent techniquement ? |
| Assistant IA sur le journal | AI Act + RGPD | Est-ce que l'utilisateur sait qu'une IA lit ses données ? Dans quelle catégorie de risque suis-je ? |

Et si un jour une association de parents malvoyants ne peut pas utiliser l'app, c'est le **RGAA** (accessibilité) qui entre en jeu.

**Le point clé :** tu ne vas pas *décider* du droit — un juriste le fera. Mais c'est **toi** qui écris le code qui rend la conformité possible ou impossible. Si l'endpoint de suppression n'existe pas, aucun juriste ne peut réparer ça à ta place. Ce module te donne la **carte** : savoir de quelle loi on parle, à quoi elle sert, et où s'arrête ta responsabilité.

---

## 2. Théorie complète, concise

### 2.1 Pourquoi le développeur est concerné (et pas seulement le juriste)

Historiquement, la conformité était vue comme « un problème de juristes ». Ce n'est plus vrai, pour une raison simple : **la loi impose désormais des exigences qui se traduisent directement en code et en architecture.**

- Le RGPD parle de *privacy by design* et *by default* : la protection des données doit être pensée **dès la conception**, donc au moment où le dev choisit son modèle de données.
- Effacer les données d'un utilisateur, exporter ses données, chiffrer, journaliser les accès : ce sont des **fonctionnalités à écrire**, pas des clauses de contrat.
- Une décision d'architecture (« je stocke les photos en clair sur un serveur aux États-Unis ») peut créer une non-conformité qu'aucun document juridique ne rattrape.

> **Formule à retenir :** le juriste dit *ce qui est permis*, le dev construit *ce qui est possible*. Une obligation légale sans implémentation technique n'existe pas dans la vraie vie.

### 2.2 Le panorama — quatre textes, quatre buts

Ce cours tourne autour de quatre grands cadres. Ils ne servent pas à la même chose. Voici la carte mentale à garder.

**RGPD — protéger les données personnelles des personnes**
Le Règlement général sur la protection des données (UE) encadre **tout traitement de données personnelles** (nom, email, photo, position, données de santé…). Selon la CNIL, il repose sur quelques principes-réflexes : une **finalité** définie, la **minimisation** (ne collecter que le nécessaire), une **base légale** valide, le respect des **droits des personnes** (accès, effacement, portabilité…), la **sécurité**, et l'**accountability** (être capable de *prouver* qu'on est conforme). C'est le texte le plus central pour TribuZen. Source : cnil.fr.

**DSA — encadrer les plateformes et les contenus en ligne**
Le Digital Services Act (UE) vise les **services en ligne** (marketplaces, réseaux sociaux, plateformes de partage). Il impose notamment : des mécanismes de **signalement de contenu illicite** (*notice-and-action*), de la **transparence** sur la publicité, l'interdiction des *dark patterns*, et une **protection renforcée des mineurs** (interdiction de la publicité ciblée sur les enfants). Les obligations sont **proportionnées à la taille** : les très grandes plateformes en ont beaucoup plus. Source : digital-strategy.ec.europa.eu.

**AI Act — encadrer les systèmes d'IA par le risque**
Le Règlement IA (UE) est le premier cadre complet sur l'IA. Il classe les systèmes par **niveau de risque** : *inacceptable* (interdit), *élevé* (obligations lourdes : documentation, supervision humaine, jeux de données de qualité…), *transparence* (ex. un chatbot doit dire qu'il est une IA ; les contenus générés doivent être identifiables), et *minimal* (la grande majorité des cas, sans règle spécifique). Un dev qui intègre de l'IA doit d'abord **situer son système** sur cette échelle. Source : digital-strategy.ec.europa.eu.

**RGAA — rendre le numérique accessible aux personnes handicapées**
Le Référentiel général d'amélioration de l'accessibilité (France) décline en critères vérifiables l'obligation légale d'accessibilité numérique (rattachée à la loi de 2005). Il s'aligne sur les **WCAG**. Il impose, pour les organismes concernés, une **déclaration d'accessibilité** et un plan d'action. C'est le seul des quatre qui touche directement l'UI que le dev construit. Source : accessibilite.numerique.gouv.fr.

> **Piège fréquent :** croire que ces textes se recouvrent. Non — ils répondent à des questions différentes : *qui a le droit de traiter quelles données* (RGPD), *quelles règles pour une plateforme et ses contenus* (DSA), *quel risque pour un système d'IA* (AI Act), *l'app est-elle utilisable par tous* (RGAA). Un même projet peut être concerné par les quatre à la fois — c'est le cas de TribuZen.

### 2.3 Qui fait quoi : dev, juriste, DPO — et les rôles RGPD

Deux vocabulaires à ne pas confondre : les **rôles humains** (qui décide) et les **rôles RGPD** (qui porte la responsabilité juridique du traitement).

**Rôles humains dans une équipe :**

- **Le juriste / l'avocat** : interprète la loi, qualifie les situations, arbitre les risques, rédige les contrats. C'est lui qui *décide* « cette base légale est valable » ou « ce transfert est risqué ».
- **Le DPO (Délégué à la protection des données)** : point de contact conformité RGPD, tient/supervise le registre des traitements, conseille, fait le lien avec l'autorité (la CNIL en France). Obligatoire dans certains cas, recommandé sinon. Il **oriente** et **contrôle**, il ne code pas.
- **Le développeur (toi)** : **implémente** ce que la conformité exige (endpoints de droits, chiffrement, minimisation du schéma, logs d'accès, bandeau de consentement, accessibilité) et **signale** ce qui semble risqué. Tu es souvent le premier à *voir* un problème parce que tu vois les données.

**Rôles RGPD (juridiques) :**

- **Responsable de traitement** : l'entité qui **décide** des finalités et des moyens d'un traitement (pour TribuZen, l'éditeur de l'app). C'est elle qui porte la responsabilité principale.
- **Sous-traitant** : un prestataire qui traite les données **pour le compte** du responsable (hébergeur, service d'emailing, Stripe…). Encadré par un contrat dédié (vu au module 05).

> Ne confonds pas « responsable de traitement » (rôle juridique de l'entité) et « développeur responsable » (personne). Le dev n'est presque jamais *personnellement* le responsable de traitement — mais son travail engage la responsabilité de l'entité qui l'est.

### 2.4 Où finit la responsabilité du développeur

C'est la question la plus importante de ce module. Ligne de partage pratique :

**Ce qui est de ta responsabilité (dev) :**
- Rendre les obligations **techniquement possibles** : effacement réel, export, chiffrement, journalisation, minimisation du schéma de données.
- **Ne pas créer de non-conformité par négligence** : ne pas logger un mot de passe en clair, ne pas envoyer des données sensibles à un service tiers non vérifié « pour tester ».
- **Signaler** (*escalader*) dès qu'une demande produit sent le risque juridique. Un ticket « on ajoute la géoloc des enfants » doit déclencher chez toi le réflexe : *« je préviens le juriste/DPO avant de coder. »*

**Ce qui n'est PAS de ta responsabilité (mais celle du juriste/DPO) :**
- **Décider** de la base légale d'un traitement.
- **Qualifier** juridiquement une donnée ou un risque, arbitrer un litige.
- **Rédiger** les mentions légales, CGU, contrats de sous-traitance.
- **Répondre** officiellement à la CNIL.

> **Réflexe d'or :** en cas de doute juridique, tu **n'inventes pas** la réponse et tu **ne codes pas** la fonctionnalité risquée en silence. Tu documentes la question et tu escalades. « Je ne sais pas, je demande au DPO » est la bonne réponse d'un dev — pas un aveu de faiblesse.

### 2.5 La carte du cours

Ce module 00 est la **vue d'ensemble**. Les modules suivants zooment, dans l'ordre :

- **01 — RGPD, réflexes développeur** : bases légales, données perso vs sensibles, minimisation, privacy by design.
- **02 — Consentement, cookies et traceurs** : quand et comment recueillir un consentement valable, bandeau, preuve.
- **03 — Droits des personnes** : accès, rectification, effacement, portabilité, opposition — et comment les implémenter.
- **04 — DPIA (analyse d'impact)** : quand elle est obligatoire, cas des mineurs, méthode, outil PIA de la CNIL.
- **05 — DPA et sous-traitants** : contrat de sous-traitance, transferts hors UE.
- **06 — CGU, mentions et obligations plateforme** : DSA, protection des mineurs.
- **07 — Propriété intellectuelle et licences** : licences open source, code généré par IA, IP de l'équipe.
- **08 — Accessibilité légale et conformité** : RGAA, déclaration d'accessibilité, et **synthèse conformité TribuZen** (capstone).

---

## 3. Worked examples

### Exemple 1 — Trier une demande produit : « qui décide quoi ? »

Ticket reçu : *« Ajouter le partage de la position en temps réel des enfants entre les parents d'une même famille. »*

Raisonnement d'un dev qui a la carte en tête :

1. **De quelle(s) loi(s) parle-t-on ?** Position d'un **mineur** = donnée personnelle, sur une personne vulnérable → **RGPD** (sensibilité, minimisation). Fonction de partage entre utilisateurs → réflexe **DSA** (mineurs) à vérifier.
2. **Qu'est-ce qui est de mon ressort (dev) ?**
   - Minimiser : ai-je *vraiment* besoin de la position continue, ou d'une position à la demande ? (choix technique qui réduit le risque).
   - Prévoir qui voit quoi (contrôle d'accès strict à la famille).
   - Prévoir l'effacement de cet historique.
3. **Qu'est-ce qui N'est PAS de mon ressort ?**
   - *Décider* si c'est légalement autorisé et sous quelle base, *décider* du consentement requis pour un mineur. → **j'escalade au juriste/DPO.**
4. **Action concrète :** j'ouvre un point avec le DPO *avant* de coder, je propose une version minimisée (position à la demande, pas de tracking continu), et je ne merge rien tant que la question de fond n'est pas tranchée.

Résultat : le dev a fait son travail (rendre possible + minimiser + signaler) **sans** avoir pris une décision juridique à la place d'un juriste.

### Exemple 2 — Répondre à une demande d'effacement

Une utilisatrice demande la suppression des données de son fils.

- **Rôle du dev :** vérifier qu'un chemin technique existe pour *supprimer réellement* toutes les données rattachées à cette personne (profil, photos, entrées de journal, sauvegardes). Si ce chemin n'existe pas, le construire. C'est l'implémentation du **droit à l'effacement** (détaillé au module 03).
- **Rôle du juriste/DPO :** décider s'il faut *tout* supprimer ou *anonymiser/conserver* certaines données pour une autre obligation légale (ex. une facture à conserver pour raison comptable). Le dev ne tranche pas cet arbitrage seul.
- **Réflexe :** le dev prépare la capacité technique des deux options (suppression **et** anonymisation), et applique la règle que le DPO valide.

> Note : les délais, les motifs de refus légitimes et la forme de la réponse sont du domaine juridique — le dev fournit l'outil, pas la décision.

---

## 4. Pièges & misconceptions

### PIÈGE #1 — « La conformité, c'est le problème des juristes, pas le mien »

Faux. Le RGPD impose la *privacy by design* : la protection se joue au moment des choix techniques (schéma de données, où sont stockées les photos, quoi logger). Un juriste ne peut pas rattraper après coup une architecture qui rend l'effacement impossible. **Le dev est un maillon de conformité, pas un simple exécutant.**

### PIÈGE #2 — Confondre les quatre lois

RGPD, DSA, AI Act et RGAA ne se recouvrent pas. Chacun répond à une question différente (données / plateforme / IA / accessibilité). Croire que « être conforme RGPD » suffit est une erreur : une app peut être irréprochable côté données et totalement inaccessible (RGAA) ou non transparente sur son IA (AI Act).

### PIÈGE #3 — Prendre un article, un seuil ou un montant d'amende pour une vérité figée

Le droit évolue, les seuils et les interprétations changent, et un cas concret dépend de nombreux détails. **Ne code jamais une règle métier « en dur » sur la base d'un chiffre lu quelque part.** Retiens le *principe* et renvoie au *texte officiel* et au juriste. Ce module lui-même ne donne aucun article/seuil comme actionnable — c'est volontaire.

### PIÈGE #4 — Croire que le développeur est « responsable de traitement »

Le **responsable de traitement** est l'entité qui décide des finalités et moyens (l'éditeur), pas le dev en tant que personne. Le dev n'est pas non plus le DPO. Confondre ces rôles conduit soit à s'attribuer des décisions qui ne sont pas les siennes, soit à se croire déresponsabilisé. La bonne posture : *implémenter et signaler*.

### PIÈGE #5 — Décider seul en cas de doute juridique

Face à une incertitude, deux mauvais réflexes : (a) inventer une interprétation et coder quand même, (b) ignorer le problème. Le bon réflexe est unique : **documenter la question et escalader** au juriste/DPO avant de livrer.

---

## 5. Ancrage TribuZen

TribuZen est un cas d'école parce qu'il **cumule** les quatre cadres :

- **RGPD** — l'app traite des données d'**adultes ET de mineurs**, des **photos**, de la **géolocalisation**, et potentiellement des données sensibles (santé de l'enfant). C'est le cœur du cours (modules 01 à 05).
- **DSA** — le **partage** entre familles fait de TribuZen un service où circulent des contenus entre utilisateurs, avec une exigence particulière de **protection des mineurs** (module 06).
- **AI Act** — toute fonction d'**IA** branchée sur le journal de bord des familles oblige à situer le système sur l'échelle de risque et à assurer la transparence (rappel transverse, détaillé côté cours IA).
- **RGAA** — l'app familiale doit être **utilisable par tous les membres de la famille**, y compris ceux en situation de handicap (module 08, capstone conformité).

Concrètement, pour le dev TribuZen, la carte se traduit par des **responsabilités transverses** présentes dès la conception :

```
tribuzen/  (responsabilités conformité du dev, transverses)
  ├── suppression réelle d'un compte / d'un membre        → droit à l'effacement (RGPD, mod. 03)
  ├── export des données d'un utilisateur                 → portabilité (RGPD, mod. 03)
  ├── minimisation du schéma (géoloc à la demande, pas continue) → minimisation (RGPD, mod. 01)
  ├── contrôle d'accès strict (photos/position visibles à la famille seulement) → sécurité (RGPD)
  ├── transparence quand une IA lit le journal            → AI Act (transparence)
  └── UI utilisable au clavier / lecteur d'écran          → RGAA (mod. 08)
```

Aucune de ces lignes n'est une décision juridique : ce sont des **capacités techniques** que le dev doit rendre possibles pour que la conformité *puisse* exister. Les décisions (base légale, consentement d'un mineur, délais) restent au juriste/DPO.

---

## 6. Points clés

1. Le développeur est concerné par le droit du numérique parce que la loi impose des exigences qui se traduisent en **code et en architecture** (privacy by design).
2. **RGPD** = protéger les données personnelles ; **DSA** = encadrer les plateformes et contenus ; **AI Act** = classer les systèmes d'IA par risque ; **RGAA** = rendre le numérique accessible.
3. Ces quatre textes ne se recouvrent pas : un même projet (comme TribuZen) peut être concerné par les quatre.
4. Le **juriste** décide de ce qui est permis, le **DPO** oriente et contrôle la conformité, le **dev implémente et signale**.
5. « Responsable de traitement » est l'entité qui décide (l'éditeur), pas le dev en tant que personne.
6. La responsabilité du dev finit là où commence la **décision juridique** : en cas de doute, **documenter et escalader**, jamais inventer.
7. Aucun article, seuil ou montant n'est une vérité figée : retenir le **principe** et renvoyer à la **source officielle**.

---

## 7. Seeds Anki

```
Pourquoi un développeur est-il concerné par le droit du numérique, et pas seulement le juriste ?|Parce que la loi impose des exigences qui se traduisent en code et en architecture (privacy by design). Le dev rend la conformité techniquement possible ou impossible ; un juriste ne rattrape pas une architecture qui empêche l'effacement.
À quoi sert le RGPD ?|À protéger les données personnelles des personnes : finalité, minimisation, base légale, droits des personnes, sécurité, accountability. Source de référence : cnil.fr.
À quoi sert le DSA (Digital Services Act) ?|À encadrer les services/plateformes en ligne : signalement de contenu illicite, transparence de la publicité, interdiction des dark patterns, protection renforcée des mineurs. Obligations proportionnées à la taille de la plateforme.
À quoi sert l'AI Act ?|À encadrer les systèmes d'IA par niveau de risque (inacceptable / élevé / transparence / minimal). Un dev doit d'abord situer son système sur cette échelle ; transparence exigée pour les chatbots et contenus générés.
À quoi sert le RGAA ?|À rendre le numérique accessible aux personnes en situation de handicap (aligné sur les WCAG, rattaché à la loi de 2005) : critères vérifiables, déclaration d'accessibilité. Seul des quatre textes qui touche directement l'UI.
Quelle est la différence entre le rôle du dev, du juriste et du DPO ?|Le juriste décide de ce qui est permis et qualifie les risques ; le DPO oriente/contrôle la conformité RGPD et fait le lien avec la CNIL ; le dev implémente les capacités techniques et signale les risques. Le dev ne décide pas du droit.
Qui est le "responsable de traitement" au sens RGPD ?|L'entité qui décide des finalités et des moyens d'un traitement (l'éditeur de l'app), pas le développeur en tant que personne. Le sous-traitant traite pour le compte du responsable.
Où finit la responsabilité du développeur ?|À la frontière de la décision juridique : le dev rend les obligations techniquement possibles et signale les risques, mais ne décide pas d'une base légale, ne qualifie pas un risque et ne rédige pas les contrats. En cas de doute : documenter et escalader.
```

---

## Pont vers le lab

> Lab associé : `labs/lab-00-introduction-au-droit-du-numerique/README.md`. Cartographier les obligations qui touchent TribuZen et décider *qui tranche quoi* (dev vs juriste/DPO) — analyse et checklist, pas de code.
