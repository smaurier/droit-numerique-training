// registreTraitements.ts — PAGE BLANCHE. Le formulaire d'inscription RÉEL de TribuZen
// (module 01 §3, Exemple 1) manipule un cocktail à haut risque : adultes ET mineurs,
// données de santé (Art. 9), photos d'enfants. Construis le registre de traitements — PAS
// une décision juridique finale (le dev PROPOSE et REMONTE, il ne tranche jamais seul, piège
// #5) — et le privacy-by-default sur les albums photo (module 01 §3, Exemple 2).
//
// export type BaseLegale = "contrat" | "consentement" | "a_determiner"
//
// export interface ChampDonnee {
//   nom: string;
//   necessaireAuService: boolean; // objectivement nécessaire au service (piège #2 : "c'est
//                                 // dans les CGU" ne crée PAS de base contrat à soi seul)
//   categorieArt9: boolean;       // santé, origine, religion... (régime renforcé)
//   concerneMineur: boolean;
// }
//
// export interface ClassificationChamp {
//   champ: string;
//   baseLegaleProposee: BaseLegale;
//   sensible: boolean;                    // Art. 9
//   necessiteConsentementExplicite: boolean;
//   necessiteDPIA: boolean;               // module 04 : une DPIA s'impose sur données Art.9
//   aRemonterAuJuriste: boolean;          // TOUJOURS vrai pour Art.9 et mineur — jamais tranché seul
// }
//
// export function classifierChamp(champ: ChampDonnee): ClassificationChamp
//   Règles (module 01 §2.4, §3 Exemple 1, pièges #2/#3/#5) :
//   - `categorieArt9` vrai → `sensible: true`, `baseLegaleProposee: "consentement"` (explicite
//     — Art.9 exige un consentement EXPLICITE, jamais un contrat), `necessiteConsentementExplicite:
//     true`, `necessiteDPIA: true`, `aRemonterAuJuriste: true`.
//   - `categorieArt9` faux ET `necessaireAuService` vrai → `baseLegaleProposee: "contrat"`,
//     tout le reste `false`, SAUF `aRemonterAuJuriste` qui reste `true` si `concerneMineur`
//     (les entités "enfant" portent un marqueur qui conditionne visibilité/partage/rétention
//     — remonté par prudence, jamais tranché seul).
//   - `categorieArt9` faux ET `necessaireAuService` faux → `baseLegaleProposee: "consentement"`
//     (piège #2 : sans nécessité objective, pas de base contrat, même mentionné aux CGU),
//     `aRemonterAuJuriste: true` (une donnée non objectivement nécessaire est TOUJOURS une
//     incertitude à faire trancher).
//
// export function proposerRegistre(champs: ChampDonnee[]): ClassificationChamp[]
//   - Applique `classifierChamp` à chaque champ, dans l'ordre donné.
//
// export interface AlbumPhoto { id: string; familyId: string; visibility: "PRIVATE" | "SHARED" }
// export function creerAlbumPhoto(input: { id: string; familyId: string }): AlbumPhoto
//   - Privacy by default (module 01 §3, Exemple 2) : la création ne prend JAMAIS de
//     `visibility` en entrée — l'album est TOUJOURS créé `"PRIVATE"`. Élargir la visibilité
//     est une action SÉPARÉE et explicite (`partagerAlbum`), jamais un choix à la création.
// export function partagerAlbum(album: AlbumPhoto): AlbumPhoto
//   - Retourne une NOUVELLE version de l'album avec `visibility: "SHARED"` (ne mute pas
//     l'original).
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

export function classifierChamp(_champ: ChampDonnee): ClassificationChamp {
  throw new Error("classifierChamp n'est pas encore implémenté");
}

export function proposerRegistre(_champs: ChampDonnee[]): ClassificationChamp[] {
  throw new Error("proposerRegistre n'est pas encore implémenté");
}

export interface AlbumPhoto {
  id: string;
  familyId: string;
  visibility: "PRIVATE" | "SHARED";
}

export function creerAlbumPhoto(_input: { id: string; familyId: string }): AlbumPhoto {
  throw new Error("creerAlbumPhoto n'est pas encore implémenté");
}

export function partagerAlbum(_album: AlbumPhoto): AlbumPhoto {
  throw new Error("partagerAlbum n'est pas encore implémenté");
}
