---
titre: "Accessibilité légale et conformité — la checklist finale de TribuZen"
cours: 23-droit-numerique
notions: ["accessibilité numérique", "RGAA (référentiel général)", "loi du 11 février 2005 (article 47)", "European Accessibility Act (Directive UE 2019-882)", "qui est concerné (public / privé, seuil de CA)", "trois états de conformité (totale / partielle / non conforme)", "déclaration d'accessibilité", "schéma pluriannuel", "voie de recours (Défenseur des droits)", "accessibilité comme atout", "capstone : checklist de conformité globale TribuZen", "qui décide (dev / juriste / DPO)"]
outcomes:
  - "sait situer le cadre légal de l'accessibilité (RGAA, loi 2005, EAA) et énoncer le principe de qui est concerné sans figer les seuils"
  - "sait distinguer les trois états de conformité et ce que doit contenir une déclaration d'accessibilité"
  - "sait ce que le dev produit pour l'accessibilité vs ce qui relève d'un audit / d'un expert"
  - "sait assembler une checklist de conformité globale de TribuZen (modules 00-07) avant lancement, avec la colonne « qui décide »"
prerequis: ["00-introduction-au-droit-du-numerique", "01-rgpd-reflexes-developpeur", "02-consentement-cookies-et-traceurs", "03-droits-des-personnes", "04-dpia-analyse-impact", "05-dpa-et-sous-traitants", "06-cgu-mentions-et-obligations-plateforme", "07-propriete-intellectuelle-et-licences"]
next: fin-parcours-23-droit-numerique
libs: []
tribuzen: "conformité TribuZen — rendre l'app accessible (RGAA/WCAG) et assembler la checklist de conformité globale avant lancement"
last-reviewed: 2026-07
---

<!-- FLAG-REVIEW: droit/légal — valider par Sylvain + juriste avant diffusion publique -->

> **⚠️ Ceci n'est PAS un conseil juridique.** Ce module — dernier du cours — donne des **principes et des réflexes de développeur** pour rendre un produit accessible et pour **assembler** une checklist de conformité. Il ne remplace ni un **audit d'accessibilité** par un expert, ni l'analyse d'un **juriste, d'un DPO ou d'un avocat**. Aucun seuil, taux, article ou date cité ici n'est une **vérité figée et actionnable** : le droit évolue. Les sources qui font foi sont **[accessibilite.numerique.gouv.fr](https://accessibilite.numerique.gouv.fr)** (RGAA, obligations, déclaration), **[legifrance.gouv.fr](https://www.legifrance.gouv.fr)** (loi 2005-102) et **[cnil.fr](https://www.cnil.fr)** (RGPD). Toute décision d'assujettissement ou de conformité se **valide avec un expert**.

# Accessibilité légale et conformité — la checklist finale de TribuZen

