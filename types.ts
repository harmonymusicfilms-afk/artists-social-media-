
export enum PlatformRole {
    JobSeeker = "Job Seeker",
    Employer = "Employer",
    Artist = "Artist",
    PerformingArtsTeacher = "Performing Arts Teacher",
    Institute = "Institute/School",
    WomanEntrepreneur = "Woman Entrepreneur",
    Student = "Student/Learner",
    TrainerCoach = "Trainer/Coach",
    Astrologer = "Astrologer",
    NGOMember = "NGO Member",
    DigitalWorker = "Digital Worker",
    MLMMember = "MLM Member",
}

export enum ArtistCategory {
  Painter = "Painter",
  Sculptor = "Sculptor",
  DigitalArtist = "Digital Artist",
  Photographer = "Photographer",
  Filmmaker = "Filmmaker",
  Musician = "Musician",
  Actor = "Actor",
  Dancer = "Dancer",
  Writer = "Writer",
  GraphicDesigner = "Graphic Designer",
  FashionDesigner = "Fashion Designer",
  InteriorDesigner = "Interior Designer",
  Architect = "Architect",
  MakeupArtist = "Makeup Artist",
  ArtDirector = "Art Director",
  Singer = "Singer",
  Anchor = "Anchor",
  DJ = "DJ",
  SoundEngineer = "Sound Engineer",
  Model = "Model",
  Influencer = "Influencer",
}

export interface User {
  id: string;
  email: string;
  name: string;
  profileId?: string; // Link to the unified user profile
  isAdmin?: boolean;
  preferences: {
    privacy: {
      mobile: boolean;
      whatsapp: boolean;
      email: boolean;
      address: boolean;
      publicProfile: boolean;
    };
    theme: 'light' | 'dark';
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ error: any }>;
  signup: (email: string, password: string, name: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  updatePreferences: (prefs: Partial<User['preferences']>) => void;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: 'Full Time' | 'Part Time' | 'Freelance' | 'Remote' | 'Contract';
  salary: string; // Display string
  minSalary: number; // For filtering
  experience: number; // In years, for filtering
  category: string;
  description: string;
  postedAt: string;
  skills: string[];
  isFeatured?: boolean;
}

// Kept for dashboard compatibility, but UserProfile is the main model
export interface Artist {
    id: string;
    name: string;
    avatar: string;
    cover: string;
    bio: string;
    stats: {
        projects: number;
        followers: string;
        following: number;
    }
}

// --- PORTFOLIO ITEM ---
export interface PortfolioItem {
  id: string;
  type: 'photo' | 'video' | 'short';
  title: string;
  caption: string;
  mediaUrl?: string; // For direct uploads (photo or video)
  youtubeUrl?: string; // For YouTube links
  thumbnailUrl: string;
}

export interface GroupMembership {
  groupId: string;
  groupName: string;
  groupImage?: string;
  role: 'Admin' | 'Member' | 'Volunteer';
  joinedDate: string;
  type: 'NGO' | 'SHG';
}

// --- UNIFIED USER PROFILE ---
export interface UserProfile {
  id: string; // Corresponds to user.profileId
  userId: string; // The owner user's ID
  isVerified: boolean;
  weTubeVerificationStatus: 'unverified' | 'pending' | 'verified';
  status: 'online' | string; // 'online' or a last seen timestamp like '5m ago'
  joinedDate: string;
  rating?: number;
  reviewCount?: number;

  // A. Personal Details
  fullName: string;
  displayName: string;
  email: string; // Read-only from User
  avatar: string;
  coverPhoto: string;
  
  // B. Location
  address: {
    country: string;
    state: string;
    city: string;
    pincode?: string;
  };

  // C. Professional Details
  platformRole: PlatformRole; // User's main role on the platform
  experience: number; // years
  bio: string;
  languages: string[];
  skills: string[];
  
  // D. Social Links
  socials: {
    whatsapp?: string;
    youtube?: string;
    youtubeLinks?: string[]; // Multiple YouTube links
    instagram?: string;
    facebook?: string;
    website?: string;
  };
  
  // E. Portfolio
  portfolio?: PortfolioItem[];

  // F. Groups
  groupMemberships?: GroupMembership[];

  // --- Module-Specific Fields ---
  
  // MLM Fields
  mlm?: {
    level: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
    teamSize: number;
    achievements: { icon: string; title: string }[];
  };

