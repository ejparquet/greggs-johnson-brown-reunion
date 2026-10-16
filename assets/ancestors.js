// ============================================================
// FAMILY TREES — edit this file to add or update ancestors.
//
// Each family has a list of generations (oldest first).
// Each generation has a label and a list of "units".
// A unit is one person, or a couple (two people) shown side by side.
//
// Person fields:
//   name   – full name (maiden name in parentheses is nice)
//   born   – date or year of birth, e.g. "Mar 4, 1852" or "c. 1850"
//   died   – date or year of death; leave "" if living
//   place  – optional: where they lived or were born
//   photo  – optional: image path, e.g. "photos/ancestors/john.jpg"
//   bio    – optional: a short biography shown when the card is clicked.
//            Use \n\n between paragraphs. Leave it out and the card
//            invites relatives to share that person's story instead.
// ============================================================
window.FAMILY_TREES = {
  greggs: {
    name: 'The Greggs',
    letter: 'G',
    color: '#1F3A2E',
    blurb: 'Add a line about where the Greggs family first put down roots.',
    generations: [
      { label: 'Generation I · Earliest known', units: [
        [{ name: '[Patriarch] Greggs', born: 'c. 18__', died: '18__', place: '[Place]',
          bio: 'Write a short biography here — where he was born, the work he did, the family he raised, and the things people still say about him at the table.\n\nAdd a favorite memory or saying of his, and note who passed the story down.' },
         { name: '[Matriarch] Greggs', born: 'c. 18__', died: '18__', place: '[Place]',
          bio: 'Write a short biography here — where she was born, how she kept the family together, her church and community, and the recipes or sayings she left behind.\n\nAdd a favorite memory of her, and note who passed the story down.' }],
      ]},
      { label: 'Generation II', units: [
        [{ name: '[Name] Greggs', born: '18__', died: '19__' },
         { name: '[Spouse]', born: '18__', died: '19__' }],
        [{ name: '[Name] Greggs', born: '18__', died: '19__' }],
      ]},
      { label: 'Generation III', units: [
        [{ name: '[Name] Greggs', born: '19__', died: '19__' },
         { name: '[Spouse]', born: '19__', died: '20__' }],
        [{ name: '[Name] Greggs', born: '19__', died: '20__' },
         { name: '[Spouse]', born: '19__', died: '' }],
      ]},
      { label: 'Generation IV · Our elders today', units: [
        [{ name: '[Name] Greggs', born: '19__', died: '' }],
        [{ name: '[Name] Greggs', born: '19__', died: '' }],
        [{ name: '[Name] Greggs', born: '19__', died: '' }],
      ]},
    ],
  },

  johnson: {
    name: 'The Johnsons',
    letter: 'J',
    color: '#B5532F',
    blurb: 'Add a line about the land, the work and the faith of the Johnson line.',
    generations: [
      { label: 'Generation I · Earliest known', units: [
        [{ name: '[Patriarch] Johnson', born: 'c. 18__', died: '18__', place: '[Place]',
          bio: 'Write a short biography here — where he was born, the work he did, the family he raised, and the things people still say about him at the table.\n\nAdd a favorite memory or saying of his, and note who passed the story down.' },
         { name: '[Matriarch] Johnson', born: 'c. 18__', died: '19__', place: '[Place]',
          bio: 'Write a short biography here — where she was born, how she kept the family together, her church and community, and the recipes or sayings she left behind.\n\nAdd a favorite memory of her, and note who passed the story down.' }],
      ]},
      { label: 'Generation II', units: [
        [{ name: '[Name] Johnson', born: '18__', died: '19__' },
         { name: '[Spouse]', born: '18__', died: '19__' }],
      ]},
      { label: 'Generation III', units: [
        [{ name: '[Name] Johnson', born: '19__', died: '19__' },
         { name: '[Spouse]', born: '19__', died: '20__' }],
        [{ name: '[Name] Johnson', born: '19__', died: '20__' }],
      ]},
      { label: 'Generation IV · Our elders today', units: [
        [{ name: '[Name] Johnson', born: '19__', died: '' },
         { name: '[Spouse]', born: '19__', died: '' }],
        [{ name: '[Name] Johnson', born: '19__', died: '' }],
      ]},
    ],
  },

  brown: {
    name: 'The Browns',
    letter: 'B',
    color: '#D9A441',
    blurb: 'Add a line about how the Brown family joined the other two names.',
    generations: [
      { label: 'Generation I · Earliest known', units: [
        [{ name: '[Patriarch] Brown', born: 'c. 18__', died: '18__', place: '[Place]',
          bio: 'Write a short biography here — where he was born, the work he did, the family he raised, and the things people still say about him at the table.\n\nAdd a favorite memory or saying of his, and note who passed the story down.' },
         { name: '[Matriarch] Brown', born: 'c. 18__', died: '19__', place: '[Place]',
          bio: 'Write a short biography here — where she was born, how she kept the family together, her church and community, and the recipes or sayings she left behind.\n\nAdd a favorite memory of her, and note who passed the story down.' }],
      ]},
      { label: 'Generation II', units: [
        [{ name: '[Name] Brown', born: '18__', died: '19__' },
         { name: '[Spouse]', born: '18__', died: '19__' }],
        [{ name: '[Name] Brown', born: '18__', died: '19__' }],
      ]},
      { label: 'Generation III', units: [
        [{ name: '[Name] Brown', born: '19__', died: '20__' },
         { name: '[Spouse]', born: '19__', died: '20__' }],
      ]},
      { label: 'Generation IV · Our elders today', units: [
        [{ name: '[Name] Brown', born: '19__', died: '' }],
        [{ name: '[Name] Brown', born: '19__', died: '' },
         { name: '[Spouse]', born: '19__', died: '' }],
      ]},
    ],
  },
};
