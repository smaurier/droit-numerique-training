---
titre: "DPA et sous-traitants : intégrer un service tiers sans casser le RGPD"
cours: 23-droit-numerique
notions: ["responsable de traitement vs sous-traitant", "DPA / contrat de sous-traitance (Art. 28)", "chaîne de sous-traitants ultérieurs", "transferts hors UE", "clauses contractuelles types (SCC/CCT)", "décision d'adéquation", "EU-US Data Privacy Framework", "registre des sous-traitants", "checklist avant d'intégrer un service tiers"]
outcomes:
  - "sait distinguer responsable de traitement et sous-traitant pour un service tiers donné"
  - "sait dire ce qu'un DPA doit couvrir au titre de l'Art. 28 sans en figer le texte"
  - "sait repérer un transfert hors UE et nommer le mécanisme qui l'encadre (adéquation, SCC, DPF)"
  - "sait tenir un registre des sous-traitants et ce qu'il doit contenir"
  - "sait dérouler une checklist avant d'intégrer un nouveau service, et savoir quoi remonter au juriste / DPO"
prerequis: ["00-introduction-au-droit-du-numerique", "01-rgpd-reflexes-developpeur", "02-consentement-cookies-et-traceurs", "03-droits-des-personnes", "04-dpia-analyse-impact"]
next: 06-cgu-mentions-et-obligations-plateforme
libs: []
tribuzen: "chaîne de sous-traitants de TribuZen — cartographier Stripe, l'hébergeur, l'analytics et le monitoring, vérifier DPA et localisation des données avant chaque intégration"
last-reviewed: 2026-07
---

<!-- FLAG-REVIEW: droit/légal — valider par Sylvain + juriste avant diffusion publique -->

> **⚠️ Ceci n'est PAS un conseil juridique.** Ce module donne des **principes et des réflexes de développeur** pour intégrer proprement un service tiers, pas une analyse contractuelle. Le choix et la revue d'un **DPA**, la qualification d'un rôle (responsable / sous-traitant), la validité d'un **transfert hors UE** sont des **décisions juridiques** à confier à un **juriste, un DPO ou un avocat**. Les articles, mécanismes et cadres évoqués (Art. 28, SCC, Data Privacy Framework) sont des **ordres de grandeur** : le droit évolue, les sources qui font foi sont **[cnil.fr](https://www.cnil.fr)** et la **[Commission européenne](https://commission.europa.eu/law/law-topic/data-protection_fr)**.

# DPA et sous-traitants : intégrer un service tiers sans casser le RGPD

> **Outcomes — tu sauras FAIRE :** distinguer responsable de traitement et sous-traitant, dire ce qu'un DPA doit couvrir, repérer un transfert hors UE et son mécanisme d'encadrement, tenir un registre des sous-traitants, et dérouler une checklist avant d'intégrer un service.
> **Difficulté :** :star::star::star:

## 1. Cas concret d'abord

Tu bosses sur TribuZen, l'app d'organisation familiale. Trois tickets tombent dans le sprint :

```
TRIBU-142  Encaisser les abonnements → intégrer Stripe
TRIBU-143  Mesurer l'usage produit   → ajouter un outil d'analytics
TRIBU-144  Suivre les erreurs en prod → brancher un monitoring (Sentry-like)
```

Tu es tenté de faire ce que fait tout le monde : `npm install`, coller la clé d'API, et livrer. Mais chacun de ces trois services va **accéder à des données personnelles de tes utilisateurs** — email, moyen de paiement, adresse IP, parfois des données d'**enfants**. À la seconde où un prestataire touche à ces données **pour ton compte**, il devient un **sous-traitant** au sens du RGPD, et ça déclenche des obligations très concrètes :

1. **Qui est responsable de quoi ?** TribuZen décide *pourquoi* et *comment* les données sont traitées → TribuZen est **responsable de traitement**. Stripe traite *pour le compte* de TribuZen → **sous-traitant**. (§2.1)
2. **Ai-je un contrat de sous-traitance (DPA) signé ?** L'Art. 28 du RGPD l'exige, **avant** que le service touche la moindre donnée. (§2.2)
3. **Où partent les données ?** Si le service héberge ou réplique hors UE, il faut un **mécanisme de transfert** valide (adéquation, SCC, DPF). (§2.4)
4. **Est-ce à moi de trancher ?** La validité d'un DPA ou d'un transfert est une **décision juridique** : je prépare le dossier, le juriste / DPO valide. (§2.6)

Ce module te donne le réflexe « **avant d'intégrer un service tiers, je vérifie le DPA et la localisation des données** » — et la checklist qui va avec.

---

## 2. Théorie complète, concise

### 2.1 Responsable de traitement vs sous-traitant

Le RGPD distingue deux rôles, et le rôle détermine les obligations.

- **Responsable de traitement** : l'organisme qui décide des **finalités** (le *pourquoi*) et des **moyens** (le *comment*) du traitement. Pour TribuZen, c'est TribuZen.
- **Sous-traitant** : selon la CNIL, la personne physique ou morale qui **traite des données pour le compte** du responsable, sur ses **instructions**. Stripe, l'hébergeur, l'outil d'analytics traitent pour le compte de TribuZen → sous-traitants.

Le test pratique : **qui décide de la finalité ?** Si le prestataire ne fait qu'exécuter tes instructions, c'est un sous-traitant. S'il réutilise les données pour **ses propres finalités** (par exemple entraîner ses modèles, revendre de l'audience), il devient **responsable** de ce traitement-là, et le régime change. Cette qualification n'est pas toujours évidente (co-responsabilité possible) : **à valider avec le juriste**.

