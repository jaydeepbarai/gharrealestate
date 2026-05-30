/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project } from '../types';

// Structured list of Unsplash URLs that are high-quality, lightweight, and classy for Dubai/Abu Dhabi luxury real estate
const LUXURY_IMAGES = [
  'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80', // Skyscraper view
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80', // Sleek Tower
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80', // Luxury Villa
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', // Modern Villa Glass
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80', // Luxe Mansion Night
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', // Modern Pool Terrace
  'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80', // High-end Interior Penthouse
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80', // Cozy minimalist room
  'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80', // Sleek advisory lounge
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80', // Estate Entrance
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80', // Steel and Glass skyscraper
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', // Modern living space
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80', // Incredible Luxury Villa Infinity Pool
  'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1200&q=80', // Blue sky modern building
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80', // Elegant studio apartment
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80', // Ultra-mod lobby
];

// Hand-crafted seed projects (12 Dubai, 8 Abu Dhabi) representing real 2026/2027 launches
const anchorProjects: Project[] = [
  // DUBAI PROJECTS
  {
    id: 'db-1',
    slug: 'the-oasis-emaar',
    name: 'The Oasis',
    developer: 'Emaar',
    city: 'Dubai',
    community: 'The Oasis by Emaar',
    location: 'Yalayis Street / Jebel Ali Lane, Dubai',
    startingPrice: 8500000,
    currency: 'AED',
    paymentPlan: '90/10',
    handover: 'Q4 2027',
    propertyTypes: ['Villa', 'Mansion'],
    bedrooms: ['4', '5', '6'],
    status: 'Selling',
    description: 'A masterly designed luxury sanctuary, Emaar Oasis sets a new standard for waterside villa leaving in Dubai. Anchored by a stunning swimmable crystal lagoon, pristine landscapes, and expansive mansions crafted by world-class architects.',
    highlights: [
      'Over 100 million sq. ft. of exclusive luxury master development',
      'Designed around private crystal lagoons and lush wellness parks',
      'Villas feature expansive floor-to-ceiling windows and double-height entries',
      'Convenient transit limits to Downtown Dubai and Al Maktoum Airport'
    ],
    amenities: ['Swimmable Lagoon', 'Private Beach Access', 'State-of-the-art Gym', 'Wellness Centre', '24/7 Gated Security', 'Luxury Retail Boardwalk'],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    brochureUrl: '#',
    latitude: 25.0112,
    longitude: 55.2341,
    expectedROI: '8.2%',
    sqftRange: '5,100 - 10,800 sq.ft.'
  },
  {
    id: 'db-2',
    slug: 'armani-prive-residences-emaar',
    name: 'Armani Privé Residences',
    developer: 'Emaar',
    city: 'Dubai',
    community: 'Downtown Dubai',
    location: 'Burj Khalifa Boulevard, Downtown Dubai',
    startingPrice: 22000000,
    currency: 'AED',
    paymentPlan: '80/20',
    handover: 'Q2 2028',
    propertyTypes: ['Apartment', 'Penthouse'],
    bedrooms: ['2', '3', '4'],
    status: 'Launched',
    description: 'Exquisite Armani Privé Residences offers a timeless lifestyle curated personal by Giorgio Armani. Located adjacent to the majestic Burj Khalifa, these homes are optimized for elite investors who appreciate understated sophistication and ultimate status.',
    highlights: [
      'Unobstructed premium views of the Burj Khalifa and Dubai Fountain',
      'Bespoke interiors furnished and designed directly by Armani Casa',
      'Direct private lobby connection to Burj Khalifa and Dubai Mall',
      'Elite concierge services, private dining, and members club access'
    ],
    amenities: ['Private Spa', 'Valet Parking', 'Burj-View Infinity Pool', 'Residents Lounge', 'Fine Dining Restaurants', 'Private Screening Room'],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80'
    ],
    brochureUrl: '#',
    latitude: 25.1972,
    longitude: 55.2744,
    expectedROI: '7.8%',
    sqftRange: '1,800 - 4,500 sq.ft.'
  },
  {
    id: 'db-3',
    slug: 'sobha-one-sobha',
    name: 'Sobha One',
    developer: 'Sobha',
    city: 'Dubai',
    community: 'Sobha Hartland',
    location: 'Ras Al Khor Road, Sobha Hartland, Dubai',
    startingPrice: 1600000,
    currency: 'AED',
    paymentPlan: '60/40',
    handover: 'Q4 2026',
    propertyTypes: ['Apartment', 'Penthouse'],
    bedrooms: ['1', '2', '3', '4'],
    status: 'Selling',
    description: 'A colossal interconnected masterwork, Sobha One features five interconnected visual towers offering unparalleled vistas of the Dubai Creek, Ras Al Khor Wildlife Sanctuary, and Downtown Dubai skyline. Perfect mix of organic nature and urban core.',
    highlights: [
      'Features a signature 18-hole pitch and putt golf course designed by Gary Player',
      'Interconnected wellness sky gardens and walking platforms on level 28',
      'Sobha signature high-end material quality with double glazing',
      'Minutes form Business Bay and major educational institutions'
    ],
    amenities: ['18-hole Golf Course', 'Sky Terrace Gardens', 'Yoga Deck', 'Infinity Swimming Pool', 'Gymnasium', 'Marina Walkways'],
    images: [
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    brochureUrl: '#',
    latitude: 25.1843,
    longitude: 55.3421,
    expectedROI: '8.5%',
    sqftRange: '750 - 2,800 sq.ft.'
  },
  {
    id: 'db-4',
    slug: 'como-residences-nakheel',
    name: 'Como Residences',
    developer: 'Nakheel',
    city: 'Dubai',
    community: 'Palm Jumeirah',
    location: 'The Trunk, Palm Jumeirah, Dubai',
    startingPrice: 21000000,
    currency: 'AED',
    paymentPlan: '80/20',
    handover: 'Q3 2027',
    propertyTypes: ['Penthouse', 'Apartment'],
    bedrooms: ['3', '4', '5'],
    status: 'Selling',
    description: 'Como Residences by Nakheel is an architectural symbol crafted with organic curves mimics water ripples. Rising over 71 storeys, this ultra-exclusive skyscraper caters only to HNIs, offering individual-floor penthouse mansions with private dynamic pool systems.',
    highlights: [
      'Only 76 ultra-exclusive luxury residences on Palm Jumeirah trunk',
      'Panoramic 360-degree views of Burj Al Arab, Palm, and Arabian Gulf',
      'Private elevators and swimming pools for primary residential units',
      'A true landmark development with curated custom finishes'
    ],
    amenities: ['Private Elevator', '360° Viewing Deck', 'Infinity Pool', 'Private Private Beach Club', 'Elite Gym & Spa', 'Concierge Desk'],
    images: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    brochureUrl: '#',
    latitude: 25.1098,
    longitude: 55.1321,
    expectedROI: '7.2%',
    sqftRange: '4,400 - 11,500 sq.ft.'
  },
  {
    id: 'db-5',
    slug: 'safqa-residences-ellington',
    name: 'Safqa Residences',
    developer: 'Ellington',
    city: 'Dubai',
    community: 'Jumeirah Village Circle (JVC)',
    location: 'District 14, Jumeirah Village Circle, Dubai',
    startingPrice: 1200000,
    currency: 'AED',
    paymentPlan: '70/30',
    handover: 'Q4 2026',
    propertyTypes: ['Apartment'],
    bedrooms: ['Studio', '1', '2', '3'],
    status: 'Selling',
    description: 'Ellington Safqa brings a boutique, minimalist Scandinavian design aesthetic to Dubai. Designed specifically for young professionals and elite investors seeking high rental yields, Safqa pairs artisan fittings with modern energy efficiency.',
    highlights: [
      'Award-winning interior architecture focused on pure organic materials',
      'Highly competitive price point with solid 9%+ net yield forecasts',
      'Located near Al Khail Road with exceptional fast community access',
      'Eco-responsible design with double insulated walls and smart automation'
    ],
    amenities: ['Boutique Lobby Library', 'Leisure Swimming Pool', 'Shaded Kids Play Area', 'Eco-Gymnasium', 'Outdoor Barbecue Area', 'EV Charging Spot'],
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
    ],
    brochureUrl: '#',
    latitude: 25.0682,
    longitude: 55.2014,
    expectedROI: '9.1%',
    sqftRange: '480 - 1,600 sq.ft.'
  },
  {
    id: 'db-6',
    slug: 'bayview-by-address-emaar',
    name: 'Bayview by Address',
    developer: 'Emaar',
    city: 'Dubai',
    community: 'Emaar Beachfront',
    location: 'Dubai Harbour Marina, Emaar Beachfront, Dubai',
    startingPrice: 3300000,
    currency: 'AED',
    paymentPlan: '90/10',
    handover: 'Q3 2027',
    propertyTypes: ['Apartment', 'Penthouse'],
    bedrooms: ['1', '2', '3', '4'],
    status: 'Selling',
    description: 'Bayview Residences carrying the exceptional branding of "Address Hotels + Resorts" offers true beachfront glamour in Emaar Beachfront. Step out directly onto pristine sandy beaches while overlooking luxury yachts cruising Dubai Marina.',
    highlights: [
      'Fully furnished branded residences managed directly by Address Hotels',
      'Exclusive private residents-only access to 1.5 km of pristine beach',
      'Breathtaking direct views of Palm Jumeirah and the Arabian Gulf',
      'Highly liquid asset with strong potential for premium holiday-home rental'
    ],
    amenities: ['Private Beach Access', 'Address Branded Gym & Spa', 'Infinity Edge Pool', 'Fine Restaurants nearby', 'Children Splash Pad', 'Private Concierge'],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    brochureUrl: '#',
    latitude: 25.0945,
    longitude: 55.1412,
    expectedROI: '8.4%',
    sqftRange: '800 - 3,400 sq.ft.'
  },
  {
    id: 'db-7',
    slug: 'damac-lagoons-damac',
    name: 'Damac Lagoons-Mykonos',
    developer: 'DAMAC',
    city: 'Dubai',
    community: 'Damac Lagoons',
    location: 'Hessa Street, Damac Lagoons, Dubai',
    startingPrice: 2800000,
    currency: 'AED',
    paymentPlan: '80/20',
    handover: 'Q2 2027',
    propertyTypes: ['Villa', 'Townhouse'],
    bedrooms: ['4', '5'],
    status: 'Selling',
    description: 'Mykonos at Damac Lagoons is a stellar Mediterranean-inspired offplan community. Pristine white beaches, blue lagoons, and charming cobblestone alleys bring the serene lifestyle of the Greek island straight to the heart of residential Dubai.',
    highlights: [
      'Vibrant crystal water lagoons with lazy rivers and wave generators',
      'Elegant, light-flooded townhouses with private roof terrace access',
      'Surrounded by world-class golf networks and horse riding academies',
      'Highly requested family community with fast highway linkages'
    ],
    amenities: ['Wave Pool', 'Floating Cinema', 'Water Parks', 'Outdoor Yoga Studios', 'Gourmet Cafes', 'Crystal Lagoon Beaches'],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80'
    ],
    brochureUrl: '#',
    latitude: 25.0212,
    longitude: 55.2415,
    expectedROI: '7.9%',
    sqftRange: '2,200 - 3,800 sq.ft.'
  },
  {
    id: 'db-8',
    slug: 'bugatti-residences-binghatti',
    name: 'Bugatti Residences',
    developer: 'Binghatti',
    city: 'Dubai',
    community: 'Business Bay',
    location: 'Marasi Drive, Business Bay, Dubai',
    startingPrice: 19000000,
    currency: 'AED',
    paymentPlan: '65/35',
    handover: 'Q4 2027',
    propertyTypes: ['Penthouse', 'Mansion'],
    bedrooms: ['2', '3', '4', '5'],
    status: 'Launched',
    description: 'The world’s first Bugatti branded residences, designed to emulate the flow of structural aerodynamics. Situated at Business Bay waterfront, it features a bespoke private vehicle elevator that ascends to take your supercar directly to your sky penthouse.',
    highlights: [
      'Signature luxury collaboration with Bugatti, featuring custom French design',
      'Private in-apartment vehicle showcase spaces for exotic collection',
      'Indoor-outdoor high luxury pool structures overlooking Downtown skyline',
      'Premium lifestyle with highly elite security, chefs, and travel curation'
    ],
    amenities: ['Private Pool', 'VIP Car Elevator', 'Downtown View Deck', 'Bespoke Spa Suite', 'Chauffeur Curation', 'Champagne Lounge'],
    images: [
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80'
    ],
    brochureUrl: '#',
    latitude: 25.1852,
    longitude: 55.2711,
    expectedROI: '6.8%',
    sqftRange: '3,200 - 8,900 sq.ft.'
  },
  {
    id: 'db-9',
    slug: 'elitz-3-danube',
    name: 'Elitz 3 Residences',
    developer: 'Danube',
    city: 'Dubai',
    community: 'Jumeirah Village Circle (JVC)',
    location: 'Boulevard Road, District 11, JVC, Dubai',
    startingPrice: 950000,
    currency: 'AED',
    paymentPlan: '65/35', // Famous Danube 1% per month plan
    handover: 'Q4 2026',
    propertyTypes: ['Apartment'],
    bedrooms: ['Studio', '1', '2', '3'],
    status: 'Selling',
    description: 'Danube Elitz 3 builds on the incredible success of previous launches, offering high-class modular residences with over 40 lifestyle amenities. Features convertible furniture, offering maximum spatial utilization and superb ROI for landlords.',
    highlights: [
      'Unique developer-offered 1% monthly easy post-handover payment pathway',
      'Fully equipped apartments with premium European laundry and kitchen appliances',
      'Smart home automated door cards, lighting controllers, and cameras',
      'Prime location in hot spots of Jumeirah Village Circle'
    ],
    amenities: ['Tennis Courts', 'Badminton Area', 'Dynamic Splash Pool', 'Shaded Gazebo', 'Doctor on Call Room', 'Mini Amphitheatre'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    brochureUrl: '#',
    latitude: 25.0611,
    longitude: 55.2019,
    expectedROI: '9.3%',
    sqftRange: '420 - 1,510 sq.ft.'
  },
  {
    id: 'db-10',
    slug: 'keturah-reserve-mag',
    name: 'Keturah Reserve Townhouses',
    developer: 'Reportage', // Mapping to user developers choice
    city: 'Dubai',
    community: 'Meydan',
    location: 'District 7, Meydan, Dubai',
    startingPrice: 11900000,
    currency: 'AED',
    paymentPlan: '60/40',
    handover: 'Q2 2027',
    propertyTypes: ['Townhouse', 'Villa'],
    bedrooms: ['4', '5'],
    status: 'Selling',
    description: 'A transformative biosphere experience, Keturah Reserve is Dubai’s vanguard wellness residential development. Incorporating pristine natural cross-ventilations, biophilic shadows, the architectural selection evokes emotional peace.',
    highlights: [
      'First development in Middle East featuring Bio-Living conceptual walls',
      'Meticulously crafted with premium solid stone, brass, and Italian travertines',
      'High density air purification filtration and custom water softeners',
      'Highly private design located closely to Meydan racecourse and parklands'
    ],
    amenities: ['Wellness Spa', 'Biophilic Shading Walks', 'Cryo Chamber Lounge', 'Zen Yoga Hall', 'Pure Bio Cafes', 'Gated Security'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ],
    brochureUrl: '#',
    latitude: 25.1481,
    longitude: 55.3045,
    expectedROI: '7.5%',
    sqftRange: '4,900 - 8,400 sq.ft.'
  },
  {
    id: 'db-11',
    slug: 'ellie-saab-residences-arabian-ranches',
    name: 'Ellie Saab Residences',
    developer: 'Emaar',
    city: 'Dubai',
    community: 'Arabian Ranches III',
    location: 'Sheikh Zayed Bin Hamdan Road, Dubai',
    startingPrice: 4800000,
    currency: 'AED',
    paymentPlan: '80/20',
    handover: 'Q1 2027',
    propertyTypes: ['Villa', 'Townhouse'],
    bedrooms: ['4', '5'],
    status: 'Selling',
    description: 'Emaar Elie Saab Residences features luxury couture design within the highly requested family enclave of Arabian Ranches III. Characterized by spacious garden layouts, stunning rooftop multi-decks, and interior layouts curated by Ellie Saab.',
    highlights: [
      'Exquisite luxury collaboration with haute couture legend Elie Saab',
      'Spacious double-height living areas with massive backyard options',
      'Situated within fully established, premium botanical family masterplan',
      'Ideal real estate choice with high appreciation rates for long term'
    ],
    amenities: ['Elite clubhouse', 'Rooftop Lounge Deck', 'Parks & Playgrounds', 'Swimming Pools', 'Jogging Pathways', 'Signature Retail Outlet'],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80'
    ],
    brochureUrl: '#',
    latitude: 25.0742,
    longitude: 55.2912,
    expectedROI: '7.6%',
    sqftRange: '3,100 - 4,800 sq.ft.'
  },
  {
    id: 'db-12',
    slug: 'saria-waterfront-deyaar',
    name: 'Saria Waterfront Residences',
    developer: 'Danube', // Danube mapping for continuity
    city: 'Dubai',
    community: 'Dubai Maritime City',
    location: 'Maritime Plaza Road, DMC, Dubai',
    startingPrice: 1950000,
    currency: 'AED',
    paymentPlan: '50/50',
    handover: 'Q4 2027',
    propertyTypes: ['Apartment', 'Penthouse'],
    bedrooms: ['1', '2', '3'],
    status: 'Launched',
    description: 'Saria is a striking waterfront skyscraper located directly on sea border of Dubai Maritime City. Providing stunning uninterrupted views of the Arabian Gulf and the luxury cruise terminals of Dubai Harbour, offering high marine density lifestyle.',
    highlights: [
      'Spectacular infinity edge sky swimming pool facing deep ocean view',
      'Strategically located near pristine Jumeirah coastal neighborhoods',
      'Modern automated yacht mooring integration updates via standard app',
      'Superb post-handover capital growth due to Maritime City growth'
    ],
    amenities: ['Marina Infinity Pool', 'Residents Lounge', 'Seafood Bistros', 'Yacht Valet Parking', 'Indoor Running Loop', 'Sauna & Steam Bath'],
    images: [
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    brochureUrl: '#',
    latitude: 25.2631,
    longitude: 55.2712,
    expectedROI: '8.8%',
    sqftRange: '880 - 2,500 sq.ft.'
  },

  // ABU DHABI PROJECTS
  {
    id: 'ad-1',
    slug: 'nobu-residences-aldar',
    name: 'Nobu Residences Saadiyat',
    developer: 'Aldar',
    city: 'Abu Dhabi',
    community: 'Saadiyat Island',
    location: 'Saadiyat Grove, Saadiyat Cultural District, Abu Dhabi',
    startingPrice: 7200000,
    currency: 'AED',
    paymentPlan: '60/40',
    handover: 'Q1 2027',
    propertyTypes: ['Apartment', 'Penthouse', 'Villa'],
    bedrooms: ['1', '2', '3', '4'],
    status: 'Selling',
    description: 'Aldar Nobu Residences Saadiyat brings Japanese minimalism and luxury beachfront living together. Situated in Abu Dhabi’s world-famous cultural hub near Guggenheim and Louvre, residents enjoy elite gastronomy concierge and bespoke Japanese gardens.',
    highlights: [
      'Bespoke luxury partnership with legendary hospitality brand Nobu',
      'Direct walking connectivity to Saadiyat white ocean shores',
      'Walking proximity to Louvre Abu Dhabi, Guggenheim, and Zayed National Museum',
      'Highest quality woods, natural travertine marbles, and custom bronze accents'
    ],
    amenities: ['Nobu Signature Restaurant', 'Japanese Wellness Spa', 'Zen Rooftop Deck', 'Direct Private Beach Access', 'Exclusive Fitness Dojo', 'Wine Tasting Cellar'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80'
    ],
    brochureUrl: '#',
    latitude: 24.5312,
    longitude: 54.4014,
    expectedROI: '7.4%',
    sqftRange: '950 - 4,800 sq.ft.'
  },
  {
    id: 'ad-2',
    slug: 'louvre-abu-dhabi-residences-aldar',
    name: 'Louvre Abu Dhabi Residences',
    developer: 'Aldar',
    city: 'Abu Dhabi',
    community: 'Saadiyat Island',
    location: 'Grove Boulevard, Saadiyat Island, Abu Dhabi',
    startingPrice: 3800000,
    currency: 'AED',
    paymentPlan: '60/40',
    handover: 'Q4 2026',
    propertyTypes: ['Apartment', 'Penthouse'],
    bedrooms: ['Studio', '1', '2', '3'],
    status: 'Selling',
    description: 'The world’s first-ever Louvre branded residential project, crafted exclusively by Aldar. Embodying refined luxury, the apartments feature direct curation of timeless artworks, museum privileges, and stunning views of the Louvre dome.',
    highlights: [
      'Exclusive Louvre Abu Dhabi VIP museum membership integration',
      'Avenue of iconic installations directly curated by French art selectors',
      'Spectacular pool deck looking straight unto the architectural dome of Louvre',
      'Extremely high demand and limited product volume representing strong liquidity'
    ],
    amenities: ['Museum View Deck', 'Boutique Fine-Art Gym', 'Private Screening Theater', 'Le Carrousel Kids Club', 'Private Executive Lounge', 'Wellness Pavilion'],
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
    ],
    brochureUrl: '#',
    latitude: 24.5298,
    longitude: 54.3985,
    expectedROI: '7.9%',
    sqftRange: '520 - 3,100 sq.ft.'
  },
  {
    id: 'ad-3',
    slug: 'yas-golf-collection-aldar',
    name: 'Yas Golf Collection Residences',
    developer: 'Aldar',
    city: 'Abu Dhabi',
    community: 'Yas Island',
    location: 'Yas Links, Yas Island, Abu Dhabi',
    startingPrice: 1300000,
    currency: 'AED',
    paymentPlan: '50/50',
    handover: 'Q3 2026',
    propertyTypes: ['Apartment'],
    bedrooms: ['Studio', '1', '2', '3'],
    status: 'Selling',
    description: 'Overlooking the lush fairways of Yas Links Golf Course and the pristine waters of Yas mangrove bay, this resort-style community offers a highly lucrative investment. Fast proximity to Ferrari World, Yas Waterworld, and Yas Mall.',
    highlights: [
      'Breath-taking premium vistas of championship golf course and mango forests',
      'Directly adjacent to Yas Island elite leisure attractions and F1 circuit',
      'Furnished apartments optimized for short-term holiday rentals yielding 10%+',
      'Built with Estidama 2-Pearl premium green development compliance'
    ],
    amenities: ['Mediterranean Pool Deck', 'Yas Links Discount Membership', 'Smart Home Controls', 'Jogging & Cycle Tracks', 'Boutique Retail Plaza', 'Outdoor Fitness Hub'],
    images: [
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    brochureUrl: '#',
    latitude: 24.4789,
    longitude: 54.5812,
    expectedROI: '8.7%',
    sqftRange: '460 - 1,850 sq.ft.'
  },
  {
    id: 'ad-4',
    slug: 'ramhan-island-villas-eagle',
    name: 'Ramhan Island Villas',
    developer: 'Modon', // Modon mapping for local developer
    city: 'Abu Dhabi',
    community: 'Ramhan Island',
    location: 'Sheikh Khalifa Bin Zayed Highway, Abu Dhabi',
    startingPrice: 6500000,
    currency: 'AED',
    paymentPlan: '70/30',
    handover: 'Q4 2027',
    propertyTypes: ['Villa', 'Mansion'],
    bedrooms: ['3', '4', '5', '6', '7'],
    status: 'Selling',
    description: 'Ramhan Island is Abu Dhabi’s pristine natural archipelago marvel. Developed with state-of-the-art infrastructure, these luxury villas are built directly on sand channels, meaning every resident steps out of their pool onto a private crystal beach.',
    highlights: [
      'Unmatched natural island environment with wild marine life and mangroves',
      'Every home has a private beach strip and direct marine mooring gateway',
      'Stellar masterplan featuring ultra-luxury spa resort and shopping marina',
      'Only 15 minutes away from mainland Abu Dhabi and Yas recreation hubs'
    ],
    amenities: ['Private Sandy Beach', 'Waterway Mooring Spills', 'State-of-art Marina Yacht Club', 'Organic Wellness Spa', 'Lagoon Water Sports', 'Gated Guard Protection'],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ],
    brochureUrl: '#',
    latitude: 24.4981,
    longitude: 54.4912,
    expectedROI: '7.1%',
    sqftRange: '3,800 - 9,500 sq.ft.'
  },
  {
    id: 'ad-5',
    slug: 'plaza-masdar-reportage',
    name: 'Masdar Plaza Residences',
    developer: 'Reportage',
    city: 'Abu Dhabi',
    community: 'Masdar City',
    location: 'Siemens Boulevard, Masdar City, Abu Dhabi',
    startingPrice: 1100000,
    currency: 'AED',
    paymentPlan: '70/30',
    handover: 'Q4 2026',
    propertyTypes: ['Apartment'],
    bedrooms: ['Studio', '1', '2'],
    status: 'Selling',
    description: 'The Plaza at Masdar City offers a modern, high-tech sustainable eco-residence. Built with solar shielding and highly optimized insulation, Masdar Plaza provides premium silent luxury with a focus on future carbon-neutral ecological footprints.',
    highlights: [
      'A true smart eco-development targeting zero water waste and low grids',
      'Very affordable starting barrier with robust historical Masdar yield history',
      'Beautiful modern geometric architecture designed to provide passive cooling shadows',
      'Highly valued location near Abu Dhabi Airport and business office parks'
    ],
    amenities: ['Passive Climate Pool', 'Solar-powered Gym', 'Shaded Retail Boardwalk', 'Hydroponics Resident Garden', 'Cycle Hub', 'Smart Security Card'],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
    ],
    brochureUrl: '#',
    latitude: 24.4282,
    longitude: 54.6142,
    expectedROI: '9.0%',
    sqftRange: '450 - 1,220 sq.ft.'
  },
  {
    id: 'ad-6',
    slug: 'saadiyat-lagoons-aldar',
    name: 'Saadiyat Lagoons Villas',
    developer: 'Aldar',
    city: 'Abu Dhabi',
    community: 'Saadiyat Island',
    location: 'Saadiyat Mangrove Forest side, Saadiyat, Abu Dhabi',
    startingPrice: 6200000,
    currency: 'AED',
    paymentPlan: '60/40',
    handover: 'Q2 2027',
    propertyTypes: ['Villa'],
    bedrooms: ['4', '5', '6'],
    status: 'Selling',
    description: 'These nature-inspired ultra-luxury villas are beautifully nested between deep mangrove forests and sandy dunes of Saadiyat Island. Emphasizing sustainable organic architecture, families enjoy high private insulation within a pristine wild environment.',
    highlights: [
      'Surrounded by wild flamingos, white sand reserves, and mangroves',
      'Highly custom architectural options: Minimalist Modern vs Premium Traditional',
      'Strict eco-responsible material guidelines ensuring maximum material purity',
      'Superb long-term security asset with excellent family growth settings'
    ],
    amenities: ['Forest Eco-Walks', 'Lagoon Splash Decks', 'Skate Park & Paddel Courts', 'Outpost Barbecue Gazebo', 'Pristine Eco-Gym', 'Boutique Market Stores'],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80'
    ],
    brochureUrl: '#',
    latitude: 24.5451,
    longitude: 54.4312,
    expectedROI: '7.3%',
    sqftRange: '3,400 - 6,800 sq.ft.'
  },
  {
    id: 'ad-7',
    slug: 'reem-hills-q-prop',
    name: 'Reem Hills Residences',
    developer: 'Modon', // Modon mapping for local developer
    city: 'Abu Dhabi',
    community: 'Al Reem Island',
    location: 'South Ridge, Al Reem Island, Abu Dhabi',
    startingPrice: 3200000,
    currency: 'AED',
    paymentPlan: '50/50',
    handover: 'Q3 2026',
    propertyTypes: ['Apartment', 'Townhouse', 'Villa'],
    bedrooms: ['2', '3', '4'],
    status: 'Selling',
    description: 'Reem Hills is an architectural master development built on a raised artificial hill on Al Reem Island. Offering sweeping 360-degree views of Abu Dhabi’s glittering skyscrapers and direct canal networks, it offers absolute city elegance.',
    highlights: [
      'Abu Dhabi’s first raised artificial hill masterplan creating incredible skyline vistas',
      'Highly spacious townhouses with custom private backyards and plunge pools',
      'Minutes from Abu Dhabi CBD (Al Maryah Island) and top medical centers',
      'Premium lifestyle with exceptional security, leisure complexes, and private club'
    ],
    amenities: ['Artificial Raised Hill Views', 'Canal Linear Walks', 'High-end Dining', 'Infinity Leisure Pool', 'Children Play Zone', 'Gated Community Access'],
    images: [
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    brochureUrl: '#',
    latitude: 24.4912,
    longitude: 54.4042,
    expectedROI: '8.2%',
    sqftRange: '1,200 - 3,900 sq.ft.'
  },
  {
    id: 'ad-8',
    slug: 'noya-residences-aldar',
    name: 'Noya Luma Townhouses',
    developer: 'Aldar',
    city: 'Abu Dhabi',
    community: 'Yas Island',
    location: 'Yas North, Yas Island, Abu Dhabi',
    startingPrice: 2200000,
    currency: 'AED',
    paymentPlan: '60/40',
    handover: 'Q4 2026',
    propertyTypes: ['Townhouse', 'Villa'],
    bedrooms: ['3', '4'],
    status: 'Selling',
    description: 'Noya Luma on Yas Island offers a highly coveted, modern offplan development for families and investors. Built to provide an active, vibrant indoor-outdoor lifestyle, Noya has premium thermal insulation and spacious layouts.',
    highlights: [
      'Fabulous family community situated in premium leisure center of Yas Island',
      'Equipped with solar heating, organic local composting, and low water grids',
      'High appreciation capital curves with immediate tenant-ready liquidity',
      'Fully gated community with excellent schooling networks next door'
    ],
    amenities: ['Noya Clubhouse & Gym', 'Organic Local Farm Access', 'Resort Swimming Pool', 'Padel & Squash Courts', 'Eco-certified Parks', 'Boutique Coffee shops'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    brochureUrl: '#',
    latitude: 24.4989,
    longitude: 54.6121,
    expectedROI: '8.5%',
    sqftRange: '1,800 - 3,100 sq.ft.'
  }
];

// Curated collections to generate stable, elegant properties from index 21 to 100
const DUBAI_COMMUNITIES = [
  'Downtown Dubai', 'Dubai Marina', 'Business Bay', 'Palm Jumeirah', 
  'Dubai Hills Estate', 'Dubai Creek Harbour', 'Emaar Beachfront', 
  'Jumeirah Village Circle (JVC)', 'Damac Hills', 'Meydan'
];

const ABU_DHABI_COMMUNITIES = [
  'Yas Island', 'Saadiyat Island', 'Al Reem Island', 'Al Maryah Island', 
  'Jubail Island', 'Masdar City', 'Al Raha Gardens'
];

const DEVELOPERS = [
  'Emaar', 'DAMAC', 'Sobha', 'Nakheel', 'Aldar', 'Ellington', 'Danube', 'Binghatti', 'Modon', 'Reportage'
];

const PROPERTY_TYPES_POOL = [
  ['Apartment'], 
  ['Apartment', 'Penthouse'], 
  ['Villa'], 
  ['Townhouse', 'Villa'], 
  ['Villa', 'Mansion'],
  ['Penthouse']
];

const HANDOVER_POOL = ['Q1 2027', 'Q2 2027', 'Q3 2027', 'Q4 2027', 'Q1 2028', 'Q2 2028', 'Q3 2028', 'Q4 2028', 'Q1 2029'];
const PAYMENT_PLANS = ['80/20', '70/30', '60/40', '50/50', '90/10', '40/60 Post Handover'];
const STATUS_POOL: ('Upcoming' | 'Launched' | 'Selling' | 'Sold Out')[] = ['Selling', 'Launched', 'Upcoming', 'Selling'];

const AMENITIES_POOL = [
  'Infinity Swimming Pool', 'Fully Equipped Gym', '24/7 Gated Security', 
  'Dedicated Valet Parking', 'Childrens Splash Deck', 'Yoga and Pilates Studio', 
  'Outdoor Dining Barbecue', 'Residents Executive Lounge', 'EV High Speed Charging',
  'Concierge Reception Butler', 'Sky Lounge Deck View', 'Cinema Screening Room',
  'Spa Hammam Sauna', 'Lush Botanical Parks'
];

const ADVANTAGES_POOL = [
  'Direct waterfront canal boulevard walking path',
  'Minutes walk from luxurious designer restaurants and boutique cafes',
  'Next door to leading prestigious international curriculum academies',
  'Strategic highway connection for rapid commute across Dubai and Abu Dhabi',
  'Breathtaking direct panoramic skyline and garden vistas'
];

// Deterministic generator using a pseudo-random seed to create consistent projects on every load
function createDeterministicProjects(): Project[] {
  const list: Project[] = [...anchorProjects];
  
  // Starting at 21, generate projects up to 100
  let seed = 42;
  function random(): number {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }
  
  function randomChoice<T>(arr: T[]): T {
    return arr[Math.floor(random() * arr.length)];
  }

  // We need to generate 80 projects.
  for (let i = 21; i <= 100; i++) {
    const isDubai = random() > 0.45; // ~55% Dubai, ~45% Abu Dhabi
    const city = isDubai ? 'Dubai' : 'Abu Dhabi';
    const developer = randomChoice(DEVELOPERS);
    
    // Choose appropriate community
    const community = isDubai ? randomChoice(DUBAI_COMMUNITIES) : randomChoice(ABU_DHABI_COMMUNITIES);
    
    // Structure beautiful design names
    const designSuffixes = ['Residences', 'Heights', 'Views', 'Villas', 'Estates', 'Sanctuary', 'Boutique', 'Cove', 'Quarter', 'Gate'];
    const prefixName = isDubai ? (random() > 0.5 ? 'Dubai Creek' : 'Al Maryah' === community ? 'Burj' : community) : community;
    const cleanPrefix = prefixName.replace(' (JVC)', '').replace(' by Emaar', '');
    const name = `${developer} ${cleanPrefix} ${randomChoice(designSuffixes)}`;
    
    // Generate unique slug
    const slug = `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${i}`;
    
    // Property types configuration
    const propertyTypes = randomChoice(PROPERTY_TYPES_POOL);
    const isVillaOnly = propertyTypes.includes('Villa') || propertyTypes.includes('Mansion');
    
    // Pricing (Villas and mansions are expensive, apartments are highly accessible)
    let startingPrice = 1200000;
    if (propertyTypes.includes('Mansion')) {
      startingPrice = Math.floor(15 + random() * 45) * 1000000;
    } else if (propertyTypes.includes('Villa')) {
      startingPrice = Math.floor(4 + random() * 12) * 1000000;
    } else if (propertyTypes.includes('Penthouse')) {
      startingPrice = Math.floor(6 + random() * 15) * 1000000;
    } else {
      startingPrice = Math.floor(9.5 + random() * 25) * 100000; // 950k - 3.4M
    }
    
    // Bedrooms list
    let bedroomsList: string[] = [];
    if (isVillaOnly) {
      bedroomsList = ['3', '4', '5'];
      if (random() > 0.6) bedroomsList.push('6');
    } else {
      bedroomsList = ['1', '2', '3'];
      if (random() > 0.8) bedroomsList.unshift('Studio');
      if (random() > 0.8) bedroomsList.push('4');
    }
    
    const paymentPlan = randomChoice(PAYMENT_PLANS);
    const handover = randomChoice(HANDOVER_POOL);
    const status = randomChoice(STATUS_POOL);
    
    const imageIndex1 = Math.floor(random() * LUXURY_IMAGES.length);
    let imageIndex2 = Math.floor(random() * LUXURY_IMAGES.length);
    if (imageIndex2 === imageIndex1) imageIndex2 = (imageIndex1 + 1) % LUXURY_IMAGES.length;
    
    const images = [LUXURY_IMAGES[imageIndex1], LUXURY_IMAGES[imageIndex2]];
    
    // ROI and Sqft Range
    const roiVal = (7.0 + random() * 2.5).toFixed(1);
    const expectedROI = `${roiVal}%`;
    
    let sqftRange = '800 - 2,200 sq.ft.';
    if (isVillaOnly) {
      sqftRange = `${2500 + Math.floor(random() * 3000)} - ${6000 + Math.floor(random() * 5000)} sq.ft.`;
    } else if (propertyTypes.includes('Apartment')) {
      sqftRange = `${450 + Math.floor(random() * 400)} - ${1500 + Math.floor(random() * 1500)} sq.ft.`;
    }
    
    // Detailed description suitable for luxury advisor
    const decsTemplates = [
      `Nestled elegantly within the highly sought-after sanctuary of ${community}, ${name} presents a magnificent investment potential. Curated with spectacular floor-to-ceiling panoramic glass walls, these residences provide high spatial efficiency and elite finishes tailored for luxury UAE investors looking to start handover in ${handover}.`,
      `Boasting pristine, world-class standard modern craftsmanship, ${name} introduces a stunning addition to the ${city} luxury skyline. Reflecting beautiful design integrity, this flagship off-plan masterpiece represents an incredible blend of high-yielding capital investment and prestigious residential living.`,
      `With bespoke architectural interiors and meticulous attention to double-insulated materials, ${name} is engineered to capture high-end aesthetics and serene comfort. Positioned within active growth corridors, private residents enjoy immediate walking transit to retail boardwalks and crystal clear lagoons.`
    ];
    
    const description = randomChoice(decsTemplates);
    
    // Dynamic highlights (unique to each)
    const highlights = [
      `Signature off-plan launch by the award-winning ${developer}`,
      `Located perfectly within the premium central hub of ${community}`,
      `Curated high-contrast aesthetic with generous spacious designs`,
      `Exceptional projected starting net ROI of ${expectedROI} per annum`
    ];
    
    // Amenities & advantages
    const amenities: string[] = [];
    const advantages: string[] = [];
    
    for (let k = 0; k < 5; k++) {
      const am = randomChoice(AMENITIES_POOL);
      if (!amenities.includes(am)) amenities.push(am);
      
      const ad = randomChoice(ADVANTAGES_POOL);
      if (!advantages.includes(ad)) advantages.push(ad);
    }
    
    // Coordinates mapping
    const latitude = city === 'Dubai' ? 25.0 + random() * 0.25 : 24.4 + random() * 0.18;
    const longitude = city === 'Dubai' ? 55.1 + random() * 0.25 : 54.3 + random() * 0.32;
    
    list.push({
      id: `generated-${i}`,
      slug,
      name,
      developer,
      city,
      community,
      location: `${community}, ${city}, UAE`,
      startingPrice,
      currency: 'AED',
      paymentPlan,
      handover,
      propertyTypes,
      bedrooms: bedroomsList,
      status,
      description,
      highlights,
      amenities,
      images,
      brochureUrl: '#',
      latitude,
      longitude,
      expectedROI,
      sqftRange
    });
  }
  
  return list;
}

// Memory database of 100 projects
const ALL_PROJECTS = createDeterministicProjects();

export const projectDataService = {
  /**
   * Retrieves all projects (100 in total)
   */
  async getProjects(): Promise<Project[]> {
    // Mimics dynamic API call, easily replaceable with a real fetch() call later
    return ALL_PROJECTS;
  },

  /**
   * Safe getter for a single project by slug
   */
  async getProjectBySlug(slug: string): Promise<Project | null> {
    const project = ALL_PROJECTS.find(p => p.slug === slug);
    return project || null;
  },

  /**
   * Returns curated featured developments (classy display on the homepage)
   */
  async getFeaturedProjects(limit: number = 6): Promise<Project[]> {
    // Anchor projects are the most detailed and look amazing as featured
    return ALL_PROJECTS.slice(0, limit);
  },

  /**
   * Full search, filtering, and sorting functionality
   */
  async getFilteredProjects(filters: {
    search?: string;
    city?: string;
    developer?: string;
    community?: string;
    propertyType?: string;
    priceMin?: number;
    priceMax?: number;
    handoverYear?: string;
    bedroom?: string;
    status?: string;
    sortBy?: string;
  }): Promise<Project[]> {
    let result = [...ALL_PROJECTS];

    // Search query
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.developer.toLowerCase().includes(q) ||
        p.community.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
      );
    }

    // City filter
    if (filters.city && filters.city !== 'All') {
      result = result.filter(p => p.city.toLowerCase() === filters.city!.toLowerCase());
    }

    // Developer filter
    if (filters.developer && filters.developer !== 'All') {
      result = result.filter(p => p.developer.toLowerCase() === filters.developer!.toLowerCase());
    }

    // Community filter
    if (filters.community && filters.community !== 'All') {
      result = result.filter(p => p.community.toLowerCase() === filters.community!.toLowerCase());
    }

    // Property Type
    if (filters.propertyType && filters.propertyType !== 'All') {
      result = result.filter(p => p.propertyTypes.some(type => type.toLowerCase() === filters.propertyType!.toLowerCase()));
    }

    // Handover
    if (filters.handoverYear && filters.handoverYear !== 'All') {
      result = result.filter(p => p.handover.includes(filters.handoverYear!));
    }

    // Bedrooms
    if (filters.bedroom && filters.bedroom !== 'All') {
      result = result.filter(p => p.bedrooms.some(bed => bed === filters.bedroom));
    }

    // Status
    if (filters.status && filters.status !== 'All') {
      result = result.filter(p => p.status === filters.status);
    }

    // Price range filters
    if (filters.priceMin !== undefined) {
      result = result.filter(p => p.startingPrice >= filters.priceMin!);
    }
    if (filters.priceMax !== undefined) {
      result = result.filter(p => p.startingPrice <= filters.priceMax!);
    }

    // Sorting options
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-asc':
          result.sort((a, b) => a.startingPrice - b.startingPrice);
          break;
        case 'price-desc':
          result.sort((a, b) => b.startingPrice - a.startingPrice);
          break;
        case 'handover-soonest':
          result.sort((a, b) => {
            const getYear = (hStr: string) => {
              const matches = hStr.match(/\d{4}/);
              return matches ? parseInt(matches[0]) : 9999;
            };
            const yearA = getYear(a.handover);
            const yearB = getYear(b.handover);
            if (yearA !== yearB) return yearA - yearB;
            // secondary split by Quarter
            const qA = a.handover.startsWith('Q') ? parseInt(a.handover[1]) : 4;
            const qB = b.handover.startsWith('Q') ? parseInt(b.handover[1]) : 4;
            return qA - qB;
          });
          break;
        case 'newest-launch':
          // anchor projects are the newest launches
          result.sort((a, b) => {
            const valA = a.id.startsWith('db-') || a.id.startsWith('ad-') ? 0 : 1;
            const valB = b.id.startsWith('db-') || b.id.startsWith('ad-') ? 0 : 1;
            return valA - valB;
          });
          break;
        default:
          break;
      }
    }

    return result;
  },

  /**
   * Helper values for UI filter select options
   */
  async getDevelopers(): Promise<string[]> {
    const list = ALL_PROJECTS.map(p => p.developer);
    return ['All', ...Array.from(new Set(list))].sort();
  },

  async getCommunities(city?: string): Promise<string[]> {
    let filtered = ALL_PROJECTS;
    if (city && city !== 'All') {
      filtered = ALL_PROJECTS.filter(p => p.city.toLowerCase() === city.toLowerCase());
    }
    const list = filtered.map(p => p.community);
    return ['All', ...Array.from(new Set(list))].sort();
  }
};
