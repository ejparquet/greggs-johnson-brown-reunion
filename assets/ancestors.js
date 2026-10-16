// ============================================================
// FAMILY TREES — edit this file to add or update family members.
//
// Each family line has a list of `people`. Order doesn't matter much —
// the site works out generations, children, grandchildren and siblings
// automatically from the links below.
//
// HOW TO ADD SOMEONE
//   1. Give them a short unique `id` (no spaces), e.g. 'j-mary-1931'.
//      IDs must be unique across ALL three families.
//   2. Born into the family? List their parents' ids:
//          parents: ['j-john', 'j-ruth']      (one parent is fine too)
//   3. Married? Add `spouse` on EITHER person — no need to add it to both.
//          spouse: 'j-ruth'                   (married more than once:
//          spouse: ['j-ruth', 'j-ellen'])
//   4. Someone who married into the family goes in the same list with no
//      parents. A spouse from another family line can be linked by id
//      (e.g. a Johnson who married a Brown: spouse: 'b-second').
//
// PERSON FIELDS
//   id       – required, unique
//   name     – full name (maiden name in parentheses is nice)
//   born     – date or year of birth, e.g. "Mar 4, 1852" or "c. 1850"
//   died     – date or year of death; leave out or '' if living
//   place    – optional: where they lived or were born
//   photo    – optional: image path, e.g. "photos/ancestors/john.jpg"
//   parents  – optional: ids of their parents
//   spouse   – optional: id (or list of ids) of who they married
//   bio      – optional: short biography shown when the card is clicked.
//              Use \n\n between paragraphs.
//
// FAMILY FIELDS
//   generationNames – optional notes shown next to each generation,
//                     oldest first, e.g. ['Earliest known'].
// ============================================================

const PATRIARCH_BIO = 'Write a short biography here — where he was born, the work he did, the family he raised, and the things people still say about him at the table.\n\nAdd a favorite memory or saying of his, and note who passed the story down.';
const MATRIARCH_BIO = 'Write a short biography here — where she was born, how she kept the family together, her church and community, and the recipes or sayings she left behind.\n\nAdd a favorite memory of her, and note who passed the story down.';

