# Module 04 — Contrats sous-traitants (DPA)

| Difficulté | Durée estimée |
|------------|---------------|
| 2/5        | 30 min        |

## Objectifs
- Comprendre ce qu'est un DPA et pourquoi c'est obligatoire
- Savoir où trouver et signer le DPA de chaque sous-traitant TribuZen
- Connaître les clauses qui protègent vs les clauses à surveiller

---

## Qu'est-ce qu'un DPA ?

```
Data Processing Agreement (DPA) = Accord de traitement des données
→ Contrat obligatoire (Art. 28 RGPD) entre :
   - Toi (responsable de traitement)
   - Ton sous-traitant qui accède aux données de tes utilisateurs

Sans DPA → violation RGPD → amende jusqu'à 4% CA mondial ou 20M€
```

---

## DPA TribuZen — checklist complète

```
SCALEWAY (hébergement)
  → Où : scaleway.com → Privacy → DPA
  → Auto-signature dans l'espace client
  → Points clés : données en France, ISO 27001, HDS (hébergement données santé)
  → ⚠️ Pour données médicales Level 2 → vérifier certification HDS de Scaleway

STRIPE (paiement)
  → Où : Dashboard → Settings → Team & security → Data Processing Agreement
  → Auto-signature numérique
  → Points clés : PCI-DSS Level 1, SCCs pour US, données EU disponibles

SENTRY (monitoring erreurs)
  → Où : sentry.io/legal → Data Processing Addendum
  → ⚠️ Sentry héberge aux USA → Clauses Contractuelles Types (CCT)
  → Configurer la masquage données PII dans les replays (RGPD)
  → Options : self-hosted Sentry (Scaleway) = solution idéale pour TribuZen

POSTHOG (analytics produit)
  → Où : posthog.com/privacy → DPA
  → ✅ PostHog Cloud EU (eu.posthog.com) → hébergement EU
  → ✅ DPA automatiquement accepté en utilisant la région EU

PLAUSIBLE (analytics web)
  → Où : plausible.io → DPA
  → ✅ Self-hosted sur Scaleway EU → zéro problème de transfert
  → ✅ Pas de cookies → consentement non requis
  → Alternative sans DPA si self-hosted
```

---

## Ce qu'un bon DPA doit contenir

```
Art. 28 RGPD exige :

1. Objet et durée du traitement
2. Nature et finalité du traitement
3. Type de données traitées et catégories de personnes
4. Obligations et droits du responsable de traitement

Et impose au sous-traitant :
  → Ne traiter que sur instruction documentée
  → Confidentialité des personnes autorisées
  → Mesures de sécurité (Art. 32)
  → Pas de sous-traitance sans autorisation
  → Assister pour les droits des personnes
  → Supprimer ou restituer les données en fin de contrat
  → Mettre à disposition les informations pour audit
```

---

## Transferts hors UE — que faire ?

```
Post-Schrems II, les transferts US sont légaux via :

1. Clauses Contractuelles Types (CCT) — Standard Contractual Clauses
   → Modèles de la Commission Européenne
   → Adoptées par Sentry, AWS, Google
   → Vérifier que la CCT est à jour (version 2021)

2. Binding Corporate Rules (BCR)
   → Pour les groupes multinationaux
   → Stripe l'utilise

3. EU-US Data Privacy Framework (2023)
   → Remplace Privacy Shield
   → AWS, Google, Microsoft certifiés
   → Vérifier la liste : https://www.dataprivacyframework.gov/

Stratégie TribuZen : préférer les solutions EU
  ✅ Scaleway (FR) > AWS (US)
  ✅ PostHog EU > PostHog US
  ✅ Sentry self-hosted sur Scaleway > Sentry cloud US
```

---

## Checklist

- [ ] DPA Scaleway signé dans l'espace client
- [ ] DPA Stripe signé dans le Dashboard
- [ ] DPA Sentry signé (ou Sentry self-hosted sur Scaleway)
- [ ] DPA PostHog signé (ou région EU configurée)
- [ ] Tableau sous-traitants dans la politique de confidentialité mis à jour
- [ ] Vérifier certification HDS Scaleway pour données santé Level 2
