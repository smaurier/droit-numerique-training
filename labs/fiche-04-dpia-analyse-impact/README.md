<!-- FLAG-REVIEW: droit/légal — valider par Sylvain + juriste avant diffusion publique -->

# Lab 04 — Amorcer la DPIA de TribuZen (feature « Sorties »)

> ⚠️ **Ceci n'est pas un conseil juridique.** Ce lab est un **exercice pédagogique** de préparation de DPIA côté développeur. Le document que tu produiras est un **brouillon technique**, pas une DPIA valide : une vraie DPIA est réalisée **avec un DPO / juriste** et validée par lui. Les critères d'obligation évoluent — la source de vérité est la **liste CNIL des traitements soumis à AIPD** : [cnil.fr](https://www.cnil.fr/fr/RGPD-analyse-impact-protection-des-donnees-aipd).

> **Outcome :** à la fin, tu sais **amorcer une DPIA** — dérouler les 4 blocs (description, nécessité/proportionnalité, risques, mesures) pour un traitement à risque élevé, et préparer la matière que le DPO consolidera.
> **Vrai outil :** un document Markdown structuré (ou l'**outil PIA de la CNIL**, logiciel libre, si tu veux le format officiel). **Aucun code** — c'est un exercice de conformité.
> **Feedback :** le coach valide en session (pas d'auto-correcteur). Grille ci-dessous.

---

## Contexte

TribuZen ajoute la feature **« Sorties »** :

- un membre crée une sortie (titre, lieu de rendez-vous, date/heure) ;
- il invite d'autres membres de la famille, **enfants inclus** ;
- pendant la sortie, les participants qui l'acceptent **partagent leur position en temps réel**, affichée sur une carte fournie par un service de cartographie tiers.

Ce traitement combine **données de mineurs** et **géolocalisation** : deux signaux forts (module 04). Tu dois **amorcer la DPIA** avant que la feature parte en développement.

---

## Énoncé

Produis un document `dpia-sorties-tribuzen.md` (brouillon) qui déroule les **4 blocs** d'une AIPD. **Pas de code.** Tu écris en français, en te tenant aux **principes** — sans citer d'article de loi ni de seuil comme s'il s'agissait d'une vérité tranchée, et en **renvoyant explicitement au DPO/juriste** pour toute décision.

Ton document doit contenir :

1. **Bloc 1 — Description du traitement**
   - Finalité(s) de la feature Sorties.
   - **Inventaire des données** collectées (identité, lien familial, âge/minorité, position, horaires…).
   - **Schéma des flux** (en texte ou ASCII) : front → API → base → service de cartographie tiers.
   - **Destinataires / sous-traitants** (hébergeur, fournisseur de carte) et **où** sont hébergées les données (UE / hors UE).
   - **Durées de conservation** proposées (dont position, logs, sauvegardes).

2. **Bloc 2 — Nécessité & proportionnalité**
   - Fait-on le **minimum** de collecte pour l'objectif ? Où pourrais-tu **sur-collecter** ?
   - Base légale envisagée + information des personnes + prise en compte des **mineurs**.
   - (Renvoi : la validation de la base légale est une décision DPO/juriste.)

3. **Bloc 3 — Identification des risques** — au moins **4 scénarios** techniques crédibles, chacun avec **impact estimé** (faible/moyen/élevé) pour la personne. Marque cette cotation comme **estimation d'ingénieur**.

4. **Bloc 4 — Mesures** — pour **chaque** risque, au moins une **mesure technique ou organisationnelle** (privacy by design/by default).

5. **Synthèse & renvoi** — une phrase de conclusion honnête : « ce brouillon suggère que le cumul mineurs + géoloc appelle une DPIA ; **décision et validation = DPO/juriste**, appuyées sur la liste CNIL ».

---

## Étapes (en friction)

1. **Liste d'abord les données** que la feature touche, sans filtre — puis marque celles qui sont sensibles/critiques (position d'un mineur !).
2. **Dessine les flux** en texte : d'où part une position, où elle transite, où elle finit, qui la voit.
3. **Repère la sur-collecte** : as-tu vraiment besoin de l'**historique** des positions ? de la position **hors** sortie ?
4. **Écris 4+ scénarios de risque** en partant des flux (fuite DB, partage par défaut, sous-traitant hors UE, visibilité trop large).
5. **Associe une mesure à chaque risque** — vise le *by default* (opt-in désactivé, position éphémère, partage restreint à la sortie).
6. **Relis en te demandant** : « qu'est-ce que je fais dire à ce document que seul un DPO/juriste devrait trancher ? » et transforme-le en **renvoi**.

---

## Corrigé (exemple commenté)

> Un corrigé possible — pas *le* corrigé. Une DPIA dépend du contexte ; l'important est la **méthode** et l'**honnêteté** sur ce qui relève du DPO.

```markdown
# DPIA (brouillon technique) — Feature « Sorties » TribuZen
Statut : BROUILLON dev — à consolider et valider par le DPO/juriste. Non contractuel.
Réf. obligation : liste CNIL des traitements soumis à AIPD (cnil.fr).

## Bloc 1 — Description du traitement
Finalité : permettre à une famille de planifier une sortie et de se localiser
mutuellement pendant sa durée.

Données collectées :
- Identité : prénom, avatar
- Lien familial + rôle (parent/enfant) → indicateur de MINORITÉ
- Position géographique (lat/lng) pendant la sortie
- Horodatage des positions, date/heure de la sortie

Flux :
  App mobile ──(HTTPS)──> API TribuZen ──> Base de données (UE)
                                    └────> Service de cartographie tiers (afficher la carte)
  Position partagée ──> visible par les participants de CETTE sortie uniquement

Sous-traitants : hébergeur (UE), fournisseur de cartographie (à qualifier : UE ou hors UE ?).
Conservation proposée : position NON historisée (dernière position éphémère, purgée en fin
  de sortie) ; logs techniques : durée courte à définir avec le DPO.

## Bloc 2 — Nécessité & proportionnalité
- Minimisation : PAS d'historique de trajet ; PAS de position hors sortie ; carte affichée
  sans envoyer plus que le strict nécessaire au tiers.
- Mineurs : partage encadré par le compte parent ; information adaptée.
- Base légale envisagée : consentement explicite (position). ⚠️ Validation = DPO/juriste.

## Bloc 3 — Risques (cotation = estimation d'ingénieur, à repondérer par le DPO)
| # | Scénario technique | Impact estimé |
|---|--------------------|---------------|
| R1 | Fuite DB exposant la position d'enfants | Élevé (sécurité physique) |
| R2 | Partage de position activé par défaut | Élevé |
| R3 | Position visible par toute la famille, hors sortie | Moyen/Élevé |
| R4 | Sous-traitant cartographie hors UE reçoit les positions | Élevé |

## Bloc 4 — Mesures
| # | Mesure |
|---|--------|
| R1 | Pas d'historique ; dernière position éphémère + chiffrée ; purge auto en fin de sortie |
| R2 | Opt-in EXPLICITE, désactivé par défaut (privacy by default), coupure en 1 geste |
| R3 | Visibilité restreinte aux participants de la sortie, et seulement pendant sa durée |
| R4 | Choisir un fournisseur adéquat + DPA (module 05) ; privilégier hébergement UE |

## Synthèse & renvoi
Le cumul « données de mineurs + géolocalisation » place ce traitement dans le périmètre
où une DPIA doit être sérieusement évaluée. Ce brouillon prépare la matière technique.
DÉCISION d'obligation, cotation finale des risques et VALIDATION : DPO/juriste, appuyés
sur la liste CNIL. Consultation préalable CNIL si le risque résiduel reste élevé.
```

**Pourquoi ce corrigé est bon :**
- Il déroule les **4 blocs** dans l'ordre et relie chaque **risque** à une **mesure**.
- Il applique la **minimisation** et le **privacy by default** (opt-in off, position éphémère, partage restreint).
- Il est **honnête sur ses limites** : cotation = estimation d'ingénieur ; obligation et validation renvoyées au **DPO/juriste** + **liste CNIL**.
- Il ne cite **aucun article/seuil** comme preuve.

---

## Grille d'évaluation (le coach valide en session)

| Critère | Attendu | OK ? |
|--------|---------|------|
| Les **4 blocs** sont présents et dans l'ordre | Description / Nécessité / Risques / Mesures | ☐ |
| **Inventaire des données** explicite, minorité repérée | Identité, lien familial, **position**, horaires, indicateur mineur | ☐ |
| **Flux** décrits (front→API→DB→tiers carte) | Le trajet d'une position est traçable | ☐ |
| **Sur-collecte** identifiée | Historique/position hors sortie remis en cause | ☐ |
| **≥ 4 risques** techniques crédibles | Chacun avec impact estimé | ☐ |
| **1 mesure par risque**, orientée *by default* | Opt-in off, éphémère, partage restreint, DPA/UE | ☐ |
| **Renvoi au DPO/juriste + liste CNIL** explicite | Aucune décision juridique tranchée seul | ☐ |
| **Aucun article/seuil** présenté comme vérité figée | Principes + renvoi source officielle | ☐ |

---

## Coaching (relances — le coach en pose au moins 3)

1. **« Où sur-collectes-tu ? »** — L'historique complet des positions est-il nécessaire, ou seulement la dernière position pendant la sortie ? Qu'est-ce qui change pour le risque si tu ne stockes rien ?
2. **« Qu'est-ce que ton document fait dire à un dev que seul un DPO devrait trancher ? »** — Repère chaque phrase qui *conclut* sur la conformité et transforme-la en renvoi.
3. **« Le partage est-il opt-in ou opt-out ? »** — Justifie ton choix par le *privacy by default*. Que se passe-t-il si le défaut est « partage activé » ?
4. **« Ton sous-traitant cartographie héberge où ? »** — Si c'est hors UE, quel bloc du document doit le signaler, et quel module traite l'encadrement (DPA) ?
5. **« Et si, après tes mesures, le risque reste élevé ? »** — Quelle est l'étape suivante prévue par le RGPD, et qui la déclenche ?

---

## Variante J+30 (fading)

**Même exercice, contraintes ajoutées, sans rouvrir ce corrigé :**

1. En **25 minutes**, amorce la DPIA d'un **autre** traitement TribuZen : le **partage de photos d'enfants** dans l'album familial (pas de géoloc, mais photos de mineurs + partage).
2. Tu ne réutilises **pas** les risques du corrigé Sorties : trouve les scénarios propres aux **photos** (indexation par un tiers, reconnaissance faciale involontaire d'un service, capture d'écran, conservation après suppression du compte).
3. Termine par le **renvoi obligatoire** DPO/juriste + liste CNIL.

**Critère de réussite :** les 4 blocs sont là, ≥ 4 risques *spécifiques aux photos*, une mesure par risque, et aucune décision juridique tranchée seul.

---

## Application TribuZen

Dans le repo `smaurier/tribuzen`, ce brouillon vit dans le dossier conformité, pas dans le code :

```
tribuzen/
  compliance/
    dpia/
      dpia-sorties.md        ← ce lab
      dpia-photos-enfants.md ← variante J+30
```

**Portage réel :**
- Reprendre le brouillon dans l'**outil PIA de la CNIL** pour produire le format officiel, **avec le DPO**.
- Transformer les **mesures** en **tickets d'archi** : opt-in géoloc off par défaut, position éphémère chiffrée, partage restreint à la sortie, DPA avec le fournisseur de carte (module 05).
- **Réviser** la DPIA à chaque évolution du traitement.

**Commit cible :**
```
docs(compliance): brouillon DPIA feature Sorties (mineurs + géoloc) — à valider DPO
```
