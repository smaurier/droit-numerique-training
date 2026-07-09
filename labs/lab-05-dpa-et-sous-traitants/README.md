<!-- FLAG-REVIEW: droit/légal — valider par Sylvain + juriste avant diffusion publique -->

# Lab 05 — DPA et sous-traitants : cartographier et vérifier avant d'intégrer

> **⚠️ Ceci n'est PAS un conseil juridique.** Cet exercice entraîne un **réflexe de développeur** : cartographier une chaîne de sous-traitants et dérouler une checklist avant d'intégrer un service. Les qualifications que tu produiras (rôle, validité d'un DPA, encadrement d'un transfert) sont des **propositions à faire valider par un juriste / DPO / avocat**. Les sources qui font foi sont **[cnil.fr](https://www.cnil.fr)** et la **[Commission européenne](https://commission.europa.eu/law/law-topic/data-protection_fr)** ; les mécanismes évoqués (Art. 28, SCC, DPF) évoluent.

> **Outcome :** à la fin, tu sais **cartographier les sous-traitants d'un produit** dans un registre, **repérer un transfert hors UE** et son mécanisme, et **dérouler une checklist** avant d'intégrer un nouveau service — en distinguant ce que le dev tranche de ce qu'il remonte.
> **Vrai outil :** un registre en tableau (Markdown, Notion ou Google Sheet) — le format réel d'un registre de sous-traitants. Aucun code, aucun harnais.
> **Feedback :** le coach valide en session (grille ci-dessous). Pas d'auto-correcteur.

---

## Énoncé

TribuZen prépare son MVP et s'appuie sur des services tiers. Ton travail : **produire le registre des sous-traitants** de TribuZen, puis **dérouler la checklist d'intégration** pour un nouveau service qu'on veut ajouter.

Services déjà pressentis pour le MVP TribuZen :

```
PAIEMENT
  - Stripe (encaissement des abonnements)

HÉBERGEMENT
  - un hébergeur cloud (base de données + fichiers/photos de l'app)

MESURE D'USAGE
  - un outil d'analytics produit (événements, parcours, IP)

MONITORING
  - un outil de suivi d'erreurs type Sentry (traces d'erreur, parfois données utilisateur)

E-MAILS TRANSACTIONNELS
  - un service d'envoi d'e-mails (confirmation, réinitialisation de mot de passe)
```

### Ta production (README-only, aucun code)

**Livrable A — Registre des sous-traitants.** Une ligne par service, colonnes :

| Service | Finalité | Données transmises | Localisation | Transfert hors UE ? (mécanisme) | DPA (présent ? où ?) | Sous-traitants ultérieurs | À remonter juriste |
|---|---|---|---|---|---|---|---|

Remplis avec ce que tu **sais raisonnablement**, et marque **explicitement** les incertitudes (tu n'as pas à deviner une config exacte).

**Livrable B — Checklist d'un nouvel intégration.** Le PO veut ajouter un **outil de notifications push** (qui verra des identifiants d'appareil et, potentiellement, des données rattachées à des **enfants**). Déroule la checklist du module (§2.7) sur ce service précis et **conclus** : on intègre / on cherche une alternative UE / on remonte avant d'intégrer — en **argumentant**.

---

## Étapes (en friction)

1. **Pour chaque service, qualifie le rôle** — sous-traitant (pour le compte de TribuZen) ou responsable de ses propres finalités ? Dans le doute, note-le.
2. **Liste les données transmises** — sois précis (email, moyen de paiement, IP, identifiants d'appareil, photos, données d'enfants).
3. **Repère la localisation** — UE ou hors UE ? Si tu ne sais pas, écris « à confirmer » plutôt que d'inventer.
4. **Marque les transferts hors UE** et le **mécanisme** plausible (adéquation / SCC / DPF). N'affirme jamais qu'un cadre est valide « pour toujours ».
5. **Note le DPA** — présent ? où le signer / l'archiver ? Sans DPA, le service ne s'intègre pas.
6. **Cherche la chaîne** — pense à la page « sub-processors » de chaque prestataire.
7. **Remplis la colonne « à remonter juriste »** — elle n'est jamais vide dès qu'il y a un transfert ou un doute de rôle.
8. **Déroule la checklist (Livrable B)** sur le push, et **tranche** : intégrer, alternative UE, ou remonter. Justifie, surtout à cause des données d'enfants.

> Contrainte : tu ne tranches **seul** que ce qui relève du dev (cartographie, choix de région UE, archivage, documentation). La validité d'un DPA, d'un SCC ou d'un rôle porte la mention « à valider juriste / DPO ».

---

## Grille d'évaluation (le coach valide en session)

| Critère | Attendu | ✓/✗ |
|---|---|---|
| **Rôles** | tous les services qualifiés comme sous-traitants ; réflexe « et s'il réutilise pour ses propres finalités ? » présent | |
| **Données** | données précises par service ; identifiants d'appareil + données d'enfants repérés sur le push | |
| **Localisation** | UE / hors UE renseigné ; incertitudes marquées « à confirmer » au lieu d'être inventées | |
| **Transferts** | services US typiques (Stripe, analytics, monitoring) marqués transfert hors UE + mécanisme (SCC / DPF) | |
| **DPA** | colonne DPA remplie ; règle « pas de DPA = pas d'intégration » énoncée | |
| **Chaîne** | référence aux sous-traitants ultérieurs / page sub-processors | |
| **Checklist (B)** | les 8 points déroulés sur le push ; conclusion argumentée (alternative UE / remontée) | |
| **Frontière dev/juriste** | ≥ 1 incertitude explicitement remontée ; aucun DPA/SCC/DPF présenté comme figé ; renvoi cnil.fr / Commission | |

Réussite = registre exploitable **et** au moins une incertitude honnêtement remontée plutôt que tranchée en force, **et** conclusion argumentée sur le push (les données d'enfants pèsent vers alternative UE + remontée).

---

## Coach — relances de session (≥ 3)

Le coach ne corrige pas ligne à ligne : il **fait raisonner**. Trois relances minimum :

1. **« Ce service, il traite pour TON compte ou pour LE SIEN ? »** — force à qualifier le rôle. Si le service réutilise les données pour ses propres finalités (audience, entraînement de modèles), ce n'est plus un simple sous-traitant → creuser le régime.
2. **« Où partent physiquement les données, et qu'est-ce qui encadre ce départ ? »** — sur Stripe, l'analytics, le monitoring. Faire distinguer *DPA* (Art. 28) et *transfert hors UE* (SCC / DPF) : ce sont deux vérifications séparées.
3. **« Ça, tu l'intègres, tu cherches une alternative UE, ou tu le remontes ? »** — sur le push qui voit des données d'enfants. Objectif : que Sylvain trace lui-même la frontière dev / juriste et sente que les données de mineurs poussent vers la prudence.

(Relance bonus si le temps le permet : **« Et les sous-traitants de ton sous-traitant, tu les as regardés ? »** — vérifier que la chaîne / page sub-processors est intégrée comme angle mort classique.)

---

## Variante J+30 (fading)

Refais le travail **de mémoire, en 25 minutes**, sans rouvrir le module ni ce corrigé, avec **deux ajouts** :

1. Un service tiers que tu croyais UE annonce qu'il **migre une partie de son infra aux États-Unis**. Mets à jour la ligne de registre concernée : qu'est-ce qui change, quel mécanisme doit apparaître, et que remontes-tu ?
2. Pour **un seul** service de ton choix, rédige la **phrase exacte** que tu enverrais au DPO pour lever l'incertitude (par exemple : version des SCC, certification DPF, sous-traitant ultérieur douteux). Elle doit être **précise et actionnable**.

**Critère de réussite :** la migration US déclenche l'ajout d'un mécanisme de transfert (SCC / DPF) + une remontée juriste, et ta question au DPO est **concrète**, pas une question générale du type « est-ce conforme ? ».

---

## Application TribuZen

Ce lab produit le **registre des sous-traitants** de TribuZen. Dans le repo `smaurier/tribuzen`, il se matérialise ainsi :

```
tribuzen/
  docs/
    registre-sous-traitants.md   ← ton registre (Livrable A) devient ce fichier
    dpa/                          ← les DPA signés seront archivés ici, un par service
    conformite-notes.md          ← ta checklist push (Livrable B) + questions DPO
```

Ce registre pilote ensuite des choix de code réels :
- il justifie chaque intégration (`src/payments`, `src/analytics`, `src/monitoring`, `src/mailer`) — pas de branchement sans DPA ni ligne de registre ;
- il oriente vers des **régions / offres UE** (ou self-hosted) pour éviter le sujet transfert quand c'est possible ;
- il rouvre le chantier **DPIA** (module 04) pour tout service voyant des données d'enfants (le push notamment).

**Ce qui reste hors périmètre du dev** : la validation des DPA, des SCC / DPF et des rôles revient au **juriste / DPO**. Le lab t'entraîne à préparer un registre *défendable* et une décision d'intégration *argumentée*, pas à signer les contrats.

**Commit cible :**
```
docs(conformite): registre des sous-traitants TribuZen v0 — DPA, transferts hors UE, checklist d'intégration
```
