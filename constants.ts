
// FIX: Import 'CastingArtist' and 'CastingProject' types.
import { Job, CastingArtist, CastingProject, UserProfile, MLMGroup, MLMPost, PlatformRole, ArtistCategory, Video, Comment, Studio, StudioReview, ChatConversation, Category, NgoShgGroup, MusicProduct } from './types';

export const PLATFORM_ROLES = Object.values(PlatformRole);
export const ARTIST_CATEGORIES = Object.values(ArtistCategory);

export const PLATFORM_ROLE_DESCRIPTIONS: Record<PlatformRole, string> = {
    [PlatformRole.JobSeeker]: "Looking for work opportunities.",
    [PlatformRole.Employer]: "Hiring candidates and posting jobs.",
    [PlatformRole.Artist]: "Creative professionals like painters, musicians, actors.",
    [PlatformRole.PerformingArtsTeacher]: "Teaching music, dance, or acting.",
    [PlatformRole.Institute]: "Running a music, dance, or acting school.",
    [PlatformRole.WomanEntrepreneur]: "Running a business on platforms like Desi Didi Mart.",
    [PlatformRole.Student]: "Learning, interning, or seeking part-time work.",
    [PlatformRole.TrainerCoach]: "Providing professional training or coaching.",
    [PlatformRole.Astrologer]: "Providing astrological consultation and services.",
    [PlatformRole.NGOMember]: "Engaged in social work and volunteering.",
    [PlatformRole.DigitalWorker]: "YouTubers, marketers, remote workers, etc.",
    [PlatformRole.MLMMember]: "Engaged in network marketing and team building.",
};

export const PLACEHOLDER_AVATAR = "https://picsum.photos/200/200";
export const HERO_IMAGES = [
  "https://picsum.photos/1920/1080?random=1",
  "https://picsum.photos/1920/1080?random=2",
  "https://picsum.photos/1920/1080?random=3"
];

export const CATEGORIES: Category[] = [
  // --- JOBS & WORK ---
  { 
    id: 1, 
    title: "Jobs Portal", 
    icon: "Briefcase", 
    desc: "Placement jobs across India.", 
    details: "Access thousands of verified job listings across India. From corporate roles to creative gigs, find the perfect match for your skills with our AI-powered matching system.",
    category: "Services",
    path: "jobs"
  },
  { 
    id: 2, 
    title: "Work From Home", 
    icon: "Laptop", 
    desc: "Remote & flexible work opportunities.", 
    details: "Find legitimate remote work opportunities. Data entry, virtual assistance, content writing, and more. Work from the comfort of your home with flexible hours.",
    category: "Services" 
  },
  { 
    id: 3, 
    title: "Delivery Boy Jobs", 
    icon: "Bike", 
    desc: "Food, parcel & logistics delivery work.", 
    details: "Join the logistics network. Partner with top food delivery and courier services. Flexible shifts, instant payouts, and joining bonuses available.",
    category: "Services" 
  },
  { 
    id: 4, 
    title: "MLM Jobs", 
    icon: "Network", 
    desc: "Build your network and manage your team.", 
    details: "Launch your network marketing career. Create a detailed profile, share and promote your business plans with PDF documents, images, and YouTube videos. Engage with prospects through direct chat, build your community with groups, and manage all your content from a powerful, user-friendly dashboard.",
    category: "Business",
    path: "mlm-platform"
  },
  { 
    id: 5, 
    title: "Car Washing Partner", 
    icon: "Droplets", 
    desc: "Car cleaning services & partnerships.", 
    details: "Start your car washing business or find jobs. Connect with vehicle owners in your locality for daily or weekly cleaning services.",
    category: "Services" 
  },
  { 
    id: 6, 
    title: "Barber Shop Booking", 
    icon: "Scissors", 
    desc: "Book or manage barber services.", 
    details: "For barbers and customers. Manage appointments, showcase styles, and get bookings online. Customers can rate and review services.",
    category: "Services" 
  },

  // --- ARTISTS & MEDIA ---
  { 
    id: 7, 
    title: "Artists Platform", 
    icon: "Palette", 
    desc: "Profiles, portfolios & artist jobs.", 
    details: "The ultimate hub for artists. Create a stunning portfolio, connect with other creatives, and get discovered by top agencies and studios.",
    category: "Community",
    path: "artists-platform"
  },
  { 
    id: 8, 
    title: "Music Industry", 
    icon: "Music", 
    desc: "Instruments, Rent, Repair & Gear.", 
    details: "Your one-stop shop for everything music. Buy and sell instruments, rent sound equipment, book repair services, and find studio materials.",
    category: "Community",
    path: "music-industry"
  },
  { 
    id: 9, 
    title: "Studios", 
    icon: "Mic2", 
    desc: "Audio & video studios booking.", 
    details: "Book professional recording studios, jam rooms, and video production sets. Compare equipment, rates, and availability in real-time.",
    category: "Services",
    path: "studios-platform"
  },
  { 
    id: 10, 
    title: "WeTube", 
    icon: "Youtube", 
    desc: "Watch & earn video platform.", 
    details: "A community-driven video platform. Share your content, monetize your views, and engage with an audience that values creativity.",
    category: "Community",
    path: 'we-tube',
  },

  // --- BUSINESS & SERVICES ---
  { 
    id: 11, 
    title: "Desi Didi Mart", 
    icon: "ShoppingBag", 
    desc: "Shop handmade products.", 
    details: "Support local artisans and SHGs. Buy and sell handmade crafts, organic products, and traditional art directly from the makers.",
    category: "Business",
    path: "desi-didi-mart"
  },
  { 
    id: 12, 
    title: "Promotions", 
    icon: "Megaphone", 
    desc: "Promote brands, artists & services.", 
    details: "Boost your visibility. tailored marketing packages for artists and small businesses. Social media ads, influencer collaborations, and more.",
    category: "Business" 
  },
  { 
    id: 13, 
    title: "Digital Marketing", 
    icon: "TrendingUp", 
    desc: "SEO, social media & online marketing.", 
    details: "Hire experts or find work. SEO, content marketing, social media management, and PPC campaigns to grow your online presence.",
    category: "Business",
    path: 'digital-marketing'
  },
  { 
    id: 14, 
    title: "Cloud Kitchen", 
    icon: "Utensils", 
    desc: "Food business & delivery setup.", 
    details: "Start your food business with low investment. Rent cloud kitchen spaces, get licensing support, and connect with delivery platforms.",
    category: "Business" 
  },

  // --- LEARNING & GROWTH ---
  { 
    id: 15, 
    title: "AI Training", 
    icon: "Cpu", 
    desc: "Learn AI & digital skills.", 
    details: "Master the future. Courses on Prompt Engineering, Generative AI tools, and digital workflow optimization for creatives.",
    category: "Learning" 
  },
  { 
    id: 16, 
    title: "Student Competitions", 
    icon: "GraduationCap", 
    desc: "Competitions, learning & growth.", 
    details: "Participate in national level talent hunts, quizzes, and hackathons. Win scholarships, prizes, and recognition for your skills.",
    category: "Learning" 
  },
  { 
    id: 17, 
    title: "Astrologer Portal", 
    icon: "Star", 
    desc: "Consult astrologers online.", 
    details: "Connect with verified astrologers. Kundli matching, daily horoscopes, and personalized consultations via chat or video call.",
    category: "Services" 
  },

  // --- COMMUNITY & WELFARE ---
  { 
    id: 18, 
    title: "NGO / SHG Groups", 
    icon: "Heart", 
    desc: "Social projects & collaboration.", 
    details: "Make a difference. Join hands with NGOs and Self Help Groups. Volunteer, donate, or collaborate on social impact projects.",
    category: "Community",
    path: "ngo-shg"
  },
  { 
    id: 19, 
    title: "Health Card", 
    icon: "Activity", 
    desc: "Health benefits & support programs.", 
    details: "Exclusive health benefits for artists. Insurance plans, discount cards for hospitals, and mental health support resources.",
    category: "Community",
    path: 'health-card'
  },
];

