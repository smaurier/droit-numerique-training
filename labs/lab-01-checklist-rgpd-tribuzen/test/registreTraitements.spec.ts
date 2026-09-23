// Oracle du lab 01 (Droit numérique). Ne pas modifier.
import { describe, expect, it } from "vitest";
import {
  classifierChamp,
  creerAlbumPhoto,
  partagerAlbum,
  proposerRegistre,
  type ChampDonnee,
} from "@lab/registreTraitements";

// Le formulaire d'inscription RÉEL de TribuZen (module 01 §3, Exemple 1) — la date de
// naissance COMPLÈTE du parent n'y figure PAS : la minimisation l'a déjà remplacée par un
// simple `isAdult: boolean` (le champ "date de naissance parent" du tableau du module a pour
// base proposée "—", précisément parce qu'il ne doit plus exister du tout).
const FORMULAIRE_INSCRIPTION_TRIBUZEN: ChampDonnee[] = [
  { nom: "email", necessaireAuService: true, categorieArt9: false, concerneMineur: false },
  { nom: "mot de passe (hash)", necessaireAuService: true, categorieArt9: false, concerneMineur: false },
  { nom: "prénom parent", necessaireAuService: true, categorieArt9: false, concerneMineur: false },
  { nom: "prénom enfant", necessaireAuService: true, categorieArt9: false, concerneMineur: true },
  { nom: "date de naissance enfant", necessaireAuService: true, categorieArt9: false, concerneMineur: true },
  { nom: "allergies / diagnostic", necessaireAuService: true, categorieArt9: true, concerneMineur: true },
  { nom: "photo famille (enfants)", necessaireAuService: false, categorieArt9: false, concerneMineur: true },
];

describe("classifierChamp — reproduit EXACTEMENT le tableau du module 01 §3 Exemple 1", () => {
  it.each([
    ["email", "contrat"],
    ["mot de passe (hash)", "contrat"],
    ["prénom parent", "contrat"],
    ["prénom enfant", "contrat"],
    ["date de naissance enfant", "contrat"],
    ["allergies / diagnostic", "consentement"],
    ["photo famille (enfants)", "consentement"],
  ])("%s → base légale %s", (nom, baseAttendue) => {
    const champ = FORMULAIRE_INSCRIPTION_TRIBUZEN.find((c) => c.nom === nom)!;
    expect(classifierChamp(champ).baseLegaleProposee).toBe(baseAttendue);
  });

  it("les allergies/diagnostic sont Art.9 : sensible, consentement EXPLICITE, DPIA requise", () => {
    const resultat = classifierChamp(FORMULAIRE_INSCRIPTION_TRIBUZEN.find((c) => c.nom === "allergies / diagnostic")!);
    expect(resultat.sensible).toBe(true);
    expect(resultat.necessiteConsentementExplicite).toBe(true);
    expect(resultat.necessiteDPIA).toBe(true);
  });

  it("un champ non sensible et nécessaire (email) ne déclenche NI consentement explicite NI DPIA", () => {
    const resultat = classifierChamp(FORMULAIRE_INSCRIPTION_TRIBUZEN.find((c) => c.nom === "email")!);
    expect(resultat.sensible).toBe(false);
    expect(resultat.necessiteConsentementExplicite).toBe(false);
    expect(resultat.necessiteDPIA).toBe(false);
  });
});

describe("classifierChamp — piège #2 : une donnée NON objectivement nécessaire n'a JAMAIS la base contrat", () => {
  it("un champ non-Art.9 mais non nécessaire au service retombe sur consentement, jamais contrat", () => {
    const champ: ChampDonnee = { nom: "numéro de téléphone marketing", necessaireAuService: false, categorieArt9: false, concerneMineur: false };
    expect(classifierChamp(champ).baseLegaleProposee).toBe("consentement");
  });
});

describe("classifierChamp — piège #5 : le dev remonte, il ne tranche jamais seul", () => {
  it("une donnée Art.9 est TOUJOURS remontée au juriste", () => {
    const champ: ChampDonnee = { nom: "diagnostic", necessaireAuService: true, categorieArt9: true, concerneMineur: false };
    expect(classifierChamp(champ).aRemonterAuJuriste).toBe(true);
  });

  it("une donnée concernant un mineur est remontée MÊME si la base contrat est claire", () => {
    const champ: ChampDonnee = { nom: "prénom enfant", necessaireAuService: true, categorieArt9: false, concerneMineur: true };
    expect(classifierChamp(champ).aRemonterAuJuriste).toBe(true);
  });

  it("une donnée non nécessaire est remontée (incertitude à trancher, pas au dev de décider)", () => {
    const champ: ChampDonnee = { nom: "photo famille (enfants)", necessaireAuService: false, categorieArt9: false, concerneMineur: true };
    expect(classifierChamp(champ).aRemonterAuJuriste).toBe(true);
  });

  it("un champ adulte, non sensible, nécessaire, N'A PAS besoin d'être remonté (classification de routine)", () => {
    const champ: ChampDonnee = { nom: "email", necessaireAuService: true, categorieArt9: false, concerneMineur: false };
    expect(classifierChamp(champ).aRemonterAuJuriste).toBe(false);
  });
});

describe("proposerRegistre — le registre complet, dans l'ordre", () => {
  it("applique la classification à chaque champ, en préservant l'ordre", () => {
    const registre = proposerRegistre(FORMULAIRE_INSCRIPTION_TRIBUZEN);
    expect(registre.map((r) => r.champ)).toEqual(FORMULAIRE_INSCRIPTION_TRIBUZEN.map((c) => c.nom));
    expect(registre.find((r) => r.champ === "allergies / diagnostic")!.necessiteDPIA).toBe(true);
  });
});

describe("creerAlbumPhoto / partagerAlbum — privacy by default (module 01 §3 Exemple 2)", () => {
  it("un album créé est TOUJOURS privé, jamais partagé par défaut", () => {
    const album = creerAlbumPhoto({ id: "a1", familyId: "f1" });
    expect(album.visibility).toBe("PRIVATE");
  });

  it("impossible de passer une visibilité à la création — le type ne l'accepte même pas", () => {
    // @ts-expect-error — creerAlbumPhoto n'accepte pas `visibility` : le défaut protège,
    // il n'y a même pas de paramètre pour le contourner.
    creerAlbumPhoto({ id: "a1", familyId: "f1", visibility: "SHARED" });
  });

  it("partagerAlbum élargit explicitement SANS muter l'original", () => {
    const prive = creerAlbumPhoto({ id: "a1", familyId: "f1" });
    const partage = partagerAlbum(prive);

    expect(partage.visibility).toBe("SHARED");
    expect(prive.visibility).toBe("PRIVATE"); // l'original n'a jamais changé
    expect(partage).not.toBe(prive); // nouvel objet, pas une mutation
  });
});
