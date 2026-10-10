<!-- FLAG-REVIEW: droit/légal — valider par Sylvain + juriste avant diffusion publique -->

# Lab 08 — La checklist de conformité globale de TribuZen « avant lancement » (capstone)

> ⚠️ **Ceci n'est PAS un conseil juridique.** Ce lab — dernier du cours — est un **exercice pédagogique** de synthèse. La checklist que tu produiras est un **outil de préparation et de dialogue** côté développeur, **pas** un certificat de conformité. Elle ne remplace ni un **audit d'accessibilité** par un expert, ni la validation d'un **juriste / DPO / avocat**. Aucun seuil, taux, date ou article ne doit être présenté comme une vérité figée. Les sources qui font foi : **[accessibilite.numerique.gouv.fr](https://accessibilite.numerique.gouv.fr)** (RGAA, déclaration), **[legifrance.gouv.fr](https://www.legifrance.gouv.fr)** (loi 2005-102), **[cnil.fr](https://www.cnil.fr)** (RGPD). Toute décision d'assujettissement ou de conformité se **valide avec un expert**.

> **Outcome :** à la fin, tu sais **assembler la checklist de conformité globale de TribuZen avant lancement** — intégrant les modules 00-07 **et** l'accessibilité (module 08) — avec, pour chaque ligne, **qui décide (dev / juriste / DPO / auditeur)**.
> **Vrai outil :** un document Markdown structuré (`checklist-conformite-lancement.md`) versionné dans le dossier `compliance/` du repo. **Aucun code** — c'est un exercice de conformité et de décision argumentée.
> **Feedback :** le coach valide en session (pas d'auto-correcteur). Grille ci-dessous.

---

## Contexte

TribuZen est prêt techniquement. Le board fixe une **date de lancement**. Une association partenaire demande si l'app est utilisable au lecteur d'écran et s'il existe une **déclaration d'accessibilité** ; une **collectivité** (appel d'offres) demande si TribuZen est **conforme RGAA**.

Tu es le **seul développeur**. « On lance » ne veut pas dire « le code marche » : il faut que **tout le cours** soit en place — RGPD (01), cookies (02), droits des personnes (03), DPIA (04), sous-traitants/DPA (05), mentions/CGU/DSA (06), propriété intellectuelle/licences (07) — **plus** l'accessibilité (08). Et il faut savoir **qui tranche** chaque point.

Ton livrable : la **checklist de conformité globale « avant lancement »**, capstone du cours.

---

## Énoncé

Produis un document `checklist-conformite-lancement.md`. **Pas de code.** Tu écris en français, en te tenant aux **principes**, sans citer d'article/seuil/taux comme s'il s'agissait d'une vérité tranchée, et en **renvoyant explicitement** à l'expert (juriste / DPO / auditeur) pour toute décision qui engage l'entreprise.

Le document doit contenir :

1. **En-tête honnête** — un statut clair : *« Outil de préparation dev — NON contractuel. La conformité réelle se valide par audit + juriste/DPO. »*, avec la mention des sources officielles (accessibilite.numerique.gouv.fr, legifrance, cnil.fr).

2. **La checklist principale — un tableau** avec, pour **chaque** domaine du cours, au minimum ces colonnes :
   - `#`
   - **Domaine** (le sujet de conformité)
   - **Module source** (00-08)
   - **Ce que le DEV met en place** (la matière : schéma, endpoint, page, inventaire…)
   - **Qui décide / valide** (`Dev` / `Juriste` / `DPO` / `Auditeur`)
   - **État** (`fait` / `en cours` / `à faire` / `bloqué — remonté`)

   La checklist doit couvrir **au moins les 10 domaines** du cours :
   bases légales RGPD ; données sensibles & mineurs (Art. 9) ; minimisation & privacy by default ; consentement cookies/traceurs ; droits des personnes (export/suppression) ; DPIA ; DPA & sous-traitants/transferts hors UE ; CGU/mentions/DSA ; propriété intellectuelle & licences ; **accessibilité** (RGAA/WCAG + déclaration).

3. **Un focus accessibilité** — une sous-section dédiée qui précise, en principe :
   - le **cadre** (RGAA/WCAG, loi 2005, EAA) et le fait que l'assujettissement exact de TribuZen est une **question juriste** (renvoi seuils à la source) ;
   - au moins **5 points techniques** vérifiables que le dev met en place (ex. HTML sémantique, navigation clavier, contraste AA, alt sur images, focus visible, labels de formulaire) ;
   - la **déclaration d'accessibilité** : ses éléments (état + taux, résultats de tests, contenus non accessibles, contact accessible, **voie de recours / Défenseur des droits**), avec la mention que l'**état est établi par AUDIT**, pas auto-déclaré.

4. **Trois décisions remontées** — identifie **au moins 3 lignes** où le dev **ne peut pas trancher seul** et écris, pour chacune, **la question exacte** posée à l'expert (ex. *« Base légale du traitement X : contrat ou consentement ? — pour le juriste »*).

5. **Clause de continuité** — une phrase finale : la conformité est un **processus continu** ; toute nouvelle feature **ré-ouvre** les lignes concernées.

**Interdits :** te déclarer « conforme RGAA » sans audit ; graver un seuil/taux/date comme vérité ; trancher seul une décision d'expert dans la colonne « qui décide ».

---

## Étapes (en friction)

1. **Reconstitue de mémoire** les 8 domaines RGPD/juridiques du cours (00-07) avant de rouvrir les modules — puis vérifie et complète. (Effet de génération.)
2. **Pour chaque domaine, sépare deux choses** : ce que *toi* tu produis (matière) vs *qui valide*. Écris la matière d'abord, la colonne « qui décide » ensuite.
3. **Traite l'accessibilité comme les autres** : cadre en principe + points techniques + déclaration, sans t'auto-déclarer conforme.
4. **Chasse les décisions que tu es tenté de trancher seul** : à chaque ligne, demande-toi *« est-ce que je décide, ou est-ce que je prépare ? »*. Ce qui n'est pas « Dev » devient une **question remontée**.
5. **Marque l'état** de chaque ligne honnêtement (`bloqué — remonté` est une réponse valide et souhaitable).
6. **Relis** en cherchant la moindre phrase qui *conclut* sur la conformité à la place d'un expert, et transforme-la en **renvoi**.

---

## Corrigé (exemple commenté)

> Un corrigé possible — pas *le* corrigé. L'important est la **méthode** (matière dev vs décision expert) et l'**honnêteté** sur ce qui se remonte.

```markdown
# Checklist de conformité TribuZen — AVANT LANCEMENT
Statut : OUTIL DE PRÉPARATION DEV — NON contractuel.
La conformité RÉELLE se valide par AUDIT (accessibilité) + JURISTE/DPO (RGPD, DSA, licences).
Sources qui font foi : accessibilite.numerique.gouv.fr, legifrance.gouv.fr, cnil.fr.
Révision : cette checklist se ré-ouvre à CHAQUE nouvelle feature.

## Checklist principale
| # | Domaine | Module | Ce que le DEV met en place | Qui décide/valide | État |
|---|---------|--------|-----------------------------|-------------------|------|
| 1 | Bases légales RGPD | 01 | registre des traitements, base étiquetée par traitement | Juriste/DPO | bloqué — remonté |
| 2 | Données sensibles & mineurs (Art. 9) | 01 | santé isolée + chiffrée, marqueur « mineur » sur les entités | Juriste/DPO | en cours |
| 3 | Minimisation & privacy by default | 01 | schéma minimal, album PRIVATE par défaut, consentements décochés | Dev | fait |
| 4 | Consentement cookies & traceurs | 02 | bandeau (refuser = accepter), preuve/registre des consentements | Dev pose / Juriste valide | en cours |
| 5 | Droits des personnes | 03 | /me/export (périmètre complet), /me/delete (cascade) | Dev fait / DPO cadre délai | fait |
| 6 | DPIA (mineurs + géoloc) | 04 | flux, sous-traitants, mesures (matière technique) | DPO/juriste décident | bloqué — remonté |
| 7 | DPA & sous-traitants / hors UE | 05 | inventaire sous-traitants + localisation d'hébergement | Juriste (DPA, SCC) | en cours |
| 8 | CGU / mentions / DSA | 06 | pages mentions & CGU, mécanisme de signalement | Juriste (rédaction, DSA) | à faire |
| 9 | Propriété intellectuelle & licences | 07 | inventaire des licences des dépendances | Juriste (compatibilité) | en cours |
| 10 | Accessibilité (RGAA/WCAG + déclaration) | 08 | HTML sémantique, clavier, contraste AA, page /accessibilite | Auditeur valide l'état | en cours |

## Focus accessibilité
Cadre (en principe) : RGAA (déclinaison FR des WCAG, niveau AA visé), loi 2005-102 art. 47,
European Accessibility Act (Dir. UE 2019/882) qui élargit à des services privés.
⚠️ L'assujettissement EXACT de TribuZen (seuil de CA ~250 M€ ? service visé par l'EAA ?)
est une QUESTION JURISTE. Seuils/dates → source officielle, non figés ici.

Points techniques mis en place par le dev :
- HTML sémantique (landmarks, titres h1→h2→h3 sans saut) ;
- navigation clavier complète + focus visible sur tout élément interactif ;
- contraste texte niveau AA ;
- alt descriptif sur images informatives, alt="" sur images décoratives ;
- labels associés aux champs + erreurs liées (aria-describedby) ;
- respect de prefers-reduced-motion.

Déclaration d'accessibilité (page /accessibilite) :
- état (totale/partielle/non conforme) + TAUX — ÉTABLIS PAR AUDIT, pas auto-déclarés ;
- résultats des tests (référentiel/version/date, axe-core, Lighthouse, tests manuels
  lecteur d'écran) ;
- contenus non accessibles + dérogations éventuelles ;
- contact accessible (accessibilite@tribuzen.app) ;
- voie de recours : Défenseur des droits.

## Décisions remontées (le dev NE tranche PAS)
1. [Juriste] Base légale du traitement « données de santé enfants » : consentement
   explicite suffisant, ou faut-il autre chose ? (ligne 1/2)
2. [DPO/juriste] La feature « Sorties » (mineurs + géoloc) déclenche-t-elle une DPIA
   obligatoire ? (ligne 6)
3. [Juriste] Le sous-traitant de cartographie héberge hors UE : transfert licite
   (SCC) ou faut-il changer de fournisseur ? (ligne 7)
4. [Auditeur] Quel est l'état de conformité RÉEL à déclarer après audit RGAA ? (ligne 10)

## Continuité
Cette checklist n'est pas un tampon définitif. Toute nouvelle feature (nouveau
sous-traitant, géoloc, composant UI, usage IA) RÉ-OUVRE les lignes concernées.
```

**Pourquoi ce corrigé est bon :**
- il couvre **les 10 domaines** du cours, chacun rattaché à son **module source** ;
- la colonne **« qui décide »** est remplie honnêtement — le dev n'y met « Dev » que pour ce qu'il décide *réellement* (conception) ;
- l'accessibilité est traitée **sans auto-déclaration de conformité** (état = audit) et renvoie les seuils à la source ;
- il isole **≥ 3 décisions remontées** sous forme de **questions précises** à l'expert ;
- il affirme la **continuité** (processus, pas tampon) et ne grave **aucun** seuil/taux/date.

---

## Grille d'évaluation (le coach valide en session)

| Critère | Attendu | OK ? |
|--------|---------|------|
| **En-tête honnête** (non contractuel + sources officielles) | Statut clair + renvoi accessibilite.numerique.gouv.fr / legifrance / cnil | ☐ |
| **Les 10 domaines** du cours sont présents | 00-07 + accessibilité, chacun avec son **module source** | ☐ |
| Colonne **« ce que le DEV met en place »** concrète | matière vérifiable (schéma, endpoint, page, inventaire) par ligne | ☐ |
| Colonne **« qui décide »** juste | `Dev` seulement pour la conception ; le reste → Juriste/DPO/Auditeur | ☐ |
| Colonne **« état »** honnête | `bloqué — remonté` utilisé quand c'est le cas | ☐ |
| **Focus accessibilité** complet | cadre en principe + ≥ 5 points techniques + déclaration (état par audit, contact, recours) | ☐ |
| **≥ 3 décisions remontées** en questions précises | chacune adressée à un expert nommé (juriste/DPO/auditeur) | ☐ |
| **Aucune auto-déclaration « conforme »** sans audit | état de conformité = résultat d'audit | ☐ |
| **Aucun seuil/taux/date** présenté comme vérité figée | principes + renvoi source officielle | ☐ |
| **Clause de continuité** présente | conformité = processus, ré-ouverte par chaque feature | ☐ |

---

## Coaching (relances — le coach en pose au moins 3)

1. **« Sur cette ligne, tu décides ou tu prépares ? »** — Prends une ligne où tu as mis « Dev » dans « qui décide » : est-ce vraiment une décision de conception, ou une décision juridique déguisée (base légale, durée, transfert) ?
2. **« Peux-tu écrire "conforme RGAA" ? »** — Sur quelle preuve ? Si tu n'as pas d'audit, quel état honnête peux-tu déclarer, et qui doit établir le vrai ?
3. **« Ta startup est-elle obligée à l'accessibilité ? »** — Justifie sans trancher : seuil de CA, EAA, exigence des partenaires publics. Quelle est la part « question juriste » ?
4. **« Quelles 3 questions envoies-tu à ton juriste/DPO demain matin ? »** — Formule-les assez précisément pour qu'il puisse répondre sans revenir vers toi. Vague = inutile.
5. **« Que se passe-t-il quand tu ajoutes une feature IA le mois prochain ? »** — Quelles lignes de la checklist se ré-ouvrent, et pourquoi une checklist figée est dangereuse ?

---

## Variante J+30 (fading)

**Même exercice, contraintes ajoutées, sans rouvrir ce corrigé :**

1. En **30 minutes**, reconstruis la checklist **de mémoire** (au moins 8 des 10 domaines), colonne « qui décide » incluse.
2. Ajoute **une feature nouvelle** non vue dans le corrigé — un **assistant IA** qui lit le journal des familles — et montre **quelles lignes existantes se ré-ouvrent** (RGPD, DPIA, sous-traitant du modèle, information des personnes) **plus** ce qu'elle ajoute (transparence IA — renvoi module 00 / AI Act).
3. Termine par les **décisions remontées** propres à cette feature IA, adressées au bon expert.

**Critère de réussite :** ≥ 8 domaines de mémoire, la colonne « qui décide » correcte, la feature IA ré-ouvre les bonnes lignes, et **aucune** décision d'expert tranchée seul.

---

## Application TribuZen

Dans le repo `smaurier/tribuzen`, ce livrable **referme** le dossier conformité — il pointe vers tous les autres :

```
tribuzen/
  compliance/
    checklist-conformite-lancement.md   ← CE lab (capstone) — pointe vers tout le reste
    registre-traitements.md             ← module 01
    consentements/                      ← module 02
    droits-personnes/                   ← module 03
    dpia/                               ← module 04
    sous-traitants-dpa.md               ← module 05
    mentions-cgu/                       ← module 06
    licences.md                         ← module 07
    accessibilite/
      declaration.md                    ← état établi par AUDIT
      audit-rgaa.md                     ← axe-core / Lighthouse / tests manuels
  src/
    pages/accessibilite.vue             ← page /accessibilite publiée
```

**Portage réel :**
- Transformer chaque ligne `à faire` / `bloqué — remonté` en **ticket** (dev) ou en **question envoyée** (juriste/DPO/auditeur).
- Commander un **audit RGAA** avant de renseigner l'état de conformité de la déclaration.
- Faire **relire toute la checklist** par le juriste/DPO — le dev présente la matière, l'expert valide.
- **Ré-ouvrir** la checklist à chaque évolution du produit (nouvelle feature, nouveau sous-traitant, IA).

**Commit cible :**
```
docs(compliance): checklist conformité TribuZen avant lancement (capstone) — à valider juriste/DPO + audit RGAA
```