export const JOB_CATEGORIES_DATA = [
  { id: 101, title: "NGO Jobs", desc: "Social impact roles", icon: "Heart" },
  { id: 102, title: "SHG Projects", desc: "Self Help Group work", icon: "Users" },
  { id: 103, title: "Musician", desc: "Gigs & Bands", icon: "Music" },
  { id: 104, title: "Actor", desc: "Film & Theater", icon: "Video" },
  { id: 105, title: "Delivery Boy", desc: "Logistics", icon: "Bike" },
  { id: 106, title: "Cloud Kitchen", desc: "Cooking & Helper", icon: "Utensils" },
  { id: 107, title: "AI Jobs", desc: "Prompt Engineering", icon: "Cpu" },
  { id: 108, title: "Digital Marketing", desc: "SEO & Ads", icon: "TrendingUp" },
  { id: 109, title: "Work From Home", desc: "Remote Roles", icon: "Laptop" },
  { id: 110, title: "Sales", desc: "Field Executive", icon: "Briefcase" },
  { id: 111, title: "MLM", desc: "Network Marketing", icon: "Network" },
  { id: 112, title: "Photographer", desc: "Events & Studio", icon: "Camera" },
];

export const JOB_ROLES_BY_CATEGORY: Record<string, string[]> = {
  "NGO Jobs": ["Field Coordinator", "Program Manager", "Fundraising Officer", "Volunteer Coordinator"],
  "SHG Projects": ["Group Leader", "Accountant", "Production Supervisor", "Trainer"],
  "Musician": ["Vocalist", "Guitarist", "Drummer", "Pianist", "Music Producer", "DJ"],
  "Actor": ["Film Actor", "Theater Artist", "Voice Over Artist", "Model"],
  "Delivery Boy": ["Food Delivery Partner", "Courier Executive", "Logistics Associate"],
  "Cloud Kitchen": ["Head Chef", "Sous Chef", "Kitchen Helper", "Packing Staff", "Manager"],
  "AI Jobs": ["Prompt Engineer", "AI Trainer", "Data Analyst", "ML Engineer"],
  "Digital Marketing": ["SEO Specialist", "Social Media Manager", "Content Writer", "PPC Expert", "Email Marketer"],
  "Work From Home": ["Data Entry Operator", "Virtual Assistant", "Customer Support Rep", "Online Tutor"],
  "Sales": ["Field Sales Executive", "Business Development Manager", "Retail Sales Associate"],
  "MLM": ["Distributor", "Team Leader", "Network Marketer"],
  "Photographer": ["Wedding Photographer", "Product Photographer", "Photojournalist", "Videographer"]
};

