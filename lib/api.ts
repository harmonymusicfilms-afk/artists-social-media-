
import { supabase } from './supabase';
import { UserProfile, Job, PortfolioItem, Video, MLMPost, CastingProject } from '../types';
import { USER_PROFILES, MOCK_JOBS, MOCK_VIDEOS, MOCK_MLM_POSTS, MOCK_CASTING_PROJECTS } from '../constants';

// Helper to check if Supabase is connected/configured
const isSupabaseConfigured = () => {
    return !!supabase.supabaseUrl && !!supabase.supabaseKey;
};

// --- PROFILES & ARTISTS ---

export const apiFetchArtists = async (): Promise<UserProfile[]> => {
    if (!isSupabaseConfigured()) return USER_PROFILES;

    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .in('platform_role', ['Artist', 'Performing Arts Teacher', 'Trainer/Coach']);

        if (error) throw error;
        if (!data || data.length === 0) return USER_PROFILES;

        return data.map((row: any) => mapProfileFromDB(row));
    } catch (err) {
        console.error("Supabase Fetch Artists Error:", err);
        return USER_PROFILES;
    }
};

export const apiFetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
    if (!isSupabaseConfigured()) return null;

    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) return null;

        const { data: portfolioData } = await supabase
            .from('portfolio_items')
            .select('*')
            .eq('profile_id', userId);

        const profile = mapProfileFromDB(data);
        profile.portfolio = (portfolioData || []).map((p: any) => ({
            id: p.id.toString(),
            type: p.type,
            title: p.title,
            caption: p.caption,
            mediaUrl: p.media_url,
            thumbnailUrl: p.thumbnail_url,
            youtubeUrl: p.youtube_url
        }));

        return profile;
    } catch (err) {
        console.error("Error fetching user profile:", err);
        return null;
    }
};

export const apiUpdateProfile = async (userId: string, updates: Partial<UserProfile>) => {
    try {
        const dbUpdates: any = {};
        if (updates.fullName) dbUpdates.full_name = updates.fullName;
        if (updates.displayName) dbUpdates.display_name = updates.displayName;
        if (updates.bio) dbUpdates.bio = updates.bio;
        if (updates.avatar) dbUpdates.avatar_url = updates.avatar;
        if (updates.coverPhoto) dbUpdates.cover_photo_url = updates.coverPhoto;
        if (updates.platformRole) dbUpdates.platform_role = updates.platformRole;
        if (updates.experience) dbUpdates.experience = updates.experience;
        if (updates.address) {
            dbUpdates.city = updates.address.city;
            dbUpdates.state = updates.address.state;
            dbUpdates.country = updates.address.country;
        }
        if (updates.skills) dbUpdates.skills = updates.skills;
        if (updates.languages) dbUpdates.languages = updates.languages;
        if (updates.artist) dbUpdates.artist_details = updates.artist;
        if (updates.socials) dbUpdates.socials = updates.socials;

        const { error } = await supabase.from('profiles').update(dbUpdates).eq('id', userId);
        if (error) throw error;
        return { success: true };
    } catch (err) {
        console.error("Update profile error:", err);
        return { error: err };
    }
};

// --- JOBS ---

export const apiFetchJobs = async (): Promise<Job[]> => {
    if (!isSupabaseConfigured()) return MOCK_JOBS;
    try {
        const { data, error } = await supabase
            .from('jobs')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        if (!data || data.length === 0) return MOCK_JOBS;

        return data.map((row: any) => ({
            id: row.id,
            title: row.title,
            company: row.company,
            location: row.location,
            type: row.type,
            salary: row.salary_range,
            minSalary: row.min_salary || 0,
            experience: row.experience_required || 0,
            category: row.category,
            description: row.description,
            postedAt: new Date(row.created_at).toLocaleDateString(),
            skills: row.skills_required || [],
            isFeatured: row.is_featured
        }));
    } catch (err) {
        return MOCK_JOBS;
    }
};

export const apiCreateJob = async (jobData: any, userId: string) => {
    try {
        const { data, error } = await supabase.from('jobs').insert({
            owner_id: userId,
            title: jobData.title,
            company: "User Company",
            location: jobData.location,
            type: jobData.type,
            salary_range: jobData.salary,
            description: jobData.description,
            category: jobData.category,
            apply_method: jobData.applyMethod
        }).select().single();
        if (error) throw error;
        return { data };
    } catch (err) {
        return { error: err };
    }
};

// --- WETUBE VIDEOS ---

export const apiFetchVideos = async (): Promise<Video[]> => {
    if (!isSupabaseConfigured()) return MOCK_VIDEOS;
    try {
        const { data, error } = await supabase
            .from('videos')
            .select('*, creator:profiles(*)')
            .eq('video_type', 'video')
            .order('created_at', { ascending: false });

        if (error) throw error;
        if (!data || data.length === 0) return MOCK_VIDEOS;

        return data.map((row: any) => mapVideoFromDB(row));
    } catch (err) {
        return MOCK_VIDEOS;
    }
};