> **Outcomes — tu sauras FAIRE :** situer le cadre légal de l'accessibilité (RGAA, loi 2005, EAA) et énoncer *qui est concerné* en principe, distinguer les trois états de conformité et le contenu d'une déclaration d'accessibilité, séparer ce que le dev produit de ce qui relève d'un expert, et **assembler la checklist de conformité globale de TribuZen** (modules 00-07) avant lancement.
> **Difficulté :** :star::star::star:
>
> **Portée :** ce module est le **capstone du cours**. Sa première moitié introduit une **notion neuve** (l'accessibilité légale) ; sa seconde moitié **n'introduit rien de neuf** — elle **assemble** les modules 00 à 07 en une seule checklist « avant lancement ». Si un maillon te semble flou (base légale, DPIA, DPA, mentions/DSA, licences), c'est le signal de **rouvrir le module source**, pas de deviner.

## 1. Cas concret d'abord

TribuZen est prêt techniquement. Le board fixe une date de lancement. En réunion, trois signaux tombent le même jour :

1. **Une association partenaire** (accompagnement de familles) écrit : *« Une de nos mamans est malvoyante et utilise un lecteur d'écran. Est-ce que votre app est utilisable pour elle ? Avez-vous une déclaration d'accessibilité ? »*
2. **Le commercial** revient d'un rendez-vous avec une **collectivité** (CAF, PMI) : *« Ils demandent si on est conforme RGAA — c'est un critère de leur appel d'offres. »*
3. **Toi**, seul dev, tu réalises que « on lance » veut dire bien plus que « le code marche » : il faut que **tout ce qu'on a vu dans ce cours** soit réellement en place — RGPD, cookies, droits des personnes, DPIA, sous-traitants, mentions/DSA, propriété intellectuelle — **plus** l'accessibilité.

Deux questions concrètes, aucune « au feeling » :

- **L'accessibilité** : suis-je *légalement* obligé ? Sinon, pourquoi le faire quand même, et comment le **déclarer** ?
- **Le reste** : ai-je un moyen de **vérifier en une passe** que TribuZen est conforme avant d'ouvrir les inscriptions, et de savoir **qui tranche** chaque point (moi ? le juriste ? le DPO ?) ?

Ce module répond aux deux : il traite l'**accessibilité légale**, puis il te donne la **checklist de conformité globale** qui referme le cours — le livrable que tu produiras au lab.

---

## 2. Théorie complète, concise

Deux moitiés : l'**accessibilité** (2.1 → 2.6), puis la **synthèse de conformité** (2.7 → 2.8) qui assemble les modules 00-07.

### 2.1 Accessibilité numérique : de quoi on parle

Rendre un service numérique **accessible**, c'est le rendre utilisable par les personnes en situation de handicap (visuel, auditif, moteur, cognitif) : compatible lecteur d'écran, navigable au clavier, contrastes suffisants, structure claire, alternatives textuelles aux images. Ce n'est pas une fonctionnalité « bonus » : pour une partie des utilisateurs, c'est la différence entre **pouvoir se servir de l'app ou pas**.

Le référentiel technique de référence en France est le **RGAA** (Référentiel Général d'Amélioration de l'Accessibilité), déclinaison française des **WCAG** du W3C. Le RGAA structure l'accessibilité en une liste de **critères** vérifiables (audit). Le niveau usuellement visé est **AA** (WCAG 2.1 AA ≈ RGAA niveau AA).

> Nombre de critères, versions et niveaux évoluent. La source qui fait foi est **[accessibilite.numerique.gouv.fr](https://accessibilite.numerique.gouv.fr)** — on ne grave pas un chiffre de critères en dur dans un cours.

### 2.2 Le cadre légal — en principe

Trois textes se superposent. On en donne le **principe**, pas la lettre :

- **Loi n° 2005-102 du 11 février 2005** (article 47) : pose l'obligation d'accessibilité des services de communication au public en ligne pour certains acteurs. C'est le socle historique en France.
- **RGAA** : le *référentiel* qui matérialise cette obligation (critères + méthode d'audit + modèle de déclaration).
- **European Accessibility Act (EAA)** — Directive (UE) 2019/882 : directive européenne qui **élargit** l'accessibilité à une série de **produits et services privés** (par ex. commerce en ligne, services bancaires, livres numériques, services de communication). Sa transposition étend le périmètre au-delà du seul secteur public.

> ⚠️ Dates d'application, périmètre exact et modalités de l'EAA **évoluent et se transposent** en droit national. Ne présente jamais une date ou un périmètre EAA comme figé : renvoie à **[legifrance.gouv.fr](https://www.legifrance.gouv.fr)** et aux pages officielles de la Commission européenne, et fais **valider par un juriste**.

### 2.3 Qui est concerné — le principe (renvoi source pour les seuils)

En **principe** (à vérifier et faire qualifier), l'obligation d'accessibilité vise plusieurs catégories, notamment :

- les **organismes publics** (État, collectivités, établissements publics) ;
- les **délégataires de service public** et organismes créés pour un besoin d'intérêt général ;
- les **grandes entreprises privées** à partir d'un **seuil de chiffre d'affaires** (le RGAA évoque un ordre de grandeur de **250 M€ de CA annuel réalisé en France**, apprécié en moyenne sur plusieurs années) ;
- via l'**EAA**, certains **produits et services privés** ciblés, indépendamment de ce seuil.

**Traduction pour TribuZen** (startup) : au seul titre du seuil de CA, une jeune pousse n'atteint en général **pas** le plancher des « grandes entreprises ». Mais (a) l'**EAA** peut viser certains services privés ; (b) les **partenaires publics** (CAF, PMI, collectivités) **exigent** souvent la conformité par contrat/appel d'offres ; (c) l'inaccessibilité expose à un **risque** (plainte pour discrimination, exclusion d'utilisateurs). L'assujettissement **précis** de TribuZen est une **question juridique** — on la remonte, on ne la tranche pas seul.

> Le seuil de 250 M€ et les catégories exactes sont des **ordres de grandeur** issus de [accessibilite.numerique.gouv.fr](https://accessibilite.numerique.gouv.fr). Le *combien* et le *qui exactement* se **valident avec un juriste** ; le *principe* (viser l'accessibilité) est un choix de conception que le dev porte.

### 2.4 Les trois états de conformité

Une évaluation RGAA classe le service dans l'un de trois états — c'est un **résultat d'audit**, pas une auto-déclaration au doigt mouillé :

| État | Principe (ordre de grandeur — vérifier la source) |
|---|---|
| **Totalement conforme** | tous les critères applicables sont respectés |
| **Partiellement conforme** | une part significative des critères est respectée (le RGAA évoque un plancher de l'ordre de **50 %**) |
| **Non conforme** | en dessous de ce plancher, ou **aucun audit valide** disponible |

> Le taux exact (≈ 50 %) et son mode de calcul viennent de la source officielle et peuvent évoluer. On **ne code pas** un produit « au taux » : on vise la conformité réelle, puis on **mesure** par audit.

### 2.5 La déclaration d'accessibilité

Lorsqu'un acteur est assujetti, il doit publier une **déclaration d'accessibilité** (page dédiée, souvent `/accessibilite`). C'est aussi une **bonne pratique** même quand on n'est pas obligé. Elle contient au minimum, en principe :

- l'**état de conformité** (totale / partielle / non conforme) + le **taux** issu de l'audit ;
- les **résultats des tests** (référentiel, version, date, outils, méthode) ;
- les **contenus non accessibles** : non-conformités connues, **dérogations** pour charge disproportionnée, contenus exemptés ;
- un **mécanisme de contact accessible** (email ou formulaire) pour **signaler** un défaut d'accessibilité ;
- la **voie de recours** : à défaut de réponse satisfaisante, saisine du **Défenseur des droits**.

Certains acteurs publient aussi un **schéma pluriannuel** de mise en accessibilité (plan d'amélioration dans le temps).

> Ce que le **dev** produit : la page `/accessibilite`, le formulaire de contact fonctionnel, les résultats d'outils automatisés. Ce qui relève d'un **expert** : l'**audit RGAA** complet, la qualification des dérogations, la validation de l'état déclaré. On ne s'auto-déclare pas « conforme » sans audit sérieux — une fausse déclaration est un risque en soi.

### 2.6 L'accessibilité comme atout (pas seulement une contrainte)

Au-delà de l'obligation, l'accessibilité est un **atout** pour TribuZen :

- **Marché B2B2C** : les partenaires publics (CAF, PMI, collectivités) en font un **critère d'appel d'offres** ; « TribuZen vise WCAG 2.1 AA » devient un argument.
- **Utilisateurs réels** : parents malvoyants (lecteur d'écran, contraste), dyslexiques (typographie, espacement), TSA/TDAH (structure prévisible, pas de distraction) — souvent **parmi les plus concernés** par la charge mentale, cœur de mission TribuZen.
- **Coût** : faible si pensé **dès la conception** (comme le privacy by design du module 01), élevé en refactoring tardif.
- **Qualité générale** : un code accessible (HTML sémantique, labels, focus visible) est aussi plus robuste, mieux référencé et plus testable.

### 2.7 Synthèse : la checklist de conformité globale (modules 00-07)

Ici, **rien de neuf** — on **assemble**. « Lancer TribuZen » suppose que chaque brique légale du cours est en place. Chaque ligne renvoie à son module *source* et porte une colonne décisive : **qui décide** (dev / juriste / DPO). Le dev *prépare et documente presque tout*, mais **valide très peu seul**.

| # | Domaine | Module | Ce que le DEV met en place | Qui **décide / valide** |
|---|---|---|---|---|
| 1 | **Bases légales RGPD** — chaque traitement rattaché à une base | 01 | registre des traitements, étiquetage par base | **Juriste / DPO** |
| 2 | **Données sensibles & mineurs** (Art. 9) | 01 | isolation + chiffrement des données de santé, marqueur « mineur » | **Juriste / DPO** |
| 3 | **Minimisation & privacy by default** | 01 | schéma minimal, défauts protecteurs (album `PRIVATE`) | **Dev** (conception) |
| 4 | **Consentement cookies & traceurs** | 02 | bandeau conforme (refus = accepter), preuve du consentement | Dev pose / **Juriste** valide |
| 5 | **Droits des personnes** (accès, effacement, portabilité…) | 03 | endpoints `/me/export`, `/me/delete`, suppression en cascade | Dev implémente / **DPO** cadre délais |
| 6 | **DPIA** (mineurs + géolocalisation) | 04 | matière technique (flux, sous-traitants, mesures) | **DPO / juriste** décident & valident |
| 7 | **DPA & sous-traitants / transferts hors UE** | 05 | inventaire des sous-traitants, localisation d'hébergement | **Juriste** (contrats, SCC) |
| 8 | **CGU / mentions légales / DSA** (obligations plateforme, mineurs) | 06 | pages mentions & CGU, mécanismes de signalement | **Juriste** (rédaction, DSA) |
| 9 | **Propriété intellectuelle & licences** (OSS, code IA, IP salarié) | 07 | inventaire des licences des dépendances, respect des obligations | **Juriste** (compatibilité, cession) |
| 10 | **Accessibilité** (RGAA / WCAG, déclaration) | 08 | HTML sémantique, clavier, contraste, page `/accessibilite` | **Expert audit** valide l'état conforme |

**Réflexe de lecture** : dans presque chaque ligne, le dev **construit la matière** (schéma, endpoints, pages, inventaires) mais la **décision finale** (base légale, obligation DPIA, contrats, état de conformité déclaré) appartient à un **juriste, un DPO ou un auditeur**. C'est le fil rouge de tout le cours : *le dev propose et documente, l'expert valide.*

### 2.8 Ce que « conforme » ne veut PAS dire

Cocher toutes les cases de la checklist ne rend pas TribuZen « juridiquement blindé ». Ça veut dire : la **matière est prête**, les **défauts protecteurs sont en place**, et les **décisions ont été remontées aux bonnes personnes**. La conformité est un **processus continu** (chaque nouvelle feature ré-ouvre la checklist), pas un tampon obtenu une fois pour toutes.

---

## 3. Worked examples

### Exemple 1 — Une déclaration d'accessibilité minimale pour TribuZen

TribuZen n'est peut-être pas *obligé* (seuil de CA), mais un partenaire public la demande. On publie une déclaration **honnête** — sans se sur-déclarer conforme.

```markdown
# Déclaration d'accessibilité — TribuZen

TribuZen s'engage à rendre son application accessible, en s'inspirant du RGAA
(déclinaison française des WCAG), conformément à l'esprit de l'article 47 de la
loi n° 2005-102 du 11 février 2005.

## État de conformité
TribuZen est PARTIELLEMENT conforme au RGAA (niveau AA visé).
Taux de conformité : [X %] — issu de l'audit du [date].
(État et taux à établir par un AUDIT ; ne pas déclarer « conforme » sans audit.)

## Résultats des tests
Audit réalisé le [date], référentiel RGAA [version], avec :
- outils automatisés (axe-core, Lighthouse) ;
- tests manuels : navigation clavier, lecteur d'écran (VoiceOver / NVDA).

## Contenus non accessibles
[Liste des non-conformités connues, avec le critère concerné.]
[Dérogations éventuelles pour charge disproportionnée — à justifier.]

## Retour d'information et contact
Pour signaler un défaut d'accessibilité : accessibilite@tribuzen.app
(formulaire accessible + email). Délai de réponse visé : [X] jours ouvrés.

## Voie de recours
En l'absence de réponse satisfaisante, vous pouvez saisir le Défenseur des droits.
```

**Ce qui rend cette déclaration correcte :**
- elle ne s'auto-proclame pas « totalement conforme » sans audit ;
- elle **date** et **source** ses tests (référentiel + outils + méthode manuelle) ;
- elle fournit un **contact accessible** *et* la **voie de recours** (Défenseur des droits) ;
- le taux et l'état sont marqués comme **à établir par audit** — la décision n'appartient pas au dev seul.

### Exemple 2 — Deux lignes de la checklist déroulées, colonne « qui décide »

On prend deux points de la synthèse (§2.7) et on explicite la frontière dev / expert.

```md
Ligne 5 — Droits des personnes (module 03)
  DEV      : implémente /me/export (périmètre complet) et /me/delete
             (suppression en cascade famille/enfants/photos), teste que
             plus aucune donnée ne subsiste après suppression.
  DPO      : fixe/valide le DÉLAI de réponse légal et les cas d'anonymisation
             plutôt que suppression (données à conservation légale).
  => Le dev garantit la FAISABILITÉ technique ; le DPO garantit la RÈGLE.

Ligne 7 — DPA & sous-traitants (module 05)
  DEV      : dresse l'inventaire des sous-traitants (hébergeur, cartographie,
             emailing…) et note OÙ chacun héberge (UE / hors UE).
  JURISTE  : vérifie l'existence d'un DPA signé, la licéité des transferts
             hors UE (clauses type / SCC), la conformité contractuelle.
  => Le dev fournit la CARTE ; le juriste signe et couvre le RISQUE.
```

**Lecture :** dans les deux cas, le dev produit une **matière vérifiable et complète**, mais la **décision qui engage l'entreprise** (délai légal, validité d'un transfert) revient à un expert. Une checklist de conformité sans cette colonne « qui décide » est un piège : elle laisse croire que cocher = décider.

---

## 4. Pièges & misconceptions

### PIÈGE #1 — « On n'est pas obligé, donc on ne fait pas d'accessibilité »

Le raisonnement « startup sous le seuil de CA ⇒ RGAA non obligatoire ⇒ on zappe » ignore trois choses : l'**EAA** peut viser certains services privés, les **partenaires publics** l'exigent par contrat, et l'inaccessibilité **exclut des utilisateurs réels** (risque + perte de marché). *Non obligatoire* ≠ *inutile*. Et l'assujettissement exact est une **question juridique**, pas une déduction de dev.

### PIÈGE #2 — Se déclarer « conforme » sans audit

Écrire « TribuZen est conforme RGAA » sur une page sans **audit** est une **fausse déclaration**. L'état de conformité (totale / partielle / non conforme) et le taux sont un **résultat d'audit**, pas une intention. Le dev peut lancer axe-core/Lighthouse, mais l'**état déclaré** engage — il se valide avec un **auditeur/expert**.

### PIÈGE #3 — Confondre RGAA et WCAG

Le **WCAG** est le standard international du W3C ; le **RGAA** est sa déclinaison française (avec méthode d'audit et modèle de déclaration adaptés au droit français). Viser **WCAG 2.1 AA** couvre l'essentiel du **RGAA niveau AA**, mais l'**obligation légale française** et sa forme (déclaration, schéma) passent par le **RGAA** — on cite le bon référentiel selon le contexte.

### PIÈGE #4 — Croire que la checklist « une fois cochée » ferme le sujet

La conformité est un **processus continu**. Chaque nouvelle feature (une géoloc, un nouveau sous-traitant, un composant UI) **ré-ouvre** les lignes concernées de la checklist. Une conformité « au lancement » qui n'est jamais revue **se périme**.

### PIÈGE #5 — Le dev qui tranche à la place de l'expert

Le piège transversal du cours entier : cocher une ligne de checklist n'est **pas** décider. « Base légale = contrat », « pas de DPIA nécessaire », « ce transfert hors UE est OK », « on est partiellement conforme » — ce sont des **décisions d'expert** (juriste / DPO / auditeur). Le dev **prépare la matière et signale** ; il ne **valide pas** ce qui engage l'entreprise. La colonne « qui décide » existe précisément pour rendre cette frontière visible.

---

## 5. Ancrage TribuZen

Ce module referme le fil rouge : **rendre TribuZen conforme ET accessible avant lancement**.

**Accessibilité** — le dev pose les fondations dans le front-office (cohérent avec le cours 02-vue et le design system) :

```
tribuzen/
  src/
    ...                       ← HTML sémantique, labels, focus visible,
                                 contraste AA, navigation clavier, alt sur images
    pages/
      accessibilite.vue       ← page /accessibilite (déclaration)
  compliance/
    accessibilite/
      declaration.md          ← déclaration (état établi par AUDIT)
      audit-rgaa.md           ← résultats axe-core / Lighthouse / tests manuels
```

**Conformité globale (capstone)** — la checklist des modules 00-07 vit dans le dossier conformité, à côté des livrables des modules précédents :

```
tribuzen/
  compliance/
    checklist-conformite-lancement.md   ← LE livrable du lab (colonne « qui décide »)
    registre-traitements.md             ← module 01
    consentements/                      ← module 02
    droits-personnes/                   ← module 03 (/me/export, /me/delete)
    dpia/                               ← module 04
    sous-traitants-dpa.md               ← module 05
    mentions-cgu/                       ← module 06
    licences.md                         ← module 07
```

> Ce qui relève du **dev** : le code accessible, la page `/accessibilite`, les **inventaires** et **endpoints**, la **checklist assemblée**. Ce qui relève de l'**expert** : l'**audit RGAA**, la **validation juridique** de chaque ligne (base légale, DPIA, DPA, DSA, licences), l'**état de conformité déclaré**. Le lancement n'est pas « quand le code marche », mais « quand la matière est prête **et** validée par les bonnes personnes ».

---

## 6. Points clés

1. L'accessibilité rend le service utilisable par les personnes en situation de handicap ; le référentiel français est le **RGAA** (déclinaison des **WCAG**), niveau visé **AA**.
2. Cadre légal (en **principe**, sources font foi) : **loi 2005-102 art. 47**, **RGAA**, **EAA** (Directive UE 2019/882) qui élargit à des services privés.
3. *Qui est concerné* : public, délégataires, grandes entreprises (**seuil de CA — ordre de grandeur 250 M€**, à vérifier), et services privés visés par l'EAA. L'assujettissement exact = **question juriste**.
4. Trois **états de conformité** (totale / partielle / non conforme) = **résultat d'audit**, pas une auto-déclaration.
5. La **déclaration d'accessibilité** contient : état + taux, résultats de tests, contenus non accessibles/dérogations, contact accessible, **voie de recours (Défenseur des droits)**.
6. L'accessibilité est un **atout** (marché B2B2C public, utilisateurs réels, qualité) — faible coût si pensée dès la conception.
7. La **checklist de conformité globale** assemble les modules 00-07 ; chaque ligne porte **qui décide (dev / juriste / DPO)**.
8. Le dev **prépare et documente** la quasi-totalité ; il **valide très peu seul**. La conformité est un **processus continu**, pas un tampon.

---

## 7. Seeds Anki

```
Quel est le référentiel français d'accessibilité numérique et de quoi dérive-t-il ?|Le RGAA (Référentiel Général d'Amélioration de l'Accessibilité), déclinaison française des WCAG du W3C ; niveau usuellement visé : AA.
Quels trois textes forment le cadre légal de l'accessibilité en France (en principe) ?|La loi n° 2005-102 du 11 février 2005 (art. 47), le RGAA (référentiel), et l'European Accessibility Act — Directive (UE) 2019/882 — qui élargit à des produits/services privés.
Une startup sous le seuil de CA est-elle dispensée d'accessibilité ?|Pas si simple : l'EAA peut viser certains services privés, les partenaires publics l'exigent par contrat, et l'inaccessibilité exclut des utilisateurs (risque). L'assujettissement exact est une question juridique, pas une déduction de dev.
Quels sont les trois états de conformité RGAA ?|Totalement conforme (tous les critères applicables), partiellement conforme (part significative — ordre de grandeur ≥ 50 %), non conforme (en dessous, ou aucun audit valide). C'est un résultat d'AUDIT.
Que doit contenir une déclaration d'accessibilité ?|État de conformité + taux, résultats des tests (référentiel/version/date/outils), contenus non accessibles et dérogations, mécanisme de contact accessible, et voie de recours (Défenseur des droits).
Pourquoi ne pas écrire « TribuZen est conforme RGAA » sans audit ?|L'état de conformité est un résultat d'audit, pas une intention. S'auto-déclarer conforme sans audit est une fausse déclaration ; l'état déclaré se valide avec un expert.
Quelle est la différence entre RGAA et WCAG ?|WCAG = standard international du W3C ; RGAA = déclinaison française (méthode d'audit + déclaration adaptées au droit FR). Viser WCAG 2.1 AA couvre l'essentiel du RGAA AA, mais l'obligation légale française passe par le RGAA.
À quoi sert la colonne « qui décide » dans la checklist de conformité ?|À rendre visible que le dev prépare/documente la matière (schéma, endpoints, inventaires, page /accessibilite) mais que la décision engageant l'entreprise (base légale, DPIA, DPA, état de conformité) revient au juriste / DPO / auditeur.
La conformité obtenue au lancement est-elle définitive ?|Non : c'est un processus continu. Chaque nouvelle feature (géoloc, sous-traitant, composant UI) ré-ouvre les lignes concernées de la checklist ; une conformité jamais revue se périme.
```

---

## Pont vers le lab

> Lab associé : `labs/lab-08-accessibilite-legale-et-conformite/README.md`. Capstone : produire la **checklist de conformité globale de TribuZen « avant lancement »** intégrant les modules 00-07 + l'accessibilité, avec la colonne **« qui décide : dev / juriste / DPO »**. Analyse et décision argumentée — **pas de code**, feedback coach en session.
