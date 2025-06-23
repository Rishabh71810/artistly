'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import ArtistCard from '@/components/ui/artist-card';
import { useApp } from '@/context/AppContext';
import { categories, locations, priceRanges } from '@/data/mockData';
import { Search, Filter, Grid, List, X, Palette, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom styles for the artistic theme
const artisticPattern = {
  background: `
    radial-gradient(circle at 20% 80%, rgba(255, 105, 180, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(138, 43, 226, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(255, 215, 0, 0.05) 0%, transparent 50%),
    linear-gradient(135deg, rgba(255, 20, 147, 0.02), rgba(138, 43, 226, 0.02))
  `
};

/**
 * Artists listing page with filtering and layout controls
 * Implements grid and list views with responsive design
 */
function ArtistsPageContent() {
  const { filteredArtists, filters, setFilters } = useApp();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'price'>('name');
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const searchParams = useSearchParams();

  // Set initial category filter from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && !filters.category.includes(categoryParam)) {
      setFilters({ category: [categoryParam] });
    }
  }, [searchParams, filters.category, setFilters]);

  // Handle screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    // Check initially
    checkScreenSize();

    // Listen for resize events
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Handle filter changes
  const handleCategoryChange = (category: string, checked: boolean) => {
    const updatedCategories = checked
      ? [...filters.category, category]
      : filters.category.filter(c => c !== category);
    setFilters({ category: updatedCategories });
  };

  const handleLocationChange = (location: string, checked: boolean) => {
    const updatedLocations = checked
      ? [...filters.location, location]
      : filters.location.filter(l => l !== location);
    setFilters({ location: updatedLocations });
  };

  const handlePriceRangeChange = (priceRange: string, checked: boolean) => {
    const updatedPriceRanges = checked
      ? [...filters.priceRange, priceRange]
      : filters.priceRange.filter(p => p !== priceRange);
    setFilters({ priceRange: updatedPriceRanges });
  };

  const handleSearchChange = (searchTerm: string) => {
    setFilters({ searchTerm });
  };

  const clearAllFilters = () => {
    setFilters({
      category: [],
      location: [],
      priceRange: [],
      searchTerm: ''
    });
  };

  // Sort artists
  const sortedArtists = [...filteredArtists].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'price':
        // Simple price comparison - in real app would need proper price parsing
        return a.priceRange.localeCompare(b.priceRange);
      default:
        return 0;
    }
  });

  const activeFiltersCount = filters.category.length + filters.location.length + filters.priceRange.length + (filters.searchTerm ? 1 : 0);

  return (
    <div className="min-h-screen relative overflow-hidden" style={artisticPattern}>
      {/* Artistic Header */}
      <section className="relative py-24 lg:py-32">
        {/* Creative background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-20 w-64 h-64 bg-gradient-to-br from-pink-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tl from-yellow-400/15 to-orange-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-indigo-600/10 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Palette className="w-8 h-8 text-purple-600" />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                Artist Gallery
              </h1>
              <Sparkles className="w-8 h-8 text-pink-600" />
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Discover extraordinary talent in our curated collection of performing artists
            </p>
            
            {/* Artistic Search Bar */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search for artists, styles, or performances..."
                  value={filters.searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-purple-200 focus:border-purple-500 bg-white/80 backdrop-blur-sm shadow-xl"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Artistic Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <Button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                variant="outline"
                className="w-full justify-between rounded-xl border-2 border-purple-200 hover:border-purple-400 bg-white/80 backdrop-blur-sm"
              >
                <span className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Refine Your Search
                  {activeFiltersCount > 0 && (
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-xs px-2 py-1">
                      {activeFiltersCount}
                    </span>
                  )}
                </span>
                {isFilterOpen ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
              </Button>
            </div>

            {/* Filter Panel */}
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: isFilterOpen || isLargeScreen ? 1 : 0, 
                  height: isFilterOpen || isLargeScreen ? 'auto' : 0 
                }}
                exit={{ opacity: 0, height: 0 }}
                className={`${isFilterOpen ? 'block' : 'hidden'} lg:block space-y-6`}
              >
                <Card className="rounded-2xl border-2 border-purple-100 bg-white/60 backdrop-blur-md shadow-2xl">
                  <CardContent className="p-6 space-y-6">
                    {/* Category Filter */}
                    <div>
                      <Label className="text-lg font-semibold mb-4 block text-purple-800">
                        🎭 Art Forms ({filters.category.length})
                      </Label>
                      <div className="space-y-3">
                        {categories.map((category) => (
                          <motion.div 
                            key={category} 
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-purple-50 transition-colors"
                          >
                            <Checkbox
                              id={`category-${category}`}
                              checked={filters.category.includes(category)}
                              onCheckedChange={(checked) => 
                                handleCategoryChange(category, checked as boolean)
                              }
                              className="border-purple-300"
                            />
                            <Label
                              htmlFor={`category-${category}`}
                              className="text-sm cursor-pointer flex-1 font-medium"
                            >
                              {category}
                            </Label>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Location Filter */}
                    <div className="border-t border-purple-100 pt-4">
                      <Label className="text-lg font-semibold mb-4 block text-purple-800">
                        📍 Locations ({filters.location.length})
                      </Label>
                      <div className="space-y-3 max-h-48 overflow-y-auto">
                        {locations.slice(0, 10).map((location) => (
                          <motion.div 
                            key={location} 
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-purple-50 transition-colors"
                          >
                            <Checkbox
                              id={`location-${location}`}
                              checked={filters.location.includes(location)}
                              onCheckedChange={(checked) => 
                                handleLocationChange(location, checked as boolean)
                              }
                              className="border-purple-300"
                            />
                            <Label
                              htmlFor={`location-${location}`}
                              className="text-sm cursor-pointer flex-1 font-medium"
                            >
                              {location}
                            </Label>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Price Range Filter */}
                    <div className="border-t border-purple-100 pt-4">
                      <Label className="text-lg font-semibold mb-4 block text-purple-800">
                        💰 Budget ({filters.priceRange.length})
                      </Label>
                      <div className="space-y-3">
                        {priceRanges.map((range) => (
                          <motion.div 
                            key={range} 
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-purple-50 transition-colors"
                          >
                            <Checkbox
                              id={`price-${range}`}
                              checked={filters.priceRange.includes(range)}
                              onCheckedChange={(checked) => 
                                handlePriceRangeChange(range, checked as boolean)
                              }
                              className="border-purple-300"
                            />
                            <Label
                              htmlFor={`price-${range}`}
                              className="text-sm cursor-pointer flex-1 font-medium"
                            >
                              {range}
                            </Label>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Clear Filters */}
                    {activeFiltersCount > 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="border-t border-purple-100 pt-4"
                      >
                        <Button
                          onClick={clearAllFilters}
                          variant="outline"
                          className="w-full rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 hover:from-purple-100 hover:to-pink-100"
                        >
                          ✨ Clear All Filters
                        </Button>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Main Gallery Content */}
          <div className="flex-1">
            {/* Gallery Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-lg font-medium text-gray-700"
              >
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {sortedArtists.length} talented artist{sortedArtists.length !== 1 ? 's' : ''} found
                </span>
              </motion.div>
              
              <div className="flex items-center gap-4">
                {/* Sort */}
                <div className="flex items-center gap-2">
                  <Label htmlFor="sort" className="text-sm font-medium whitespace-nowrap">
                    Sort by:
                  </Label>
                  <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                    <SelectTrigger className="w-36 rounded-xl border-2 border-purple-200 bg-white/80">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Layout Toggle */}
                <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-xl p-1 border-2 border-purple-200">
                  <Button
                    variant={layout === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setLayout('grid')}
                    className={`p-2 rounded-lg ${layout === 'grid' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : ''}`}
                    aria-label="Gallery view"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={layout === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setLayout('list')}
                    className={`p-2 rounded-lg ${layout === 'list' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : ''}`}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Artists Gallery */}
            {sortedArtists.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="rounded-2xl border-2 border-purple-100 bg-white/60 backdrop-blur-md shadow-2xl">
                  <CardContent className="text-center py-16">
                    <div className="text-gray-400 mb-6">
                      <Search className="w-20 h-20 mx-auto" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                      No artists in this gallery
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
                      Try exploring different art forms or adjusting your search criteria
                    </p>
                    <Button 
                      onClick={clearAllFilters} 
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl px-8 py-3"
                    >
                      🎨 Explore All Artists
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`
                  ${layout === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8' 
                    : 'space-y-6'
                  }
                `}
              >
                {sortedArtists.map((artist, index) => (
                  <motion.div
                    key={artist.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="transform transition-all duration-300"
                  >
                    <ArtistCard
                      artist={artist}
                      variant={layout}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Artists page with Suspense wrapper for search params
 */
export default function ArtistsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-4"
          >
            <Palette className="w-full h-full text-purple-600" />
          </motion.div>
          <p className="text-xl font-medium text-purple-800">Curating our artist gallery...</p>
        </div>
      </div>
    }>
      <ArtistsPageContent />
    </Suspense>
  );
} 