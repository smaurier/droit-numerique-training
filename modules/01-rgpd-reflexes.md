# Module 01 — RGPD : réflexes développeur

| Difficulté | Durée estimée |
|------------|---------------|
| 3/5        | 60 min        |

## Objectifs
- Identifier les 6 bases légales et choisir la bonne
- Distinguer données personnelles / données sensibles (Art. 9)
- Implémenter les droits utilisateurs (accès, effacement, portabilité)
- Réflexes de code : ce que le dev doit faire vs le juriste

---

## Ce que le RGPD dit au développeur (pas au juriste)

```
Tu n'as pas besoin de lire les 99 articles du RGPD.
Tu as besoin de 6 réflexes :

1. Minimisation : ne collecter QUE ce dont tu as besoin
   ❌ Collecter la date de naissance complète si tu as besoin que de l'âge
   ✅ Collecter age_range: '0-3' | '3-6' | '6-10' | '10-16'

2. Finalité : utiliser les données uniquement pour leur finalité déclarée
   ❌ Envoyer les emails aux partenaires sans consentement explicite
   ✅ Séparer les finalités : facturation ≠ marketing ≠ analytics

3. Durée : supprimer les données inutiles
   ❌ Garder les logs applicatifs indéfiniment
   ✅ Logs : 90 jours. Données utilisateur inactif 2 ans : anonymiser.

4. Sécurité : chiffrer et pseudonymiser
   ✅ TribuZen : données médicales enfants en E2EE (Level 1)
   ✅ TribuZen : server = UUIDs, pas de noms d'enfants

5. Accountability : être capable de prouver que tu es conforme
   ✅ Registre des traitements (Notion ou Google Sheet suffit pour MVP)
   ✅ DPA signés avec chaque sous-traitant

6. Droits : permettre accès, effacement, portabilité en < 30 jours
   ✅ Endpoint /api/user/export
   ✅ Endpoint /api/user/delete
```

---

## Les 6 bases légales — quelle choisir ?

```
Pour TribuZen :

CONSENTEMENT (Art. 6.1.a)
  → Utiliser pour : newsletters, notifications push, analytics marketing
  → Caractéristiques : révocable, spécifique, granulaire
  → Implique : bouton opt-out toujours disponible

CONTRAT (Art. 6.1.b)
  → Utiliser pour : toutes les données nécessaires au service lui-même
  → "Nous traitons votre email pour vous authentifier"
  → La base légale la plus simple pour les fonctionnalités core

INTÉRÊT LÉGITIME (Art. 6.1.f)
  → Utiliser pour : sécurité, logs, prévention fraude
  → Nécessite un "test d'équilibre" intérêts TribuZen vs droits utilisateur
  → Éviter pour les données sensibles

OBLIGATION LÉGALE (Art. 6.1.c)
  → Utiliser pour : factures (obligation comptable 10 ans), lutte anti-blanchiment

MISSION D'INTÉRÊT PUBLIC, AUTORITÉ PUBLIQUE (Art. 6.1.e)
  → Pas applicable pour TribuZen

SAUVEGARDE DES INTÉRÊTS VITAUX (Art. 6.1.d)
  → Urgences médicales — pas applicable pour TribuZen
```

---

## Données sensibles Art. 9 — TribuZen

```
Art. 9 = données qui nécessitent une protection renforcée :
  ├── Données de santé (diagnostics TSA, TDAH, allergies...)
  ├── Orientation sexuelle
  ├── Religion/convictions
  ├── Origine raciale
  ├── Opinions politiques
  └── Données biométriques

TribuZen touche à :
  ✅ Données de santé enfants (TSA, TDAH, allergies alimentaires)
  ✅ Structure familiale (implique orientation sexuelle des parents)

Ce que cela implique :
  → DPIA obligatoire (Module 02)
  → Consentement explicite (pas juste "contrat")
  → Chiffrement obligatoire (déjà fait : Level 1 E2EE)
  → Ne jamais envoyer ces données à des sous-traitants non conformes Art. 9
  → DPO recommandé (Module 02)
```

---

## Implémenter les droits utilisateurs

```typescript
// src/users/users.controller.ts

// Droit d'accès — toutes les données de l'utilisateur
@Get('export')
@UseGuards(JwtAuthGuard)
async exportData(@CurrentUser() user: User): Promise<UserDataExport> {
  return this.usersService.exportAllData(user.id);
  // Doit retourner TOUT : profil, familles, routines, journal, factures
  // Format : JSON lisible (pas dump SQL)
  // Délai légal : 30 jours après la demande
}

// Droit à l'effacement
@Delete('delete-account')
@UseGuards(JwtAuthGuard)
async deleteAccount(@CurrentUser() user: User): Promise<void> {
  // 1. Annuler l'abonnement Stripe
  await this.billingService.cancelSubscription(user.id);
  // 2. Supprimer les données ou anonymiser selon la finalité
  // Logs de facturation : anonymiser (obligation légale 10 ans)
  // Données personnelles : supprimer
  await this.usersService.anonymizeAndDelete(user.id);
  // 3. Supprimer les données Level 1 côté client (elles y sont déjà)
}

// Droit à la portabilité
@Get('export/json')
@UseGuards(JwtAuthGuard)
async exportJson(@CurrentUser() user: User, @Res() res: Response): Promise<void> {
  const data = await this.usersService.exportAllData(user.id);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename="tribuzen-export.json"');
  res.send(JSON.stringify(data, null, 2));
}
```

---

## Registre des traitements (obligatoire > 250 employés, fortement recommandé sinon)

Pour TribuZen solo, un fichier Notion suffit :

```
Traitement 1 : Authentification utilisateur
  Base légale : Contrat
  Données : email, hash mot de passe / credential passkey
  Durée : durée du compte + 1 an après fermeture
  Sous-traitants : Scaleway (hébergement), Stripe (auth via passkeys non)
  Transfert hors EU : Non

Traitement 2 : Organisation familiale
  Base légale : Contrat
  Données : noms familles, routines, événements (pseudonymisés sur le serveur)
  Durée : durée du compte
  Sous-traitants : Scaleway

Traitement 3 : Données médicales enfants (Art. 9)
  Base légale : Consentement explicite
  Données : diagnostics, allergies (chiffrées côté client, jamais sur le serveur)
  Durée : durée du compte
  Sous-traitants : Aucun (E2EE Level 1)

Traitement 4 : Facturation
  Base légale : Obligation légale + Contrat
  Données : email, nom, adresse, historique paiements
  Durée : 10 ans (obligation comptable)
  Sous-traitants : Stripe (DPA signé)
```

---

## Checklist

- [ ] Registre des traitements créé (Notion suffit)
- [ ] Base légale identifiée pour chaque traitement
- [ ] Données Art. 9 identifiées et séparées (E2EE Level 1)
- [ ] Endpoint `/api/user/export` implémenté
- [ ] Endpoint `/api/user/delete-account` implémenté (avec anonymisation factures)
- [ ] Durées de conservation définies et implémentées (cron job de nettoyage)
