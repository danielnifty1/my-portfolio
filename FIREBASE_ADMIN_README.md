# Firebase Admin Panel - Portfolio Management

This admin panel has been refactored to use **Firebase only** (no NestJS backend required). All data is stored in Firestore and images in Firebase Storage.

## 🚀 Features

### Authentication
- **Firebase Authentication** with email/password
- **Signup page** for first admin user registration
- **Login page** for existing users
- **Protected routes** with Firebase auth state checking
- **Automatic logout** functionality

### Data Management
- **Profile Management**: Store and edit personal information (firstName, lastName, email, phone, role)
- **About Me**: Manage professional biography and personal story
- **Projects**: Full CRUD operations with image uploads to Firebase Storage
  - Separate "Completed Projects" vs "Projects To Do"
  - Technology tags and links (GitHub, Live Demo)
  - Image uploads with Firebase Storage integration
- **Skills**: Manage technical skills with proficiency levels and categories

### UI/UX
- **Modern Design**: TailwindCSS + shadcn/ui components
- **Dark Mode**: Toggle between light and dark themes
- **Responsive**: Mobile-friendly sidebar navigation
- **Toast Notifications**: Success/error feedback for all operations
- **Loading States**: Proper loading indicators throughout

## 📁 Project Structure

```
src/
├── app/admin/
│   ├── login/page.tsx              # Login page
│   ├── signup/page.tsx             # Signup page (first admin)
│   ├── dashboard/
│   │   ├── page.tsx                # Profile management
│   │   ├── about/page.tsx          # About Me management
│   │   ├── projects/page.tsx       # Projects CRUD
│   │   └── skills/page.tsx         # Skills CRUD
│   └── layout.tsx                  # Admin layout with providers
├── components/admin/
│   ├── auth/protected-route.tsx    # Route protection
│   ├── layout/dashboard-layout.tsx # Dashboard layout
│   └── ui/form-components.tsx      # Reusable form components
├── contexts/
│   └── auth-context.tsx            # Firebase auth context
└── lib/
    ├── firebase.ts                 # Firebase configuration
    └── firebase-services.ts        # Firestore service functions
```

## 🔧 Setup Instructions

### 1. Firebase Configuration
Your Firebase config is already set up in `src/lib/firebase.ts`. Make sure your Firebase project has:
- **Authentication** enabled with Email/Password sign-in
- **Firestore Database** created
- **Storage** enabled for project images

### 2. Firestore Security Rules
Set up these security rules in your Firebase Console:

```javascript
// Firestore Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Profile - only authenticated users can read/write
    match /profile/{document} {
      allow read, write: if request.auth != null;
    }
    
    // About - only authenticated users can read/write
    match /about/{document} {
      allow read, write: if request.auth != null;
    }
    
    // Projects - only authenticated users can read/write
    match /projects/{document} {
      allow read, write: if request.auth != null;
    }
    
    // Skills - only authenticated users can read/write
    match /skills/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

```javascript
// Storage Rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /projects/{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 3. Usage

1. **First Time Setup**:
   - Visit `/admin/signup` to create your first admin account
   - Complete your profile setup in the dashboard

2. **Daily Usage**:
   - Visit `/admin/login` to sign in
   - Use the sidebar to navigate between sections
   - All data is automatically saved to Firestore

## 🗄️ Data Structure

### Profile Document (`/profile/main`)
```typescript
{
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### About Document (`/about/main`)
```typescript
{
  id: string;
  biography: string;
  updatedAt: Timestamp;
}
```

### Projects Collection (`/projects/{id}`)
```typescript
{
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string; // Firebase Storage URL
  isCompleted: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Skills Collection (`/skills/{id}`)
```typescript
{
  id: string;
  name: string;
  category: string;
  proficiency: number; // 1-100
  icon?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

## 🔒 Security Features

- **Firebase Authentication**: Secure user authentication
- **Protected Routes**: All admin pages require authentication
- **Firestore Security Rules**: Database access restricted to authenticated users
- **Storage Security**: Image uploads restricted to authenticated users
- **Input Validation**: Client-side validation for all forms
- **Error Handling**: Graceful error handling with user feedback

## 🎨 UI Components

The admin panel uses a consistent design system with:
- **Form Components**: Input, Textarea, Select, FileUpload, Button, MultiSelect
- **Layout Components**: DashboardLayout with responsive sidebar
- **Auth Components**: ProtectedRoute for route protection
- **Toast Notifications**: Success/error feedback
- **Loading States**: Spinner components for async operations

## 🚀 Deployment

This admin panel is ready for production deployment:
- No backend server required
- All data stored in Firebase
- Static hosting compatible (Vercel, Netlify, etc.)
- Environment variables for Firebase config (optional)

## 📝 Notes

- **No Backend Required**: Everything runs on Firebase
- **Real-time Updates**: Firestore provides real-time data synchronization
- **Scalable**: Firebase handles scaling automatically
- **Cost Effective**: Pay only for what you use
- **TypeScript**: Full type safety throughout the application
