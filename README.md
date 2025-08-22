# Next.js Portfolio App

A modern, responsive portfolio website built with Next.js, Tailwind CSS, and shadcn/ui components.

## Features

- **Landing Page (/)**: Beautiful homepage with hero section, featured projects, and about section
- **Dynamic Project Routes (/project/[slug])**: Individual project pages with detailed information
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI Components**: Built with shadcn/ui component library
- **Smooth Animations**: Professional animations powered by Framer Motion
- **Dark/Light Mode Toggle**: Theme switching with persistent storage
- **SEO Optimized**: Dynamic metadata generation for each page
- **Static Site Generation**: Pre-rendered pages for optimal performance

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: JavaScript (Regular JavaScript, not TypeScript)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Font**: Geist Sans & Geist Mono

## Project Structure

```
src/
├── app/
│   ├── layout.js                 # Root layout with navigation
│   ├── page.js                   # Landing page
│   └── project/
│       └── [slug]/
│           └── page.js           # Dynamic project pages
├── components/
│   ├── navigation.jsx            # Navigation component
│   ├── theme-toggle.jsx          # Dark/light mode toggle
│   ├── theme-provider.jsx        # Theme context provider
│   ├── animations/               # Animation components
│   │   └── AnimationWrapper.jsx  # Framer Motion wrappers
│   └── ui/                       # shadcn/ui components
│       ├── avatar.jsx
│       ├── badge.jsx
│       ├── button.jsx
│       ├── card.jsx
│       ├── navigation-menu.jsx
│       └── separator.jsx
├── hooks/
│   └── useAnimations.js          # Animation utility hooks
└── lib/
    └── utils.js                  # Utility functions
```

## Available Routes

- `/` - Landing page with portfolio overview
- `/project/web-app` - Modern Web Application project
- `/project/mobile-app` - Cross-Platform Mobile Application project
- `/project/api-service` - RESTful API Service project

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## shadcn/ui Components

The project includes the following shadcn/ui components:
- Button - Interactive buttons with multiple variants
- Card - Content containers with header, content, and description
- Badge - Small status indicators
- Avatar - User profile pictures with fallbacks
- Separator - Visual dividers between content sections
- Navigation Menu - Accessible navigation components

## Theme System

The portfolio includes a comprehensive dark/light mode system:

- **Theme Toggle**: Located in the navigation bar with sun/moon icons
- **Persistent Storage**: Theme preference is saved in localStorage
- **No Flash**: Prevents flash of unstyled content (FOUC) on page load
- **Context Provider**: Manages theme state across the entire application
- **CSS Variables**: Uses CSS custom properties for seamless theme switching

## Animations

The portfolio features smooth, professional animations powered by Framer Motion:

- **Fade Animations**: Elements fade in from various directions (up, down, left, right)
- **Scale Animations**: Components scale in smoothly on scroll
- **Stagger Effects**: Multiple items animate with sequential delays
- **Hover Interactions**: Buttons and cards have engaging hover effects
- **Page Transitions**: Smooth transitions between pages
- **Scroll-Triggered**: Animations activate when elements enter the viewport

For detailed animation documentation, see [ANIMATIONS.md](ANIMATIONS.md).

## Customization

### Adding New Projects

To add a new project, update the `projectData` object in `/src/app/project/[slug]/page.js` and add the corresponding slug to the `generateStaticParams` function.

### Modifying Styles

The project uses Tailwind CSS for styling. You can customize the design by modifying the classes in the components or updating the global CSS in `/src/app/globals.css`.

### Adding Components

To add more shadcn/ui components:
```bash
npx shadcn@latest add [component-name]
```

## Deployment

This project is ready for deployment on platforms like:
- Vercel (recommended for Next.js apps)
- Netlify
- Any other platform that supports Node.js

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

This project is open source and available under the MIT License.
