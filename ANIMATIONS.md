# Framer Motion Animations Documentation

This portfolio uses Framer Motion to provide smooth, professional animations throughout the application.

## Available Animation Components

### 1. FadeIn
Smooth fade-in animations with directional support.

```jsx
import { FadeIn } from "@/components/animations/AnimationWrapper";

// Usage examples
<FadeIn direction="up" delay={0.2}>
  <h1>This fades in from bottom</h1>
</FadeIn>

<FadeIn direction="left" duration={0.8}>
  <p>This fades in from right</p>
</FadeIn>
```

**Props:**
- `direction`: `"up"` | `"down"` | `"left"` | `"right"` | `"in"` (default: "up")
- `delay`: number (default: 0)
- `duration`: number (default: 0.6)

### 2. ScaleIn
Scale-based entrance animations.

```jsx
import { ScaleIn } from "@/components/animations/AnimationWrapper";

<ScaleIn delay={0.3}>
  <div>This scales in smoothly</div>
</ScaleIn>
```

**Props:**
- `delay`: number (default: 0)
- `duration`: number (default: 0.5)

### 3. StaggerContainer & StaggerItem
Animate multiple items with a staggered effect.

```jsx
import { StaggerContainer, StaggerItem } from "@/components/animations/AnimationWrapper";

<StaggerContainer staggerDelay={0.1}>
  {items.map(item => (
    <StaggerItem key={item.id}>
      <div>{item.content}</div>
    </StaggerItem>
  ))}
</StaggerContainer>
```

**StaggerContainer Props:**
- `staggerDelay`: number (default: 0.1) - Delay between each item animation

### 4. HoverEffect
Interactive hover animations.

```jsx
import { HoverEffect } from "@/components/animations/AnimationWrapper";

<HoverEffect effect="scale">
  <button>Hover me!</button>
</HoverEffect>
```

**Props:**
- `effect`: `"scale"` | `"lift"` | `"rotate"` | `"glow"` (default: "scale")

### 5. PageTransition
Smooth page-to-page transitions.

```jsx
import { PageTransition } from "@/components/animations/AnimationWrapper";

<PageTransition>
  <div>Page content</div>
</PageTransition>
```

### 6. TextReveal
Text-specific reveal animations.

```jsx
import { TextReveal } from "@/components/animations/AnimationWrapper";

<TextReveal delay={0.5}>
  <h2>This text reveals smoothly</h2>
</TextReveal>
```

### 7. AnimatedCounter
Animated number counting.

```jsx
import { AnimatedCounter } from "@/components/animations/AnimationWrapper";

<AnimatedCounter from={0} to={100} duration={2}>
  100
</AnimatedCounter>
```

**Props:**
- `from`: number (default: 0)
- `to`: number (required)
- `duration`: number (default: 2)

## Animation Utilities

### useScrollAnimation Hook
Custom hook for scroll-triggered animations.

```jsx
import { useScrollAnimation } from "@/hooks/useAnimations";

const MyComponent = () => {
  const animation = useScrollAnimation("fadeInUp");
  
  return (
    <motion.div {...animation}>
      Content appears on scroll
    </motion.div>
  );
};
```

### useInViewAnimation Hook
Detects when an element is in view.

```jsx
import { useInViewAnimation } from "@/hooks/useAnimations";

const MyComponent = () => {
  const { ref, isInView } = useInViewAnimation();
  
  return (
    <div ref={ref}>
      {isInView ? "Visible!" : "Hidden"}
    </div>
  );
};
```

## Pre-built Animation Variants

The following animation variants are available in `animationVariants`:

- `fadeIn` - Simple fade in
- `fadeInUp` - Fade in from bottom
- `fadeInDown` - Fade in from top
- `fadeInLeft` - Fade in from right
- `fadeInRight` - Fade in from left
- `scaleIn` - Scale up from center
- `scaleInUp` - Scale up with upward movement
- `hoverScale` - Scale on hover
- `hoverLift` - Lift on hover
- `staggerContainer` - Container for stagger animations
- `staggerItem` - Individual stagger items
- `pageTransition` - Page transition effects
- `buttonPress` - Button press animation
- `pulse` - Pulsing animation
- `textReveal` - Text reveal effect

## Example Usage in Portfolio

### Landing Page Hero Section
```jsx
<FadeIn direction="down" delay={0.2}>
  <h1>Welcome to My Portfolio</h1>
</FadeIn>
<FadeIn direction="up" delay={0.4}>
  <p>I'm a developer passionate about creating amazing experiences.</p>
</FadeIn>
```

### Project Cards with Stagger
```jsx
<StaggerContainer className="grid grid-cols-3 gap-6" staggerDelay={0.2}>
  {projects.map(project => (
    <StaggerItem key={project.id}>
      <HoverEffect effect="lift">
        <Card>{project.content}</Card>
      </HoverEffect>
    </StaggerItem>
  ))}
</StaggerContainer>
```

### Interactive Buttons
```jsx
<HoverEffect effect="scale">
  <Button size="lg">
    View Projects
  </Button>
</HoverEffect>
```

## Performance Notes

- All animations use hardware acceleration (GPU) when possible
- Animations are triggered only when elements come into view to improve performance
- Uses `framer-motion`'s optimized animation engine
- Supports reduced motion preferences automatically

## Customization

To customize animations, edit the variants in `/src/hooks/useAnimations.js` or create new animation components in `/src/components/animations/`.