export const MOCK_JOBS: Job[] = [
  {
    id: 1,
    title: "Senior Visual Designer",
    company: "Creative Studio X",
    location: "Mumbai, MH",
    type: "Full Time",
    salary: "₹12L - ₹15L PA",
    minSalary: 1200000,
    experience: 5,
    category: "Design",
    postedAt: "2 days ago",
    skills: ["Photoshop", "Figma", "3D Rendering"],
    description: "We are looking for a visionary designer to lead our brand identity projects. Experience in luxury brands is a plus.",
    isFeatured: true
  },
  {
    id: 2,
    title: "NGO Field Coordinator",
    company: "Hope Foundation",
    location: "Delhi, NCR",
    type: "Contract",
    salary: "₹3L - 4L PA",
    minSalary: 300000,
    experience: 2,
    category: "NGO",
    postedAt: "1 day ago",
    skills: ["Communication", "Hindi", "Social Work"],
    description: "Manage on-ground distribution drives and coordinate with local SHGs for rural development projects.",
    isFeatured: true
  },
  {
    id: 3,
    title: "Wedding Photographer",
    company: "Elite Events",
    location: "Bangalore, KA",
    type: "Freelance",
    salary: "Project Based (Est. ₹6L PA)",
    minSalary: 600000,
    experience: 3,
    category: "Photography",
    postedAt: "4 hours ago",
    skills: ["Candid", "Editing", "Equipment Own"],
    description: "Looking for an experienced candid photographer for a 3-day wedding event in December.",
    isFeatured: true
  },
  {
    id: 4,
    title: "Delivery Partner",
    company: "FastMove Logistics",
    location: "Pune, MH",
    type: "Full Time",
    salary: "Up to ₹3.6L PA",
    minSalary: 240000,
    experience: 0,
    category: "Delivery",
    postedAt: "Just now",
    skills: ["Driving License", "Two Wheeler"],
    description: "Urgent hiring for delivery partners. Weekly payouts and joining bonus available.",
    isFeatured: false
  },
  {
    id: 5,
    title: "AI Prompt Engineer",
    company: "TechNova AI",
    location: "Remote",
    type: "Remote",
    salary: "₹8L - ₹12L PA",
    minSalary: 800000,
    experience: 2,
    category: "Tech",
    postedAt: "3 days ago",
    skills: ["LLMs", "Python", "Creative Writing"],
    description: "Train and fine-tune models for creative writing tasks. Experience with GPT-4 and Midjourney required.",
    isFeatured: false
  },
  {
    id: 6,
    title: "Music Producer (Intern)",
    company: "Indie Records",
    location: "Hyderabad, TS",
    type: "Part Time",
    salary: "Stipend based",
    minSalary: 120000,
    experience: 0,
    category: "Music",
    postedAt: "5 days ago",
    skills: ["Ableton", "Mixing", "Mastering"],
    description: "Seeking a producer to mix and master a 5-track EP for an upcoming indie rock band.",
    isFeatured: false
  },
  {
    id: 7,
    title: "Senior Sales Manager",
    company: "Growth Co.",
    location: "Bangalore, KA",
    type: "Full Time",
    salary: "₹15L+ PA",
    minSalary: 1500000,
    experience: 8,
    category: "Sales",
    postedAt: "6 days ago",
    skills: ["Team Leadership", "B2B Sales", "CRM"],
    description: "Lead our sales team to new heights. Proven track record in enterprise sales required.",
    isFeatured: false
  }
];


// --- ARTIST PLATFORM CONSTANTS ---
export const ARTIST_LANGUAGES = ["English", "Hindi", "Marathi", "Bengali", "Tamil", "Telugu", "Kannada", "Malayalam", "Gujarati", "Punjabi", "Odia"];
export const ARTIST_GENRES = ["Classical", "Rock", "Pop", "Hip Hop", "Jazz", "Folk", "Electronic", "Bollywood", "Sufi", "Ghazal"];
export const ARTIST_SPECIALTIES = ["Live Performance", "Studio Recording", "Vocal Training", "Composition", "Improvisation", "Band Leading"];
export const ARTIST_EVENT_TYPES = ["Weddings", "Corporate Events", "Concerts", "Private Parties", "Festivals", "Religious Events"];
export const ARTIST_TAGS = [" energetic", " soulful", " versatile", " experienced", " award-winning", " traditional", " modern"];


// --- CASTING PLATFORM CONSTANTS ---
export const MOCK_CASTING_ARTISTS: CastingArtist[] = [
  {
    id: 1,
    name: "Rohan Verma",
    category: "Actor",
    city: "Mumbai",
    age: 28,
    gender: 'Male',
    image: "https://picsum.photos/400/500?random=201",
    coverImage: "https://picsum.photos/800/400?random=301",
    isPlatinum: true,
    rating: 4.8,
    bio: "Versatile actor with 5+ years of experience in theater and short films. Trained in method acting and martial arts. Eager to take on challenging lead roles.",
    skills: ["Method Acting", "Martial Arts", "Hindi", "English", "Bike Riding"],
    socials: { instagram: "#", youtube: "#" },
    portfolio: [
      { id: "p1a", type: 'photo', url: "https://picsum.photos/600/800?random=401", title: "Headshot 1" },
      { id: "p1b", type: 'photo', url: "https://picsum.photos/600/800?random=402", title: "Action Pose" },
      { id: "p1c", type: 'video', url: "https://picsum.photos/600/800?random=403", title: "Monologue Performance" },
    ]
  },
  {
    id: 2,
    name: "Ananya Reddy",
    category: "Model",
    city: "Bangalore",
    age: 24,
    gender: 'Female',
    image: "https://picsum.photos/400/500?random=202",
    coverImage: "https://picsum.photos/800/400?random=302",
    isPlatinum: false,
    rating: 4.9,
    bio: "Professional model specializing in editorial and runway. Featured in top fashion magazines. Known for a strong, confident presence.",
    skills: ["Runway Walk", "Posing", "Editorial", "Commercial"],
    socials: { instagram: "#" },
    portfolio: [
      { id: "p2a", type: 'photo', url: "https://picsum.photos/600/800?random=404", title: "Fashion Shoot" },
      { id: "p2b", type: 'photo', url: "https://picsum.photos/600/800?random=405", title: "Cover Look" },
    ]
  },
  {
    id: 3,
    name: "Sameer Khan",
    category: "Singer",
    city: "Delhi",
    age: 32,
    gender: 'Male',
    image: "https://picsum.photos/400/500?random=203",
    coverImage: "https://picsum.photos/800/400?random=303",
    isPlatinum: true,
    rating: 4.7,
    bio: "Sufi and Ghazal singer with a soulful voice. Performed at numerous concerts and private events. Also a composer and lyricist.",
    skills: ["Sufi Singing", "Ghazal", "Harmonium", "Live Performance"],
    socials: { youtube: "#", website: "#" },
    portfolio: [
      { id: "p3a", type: 'video', url: "https://picsum.photos/600/800?random=406", title: "Live Concert Clip" },
    ]
  },
  {
    id: 4,
    name: "Isha Kapoor",
    category: "Dancer",
    city: "Pune",
    age: 22,
    gender: 'Female',
    image: "https://picsum.photos/400/500?random=204",
    coverImage: "https://picsum.photos/800/400?random=304",
    isPlatinum: false,
    rating: 4.6,
    bio: "Contemporary and hip-hop dancer. Won several national-level competitions. Energetic and versatile performer.",
    skills: ["Hip-Hop", "Contemporary", "Choreography", "Freestyle"],
    socials: { instagram: "#" },
    portfolio: [
      { id: "p4a", type: 'video', url: "https://picsum.photos/600/800?random=407", title: "Dance Reel" },
      { id: "p4b", type: 'photo', url: "https://picsum.photos/600/800?random=408", title: "Performance Shot" },
    ]
  },
];