> Réflexe dev : « pour mon compte, sur mes instructions » = sous-traitant. « pour ses propres finalités » = autre régime. Source : **[cnil.fr — sous-traitant](https://www.cnil.fr/fr/definition/sous-traitant)**.

### 2.2 Le DPA / contrat de sous-traitance (Art. 28)

Dès qu'un sous-traitant intervient, l'Art. 28 du RGPD impose un **contrat écrit** — souvent appelé **DPA** (*Data Processing Agreement*) ou *addendum de traitement des données*. Ce n'est pas une formalité optionnelle : sans DPA, l'intégration est **non conforme**, même si le service est techniquement irréprochable.

Sur le fond, un DPA au titre de l'Art. 28 encadre au moins (principe, pas texte figé) :

- l'**objet, la durée, la nature et la finalité** du traitement ;
- les **types de données** et **catégories de personnes** concernées ;
- l'obligation de ne traiter que sur **instruction documentée** du responsable ;
- la **confidentialité** des personnes autorisées à traiter ;
- les **mesures de sécurité** (en lien avec l'Art. 32) ;
- l'encadrement de la **sous-traitance ultérieure** (§2.3) ;
- l'**assistance** au responsable pour les droits des personnes et les violations ;
- la **suppression ou restitution** des données en fin de contrat ;
- la mise à disposition des informations nécessaires aux **audits**.

Côté dev, ce qui compte : le DPA existe **avant** le branchement, il est **signé** (souvent auto-signature dans l'espace client), et il est **archivé**. La revue de ses clauses relève du juriste.

> Le texte exact d'un DPA et sa conformité sont une **décision juridique**. Le dev vérifie qu'il **existe et couvre le service**, le juriste / DPO **valide le contenu**. Sources : **[cnil.fr — le sous-traitant](https://www.cnil.fr/fr/sous-traitant)**, Art. 28 RGPD.

### 2.3 La chaîne de sous-traitants (sous-traitance ultérieure)

Un sous-traitant a lui-même **ses propres sous-traitants**. Ton hébergeur peut s'appuyer sur un fournisseur de stockage ; ton outil d'analytics sur un CDN ; ton monitoring sur un service de mail. C'est une **chaîne**, et le RGPD impose que :

- le sous-traitant ne recrute pas de **sous-traitant ultérieur** sans **autorisation** (spécifique ou générale) du responsable ;
- les mêmes obligations de protection **se répercutent** en cascade jusqu'au bout de la chaîne.

Réflexe dev : quand tu intègres un service, regarde sa **liste de sous-traitants** (souvent une page « sub-processors »). Un simple outil d'analytics peut faire transiter des données par plusieurs pays. La **liste** t'intéresse autant que le DPA lui-même, parce que c'est là que se cachent les **transferts hors UE**.

### 2.4 Transferts hors UE

Par principe, les données personnelles bénéficient du niveau de protection du RGPD **dans l'UE / EEE**. Les transférer hors de cet espace n'est possible que si un **niveau de protection suffisant** est garanti. La CNIL décrit plusieurs mécanismes, dans cet ordre logique :

1. **Décision d'adéquation** : la Commission européenne reconnaît qu'un pays offre une protection équivalente (la liste évolue). Le transfert est alors possible **sans garantie supplémentaire**.
2. **Garanties appropriées** en l'absence d'adéquation, dont :
   - les **clauses contractuelles types** (CCT / *SCC*), modèles adoptés par la Commission (§2.5) ;
   - les **règles d'entreprise contraignantes** (BCR) pour les transferts intra-groupe.
3. **Dérogations** pour situations particulières (encadrées, à ne pas utiliser comme régime courant).

Le cas des **États-Unis** est piégeux : l'arrêt **Schrems II** (2020) a invalidé le *Privacy Shield*. Depuis 2023, l'**EU-US Data Privacy Framework** offre une base pour les entreprises américaines **certifiées** — mais il faut **vérifier la certification** du prestataire, et ce cadre peut lui-même évoluer.

> Aucun mécanisme n'est « acquis pour toujours ». La liste des pays adéquats et la validité des cadres US changent. Vérifier sur **[cnil.fr — transférer des données hors de l'UE](https://www.cnil.fr/fr/les-outils-de-la-conformite/transferer-des-donnees-hors-de-lue)** et faire **valider par le juriste / DPO**.

### 2.5 Les clauses contractuelles types (SCC / CCT)

Les **clauses contractuelles types** (*Standard Contractual Clauses*, SCC en anglais, CCT en français) sont des **modèles de contrat pré-approuvés par la Commission européenne** qui servent de « garanties appropriées » pour un transfert hors UE quand il n'y a pas d'adéquation. La Commission a publié en **2021** une version modernisée qui a remplacé les anciens modèles.

Réflexe dev : quand un service US propose des SCC dans son DPA, c'est bon signe, mais deux points se **vérifient** (côté juriste) : que la **version** est bien la version modernisée, et qu'une **analyse d'impact du transfert** a été menée si nécessaire. Toi, tu notes juste : « ce service transfère hors UE, encadrement = SCC 2021 » dans le registre.

> Source : **[Commission européenne — Standard Contractual Clauses](https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/standard-contractual-clauses-scc_en)**. Le contenu et la version des SCC sont fixés par la Commission — ne jamais recopier un extrait comme s'il était figé.

### 2.6 Le registre des sous-traitants

Tenir une **cartographie** de ses sous-traitants n'est pas de la bureaucratie : c'est ce qui rend la conformité **vérifiable** et qui te permet de répondre en 5 minutes à « où partent les données de mes utilisateurs ? ». Un registre minimal, par sous-traitant :

| Colonne | Ce qu'elle capture |
|---|---|
| Service | nom du prestataire (Stripe, hébergeur, analytics…) |
| Finalité | à quoi il sert (paiement, hébergement, mesure d'audience) |
| Données transmises | catégories (email, paiement, IP, données d'enfants…) |
| Localisation | où les données sont hébergées / répliquées |
| Transfert hors UE ? | oui/non + mécanisme (adéquation / SCC / DPF) |
| DPA | présent ? où signé ? date ? |
| Sous-traitants ultérieurs | lien vers leur liste |

Ce registre est le **livrable du lab**. Il alimente aussi la **politique de confidentialité** (la liste des destinataires) et le **registre des activités de traitement** tenu par le responsable.

### 2.7 La checklist avant d'intégrer un service tiers

Le réflexe à ancrer, à dérouler **avant** le `npm install` :

1. **Quelles données** le service va-t-il voir ? (email, paiement, IP, mineurs, santé…)
2. **Quel rôle** joue-t-il ? Sous-traitant (pour mon compte) ou responsable de ses propres finalités ?
3. **Y a-t-il un DPA** ? Où le signer, l'archiver ?
4. **Où sont hébergées** les données ? UE ou hors UE ?
5. Si hors UE, **quel mécanisme** l'encadre (adéquation / SCC / DPF) ? Est-il à jour / certifié ?
6. **Quels sous-traitants ultérieurs** ? (page sub-processors)
7. **Une DPIA** est-elle nécessaire (données de mineurs, santé, suivi) ? (→ module 04)
8. **Qu'est-ce que je remonte** au juriste / DPO avant d'intégrer ?

Si une case bloque (pas de DPA, transfert non encadré), **on n'intègre pas** — ou on choisit une alternative UE. C'est un choix **d'architecture**, pas un détail de fin de sprint.

---

## 3. Worked examples

### Exemple 1 — Qualifier trois services TribuZen

On reprend les trois tickets du §1. **Ce tableau est une proposition de développeur, à faire valider par un juriste / DPO.**

| Service | Rôle | Données vues | Localisation typique | Transfert hors UE ? | Point de vigilance |
|---|---|---|---|---|---|
| **Stripe** (paiement) | sous-traitant | email, moyen de paiement, montant | mixte (UE + US selon config) | possible → SCC / DPF | vérifier le DPA + où sont stockées les données EU |
| **Hébergeur** | sous-traitant | **toutes** les données de l'app | dépend du choix (UE recommandé) | non si région UE | privilégier une région/offre **UE** |
| **Analytics produit** | sous-traitant | IP, événements d'usage, parfois identifiants | souvent US | souvent → SCC | préférer un outil **UE** ou self-hosted ; attention aux données d'enfants |

Lecture dev :
1. Chaque service a un **DPA à signer et archiver** avant branchement.
2. On **privilégie les régions / offres UE** pour éviter le sujet transfert quand c'est possible.
3. L'analytics qui voit des données d'**enfants** est le plus sensible → alternative UE ou self-hosted, et **remontée juriste** sur la nécessité d'une DPIA.
4. On **note les incertitudes** (config Stripe, sub-processors de l'analytics) au lieu de trancher seul.

### Exemple 2 — Une ligne de registre remplie

Voici à quoi ressemble **une** entrée du registre des sous-traitants, telle qu'elle vivra dans le repo :

```
Service ................. Stripe
Finalité ................ encaissement des abonnements
Données transmises ...... email, moyen de paiement, montant, pays
Localisation ............ UE + États-Unis (selon configuration du compte)
Transfert hors UE ....... OUI → encadré par SCC (à confirmer version) / DPF si certifié
DPA ..................... signé le 2026-07-xx via le dashboard Stripe, PDF archivé dans docs/dpa/
Sous-traitants ultérieurs  voir la page sub-processors du prestataire
À remonter juriste ...... vérifier version des SCC + certification DPF à jour
```

Le réflexe : la colonne **« à remonter juriste »** n'est jamais vide quand il y a un transfert. On documente ce qu'on **sait**, on flag ce qu'on **ne tranche pas**.

---

## 4. Pièges & misconceptions

### PIÈGE #1 — « Le service est connu / gros, donc c'est conforme »

La notoriété d'un prestataire ne crée **pas** de base de conformité chez toi. C'est **ton** intégration qui doit être conforme : DPA signé, transfert encadré, registre à jour. Un géant du secteur peut très bien impliquer un **transfert hors UE** que tu dois documenter et encadrer.

### PIÈGE #2 — « J'ai la clé d'API, donc je peux livrer »

Techniquement oui, juridiquement non. Le branchement d'un sous-traitant **sans DPA** est une non-conformité, indépendamment de la qualité du code. Le DPA se signe **avant** que le service touche la moindre donnée réelle.

### PIÈGE #3 — Confondre sous-traitant et responsable

Un prestataire qui réutilise tes données pour **ses propres finalités** (entraîner ses modèles, revendre de l'audience) n'est plus un simple sous-traitant sur ce traitement. Le supposer sous-traitant « par défaut » peut masquer un régime tout autre. En cas de doute sur le rôle → **remonter au juriste**.

### PIÈGE #4 — Croire qu'un DPA règle la question du transfert

Le DPA (Art. 28) encadre **comment** le sous-traitant traite les données. Le **transfert hors UE** est une question **séparée** qui exige son propre mécanisme (adéquation, SCC, DPF). Un DPA parfait n'autorise pas à lui seul un transfert non encadré.

### PIÈGE #5 — Traiter les SCC ou le DPF comme « acquis pour toujours »

Le *Privacy Shield* était valide… jusqu'à Schrems II. La liste des pays adéquats, la version des SCC et la certification DPF **évoluent**. Copier un extrait de SCC dans le code ou le doc comme une vérité figée est une erreur : on renvoie à la **source officielle** et on **re-vérifie** périodiquement.

### PIÈGE #6 — Oublier la chaîne de sous-traitants

Regarder seulement ton sous-traitant direct et ignorer **ses** sous-traitants laisse un angle mort : c'est souvent là que se produit le transfert hors UE. La page « sub-processors » fait partie de l'analyse.

---

## 5. Ancrage TribuZen

TribuZen s'appuie, dès le MVP, sur une **chaîne de sous-traitants** qui voient des données à haut risque (paiement, IP, données d'**enfants**). Les réflexes de ce module structurent chaque intégration :

- **Cartographie** → un `registre-sous-traitants.md` liste Stripe, l'hébergeur, l'analytics, le monitoring, avec finalité, données, localisation, transfert et DPA.
- **DPA avant branchement** → chaque service a son DPA **signé et archivé** (`docs/dpa/`) *avant* la première vraie donnée.
- **Localisation UE d'abord** → pour l'hébergement, l'analytics et le monitoring, on privilégie une **région / offre UE** (ou self-hosted) pour éviter le sujet transfert quand c'est possible — décision **by design**, pas correctif tardif.
- **Transferts tracés** → quand un service transfère hors UE (Stripe notamment), le registre note le **mécanisme** (SCC / DPF) et flag la vérification juriste.
- **Chaîne** → on garde le lien vers la page **sub-processors** de chaque prestataire.
- **Lien DPIA** → un service qui voit des données d'enfants rouvre la question **DPIA** (module 04).

Fichiers concernés dans `smaurier/tribuzen` :
```
tribuzen/
  docs/
    registre-sous-traitants.md   ← cartographie (livrable du lab)
    dpa/                          ← PDF des DPA signés, un par service
  src/
    payments/                    ← intégration Stripe (sous-traitant)
    analytics/                   ← outil de mesure (préférence UE / self-hosted)
    monitoring/                  ← suivi d'erreurs (préférence UE / self-hosted)
```

> Ce qui relève du dev : la **cartographie**, le **choix de région UE**, l'**archivage** des DPA, la **documentation** des transferts. Ce qui relève du juriste / DPO : **valider** les DPA, la validité des **SCC / DPF**, et la qualification des **rôles**.

---

## 6. Points clés

1. Responsable de traitement = décide finalités + moyens ; sous-traitant = traite **pour son compte, sur ses instructions**.
2. Un prestataire qui réutilise les données pour **ses propres finalités** sort du rôle de simple sous-traitant → autre régime, à qualifier avec le juriste.
3. L'Art. 28 impose un **DPA écrit**, signé **avant** que le service touche la moindre donnée réelle.
4. La sous-traitance est une **chaîne** : les obligations se répercutent, et la page « sub-processors » révèle souvent les transferts.
5. Transfert hors UE = besoin d'un **mécanisme** : adéquation, à défaut **SCC** ou BCR, à défaut dérogations encadrées.
6. Les **SCC** sont des modèles pré-approuvés par la Commission (version modernisée 2021) ; l'**EU-US DPF** encadre les prestataires US **certifiés** — à re-vérifier.
7. Un DPA ne règle **pas** à lui seul la question du transfert : ce sont deux vérifications distinctes.
8. Le **registre des sous-traitants** rend la conformité vérifiable et alimente la politique de confidentialité.
9. Le dev déroule la **checklist** et **prépare le dossier** ; la validité des DPA et transferts est **validée par le juriste / DPO**. En cas de doute : ne pas intégrer, remonter.

---

## 7. Seeds Anki

```
Quelle est la différence entre responsable de traitement et sous-traitant ?|Le responsable décide des finalités (pourquoi) et des moyens (comment) ; le sous-traitant traite les données pour le compte du responsable, sur ses instructions.
Qu'est-ce qu'un DPA et quel article du RGPD l'impose ?|Un Data Processing Agreement (contrat de sous-traitance) : contrat écrit imposé par l'Art. 28, à signer avant que le sous-traitant touche des données. Son contenu se valide avec un juriste.
Cite trois éléments qu'un DPA doit couvrir au titre de l'Art. 28.|Parmi : objet/durée/nature/finalité du traitement, types de données et personnes concernées, traitement sur instruction documentée, confidentialité, sécurité (Art. 32), encadrement de la sous-traitance ultérieure, assistance aux droits, suppression/restitution en fin de contrat, audits.
Qu'est-ce qu'un transfert hors UE et quels mécanismes l'encadrent ?|Transfert de données personnelles hors UE/EEE. Encadré par, dans l'ordre : décision d'adéquation, puis garanties appropriées (SCC / BCR), puis dérogations encadrées.
Que sont les clauses contractuelles types (SCC/CCT) ?|Des modèles de contrat pré-approuvés par la Commission européenne servant de garantie appropriée pour un transfert hors UE en l'absence d'adéquation ; version modernisée publiée en 2021.
Pourquoi ne faut-il pas considérer les SCC ou le Data Privacy Framework comme acquis pour toujours ?|Parce que le droit évolue : le Privacy Shield a été invalidé (Schrems II, 2020), la liste des pays adéquats et la validité des cadres US changent. On renvoie à la source officielle et on re-vérifie.
Un DPA signé suffit-il à autoriser un transfert hors UE ?|Non : le DPA (Art. 28) encadre comment le sous-traitant traite les données ; le transfert hors UE est une question séparée qui exige son propre mécanisme (adéquation, SCC, DPF).
Qu'est-ce que la chaîne de sous-traitants et pourquoi elle compte ?|Un sous-traitant a ses propres sous-traitants (ultérieurs) ; les obligations se répercutent en cascade, et c'est souvent dans cette chaîne (page sub-processors) que se produisent les transferts hors UE.
Que contient au minimum un registre des sous-traitants ?|Par service : finalité, données transmises, localisation, transfert hors UE + mécanisme, présence/date du DPA, et la liste des sous-traitants ultérieurs.
```

---

## Pont vers le lab

> Lab associé : `labs/lab-05-dpa-et-sous-traitants/README.md`. Cartographier les sous-traitants de TribuZen (registre) et dérouler la checklist avant d'intégrer un nouveau service. Analyse et décision argumentée — pas de code, feedback coach en session.
