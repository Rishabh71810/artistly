'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useApp } from '@/context/AppContext';
import { ArtistSubmission } from '@/data/mockData';
import { Search, Eye, CheckCircle, XCircle, Clock, Users, TrendingUp, Calendar, BarChart3, Activity, Target } from 'lucide-react';
import { motion } from 'framer-motion';
// Note: Metadata cannot be exported from client components

// Custom styles for the analytics theme
const analyticsPattern = {
  background: `
    linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%),
    radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)
  `
};

/**
 * Manager Dashboard for viewing and managing artist submissions
 * Features table view with filtering, sorting, and action management
 */
export default function DashboardPage() {
  const { submissions } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'submittedAt' | 'name' | 'rating'>('submittedAt');

  // Filter and sort submissions
  const filteredSubmissions = submissions
    .filter(submission => {
      // Search filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' || 
        submission.name.toLowerCase().includes(searchLower) ||
        submission.location.toLowerCase().includes(searchLower) ||
        submission.category.some(cat => cat.toLowerCase().includes(searchLower));
      
      // Status filter
      const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
      
      // Category filter
      const matchesCategory = categoryFilter === 'all' || 
        submission.category.includes(categoryFilter);

      return matchesSearch && matchesStatus && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'submittedAt':
        default:
          return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
      }
    });

  // Get unique categories from submissions
  const categories = Array.from(new Set(submissions.flatMap(s => s.category)));

  // Dashboard stats
  const stats = {
    total: submissions.length,
    pending: submissions.filter(s => s.status === 'pending').length,
    approved: submissions.filter(s => s.status === 'approved').length,
    rejected: submissions.filter(s => s.status === 'rejected').length
  };

  // Handle status update (in real app, this would call an API)
  const updateSubmissionStatus = (id: string, status: ArtistSubmission['status']) => {
    console.log(`Updating submission ${id} to status: ${status}`);
    // In a real application, this would update the backend
    alert(`Status updated to ${status}. In a real app, this would update the database.`);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge variant
  const getStatusBadgeVariant = (status: ArtistSubmission['status']) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  // Get status icon
  const getStatusIcon = (status: ArtistSubmission['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen relative" style={analyticsPattern}>
      {/* Professional Header */}
      <section className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white py-16 lg:py-20">
        <div className="absolute inset-0 bg-black/20" />
        {/* Subtle tech pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-blue-400 rounded-lg rotate-12" />
          <div className="absolute top-20 right-20 w-24 h-24 border border-indigo-400 rounded-full" />
          <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-purple-400 rounded-lg rotate-45" />
          <div className="absolute bottom-10 right-1/3 w-20 h-20 border border-blue-400 rounded-full" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <BarChart3 className="w-10 h-10 text-blue-400" />
              <h1 className="text-4xl md:text-6xl font-bold">
                Analytics Dashboard
              </h1>
              <Activity className="w-10 h-10 text-indigo-400" />
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Real-time insights and management tools for your artist platform
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards with Data Visualization Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="relative overflow-hidden border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      Total Artists
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stats.total}
                    </p>
                    <p className="text-sm text-green-600 mt-1">
                      +12% from last month
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                {/* Mini progress bar */}
                <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="relative overflow-hidden border-l-4 border-l-amber-500 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      Pending Review
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stats.pending}
                    </p>
                    <p className="text-sm text-amber-600 mt-1">
                      Requires attention
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center">
                    <Clock className="w-8 h-8 text-amber-600" />
                  </div>
                </div>
                {/* Mini progress bar */}
                <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="relative overflow-hidden border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      Approved Artists
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stats.approved}
                    </p>
                    <p className="text-sm text-emerald-600 mt-1">
                      Active on platform
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                  </div>
                </div>
                {/* Mini progress bar */}
                <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="relative overflow-hidden border-l-4 border-l-purple-500 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      Growth Rate
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      +12%
                    </p>
                    <p className="text-sm text-purple-600 mt-1">
                      Monthly increase
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
                {/* Mini progress bar */}
                <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Control Panel */}
        <Card className="mb-8 bg-white/90 backdrop-blur-sm shadow-xl border-t-4 border-t-indigo-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-indigo-900">
              <Target className="w-5 h-5" />
              Control Panel
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Advanced Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search submissions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-2 border-gray-200 focus:border-indigo-500 rounded-lg"
                />
              </div>

              {/* Status Filter */}
              <Select value={statusFilter || ""} onValueChange={(value: "all" | "pending" | "approved" | "rejected") => setStatusFilter(value)}>
                <SelectTrigger className="border-2 border-gray-200 focus:border-indigo-500 rounded-lg">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              {/* Category Filter */}
              <Select value={categoryFilter || ""} onValueChange={setCategoryFilter}>
                <SelectTrigger className="border-2 border-gray-200 focus:border-indigo-500 rounded-lg">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy || ""} onValueChange={(value: "submittedAt" | "name" | "rating") => setSortBy(value)}>
                <SelectTrigger className="border-2 border-gray-200 focus:border-indigo-500 rounded-lg">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="submittedAt">Latest First</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Data Table */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-t-4 border-t-slate-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Calendar className="w-5 h-5" />
              Artist Submissions Database
              <Badge variant="secondary" className="ml-2">
                {filteredSubmissions.length} records
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredSubmissions.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No submissions found
                </h3>
                <p className="text-gray-600">
                  Adjust your filters or check back later for new submissions
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-4 px-4 font-semibold text-gray-900 bg-gray-50">
                        Artist Profile
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-900 bg-gray-50">
                        Skills
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-900 bg-gray-50">
                        Market Data
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-900 bg-gray-50">
                        Status
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-900 bg-gray-50">
                        Timeline
                      </th>
                      <th className="text-right py-4 px-4 font-semibold text-gray-900 bg-gray-50">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubmissions.map((submission, index) => (
                      <motion.tr
                        key={submission.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-gray-100 hover:bg-indigo-50/50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                              {submission.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">
                                {submission.name}
                              </p>
                              <p className="text-sm text-gray-600">
                                📍 {submission.location}
                              </p>
                              {submission.rating && (
                                <p className="text-sm text-amber-600 flex items-center gap-1">
                                  ⭐ {submission.rating} rating
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1">
                            {submission.category.slice(0, 2).map((cat) => (
                              <Badge key={cat} variant="secondary" className="text-xs bg-indigo-100 text-indigo-800">
                                {cat}
                              </Badge>
                            ))}
                            {submission.category.length > 2 && (
                              <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                                +{submission.category.length - 2} more
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-900">
                              {submission.priceRange}
                            </p>
                            <p className="text-xs text-gray-600">
                              Experience: {submission.experience}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge 
                            variant={getStatusBadgeVariant(submission.status)}
                            className="flex items-center gap-1 w-fit"
                          >
                            {getStatusIcon(submission.status)}
                            {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-gray-600">
                            {formatDate(submission.submittedAt)}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => alert(`Viewing details for ${submission.name}`)}
                              className="border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            {submission.status === 'pending' && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => updateSubmissionStatus(submission.id, 'approved')}
                                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => updateSubmissionStatus(submission.id, 'rejected')}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 