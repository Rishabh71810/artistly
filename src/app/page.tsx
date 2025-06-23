'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { categories } from '@/data/mockData';
import { ArrowRight, Users, Calendar, Star, CheckCircle } from 'lucide-react';

// Note: Metadata is handled in layout.tsx for this page

/**
 * Homepage component with hero section, artist categories, and platform overview
 */
export default function HomePage() {
  const categoryConfig = {
    'Singers': {
      emoji: '🎤',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center',
      gradient: 'from-pink-500/80 via-rose-500/80 to-purple-600/80',
      description: 'Melodious voices for every occasion',
      accentColor: 'pink'
    },
    'Dancers': {
      emoji: '💃',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=300&fit=crop&crop=center',
      gradient: 'from-orange-500/80 via-red-500/80 to-pink-600/80',
      description: 'Graceful movements that captivate',
      accentColor: 'orange'
    },
    'Speakers': {
      emoji: '🎙️',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop&crop=center',
      gradient: 'from-blue-500/80 via-indigo-500/80 to-purple-600/80',
      description: 'Inspiring words that motivate',
      accentColor: 'blue'
    },
    'DJs': {
      emoji: '🎧',
      image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=300&fit=crop&crop=center',
      gradient: 'from-cyan-500/80 via-blue-500/80 to-indigo-600/80',
      description: 'Beats that move the crowd',
      accentColor: 'cyan'
    },
    'Musicians': {
      emoji: '🎸',
      image: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=400&h=300&fit=crop&crop=center',
      gradient: 'from-green-500/80 via-teal-500/80 to-cyan-600/80',
      description: 'Harmonies that touch the soul',
      accentColor: 'green'
    },
    'Comedians': {
      emoji: '😄',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face',
      gradient: 'from-yellow-500/80 via-orange-500/80 to-red-600/80',
      description: 'Laughter that brightens the day',
      accentColor: 'yellow'
    },
    'Magicians': {
      emoji: '🎭',
      image: 'https://images.unsplash.com/photo-1514897575457-c4db467cf78e?w=400&h=300&fit=crop&crop=center',
      gradient: 'from-purple-500/80 via-violet-500/80 to-fuchsia-600/80',
      description: 'Wonder that sparks imagination',
      accentColor: 'purple'
    },
    'Bands': {
      emoji: '🎵',
      image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop&crop=center',
      gradient: 'from-indigo-500/80 via-purple-500/80 to-pink-600/80',
      description: 'Collective harmony in perfect sync',
      accentColor: 'indigo'
    }
  };

  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Verified Artists',
      description: 'All artists are professionally vetted and verified for quality assurance.'
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Easy Booking',
      description: 'Streamlined booking process with instant quotes and availability checking.'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Top Rated',
      description: 'Browse through highly-rated artists with authentic reviews from past events.'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Guaranteed Service',
      description: 'Your satisfaction is guaranteed with our comprehensive artist vetting process.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Verified Artists' },
    { number: '1000+', label: 'Successful Events' },
    { number: '50+', label: 'Cities Covered' },
    { number: '4.9', label: 'Average Rating' }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section className="relative animated-bg text-white py-20 lg:py-32 overflow-hidden floating-shapes">
        <div className="absolute inset-0 bg-black/20" />
        {/* Enhanced floating elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300/10 rounded-full blur-3xl pulse-glow" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-pink-300/10 rounded-full blur-3xl pulse-glow" />
        <div className="absolute top-1/3 left-1/3 w-24 h-24 bg-blue-300/10 rounded-full blur-2xl pulse-glow" />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-purple-300/10 rounded-full blur-3xl pulse-glow" />
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-green-300/10 rounded-full blur-xl pulse-glow" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Connect with
              <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
                Talented Artists
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
              The premier platform for event planners to discover and book performing artists.
              From singers to speakers, find the perfect talent for your next event.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-white/90 backdrop-blur-sm text-purple-600 hover:bg-white text-lg px-8 py-6 glass-effect">
                <Link href="/artists">
                  Browse Artists
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/50 text-white hover:bg-white/10 hover:text-white text-lg px-8 py-6 glass-effect">
                <Link href="/onboard">
                  Join as Artist
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 geometric-pattern">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artist Categories */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-purple-900/10 dark:to-gray-800 grid-pattern">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              Explore Artist Categories
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover talented performers across various categories to make your event unforgettable
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => {
              const config = categoryConfig[category as keyof typeof categoryConfig];
              
              return (
                <Link key={category} href={`/artists?category=${encodeURIComponent(category)}`}>
                  <Card className="group relative overflow-hidden cursor-pointer h-64 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img
                        src={config?.image || 'https://images.unsplash.com/photo-1514897575457-c4db467cf78e?w=400&h=300&fit=crop&crop=center'}
                        alt={`${category} performer`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.src = 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center';
                        }}
                      />
                      
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${config?.gradient || 'from-gray-900/80 to-gray-600/40'} transition-opacity duration-300`} />
                      
                      {/* Enhanced gradient on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${config?.gradient || 'from-gray-900/80 to-gray-600/40'} opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                    </div>

                    <CardContent className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                      {/* Top Section - Emoji Badge */}
                      <div className="flex justify-between items-start">
                        <div className={`
                          w-12 h-12 rounded-full flex items-center justify-center text-xl
                          bg-white/20 backdrop-blur-md border border-white/30
                          group-hover:scale-110 group-hover:rotate-12 transition-all duration-300
                          shadow-lg
                        `}>
                          {config?.emoji || '🎭'}
                        </div>
                        
                        {/* Floating Sparkles */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                        </div>
                      </div>

                      {/* Bottom Section - Content */}
                      <div className="space-y-3">
                        <div className="transform group-hover:translate-y-0 translate-y-2 transition-transform duration-300">
                          <h3 className="font-bold text-2xl mb-2 drop-shadow-lg">
                            {category}
                          </h3>
                          
                          <p className="text-sm text-white/90 leading-relaxed font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                            {config?.description || 'Talented performers for your event'}
                          </p>
                        </div>

                        {/* Action Button */}
                        <div className="flex justify-between items-end">
                          <div className={`
                            px-4 py-2 rounded-full text-xs font-semibold
                            bg-white/20 backdrop-blur-md border border-white/30
                            opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0
                            transition-all duration-500 delay-200
                          `}>
                            Explore {category}
                          </div>
                          
                          <div className="opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 delay-300">
                            <ArrowRight className="w-5 h-5 text-white drop-shadow-lg" />
                          </div>
                        </div>
                      </div>

                      {/* Animated Border Effect */}
                      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${config?.gradient || 'from-gray-400 to-gray-600'} opacity-20`} />
                        <div className="absolute inset-[2px] rounded-lg bg-transparent" />
                      </div>

                      {/* Corner Accent */}
                      <div className={`
                        absolute top-0 right-0 w-0 h-0 border-l-[60px] border-b-[60px]
                        border-l-transparent border-b-white/10
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      `} />
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-white via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/5 dark:to-gray-900 geometric-pattern">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              Why Choose Artistly?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We make it easy to find and book the perfect artist for your event
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-purple-600 dark:text-purple-400 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 glass-effect">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-gray-100">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 animated-bg text-white relative overflow-hidden floating-shapes">
        <div className="absolute inset-0 bg-black/10" />
        {/* Additional floating elements for CTA */}
        <div className="absolute top-1/4 left-1/4 w-28 h-28 bg-yellow-300/10 rounded-full blur-2xl pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-36 h-36 bg-blue-300/10 rounded-full blur-2xl pulse-glow" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Perfect Artist?
          </h2>
          <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
            Join thousands of event planners who trust Artistly to find exceptional talent for their events.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white/90 backdrop-blur-sm text-purple-600 hover:bg-white glass-effect">
              <Link href="/artists">
                Start Browsing
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/50 text-white hover:bg-white/10 hover:text-white glass-effect">
              <Link href="/onboard">
                List Your Talent
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
