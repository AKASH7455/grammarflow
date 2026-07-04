# GrammarFlow Skeleton Loading System

A production-quality, reusable skeleton loading system for GrammarFlow React application.

## Features

- **Reusable Components**: Modular skeleton components for any UI pattern
- **Theme Support**: Automatic light/dark theme support using CSS variables
- **Smooth Animation**: GPU-friendly shimmer animation
- **Accessibility**: Proper `aria-hidden` attributes for screen readers
- **Performance**: `React.memo` optimized to prevent unnecessary re-renders
- **No Layout Shift**: Skeletons match the exact layout of real content
- **Backend-Ready**: Architecture supports future REST API integration

## Installation

The skeleton system is already integrated into the project. Styles are imported in `global.css`.

## Usage

### Basic Pattern

Every page should follow this pattern:

```jsx
import { SkeletonHome } from "../components/common/skeleton";

function Home() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <SkeletonHome />;
  }

  return <Home />;
}
```

### Using the Hook

For more control over loading states:

```jsx
import { useSkeletonLoader } from "../../hooks/useSkeletonLoader";
import { SkeletonLearning } from "../components/common/skeleton";

function Learning() {
  const [data, setData] = useState(null);
  const isLoading = !data;
  const showSkeleton = useSkeletonLoader(isLoading, 300); // 300ms minimum

  if (showSkeleton) {
    return <SkeletonLearning />;
  }

  return <ActualContent data={data} />;
}
```

## Available Components

### Base Components

- **SkeletonBox**: Basic rectangular placeholder
- **SkeletonText**: Multi-line text placeholder
- **SkeletonCircle**: Circular placeholder (avatars, icons)
- **SkeletonButton**: Button-shaped placeholder
- **SkeletonCard**: Card container with header and body
- **SkeletonList**: Vertical list of items
- **SkeletonGrid**: Grid layout of cards

### Page Skeletons

- **SkeletonHome**: Home page layout
- **SkeletonLearning**: Learning/levels page
- **SkeletonTopic**: Topic details page
- **SkeletonNotes**: Notes content page
- **SkeletonMCQ**: Multiple choice quiz
- **SkeletonFillBlank**: Fill in the blanks exercise
- **SkeletonTranslation**: Translation exercise
- **SkeletonSentenceCorrection**: Sentence correction exercise
- **SkeletonVerb**: Verb dashboard page
- **SkeletonProgress**: Progress tracking page
- **SkeletonProfile**: User profile page
- **SkeletonSearch**: Search results page

### Layout Skeletons

- **NavbarSkeleton**: Top navigation bar
- **BottomNavSkeleton**: Bottom navigation bar

### Card Skeletons

- **SkeletonTopicCard**: Individual topic card
- **SkeletonSubjectCard**: Subject card with icon
- **SkeletonLevelCard**: Level selection card
- **SkeletonLessonCard**: Lesson card component

### Specialized Components

- **SkeletonVerbTable**: Verb conjugation table
- **SkeletonDashboard**: Dashboard layout
- **SkeletonSearchResults**: Search results list
- **SkeletonStatistics**: Statistics grid
- **SkeletonWeeklyActivity**: Activity heatmap
- **SkeletonAchievementCard**: Achievement badge card

## Props

### SkeletonBox

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| width | string | "100%" | Width of the box |
| height | string | "20px" | Height of the box |
| borderRadius | string | "var(--radius-sm)" | Border radius |
| className | string | "" | Additional CSS classes |
| style | object | {} | Inline styles |

### SkeletonText

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| lines | number | 1 | Number of text lines |
| width | string\|string[] | "100%" | Width (can be array for varying widths) |
| height | string | "16px" | Height of each line |
| gap | string | "8px" | Gap between lines |
| className | string | "" | Additional CSS classes |
| style | object | {} | Inline styles |

### SkeletonCircle

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | string | "40px" | Diameter of the circle |
| className | string | "" | Additional CSS classes |
| style | object | {} | Inline styles |

## Customization

All skeleton components use CSS variables from the theme system:

- Background: `var(--surface-color)`
- Border radius: `var(--radius-sm)`, `var(--radius-md)`, `var(--radius-lg)`
- Shimmer effect adapts to light/dark theme automatically

## Performance

- All components use `React.memo` to prevent unnecessary re-renders
- Shimmer animation uses CSS transforms (GPU-accelerated)
- Respects `prefers-reduced-motion` for accessibility

## Accessibility

- All skeleton components have `aria-hidden="true"`
- Loading containers should use `aria-busy="true"`
- Does not trap keyboard focus
- Screen readers announce actual content when loaded

## Service Layer Integration

### Current Flow (Local Data)

```
Component
↓
Service Layer
↓
Local Data
```

### Future Flow (REST API)

```
Component
↓
Service Layer
↓
REST API
↓
Express
↓
MongoDB
```

The skeleton system is already backend-ready. When you connect APIs later:

1. Update your service layer to fetch from REST API
2. The loading state will automatically trigger skeleton display
3. No component changes required

### Example Integration

```jsx
// Service Layer
export const fetchTopics = async () => {
  // Currently: return local data
  // Future: return await fetch('/api/topics')
  const response = await fetch('/api/topics');
  return response.json();
};

// Component
function Learning() {
  const [topics, setTopics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopics()
      .then(data => {
        setTopics(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <SkeletonLearning />;
  }

  return <LevelGrid topics={topics} />;
}
```

## Best Practices

1. **Always use skeleton components** - Never show blank screens during loading
2. **Match the layout** - Skeletons should match the exact structure of real content
3. **Minimum loading time** - Use `useSkeletonLoader` with 300ms minimum to prevent flickering
4. **Accessibility first** - Always include `aria-hidden="true"` on skeleton elements
5. **Theme aware** - Use CSS variables, never hardcode colors
6. **Performance** - All skeleton components are memoized by default

## Example: Full Page Integration

```jsx
import { useState, useEffect } from "react";
import { SkeletonProgress } from "../components/common/skeleton";
import { useProgress } from "../hooks/useProgress";

function Progress() {
  const { data, loading } = useProgress();

  if (loading) {
    return <SkeletonProgress />;
  }

  return (
    <main className="progress-page">
      <ProgressHero progress={data.overallProgress} />
      <StatsRow stats={data.stats} />
      {/* ... rest of component */}
    </main>
  );
}
```

## CSS Architecture

The shimmer animation is defined in `styles/skeleton.css`:

```css
.skeleton {
  background: var(--surface-color);
  position: relative;
  overflow: hidden;
}

.skeleton::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.4) 50%,
    transparent 100%
  );
  transform: translateX(-100%);
  animation: skeleton-shimmer 1.5s infinite;
}

.dark-theme .skeleton::after {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(34, 211, 238, 0.15) 50%,
    transparent 100%
  );
}

@keyframes skeleton-shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

## Future Enhancements

When you add new pages or components:

1. Create a matching skeleton component in `src/components/common/skeleton/`
2. Follow the naming convention: `Skeleton[ComponentName].jsx`
3. Export it in `index.js`
4. Use the same CSS variables as the real component
5. Match the exact layout structure

## Support

For issues or questions about the skeleton system, refer to the component documentation or the main project README.
