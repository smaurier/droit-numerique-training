---
titre: "DPIA / AIPD : l'analyse d'impact relative à la protection des données"
cours: 23-droit-numerique
notions: ["DPIA / AIPD", "traitement à risque élevé", "données de mineurs", "géolocalisation", "profilage", "surveillance à grande échelle", "méthode AIPD (description, nécessité, proportionnalité, risques, mesures)", "outil PIA de la CNIL", "rôle du DPO", "consultation préalable de la CNIL", "listes CNIL des traitements soumis à AIPD", "ce que le dev apporte à la DPIA"]
outcomes:
  - "sait dire, à partir des principes, si un traitement est susceptible d'exiger une DPIA (et sait renvoyer à la liste CNIL + juriste/DPO pour trancher)"
  - "connaît les 4 blocs méthodologiques d'une AIPD (description, nécessité/proportionnalité, risques, mesures)"
  - "sait quoi fournir au DPO en tant que développeur (flux de données, sous-traitants, mesures techniques)"
  - "sait distinguer ce qui relève de la décision juridique (DPO/juriste) de ce que le dev prépare"
prerequis: ["00-introduction-au-droit-du-numerique", "01-rgpd-reflexes-developpeur", "02-consentement-cookies-et-traceurs", "03-droits-des-personnes"]
next: 05-dpa-et-sous-traitants
libs: []
tribuzen: "conformité TribuZen — amorcer la DPIA (données de mineurs + géolocalisation des sorties) et préparer la matière technique pour le DPO"
last-reviewed: 2026-07
---

<!-- FLAG-REVIEW: droit/légal — valider par Sylvain + juriste avant diffusion publique -->