export const MOCK_CASTING_PROJECTS: CastingProject[] = [
  {
    id: 1,
    title: "Lead Role for 'Cyber City' Web Series",
    type: 'OTT',
    budget: "₹50k - ₹1L / episode",
    location: "Mumbai, MH",
    rolesCount: 2,
    agency: "Dynamo Productions",
    postedAt: "2 days ago",
    description: "Seeking a male and female lead for a new-age sci-fi thriller web series set in a futuristic Mumbai. The series explores the impact of technology on human relationships. 8-episode commitment required.",
    roleRequirements: {
      ageRange: "25-30 years",
      gender: "Male & Female",
      skills: ["Action sequences", "Strong emotional range", "Fluent in Hindi"]
    }
  },
  {
    id: 2,
    title: "Family for TV Commercial (Smartphone)",
    type: 'Ad',
    budget: "₹20k - ₹40k per artist",
    location: "Delhi, NCR",
    rolesCount: 4,
    agency: "Ad-Wise Creatives",
    postedAt: "5 hours ago",
    description: "Looking for a family of four (father, mother, son, daughter) for a heartwarming smartphone ad. Must have expressive faces and a natural chemistry.",
    roleRequirements: {
      ageRange: "Father(35-40), Mother(30-35), Son(8-10), Daughter(12-14)",
      gender: "Male & Female",
      skills: ["Expressive", "On-screen chemistry", "No dialogues"]
    }
  },
  {
    id: 3,
    title: "Backing Dancers for Music Video",
    type: 'Music Video',
    budget: "₹10,000 per day",
    location: "Goa",
    rolesCount: 10,
    agency: "Groove Factory",
    postedAt: "1 day ago",
    description: "Energetic hip-hop and freestyle dancers needed for a major artist's music video shoot in Goa. 3-day shoot. Travel and accommodation provided.",
    roleRequirements: {
      ageRange: "18-25 years",
      gender: "Any",
      skills: ["Hip-Hop", "Freestyle", "Popping", "Locking"]
    }
  },
  {
    id: 4,
    title: "Character Artist for Feature Film",
    type: 'Film',
    budget: "As per industry standards",
    location: "Hyderabad, TS",
    rolesCount: 1,
    agency: "Grandeur Films",
    postedAt: "4 days ago",
    description: "Seeking an experienced character actor to play the role of a wise, elderly village head. The role is crucial to the film's plot. Must be fluent in Telugu.",
    roleRequirements: {
      ageRange: "60-70 years",
      gender: "Male",
      skills: ["Character Acting", "Method Acting", "Fluent Telugu"]
    }
  }
];


// --- UNIFIED PROFILES & MLM ---

export const CURRENT_USER_PROFILE: UserProfile = {
  id: 'profile-current',
  userId: 'guest-bypass',
  fullName: 'Aarav Sharma',
  displayName: 'Aarav S.',
  email: 'guest@artist.social',
  avatar: 'https://picsum.photos/100/100?random=500',
  coverPhoto: 'https://picsum.photos/1600/400?random=800',
  isVerified: true,
  weTubeVerificationStatus: 'unverified',
  status: 'online',
  address: { city: 'Pune', state: 'Maharashtra', country: 'India' },
  platformRole: PlatformRole.MLMMember,
  experience: 2,
  bio: 'A passionate network marketer and artist with a focus on wellness products. I believe in building strong, supportive teams to achieve financial freedom together. Always looking to connect with like-minded individuals!',
  languages: ['English', 'Hindi'],
  skills: ['Public Speaking', 'Team Leadership', 'Sales Strategy', 'Digital Marketing', 'Oil Painting'],
  socials: {
    whatsapp: '+919876543210',
    youtube: 'https://youtube.com',
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    website: 'https://aarav.art',
  },
  portfolio: [
    {
      id: 'p1',
      type: 'photo',
      title: 'Sunset Over the Valley',
      caption: 'A vibrant oil painting capturing the last light of day.',
      mediaUrl: 'https://picsum.photos/1200/800?random=21',
      thumbnailUrl: 'https://picsum.photos/400/400?random=21'
    },
    {
      id: 'p2',
      type: 'video',
      title: 'The Sculpting Process',
      caption: 'A short film documenting the creation of my latest marble sculpture.',
      mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      thumbnailUrl: 'https://picsum.photos/400/400?random=22'
    },
    {
      id: 'p3',
      type: 'short',
      title: 'Digital Art Timelapse',
      caption: 'Watch a 20-hour digital painting come to life in 60 seconds.',
      mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-a-girl-in-a-leather-jacket-at-a-bar-4210-large.mp4',
      thumbnailUrl: 'https://picsum.photos/400/400?random=23'
    }
  ],
  groupMemberships: [
    { 
      groupId: 'ngo-1', 
      groupName: 'Hope Foundation', 
      groupImage: 'https://picsum.photos/100/100?random=901',
      role: 'Volunteer', 
      joinedDate: 'Jan 2023', 
      type: 'NGO' 
    },
    { 
      groupId: 'shg-1', 
      groupName: 'Mahila Shakti Group', 
      groupImage: 'https://picsum.photos/100/100?random=902',
      role: 'Member', 
      joinedDate: 'Mar 2023', 
      type: 'SHG' 
    }
  ],
  artist: {
    primaryCategory: ArtistCategory.Painter,
    secondaryCategories: [ArtistCategory.DigitalArtist, ArtistCategory.Sculptor],
    performanceType: ['Studio'],
    genres: ['Impressionism', 'Abstract'],
    specialties: ['Oil Painting', 'Canvas Art'],
    eventTypes: ['Exhibitions', 'Private Commissions'],
    tags: ['vibrant', 'textured'],
    availableForBooking: true,
    travelReady: false,
    rate: '₹15,000 per artwork',
    achievements: ['Featured in Pune Art Gallery 2022', 'Best Newcomer Award 2023'],
  },
  mlm: {
    level: 'Bronze',
    teamSize: 12,
    achievements: [
      { icon: 'Award', title: 'Top Recruiter Q2 2023' },
      { icon: 'TrendingUp', title: 'Reached Gold Tier' },
    ],
  }
};

