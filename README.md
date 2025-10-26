# Halloween Poll App

A real-time polling web application built with React, TypeScript, Tailwind CSS, and Firebase.

## Features

- 📱 Mobile-optimized responsive design
- 🔥 Real-time vote updates using Firebase Firestore
- 📊 Interactive bar chart visualization
- ➕ Add custom poll options
- 🎨 Beautiful gradient UI with Tailwind CSS
- ⚡ Fast and modern with Vite

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Firebase project

## Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use an existing one)
3. Enable Firestore Database:
   - Go to "Build" → "Firestore Database"
   - Click "Create database"
   - Choose "Start in production mode" (we'll configure rules next)
   - Select a location
4. Set up Firestore Security Rules:
   - Go to "Rules" tab in Firestore
   - Replace the rules with:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /poll-options/{document} {
         allow read: if true;
         allow write: if true;
       }
     }
   }
   ```
   - Click "Publish"
5. Get your Firebase config:
   - Go to Project Settings (gear icon)
   - Scroll down to "Your apps"
   - Click the web icon (</>)
   - Register your app
   - Copy the config values

## Installation

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

3. Edit `.env` and add your Firebase credentials:
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Initial Data Setup

To populate your database with initial poll options, you can either:

### Option 1: Add via the app
Just run the app and use the "Add your own answer" feature to create options.

### Option 2: Add via Firebase Console
1. Go to Firestore Database in Firebase Console
2. Create a collection called `poll-options`
3. Add documents with this structure:
```json
{
  "text": "Apple",
  "votes": 0
}
```

Add at least a few options like: Apple, Banana, Orange, Grape

## Running the App

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/           # React components
│   ├── PollOption.tsx   # Individual poll option button
│   ├── CustomAnswerForm.tsx  # Form to add custom answers
│   └── VoteChart.tsx    # Bar chart visualization
├── firebase/
│   └── config.ts        # Firebase configuration
├── hooks/
│   └── usePollData.ts   # Custom hook for Firebase operations
├── types/
│   └── index.ts         # TypeScript type definitions
├── App.tsx              # Main app component
├── main.tsx            # App entry point
└── index.css           # Tailwind CSS imports
```

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Firebase Firestore** - Real-time database
- **Recharts** - Chart library

## Features Explained

### Real-time Updates
All votes and new options are synced in real-time across all connected users using Firebase's `onSnapshot` listener.

### Duplicate Prevention
The app prevents adding duplicate poll options (case-insensitive check).

### Mobile Optimization
- Touch-friendly buttons (min 44px height)
- Responsive layout using Tailwind breakpoints
- Proper viewport configuration
- Active state animations for better touch feedback

### Vote Visualization
The bar chart automatically updates and displays:
- Vote counts for each option
- Percentage distribution
- Color-coded bars for easy distinction

## License

MIT
