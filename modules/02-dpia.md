# Module 02 — DPIA : Analyse d'impact relative à la protection des données

| Difficulté | Durée estimée |
|------------|---------------|
| 3/5        | 45 min        |

## Objectifs
- Comprendre quand une DPIA est obligatoire
- Connaître la structure d'une DPIA
- Savoir ce qui relève du DPO vs du CTO
- Utiliser la DPIA comme asset de confiance

---

## Quand la DPIA est-elle obligatoire ?

Une DPIA est obligatoire quand :
- Données sensibles (Art. 9) → OUI pour TribuZen (données santé enfants)
- Traitement à grande échelle → à partir de ~500 personnes concernées
- Surveillance systématique de personnes

**TribuZen → DPIA obligatoire dès la beta.**

---

## Structure d'une DPIA TribuZen

```
1. Description du traitement
   Qui traite quoi, comment, pourquoi, combien de temps

2. Évaluation de la nécessité et de la proportionnalité
   "Peut-on atteindre l'objectif avec moins de données ?"
   TribuZen : OUI → données médicales restent sur le device (E2EE)

3. Identification des risques
   ├── Accès non autorisé aux données → Mitigation : E2EE + passkeys
   ├── Divulgation données enfants → Mitigation : Level 1 hors serveur
   ├── Vol de la base de données → Mitigation : pseudonymisation (UUIDs)
   └── Violation par sous-traitant → Mitigation : DPA signés, hébergement EU

4. Mesures prises pour atténuer les risques
   → Lister chaque mesure technique et organisationnelle

5. Consultation de la CNIL (si risque résiduel élevé)
   → Si après mesures, risque reste élevé → consultation CNIL obligatoire
   → TribuZen : risque résiduel faible grâce à l'E2EE → consultation non obligatoire
```

---

## DPO — est-ce obligatoire ?

```
OBLIGATOIRE si :
  ├── Organisme public
  ├── Surveillance systématique à grande échelle
  └── Données sensibles traitées à grande échelle

Pour TribuZen au démarrage :
  → Pas obligatoire (startup, échelle limitée)
  → Fortement recommandé avant 1000 utilisateurs
  → DPO externalisé = 1 200-3 000€/an (cabinets spécialisés)

Stratégie TribuZen :
  Phase 1 (0-500 users) : Sylvain = DPO de fait (Responsable de traitement)
  Phase 2 (500+ users) : DPO externalisé
  Phase 3 (partenariats CAF/PMI) : DPO formalisé obligatoire
```

---

## La DPIA comme asset marketing

```
Avant la DPIA → "Nous protégeons vos données" (promesse)
Après la DPIA → "Notre DPIA est disponible sur demande" (preuve)

Usages :
  ├── Partenariats institutionnels : CAF, PMI, mutuelles exigent souvent une DPIA
  ├── B2B2C : "Nous avons réalisé notre DPIA" = différenciateur face aux concurrents
  └── Marketing : bannière "Certifié DPIA" sur la landing page
```

---

## Modèle de DPIA simplifié (starter)

```markdown
# DPIA TribuZen — [Date]
Version : 1.0

## 1. Contexte
TribuZen est une application d'aide à l'organisation familiale destinée aux parents.
Elle traite des données personnelles d'adultes et indirectement de mineurs.

## 2. Traitements concernés
| Traitement | Base légale | Données Art. 9 ? |
|-----------|------------|------------------|
| Auth utilisateur | Contrat | Non |
| Organisation familiale | Contrat | Non |
| Données médicales enfants | Consentement explicit | OUI |
| Facturation | Obligation légale | Non |

## 3. Risques identifiés et mesures
| Risque | Probabilité | Impact | Mesure |
|--------|------------|--------|--------|
| Accès non autorisé DB | Faible | Élevé | Données médicales E2EE (Level 1) |
| Vol de compte | Moyen | Élevé | WebAuthn passkeys, pas de mots de passe |
| Sous-traitant défaillant | Faible | Moyen | DPA signés, hébergement EU |
| Fuite interne | Très faible | Élevé | Pseudonymisation, accès minimal |

## 4. Risque résiduel
FAIBLE — les données sensibles ne transitent pas sur le serveur.

## 5. DPO consulté : N/A (< 500 utilisateurs)
## 6. Date de révision : [Date + 1 an]
```

---

## Checklist

- [ ] DPIA réalisée avant la beta (données Art. 9 → obligatoire)
- [ ] La DPIA mentionne l'architecture E2EE Level 1 comme mesure principale
- [ ] Risques identifiés avec probabilité + impact + mitigation
- [ ] La DPIA est mise à jour chaque année (ou après changement majeur)
- [ ] La DPIA est disponible sur demande (partenaires institutionnels)
