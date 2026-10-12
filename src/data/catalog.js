import { sortSeats } from '../lib/format'

function portrait(file) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=480`
}

export const movies = [
  {
    id: 'drishyam-the-conclusion',
    title: 'Drishyam: The Conclusion',
    tagline: 'The night they closed is open again.',
    description:
      'The Salgaonkar family returns for the last chapter of a case the police never really finished. Ajay Devgn, Tabu, Shriya Saran, and Jaideep Ahlawat lead Abhishek Pathak’s thriller, in theatres from 2 October 2026.',
    genres: ['Thriller', 'Drama'],
    language: 'Hindi',
    rating: null,
    votes: null,
    duration: null,
    certificate: 'UA',
    director: 'Abhishek Pathak',
    cast: [
      { name: 'Ajay Devgn', role: 'Vijay Salgaonkar', image: portrait('Ajay_Devgn_at_the_trailer_launch_of_Raid_2.jpg') },
      { name: 'Tabu', image: portrait('Tabu_in_2024.jpg') },
      { name: 'Shriya Saran', image: portrait('Shriya_Saran_graces_the_screening_of_Sonata.jpg') },
      {
        name: 'Jaideep Ahlawat',
        image: portrait('Jaideep_Ahlawat_snapped_at_Pataal_Lok_Season_2_trailer_launch_(cropped).jpg'),
      },
    ],
    release: '2026-10-02',
    featured: true,
    banner: true,
    wash: 'linear-gradient(165deg, #16343a 0%, #101418 58%, #3a2414 100%)',
    image: '/films/drishyam-banner.jpg',
    poster: '/films/drishyam-poster.jpg',
  },
  {
    id: 'prem-keetanu',
    title: 'Prem Keetanu',
    tagline: 'A campus plan that will not sit still.',
    description:
      'Veer Pahariya and Aparshakti Khurana star in Apoorv Singh Karki’s campus film, playing in theatres since 2 October 2026.',
    genres: ['Romance', 'Comedy'],
    language: 'Hindi',
    rating: null,
    votes: null,
    duration: null,
    certificate: 'UA',
    director: 'Apoorv Singh Karki',
    cast: [
      { name: 'Veer Pahariya' },
      { name: 'Aafiya Sayed' },
      { name: 'Aparshakti Khurana', image: portrait('Aparshakti_Khurana_at_Zee_Cine_Awards_2024.jpg') },
      { name: 'Rakesh Bedi', image: portrait('Rakeshbedi.jpg') },
    ],
    release: '2026-10-02',
    featured: true,
    banner: false,
    wash: 'linear-gradient(165deg, #e2b15c 0%, #8a4b16 50%, #1a120c 100%)',
    image: '/films/prem-banner.jpg',
    poster: '/films/prem-poster.jpg',
  },
  {
    id: 'comrade-kalyan',
    title: 'Comrade Kalyan',
    tagline: 'The act was only meant to sell tickets.',
    description:
      'In a 1990s town on the Andhra–Odisha border, a theatre owner’s pretend revolutionary routine stops being pretend. Sree Vishnu leads Janakiram Marella’s Telugu comedy, in theatres from 9 October 2026.',
    genres: ['Comedy', 'Drama'],
    language: 'Telugu',
    rating: null,
    votes: null,
    duration: 165,
    certificate: 'UA',
    director: 'Janakiram Marella',
    cast: [
      { name: 'Sree Vishnu', role: 'Kalyan', image: portrait('Actor_Sree_Vishnu.png') },
      {
        name: 'Mahima Nambiar',
        role: 'Sithara',
        image: portrait('Mahima_Nambiar_at_Chandramukhi_2_press_meet_(1)_(cropped).jpg'),
      },
      { name: 'Shine Tom Chacko', image: portrait('Shine_Tom_Chacko.png') },
    ],
    release: '2026-10-09',
    featured: true,
    banner: true,
    wash: 'linear-gradient(165deg, #8a3a28 0%, #2a140e 55%, #c46a3a 100%)',
    image: '/films/kalyan-banner.jpg',
    poster: '/films/kalyan-poster.jpg',
  },
  {
    id: 'dont-trouble-the-trouble',
    title: "Don't Trouble the Trouble",
    tagline: 'The passenger is not on the manifest.',
    description:
      'Fahadh Faasil plays an ambulance driver whose new passenger does not quite belong to this world. Shashank Yeleti’s Telugu fantasy, presented by S. S. Rajamouli, opened on 2 October 2026.',
    genres: ['Fantasy', 'Drama'],
    language: 'Telugu',
    rating: null,
    votes: null,
    duration: null,
    certificate: 'UA',
    director: 'Shashank Yeleti',
    cast: [
      { name: 'Fahadh Faasil', role: 'Suri', image: portrait('Fahadh_Faasil_2019.jpg') },
      { name: 'Ssara Palekar', role: 'Divya' },
      { name: 'Saurabh Sachdeva', image: portrait('Saurabh_sachdeva.jpg') },
    ],
    release: '2026-10-02',
    featured: true,
    banner: false,
    wash: 'linear-gradient(165deg, #102028 0%, #0c1014 55%, #3a3020 100%)',
    image: '/films/trouble-banner.jpg',
    poster: '/films/trouble-poster.jpg',
  },
  {
    id: 'echoes-of-dawn',
    title: 'Echoes of Dawn',
    tagline: 'The last signal left the sky.',
    description:
      'When a deep-space relay begins repeating a voice from twenty years ago, a radio astronomer has one night to decide whether the message is a warning or a trap. Set between an empty observatory and a city that never quite sleeps, Echoes of Dawn is a quiet spectacle about memory, distance, and the cost of answering back.',
    genres: ['Sci-Fi', 'Drama'],
    language: 'English',
    rating: 8.7,
    votes: '128K',
    duration: 138,
    certificate: 'UA',
    director: 'Mira Calder',
    cast: ['Leah Voss', 'Idris Han', 'Noor El-Sayed'],
    release: '2026-09-18',
    featured: true,
    banner: true,
    wash: 'linear-gradient(165deg, #24345c 0%, #101018 55%, #3c2a16 100%)',
    image:
      'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1800&q=80',
  },
  {
    id: 'the-salt-line',
    title: 'The Salt Line',
    tagline: 'The tide keeps every secret except one.',
    description:
      'Rescue divers pull a locked case from a wreck that should not exist. As the harbormaster’s daughter traces it to her missing brother, the shoreline fills with people who remember a storm that never made the news.',
    genres: ['Thriller', 'Mystery'],
    language: 'English',
    rating: 8.3,
    votes: '86K',
    duration: 124,
    certificate: 'UA',
    director: 'Jonah Peck',
    cast: ['Adele March', 'Chris Iyer', 'June Park'],
    release: '2026-08-07',
    featured: true,
    banner: false,
    wash: 'linear-gradient(165deg, #0e3a45 0%, #101216 60%, #102028 100%)',
    image:
      'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1800&q=80',
  },
  {
    id: 'marigold-hour',
    title: 'Marigold Hour',
    tagline: 'Some evenings refuse to end.',
    description:
      'Two strangers share a late local across Mumbai and agree not to exchange names until sunrise. One wedding, one resignation, and a city of almost-decisions stand between them and morning.',
    genres: ['Romance', 'Drama'],
    language: 'Hindi',
    rating: 7.9,
    votes: '94K',
    duration: 132,
    certificate: 'U',
    director: 'Ananya Seth',
    cast: ['Rhea Kapoor', 'Vihaan Malhotra', 'Sana Qureshi'],
    release: '2026-10-02',
    featured: true,
    banner: true,
    wash: 'linear-gradient(165deg, #8a4b16 0%, #1a120c 60%, #3a2412 100%)',
    image:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=80',
  },
  {
    id: 'night-orchard',
    title: 'Night Orchard',
    tagline: 'Don’t follow the lanterns.',
    description:
      'A botanist inherits a walled orchard that blooms only after midnight. The fruit is perfect. The people who taste it stop answering to their own names.',
    genres: ['Horror'],
    language: 'English',
    rating: 7.5,
    votes: '41K',
    duration: 108,
    certificate: 'A',
    director: 'Ellis Ward',
    cast: ['June Pell', 'Omar Velez', 'Kit Rahman'],
    release: '2026-07-24',
    featured: false,
    banner: false,
    wash: 'linear-gradient(165deg, #1a2e18 0%, #0c0d0c 60%, #241018 100%)',
    image:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=80',
  },
  {
    id: 'paper-kingdoms',
    title: 'Paper Kingdoms',
    tagline: 'Fold the map. Wake the castle.',
    description:
      'A paper conservator slips into the pop-up books she restores and finds a kingdom at war with its own margins. Built from light, card, and courage, Paper Kingdoms is an adventure about repairing the stories we outgrow.',
    genres: ['Animation', 'Family'],
    language: 'English',
    rating: 8.5,
    votes: '156K',
    duration: 102,
    certificate: 'U',
    director: 'Lila Cho',
    cast: ['Amara Cole', 'Ben Ito', 'Priya Nair'],
    release: '2026-09-04',
    featured: true,
    banner: true,
    wash: 'linear-gradient(165deg, #3a2a78 0%, #1a1030 50%, #8a3a48 100%)',
    image:
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1800&q=80',
  },
  {
    id: 'red-platform',
    title: 'Red Platform',
    tagline: 'The train stops for no one.',
    description:
      'A protection officer must move a witness across the country on a single overnight express while every station on the route has already chosen a side. Red Platform runs on momentum, close quarters, and one unbroken promise.',
    genres: ['Action', 'Thriller'],
    language: 'Hindi',
    rating: 8.1,
    votes: '210K',
    duration: 141,
    certificate: 'UA',
    director: 'Kabir Das',
    cast: ['Arjun Mehta', 'Tara Singh', 'Neil D’Souza'],
    release: '2026-08-21',
    featured: true,
    banner: false,
    wash: 'linear-gradient(165deg, #6e1c1c 0%, #140c0c 55%, #2a1a12 100%)',
    image:
      'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1800&q=80',
  },
  {
    id: 'letters-from-june',
    title: 'Letters from June',
    tagline: 'She wrote to the year she missed.',
    description:
      'A retired postmaster begins receiving letters addressed to his late wife, all dated from a June that has not happened yet. What starts as a mystery becomes a gentle reckoning with the life they postponed.',
    genres: ['Drama'],
    language: 'Tamil',
    rating: 8.9,
    votes: '73K',
    duration: 126,
    certificate: 'U',
    director: 'Kavin Raj',
    cast: ['Meera Subramanian', 'Arul Dev', 'Lakshmi Narayan'],
    release: '2026-06-12',
    featured: true,
    banner: false,
    wash: 'linear-gradient(165deg, #4a3a28 0%, #141210 60%, #2a2418 100%)',
    image:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1800&q=80',
  },
  {
    id: 'velvet-circuit',
    title: 'Velvet Circuit',
    tagline: 'Race the blackout.',
    description:
      'In a city powered by borrowed memories, an underground courier carries contraband dreams between districts before the nightly blackout wipes the grid. One package is addressed to her future self.',
    genres: ['Sci-Fi', 'Action'],
    language: 'English',
    rating: 7.7,
    votes: '64K',
    duration: 119,
    certificate: 'UA',
    director: 'S. Okonkwo',
    cast: ['Nia Brooks', 'Mateo Ruiz', 'Hana Ito'],
    release: '2026-05-29',
    featured: false,
    banner: false,
    wash: 'linear-gradient(165deg, #3a1848 0%, #120814 55%, #1a2848 100%)',
    image:
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1800&q=80',
  },
  {
    id: 'monsoon-archive',
    title: 'Monsoon Archive',
    tagline: 'The rain kept the footage.',
    description:
      'A film restorer returns to Kochi to salvage reels shot by her estranged father during a monsoon that drowned a neighborhood. Frame by frame, the archive shows a street that official records insist was never built.',
    genres: ['Drama', 'Mystery'],
    language: 'Malayalam',
    rating: 8.4,
    votes: '58K',
    duration: 134,
    certificate: 'UA',
    director: 'Devika Menon',
    cast: ['Anand Varma', 'Sara Joseph', 'Faisal Rahman'],
    release: '2026-07-03',
    featured: false,
    banner: false,
    wash: 'linear-gradient(165deg, #1a3040 0%, #101418 60%, #203028 100%)',
    image:
      'https://images.unsplash.com/photo-1501691223387-dd0500403074?auto=format&fit=crop&w=1800&q=80',
  },
  {
    id: 'glass-harbor',
    title: 'Glass Harbor',
    tagline: 'Every window faces the water.',
    description:
      'An architect is hired to finish a glass house on a private island, then discovers the previous designer vanished between two identical floor plans. The harbor reflects a building that is one room larger at night.',
    genres: ['Mystery', 'Drama'],
    language: 'English',
    rating: 8.0,
    votes: '49K',
    duration: 117,
    certificate: 'UA',
    director: 'Helen Cho',
    cast: ['Marc Ellison', 'Freya Lang', 'Yusuf Ahmed'],
    release: '2026-04-16',
    featured: false,
    banner: false,
    wash: 'linear-gradient(165deg, #2a3a48 0%, #101418 55%, #3a3428 100%)',
    image:
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1800&q=80',
  },
]

export const theatres = [
  {
    id: 'grand',
    name: 'MOVIQ Grand',
    area: 'Bandra West',
    city: 'Mumbai',
    formats: ['IMAX', 'Dolby Atmos', '2D'],
  },
  {
    id: 'pavilion',
    name: 'MOVIQ Pavilion',
    area: 'Connaught Place',
    city: 'Delhi',
    formats: ['Dolby Atmos', '2D'],
  },
  {
    id: 'arcade',
    name: 'MOVIQ Arcade',
    area: 'Indiranagar',
    city: 'Bengaluru',
    formats: ['IMAX', '2D'],
  },
  {
    id: 'riverside',
    name: 'MOVIQ Riverside',
    area: 'Alwarpet',
    city: 'Chennai',
    formats: ['Dolby Atmos', '2D'],
  },
]

export const genres = [
  'Action',
  'Drama',
  'Sci-Fi',
  'Thriller',
  'Mystery',
  'Romance',
  'Comedy',
  'Horror',
  'Fantasy',
  'Animation',
  'Family',
]

export const languages = ['English', 'Hindi', 'Telugu', 'Tamil', 'Malayalam']

export const cities = [...new Set(theatres.map((theatre) => theatre.city))]

const SLOTS = {
  '2D': ['10:15 AM', '01:05 PM', '04:20 PM', '07:30 PM', '10:40 PM'],
  IMAX: ['11:10 AM', '02:45 PM', '06:30 PM', '09:50 PM'],
  'Dolby Atmos': ['12:20 PM', '03:40 PM', '07:05 PM', '10:20 PM'],
}

const BASE = {
  '2D': 180,
  'Dolby Atmos': 280,
  IMAX: 360,
}

const MULTIPLIER = {
  Recliner: 1.8,
  Prime: 1.35,
  Classic: 1,
}

export const CONVENIENCE_FEE = 30
export const MAX_SEATS = 8

export const SEAT_ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

export const SEAT_GROUPS = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
]

export const TIER_BANDS = [
  { name: 'Recliner', rows: ['A', 'B'], sample: 'A1' },
  { name: 'Prime', rows: ['C', 'D', 'E'], sample: 'C1' },
  { name: 'Classic', rows: ['F', 'G', 'H', 'I', 'J'], sample: 'F1' },
]

function hash(value) {
  let h = 2166136261
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function minutes(label) {
  const [time, meridiem] = label.split(' ')
  const [hour, minute] = time.split(':').map(Number)
  const normalized = (hour % 12) + (meridiem === 'PM' ? 12 : 0)
  return normalized * 60 + minute
}

export function getMovie(id) {
  return movies.find((movie) => movie.id === id)
}

export function getTheatre(id) {
  return theatres.find((theatre) => theatre.id === id)
}

export function slotsFor(movieId, theatreId, format) {
  const list = SLOTS[format] || SLOTS['2D']
  const start = hash(`${movieId}|${theatreId}|${format}`) % list.length
  return Array.from({ length: 3 }, (_, index) => list[(start + index) % list.length]).sort(
    (a, b) => minutes(a) - minutes(b),
  )
}

export function tierOf(seatId) {
  const row = seatId[0]
  if (row === 'A' || row === 'B') return 'Recliner'
  if (row === 'C' || row === 'D' || row === 'E') return 'Prime'
  return 'Classic'
}

export function seatPrice(format, seatId) {
  const base = BASE[format] || BASE['2D']
  return Math.round((base * MULTIPLIER[tierOf(seatId)]) / 10) * 10
}

export function quote(format, seats) {
  const lines = sortSeats(seats).map((id) => ({
    id,
    tier: tierOf(id),
    price: seatPrice(format, id),
  }))
  const subtotal = lines.reduce((sum, line) => sum + line.price, 0)
  const fee = lines.length * CONVENIENCE_FEE
  return { lines, subtotal, fee, total: subtotal + fee }
}

export function showKey(show) {
  return [show.movieId, show.theatreId, show.date, show.format, show.time].join('|')
}

export function generatedBooked(key) {
  const taken = []
  for (const row of SEAT_ROWS) {
    for (let number = 1; number <= 12; number += 1) {
      const id = `${row}${number}`
      if (hash(`${key}:${id}`) % 8 === 0) taken.push(id)
    }
  }
  return taken
}

export function bookedSeatIds(show, bookings) {
  const key = showKey(show)
  const fromBookings = bookings
    .filter((booking) => showKey(booking) === key)
    .flatMap((booking) => booking.seats)
  return new Set([...generatedBooked(key), ...fromBookings])
}
