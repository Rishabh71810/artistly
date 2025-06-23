'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { useForm, Controller, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useApp } from '@/context/AppContext';
import { categories, languages, priceRanges, locations } from '@/data/mockData';
import { User, Briefcase, DollarSign, Upload, CheckCircle, Star, Heart, Zap, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

// Custom styles for the creative theme
const creativePattern = {
  background: `
    radial-gradient(circle at 10% 20%, rgba(255, 105, 180, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 90% 80%, rgba(255, 165, 0, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.05) 0%, transparent 50%),
    linear-gradient(45deg, rgba(255, 20, 147, 0.02), rgba(255, 165, 0, 0.02))
  `
};

// Validation schema using Yup
const schema = yup.object({
  name: yup.string()
    .required('Full name is required')
    .min(2, 'Name must be at least 2 characters'),
  bio: yup.string()
    .required('Bio is required')
    .min(50, 'Bio must be at least 50 characters')
    .max(500, 'Bio must not exceed 500 characters'),
  category: yup.array()
    .min(1, 'Please select at least one category')
    .required('Category is required'),
  languages: yup.array()
    .min(1, 'Please select at least one language')
    .required('Languages are required'),
  priceRange: yup.string()
    .required('Price range is required'),
  location: yup.string()
    .required('Location is required'),
  experience: yup.string()
    .required('Experience is required'),
  email: yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  phone: yup.string()
    .required('Phone number is required')
    .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number'),
  website: yup.string()
    .url('Please enter a valid URL')
    .nullable()
    .notRequired(),
  profileImage: yup.mixed().nullable(),
}).required();

type FormData = yup.InferType<typeof schema>;

/**
 * Multi-section artist onboarding form with validation
 * Uses React Hook Form with Yup for comprehensive form validation
 */
export default function OnboardPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { addSubmission } = useApp();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    watch,
    setValue,
    getValues
  } = useForm<FormData>({
    resolver: yupResolver(schema) as Resolver<FormData>,
    mode: 'onBlur',
    defaultValues: {
      name: '',
      bio: '',
      category: [],
      languages: [],
      priceRange: '',
      location: '',
      experience: '',
      email: '',
      phone: '',
      website: '',
      profileImage: undefined
    }
  });

  const sections = useMemo(() => [
    {
      title: 'Your Creative Identity',
      subtitle: 'Tell us who you are',
      icon: <User className="w-6 h-6" />,
      color: 'from-pink-500 to-rose-500',
      fields: ['name', 'email', 'phone', 'website']
    },
    {
      title: 'Your Artistic Journey',
      subtitle: 'Share your passion',
      icon: <Briefcase className="w-6 h-6" />,
      color: 'from-purple-500 to-indigo-500',
      fields: ['category', 'experience', 'bio']
    },
    {
      title: 'Your Professional Details',
      subtitle: 'Define your services',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      fields: ['priceRange', 'languages', 'location']
    },
    {
      title: 'Complete Your Profile',
      subtitle: 'Final touches',
      icon: <Upload className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      fields: ['profileImage']
    }
  ], []);

  const watchedCategories = watch('category') || [];
  const watchedLanguages = watch('languages') || [];

  // Use useCallback to prevent unnecessary re-renders
  const handleCategoryChange = useCallback((category: string, checked: boolean) => {
    const currentCategories = getValues('category') || [];
    if (checked && !currentCategories.includes(category)) {
      setValue('category', [...currentCategories, category], { shouldValidate: false, shouldDirty: true });
    } else if (!checked && currentCategories.includes(category)) {
      setValue('category', currentCategories.filter((c: string) => c !== category), { shouldValidate: false, shouldDirty: true });
    }
  }, [getValues, setValue]);

  // Use useCallback to prevent unnecessary re-renders
  const handleLanguageChange = useCallback((language: string, checked: boolean) => {
    const currentLanguages = getValues('languages') || [];
    if (checked && !currentLanguages.includes(language)) {
      setValue('languages', [...currentLanguages, language], { shouldValidate: false, shouldDirty: true });
    } else if (!checked && currentLanguages.includes(language)) {
      setValue('languages', currentLanguages.filter((l: string) => l !== language), { shouldValidate: false, shouldDirty: true });
    }
  }, [getValues, setValue]);

  // Use useCallback for file upload handler
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue('profileImage', file, { shouldValidate: true, shouldDirty: true });
    }
  }, [setValue]);

  const nextSection = useCallback(async () => {
    const currentFields = sections[currentSection].fields;
    const isCurrentSectionValid = await trigger(currentFields as (keyof FormData)[]);
    
    if (isCurrentSectionValid) {
      setCurrentSection(prev => Math.min(prev + 1, sections.length - 1));
    }
  }, [currentSection, sections, trigger]);

  const prevSection = useCallback(() => {
    setCurrentSection(prev => Math.max(prev - 1, 0));
  }, []);

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API submission delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add to submissions via context
      addSubmission({
        name: data.name,
        bio: data.bio,
        category: data.category as string[],
        languages: data.languages as string[],
        priceRange: data.priceRange,
        location: data.location,
        experience: data.experience,
        availability: true
      });
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If successfully submitted, show success screen
  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={creativePattern}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto p-8 text-center"
        >
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardContent className="pt-12 pb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="mx-auto w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Welcome to Artistly! 🎉
              </h2>
              <p className="text-gray-600 mb-6">
                Your profile has been submitted successfully. Our team will review it and get back to you within 24-48 hours.
              </p>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={() => window.location.href = '/artists'}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Browse Other Artists
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12" style={creativePattern}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Join the <span className="text-gradient">Artistly</span> Community
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Showcase your talent to thousands of event planners looking for amazing performers like you.
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex justify-between items-center max-w-2xl mx-auto">
            {sections.map((section, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold transition-all ${
                    index <= currentSection
                      ? `bg-gradient-to-r ${section.color} shadow-lg`
                      : 'bg-gray-300'
                  }`}
                >
                  {index < currentSection ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    section.icon
                  )}
                </div>
                {index < sections.length - 1 && (
                  <div
                    className={`w-16 h-1 mx-2 transition-all ${
                      index < currentSection ? 'bg-purple-500' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {sections[currentSection].title}
            </h2>
            <p className="text-gray-600">{sections[currentSection].subtitle}</p>
          </div>
        </motion.div>

        {/* Form */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Section 0: Personal Info */}
              {currentSection === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-lg font-semibold text-gray-700">Full Name *</Label>
                      <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="name"
                            placeholder="Enter your full name"
                            className={`mt-2 py-3 px-4 text-lg rounded-xl border-2 ${
                              errors.name ? 'border-red-400' : 'border-gray-200 focus:border-purple-500'
                            } bg-white/80`}
                          />
                        )}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          ⚠️ {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-lg font-semibold text-gray-700">Email Address *</Label>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="email"
                            type="email"
                            placeholder="your.email@example.com"
                            className={`mt-2 py-3 px-4 text-lg rounded-xl border-2 ${
                              errors.email ? 'border-red-400' : 'border-gray-200 focus:border-purple-500'
                            } bg-white/80`}
                          />
                        )}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          ⚠️ {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone" className="text-lg font-semibold text-gray-700">Phone Number *</Label>
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="phone"
                            placeholder="+91 98765 43210"
                            className={`mt-2 py-3 px-4 text-lg rounded-xl border-2 ${
                              errors.phone ? 'border-red-400' : 'border-gray-200 focus:border-purple-500'
                            } bg-white/80`}
                          />
                        )}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          ⚠️ {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="website" className="text-lg font-semibold text-gray-700">Website (Optional)</Label>
                      <Controller
                        name="website"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            value={field.value || ""}
                            id="website"
                            placeholder="https://yourwebsite.com"
                            className={`mt-2 py-3 px-4 text-lg rounded-xl border-2 ${
                              errors.website ? 'border-red-400' : 'border-gray-200 focus:border-purple-500'
                            } bg-white/80`}
                          />
                        )}
                      />
                      {errors.website && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          ⚠️ {errors.website.message}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Section 1: Professional Details */}
              {currentSection === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div>
                    <Label className="text-lg font-semibold text-gray-700 mb-4 block">
                      🎭 Your Art Forms * ({watchedCategories.length} selected)
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {categories.map((category) => (
                        <motion.div 
                          key={category} 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`
                            flex items-center space-x-3 p-4 rounded-xl border-2 transition-all ${
                              watchedCategories.includes(category)
                                ? 'border-purple-400 bg-purple-50'
                                : 'border-gray-200 hover:border-purple-200 bg-white'
                            }
                          `}
                        >
                          <Checkbox
                            id={`category-${category}`}
                            checked={watchedCategories.includes(category)}
                            onCheckedChange={(checked) => 
                              handleCategoryChange(category, checked as boolean)
                            }
                            className="border-purple-300"
                          />
                          <Label
                            htmlFor={`category-${category}`}
                            className="cursor-pointer font-medium"
                          >
                            {category}
                          </Label>
                        </motion.div>
                      ))}
                    </div>
                    {errors.category && (
                      <p className="text-red-500 text-sm mt-3 flex items-center gap-1">
                        ⚠️ {errors.category.message}
                      </p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="experience" className="text-lg font-semibold text-gray-700">Years of Experience *</Label>
                      <Controller
                        name="experience"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Select onValueChange={onChange} value={value || ""}>
                            <SelectTrigger className={`mt-2 py-3 px-4 text-lg rounded-xl border-2 ${
                              errors.experience ? 'border-red-400' : 'border-gray-200 focus:border-purple-500'
                            } bg-white/80`}>
                              <SelectValue placeholder="Select your experience level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-2 years">1-2 years</SelectItem>
                              <SelectItem value="3-5 years">3-5 years</SelectItem>
                              <SelectItem value="6-10 years">6-10 years</SelectItem>
                              <SelectItem value="10+ years">10+ years</SelectItem>
                              <SelectItem value="15+ years">15+ years</SelectItem>
                              <SelectItem value="20+ years">20+ years</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.experience && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          ⚠️ {errors.experience.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio" className="text-lg font-semibold text-gray-700">Your Creative Story *</Label>
                    <Controller
                      name="bio"
                      control={control}
                      render={({ field }) => (
                        <textarea
                          {...field}
                          id="bio"
                          rows={6}
                          placeholder="Tell us about your artistic journey, your style, and what makes you unique. Share any notable performances or achievements that showcase your talent..."
                          className={`mt-2 w-full px-4 py-3 text-lg border-2 rounded-xl resize-none bg-white/80 ${
                            errors.bio 
                              ? 'border-red-400 focus:border-red-500' 
                              : 'border-gray-200 focus:border-purple-500'
                          }`}
                        />
                      )}
                    />
                    <div className="flex justify-between items-center mt-2">
                      {errors.bio && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          ⚠️ {errors.bio.message}
                        </p>
                      )}
                      <p className="text-sm text-gray-500 ml-auto">
                        {watch('bio')?.length || 0}/500 characters
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Section 2: Service Details */}
              {currentSection === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="priceRange" className="text-lg font-semibold text-gray-700">Price Range *</Label>
                      <Controller
                        name="priceRange"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Select onValueChange={onChange} value={value || ""}>
                            <SelectTrigger className={`mt-2 py-3 px-4 text-lg rounded-xl border-2 ${
                              errors.priceRange ? 'border-red-400' : 'border-gray-200 focus:border-purple-500'
                            } bg-white/80`}>
                              <SelectValue placeholder="Select your price range" />
                            </SelectTrigger>
                            <SelectContent>
                              {priceRanges.map((range) => (
                                <SelectItem key={range} value={range}>
                                  {range}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.priceRange && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          ⚠️ {errors.priceRange.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="location" className="text-lg font-semibold text-gray-700">Primary Location *</Label>
                      <Controller
                        name="location"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Select onValueChange={onChange} value={value || ""}>
                            <SelectTrigger className={`mt-2 py-3 px-4 text-lg rounded-xl border-2 ${
                              errors.location ? 'border-red-400' : 'border-gray-200 focus:border-purple-500'
                            } bg-white/80`}>
                              <SelectValue placeholder="Select your primary location" />
                            </SelectTrigger>
                            <SelectContent>
                              {locations.map((location) => (
                                <SelectItem key={location} value={location}>
                                  {location}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.location && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          ⚠️ {errors.location.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label className="text-lg font-semibold text-gray-700 mb-4 block">
                      🌍 Languages You Speak * ({watchedLanguages.length} selected)
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-64 overflow-y-auto">
                      {languages.map((language) => (
                        <motion.div 
                          key={language} 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`
                            flex items-center space-x-3 p-3 rounded-xl border-2 transition-all ${
                              watchedLanguages.includes(language)
                                ? 'border-blue-400 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-200 bg-white'
                            }
                          `}
                        >
                          <Checkbox
                            id={`language-${language}`}
                            checked={watchedLanguages.includes(language)}
                            onCheckedChange={(checked) => 
                              handleLanguageChange(language, checked as boolean)
                            }
                            className="border-blue-300"
                          />
                          <Label
                            htmlFor={`language-${language}`}
                            className="cursor-pointer font-medium"
                          >
                            {language}
                          </Label>
                        </motion.div>
                      ))}
                    </div>
                    {errors.languages && (
                      <p className="text-red-500 text-sm mt-3 flex items-center gap-1">
                        ⚠️ {errors.languages.message}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Section 3: Profile Setup */}
              {currentSection === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div>
                    <Label htmlFor="profileImage" className="text-lg font-semibold text-gray-700">Profile Image (Optional)</Label>
                    <div className="mt-4 p-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                      <input
                        id="profileImage"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="profileImage"
                        className="cursor-pointer block text-center"
                      >
                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-lg font-medium text-gray-700 mb-2">
                          Click to upload your profile photo
                        </p>
                        <p className="text-sm text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </label>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Star className="w-6 h-6 text-yellow-500" />
                      Final Steps
                    </h3>
                    <div className="space-y-3 text-gray-700">
                      <div className="flex items-center gap-3">
                        <Heart className="w-5 h-5 text-red-500" />
                        <span>Review your information before submitting</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Zap className="w-5 h-5 text-yellow-500" />
                        <span>Our team will review within 24-48 hours</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Rocket className="w-5 h-5 text-blue-500" />
                        <span>Start receiving booking requests!</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevSection}
                  disabled={currentSection === 0}
                  className="px-8 py-3 text-lg border-2 border-gray-300 disabled:opacity-50"
                >
                  Previous
                </Button>

                <div className="flex gap-4">
                  {currentSection < sections.length - 1 ? (
                    <Button
                      type="button"
                      onClick={nextSection}
                      className="px-8 py-3 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Next Section
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting || !isValid}
                      className="px-8 py-3 text-lg bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Submitting...
                        </span>
                      ) : (
                        'Submit Application'
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 