export const USER_PROFILES: UserProfile[] = [
  CURRENT_USER_PROFILE,
  { 
    id: 'profile-1', userId: 'user-mlm-1', fullName: 'Rajesh Kumar', displayName: 'Rajesh K.', 
    email: 'rajesh@example.com', avatar: 'https://picsum.photos/100/100?random=501', 
    coverPhoto: 'https://picsum.photos/1600/400?random=801', isVerified: true, 
    weTubeVerificationStatus: 'pending',
    status: '15m ago',
    address: { city: 'Mumbai', state: 'Maharashtra', country: 'India'},
    platformRole: PlatformRole.Employer,
    experience: 5,
    bio: 'MLM Leader and motivational speaker.',
    languages: ['Hindi', 'English'], skills: ['Sales', 'Public Speaking'],
    socials: {},
    mlm: { level: 'Gold', teamSize: 150, achievements: [] }
  },
  { 
    id: 'profile-2', userId: 'user-mlm-2', fullName: 'Sunita Sharma', displayName: 'Sunita S.', 
    email: 'sunita@example.com', avatar: 'https://picsum.photos/100/100?random=502', 
    coverPhoto: 'https://picsum.photos/1600/400?random=802', isVerified: true,
    weTubeVerificationStatus: 'verified',
    status: 'online',
    address: { city: 'Delhi', state: 'Delhi', country: 'India'},
    platformRole: PlatformRole.DigitalWorker,
    experience: 8,
    bio: 'Top network marketer and content creator.',
    languages: ['Hindi', 'English'], skills: ['Marketing', 'Writing'],
    socials: {},
    mlm: { level: 'Platinum', teamSize: 500, achievements: [] }
  },
  { 
    id: 'profile-3', userId: 'user-mlm-3', fullName: 'Amit Singh', displayName: 'Amit Singh', 
    email: 'amit@example.com', avatar: 'https://picsum.photos/100/100?random=503', 
    coverPhoto: 'https://picsum.photos/1600/400?random=803', isVerified: false,
    weTubeVerificationStatus: 'unverified',
    status: '2h ago',
    address: { city: 'Bangalore', state: 'Karnataka', country: 'India'},
    platformRole: PlatformRole.Artist,
    experience: 3,
    bio: 'Rising star in the network marketing world.',
    languages: ['Hindi', 'English'], skills: ['Design', 'Social Media'],
    socials: {},
    mlm: { level: 'Silver', teamSize: 45, achievements: [] },
    artist: {
      primaryCategory: ArtistCategory.GraphicDesigner,
      secondaryCategories: [ArtistCategory.DigitalArtist],
      performanceType: ['Online'],
      genres: ['Corporate', 'Minimalist'],
      specialties: ['Logo Design', 'Branding'],
      eventTypes: [],
      tags: ['clean', 'modern'],
      availableForBooking: true,
      travelReady: false,
      rate: '₹2,000/hr',
      achievements: ['Logo Design Contest Winner 2023'],
    },
  },
];


export const MOCK_MLM_GROUPS: MLMGroup[] = [
    { id: 'grp1', name: 'Mumbai Achievers', icon: 'https://picsum.photos/100/100?random=601', memberCount: 1250 },
    { id: 'grp2', name: 'Wellness Warriors', icon: 'https://picsum.photos/100/100?random=602', memberCount: 850 },
    { id: 'grp3', name: 'Financial Freedom Club', icon: 'https://picsum.photos/100/100?random=603', memberCount: 2400 },
];

const SAMPLE_PDF_URL = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

export const MOCK_MLM_POSTS: MLMPost[] = [
    {
        id: 'post1',
        profile: USER_PROFILES[2],
        createdAt: '2 hours ago',
        title: 'Revolutionary Wellness Product Launch!',
        description: 'Join us for the launch of our new line of organic wellness products. This is a game-changer for the health industry and a golden opportunity for our partners. This plan offers a 5-tier commission structure, quarterly bonuses, and international travel incentives for top performers. We provide comprehensive training and marketing materials to ensure your success.',
        images: ['https://picsum.photos/800/500?random=701', 'https://picsum.photos/800/500?random=702'],
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        pdfUrl: SAMPLE_PDF_URL,
        stats: { likes: 128, shares: 34, comments: 12 },
    },
    {
        id: 'post2',
        profile: USER_PROFILES[1],
        createdAt: '1 day ago',
        title: 'Unlock Financial Freedom with Our Fintech Plan',
        description: 'Tired of the 9-to-5 grind? Our fintech solution empowers people to manage their finances and earn passive income. No prior experience needed, just a passion for growth. We offer a binary compensation plan that is easy to understand and powerful to earn from.',
        images: ['https://picsum.photos/800/500?random=703'],
        pdfUrl: SAMPLE_PDF_URL,
        stats: { likes: 95, shares: 12, comments: 8 },
    },
    {
        id: 'post3',
        profile: USER_PROFILES[3],
        createdAt: '3 days ago',
        title: 'My Journey from Zero to Hero - You can do it too!',
        description: 'Just three months ago, I was struggling. Today, I lead a team of 45 and have achieved my first major milestone. This is not just about selling; it\'s about building a community and empowering each other. If I can do it, so can you. Ask me how!',
        images: [],
        youtubeUrl: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
        stats: { likes: 250, shares: 80, comments: 45 },
    },
    {
        id: 'post4-user',
        profile: CURRENT_USER_PROFILE,
        createdAt: '5 days ago',
        title: 'Looking for motivated individuals in Pune!',
        description: 'My team is expanding and I\'m looking for 5 motivated people from Pune to join my wellness product team. Full training provided. Let\'s connect and grow together.',
        images: ['https://picsum.photos/800/500?random=704'],
        pdfUrl: SAMPLE_PDF_URL,
        stats: { likes: 45, shares: 8, comments: 3 },
    },
];

