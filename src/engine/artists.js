/**
 * Artist Style Profiles
 * Each profile captures the characteristic pattern vocabulary of a master mbira player.
 * Used to bias note/variation choices toward a specific artist's style.
 */

export const ARTIST_PROFILES = {
  forward_kwenda: {
    id: 'forward_kwenda',
    displayName: 'Forward Kwenda',
    styleTraits: {
      tempo: 'meditative',       // slow, deliberate
      noteEmphasis: 'roots_fifths', // strong preference for chord roots and fifths
      highlineFrequency: 'low',  // minimal highlines, focus on base pattern
      ornamentDensity: 'low',    // clean, sparse
      rhythmicFeel: 'deep',      // sits deep in the pocket
      variationApproach: 'theoretical', // variations follow theory explicitly
    },
    signaturePieces: ['Tadzungaira', 'Nhemamusasa Yepasi'],
    tuningsDocumented: ['nyamaropa', 'nemakonde'],
    progressionsDocumented: [4, 6],
  },
  musekiwa_chingodza: {
    id: 'musekiwa_chingodza',
    displayName: 'Musekiwa Chingodza',
    styleTraits: {
      tempo: 'fluid',
      noteEmphasis: 'melodic',   // more melodic, influenced by marimba
      highlineFrequency: 'medium',
      ornamentDensity: 'medium',
      rhythmicFeel: 'lyrical',
      variationApproach: 'melodic',
    },
    signaturePieces: ['Karigamombe', 'Dande'],
    tuningsDocumented: ['nyamaropa'],
    collaborations: ['Third Coast Percussion'],
  },
  garikayi_tirikoti: {
    id: 'garikayi_tirikoti',
    displayName: 'Garikayi Tirikoti',
    styleTraits: {
      tempo: 'rhythmic',
      noteEmphasis: 'full_chord', // uses full chord tones more freely
      highlineFrequency: 'high',
      ornamentDensity: 'high',
      rhythmicFeel: 'dense',
      variationApproach: 'orchestral', // thinks in layers/stacks
    },
    signaturePieces: ['Bukatiende', 'Masango Anoera'],
    tuningsDocumented: ['nyamaropa', 'gandanga', 'mavembe'],
    orchestraMode: true,        // invented the mbira orchestra concept
  },
  nyamasvisva: {
    id: 'nyamasvisva',
    displayName: 'Nyamasvisva (Mawungira eNharira)',
    styleTraits: {
      tempo: 'ceremonial',
      noteEmphasis: 'traditional',
      highlineFrequency: 'medium',
      ornamentDensity: 'medium',
      rhythmicFeel: 'ceremonial',
      variationApproach: 'multi_progression', // plays same song in many progressions
    },
    signaturePieces: ['Tadzungaira (multiple progressions)', 'Bunza Mutupo'],
    ensembleMode: true,
  },
  chris_berry: {
    id: 'chris_berry',
    displayName: 'Chris Berry',
    styleTraits: {
      tempo: 'groove',
      noteEmphasis: 'fusion',    // blends traditional with Western harmony
      highlineFrequency: 'high',
      ornamentDensity: 'high',
      rhythmicFeel: 'groove_forward',
      variationApproach: 'fusion',
    },
    signaturePieces: ['Music On The Wind', 'Waterdrum'],
    youtubeVideos: 173,
    crossCultural: true,
  },
};

/**
 * Get note preference weighting for an artist at a given variation density.
 * Returns weights for: roots, fifths, thirds, passing_notes
 */
export function getArtistNoteWeights(artistId, variationDensity) {
  const profile = ARTIST_PROFILES[artistId];
  if (!profile) return { roots: 0.4, fifths: 0.4, thirds: 0.15, passing: 0.05 };
  
  const emphasis = profile.styleTraits.noteEmphasis;
  
  if (emphasis === 'roots_fifths') {
    return { roots: 0.45, fifths: 0.45, thirds: 0.08, passing: 0.02 };
  } else if (emphasis === 'melodic') {
    return { roots: 0.3, fifths: 0.3, thirds: 0.3, passing: 0.1 };
  } else if (emphasis === 'full_chord') {
    return { roots: 0.33, fifths: 0.33, thirds: 0.27, passing: 0.07 };
  } else if (emphasis === 'fusion') {
    return { roots: 0.25, fifths: 0.25, thirds: 0.25, passing: 0.25 };
  }
  
  return { roots: 0.4, fifths: 0.4, thirds: 0.15, passing: 0.05 };
}
