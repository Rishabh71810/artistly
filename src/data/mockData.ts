// Mock data for Artistly.com

export interface Artist {
  id: string;
  name: string;
  category: string[];
  priceRange: string;
  location: string;
  bio: string;
  languages: string[];
  profileImage?: string;
  rating?: number;
  experience?: string;
  availability?: boolean;
}

export interface ArtistSubmission extends Artist {
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export const categories = [
  'Singers',
  'Dancers',
  'Speakers',
  'DJs',
  'Musicians',
  'Comedians',
  'Magicians',
  'Bands'
];

export const locations = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Surat',
  'Lucknow',
  'Kanpur',
  'Nagpur',
  'Indore',
  'Thane',
  'Bhopal',
  'Visakhapatnam',
  'Pimpri-Chinchwad',
  'Patna',
  'Vadodara'
];

export const priceRanges = [
  '₹10,000 - ₹25,000',
  '₹25,000 - ₹50,000',
  '₹50,000 - ₹1,00,000',
  '₹1,00,000 - ₹2,50,000',
  '₹2,50,000 - ₹5,00,000',
  '₹5,00,000+'
];

export const languages = [
  'Hindi',
  'English',
  'Tamil',
  'Telugu',
  'Marathi',
  'Bengali',
  'Gujarati',
  'Kannada',
  'Malayalam',
  'Punjabi',
  'Urdu',
  'Odia',
  'Assamese'
];

export const mockArtists: Artist[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    category: ['Singers', 'Musicians'],
    priceRange: '₹50,000 - ₹1,00,000',
    location: 'Mumbai',
    bio: 'Professional Bollywood and classical vocalist with 10+ years of experience in weddings and corporate events. Specializes in Hindi and Marathi songs.',
    languages: ['Hindi', 'English', 'Marathi'],
    profileImage: 'https://images.unsplash.com/photo-1574871041828-9e9d93bbcb10?w=400&h=400&fit=crop&crop=face',
    rating: 4.8,
    experience: '10+ years',
    availability: true
  },
  {
    id: '2',
    name: 'Arjun Khanna',
    category: ['DJs'],
    priceRange: '₹25,000 - ₹50,000',
    location: 'Delhi',
    bio: 'High-energy DJ specializing in Bollywood, Punjabi beats, and international music for weddings, parties, and club events with state-of-the-art equipment.',
    languages: ['Hindi', 'English', 'Punjabi'],
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    rating: 4.9,
    experience: '8 years',
    availability: true
  },
  {
    id: '3',
    name: 'Meera Nair',
    category: ['Dancers'],
    priceRange: '₹1,00,000 - ₹2,50,000',
    location: 'Bangalore',
    bio: 'Classical Bharatanatyam and contemporary dance performer, trained under renowned gurus. Perfect for cultural events and festivals.',
    languages: ['English', 'Tamil', 'Malayalam', 'Kannada'],
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
    rating: 4.7,
    experience: '15+ years',
    availability: false
  },
  {
    id: '4',
    name: 'Rahul Verma',
    category: ['Speakers', 'Comedians'],
    priceRange: '₹50,000 - ₹1,00,000',
    location: 'Pune',
    bio: 'Motivational speaker and stand-up comedian, featured in corporate events and comedy shows across India. Fluent in Hindi and English comedy.',
    languages: ['Hindi', 'English', 'Marathi'],
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    rating: 4.6,
    experience: '12 years',
    availability: true
  },
  {
    id: '5',
    name: 'Kavya Reddy',
    category: ['Singers', 'Dancers'],
    priceRange: '₹25,000 - ₹50,000',
    location: 'Hyderabad',
    bio: 'Versatile performer specializing in Telugu folk music and Kuchipudi dance, perfect for South Indian cultural events and celebrations.',
    languages: ['Telugu', 'Hindi', 'English'],
    profileImage: 'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?w=400&h=400&fit=crop&crop=face',
    rating: 4.5,
    experience: '6 years',
    availability: true
  },
  {
    id: '6',
    name: 'Aman Singh',
    category: ['Musicians', 'Bands'],
    priceRange: '₹1,00,000 - ₹2,50,000',
    location: 'Jaipur',
    bio: 'Lead guitarist and vocalist for fusion band "Raag Rock". Blends Indian classical with rock music. Available for festivals and private events.',
    languages: ['Hindi', 'English', 'Rajasthani'],
    profileImage: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=400&h=400&fit=crop&crop=face',
    rating: 4.8,
    experience: '9 years',
    availability: true
  },
  {
    id: '7',
    name: 'Shruti Patel',
    category: ['Magicians'],
    priceRange: '₹50,000 - ₹1,00,000',
    location: 'Ahmedabad',
    bio: 'Professional magician and illusionist, specializing in close-up magic and stage performances. Known for incorporating Indian themes in magic shows.',
    languages: ['Hindi', 'English', 'Gujarati'],
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
    rating: 4.9,
    experience: '7 years',
    availability: true
  },
  {
    id: '8',
    name: 'Dr. Vikram Malhotra',
    category: ['Speakers'],
    priceRange: '₹2,50,000 - ₹5,00,000',
    location: 'Mumbai',
    bio: 'Keynote speaker and business consultant, featured at top Indian corporate events and international conferences. Expert in leadership and innovation.',
    languages: ['Hindi', 'English'],
    profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
    rating: 4.7,
    experience: '20+ years',
    availability: false
  }
];

export const mockSubmissions: ArtistSubmission[] = [
  {
    ...mockArtists[0],
    submittedAt: '2024-01-15T10:30:00Z',
    status: 'approved'
  },
  {
    ...mockArtists[1],
    submittedAt: '2024-01-14T15:45:00Z',
    status: 'pending'
  },
  {
    ...mockArtists[2],
    submittedAt: '2024-01-13T09:20:00Z',
    status: 'approved'
  }
]; 