// --- WETUBE CONSTANTS ---
export const MOCK_VIDEOS: Video[] = [
  {
    id: 'vid1',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/watch?v=mP0SGoN3I3w', // Blender Open Movie
    embedUrl: 'https://www.youtube.com/embed/mP0SGoN3I3w',
    mediaUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Custom player fallback
    thumbnailUrl: 'https://i.ytimg.com/vi/mP0SGoN3I3w/maxresdefault.jpg',
    duration: '12:14',
    uploadDate: 'Apr 2, 2018',
    submittedBy: 'profile-2',
    submittedAt: '3 days ago',
    creator: { id: 'Blender', name: 'Blender', avatar: 'https://picsum.photos/100/100?random=305', subscribers: '1.5M', isVerified: true },
    title: 'Agent 327: Operation Barbershop',
    description: 'Agent 327 is a comic series by Dutch artist Martin Lodewijk. This animated film is a teaser for a feature film adaptation, created by Blender Animation Studio.',
    hashtags: ['#blender', '#animation', '#shortfilm'],
    stats: { views: 5700000, likes: 230000, dislikes: 2200, comments: 8000, shares: 15000 },
    status: 'approved',
    category: 'Entertainment',
  },
  {
    id: 'vid2',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/watch?v=BBbg_wS-d9s', // Creative Commons Travel
    embedUrl: 'https://www.youtube.com/embed/BBbg_wS-d9s',
    mediaUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', // Custom player fallback
    thumbnailUrl: 'https://i.ytimg.com/vi/BBbg_wS-d9s/maxresdefault.jpg',
    duration: '3:21',
    uploadDate: 'Oct 2, 2023',
    submittedBy: 'profile-3',
    submittedAt: '1 week ago',
    creator: { id: 'TravelVibes', name: 'Travel Vibes', avatar: 'https://picsum.photos/100/100?random=302', subscribers: '850K', isVerified: false },
    title: 'A Cinematic Journey Through Iceland',
    description: 'Exploring the stunning landscapes of Iceland. From majestic waterfalls to volcanic terrains, a journey you will never forget. Shot on Sony A7III.',
    hashtags: ['#iceland', '#travel', '#cinematic'],
    stats: { views: 1200000, likes: 95000, dislikes: 1500, comments: 3200, shares: 9800 },
    status: 'approved',
    category: 'Vlogs',
  },
];

export const MOCK_SHORTS: Video[] = [
  {
    id: 'short1',
    type: 'short',
    youtubeUrl: 'https://www.youtube.com/shorts/some-short-id-1',
    embedUrl: 'https://www.youtube.com/embed/O-XID86rl6g',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-a-girl-in-a-leather-jacket-at-a-bar-4210-large.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/short1/225/400',
    duration: '0:15',
    uploadDate: '3 days ago',
    submittedBy: 'profile-1',
    submittedAt: '2 days ago',
    creator: { id: 'creator1', name: 'StyleVibes', avatar: 'https://picsum.photos/100/100?random=301', subscribers: '1.2M', isVerified: true },
    title: 'Night Out Aesthetics ✨',
    description: 'Capturing the city vibes after dark.',
    hashtags: ['#fashion', '#nightlife', '#cityaesthetic'],
    stats: { views: 2300000, likes: 134000, dislikes: 2100, comments: 1250, shares: 4500 },
    status: 'approved',
    category: 'Lifestyle',
  },
  {
    id: 'short2',
    type: 'short',
    youtubeUrl: 'https://www.youtube.com/shorts/some-short-id-2',
    embedUrl: 'https://www.youtube.com/embed/fM5q_JMB3a4',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-in-a-red-dress-dancing-in-a-meadow-4222-large.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/short2/225/400',
    duration: '0:22',
    uploadDate: '1 week ago',
    submittedBy: 'profile-current',
    submittedAt: '5 days ago',
    creator: { id: 'creator4', name: 'ZenFlow', avatar: 'https://picsum.photos/100/100?random=304', subscribers: '450K', isVerified: false },
    title: 'Morning Yoga Routine 🙏',
    description: 'Start your day with peace and mindfulness.',
    hashtags: ['#yoga', '#mindfulness', '#wellness'],
    stats: { views: 890000, likes: 95000, dislikes: 800, comments: 950, shares: 3200 },
    status: 'approved',
    category: 'Lifestyle',
  },
    {
    id: 'short3',
    type: 'short',
    youtubeUrl: 'https://www.youtube.com/shorts/some-short-id-3',
    embedUrl: 'https://www.youtube.com/embed/rp3cE0wK5G0',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-with-a-white-hat-at-a-fruit-stand-4225-large.mp4',
    thumbnailUrl: 'https://picsum.photos/seed/short3/225/400',
    duration: '0:30',
    uploadDate: '2 days ago',
    submittedBy: 'profile-3',
    submittedAt: '1 day ago',
    creator: { id: 'creator5', name: 'CodeWizard', avatar: 'https://picsum.photos/100/100?random=305', subscribers: '980K', isVerified: true },
    title: '30 seconds of pure coding bliss',
    description: 'Building the next big thing.',
    hashtags: ['#coding', '#developer', '#programming'],
    stats: { views: 1800000, likes: 180000, dislikes: 1200, comments: 2100, shares: 7600 },
    status: 'approved',
    category: 'Tech',
  },
];

export const MOCK_COMMENTS: Comment[] = [
  {
    id: 'comment1',
    user: { name: 'CreativeMind', avatar: 'https://picsum.photos/seed/user1/40/40' },
    text: 'This is such an inspiring video! The editing is top-notch.',
    timestamp: '2 days ago',
    likes: 24,
    replies: [
        {
            id: 'reply1-1',
            user: { name: 'StyleVibes', avatar: 'https://picsum.photos/100/100?random=301' },
            text: 'Thank you so much! Glad you liked it.',
            timestamp: '2 days ago',
            likes: 5,
        }
    ]
  },
  {
    id: 'comment2',
    user: { name: 'TravelBug', avatar: 'https://picsum.photos/seed/user2/40/40' },
    text: 'Wow, the cinematography is breathtaking! Makes me want to book a flight right now. What camera did you use?',
    timestamp: '1 day ago',
    likes: 15,
  },
  {
    id: 'comment3',
    user: { name: 'MusicLover', avatar: 'https://picsum.photos/seed/user3/40/40' },
    text: 'The soundtrack is perfect. Can anyone tell me the name of the song?',
    timestamp: '18 hours ago',
    likes: 8,
  }
];