  // Artist Fields
  artist?: {
    primaryCategory: ArtistCategory;
    secondaryCategories: ArtistCategory[];
    performanceType: ('Live' | 'Studio' | 'Online')[];
    genres: string[];
    specialties: string[];
    eventTypes: string[];
    tags: string[];
    availableForBooking: boolean;
    travelReady: boolean;
    rate?: string; // New Field: e.g. "₹5000/day"
    achievements?: string[]; // New Field
  };
}


// --- CASTING PLATFORM DATA MODELS ---
export interface CastingPortfolioItem {
  id: string;
  type: 'photo' | 'video';
  url: string;
  title: string;
}

export interface CastingArtist {
  id: number;
  name: string;
  category: string;
  city: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  image: string;
  coverImage: string;
  isPlatinum: boolean;
  rating: number;
  bio: string;
  skills: string[];
  socials: { instagram?: string; youtube?: string; website?: string };
  portfolio: CastingPortfolioItem[];
}

export interface CastingProject {
  id: number;
  title: string;
  type: 'Film' | 'Ad' | 'Music Video' | 'OTT' | 'Event' | 'Reels';
  budget: string;
  location: string;
  rolesCount: number;
  agency: string;
  postedAt: string;
  description: string;
  roleRequirements: {
    ageRange: string;
    gender: string;
    skills: string[];
  };
}

export interface CastingAgency {
  id: string;
  name: string;
  location: string;
  image: string;
  description: string;
  specialties: string[];
  contact: {
      email: string;
      phone: string;
      website: string;
  };
  rating: number;
  verified: boolean;
}

// --- MLM PLATFORM DATA MODELS ---
export interface MLMGroup {
  id: string;
  name: string;
  icon: string;
  memberCount: number;
}

export interface MLMPost {
  id: string;
  profile: UserProfile;
  createdAt: string;
  title: string;
  description: string;
  images: string[];
  youtubeUrl?: string;
  pdfUrl?: string;
  stats: {
    likes: number;
    shares: number;
    comments: number;
  };
}

// --- WETUBE (YOUTUBE CLONE) DATA MODELS ---
export interface Video {
  id: string;
  type: 'video' | 'short';
  youtubeUrl: string;
  embedUrl: string; // For the iframe player
  mediaUrl?: string; // For direct video playback (shorts)
  thumbnailUrl: string;
  duration: string; // e.g., "12:45"
  uploadDate: string; // Original YT Upload Date
  submittedBy: string; // UserProfile ID
  submittedAt: string; // Platform submission date
  creator: { // Original YouTube creator
    id: string; // YouTube Channel ID
    name: string;
    avatar: string;
    subscribers: string;
    isVerified: boolean;
  };
  title: string;
  description: string;
  hashtags: string[];
  stats: {
    views: number;
    likes: number;
    dislikes: number;
    comments: number;
    shares: number;
  };
  category?: string;
  status: 'approved' | 'pending' | 'rejected';
}

export interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  text: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

// --- STUDIOS PLATFORM DATA MODELS ---
export interface StudioReview {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  rating: number;
  date: string;
  comment: string;
}

export interface Studio {
  id: string;
  ownerId: string;
  name: string;
  type: 'Recording' | 'Video' | 'Jam Room' | 'Photography' | 'Dance';
  location: string;
  address: string;
  coverPhoto: string;
  gallery: string[];
  description: string;
  equipment: { name: string, brand: string }[];
  amenities: string[];
  pricing: {
    hourly?: number;
    daily?: number;
    monthly?: number;
    notes?: string;
  };
  rating: number;
  totalReviews: number;
  reviews: StudioReview[];
}

// --- NGO / SHG DATA MODELS ---
export interface NgoShgGroup {
  id: string;
  name: string;
  type: 'NGO' | 'SHG';
  focusArea: string; // e.g., "Women Empowerment", "Education"
  location: string;
  members: number;
  description: string;
  image: string;
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  isVerified: boolean;
  ownerId?: string; // ID of the user who registered the group
}

// --- MUSIC INDUSTRY DATA MODELS ---
export type MusicCategory = 'Guitars' | 'Keyboards' | 'Drums' | 'Microphones' | 'Speakers' | 'Studio Equipment';

export interface MusicProduct {
  id: string;
  name: string;
  category: MusicCategory;
  price: number;
  type: 'Sale' | 'Rent';
  condition: 'New' | 'Used' | 'Refurbished';
  image: string;
  description: string;
  seller: string;
  location: string;
  status: 'Available' | 'Sold' | 'Rented';
}

export interface RepairRequest {
  id: string;
  item: string;
  issue: string;
  contact: string;
  status: 'Pending' | 'Approved' | 'In Progress' | 'Completed';
  date: string;
  estimatedCost?: number;
}

export interface RentalBooking {
  id: string;
  productId: string;
  productName: string;
  startDate: string;
  endDate: string;
  totalCost: number;
  status: 'Pending' | 'Active' | 'Returned';
  renterName: string;
}

export interface Transaction {
  id: string; // UTR Number
  type: 'Buy' | 'Rent' | 'Repair';
  itemId?: string; // ID of product or repair request
  itemName: string;
  amount: number;
  date: string;
  status: 'Pending' | 'Verified' | 'Rejected';
  screenshotUrl?: string; // Mocked for this demo
}

// --- CHAT PLATFORM DATA MODELS ---
export interface ChatMessage {
  id: string;
  senderId: string; // Corresponds to UserProfile.id
  text: string;
  timestamp: string; // ISO string or human-readable like "5m ago"
  isRead: boolean;
}

export interface ChatConversation {
  id: string;
  participantIds: string[];
  messages: ChatMessage[];
}

// --- DASHBOARD DATA MODELS ---
export interface Category {
  id: number;
  title: string;
  icon: string;
  desc: string;
  details: string;
  category: "Services" | "Business" | "Community" | "Learning" | "Entertainment";
  path?: string;
}

// --- DETAILED JOB MARKETPLACE MODELS ---
export interface MockFreelancer {
  id: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  hourlyRate: string;
  skills: string[];
}

export interface JobCategoryExtended {
  id: number;
  title: string;
  icon: string; // Lucide icon name
  skillsPreview: string; // Comma separated for card view
  subtitle: string;
  fullDefinition: string;
  services: string[];
  sampleFreelancers: MockFreelancer[];
}
