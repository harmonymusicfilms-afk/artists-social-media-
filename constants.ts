
import { 
  UserProfile, 
  PlatformRole, 
  ArtistCategory, 
  CastingArtist, 
  CastingProject, 
  CastingAgency,
  MLMGroup, 
  MLMPost, 
  Video, 
  Comment, 
  Studio, 
  NgoShgGroup, 
  MusicProduct, 
  ChatConversation, 
  Category,
  Job,
  JobCategoryExtended
} from './types';

// Hero Images
export const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
];

// Music Specific Categories
export const MUSIC_PRESETS = {
    vocalTypes: ["Male Singer", "Female Singer", "Classical Vocalist", "Folk Singer", "Playback Singer", "Rapper / Hip-Hop Artist"],
    instruments: ["Guitarist", "Pianist / Keyboard Player", "Drummer / Percussionist", "Violinist", "Flutist", "Tabla Player", "Sitar Player", "Harmonium Player", "Bass Guitarist"],
    genres: ["Classical", "Semi-Classical", "Folk Music", "Bollywood", "Pop Music", "Rock Music", "Jazz", "Blues", "EDM / DJ", "Hip-Hop / Rap", "Indie", "Devotional", "Ghazal"],
    roles: ["Music Composer", "Music Producer", "Lyricist", "Sound Engineer", "DJ", "Beat Producer", "Background Score Artist"],
    performanceTypes: ["Solo Artist", "Duo", "Band / Group", "Orchestra", "Choir"],
    bookingPurposes: ["Wedding Artist", "Live Concert", "Studio Recording", "Corporate Show", "Restaurant / Café", "Online / Virtual"],
    languages: ["Hindi", "English", "Punjabi", "Bhojpuri", "Rajasthani", "Gujarati", "Marathi", "Tamil", "Telugu", "Bengali", "Urdu"]
};

// Categories for Dashboard
export const CATEGORIES: Category[] = [
  { id: 1, title: "Jobs Portal", icon: "Briefcase", desc: "Find work or hire talent.", details: "Browse jobs, post vacancies, and connect with employers.", category: "Services", path: "jobs" },
  { id: 2, title: "Artists", icon: "Palette", desc: "Showcase art & connect.", details: "Portfolio management, networking, and collaboration for artists.", category: "Community", path: "artists-platform" },
  { id: 3, title: "Casting", icon: "Clapperboard", desc: "Auditions & roles.", details: "Find casting calls for movies, ads, and events.", category: "Services", path: "casting-platform" },
  { id: 4, title: "WeTube", icon: "Youtube", desc: "Video streaming platform.", details: "Share videos, shorts, and monetize your content.", category: "Entertainment", path: "we-tube" },
  { id: 5, title: "Studios", icon: "Mic", desc: "Book recording studios.", details: "Find and book studios for recording, jamming, or shooting.", category: "Services", path: "studios-platform" },
  { 
    id: 6, 
    title: "Barber Shop Booking", 
    icon: "Scissors", 
    desc: "Book or manage barber services.", 
    details: "For barbers and customers. Manage appointments, showcase styles, and get bookings online. Customers can rate and review services.",
    category: "Services",
    path: "barber-booking"
  },
  { id: 7, title: "MLM Network", icon: "Network", desc: "Grow your network.", details: "Connect with MLM professionals and grow your team.", category: "Business", path: "mlm-platform" },
  { id: 8, title: "NGO/SHG", icon: "Heart", desc: "Social welfare groups.", details: "Join or support NGOs and Self Help Groups.", category: "Community", path: "ngo-shg" },
  { id: 9, title: "Health Card", icon: "HeartPulse", desc: "Affordable healthcare.", details: "Get health cards for discounted services.", category: "Services", path: "health-card" },
  { id: 10, title: "Digital Marketing", icon: "TrendingUp", desc: "Marketing services.", details: "Hire digital marketers or learn skills.", category: "Business", path: "digital-marketing" },
  { id: 11, title: "Music Industry", icon: "Music", desc: "Buy/Sell/Rent Instruments.", details: "Marketplace for music instruments and gear.", category: "Business", path: "music-industry" },
  { id: 12, title: "Desi Didi Mart", icon: "ShoppingBag", desc: "Local products.", details: "Marketplace for homemade and local products.", category: "Business", path: "desi-didi-mart" },
  { id: 13, title: "Student Competitions", icon: "Trophy", desc: "Academic contests.", details: "Participate in quizzes and competitions.", category: "Learning", path: "student-competitions" },
];

