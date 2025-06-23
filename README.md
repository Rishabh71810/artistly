# Artistly.com - Performing Artist Booking Platform

A modern web application built with Next.js 13+ that connects event planners with talented performing artists. This is a comprehensive demo showcasing best practices in React development, responsive design, and user experience.

## 🚀 Live Demo

The application is designed to be deployed on Vercel. You can run it locally using the instructions below.

## ✨ Features

### 🏠 Homepage
- Modern hero section with gradient design
- Interactive artist category cards
- Platform statistics and features overview
- Fully responsive design with mobile-first approach

### 👨‍🎨 Browse Artists Page
- **Advanced Filtering**: Filter by categories, locations, and price ranges
- **Search Functionality**: Real-time search by name, category, or description
- **Multiple Layouts**: Toggle between grid and list views
- **Sorting Options**: Sort by name, rating, or price
- **Responsive Design**: Grid converts to list on mobile devices

### 📝 Artist Onboarding Form
- **Multi-section Form**: 4-step progressive form with validation
- **React Hook Form**: Professional form handling with Yup validation
- **Multi-select Checkboxes**: Categories and languages selection
- **File Upload**: Profile image upload functionality
- **Real-time Validation**: Instant feedback on form fields
- **Form Progress**: Visual progress indicator

### 📊 Manager Dashboard
- **Artist Management**: View and manage artist submissions
- **Status Management**: Approve/reject applications
- **Advanced Filtering**: Search and filter submissions
- **Data Visualization**: Statistics cards and metrics
- **Responsive Table**: Mobile-friendly data presentation

## 🛠 Tech Stack

- **Framework**: Next.js 13+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: ShadCN UI
- **Forms**: React Hook Form + Yup validation
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Context API

## 📁 Project Structure

```
artistly/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── artists/           # Artist listing page
│   │   ├── onboard/           # Artist onboarding form
│   │   ├── dashboard/         # Manager dashboard
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Homepage
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── layout/            # Layout components
│   │   │   └── Header.tsx     # Navigation header
│   │   └── ui/                # Reusable UI components
│   │       ├── artist-card.tsx # Artist card component
│   │       └── ...            # ShadCN UI components
│   ├── context/
│   │   └── AppContext.tsx     # Global state management
│   ├── data/
│   │   └── mockData.ts        # Mock API data
│   └── lib/
│       └── utils.ts           # Utility functions
├── public/                     # Static assets
└── package.json
```

## 🎨 Key Components

### Artist Card
- **Reusable Component**: Works in both grid and list layouts
- **Responsive Design**: Adapts to different screen sizes
- **Interactive Elements**: Hover effects and animations
- **Fallback Handling**: Graceful image loading with fallbacks

### Filter System
- **Real-time Filtering**: Instant results without page reload
- **Multiple Filters**: Combine different filter types
- **Mobile Optimized**: Collapsible filter panel on mobile
- **Clear Filters**: Easy reset functionality

### Form Validation
- **Client-side Validation**: Instant feedback using Yup schema
- **Progressive Enhancement**: Step-by-step form completion
- **Error Handling**: Clear error messages and field highlighting
- **Success States**: Confirmation and success feedback

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd artistly
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
```bash
npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

Key responsive features:
- Mobile-first design approach
- Collapsible navigation menu
- Grid to list layout conversion
- Touch-friendly interactions
- Optimized typography scaling

## 🎯 Performance Optimizations

- **Next.js App Router**: Latest routing system for better performance
- **Image Optimization**: Next.js Image component with proper sizing
- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Components loaded on demand
- **Optimized Animations**: Hardware-accelerated animations with Framer Motion

## 🌙 Theme Support

The application includes:
- **Light/Dark Mode**: Toggle between themes
- **System Preference**: Respects user's system theme
- **Persistent Settings**: Theme preference saved in context
- **Smooth Transitions**: Animated theme switching

## 📊 Data Management

### Mock Data Structure
```typescript
interface Artist {
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
```

### State Management
- **React Context**: Global state for filters and submissions
- **Local State**: Component-specific state management
- **Form State**: React Hook Form for complex form handling

## 🔧 Customization

### Adding New Categories
Update the `categories` array in `src/data/mockData.ts`:
```typescript
export const categories = [
  'Singers',
  'Dancers',
  // Add new category here
];
```

### Modifying Validation Rules
Update the Yup schema in `src/app/onboard/page.tsx`:
```typescript
const schema = yup.object({
  // Add or modify validation rules
});
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Configure build settings (auto-detected for Next.js)
   - Deploy with one click

### Environment Variables
No environment variables required for the demo version.

## 🔒 Security Features

- **Input Validation**: Comprehensive form validation
- **XSS Protection**: React's built-in XSS protection
- **Type Safety**: Full TypeScript implementation
- **Error Boundaries**: Graceful error handling

## 🧪 Testing

The application includes:
- **Type Safety**: TypeScript for compile-time error checking
- **ESLint**: Code quality and consistency
- **Component Architecture**: Testable component structure

## 📈 Future Enhancements

Potential improvements for a production version:
- **Backend Integration**: Real API endpoints
- **Authentication**: User login and registration
- **Payment Processing**: Booking and payment system
- **Real-time Chat**: Artist-client communication
- **Advanced Search**: Elasticsearch integration
- **Email Notifications**: Automated email system
- **File Storage**: Cloud-based image storage

## 🤝 Contributing

This is a demo project created for assignment purposes. For suggestions or improvements:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is created for educational/assignment purposes.

## 🎯 Assignment Compliance

This project demonstrates:
- ✅ **Next.js 13+ App Router**: Latest routing system
- ✅ **React Functional Components**: All components use hooks
- ✅ **Tailwind CSS**: Utility-first styling
- ✅ **ShadCN UI**: Professional component library
- ✅ **Mobile Responsive**: Fully responsive design
- ✅ **Form Validation**: React Hook Form + Yup
- ✅ **Filtering Logic**: Advanced search and filter
- ✅ **Component Reuse**: Modular component architecture
- ✅ **SEO Optimization**: Proper meta tags and structure
- ✅ **Performance**: Optimized loading and rendering
- ✅ **Accessibility**: ARIA labels and semantic HTML
- ✅ **State Management**: Context API implementation
- ✅ **Animations**: Framer Motion transitions
- ✅ **Theme Support**: Light/dark mode toggle

---

**Built with ❤️ using modern web technologies**
#   a r t i s t l y  
 