---
titre: Consentement, cookies et traceurs
cours: 23-droit-numerique
notions: ["consentement RGPD (libre spécifique éclairé univoque)", "consentement retirable", "cookies et traceurs", "traceurs exemptés de consentement", "traceurs soumis à consentement", "recommandations CNIL bandeau", "refuser aussi simple qu'accepter", "cookie wall", "preuve du consentement", "Article 82 loi Informatique et Libertés"]
outcomes:
  - sait distinguer un traceur exempté de consentement d'un traceur soumis à consentement
  - sait ce qui rend un consentement valide (libre, spécifique, éclairé, univoque, retirable) et sait le reconnaître comme cassé
  - sait concevoir un bandeau cookies aligné sur les recommandations CNIL (refuser aussi simple qu'accepter, granularité par finalité)
  - sait ce qu'implique la preuve du consentement côté développeur, sans se substituer au juriste
prerequis: [00-introduction-au-droit-du-numerique, 01-rgpd-reflexes-developpeur]
next: 03-droits-des-personnes
libs: []
tribuzen: conformité TribuZen — bandeau cookies/traceurs conforme et registre des consentements sur l'app famille
last-reviewed: 2026-07
---

<!-- FLAG-REVIEW: droit/légal — valider par Sylvain + juriste avant diffusion publique -->

> **⚠️ Ceci n'est pas un conseil juridique.** Ce module donne des **principes et des réflexes développeur** pour dialoguer avec un juriste et éviter les erreurs les plus courantes. Il ne remplace pas l'analyse d'un juriste, d'un DPO ou d'un avocat. Le droit évolue et les cas particuliers priment. Toute décision de conformité doit être validée par un professionnel du droit. Les règles citées renvoient aux sources officielles — en premier lieu **[cnil.fr](https://www.cnil.fr)** — qui font foi. Aucun seuil, durée ou règle présenté ici ne doit être traité comme une vérité figée et actionnable sans vérification à la source.

# Consentement, cookies et traceurs

> **Outcomes — tu sauras FAIRE :** distinguer traceur exempté / soumis à consentement, reconnaître un consentement valide ou cassé, concevoir un bandeau aligné sur les recommandations CNIL, comprendre ce qu'implique la preuve du consentement côté dev.
> **Difficulté :** :star::star::star:
>
> **Portée :** ce module traite du **consentement aux traceurs** (cookies et équivalents). Le consentement comme *base légale* générale du RGPD a été introduit au module 01 (les 6 bases légales) ; les droits des personnes (accès, effacement…) sont le sujet du module 03.

## 1. Cas concret d'abord

TribuZen part en bêta. Un prestataire marketing te dit : *« Ajoute juste le tag Google Analytics et le pixel Meta, on verra les stats et on pourra faire de la pub ciblée. »* Le PO ajoute : *« Et mets un petit bandeau "En continuant, vous acceptez les cookies", c'est ce que tout le monde fait. »*

Trois pièges de conformité sont déjà posés dans cette phrase :

1. **Le pixel publicitaire et l'analytics tiers sont des traceurs soumis à consentement.** Les déposer *avant* le choix de l'utilisateur est une violation de l'article 82 de la loi Informatique et Libertés (transposition de la directive ePrivacy).
2. **« En continuant, vous acceptez »** n'est **pas** un consentement valide. Le consentement doit résulter d'un **acte positif clair** — continuer à naviguer, ou l'acceptation de CGU, ne vaut pas consentement (position constante de la CNIL).
3. **Un bandeau qui ne propose que « Accepter »** (ou où refuser est plus difficile qu'accepter) casse le caractère **libre** du consentement.

Le réflexe attendu du développeur : *ne rien déposer avant le choix, proposer un vrai refus aussi simple que l'acceptation, et pouvoir prouver le choix recueilli.* Ce module te donne la grille pour ça — la décision finale (quelles finalités, quel texte juridique) revient au juriste/DPO.

> Source de référence tout au long de ce module : CNIL, *Cookies et autres traceurs* — <https://www.cnil.fr/fr/cookies-et-autres-traceurs>. En cas de doute, c'est elle qui fait foi, pas ce module.

---

## 2. Théorie complète, concise

### 2.1 Le cadre en une phrase

Déposer ou lire une information sur le terminal d'un utilisateur (cookie, `localStorage`, pixel, empreinte…) nécessite en principe son **consentement préalable**, **sauf** si le traceur est **strictement nécessaire** au service demandé. C'est le principe posé par la directive ePrivacy (2002/58/CE) et l'**article 82 de la loi Informatique et Libertés** en France. Le RGPD, lui, définit *ce qu'est un consentement valide*.

> Ce cadre ne vise **pas seulement les cookies HTTP** : il couvre tout traceur — `localStorage`, `sessionStorage`, pixels, SDK, fingerprinting. Le mot « cookie » est un raccourci ; le droit parle de **traceurs**.

### 2.2 Traceurs exemptés vs soumis à consentement

La ligne de partage est la **finalité**, pas la technologie.

**Traceurs exemptés de consentement** (strictement nécessaires au service) — la CNIL cite notamment :

- authentification et sécurité (session, anti-fraude) ;
- mémorisation du panier d'achat ;
- personnalisation de l'interface demandée par l'utilisateur (langue, affichage) ;
- équilibrage de charge (load balancing) ;
- limitation d'accès à un contenu payant (paywall) ;
- **certaines** solutions de mesure d'audience, **sous conditions strictes** (finalité limitée à la mesure, pas de recoupement, etc.).

**Traceurs soumis à consentement** — notamment :

- publicité personnalisée / reciblage (pixel Meta, Google Ads…) ;
- boutons de partage des réseaux sociaux qui tracent ;
- la plupart des outils de mesure d'audience tiers (hors conditions d'exemption).

> **Le point de vigilance :** « analytics » n'est pas automatiquement exempté. Seule une mesure d'audience répondant aux conditions strictes de la CNIL peut l'être. Dans le doute, considérer le traceur comme **soumis à consentement** et faire trancher par le DPO/juriste avec la [liste des exemptions CNIL](https://www.cnil.fr/fr/cookies-et-autres-traceurs).

### 2.3 Ce qui rend un consentement valide (RGPD)

Le consentement doit être **libre, spécifique, éclairé et univoque**, et **retirable** aussi facilement qu'il a été donné.

| Qualité | Ce que ça veut dire côté produit | Cassé quand… |
|---|---|---|
| **Libre** | vrai choix, sans préjudice à refuser | refuser bloque l'accès (cookie wall abusif), ou refuser est plus dur qu'accepter |
| **Spécifique** | un consentement par finalité, granulaire | un seul « OK » global pour pub + analytics + réseaux sociaux |
| **Éclairé** | l'utilisateur sait qui, quoi, pourquoi, combien de temps | finalités vagues, destinataires cachés |
| **Univoque** | acte positif clair (clic délibéré) | cases pré-cochées, « en continuant vous acceptez », scroll = accord |
| **Retirable** | retrait aussi simple que le recueil | pas de moyen visible de revenir sur son choix |

> **Réflexe dev :** l'acceptation des CGU **ne vaut pas** consentement aux traceurs (position CNIL). Les deux sont juridiquement distincts.

### 2.4 Les recommandations CNIL sur le bandeau — principes, pas gabarit figé

Ce sont des **recommandations** de la CNIL (source : <https://www.cnil.fr/fr/cookies-et-autres-traceurs>). Les reprendre comme principes, en renvoyant au texte officiel pour le détail :

- **Refuser doit être aussi simple qu'accepter.** L'utilisateur doit pouvoir accepter ou refuser le dépôt/lecture des traceurs *avec le même degré de simplicité* — typiquement deux boutons de même niveau (« Tout accepter » / « Tout refuser ») dès le premier écran.
- **Rien avant le choix.** Aucun traceur soumis à consentement n'est déposé tant que l'utilisateur n'a pas donné un accord actif. Le simple affichage du bandeau ne dépose rien.
- **Granularité par finalité.** Un accès à un paramétrage fin (par finalité) doit être disponible, sans obliger à tout accepter.
- **Information claire et par couches.** Une info courte visible + une info détaillée accessible (finalités, destinataires, durées).
- **Retrait accessible en continu.** Un moyen de revenir sur son choix doit rester disponible à tout moment (lien « Gérer mes cookies » persistant).

Sur les **durées** (durée de conservation du choix, durée de vie des traceurs), la CNIL formule des **recommandations chiffrées** dans sa recommandation dédiée — mais ces chiffres sont un **ordre de grandeur susceptible d'évoluer** : ne pas les figer dans le code sans les vérifier à la source et les faire valider. <!-- FLAG-DOC: durées précises (conservation du choix, durée de vie des cookies) à confirmer sur la recommandation CNIL en vigueur avant de les inscrire comme règles. --> Le principe stable à retenir : le choix (accord **comme** refus) n'est pas éternel et doit pouvoir être redemandé et modifié.

### 2.5 Cookie wall — pas un « interdit absolu », une appréciation au cas par cas

Un **cookie wall** conditionne l'accès au service à l'acceptation des traceurs. La CNIL considère que sa licéité **s'apprécie au cas par cas** — il n'existe pas de règle « toujours autorisé » ni « toujours interdit ». Le risque : casser le caractère **libre** du consentement quand il n'existe pas d'alternative réelle.

> **Réflexe dev :** ne pas implémenter de cookie wall « parce qu'un concurrent le fait ». C'est une décision juridique à faire trancher, pas un choix technique.

### 2.6 La preuve du consentement (accountability)

Le principe d'**accountability** du RGPD impose de pouvoir **démontrer** qu'un consentement valide a été recueilli. Côté développeur, cela se traduit par la conservation d'une **trace** du choix : quelle version du bandeau, quelles finalités, quel horodatage, quel choix (accepté/refusé, par finalité).

```text
Enregistrement de consentement (exemple de champs — à valider avec le DPO)
  user_ref            : identifiant pseudonyme (pas de PII inutile)
  timestamp           : date/heure du choix (UTC)
  banner_version      : version du bandeau/texte présenté
  purposes            : { analytics: false, ads: false, social: false }
  method              : "banner_v3_button_refuse_all"
```

> **Réflexe dev :** la preuve du consentement **est elle-même un traitement de données** (finalité, durée, base légale). On ne conserve pas ces traces « pour toujours ». La durée et le format se décident **avec le DPO/juriste**.

---

## 3. Worked examples

### Exemple 1 — Trier les traceurs de la page d'accueil TribuZen

Situation : la page d'accueil TribuZen embarque 4 traceurs. On les classe.

| Traceur | Finalité | Verdict | Pourquoi |
|---|---|---|---|
| Cookie de session `tz_session` | authentifier l'utilisateur connecté | **Exempté** | strictement nécessaire au service |
| `localStorage` préférence de langue | afficher l'UI en FR/EN choisi | **Exempté** | personnalisation demandée par l'utilisateur |
| Pixel Meta | reciblage publicitaire | **Soumis à consentement** | publicité personnalisée, jamais avant accord |
| Google Analytics (config par défaut) | statistiques d'audience | **Soumis à consentement (par défaut)** | seule une mesure répondant aux conditions strictes CNIL pourrait être exemptée — à faire vérifier |

**Décision dev :** `tz_session` et la préférence de langue peuvent se poser dès le chargement. Le pixel Meta et GA **restent bloqués** tant que l'utilisateur n'a pas donné un consentement actif et spécifique. Le cas GA (exempté ou non) se tranche avec le DPO en confrontant la config réelle à la liste d'exemptions CNIL — le dev **ne décide pas seul**.

### Exemple 2 — Réparer un bandeau non conforme

Bandeau proposé par un prestataire :

```text
┌───────────────────────────────────────────────┐
│ Nous utilisons des cookies pour améliorer      │
│ votre expérience. En continuant, vous          │
│ acceptez notre politique.        [ Accepter ]  │
└───────────────────────────────────────────────┘
```

Défauts, mesurés à la grille du §2.3 :

1. **Univoque cassé** : « en continuant vous acceptez » = pas d'acte positif clair.
2. **Libre cassé** : un seul bouton « Accepter », aucun refus au même niveau.
3. **Spécifique cassé** : aucune granularité par finalité.
4. **Rien avant le choix** violé si des traceurs se posent à l'affichage du bandeau.

Version alignée sur les principes CNIL (le texte juridique exact est validé par le juriste) :

```text
┌───────────────────────────────────────────────────────────┐
│ TribuZen utilise des traceurs. Vous pouvez les accepter,   │
│ les refuser, ou choisir par finalité.                      │
│                                                            │
│ Finalités : mesure d'audience · publicité · partage social │
│ (le fonctionnement du service ne dépend d'aucun de ces     │
│  traceurs)                                                 │
│                                                            │
│ [ Tout refuser ]   [ Personnaliser ]   [ Tout accepter ]   │
│                                                            │
│ Politique traceurs · Gérer mes choix (toujours accessible) │
└───────────────────────────────────────────────────────────┘
```

Pourquoi c'est aligné : refuser est **aussi simple** qu'accepter (même écran, même poids), granularité via « Personnaliser », rien n'est déposé avant le clic, et « Gérer mes choix » assure le **retrait** en continu. Le texte final et la liste exacte des finalités restent à valider par le juriste/DPO.

---

## 4. Pièges & misconceptions

### PIÈGE #1 — « Analytics = toujours exempté »

Faux. Seule une mesure d'audience répondant aux **conditions strictes** de la CNIL peut être exemptée. Un Google Analytics en configuration par défaut est, par défaut, **soumis à consentement**. Le correct : traiter comme soumis à consentement tant que l'exemption n'est pas démontrée avec le DPO.

### PIÈGE #2 — « Le scroll ou la poursuite de navigation vaut consentement »

Faux, et c'est une position **explicite** de la CNIL. Le consentement doit être un **acte positif clair**. Continuer à naviguer, faire défiler, ou accepter les CGU ne sont **pas** des consentements aux traceurs.

### PIÈGE #3 — « Un seul bouton Accepter suffit, on ajoutera Refuser plus tard »

Faux au regard du caractère **libre**. Refuser doit être aussi simple qu'accepter, **dès le premier écran**. Un « Refuser » caché dans un sous-menu à trois clics ne respecte pas ce principe.

### PIÈGE #4 — « Consentir aux CGU couvre les cookies »

Faux. Consentement aux traceurs et acceptation des CGU sont **juridiquement distincts**. Un bloc unique « J'accepte les CGU et les cookies » n'est pas un consentement spécifique valide.

### PIÈGE #5 — « Cookie wall = interdit » (ou « autorisé »)

Les deux affirmations absolues sont fausses. La CNIL apprécie la licéité d'un cookie wall **au cas par cas**. Ce n'est pas une décision technique : à faire trancher par le juriste.

### PIÈGE #6 — « On log le consentement, donc on est couverts, on garde tout à vie »

Incomplet et risqué. La **preuve du consentement est elle-même un traitement** : elle a une finalité, une base légale et une **durée de conservation** à définir avec le DPO. Conserver ces traces indéfiniment est une non-conformité en soi.

---

## 5. Ancrage TribuZen

TribuZen manipule des données d'adultes **et de mineurs** (photos, géolocalisation, partage familial). Les enjeux de traceurs y sont donc particulièrement sensibles.

**Ce que le dev met en place :**

- **Séparer les traceurs par finalité** dès l'architecture : les traceurs strictement nécessaires (`tz_session`, préférence langue) d'un côté ; les traceurs marketing/mesure d'un autre, **désactivés par défaut**.
- **Un composant `CookieBanner`** qui : ne dépose aucun traceur soumis à consentement avant clic, propose « Tout refuser » / « Personnaliser » / « Tout accepter » au même niveau, et expose un point d'entrée persistant « Gérer mes choix ».
- **Un registre des consentements** (voir §2.6) qui horodate le choix et la version du bandeau, avec une durée de conservation décidée avec le DPO.
- **Un garde-fou** : côté code, les scripts marketing sont chargés **conditionnellement** au consentement enregistré, jamais en dur dans le HTML.

```text
tribuzen/
  src/
    components/
      consent/
        CookieBanner.vue        ← refuser aussi simple qu'accepter, granularité
        ConsentManager.ts       ← état du consentement, garde le chargement conditionnel
    server/
      consent/
        consent-log.ts          ← trace horodatée (preuve), durée définie avec le DPO
```

> **Ce que le dev ne décide pas seul :** la liste exacte des finalités, les durées, le statut d'exemption de la mesure d'audience, l'opportunité d'un cookie wall. Ces points remontent au DPO/juriste. Le dev fournit une implémentation qui *rend possible* la conformité ; il ne *déclare* pas la conformité.

---

## 6. Points clés

1. Déposer/lire un traceur = consentement préalable, **sauf** traceur strictement nécessaire (art. 82 loi I&L / directive ePrivacy).
2. La ligne de partage exempté/soumis est la **finalité**, pas la technologie ; « analytics » n'est pas exempté par défaut.
3. Consentement valide = **libre, spécifique, éclairé, univoque** et **retirable** — chaque qualité a un mode de rupture concret.
4. Ni le scroll, ni « en continuant », ni les CGU ne valent consentement : il faut un **acte positif clair**.
5. Recommandations CNIL : **refuser aussi simple qu'accepter**, granularité par finalité, rien avant le choix, retrait accessible en continu.
6. Le **cookie wall** s'apprécie au cas par cas — décision juridique, pas technique.
7. **Preuve du consentement** (accountability) : horodater le choix — et cette trace est elle-même un traitement à durée limitée.
8. Le dev **rend la conformité possible** ; il ne la déclare pas. Finalités, durées, exemptions → juriste/DPO. Source qui fait foi : **cnil.fr**.

---

## 7. Seeds Anki

```
Quel est le critère qui décide si un traceur est exempté de consentement ?|La finalité (strictement nécessaire au service demandé), pas la technologie. Session/auth, panier, préférence de langue : exemptés. Publicité personnalisée, réseaux sociaux, analytics tiers par défaut : soumis à consentement.
Google Analytics en config par défaut est-il exempté de consentement ?|Non, par défaut il est soumis à consentement. Seule une mesure d'audience répondant aux conditions strictes de la CNIL peut être exemptée — à faire vérifier par le DPO, jamais décidé seul par le dev.
Quelles sont les 4 qualités d'un consentement RGPD valide + la 5e obligation ?|Libre, spécifique, éclairé, univoque — et retirable aussi facilement qu'il a été donné.
Le scroll ou « en continuant vous acceptez » valent-ils consentement aux traceurs ?|Non. La CNIL exige un acte positif clair. Ni le scroll, ni la poursuite de navigation, ni l'acceptation des CGU ne valent consentement aux traceurs.
Que dit la recommandation CNIL sur le bouton de refus du bandeau ?|Refuser doit être aussi simple qu'accepter — même niveau, même degré de simplicité, dès le premier écran (typiquement « Tout accepter » / « Tout refuser » côte à côte).
Un cookie wall est-il interdit ?|Ni interdit ni autorisé de façon absolue : la CNIL apprécie sa licéité au cas par cas. C'est une décision juridique à faire trancher, pas un choix technique.
Pourquoi doit-on garder une trace du consentement, et quelle nuance ?|Pour l'accountability (prouver un consentement valide : horodatage, finalités, version du bandeau). Nuance : cette trace est elle-même un traitement de données, avec une durée de conservation à définir avec le DPO — pas conservée à vie.
Consentir aux CGU couvre-t-il le consentement aux cookies ?|Non, les deux sont juridiquement distincts. Un bloc unique « j'accepte CGU et cookies » n'est pas un consentement spécifique valide.
```

---

## Pont vers le lab

> Lab associé : `labs/lab-02-consentement-cookies-et-traceurs/README.md`. Audit des traceurs de TribuZen + conception d'un bandeau conforme (analyse et décision argumentée, pas de code lourd). Grille de conformité + coach + variante J+30.