> ⚠️ **Ceci n'est pas un conseil juridique.** Ce module donne des **principes et des réflexes de développeur** pour préparer et alimenter une DPIA, pas pour la valider seul. La décision « DPIA obligatoire ou non », l'analyse de risques finale et la conformité relèvent d'un **DPO / juriste / avocat**. Les critères d'obligation évoluent : la source de vérité est la **liste CNIL des traitements soumis à AIPD** sur [cnil.fr](https://www.cnil.fr/fr/RGPD-analyse-impact-protection-des-donnees-aipd), pas ce cours.

# DPIA / AIPD : l'analyse d'impact relative à la protection des données

> **Outcomes — tu sauras FAIRE :** identifier (au niveau des principes) un traitement susceptible d'exiger une DPIA, dérouler les 4 blocs d'une AIPD, préparer la matière technique pour le DPO.
> **Difficulté :** :star::star::star:

DPIA (*Data Protection Impact Assessment*) et AIPD (*Analyse d'Impact relative à la Protection des Données*) désignent **la même chose** : DPIA est le terme du RGPD en anglais, AIPD le terme officiel français employé par la CNIL. On utilise les deux dans ce module.

## 1. Cas concret d'abord

Tu es le développeur de **TribuZen**, l'app d'organisation familiale. La prochaine feature du board : **« Sorties » — planifier une sortie, inviter des membres de la famille (enfants inclus), et afficher sur une carte le lieu de rendez-vous avec la position en temps réel de ceux qui ont accepté de partager leur position.**

Tu ouvres le ticket et tu as un doute qui n'est pas technique :

- On traite des **données de mineurs** (les enfants inscrits par leurs parents).
- On traite de la **géolocalisation** de personnes, potentiellement en temps réel.

Ta cheffe de produit te dit « on verra la conformité plus tard, code d'abord ». **Mauvais réflexe.** Le RGPD prévoit que, pour certains traitements « susceptibles d'engendrer un risque élevé pour les droits et libertés des personnes », il faut réaliser une **analyse d'impact (DPIA) AVANT de mettre en œuvre le traitement** — donc avant, pas après.

La bonne question de dev n'est pas « est-ce que je code d'abord ? » mais :

> « Cette feature combine données de mineurs **et** géolocalisation. Est-ce qu'on ne serait pas sur un traitement qui exige une DPIA ? Il faut que je remonte ça au DPO / à un juriste avant de partir. »

Ce module te donne les principes pour **poser cette question au bon moment** et pour **préparer la matière** dont le DPO aura besoin — sans prétendre trancher à sa place.

## 2. Théorie complète, concise

### 2.1 Qu'est-ce qu'une DPIA / AIPD ?

Une DPIA est une **étude documentée** d'un traitement de données personnelles qui :

1. **décrit** le traitement (quelles données, pourquoi, comment, combien de temps, qui y accède) ;
2. évalue sa **nécessité et sa proportionnalité** (fait-on le minimum pour l'objectif ?) ;
3. **identifie et évalue les risques** pour les personnes concernées ;
4. définit les **mesures** (techniques et organisationnelles) pour ramener ces risques à un niveau acceptable.

C'est à la fois une **obligation légale** (pour les traitements à risque élevé) et un **outil de pilotage** : elle force à réfléchir à la protection des données *avant* de construire (c'est le lien direct avec la **privacy by design** vue au module 01).

> ⚠️ Une DPIA n'est **pas** un formulaire à cocher une fois. C'est un document **vivant**, révisé quand le traitement change (nouvelle donnée collectée, nouveau sous-traitant, nouvelle finalité).

### 2.2 Quand une DPIA est-elle obligatoire ? (principes, pas vérité figée)

Le principe du RGPD : une DPIA est requise quand un traitement est **« susceptible d'engendrer un risque élevé pour les droits et libertés des personnes physiques »**.

Pour rendre ça opérationnel, il faut **croiser trois sources** — et c'est le **DPO/juriste qui tranche**, pas le dev :

1. **Les critères de risque élevé** (issus des lignes directrices européennes). Un traitement qui cumule **plusieurs** des critères suivants est un fort candidat à la DPIA :
   - **profilage / scoring** ou évaluation de personnes ;
   - **décision automatisée** produisant des effets juridiques ;
   - **surveillance systématique** (dont la surveillance d'une zone accessible au public) ;
   - **données sensibles** (Art. 9 : santé, opinions, etc.) ou **hautement personnelles** ;
   - **traitement à grande échelle** ;
   - **croisement / combinaison** de jeux de données ;
   - **personnes vulnérables**, dont **les mineurs** ;
   - usage **innovant** (nouvelle technologie) ;
   - traitement qui **empêche l'exercice d'un droit** ou l'accès à un service.
   - La **géolocalisation** relève typiquement de la surveillance/localisation de personnes, et pèse dans l'analyse.

2. **La liste CNIL des types de traitements qui exigent une AIPD** — liste officielle et évolutive. **C'est la référence à consulter** : [cnil.fr — AIPD](https://www.cnil.fr/fr/RGPD-analyse-impact-protection-des-donnees-aipd). La CNIL publie aussi une **liste des traitements pour lesquels une AIPD n'est PAS requise**.

3. **Le bon sens du croisement** : plus un traitement cumule de critères, plus il est probable qu'une DPIA soit due.

**Réflexe dev à retenir** (pas une conclusion juridique) : dès qu'un traitement touche **mineurs**, **géolocalisation**, **profilage**, **données de santé**, ou **surveillance à grande échelle** — surtout en **combinaison** — **je remonte au DPO/juriste** pour qu'une DPIA soit évaluée. Je ne code pas la feature en supposant que « ça passe ».

> ⚠️ **Ne prends aucun seuil de ce module comme un chiffre officiel.** « Grande échelle » n'a pas de seuil numérique figé dans le RGPD ; c'est une appréciation (nombre de personnes, volume, durée, étendue géographique). La liste CNIL prime, et le DPO décide.

### 2.3 La méthode : les 4 blocs d'une AIPD

La CNIL structure l'AIPD autour de ces blocs (mêmes 4 étapes que la définition ci-dessus) :

| Bloc | Question à laquelle il répond | Ce que le **dev** alimente surtout |
|------|-------------------------------|-------------------------------------|
| **1. Description du traitement** | Quelles données ? Quelles finalités ? Quels flux ? Quelle durée de conservation ? Quels destinataires/sous-traitants ? | Le **schéma des flux de données**, la liste des champs collectés, les sous-traitants techniques, les durées de rétention effectives |
| **2. Nécessité & proportionnalité** | A-t-on le **minimum** de données pour l'objectif ? Base légale, information, durée, droits des personnes assurés ? | Confirme ce qui est *réellement* collecté vs déclaré ; signale la sur-collecte |
| **3. Risques** | Que peut-il arriver aux personnes (accès illégitime, modification, disparition des données) ? Probabilité ? Gravité ? | Les **scénarios techniques** de menace (fuite DB, compte compromis, sous-traitant défaillant) |
| **4. Mesures** | Comment réduit-on chaque risque à un niveau acceptable ? | Les **mesures techniques** : chiffrement, pseudonymisation, contrôle d'accès, journalisation, minimisation |

Si, **après** les mesures, un **risque résiduel reste élevé**, il faut **consulter la CNIL préalablement** (consultation préalable) avant de démarrer le traitement. Cette décision revient au DPO/juriste.

### 2.4 L'outil PIA de la CNIL

La CNIL met à disposition un **logiciel libre (open source), gratuit**, appelé **PIA**, pour **conduire et formaliser** une analyse d'impact. Il guide pas à pas selon les 4 blocs ci-dessus (contexte, principes fondamentaux, risques, validation) et produit un rapport exportable.

- Il **structure** la démarche mais **ne décide pas** à ta place : le contenu, l'appréciation des risques et la validation restent humains (DPO/juriste).
- Il existe en version logicielle à installer et en variantes (dont une utilisable en conteneur). Récupère la version courante et la doc sur **[cnil.fr](https://www.cnil.fr/fr/RGPD-analyse-impact-protection-des-donnees-aipd)** — ne te fie pas à une URL de téléchargement mémorisée, elle peut changer.

### 2.5 Le rôle du DPO (Délégué à la Protection des Données)

Le **DPO** est la personne (interne ou externalisée) chargée de piloter la conformité RGPD. Sur une DPIA :

- il **conseille** sur la nécessité de réaliser la DPIA et sur sa méthode ;
- il **supervise** sa réalisation ;
- il est le **point de contact** de la CNIL et des personnes concernées ;
- il **vérifie** que les mesures sont suivies dans le temps.

La désignation d'un DPO est **obligatoire** dans certains cas (organisme public ; suivi régulier et systématique à grande échelle ; traitement à grande échelle de données sensibles). **Que ce soit obligatoire ou non**, c'est le rôle qui *porte* la décision DPIA — pas le développeur.

> ⚠️ Savoir *si* un DPO est obligatoire pour une structure donnée est une **question juridique** : à trancher avec un juriste, pas à déduire de ce tableau.

### 2.6 Ce que le développeur apporte concrètement à la DPIA

Le dev n'écrit pas la DPIA, mais **sans lui elle est fausse**, car il connaît la réalité technique. Le dev fournit :

- le **schéma des flux de données** réels (front → API → DB → services tiers) ;
- l'**inventaire des données** effectivement collectées (souvent > à ce que le produit croit collecter) ;
- la **liste des sous-traitants** techniques (hébergeur, envoi d'e-mails, analytics, cartographie…) et où sont hébergées les données (UE ou hors UE — cf. module 05) ;
- les **durées de conservation** réelles (y compris logs et sauvegardes) ;
- les **mesures techniques** en place ou possibles (chiffrement au repos/en transit, pseudonymisation, contrôle d'accès, journalisation, minimisation) ;
- les **scénarios de risque** techniques crédibles.

**Le dev décrit la réalité et propose des mesures. Le DPO/juriste décide et valide.**

## 3. Worked examples

### Exemple 1 — Trancher (au niveau principe) sur la feature « Sorties » de TribuZen

**Situation :** feature de planification de sorties avec géolocalisation temps réel des participants, incluant des mineurs.

**Raisonnement de dev (pas une décision juridique) :**

1. **Quels critères de risque sont touchés ?**
   - *Personnes vulnérables — mineurs* : oui, des enfants sont concernés. ✅
   - *Géolocalisation / suivi de localisation de personnes* : oui, position en temps réel. ✅
   - *Croisement de données* : identité + relations familiales + position + horaires. ✅
   - → **Au moins deux critères forts en combinaison (mineurs + géoloc).**

2. **Conclusion de dev :** ce n'est pas à moi de dire « DPIA obligatoire », mais le cumul mineurs + géolocalisation est **exactement** le genre de traitement qui, selon les critères et la **liste CNIL**, appelle une DPIA. **Je remonte au DPO/juriste avant de développer**, et je joins déjà la matière technique (flux, données, sous-traitant cartographie).

3. **Ce que je NE fais pas :** conclure seul que « c'est bon » ou « c'est mort », ni citer un article de loi comme preuve. Je renvoie à la [liste CNIL](https://www.cnil.fr/fr/RGPD-analyse-impact-protection-des-donnees-aipd) et au DPO.

### Exemple 2 — Remplir le bloc « Risques & mesures » (extrait, côté dev)

Pour la feature Sorties, voici la matière **technique** que le dev prépare pour ce bloc. Ce n'est **pas** la DPIA finale : c'est l'entrée que le DPO consolidera et pondérera.

| Risque (scénario technique) | Impact pour la personne | Mesure technique proposée |
|-----------------------------|--------------------------|----------------------------|
| Fuite de la base → positions d'enfants exposées | Élevé (sécurité physique d'un mineur) | Ne **pas** stocker l'historique de position ; ne garder que la dernière position, éphémère, chiffrée ; purge auto |
| Partage de position activé par défaut | Élevé | **Opt-in explicite**, désactivé par défaut, coupure facile (privacy by design/default) |
| Position visible par toute la famille sans distinction | Moyen/Élevé | Partage **restreint** aux membres d'une sortie donnée, et seulement pendant la sortie |
| Sous-traitant cartographie hors UE reçoit les positions | Élevé | Choisir un fournisseur adéquat, encadrer par **DPA** (module 05), vérifier l'hébergement UE |

**Note honnête :** la colonne « Impact » ci-dessus est une **estimation d'ingénieur**, pas la cotation officielle. La gravité/probabilité finale est fixée dans la DPIA avec le DPO.

## 4. Pièges & misconceptions

**PIÈGE #1 — « La DPIA, c'est de la paperasse qu'on fait à la fin. »**
Faux : la DPIA doit être **antérieure** à la mise en œuvre du traitement à risque élevé. C'est un outil de conception (privacy by design), pas un rapport post-mortem.

**PIÈGE #2 — « C'est au dev de décider si une DPIA est obligatoire. »**
Faux. Le dev **repère** les signaux (mineurs, géoloc, profilage, sensible, grande échelle) et **alerte** ; la décision revient au **DPO/juriste** en s'appuyant sur la **liste CNIL**.

**PIÈGE #3 — « Pas de données de santé → pas de DPIA. »**
Faux. Les données sensibles (Art. 9) ne sont **qu'un** critère parmi d'autres. Les **mineurs**, la **géolocalisation**, le **profilage** ou la **surveillance à grande échelle** peuvent suffire, surtout en combinaison.

**PIÈGE #4 — « La DPIA validée une fois, c'est réglé pour toujours. »**
Faux. Elle est **révisée** dès que le traitement change (nouvelle donnée, nouveau sous-traitant, nouvelle finalité).

**PIÈGE #5 — « L'outil PIA de la CNIL fait la DPIA à ma place. »**
Faux. L'outil **structure et formalise** ; l'appréciation des risques et la validation restent **humaines** (DPO/juriste).

**PIÈGE #6 — Confondre risque *résiduel faible* et *dispense de DPIA*.**
Un risque résiduel faible **après mesures** est le bon résultat d'une DPIA — mais il ne dispense pas de l'avoir faite si le traitement l'exigeait. À l'inverse, un risque résiduel **encore élevé** déclenche la **consultation préalable de la CNIL**.

## 5. Ancrage TribuZen

TribuZen traite des données personnelles **d'adultes et de mineurs**, avec photos, relations familiales, et — avec la feature Sorties — **géolocalisation**. Le cumul **mineurs + géolocalisation** place plusieurs traitements de TribuZen dans le périmètre où **une DPIA est à évaluer sérieusement** (décision DPO/juriste, appuyée sur la liste CNIL).

Concrètement, dans le projet :

- **Avant** de livrer une feature sensible (Sorties, partage de photos d'enfants), le dev **ouvre un point conformité** et **prépare la matière technique** (flux, données, sous-traitants, mesures) pour le DPO.
- Les **mesures techniques** décidées en DPIA deviennent des **contraintes d'archi** : opt-in géoloc désactivé par défaut, position éphémère et chiffrée, partage restreint à la sortie, pas d'historique de localisation, hébergement UE, DPA avec le fournisseur de cartographie.
- Le document DPIA (préparé avec l'outil PIA de la CNIL) est **maintenu** dans le repo conformité et **révisé** à chaque évolution du traitement.

Le lab de ce module te fait **amorcer cette DPIA** pour la feature Sorties.

## 6. Points clés

1. DPIA (RGPD) = AIPD (CNIL) : analyse d'impact **documentée** d'un traitement, **avant** sa mise en œuvre.
2. Elle est requise pour les traitements à **risque élevé** ; la référence opérationnelle est la **liste CNIL** — la décision revient au **DPO/juriste**.
3. Signaux dev à remonter : **mineurs, géolocalisation, profilage, données sensibles, surveillance/grande échelle** — surtout en **combinaison**.
4. Méthode = 4 blocs : **description, nécessité/proportionnalité, risques, mesures**.
5. Risque résiduel encore élevé après mesures → **consultation préalable de la CNIL**.
6. La **CNIL fournit l'outil PIA** (logiciel libre) pour formaliser — il structure, il ne décide pas.
7. Le **DPO** pilote/valide ; le **développeur** fournit flux de données, inventaire, sous-traitants, durées, mesures techniques et scénarios de risque.
8. La DPIA est un **document vivant**, révisé quand le traitement change.

## 7. Seeds Anki

```
DPIA et AIPD, quelle différence ?|Aucune sur le fond : DPIA est le terme RGPD (anglais), AIPD le terme officiel français de la CNIL. Même analyse d'impact.
Quand une DPIA est-elle requise (principe) ?|Pour un traitement susceptible d'engendrer un risque élevé pour les droits et libertés. La référence opérationnelle est la liste CNIL des traitements soumis à AIPD ; c'est le DPO/juriste qui tranche.
Cite 4 critères de risque élevé qui pèsent dans une DPIA.|Données sensibles (Art. 9), personnes vulnérables (mineurs), géolocalisation/surveillance systématique, profilage/décision automatisée, grande échelle, croisement de données (4 au choix).
Quels sont les 4 blocs méthodologiques d'une AIPD ?|1) Description du traitement, 2) nécessité et proportionnalité, 3) identification/évaluation des risques, 4) mesures pour réduire les risques.
Que se passe-t-il si le risque résiduel reste élevé après mesures ?|Consultation préalable de la CNIL avant de démarrer le traitement (décision DPO/juriste).
Qu'est-ce que l'outil PIA de la CNIL et que ne fait-il PAS ?|Un logiciel libre et gratuit qui structure/formalise l'analyse d'impact selon les 4 blocs. Il ne décide pas à la place de l'humain : l'appréciation des risques et la validation restent au DPO/juriste.
Que doit fournir le développeur pour une DPIA ?|La réalité technique : schéma des flux de données, inventaire des données réellement collectées, sous-traitants et lieux d'hébergement, durées de conservation, mesures techniques, scénarios de risque. Il ne décide pas la conformité.
Pourquoi TribuZen est-il concerné par une DPIA ?|Il traite des données de mineurs et, avec la feature Sorties, de la géolocalisation. Ce cumul est typiquement un traitement pour lequel une DPIA doit être évaluée (décision DPO/juriste, appuyée sur la liste CNIL).
```

---

## Pont vers le lab

> Lab associé : `labs/lab-04-dpia-analyse-impact/README.md`. Tu amorces la DPIA de la feature « Sorties » de TribuZen (données de mineurs + géolocalisation) : description du traitement, analyse de risques et mesures — **aucun code**. Corrigé commenté, grille, coach ≥ 3 relances, variante J+30.