export const apiFetchShorts = async (): Promise<Video[]> => {
    if (!isSupabaseConfigured()) return []; // or mock shorts
    try {
        const { data, error } = await supabase
            .from('videos')
            .select('*, creator:profiles(*)')
            .eq('video_type', 'short')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data.map((row: any) => mapVideoFromDB(row));
    } catch (err) {
        return [];
    }
};

export const apiCreateVideo = async (videoData: Partial<Video>, userId: string) => {
    try {
        const { data, error } = await supabase.from('videos').insert({
            creator_id: userId,
            title: videoData.title,
            description: videoData.description,
            youtube_url: videoData.youtubeUrl,
            thumbnail_url: videoData.thumbnailUrl,
            video_type: videoData.type || 'video',
            duration: videoData.duration,
            category: videoData.category,
            status: 'pending' // Default to pending
        }).select().single();
        if (error) throw error;
        return { data };
    } catch (err) {
        return { error: err };
    }
};

// --- MLM POSTS ---

export const apiFetchMLMPosts = async (): Promise<MLMPost[]> => {
    if (!isSupabaseConfigured()) return MOCK_MLM_POSTS;
    try {
        const { data, error } = await supabase
            .from('mlm_posts')
            .select('*, profile:profiles(*)')
            .order('created_at', { ascending: false });

        if (error) throw error;
        if (!data || data.length === 0) return MOCK_MLM_POSTS;

        return data.map((row: any) => ({
            id: row.id.toString(),
            profile: mapProfileFromDB(row.profile),
            createdAt: new Date(row.created_at).toLocaleDateString(),
            title: row.title,
            description: row.description,
            images: row.image_urls || [],
            youtubeUrl: row.youtube_url,
            pdfUrl: row.pdf_url,
            stats: { likes: row.likes || 0, shares: 0, comments: 0 }
        }));
    } catch (err) {
        return MOCK_MLM_POSTS;
    }
};

export const apiCreateMLMPost = async (postData: Partial<MLMPost>, userId: string) => {
    try {
        const { data, error } = await supabase.from('mlm_posts').insert({
            user_id: userId,
            title: postData.title,
            description: postData.description,
            image_urls: postData.images,
            youtube_url: postData.youtubeUrl
        }).select().single();
        if (error) throw error;
        return { data };
    } catch (err) {
        return { error: err };
    }
};

// --- CASTING PROJECTS ---

export const apiFetchCastingProjects = async (): Promise<CastingProject[]> => {
    if (!isSupabaseConfigured()) return MOCK_CASTING_PROJECTS;
    try {
        const { data, error } = await supabase
            .from('casting_projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        if (!data || data.length === 0) return MOCK_CASTING_PROJECTS;

        return data.map((row: any) => ({
            id: row.id,
            title: row.title,
            type: row.type,
            budget: row.budget,
            location: row.location,
            rolesCount: row.roles_count || 1,
            agency: row.agency_name,
            postedAt: new Date(row.created_at).toLocaleDateString(),
            description: row.description,
            roleRequirements: row.role_requirements || { ageRange: 'Any', gender: 'Any', skills: [] }
        }));
    } catch (err) {
        return MOCK_CASTING_PROJECTS;
    }
};

// --- HELPERS ---

const mapProfileFromDB = (row: any): UserProfile => ({
    id: row.id,
    userId: row.id,
    fullName: row.full_name,
    displayName: row.display_name || row.full_name,
    email: row.email,
    avatar: row.avatar_url || 'https://via.placeholder.com/150',
    coverPhoto: row.cover_photo_url || 'https://via.placeholder.com/800x200',
    bio: row.bio || '',
    platformRole: row.platform_role,
    address: {
        city: row.city || '',
        state: row.state || '',
        country: row.country || 'India',
        pincode: ''
    },
    experience: row.experience || 0,
    skills: row.skills || [],
    languages: row.languages || [],
    isVerified: row.is_verified,
    weTubeVerificationStatus: 'unverified',
    status: 'online',
    joinedDate: new Date(row.joined_date).toLocaleDateString(),
    socials: row.socials || {},
    artist: row.artist_details || undefined
});

const mapVideoFromDB = (row: any): Video => ({
    id: row.id.toString(),
    type: row.video_type || 'video',
    youtubeUrl: row.youtube_url || '',
    embedUrl: row.youtube_url ? row.youtube_url.replace('watch?v=', 'embed/') : '', // Basic conversion
    mediaUrl: row.media_url,
    thumbnailUrl: row.thumbnail_url || 'https://via.placeholder.com/320x180',
    duration: row.duration || '0:00',
    uploadDate: new Date(row.created_at).toLocaleDateString(),
    submittedBy: row.creator_id,
    submittedAt: row.created_at,
    creator: {
        id: row.creator?.id,
        name: row.creator?.display_name || 'Unknown',
        avatar: row.creator?.avatar_url || 'https://via.placeholder.com/40',
        subscribers: '0',
        isVerified: row.creator?.is_verified || false
    },
    title: row.title,
    description: row.description,
    hashtags: [],
    stats: {
        views: row.views || 0,
        likes: row.likes || 0,
        dislikes: 0,
        comments: 0,
        shares: 0
    },
    category: row.category,
    status: row.status || 'pending'
});
