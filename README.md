# GrammarFlow

GrammarFlow is a modern English grammar learning web app built with React and Vite. It is designed to help learners move through structured grammar lessons, practice topic-based exercises, track progress, and build consistency through streaks and XP-based learning analytics.

## Overview

GrammarFlow organizes grammar content into progressive learning levels and subjects. Each topic can include notes, MCQs, fill-in-the-blanks, translation practice, sentence correction, and AI practice content. The app also includes a dedicated verb forms section and a progress dashboard for monitoring learning activity.

## Key Features

- Structured learning path across Beginner, Intermediate, Advanced, and Master levels
- Subject and topic-based grammar navigation
- Topic detail pages with tabbed learning and practice content
- MCQ, fill-in-the-blanks, translation, sentence correction, and AI practice data structure
- Verb forms dashboard with searchable verb sets
- Progress tracking with completed topics, quiz results, XP, streaks, and activity logs
- Responsive layout with desktop navigation and mobile bottom navigation
- Theme, language, progress, and local storage context support
- Vercel-ready configuration

## Tech Stack

- React 19
- Vite
- React Router
- React Icons
- Tailwind CSS / custom CSS modules
- ESLint
- Vercel Analytics

## Project Structure

```text
grammarflow/
|-- public/                 # Static assets and icons
|-- src/
|   |-- assets/             # App images and brand assets
|   |-- components/         # Reusable UI and feature components
|   |-- context/            # App-level React contexts
|   |-- data/               # Learning content and verb datasets
|   |-- hooks/              # Custom React hooks
|   |-- pages/              # Route-level screens
|   |-- routes/             # Application routes
|   |-- services/           # Storage, progress, quiz, and learning services
|   |-- styles/             # Global and feature-specific styles
|   |-- utils/              # Shared helper utilities
|   |-- App.jsx             # App shell
|   `-- main.jsx            # React entry point
|-- index.html
|-- package.json
|-- vite.config.js
`-- vercel.json
```

## Getting Started

### Prerequisites

Make sure Node.js and npm are installed on your system.

### Installation

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

The app will start on the local Vite development URL shown in your terminal, usually:

```text
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Run Linting

```bash
npm run lint
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Creates a production-ready build |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint checks across the project |

## Main Routes

| Route | Purpose |
| --- | --- |
| `/` | Home dashboard |
| `/learning` | Learning level selection |
| `/learning/:levelSlug` | Subjects inside a level |
| `/learning/:levelSlug/:subjectSlug` | Topics inside a subject |
| `/learning/:levelSlug/:subjectSlug/:topicSlug` | Topic learning and practice screen |
| `/practice` | Practice zone |
| `/progress` | Progress and learning analytics |
| `/profile` | User profile |
| `/verbs` | Verb forms dashboard |
| `/verbs/:setName` | Verb set details |

## Learning Content

Learning content lives inside:

```text
src/data/learning/
```

The content is grouped by level:

- `beginner`
- `intermediate`
- `advanced`
- `master`

Each topic can include separate data files for notes, MCQs, fill blanks, translation, sentence correction, and AI practice.

## Progress System

GrammarFlow stores and calculates learning progress through services and hooks in:

```text
src/services/progress/
src/hooks/useProgress.js
```

The progress dashboard includes topic completion, subject progress, quiz activity, XP, streaks, study activity, and recent learning logs.

## Deployment

This project includes a `vercel.json` file, so it can be deployed on Vercel. A typical deployment flow is:

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Use the default Vite build command:

```bash
npm run build
```

4. Set the output directory to:

```text
dist
```

## Contributing

When adding new grammar content, keep the existing topic folder structure consistent. For new UI work, reuse existing components, hooks, services, and style conventions where possible.

## License

This project is currently private. Add a license file if you plan to distribute or open-source it.