// Mock User Profiles
export const USER_PROFILES: UserProfile[] = [
  {
    id: 'user-1',
    userId: 'u1',
    isVerified: true,
    weTubeVerificationStatus: 'verified',
    status: 'online',
    joinedDate: 'Jan 2023',
    rating: 4.8,
    reviewCount: 32,
    fullName: 'Arjun Verma',
    displayName: 'ArjunV',
    email: 'arjun@example.com',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop',
    coverPhoto: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1000&auto=format&fit=crop',
    address: { country: 'India', state: 'Maharashtra', city: 'Mumbai', pincode: '400050' },
    platformRole: PlatformRole.Artist,
    experience: 5,
    bio: 'Professional photographer and visual storyteller based in Mumbai.',
    languages: ['English', 'Hindi'],
    skills: ['Photography', 'Editing', 'Direction'],
    socials: { instagram: 'https://instagram.com', youtube: 'https://youtube.com', website: 'https://arjunverma.com' },
    portfolio: [
        { id: 'p1', type: 'photo', title: 'Urban Life', caption: 'Street photography in Mumbai', thumbnailUrl: 'https://images.unsplash.com/photo-1555896383-74b684cb3a7e?q=80&w=400&auto=format&fit=crop', mediaUrl: 'https://images.unsplash.com/photo-1555896383-74b684cb3a7e?q=80&w=1200&auto=format&fit=crop' },
        { id: 'p2', type: 'photo', title: 'Portraits', caption: 'Studio portraits', thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop', mediaUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop' }
    ],
    artist: {
        primaryCategory: ArtistCategory.Photographer,
        secondaryCategories: [ArtistCategory.DigitalArtist],
        performanceType: ['Studio'],
        genres: ['Portrait', 'Landscape'],
        specialties: ['Lighting', 'Composition'],
        eventTypes: ['Weddings', 'Events'],
        tags: ['Creative', 'Professional'],
        availableForBooking: true,
        travelReady: true,
        rate: '₹5000/hour',
        achievements: ['Best Photographer 2022']
    }
  },
  {
    id: 'user-2',
    userId: 'u2',
    isVerified: true,
    weTubeVerificationStatus: 'verified',
    status: '5m ago',
    joinedDate: 'Mar 2023',
    rating: 4.9,
    reviewCount: 56,
    fullName: 'Priya Sharma',
    displayName: 'PriyaSings',
    email: 'priya@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    coverPhoto: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop',
    address: { country: 'India', state: 'Delhi', city: 'New Delhi', pincode: '110001' },
    platformRole: PlatformRole.Artist,
    experience: 3,
    bio: 'Classical singer with a modern twist. Trained in Hindustani Classical music.',
    languages: ['Hindi', 'English', 'Punjabi'],
    skills: ['Singing', 'Composition'],
    socials: { youtube: 'https://youtube.com', instagram: 'https://instagram.com' },
    artist: {
        primaryCategory: ArtistCategory.Singer,
        secondaryCategories: [ArtistCategory.Musician],
        performanceType: ['Live', 'Online'],
        genres: ['Classical', 'Fusion', 'Bollywood'],
        specialties: ['Classical Vocalist', 'Playback Singer'],
        eventTypes: ['Concerts', 'Wedding Artist'],
        tags: ['Soulful', 'Energetic'],
        availableForBooking: true,
        travelReady: true,
        rate: '₹10000/show'
    }
  }
];

export const CURRENT_USER_PROFILE: UserProfile = USER_PROFILES[0]; // Mock current user

