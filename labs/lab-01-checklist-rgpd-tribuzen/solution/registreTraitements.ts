// registreTraitements.ts — SOLUTION DE RÉFÉRENCE (commentée). Ne l'ouvre pas avant ton GREEN.
export type BaseLegale = "contrat" | "consentement" | "a_determiner";

export interface ChampDonnee {
  nom: string;
  necessaireAuService: boolean;
  categorieArt9: boolean;
  concerneMineur: boolean;
}

export interface ClassificationChamp {
  champ: string;
  baseLegaleProposee: BaseLegale;
  sensible: boolean;
  necessiteConsentementExplicite: boolean;
  necessiteDPIA: boolean;
  aRemonterAuJuriste: boolean;
}

export function classifierChamp(champ: ChampDonnee): ClassificationChamp {
  // Art. 9 (santé, origine, religion...) : régime renforcé, consentement EXPLICITE, jamais
  // un contrat (piège #3) — et une DPIA s'impose (module 04).
  if (champ.categorieArt9) {
    return {
      champ: champ.nom,
      baseLegaleProposee: "consentement",
      sensible: true,
      necessiteConsentementExplicite: true,
      necessiteDPIA: true,
      aRemonterAuJuriste: true,
    };
  }

  // Nécessaire au service : base contrat — SAUF que les entités "mineur" restent remontées
  // par prudence (visibilité/partage/rétention conditionnés, module 01 Ancrage TribuZen).
  if (champ.necessaireAuService) {
    return {
      champ: champ.nom,
      baseLegaleProposee: "contrat",
      sensible: false,
      necessiteConsentementExplicite: false,
      necessiteDPIA: false,
      aRemonterAuJuriste: champ.concerneMineur,
    };
  }

  // Ni Art.9 ni objectivement nécessaire : jamais de base contrat par défaut (piège #2 —
  // "c'est dans les CGU" ne crée pas la base contrat), et une donnée non nécessaire est
  // toujours une incertitude à faire trancher par le juriste/DPO.
  return {
    champ: champ.nom,
    baseLegaleProposee: "consentement",
    sensible: false,
    necessiteConsentementExplicite: false,
    necessiteDPIA: false,
    aRemonterAuJuriste: true,
  };
}

export function proposerRegistre(champs: ChampDonnee[]): ClassificationChamp[] {
  return champs.map(classifierChamp);
}

export interface AlbumPhoto {
  id: string;
  familyId: string;
  visibility: "PRIVATE" | "SHARED";
}

export function creerAlbumPhoto(input: { id: string; familyId: string }): AlbumPhoto {
  // Privacy by default : le défaut protège, l'utilisateur doit AGIR pour élargir, jamais
  // l'inverse — aucun paramètre de visibilité n'est même accepté à la création.
  return { id: input.id, familyId: input.familyId, visibility: "PRIVATE" };
}

export function partagerAlbum(album: AlbumPhoto): AlbumPhoto {
  return { ...album, visibility: "SHARED" };
}
