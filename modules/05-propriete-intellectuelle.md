# Module 05 — Propriété intellectuelle SaaS

| Difficulté | Durée estimée |
|------------|---------------|
| 2/5        | 45 min        |

## Objectifs
- Connaître les licences open source (MIT, GPL, AGPL)
- Comprendre qui détient le code généré par l'IA
- Protéger le code TribuZen
- Anticiper les contrats d'équipe (clause IP)

---

## Licences open source — ce que tu utilises

```
MIT
  → Utilisation : libre, commerciale OK, modifier OK
  → Obligation : citer l'auteur original
  → Exemples : React, Next.js, Express, Tailwind, shadcn/ui
  → Pour TribuZen : ✅ utiliser librement

Apache 2.0
  → Comme MIT + protection des brevets
  → Exemples : TypeScript (Microsoft), NestJS
  → Pour TribuZen : ✅ utiliser librement

BSD
  → Similaire MIT avec variations (2-clause, 3-clause)
  → Pour TribuZen : ✅ utiliser librement

GPL v2/v3 (GNU Public License)
  → Utilisation : libre
  → ⚠️ Obligation : si tu distribues un binaire avec du code GPL,
     tu dois distribuer TON code source aussi (copyleft)
  → Pour une app web (TribuZen) : pas distribué → PAS d'obligation
  → Pour un package NPM distribué : obligation peut s'appliquer

AGPL (Affero GPL)
  → Comme GPL mais s'applique aussi aux apps web (SaaS)
  → ⚠️ Si tu utilisas du code AGPL dans ton SaaS → tu dois publier ton code
  → Exemples : certaines versions de MongoDB, Grafana (AGPL)
  → Pour TribuZen : ⚠️ VÉRIFIER les versions de Grafana/PostHog utilisées
  → Alternative : Grafana LGTM stack Cloud (licence commerciale séparée)

UNLICENSED / propriétaire
  → Pas de licence = tous droits réservés = pas le droit d'utiliser
  → Vérifier chaque dépendance npm : `npx license-checker`
```

---

## Code généré par IA — qui détient les droits ?

```
État du droit en 2024 (France + EU) :
  → L'œuvre protégée par le droit d'auteur doit avoir un auteur humain
  → Code 100% généré par IA = pas protégeable en l'état (pas d'auteur humain)
  → Code IA revu, modifié, intégré par toi = TU es l'auteur (œuvre dérivée)

Pratique pour TribuZen :
  → Tout le code passe par toi → tu l'adaptes → tu es l'auteur
  → Ne pas copier-coller sans comprendre
  → Documenter les parties générées par IA (pour transparence contractuelle)

CGU des outils IA :
  → Anthropic (Claude) : tu possèdes les outputs, sous réserve des conditions
  → OpenAI (ChatGPT) : tu possèdes les outputs
  → GitHub Copilot : Accord de licence précise que tu possèdes le code produit

Risque à surveiller :
  → Copilot peut reproduire des extraits de code de son corpus (memorization)
  → Si tu utilisas du code GPL issu de GitHub dans le corpus → risque de contamination
  → Garde Copilot/Claude pour l'assistance, pas pour copier-coller des blocs entiers
```

---

## Protéger le code TribuZen

```
1. Dépôt de code
   → git init + hébergement privé (GitHub private repo) = protection suffisante
   → Dépôt INPI (Institut National de la PI) : optionnel, 25€, preuve de date
   → Enveloppe Soleau (INPI) : 7€, preuve de création à une date donnée
   → Pour TribuZen startup : git log + commits horodatés = suffisant

2. Marque TribuZen
   → Dépôt INPI : 190€ pour 1 classe, 40€ par classe supplémentaire
   → Classes pertinentes : 42 (logiciels/SaaS), 9 (applications mobiles)
   → ⚠️ Vérifier disponibilité avant : inpi.fr → Marques → Recherche

3. Confidentialité avec les prestataires
   → NDA avant de partager le code avec un développeur externe
   → Clause IP dans tout contrat de prestation : "le code produit appartient à TribuZen"
```

---

## Contrats équipe — clause IP indispensable

```
Si tu recrutes un développeur (CDD, CDI, freelance) :

CLAUSE IP INDISPENSABLE :
  "Les créations réalisées par le prestataire dans le cadre de la mission
   sont cédées à [TribuZen] dès leur réalisation, à titre exclusif,
   pour le monde entier et pour toute la durée des droits de propriété
   intellectuelle, moyennant la rémunération prévue au présent contrat."

⚠️ Sans cette clause :
  → En droit français, le créateur conserve ses droits même si payé pour créer
  → Le dev peut revendiquer les droits sur le code qu'il a écrit
  → Exceptions : CDI (code créé dans le cadre de l'emploi = employeur)

Pour les co-fondateurs :
  → Pacte d'associés avec clause de vesting ET clause IP
  → Si un co-fondateur part, le code reste dans TribuZen
```

---

## Vérifier les licences de tes dépendances

```bash
# Installer license-checker
npm install --save-dev license-checker

# Analyser toutes les dépendances
npx license-checker --summary

# Identifier les licences problématiques
npx license-checker --onlyAllow "MIT;Apache-2.0;BSD-2-Clause;BSD-3-Clause;ISC;0BSD"
# → Alerte si une dépendance utilise GPL, AGPL, etc.

# Générer un rapport complet
npx license-checker --csv --out licenses.csv
```

---

## Checklist

- [ ] `npx license-checker` lancé — aucune dépendance AGPL non voulue
- [ ] La marque "TribuZen" est disponible (vérification INPI)
- [ ] Dépôt INPI prévu avant annonce publique (optionnel mais recommandé)
- [ ] Contrats prestataires incluent une clause IP explicite
- [ ] Le code de l'IA est revu, adapté, compris → Sylvain est l'auteur
