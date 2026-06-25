# Module 03 — CGU, Mentions légales, Politique de confidentialité

| Difficulté | Durée estimée |
|------------|---------------|
| 2/5        | 45 min        |

## Objectifs
- Connaître la structure minimale légale de chaque document
- Distinguer ce que tu dois comprendre vs ce qu'un avocat doit rédiger
- Identifier les red flags dans un contrat SaaS
- Savoir quand appeler un avocat

---

## Mentions légales (obligation légale FR — Loi LCEN 2004)

```
Contenu obligatoire pour tout site web :
  ├── Nom et prénom OU raison sociale
  ├── Adresse OU RCS
  ├── Email de contact (pas juste un formulaire)
  ├── SIREN
  ├── Numéro TVA intracommunautaire (si applicable)
  ├── Hébergeur : nom, adresse, contact (ex: Scaleway SAS, Paris)
  └── Directeur de la publication (toi)

Page : /mentions-legales
Accessible depuis le footer de chaque page.
```

---

## CGU (Conditions Générales d'Utilisation)

```
Structure minimale :
  1. Objet : "Les présentes CGU régissent l'utilisation de TribuZen"
  2. Accès au service : âge minimum (16 ans pour données personnelles)
  3. Obligations de l'utilisateur : usage personnel, pas de revente...
  4. Propriété intellectuelle : TribuZen reste propriétaire du code et du contenu
  5. Données personnelles : renvoi vers la politique de confidentialité
  6. Responsabilité : limitation de responsabilité (dans les limites légales FR)
  7. Suspension/résiliation : conditions de fermeture de compte
  8. Droit applicable : droit français, tribunal compétent
  9. Modification : délai de préavis (30 jours minimum)

⚠️ En droit français, certaines clauses abusives sont NULLES même si acceptées :
  ❌ "Nous pouvons modifier les CGU sans préavis" → NULL si préjudiciable
  ❌ "Vous renoncez à tout recours" → Illégal en droit FR
  ❌ "Nous transmettons vos données à nos partenaires" sans liste exhaustive → RGPD violation
```

---

## Politique de confidentialité TribuZen

```
Structure (basée sur les exigences Art. 13 et 14 RGPD) :

1. Qui sommes-nous ?
   TribuZen [forme juridique], [adresse], contact@tribuzen.fr

2. Quelles données collectons-nous et pourquoi ?
   → Tableau par finalité (cf. registre des traitements)

3. Données médicales de vos enfants
   → "Ces données ne quittent jamais votre appareil.
      TribuZen ne peut techniquement pas y accéder."
   → Architecture E2EE expliquée simplement

4. Nos sous-traitants
   | Sous-traitant | Pays | Finalité | Lien DPA |
   |---------------|------|---------|---------|
   | Scaleway | France | Hébergement | ... |
   | Stripe | Irlande (EU) | Paiement | ... |
   | Sentry | USA | Monitoring erreurs | ... |
   | PostHog | EU | Analytics | ... |
   | Plausible | EU | Analytics RGPD | ... |

5. Vos droits
   Accès, rectification, effacement, portabilité, opposition, limitation
   → Comment exercer : contact@tribuzen.fr
   → Délai de réponse : 30 jours
   → Recours CNIL : www.cnil.fr

6. Cookies et traceurs
   → Plausible : aucun cookie
   → PostHog : cookie analytics (consentement requis)

7. Durée de conservation
   → Tableau par catégorie de données

8. Transferts hors UE
   → Sentry (USA) : Clauses Contractuelles Types (CCT) → OK
   → Stripe : Binding Corporate Rules + DPA → OK

9. Modifications
   → Notification par email 30 jours avant
```

---

## Red flags dans un contrat SaaS à surveiller

```
❌ "We may share your data with third parties for marketing purposes"
   → Partage de données sans consentement = violation RGPD

❌ "All disputes shall be resolved in [ville US]"
   → Clause de compétence territoriale défavorable

❌ "We own all content you create on the platform"
   → Vos routines, vos souvenirs = propriété TribuZen ?!

❌ "We may terminate your account at any time without notice"
   → Risque de perte de données sans délai de préavis

❌ Absence de DPA pour les sous-traitants EU
   → RGPD violation

✅ Ce qu'un bon contrat doit avoir :
   → DPA explicite si sous-traitant
   → Clause de portabilité des données
   → Délai de préavis pour fermeture de compte (30 jours minimum)
   → Droit applicable clairement défini
```

---

## Quand appeler un avocat ?

```
Tu peux faire toi-même :
  ✅ Mentions légales (formulaire CNIL)
  ✅ Registre des traitements (tableau)
  ✅ Politique de confidentialité (template + adaptation)
  ✅ DPIA (module 02 — template)

Tu dois appeler un avocat pour :
  🔴 CGU dès que tu as des utilisateurs payants
  🔴 Conditions Générales de Vente (abonnements)
  🔴 Contrat avec un partenaire institutionnel (CAF, école, mutuelle)
  🔴 Levée de fonds (term sheet)
  🔴 Recrutement de co-fondateur (pacte d'associés)

Budget estimé :
  CGU + CGV + Politique conf. → 800€ - 2 000€ (avocat spécialisé numérique)
  → Rentabilisé sur le premier incident évité
```

---

## Checklist

- [ ] Page `/mentions-legales` avec tous les éléments obligatoires
- [ ] CGU rédigée (template + avocat avant lancement commercial)
- [ ] Politique de confidentialité avec section données médicales enfants
- [ ] Tableau des sous-traitants avec liens DPA
- [ ] Section droits utilisateurs avec email de contact et délai 30 jours
