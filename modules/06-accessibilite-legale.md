# Module 06 — Accessibilité légale RGAA

| Difficulté | Durée estimée |
|------------|---------------|
| 2/5        | 30 min        |

## Objectifs
- Comprendre la Loi du 11 février 2005 et son champ d'application
- Savoir ce qui est obligatoire pour TribuZen vs ce qui est optionnel
- Rédiger une déclaration d'accessibilité conforme
- Utiliser l'accessibilité comme avantage concurrentiel

---

## Loi du 11 février 2005 — qui est concerné ?

```
OBLIGATOIRE :
  ├── Services de l'État et collectivités territoriales
  ├── Établissements publics
  ├── Entreprises délégataires de service public
  └── Entreprises > 250M€ CA (depuis 2023)

PAS OBLIGATOIRE pour TribuZen (startup < 250M€ CA) :
  → Légalement, non obligé de respecter le RGAA
  → MAIS : risque de plainte pour discrimination
  → ET : obligation morale envers les 20% de personnes handicapées

Pratique TribuZen :
  → Viser WCAG 2.1 AA dès le départ (= RGAA 4.1 niveau AA)
  → Coût : faible si fait dès le début, élevé si refactoring
  → Bénéfice : 12-14 millions de personnes handicapées en France
```

---

## RGAA vs WCAG

```
WCAG 2.1 (W3C) → Standard international
RGAA 4.1 → Traduction/adaptation française du WCAG pour le secteur public

Pour TribuZen :
  → Viser WCAG 2.1 AA (plus universel)
  → La conformité WCAG 2.1 AA = conformité RGAA 4.1 niveau AA
  → Outils d'audit : axe DevTools, WAVE, Lighthouse accessibility
```

---

## Déclaration d'accessibilité

Obligatoire pour les organismes publics. Bonne pratique pour tous.

```markdown
# Déclaration d'accessibilité — TribuZen

TribuZen s'engage à rendre son application accessible conformément
à l'article 47 de la loi n° 2005-102 du 11 février 2005,
aux personnes handicapées.

## État de conformité
TribuZen est partiellement conforme au référentiel WCAG 2.1 niveau AA.

## Résultats des tests
L'audit de conformité a été réalisé le [date] avec les outils :
- axe-core v4 (jest-axe dans la suite de tests)
- Lighthouse accessibility audit
- Test manuel (navigation clavier uniquement, VoiceOver sur iOS)

## Contenus non accessibles
[Liste les points non conformes avec les critères WCAG]

## Signalement
Pour tout problème d'accessibilité : accessibilite@tribuzen.fr
Délai de réponse : 5 jours ouvrés.

## Voie de recours
En cas d'absence de réponse dans les 2 mois :
- Contacter le Défenseur des droits
- Saisir le tribunal administratif
```

---

## Accessibilité comme avantage B2B2C

```
Partenariats institutionnels (CAF, PMI, municipalités) :
  → Exigent souvent une déclaration d'accessibilité
  → RGAA = critère de sélection dans les appels d'offres publics
  → "TribuZen est WCAG 2.1 AA conforme" = argument de vente

Utilisateurs concernés par TribuZen :
  ├── Parents autistes (TSA) → navigation prévisible, pas de surprise
  ├── Parents TDAH → structure claire, pas de distraction
  ├── Parents malvoyants → lecteur d'écran, contraste
  ├── Parents dyslexiques → typographie Inter (lisibilité), espacement
  └── Parents en situation précaire → connexion lente = PWA offline OK

Ces utilisateurs sont souvent parmi les PLUS touchés par la charge mentale.
L'accessibilité est cohérente avec la mission TribuZen.
```

---

## Checklist minimum MVP

```
Niveau AA minimum (jet-axe + test manuel) :
  [ ] Contraste texte : 4.5:1 (vérifié module Design System)
  [ ] Tous les boutons ont un label accessible
  [ ] Navigation clavier complète (Tab, Enter, Escape, Arrow)
  [ ] Focus ring visible sur tous les éléments interactifs
  [ ] Images décoratives avec alt="" (vide, pas absent)
  [ ] Images informatives avec alt descriptif
  [ ] Structure de titres logique (h1 → h2 → h3, pas de saut)
  [ ] Formulaires avec labels associés (shadcn Form le gère)
  [ ] Messages d'erreur associés aux champs (aria-describedby)
  [ ] Animations respectent prefers-reduced-motion
  [ ] Pages utilisables sans CSS (dégradation gracieuse)

Déclaration d'accessibilité :
  [ ] Page /accessibilite créée
  [ ] Email de contact accessibilite@tribuzen.fr fonctionnel
```

---

## Checklist

- [ ] Je comprends que RGAA n'est pas obligatoire pour TribuZen mais stratégique
- [ ] jest-axe lancé sur tous les composants (Module 08 Design System)
- [ ] Lighthouse accessibility score > 90 en CI
- [ ] Page `/accessibilite` avec déclaration minimale
- [ ] Accessibilité mentionnée dans la communication B2B2C (CAF, PMI)