// --- STUDIO PLATFORM CONSTANTS ---
const MOCK_STUDIO_REVIEWS: StudioReview[] = [
    { id: 'r1', author: { name: 'Rohan Mehta', avatar: 'https://picsum.photos/seed/r1/40/40' }, rating: 5, date: '2 weeks ago', comment: 'Absolutely phenomenal acoustics! The sound engineer was a pro. Will definitely be back.' },
    { id: 'r2', author: { name: 'Priya Sharma', avatar: 'https://picsum.photos/seed/r2/40/40' }, rating: 4, date: '1 month ago', comment: 'Great vibe and good equipment. The AC could have been a bit stronger, but overall a fantastic experience.'},
    { id: 'r3', author: { name: 'DJ Ace', avatar: 'https://picsum.photos/seed/r3/40/40' }, rating: 5, date: '3 months ago', comment: 'The isolation booth is top-notch. Perfect for recording vocals without any bleed. Highly recommend.'}
];

export const MOCK_STUDIOS: Studio[] = [
    { 
        id: 'studio-1',
        ownerId: 'profile-1',
        name: "SoundWave Studios", 
        type: 'Recording',
        location: "Mumbai, Andheri West", 
        address: "123, Sound Lane, Andheri West, Mumbai, Maharashtra 400053",
        coverPhoto: "https://picsum.photos/seed/s1-cover/1600/900",
        gallery: [
            "https://picsum.photos/seed/s1-g1/800/600",
            "https://picsum.photos/seed/s1-g2/800/600",
            "https://picsum.photos/seed/s1-g3/800/600",
            "https://picsum.photos/seed/s1-g4/800/600",
        ],
        description: "SoundWave is a state-of-the-art recording facility in the heart of Mumbai. Designed by leading acousticians, our studio offers a pristine audio environment for everything from solo vocal tracking to full band recordings.",
        equipment: [
            { name: "Neumann U87 Microphone", brand: "Neumann" },
            { name: "SSL Duality Console", brand: "Solid State Logic" },
            { name: "Yamaha NS-10 Monitors", brand: "Yamaha" },
            { name: "Pro Tools HDX System", brand: "Avid" },
        ],
        amenities: ["Air Conditioning", "Wi-Fi", "Lounge Area", "Parking", "Sound Engineer available"],
        pricing: { hourly: 1200, daily: 8000, notes: "Engineer fees are ₹500/hr extra. GST applicable." },
        rating: 4.8, 
        totalReviews: 45,
        reviews: MOCK_STUDIO_REVIEWS
    },
    { 
        id: 'studio-2',
        ownerId: 'profile-2',
        name: "Pixel Perfect Visuals", 
        type: 'Video',
        location: "Delhi, South Ex", 
        address: "45, Creative Block, South Extension II, New Delhi, Delhi 110049",
        coverPhoto: "https://picsum.photos/seed/s2-cover/1600/900",
        gallery: ["https://picsum.photos/seed/s2-g1/800/600"],
        description: "A fully equipped video production studio with a green screen cyclorama, professional lighting grid, and multiple backdrops. Ideal for music videos, interviews, and product shoots.",
        equipment: [
            { name: "RED Komodo 6K Camera", brand: "RED" },
            { name: "Aputure 600d Pro Lights", brand: "Aputure" },
            { name: "Sennheiser MKH 416 Mic", brand: "Sennheiser" },
        ],
        amenities: ["Green Screen", "Makeup Room", "Wi-Fi", "Parking"],
        pricing: { hourly: 2000, daily: 15000 },
        rating: 4.9, 
        totalReviews: 32,
        reviews: [MOCK_STUDIO_REVIEWS[0]]
    },
    { 
        id: 'studio-3',
        ownerId: 'profile-3',
        name: "The Jam Pad", 
        type: 'Jam Room',
        location: "Bangalore, Indiranagar", 
        address: "88, 12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
        coverPhoto: "https://picsum.photos/seed/s3-cover/1600/900",
        gallery: [],
        description: "An acoustically treated jam room for bands and musicians. Comes with a full backline including a drum kit, guitar amps, and a bass amp. Just plug in and play!",
        equipment: [
            { name: "Pearl Export Drum Kit", brand: "Pearl" },
            { name: "Fender Twin Reverb Amp", brand: "Fender" },
            { name: "Ampeg SVT Bass Amp", brand: "Ampeg" },
        ],
        amenities: ["Air Conditioning", "Wi-Fi", "Soundproof"],
        pricing: { hourly: 600 },
        rating: 4.7, 
        totalReviews: 88,
        reviews: [MOCK_STUDIO_REVIEWS[1]]
    },
     { 
        id: 'studio-4',
        ownerId: 'profile-current',
        name: "Flashbulb Photo Studio", 
        type: 'Photography',
        location: "Pune, Koregaon Park", 
        address: "7, North Main Road, Koregaon Park, Pune, Maharashtra 411001",
        coverPhoto: "https://picsum.photos/seed/s4-cover/1600/900",
        gallery: ["https://picsum.photos/seed/s4-g1/800/600", "https://picsum.photos/seed/s4-g2/800/600"],
        description: "A spacious photography studio with a variety of backdrops and professional lighting equipment. Perfect for fashion, portrait, and product photography.",
        equipment: [
            { name: "Profoto D2 Strobes", brand: "Profoto" },
            { name: "Canon EOS R5", brand: "Canon" },
            { name: "Multiple C-Stands & Modifiers", brand: "Various" },
        ],
        amenities: ["Air Conditioning", "Wi-Fi", "Makeup Station", "Changing Room", "Parking"],
        pricing: { hourly: 1000, daily: 7000 },
        rating: 4.9, 
        totalReviews: 55,
        reviews: []
    },
];