// Platform Roles
export const PLATFORM_ROLES = Object.values(PlatformRole);
export const ARTIST_CATEGORIES = Object.values(ArtistCategory);

export const PLATFORM_ROLE_DESCRIPTIONS: Record<string, string> = {
    [PlatformRole.JobSeeker]: "Looking for employment opportunities.",
    [PlatformRole.Employer]: "Hiring talent and posting jobs.",
    [PlatformRole.Artist]: "Showcasing creative work and portfolio.",
    [PlatformRole.PerformingArtsTeacher]: "Teaching arts and performance.",
    [PlatformRole.Institute]: "Educational institution or academy.",
    [PlatformRole.WomanEntrepreneur]: "Empowering women in business.",
    [PlatformRole.Student]: "Learning and participating in competitions.",
    [PlatformRole.TrainerCoach]: "Providing professional training.",
    [PlatformRole.Astrologer]: "Offering astrological services.",
    [PlatformRole.NGOMember]: "Working for social causes.",
    [PlatformRole.DigitalWorker]: "Freelancing in digital services.",
    [PlatformRole.MLMMember]: "Network marketing professional."
};

// Jobs Data - Detailed for "Browse Categories"
export const JOB_CATEGORIES_DATA = [
  { id: 1, title: 'Design', desc: 'UI/UX, Graphic Design', icon: 'PenTool' },
  { id: 2, title: 'Development', desc: 'Web, Mobile, Software', icon: 'Code' },
  { id: 3, title: 'Marketing', desc: 'Digital, SEO, Content', icon: 'TrendingUp' },
  { id: 4, title: 'Sales', desc: 'B2B, B2C, Retail', icon: 'Briefcase' },
  { id: 5, title: 'Writing', desc: 'Copywriting, Blogs', icon: 'FileText' },
  { id: 6, title: 'Music', desc: 'Production, Teaching', icon: 'Music' }
];

