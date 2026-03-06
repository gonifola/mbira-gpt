/**
 * Mbira Tuning Systems
 * Maps tuning names to their properties and relationships.
 */

export const TUNING_SYSTEMS = {
  gandanga: {
    id: 'gandanga',
    displayName: 'Gandanga',
    aliases: ['Mavembe'],
    register: 'low',
    character: 'Lowest, darkest register',
    rootFamily: 'gandanga',
    referenceArtist: 'Garikayi Tirikoti',
    dialPosition: 0, // 0 = leftmost
  },
  nemakonde: {
    id: 'nemakonde',
    displayName: 'Nemakonde',
    aliases: [],
    register: 'low-mid',
    character: 'Low, F phrygian closest to Western scale',
    rootFamily: 'gandanga', // belongs to Gandanga/Mavembe family
    referenceArtist: 'Forward Kwenda, Tute Chigamba',
    dialPosition: 1,
  },
  nyamaropa: {
    id: 'nyamaropa',
    displayName: 'Nyamaropa (D)',
    aliases: ['Standard', 'Bb Cosmas', 'D Standard'],
    register: 'mid',
    character: 'Most common. The standard tuning.',
    rootFamily: 'nyamaropa',
    referenceArtist: 'Muda Magaya, most mbira players',
    dialPosition: 2,
  },
  nyamaropa_high: {
    id: 'nyamaropa_high',
    displayName: 'Nyamaropa (F#)',
    aliases: ['High Nyamaropa'],
    register: 'mid-high',
    character: 'Brighter standard variant',
    rootFamily: 'nyamaropa',
    referenceArtist: 'Common in Zimbabwe',
    dialPosition: 3,
  },
  samaita: {
    id: 'samaita',
    displayName: 'Samaita',
    aliases: [],
    register: 'high',
    character: 'Mid-high variant',
    rootFamily: 'nyamaropa', // TBD - verify
    referenceArtist: 'Mbira DzeNharira',
    dialPosition: 4,
  },
};

/**
 * Orchestra mode: stack multiple tunings simultaneously.
 * Based on Garikayi Tirikoti's mbira orchestra concept.
 */
export const ORCHESTRA_PRESETS = {
  garikayi_full: {
    name: 'Garikayi Full Orchestra',
    tunings: ['gandanga', 'nyamaropa', 'samaita'],
    description: 'Full register spread - low, mid, high',
  },
  traditional_pair: {
    name: 'Traditional Pair',
    tunings: ['nyamaropa', 'nyamaropa'],
    description: 'Two nyamaropa instruments - standard ceremony setup',
  },
};

export function getTuningByDialPosition(position) {
  return Object.values(TUNING_SYSTEMS).find(t => t.dialPosition === position);
}
