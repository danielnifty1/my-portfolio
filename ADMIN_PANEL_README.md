# Portfolio Admin Panel

A comprehensive admin panel for managing your portfolio website, built with Next.js, TypeScript, and Tailwind CSS.

## Features

### 🔐 Authentication (Firebase)
- Firebase Email/Password authentication
- Protected routes for all admin functionality
- Backend receives Firebase ID token via Authorization: Bearer <token>

### 📊 Dashboard
- **Profile Management**: Update personal information, tagline, and profile picture
- **About Me Management**: Edit professional biography and personal story
- **Projects Management**: Full CRUD operations for portfolio projects
- **Skills Management**: Manage technical skills with proficiency levels

### 🎨 Design & UX
- Modern, responsive design with Tailwind CSS
- Dark mode toggle
- Mobile-friendly sidebar navigation
- Beautiful form components and modals
- Loading states and error handling

### 🚀 Technical Features
- React Query (TanStack Query) for data fetching and caching
- TypeScript for type safety
- Axios for API communication
- Firebase Auth for authentication
- Responsive design for all screen sizes

## Project Structure

```
src/
├── app/
│   └── admin/
│       ├── login/
│       │   └── page.tsx          # Login page
│       ├── dashboard/
│       │   ├── page.tsx          # Profile management
│       │   ├── about/
│       │   │   └── page.tsx      # About me management
│       │   ├── projects/
│       │   │   └── page.tsx      # Projects management
│       │   └── skills/
│       │       └── page.tsx      # Skills management
│       └── layout.tsx            # Admin layout with providers
├── components/
│   └── admin/
│       ├── auth/
│       │   └── protected-route.tsx
│       ├── layout/
│       │   └── dashboard-layout.tsx
│       └── ui/
│           └── form-components.tsx
├── contexts/
│   └── auth-context.tsx          # Authentication context (Firebase)
├── lib/
│   ├── api.ts                    # API service functions
│   └── firebase.ts               # Firebase initialization
└── env.example                   # Environment variables template
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install firebase
```

(Already installed: @tanstack/react-query axios)

### 2. Environment Variables

Create a `.env.local` file in your project root using `env.example` as a guide:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=000000000000
NEXT_PUBLIC_FIREBASE_APP_ID=1:000000000000:web:xxxxxxxxxxxxxxxxxxxx
```

### 3. Firebase Console

1. Create a Firebase project
2. Enable Email/Password Sign-in (Authentication -> Sign-in method)
3. Add a Web App and copy the config values into `.env.local`

### 4. Backend API Auth (Important)

- Your backend must verify Firebase ID tokens sent in the `Authorization: Bearer <token>` header
- Use Firebase Admin SDK on your server to verify tokens and get the user
- Then authorize API requests based on the verified user

### 5. Usage

1. Start dev server: `npm run dev`
2. Visit `/admin/login`
3. Log in with a user created in Firebase Authentication
4. Access dashboard sections via sidebar

## Security Considerations

- Auth handled by Firebase; tokens are kept in memory by Firebase SDK
- API calls include ID token automatically via axios interceptor
- Ensure CORS on your API allows your frontend origin

## Notes

- If you previously used custom JWTs, that logic is now replaced by Firebase Auth
- The API service no longer calls `/auth/login`; backend only needs to verify tokens