// --- NGO / SHG MOCK DATA ---
export const MOCK_NGO_SHG_GROUPS: NgoShgGroup[] = [
  {
    id: "ngo-1",
    name: "Hope Foundation",
    type: "NGO",
    focusArea: "Education",
    location: "Mumbai, Maharashtra",
    members: 1200,
    description: "Dedicated to providing quality education to underprivileged children in urban slums. We run evening schools and scholarship programs.",
    image: "https://picsum.photos/800/600?random=901",
    contact: { email: "contact@hopefoundation.org", website: "www.hopefoundation.org" },
    isVerified: true
  },
  {
    id: "shg-1",
    name: "Mahila Shakti Group",
    type: "SHG",
    focusArea: "Women Empowerment",
    location: "Pune, Maharashtra",
    members: 45,
    description: "A collective of women artisans creating sustainable handicrafts and organic products. Empowering women through financial independence.",
    image: "https://picsum.photos/800/600?random=902",
    contact: { phone: "+91 98765 43210" },
    isVerified: true
  },
  {
    id: "ngo-2",
    name: "Green Earth Alliance",
    type: "NGO",
    focusArea: "Environment",
    location: "Bangalore, Karnataka",
    members: 3500,
    description: "Working towards a greener planet through tree plantation drives, waste management awareness, and sustainable living workshops.",
    image: "https://picsum.photos/800/600?random=903",
    contact: { email: "info@greenearth.org", website: "www.greenearth.org" },
    isVerified: true
  },
  {
    id: "shg-2",
    name: "Gramin Vikas Samiti",
    type: "SHG",
    focusArea: "Rural Development",
    location: "Nashik, Maharashtra",
    members: 80,
    description: "Improving rural infrastructure and supporting local farmers with modern agricultural techniques and micro-finance.",
    image: "https://picsum.photos/800/600?random=904",
    contact: { phone: "+91 87654 32109" },
    isVerified: false
  },
  {
    id: "ngo-3",
    name: "Animal Rescue Corps",
    type: "NGO",
    focusArea: "Animal Welfare",
    location: "Delhi, NCR",
    members: 600,
    description: "Rescuing and rehabilitating stray animals. We operate shelters, run adoption drives, and provide emergency medical aid.",
    image: "https://picsum.photos/800/600?random=905",
    contact: { email: "rescue@arc.org", website: "www.arc.org" },
    isVerified: true
  }
];

// --- MUSIC INDUSTRY MOCK DATA ---
export const MOCK_MUSIC_PRODUCTS: MusicProduct[] = [
  {
    id: 'mp1',
    name: 'Fender Stratocaster Electric Guitar',
    category: 'Guitars',
    price: 45000,
    type: 'Sale',
    condition: 'Used',
    image: 'https://picsum.photos/seed/guitar/600/600',
    description: 'Classic sunburst finish, 2018 model. Excellent condition with minimal wear. Includes gig bag.',
    seller: 'Rahul Music',
    location: 'Mumbai',
    status: 'Available'
  },
  {
    id: 'mp2',
    name: 'Roland XPS-10 Keyboard',
    category: 'Keyboards',
    price: 800,
    type: 'Rent',
    condition: 'Used',
    image: 'https://picsum.photos/seed/keyboard/600/600',
    description: 'Perfect for live performances. Rent per day. Comes with stand and adapter.',
    seller: 'SoundHire Rentals',
    location: 'Delhi',
    status: 'Available'
  },
  {
    id: 'mp3',
    name: 'Shure SM58 Microphone',
    category: 'Microphones',
    price: 7500,
    type: 'Sale',
    condition: 'New',
    image: 'https://picsum.photos/seed/mic/600/600',
    description: 'Brand new in box. Industry standard dynamic vocal microphone.',
    seller: 'Pro Audio Store',
    location: 'Bangalore',
    status: 'Available'
  },
  {
    id: 'mp4',
    name: 'JBL EON615 PA System',
    category: 'Speakers',
    price: 2500,
    type: 'Rent',
    condition: 'Used',
    image: 'https://picsum.photos/seed/speaker/600/600',
    description: 'Pair of 15-inch active speakers. Ideal for small to medium venues. Rent per day.',
    seller: 'Event Audio Solutions',
    location: 'Pune',
    status: 'Available'
  },
  {
    id: 'mp5',
    name: 'Acoustic Foam Panels (Pack of 12)',
    category: 'Studio Equipment',
    price: 1800,
    type: 'Sale',
    condition: 'New',
    image: 'https://picsum.photos/seed/foam/600/600',
    description: 'High density charcoal foam for soundproofing studios. Easy to install.',
    seller: 'Studio Acoustics',
    location: 'Chennai',
    status: 'Available'
  }
];

// --- CHAT PLATFORM CONSTANTS ---
export const MOCK_CHATS: ChatConversation[] = [
  {
    id: 'chat-1',
    participantIds: ['profile-current', 'profile-1'],
    messages: [
      { id: 'msg-1-1', senderId: 'profile-1', text: 'Hey Aarav, saw your latest post. Great work!', timestamp: '2h ago', isRead: true },
      { id: 'msg-1-2', senderId: 'profile-current', text: 'Thanks Rajesh! Appreciate you checking it out.', timestamp: '1h ago', isRead: true },
      { id: 'msg-1-3', senderId: 'profile-1', text: 'Of course. I have a question about the compensation plan you shared. Do you have a moment?', timestamp: '5m ago', isRead: false },
    ],
  },
  {
    id: 'chat-2',
    participantIds: ['profile-current', 'profile-2'],
    messages: [
      { id: 'msg-2-1', senderId: 'profile-current', text: 'Hi Sunita, your content is amazing! Really inspiring stuff.', timestamp: '1d ago', isRead: true },
      { id: 'msg-2-2', senderId: 'profile-2', text: 'Thank you so much, Aarav! That means a lot coming from you.', timestamp: '23h ago', isRead: true },
    ],
  },
  {
    id: 'chat-3',
    participantIds: ['profile-current', 'profile-3'],
    messages: [
       { id: 'msg-3-1', senderId: 'profile-3', text: 'Hey! Are you free to collaborate on a design project?', timestamp: '3d ago', isRead: true },
    ],
  }
];