export const DETAILED_JOB_CATEGORIES: JobCategoryExtended[] = [
  { 
    id: 1, 
    title: 'Design', 
    icon: 'PenTool',
    skillsPreview: 'UI/UX, Graphic Design, Branding',
    subtitle: 'Shape brands with visual storytelling.',
    fullDefinition: 'Design category includes professionals specializing in UI/UX design, graphic design, branding, and visual communication. These experts help businesses create visually appealing, user-friendly, and brand-consistent digital and print assets.',
    services: ['Website UI Design', 'Mobile App UX', 'Logo & Brand Identity', 'Print Design (Flyers, Brochures)', 'Illustration', 'Motion Graphics'],
    sampleFreelancers: [
      { id: 'f1', name: 'Alice Chen', title: 'Senior UI/UX Designer', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop', rating: 4.9, hourlyRate: '$45/hr', skills: ['Figma', 'Prototyping'] },
      { id: 'f2', name: 'Bob Smith', title: 'Brand Identity Specialist', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop', rating: 4.8, hourlyRate: '$35/hr', skills: ['Logo Design', 'Branding'] },
      { id: 'f3', name: 'Elena Rodriguez', title: 'Illustrator & Artist', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop', rating: 5.0, hourlyRate: '$50/hr', skills: ['Illustration', 'Adobe'] }
    ]
  },
  { 
    id: 2, 
    title: 'Development', 
    icon: 'Code',
    skillsPreview: 'Web, Mobile, Software',
    subtitle: 'Build robust digital solutions.',
    fullDefinition: 'Development involves building and maintaining websites, mobile apps, and software. Developers in this category are skilled in various programming languages and frameworks to bring technical ideas to life.',
    services: ['Full Stack Web Development', 'Mobile App Development (iOS/Android)', 'Software Architecture', 'API Integration', 'CMS Development (WordPress, Shopify)', 'QA & Testing'],
    sampleFreelancers: [
      { id: 'f4', name: 'David Kim', title: 'Full Stack Developer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop', rating: 4.9, hourlyRate: '$60/hr', skills: ['React', 'Node.js'] },
      { id: 'f5', name: 'Sarah Jones', title: 'Mobile App Developer', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop', rating: 4.7, hourlyRate: '$55/hr', skills: ['Flutter', 'React Native'] },
      { id: 'f6', name: 'Michael Lee', title: 'DevOps Engineer', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop', rating: 5.0, hourlyRate: '$70/hr', skills: ['AWS', 'Docker'] }
    ]
  },
  { 
    id: 3, 
    title: 'Marketing', 
    icon: 'TrendingUp',
    skillsPreview: 'Digital, SEO, Content',
    subtitle: 'Drive growth and engagement.',
    fullDefinition: 'Marketing professionals help businesses reach their target audience, increase brand awareness, and drive sales. This category covers digital marketing, search engine optimization, content strategy, and social media management.',
    services: ['SEO Audit & Strategy', 'Social Media Management', 'Content Marketing', 'Email Marketing Campaigns', 'PPC & Paid Ads', 'Market Research'],
    sampleFreelancers: [
      { id: 'f7', name: 'Emily Wilson', title: 'Digital Marketing Strategist', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop', rating: 4.8, hourlyRate: '$40/hr', skills: ['SEO', 'Google Ads'] },
      { id: 'f8', name: 'James Brown', title: 'Social Media Manager', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop', rating: 4.6, hourlyRate: '$30/hr', skills: ['Instagram', 'LinkedIn'] },
      { id: 'f9', name: 'Sophia Garcia', title: 'Content Marketer', avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656ec?q=80&w=200&auto=format&fit=crop', rating: 4.9, hourlyRate: '$45/hr', skills: ['Copywriting', 'Blogs'] }
    ]
  },
  { 
    id: 4, 
    title: 'Sales', 
    icon: 'Briefcase',
    skillsPreview: 'B2B, B2C, Retail',
    subtitle: 'Close deals and boost revenue.',
    fullDefinition: 'Sales experts specialize in selling products and services to customers. Whether it is B2B lead generation, B2C retail sales, or telemarketing, these professionals are skilled in negotiation and relationship building.',
    services: ['Lead Generation', 'B2B Sales Strategy', 'Telemarketing & Cold Calling', 'Sales Funnel Optimization', 'Customer Relationship Management', 'Retail Sales Training'],
    sampleFreelancers: [
      { id: 'f10', name: 'Robert Taylor', title: 'Sales Consultant', avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=200&auto=format&fit=crop', rating: 4.7, hourlyRate: '$50/hr', skills: ['B2B', 'Closing'] },
      { id: 'f11', name: 'Linda Martinez', title: 'Lead Generation Specialist', avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=200&auto=format&fit=crop', rating: 4.8, hourlyRate: '$35/hr', skills: ['LinkedIn Sales', 'Email'] }
    ]
  },
  { 
    id: 5, 
    title: 'Writing', 
    icon: 'FileText',
    skillsPreview: 'Copywriting, Blogs',
    subtitle: 'Craft compelling narratives.',
    fullDefinition: 'Writers and copywriters create engaging text for various platforms. From website copy and blog posts to technical documentation and creative writing, they ensure the message is clear, persuasive, and error-free.',
    services: ['Blog & Article Writing', 'Website Copywriting', 'Technical Writing', 'Proofreading & Editing', 'Creative Writing', 'Grant Writing'],
    sampleFreelancers: [
      { id: 'f12', name: 'William Anderson', title: 'Senior Copywriter', avatar: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=200&auto=format&fit=crop', rating: 4.9, hourlyRate: '$55/hr', skills: ['SEO Writing', 'Ad Copy'] },
      { id: 'f13', name: 'Jessica Thomas', title: 'Technical Writer', avatar: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=200&auto=format&fit=crop', rating: 4.8, hourlyRate: '$45/hr', skills: ['Manuals', 'Docs'] }
    ]
  },
  { 
    id: 6, 
    title: 'Music', 
    icon: 'Music',
    skillsPreview: 'Production, Teaching',
    subtitle: 'Compose, produce, and teach audio.',
    fullDefinition: 'Music professionals offer services ranging from audio production and sound engineering to music lessons and composition. This category connects musicians, producers, and audio engineers with clients.',
    services: ['Music Production', 'Audio Mixing & Mastering', 'Voice Over', 'Music Lessons (Instrument/Vocal)', 'Sound Design', 'Composition'],
    sampleFreelancers: [
      { id: 'f14', name: 'Thomas Wright', title: 'Music Producer', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop', rating: 5.0, hourlyRate: '$65/hr', skills: ['Logic Pro', 'Mixing'] },
      { id: 'f15', name: 'Karen White', title: 'Voice Over Artist', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop', rating: 4.9, hourlyRate: '$40/hr', skills: ['Commercial', 'Narration'] }
    ]
  }
];

export const JOB_ROLES_BY_CATEGORY: Record<string, string[]> = {
    'Design': ['Graphic Designer', 'UI/UX Designer', 'Illustrator', 'Art Director'],
    'Development': ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Mobile App Developer'],
    'Marketing': ['Digital Marketer', 'SEO Specialist', 'Content Marketer', 'Social Media Manager'],
    'Sales': ['Sales Executive', 'Business Development Manager', 'Account Manager'],
    'Writing': ['Content Writer', 'Copywriter', 'Technical Writer', 'Editor'],
    'Music': ['Music Producer', 'Sound Engineer', 'Music Teacher', 'Session Musician']
};

export const MOCK_JOBS: Job[] = [
  {
    id: 1,
    title: 'Senior Graphic Designer',
    company: 'Creative Studio',
    location: 'Mumbai, India',
    type: 'Full Time',
    salary: '₹6L - ₹10L',
    minSalary: 600000,
    experience: 3,
    category: 'Design',
    description: 'Looking for an experienced graphic designer to lead our creative team.',
    postedAt: '2 days ago',
    skills: ['Photoshop', 'Illustrator', 'Figma'],
    isFeatured: true
  },
  {
    id: 2,
    title: 'React Developer',
    company: 'Tech Solutions',
    location: 'Remote',
    type: 'Contract',
    salary: '₹8L - ₹15L',
    minSalary: 800000,
    experience: 2,
    category: 'Development',
    description: 'Frontend developer needed for a 6-month contract.',
    postedAt: '1 week ago',
    skills: ['React', 'TypeScript', 'Tailwind'],
    isFeatured: true
  },
  {
    id: 3,
    title: 'Digital Marketing Manager',
    company: 'Growth Hackers',
    location: 'Bangalore, India',
    type: 'Full Time',
    salary: '₹12L - ₹18L',
    minSalary: 1200000,
    experience: 5,
    category: 'Marketing',
    description: 'Lead our digital marketing strategies.',
    postedAt: '3 days ago',
    skills: ['SEO', 'SEM', 'Analytics'],
    isFeatured: false
  }
];

// Casting Data
export const MOCK_CASTING_ARTISTS: CastingArtist[] = [
    {
        id: 1,
        name: "Rahul Sharma",
        category: "Actor",
        city: "Mumbai",
        age: 28,
        gender: "Male",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop",
        isPlatinum: true,
        rating: 4.8,
        bio: "Versatile actor with 5 years of theatre experience.",
        skills: ["Acting", "Voice Modulation", "Dancing"],
        socials: { instagram: "#", youtube: "#" },
        portfolio: [
            { id: 'cp1', type: 'photo', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop', title: 'Headshot' }
        ]
    },
    {
        id: 2,
        name: "Sneha Patel",
        category: "Model",
        city: "Delhi",
        age: 24,
        gender: "Female",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop",
        isPlatinum: false,
        rating: 4.5,
        bio: "Fashion model available for shoots and runway.",
        skills: ["Modeling", "Posing"],
        socials: { instagram: "#" },
        portfolio: []
    }
];

export const MOCK_CASTING_PROJECTS: CastingProject[] = [
    {
        id: 1,
        title: "Feature Film - 'The Journey'",
        type: "Film",
        budget: "₹2 Cr",
        location: "Mumbai",
        rolesCount: 5,
        agency: "Star Casting",
        postedAt: "1 day ago",
        description: "Looking for lead actors for an upcoming drama film.",
        roleRequirements: {
            ageRange: "20-30",
            gender: "Any",
            skills: ["Acting", "Hindi Fluency"]
        }
    },
    {
        id: 2,
        title: "TV Commercial for Soap Brand",
        type: "Ad",
        budget: "₹5 Lakh",
        location: "Delhi",
        rolesCount: 3,
        agency: "Creative Ads",
        postedAt: "3 days ago",
        description: "Family required for a soap commercial shoot.",
        roleRequirements: {
            ageRange: "25-40",
            gender: "Female",
            skills: ["Expressive"]
        }
    }
];

export const MOCK_CASTING_AGENCIES: CastingAgency[] = [
    {
        id: 'ag1',
        name: 'Star Talent Management',
        location: 'Mumbai, Maharashtra',
        image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=600&auto=format&fit=crop',
        description: 'Leading casting agency for Bollywood films and web series.',
        specialties: ['Feature Films', 'Web Series'],
        contact: {
            email: 'contact@startalent.com',
            phone: '+91 98765 43210',
            website: 'www.startalent.com'
        },
        rating: 4.8,
        verified: true
    },
    {
        id: 'ag2',
        name: 'Prime Casting Hub',
        location: 'Delhi, NCR',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop',
        description: 'Specializing in commercial ads and print shoots.',
        specialties: ['TVC', 'Print Shoots', 'Digital Ads'],
        contact: {
            email: 'hello@primecasting.in',
            phone: '+91 87654 32109',
            website: 'www.primecasting.in'
        },
        rating: 4.5,
        verified: true
    },
    {
        id: 'ag3',
        name: 'Next Gen Models',
        location: 'Bangalore, Karnataka',
        image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=600&auto=format&fit=crop',
        description: 'Agency focused on fashion modeling and runway events.',
        specialties: ['Fashion', 'Runway', 'Catalog'],
        contact: {
            email: 'info@nextgenmodels.com',
            phone: '+91 76543 21098',
            website: 'www.nextgenmodels.com'
        },
        rating: 4.2,
        verified: false
    },
    {
        id: 'ag4',
        name: 'Casting Call India',
        location: 'Hyderabad, Telangana',
        image: 'https://images.unsplash.com/photo-1554774853-719586f8c277?q=80&w=600&auto=format&fit=crop',
        description: 'Connecting regional talent with Tollywood and beyond.',
        specialties: ['Regional Cinema', 'Short Films'],
        contact: {
            email: 'casting@cci.com',
            phone: '+91 65432 10987',
            website: 'www.castingcallindia.com'
        },
        rating: 4.6,
        verified: true
    }
];

// MLM Data
export const MOCK_MLM_GROUPS: MLMGroup[] = [
    { id: 'g1', name: 'Wealth Builders', icon: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=200&auto=format&fit=crop', memberCount: 1500 },
    { id: 'g2', name: 'Future Leaders', icon: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=200&auto=format&fit=crop', memberCount: 850 }
];

export const MOCK_MLM_POSTS: MLMPost[] = [
    {
        id: 'post1',
        profile: USER_PROFILES[0],
        createdAt: '2 hours ago',
        title: 'New Diamond Plan Launch!',
        description: 'Join the new Diamond plan and earn 2x rewards. Limited time offer.',
        images: ['https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=800&auto=format&fit=crop'],
        stats: { likes: 45, shares: 12, comments: 8 }
    },
    {
        id: 'post2',
        profile: USER_PROFILES[1],
        createdAt: '5 hours ago',
        title: 'Success Story',
        description: 'Congratulations to our new Platinum members! You can be next.',
        images: [],
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        stats: { likes: 120, shares: 30, comments: 25 }
    }
];

// WeTube Data
export const MOCK_VIDEOS: Video[] = [
    {
        id: 'v1',
        type: 'video',
        youtubeUrl: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
        embedUrl: 'https://www.youtube.com/embed/LXb3EKWsInQ',
        thumbnailUrl: 'https://i.ytimg.com/vi/LXb3EKWsInQ/hqdefault.jpg',
        duration: '4:20',
        uploadDate: '2 days ago',
        submittedBy: 'user-1',
        submittedAt: '2 days ago',
        creator: { id: 'c1', name: 'Costa Rica 4K', avatar: 'https://picsum.photos/seed/costa/40/40', subscribers: '1M', isVerified: true },
        title: 'COSTA RICA IN 4K 60fps HDR (ULTRA HD)',
        description: 'Enjoy the beautiful nature of Costa Rica in 4K resolution.',
        hashtags: ['#nature', '#4k', '#travel'],
        stats: { views: 1500000, likes: 25000, dislikes: 100, comments: 500, shares: 2000 },
        category: 'Travel',
        status: 'approved',
        mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
    },
    {
        id: 'v2',
        type: 'video',
        youtubeUrl: 'https://www.youtube.com/watch?v=ysz5S6P_bsU',
        embedUrl: 'https://www.youtube.com/embed/ysz5S6P_bsU',
        thumbnailUrl: 'https://i.ytimg.com/vi/ysz5S6P_bsU/hqdefault.jpg',
        duration: '12:10',
        uploadDate: '1 week ago',
        submittedBy: 'user-2',
        submittedAt: '1 week ago',
        creator: { id: 'c2', name: 'SpaceX', avatar: 'https://picsum.photos/seed/spacex/40/40', subscribers: '5M', isVerified: true },
        title: 'Starship Flight Test',
        description: 'Starship’s first integrated flight test.',
        hashtags: ['#space', '#tech', '#science'],
        stats: { views: 5000000, likes: 100000, dislikes: 500, comments: 2000, shares: 10000 },
        category: 'Tech',
        status: 'approved'
    }
];

export const MOCK_SHORTS: Video[] = [
    {
        id: 's1',
        type: 'short',
        youtubeUrl: '',
        embedUrl: '',
        thumbnailUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&auto=format&fit=crop',
        mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        duration: '0:30',
        uploadDate: '1 day ago',
        submittedBy: 'user-1',
        submittedAt: '1 day ago',
        creator: { id: 'c1', name: 'Nature Clips', avatar: 'https://picsum.photos/seed/nature/40/40', subscribers: '500K', isVerified: false },
        title: 'Beautiful Waterfall',
        description: 'Amazing waterfall in the jungle.',
        hashtags: ['#nature', '#shorts'],
        stats: { views: 50000, likes: 2000, dislikes: 10, comments: 50, shares: 100 },
        category: 'Nature',
        status: 'approved'
    },
    {
        id: 's2',
        type: 'short',
        youtubeUrl: '',
        embedUrl: '',
        thumbnailUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop',
        mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        duration: '0:15',
        uploadDate: '3 days ago',
        submittedBy: 'user-2',
        submittedAt: '3 days ago',
        creator: { id: 'c2', name: 'Sneaker Head', avatar: 'https://picsum.photos/seed/sneaker/40/40', subscribers: '200K', isVerified: true },
        title: 'New Kicks Unboxing',
        description: 'Checking out the latest drops.',
        hashtags: ['#fashion', '#shorts'],
        stats: { views: 100000, likes: 5000, dislikes: 50, comments: 100, shares: 300 },
        category: 'Lifestyle',
        status: 'approved'
    }
];

export const MOCK_COMMENTS: Comment[] = [
    { id: 'cm1', user: { name: 'Alice', avatar: 'https://picsum.photos/seed/alice/40/40' }, text: 'Great video!', timestamp: '2 hours ago', likes: 5 },
    { id: 'cm2', user: { name: 'Bob', avatar: 'https://picsum.photos/seed/bob/40/40' }, text: 'Very informative, thanks for sharing.', timestamp: '5 hours ago', likes: 12, replies: [{ id: 'r1', user: { name: 'Creator', avatar: 'https://picsum.photos/seed/creator/40/40' }, text: 'Glad you liked it!', timestamp: '4 hours ago', likes: 2 }] }
];

// Studios Data
export const MOCK_STUDIOS: Studio[] = [
    {
        id: 'st1',
        ownerId: 'u3',
        name: 'SoundWave Studios',
        type: 'Recording',
        location: 'Mumbai, Bandra',
        address: '123 Music Lane, Bandra West',
        coverPhoto: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop',
        gallery: ['https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=400&auto=format&fit=crop'],
        description: 'Professional recording studio with top-tier equipment.',
        equipment: [{ name: 'Neumann U87', brand: 'Neumann' }, { name: 'SSL Console', brand: 'SSL' }],
        amenities: ['WiFi', 'Lounge', 'Parking'],
        pricing: { hourly: 1500, daily: 10000, monthly: 200000, notes: 'Engineer included for hourly bookings.' },
        rating: 4.9,
        totalReviews: 45,
        reviews: [
            { id: 'r1', author: { name: 'Singer A', avatar: 'https://picsum.photos/seed/singer/40/40' }, rating: 5, date: '1 month ago', comment: 'Amazing vibes and great sound!' }
        ]
    },
    {
        id: 'st2',
        ownerId: 'u4',
        name: 'Pixel Perfect Video Floor',
        type: 'Video',
        location: 'Delhi, Hauz Khas',
        address: '45 Creative Park',
        coverPhoto: 'https://images.unsplash.com/photo-1533106958155-d2d708fc72d5?q=80&w=800&auto=format&fit=crop',
        gallery: ['https://images.unsplash.com/photo-1533106958155-d2d708fc72d5?q=80&w=400&auto=format&fit=crop'],
        description: 'Spacious floor with green screen and lighting rig.',
        equipment: [{ name: 'Green Screen', brand: 'Generic' }, { name: 'Aputure Lights', brand: 'Aputure' }],
        amenities: ['Makeup Room', 'AC'],
        pricing: { hourly: 2000, daily: 15000 },
        rating: 4.7,
        totalReviews: 20,
        reviews: []
    }
];

// NGO/SHG Data
export const MOCK_NGO_SHG_GROUPS: NgoShgGroup[] = [
    {
        id: 'ng1',
        name: 'Helping Hands Foundation',
        type: 'NGO',
        focusArea: 'Education',
        location: 'Pune',
        members: 500,
        description: 'Dedicated to providing education to underprivileged children.',
        image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
        contact: { phone: '1234567890', email: 'contact@helpinghands.org', website: 'helpinghands.org' },
        isVerified: true
    },
    {
        id: 'shg1',
        name: 'Mahila Shakti Group',
        type: 'SHG',
        focusArea: 'Women Empowerment',
        location: 'Jaipur',
        members: 50,
        description: 'Empowering women through small scale businesses.',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
        contact: { phone: '9876543210' },
        isVerified: false
    }
];

// Music Products
export const MOCK_MUSIC_PRODUCTS: MusicProduct[] = [
    {
        id: 'mp1',
        name: 'Fender Stratocaster',
        category: 'Guitars',
        price: 45000,
        type: 'Sale',
        condition: 'Used',
        image: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=600&auto=format&fit=crop',
        description: 'Classic electric guitar in good condition.',
        seller: 'Guitar Shop',
        location: 'Bangalore',
        status: 'Available'
    },
    {
        id: 'mp2',
        name: 'Yamaha Drum Kit',
        category: 'Drums',
        price: 2000,
        type: 'Rent',
        condition: 'Refurbished',
        image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb4747?q=80&w=600&auto=format&fit=crop',
        description: 'Complete drum kit available for daily rent.',
        seller: 'Rental Hub',
        location: 'Mumbai',
        status: 'Available'
    }
];

// Chat Data
export const MOCK_CHATS: ChatConversation[] = [
    {
        id: 'chat1',
        participantIds: ['user-1', 'user-2'],
        messages: [
            { id: 'm1', senderId: 'user-2', text: 'Hi, I love your work!', timestamp: '2h ago', isRead: true },
            { id: 'm2', senderId: 'user-1', text: 'Thank you so much!', timestamp: '1h ago', isRead: true }
        ]
    }
];
