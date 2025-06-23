'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Artist, ArtistSubmission } from '@/data/mockData';

interface AppContextType {
  // Theme management
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  
  // Artist filtering
  filters: {
    category: string[];
    location: string[];
    priceRange: string[];
    searchTerm: string;
  };
  setFilters: (filters: Partial<AppContextType['filters']>) => void;
  filteredArtists: Artist[];
  
  // Artist submissions
  submissions: ArtistSubmission[];
  addSubmission: (artist: Omit<ArtistSubmission, 'id' | 'submittedAt' | 'status'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [filters, setFiltersState] = useState({
    category: [] as string[],
    location: [] as string[],
    priceRange: [] as string[],
    searchTerm: ''
  });
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([]);
  const [submissions, setSubmissions] = useState<ArtistSubmission[]>([]);

  // Load artists dynamically to avoid hydration issues
  useEffect(() => {
    import('@/data/mockData').then(({ mockArtists, mockSubmissions }) => {
      setFilteredArtists(mockArtists);
      setSubmissions(mockSubmissions);
    });
  }, []);

  // Apply filters to artists
  useEffect(() => {
    import('@/data/mockData').then(({ mockArtists }) => {
      let filtered = mockArtists;

      // Filter by search term
      if (filters.searchTerm) {
        filtered = filtered.filter(artist =>
          artist.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          artist.bio.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          artist.category.some(cat => cat.toLowerCase().includes(filters.searchTerm.toLowerCase()))
        );
      }

      // Filter by category
      if (filters.category.length > 0) {
        filtered = filtered.filter(artist =>
          artist.category.some(cat => filters.category.includes(cat))
        );
      }

      // Filter by location
      if (filters.location.length > 0) {
        filtered = filtered.filter(artist =>
          filters.location.includes(artist.location)
        );
      }

      // Filter by price range
      if (filters.priceRange.length > 0) {
        filtered = filtered.filter(artist =>
          filters.priceRange.includes(artist.priceRange)
        );
      }

      setFilteredArtists(filtered);
    });
  }, [filters.searchTerm, filters.category, filters.location, filters.priceRange]);

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setFilters = (newFilters: Partial<AppContextType['filters']>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  };

  const addSubmission = (artist: Omit<ArtistSubmission, 'id' | 'submittedAt' | 'status'>) => {
    const newSubmission: ArtistSubmission = {
      ...artist,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };
    setSubmissions(prev => [newSubmission, ...prev]);
  };

  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme,
      filters,
      setFilters,
      filteredArtists,
      submissions,
      addSubmission
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 