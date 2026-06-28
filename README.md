# Grovii - Frontend

Grovii is a production-grade AI-powered storyboard and reel generation workspace. The frontend provides a beautiful, Canva-like interface for creators to input their ideas and receive ready-to-shoot storyboard templates.

## Features

- **Auth & Onboarding**: Complete sign-in and sign-up flows with JWT validation.
- **Creator Dashboard**: View personal metrics, analytics, and generated storyboards.
- **Storyboard Canvas**:
  - Interactive multi-step form to capture Idea, Goal, Tone, Duration, Audience, Platform.
  - Live AI generation preview.
  - Spatial Canva-like editing workspace.
- **Project Library**: Easily browse, filter, and manage previously generated storyboards.
- **Responsive Design**: Built with modern standard responsive UI and fluid animations.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: Tailwind CSS & [Shadcn UI](https://ui.shadcn.com/)
- **Forms & Validation**: `react-hook-form` and `zod`
- **API Client**: `axios` with interceptors
- **Icons**: `lucide-react`
- **Animations**: `framer-motion` (used subtly for page transitions and micro-interactions)

## Installation & Setup

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd grovii/frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env.local` file in the root of the `frontend` directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Folder Structure

```text
src/
├── app/                  # Next.js App Router pages and layouts
│   ├── dashboard/        # Protected routes (Dashboard, Storyboards, Create Canvas)
│   ├── sign-in/          # Public Auth routes
│   └── sign-up/          # Public Auth routes
├── components/           # Reusable UI components (Shadcn, Auth Forms, etc.)
├── contexts/             # Global React Contexts (AuthContext)
├── hooks/                # Custom React hooks (useStoryboardForm)
├── lib/                  # Utilities and Zod schemas
├── services/             # Axios API integration (api.ts, authService, storyboardService)
└── types/                # TypeScript interfaces
```

## Available Scripts

- `npm run dev`: Runs the app in the development mode.
- `npm run build`: Builds the app for production to the `.next` folder.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to find and fix problems in the code.
