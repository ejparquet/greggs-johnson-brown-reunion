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
// ============================================================
window.FAMILY_TREES = {
  greggs: {
    name: 'The Greggs',
    letter: 'G',
    color: '#1F3A2E',
    blurb: 'Add a line about where the Greggs family first put down roots.',
    generations: [
      { label: 'Generation I · Earliest known', units: [
        [{ name: '[Patriarch] Greggs', born: 'c. 18__', died: '18__', place: '[Place]' },
         { name: '[Matriarch] Greggs', born: 'c. 18__', died: '18__', place: '[Place]' }],
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
        [{ name: '[Patriarch] Johnson', born: 'c. 18__', died: '18__', place: '[Place]' },
         { name: '[Matriarch] Johnson', born: 'c. 18__', died: '19__', place: '[Place]' }],
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
        [{ name: '[Patriarch] Brown', born: 'c. 18__', died: '18__', place: '[Place]' },
         { name: '[Matriarch] Brown', born: 'c. 18__', died: '19__', place: '[Place]' }],
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