window.FAMILY_TREES = {
  greggs: {
    name: 'The Greggs',
    letter: 'G',
    color: '#1F3A2E',
    blurb: 'Add a line about where the Greggs family first put down roots.',
    generationNames: ['Earliest known'],
    people: [
      { id: 'g-patriarch', name: '[Patriarch] Greggs', born: 'c. 18__', died: '18__', place: '[Place]', spouse: 'g-matriarch', bio: PATRIARCH_BIO },
      { id: 'g-matriarch', name: '[Matriarch] Greggs', born: 'c. 18__', died: '19__', place: '[Place]', bio: MATRIARCH_BIO },

      { id: 'g-eldest', name: '[Eldest son] Greggs', born: '18__', died: '19__', parents: ['g-patriarch', 'g-matriarch'], spouse: 'g-eldest-wife' },
      { id: 'g-eldest-wife', name: '[Spouse] Greggs', born: '18__', died: '19__' },
      { id: 'g-daughter', name: '[Daughter] Greggs', born: '18__', died: '19__', parents: ['g-patriarch', 'g-matriarch'], spouse: 'g-daughter-husband' },
      { id: 'g-daughter-husband', name: '[Spouse]', born: '18__', died: '19__' },
      { id: 'g-youngest', name: '[Youngest son] Greggs', born: '18__', died: '19__', parents: ['g-patriarch', 'g-matriarch'] },

      { id: 'g-grandson', name: '[Grandson] Greggs', born: '19__', died: '20__', parents: ['g-eldest', 'g-eldest-wife'], spouse: 'g-grandson-wife' },
      { id: 'g-grandson-wife', name: '[Spouse] Greggs', born: '19__', died: '' },
      { id: 'g-granddaughter', name: '[Granddaughter] Greggs', born: '19__', died: '20__', parents: ['g-eldest', 'g-eldest-wife'], spouse: 'b-grandson' },
      { id: 'g-daughters-child', name: '[Grandchild] [Surname]', born: '19__', died: '', parents: ['g-daughter', 'g-daughter-husband'] },

      { id: 'g-great-1', name: '[Great-grandchild] Greggs', born: '19__', parents: ['g-grandson', 'g-grandson-wife'] },
      { id: 'g-great-2', name: '[Great-grandchild] Greggs', born: '19__', parents: ['g-grandson', 'g-grandson-wife'] },

      { id: 'g-baby', name: '[Newest baby] Greggs', born: '20__', parents: ['g-great-1'] },
    ],
  },

  johnson: {
    name: 'The Johnsons',
    letter: 'J',
    color: '#B5532F',
    blurb: 'Add a line about the land, the work and the faith of the Johnson line.',
    generationNames: ['Earliest known'],
    people: [
      { id: 'j-patriarch', name: '[Patriarch] Johnson', born: 'c. 18__', died: '18__', place: '[Place]', spouse: 'j-matriarch', bio: PATRIARCH_BIO },
      { id: 'j-matriarch', name: '[Matriarch] Johnson', born: 'c. 18__', died: '19__', place: '[Place]', bio: MATRIARCH_BIO },

      // Married twice — children of each marriage are grouped separately.
      { id: 'j-first', name: '[First child] Johnson', born: '18__', died: '19__', parents: ['j-patriarch', 'j-matriarch'], spouse: ['j-first-wife', 'j-second-wife'] },
      { id: 'j-first-wife', name: '[First spouse]', born: '18__', died: '19__' },
      { id: 'j-second-wife', name: '[Second spouse]', born: '18__', died: '19__' },
      // Married into the Brown line.
      { id: 'j-second', name: '[Second child] Johnson', born: '18__', died: '19__', parents: ['j-patriarch', 'j-matriarch'], spouse: 'b-second' },

      { id: 'j-grandchild-1', name: '[Grandchild] Johnson', born: '19__', died: '20__', parents: ['j-first', 'j-first-wife'], spouse: 'j-grandchild-1-spouse' },
      { id: 'j-grandchild-1-spouse', name: '[Spouse] Johnson', born: '19__', died: '' },
      { id: 'j-grandchild-2', name: '[Grandchild] Johnson', born: '19__', died: '20__', parents: ['j-first', 'j-first-wife'] },
      { id: 'j-grandchild-3', name: '[Grandchild] Johnson', born: '19__', died: '', parents: ['j-first', 'j-second-wife'] },
      { id: 'j-grandchild-4', name: '[Grandchild] Johnson', born: '19__', died: '', parents: ['j-second', 'b-second'] },

      { id: 'j-great-1', name: '[Great-grandchild] Johnson', born: '19__', parents: ['j-grandchild-1', 'j-grandchild-1-spouse'] },
      { id: 'j-great-2', name: '[Great-grandchild] Johnson', born: '19__', parents: ['j-grandchild-1', 'j-grandchild-1-spouse'] },
      { id: 'j-great-3', name: '[Great-grandchild] Johnson', born: '20__', parents: ['j-grandchild-4'] },
    ],
  },

  brown: {
    name: 'The Browns',
    letter: 'B',
    color: '#D9A441',
    blurb: 'Add a line about how the Brown family joined the other two names.',
    generationNames: ['Earliest known'],
    people: [
      { id: 'b-patriarch', name: '[Patriarch] Brown', born: 'c. 18__', died: '18__', place: '[Place]', spouse: 'b-matriarch', bio: PATRIARCH_BIO },
      { id: 'b-matriarch', name: '[Matriarch] Brown', born: 'c. 18__', died: '19__', place: '[Place]', bio: MATRIARCH_BIO },

      { id: 'b-first', name: '[First child] Brown', born: '18__', died: '19__', parents: ['b-patriarch', 'b-matriarch'], spouse: 'b-first-spouse' },
      { id: 'b-first-spouse', name: '[Spouse] Brown', born: '18__', died: '19__' },
      { id: 'b-second', name: '[Second child] Brown', born: '18__', died: '19__', parents: ['b-patriarch', 'b-matriarch'] },

      // Married into the Greggs line (spouse is set on the Greggs side).
      { id: 'b-grandson', name: '[Grandson] Brown', born: '19__', died: '20__', parents: ['b-first', 'b-first-spouse'] },
      { id: 'b-granddaughter', name: '[Granddaughter] Brown', born: '19__', died: '', parents: ['b-first', 'b-first-spouse'] },

      { id: 'b-great-1', name: '[Great-grandchild] Brown', born: '19__', parents: ['b-grandson', 'g-granddaughter'] },
      { id: 'b-great-2', name: '[Great-grandchild] Brown', born: '19__', parents: ['b-granddaughter'] },
    ],
  },
};
