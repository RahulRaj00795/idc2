import { Achiever, NewsItem, ProjectShowcase, BlogPost, DiasporaEvent } from '../types';

export const INITIAL_ACHIEVERS: Achiever[] = [
  {
    id: 'achiever-1',
    name: 'Sundar Pichai',
    role: 'CEO of Alphabet & Google',
    country: 'United States',
    achievement: 'Leading global AI innovation, Android ecosystem, and cloud technologies',
    story: 'Born in Madurai, India, and an alumnus of IIT Kharagpur, Stanford, and Wharton, Sundar Pichai spearheads Google and Alphabet, guiding worldwide advances in artificial intelligence and digital access for billions.',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    featured: true,
    order: 1,
    tags: ['Technology', 'Leadership', 'AI'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'achiever-2',
    name: 'Dr. Sunita Williams',
    role: 'NASA Astronaut & Commander',
    country: 'United States',
    achievement: 'Veteran astronaut with over 320 days in space and multiple spacewalk records',
    story: 'An Indian-American naval officer and NASA astronaut, Sunita Williams has commanded the International Space Station, conducted nine spacewalks totaling over 50 hours, and inspired millions of young women in STEM globally.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    featured: true,
    order: 2,
    tags: ['Aerospace', 'STEM', 'Exploration'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'achiever-3',
    name: 'Gita Gopinath',
    role: 'First Deputy Managing Director, IMF',
    country: 'United States / India',
    achievement: 'Renowned international macroeconomist and key architect of multilateral fiscal policy',
    story: 'Formerly Chief Economist of the International Monetary Fund and Professor of International Studies and Economics at Harvard University, Dr. Gopinath advises global leaders on currency stability, debt sustainability, and economic recovery.',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    featured: true,
    order: 3,
    tags: ['Economics', 'Policy', 'Global Finance'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'achiever-4',
    name: 'Ajay Banga',
    role: 'President of the World Bank Group',
    country: 'United States / India',
    achievement: 'Pioneering global climate finance, financial inclusion, and sustainable development',
    story: 'Educated at St. Stephen\'s College and IIM Ahmedabad, Ajay Banga transformed Mastercard into a global payments leader before becoming President of the World Bank, championing green energy transitions across developing economies.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    featured: true,
    order: 4,
    tags: ['Banking', 'Sustainability', 'Global Impact'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'achiever-5',
    name: 'Satya Nadella',
    role: 'Executive Chairman & CEO, Microsoft',
    country: 'United States',
    achievement: 'Transformed enterprise cloud computing and spearheaded consumer and enterprise AI breakthroughs',
    story: 'From Hyderabad, India to Redmond, Washington, Satya Nadella engineered Microsoft’s historic cloud renaissance with Azure and spearheaded early investments in generative AI, emphasizing empathy and growth mindset.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    featured: true,
    order: 5,
    tags: ['Technology', 'Cloud', 'AI'],
    createdAt: new Date().toISOString()
  }
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Global Remittances Surge: Indian Diaspora Contributes Record $125 Billion',
    summary: 'The World Bank reports Indian expatriates continue to lead global inward remittances, boosting home state investments, education, and healthcare infrastructure.',
    content: 'According to latest figures released by the World Bank, inward remittances to India touched historic highs, driven by high-skilled diaspora professionals in North America, Europe, and Gulf Cooperation Council (GCC) countries. These funds have increasingly shifted towards capital formation, green real estate, and philanthropy.',
    category: 'Economy',
    country: 'Global',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    source: 'World Financial Review',
    publishedAt: 'October 12, 2026',
    readTime: '3 min read',
    createdAt: new Date().toISOString()
  },
  {
    id: 'news-2',
    title: 'Pravasi Bharatiya Divas: Global Summit to Unveil New OCI & Fast-Track Visas',
    summary: 'Government and diaspora councils announce streamlined digital documentation, dual-citizenship dialogues, and seamless property registry portals for PIOs.',
    content: 'At the upcoming flagship convention, government ministers and overseas diaspora representatives will present unified consular mobile apps, automated OCI renewal mechanisms, and cross-border grievance settlement benches.',
    category: 'Policy & Diaspora',
    country: 'India & Overseas',
    imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80',
    source: 'Diaspora Affairs Bureau',
    publishedAt: 'October 10, 2026',
    readTime: '4 min read',
    createdAt: new Date().toISOString()
  },
  {
    id: 'news-3',
    title: 'Silicon Valley to Bengaluru: Diaspora Founders Seed $500M DeepTech Fund',
    summary: 'Prominent Indian-origin venture capitalists and tech founders launch an angel alliance targeting clean hydrogen, semiconductor design, and quantum computing.',
    content: 'A consortium of diaspora leaders across San Francisco, London, and Singapore joined hands to bridge international market access for early-stage deep-tech startups emerging out of Indian universities and research institutes.',
    category: 'Startups & Tech',
    country: 'USA / Singapore',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    source: 'TechInnovate Global',
    publishedAt: 'October 8, 2026',
    readTime: '5 min read',
    createdAt: new Date().toISOString()
  },
  {
    id: 'news-4',
    title: 'Cultural Revival: Indian Classical & Contemporary Arts Festivals Tour Europe',
    summary: 'Over 40 diaspora cultural societies in London, Paris, and Berlin unite for a 3-week celebration of Indian literature, classical dance, and folk fusion music.',
    content: 'European diaspora federations are hosting an unprecedented pan-continental cultural trail celebrating the diverse linguistic and heritage traditions of the subcontinent, drawing enthusiastic multi-ethnic audiences.',
    category: 'Culture & Arts',
    country: 'United Kingdom / Europe',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    source: 'Global Heritage Network',
    publishedAt: 'October 5, 2026',
    readTime: '3 min read',
    createdAt: new Date().toISOString()
  }
];

export const INITIAL_PROJECTS: ProjectShowcase[] = [
  {
    id: 'proj-1',
    title: 'DesiHealth Telecare',
    tagline: 'Bridging healthcare gaps between global diaspora doctors and rural clinics',
    description: 'An open telemedicine platform built by Indian-American and NHS physicians providing free secondary opinions and emergency cardiology consults for tier-3 towns in India.',
    founder: 'Dr. Rohan Verma & Dr. Maya Sen',
    country: 'United Kingdom & India',
    category: 'Healthcare & Non-Profit',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    projectUrl: 'https://example.com/desihealth',
    tags: ['HealthTech', 'Telemedicine', 'Community Impact'],
    status: 'Live',
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-2',
    title: 'Pravasi Heritage Archive',
    tagline: 'Digitizing oral histories and migratory journeys across Fiji, Caribbean, and Africa',
    description: 'A community-curated digital museum capturing voices, folk songs, legal records, and family trees of early indentured laborers and diaspora migrations across 5 continents.',
    founder: 'Ananya Ramgoolam',
    country: 'Mauritius / Canada',
    category: 'Cultural Preservation',
    imageUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80',
    projectUrl: 'https://example.com/pravasi-archive',
    tags: ['History', 'Oral Archive', 'Digital Humanities'],
    status: 'Live',
    createdAt: new Date().toISOString()
  },
  {
    id: 'proj-3',
    title: 'KisanKranti Agro-Tech',
    tagline: 'Solar-powered smart micro-irrigation systems backed by diaspora funding',
    description: 'Engineering low-cost IoT sensors and drip irrigation controllers manufactured locally to help marginal farmers conserve 40% groundwater while increasing yield.',
    founder: 'Vikramaditya Rao',
    country: 'Germany / India',
    category: 'AgriTech & Climate',
    imageUrl: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80',
    projectUrl: 'https://example.com/kisankranti',
    tags: ['AgriTech', 'Solar', 'Sustainability'],
    status: 'Live',
    createdAt: new Date().toISOString()
  }
];

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'The Modern Pravasi Identity: How Second-Generation Diaspora Reconnects with Roots',
    excerpt: 'Exploring cultural hybridity, language retention, and the digital Renaissance connecting diaspora youth to classical arts and social impact in India.',
    content: 'Growing up thousands of miles from the subcontinent often meant navigating two distinct worlds. Today, fueled by affordable travel, digital communities, and pan-Indian art collectives, the younger diaspora is redefining what it means to be Indian in the 21st century...',
    author: 'Pooja Iyer',
    authorBio: 'Sociologist and culture columnist based in Toronto',
    category: 'Identity & Heritage',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    readTime: '6 min read',
    publishedAt: 'October 11, 2026',
    createdAt: new Date().toISOString()
  },
  {
    id: 'post-2',
    title: 'Unlocking Cross-Border Mentorship: How NRI Executives Can Guide College Grads Back Home',
    excerpt: 'Actionable frameworks for structured 1-on-1 career guidance, mock interviews, and university incubation programs led by overseas alumni.',
    content: 'The most underutilized bridge between the global diaspora and emerging talents back home is structured mentorship. While financial remittances are vital, intellectual remittances can catalyze generational upward mobility...',
    author: 'Arjun Nambiar',
    authorBio: 'Tech Director & Co-founder of MentorsWithoutBorders',
    category: 'Education & Career',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    readTime: '4 min read',
    publishedAt: 'October 9, 2026',
    createdAt: new Date().toISOString()
  }
];

export const INITIAL_EVENTS: DiasporaEvent[] = [
  {
    id: 'event-1',
    title: 'Global NRI & PIO Annual Conclave 2026',
    date: 'November 18-20, 2026',
    location: 'Hybrid / New Delhi & Online Livestream',
    description: 'Join over 2,000 delegates from 60 countries discussing bilateral trade corridors, startup investments, and cultural diplomacy.',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    registrationLink: 'https://example.com/register-conclave',
    category: 'Summit'
  },
  {
    id: 'event-2',
    title: 'Diaspora Tech & AI Hackathon',
    date: 'December 5-7, 2026',
    location: 'Virtual / Global',
    description: '48-hour global sprint building solutions for disaster relief, multilingual language models, and health monitoring.',
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
    registrationLink: 'https://example.com/register-hackathon',
    category: 'Technology'
  },
  {
    id: 'event-3',
    title: 'India-Diaspora Investment & Leadership Delegation',
    date: 'January 9-11, 2027',
    location: 'Mumbai & GIFT City, Gujarat',
    description: 'Curated institutional delegation connecting overseas investors, industrialists, and policymakers with high-growth Indian infrastructure and innovation hubs.',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    registrationLink: 'https://example.com/register-delegation',
    category: 'Business & Investment'
  }
];

