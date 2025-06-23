'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Artist } from '@/data/mockData';
import { MapPin, DollarSign, Star, Languages, Heart, Eye, Sparkles, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

interface ArtistCardProps {
  artist: Artist;
  onQuoteRequest?: (artistId: string) => void;
  variant?: 'grid' | 'list';
}

/**
 * Gallery-style Artist Card component with artistic design
 * Features glassmorphism, creative layouts, and gallery aesthetics
 */
export default function ArtistCard({ artist, onQuoteRequest, variant = 'grid' }: ArtistCardProps) {
  const handleQuoteRequest = () => {
    if (onQuoteRequest) {
      onQuoteRequest(artist.id);
    } else {
      // Default behavior - could open a modal or navigate to contact form
      alert(`Quote request for ${artist.name} - This would typically open a contact form.`);
    }
  };

  // Creative gradient combinations for each artist
  const gradients = [
    'from-pink-400 via-purple-500 to-indigo-600',
    'from-yellow-400 via-orange-500 to-red-600',
    'from-green-400 via-blue-500 to-purple-600',
    'from-indigo-400 via-purple-500 to-pink-600',
    'from-teal-400 via-cyan-500 to-blue-600',
    'from-rose-400 via-pink-500 to-purple-600',
    'from-amber-400 via-orange-500 to-pink-600',
    'from-emerald-400 via-teal-500 to-cyan-600'
  ];
  
  // Select gradient based on artist name for consistency
  const gradientIndex = artist.name.length % gradients.length;
  const artistGradient = gradients[gradientIndex];

  if (variant === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ scale: 1.01, y: -2 }}
        className="group"
      >
        <Card className="relative overflow-hidden bg-white/80 backdrop-blur-md border-2 border-purple-100 hover:border-purple-300 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl">
          {/* Artistic background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${artistGradient} rounded-full blur-3xl`} />
            <div className={`absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tl ${artistGradient} rounded-full blur-2xl`} />
          </div>
          
          <CardContent className="p-6 relative">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Artist Portrait */}
              <div className="flex-shrink-0 relative group">
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-lg">
                  {artist.profileImage ? (
                    <Image
                      src={artist.profileImage}
                      alt={`${artist.name} - ${artist.category.join(', ')}`}
                      fill
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                      sizes="128px"
                      priority={false}
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  {/* Fallback avatar - always rendered but hidden by default */}
                  <div className={`w-full h-full bg-gradient-to-br ${artistGradient} flex items-center justify-center relative ${artist.profileImage ? 'hidden' : ''}`}>
                    <span className="text-white font-bold text-3xl z-10">
                      {artist.name.charAt(0)}
                    </span>
                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                  
                  {/* Artistic overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Rating badge */}
                  {artist.rating && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2 shadow-lg">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-white fill-white" />
                        <span className="text-xs font-bold text-white">{artist.rating}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Floating sparkle */}
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-1 -left-1 text-purple-400"
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
              </div>

              {/* Artist Information */}
              <div className="flex-grow space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                      {artist.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {artist.category.map((cat, index) => (
                        <Badge 
                          key={cat} 
                          className={`bg-gradient-to-r ${gradients[index % gradients.length]} text-white border-0 px-3 py-1 rounded-full text-xs font-semibold shadow-md`}
                        >
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed line-clamp-2 text-base">
                  {artist.bio}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-purple-50 border border-purple-100">
                    <MapPin className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span className="text-purple-800 font-medium truncate">{artist.location}</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-green-50 border border-green-100">
                    <DollarSign className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-green-800 font-medium truncate">{artist.priceRange}</span>
                  </div>
                  {artist.languages.length > 0 && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-50 border border-blue-100">
                      <Languages className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span className="text-blue-800 font-medium truncate">
                        {artist.languages.slice(0, 2).join(', ')}
                        {artist.languages.length > 2 && ` +${artist.languages.length - 2}`}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex-shrink-0 flex flex-col gap-3 lg:w-40">
                <Button 
                  onClick={handleQuoteRequest}
                  disabled={!artist.availability}
                  className={`w-full py-3 px-6 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 ${
                    artist.availability 
                      ? `bg-gradient-to-r ${artistGradient} hover:shadow-xl hover:scale-105` 
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {artist.availability ? (
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      Book Artist
                    </div>
                  ) : (
                    'Unavailable'
                  )}
                </Button>
                
                <Button 
                  variant="outline"
                  className="w-full py-3 px-6 rounded-xl border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-all duration-300"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Gallery Grid layout (default)
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="h-full group"
    >
      <Card className="h-full relative overflow-hidden bg-white/90 backdrop-blur-md border-2 border-purple-100 hover:border-purple-300 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl flex flex-col">
        {/* Artistic background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${artistGradient} rounded-full blur-2xl`} />
          <div className={`absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tl ${artistGradient} rounded-full blur-3xl`} />
        </div>
        
        <CardContent className="p-0 flex-grow relative">
          {/* Hero Image Section */}
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-3xl">
            {artist.profileImage ? (
              <Image
                src={artist.profileImage}
                alt={`${artist.name} - ${artist.category.join(', ')}`}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            {/* Fallback background - always rendered but hidden by default */}
            <div className={`w-full h-full bg-gradient-to-br ${artistGradient} flex items-center justify-center relative ${artist.profileImage ? 'hidden' : ''}`}>
              <span className="text-white font-bold text-6xl z-10 drop-shadow-lg">
                {artist.name.charAt(0)}
              </span>
              <div className="absolute inset-0 bg-black/10" />
              
              {/* Floating artistic elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-4 right-4 text-white/30"
              >
                <Palette className="w-8 h-8" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute bottom-4 left-4 text-white/20"
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
            </div>
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            {/* Rating floating badge */}
            {artist.rating && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-3 shadow-lg backdrop-blur-sm"
              >
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-white fill-white" />
                  <span className="text-sm font-bold text-white">{artist.rating}</span>
                </div>
              </motion.div>
            )}
            
            {/* Availability indicator */}
            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
              artist.availability 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            } shadow-lg backdrop-blur-sm`}>
              {artist.availability ? '✨ Available' : '⏰ Busy'}
            </div>
          </div>

          {/* Artist Information */}
          <div className="p-6 space-y-4 flex-grow">
            <div className="space-y-3">
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {artist.name}
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {artist.category.map((cat, index) => (
                  <Badge 
                    key={cat} 
                    className={`bg-gradient-to-r ${gradients[index % gradients.length]} text-white border-0 px-3 py-1 rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition-shadow`}
                  >
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>

            <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
              {artist.bio}
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-50 border border-purple-100">
                <MapPin className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <span className="text-purple-800 font-medium truncate">{artist.location}</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-xl bg-green-50 border border-green-100">
                <DollarSign className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-green-800 font-medium truncate">{artist.priceRange}</span>
              </div>
              
              {artist.languages.length > 0 && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-100">
                  <Languages className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-blue-800 font-medium truncate">
                    {artist.languages.slice(0, 2).join(', ')}
                    {artist.languages.length > 2 && (
                      <span className="text-xs ml-1 px-2 py-1 bg-blue-200 rounded-full">
                        +{artist.languages.length - 2}
                      </span>
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0 relative">
          <div className="w-full space-y-3">
            <Button 
              onClick={handleQuoteRequest}
              disabled={!artist.availability}
              className={`w-full py-3 px-6 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 ${
                artist.availability 
                  ? `bg-gradient-to-r ${artistGradient} hover:shadow-xl hover:scale-105` 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {artist.availability ? (
                <div className="flex items-center justify-center gap-2">
                  <Heart className="w-4 h-4" />
                  Book This Artist
                </div>
              ) : (
                'Currently Unavailable'
              )}
            </Button>
            
            <Button 
              variant="outline"
              className="w-full py-2 px-6 rounded-xl border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-all duration-300 text-purple-700 hover:text-purple-800"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Full Profile
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
} 