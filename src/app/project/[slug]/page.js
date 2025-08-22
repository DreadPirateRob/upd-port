import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem, HoverEffect, PageTransition } from "@/components/animations/AnimationWrapper";

// Mock project data - in a real app, this would come from a database or CMS
const projectData = {
  "web-app": {
    title: "Modern Web Application",
    description: "A comprehensive full-stack web application built with Next.js, React, and modern web technologies. This project showcases advanced frontend patterns, server-side rendering, and responsive design principles.",
    longDescription: "This project represents a complete modern web application stack, featuring server-side rendering with Next.js, component-based architecture with React, and utility-first styling with Tailwind CSS. The application demonstrates best practices in web development including performance optimization, accessibility standards, and responsive design patterns.",
    tags: ["React", "Next.js", "Tailwind CSS", "JavaScript", "Vercel"],
    category: "Web Development",
    year: "2024",
    client: "Personal Project",
    features: [
      "Server-side rendering with Next.js",
      "Responsive design with Tailwind CSS",
      "Component-based architecture",
      "Performance optimized",
      "SEO friendly"
    ],
    technologies: [
      { name: "Next.js", description: "React framework for production" },
      { name: "React", description: "JavaScript library for building user interfaces" },
      { name: "Tailwind CSS", description: "Utility-first CSS framework" },
      { name: "shadcn/ui", description: "Beautifully designed components" }
    ]
  },
  "mobile-app": {
    title: "Cross-Platform Mobile Application",
    description: "A React Native mobile application with cross-platform compatibility, featuring native performance and modern UI/UX design patterns.",
    longDescription: "This mobile application project showcases cross-platform development using React Native, delivering native performance across iOS and Android platforms. The app features modern UI patterns, state management, and integration with device-specific APIs.",
    tags: ["React Native", "TypeScript", "Expo", "Mobile", "Cross-platform"],
    category: "Mobile Development",
    year: "2024",
    client: "Startup Company",
    features: [
      "Cross-platform compatibility",
      "Native performance",
      "Push notifications",
      "Offline functionality",
      "App store deployment"
    ],
    technologies: [
      { name: "React Native", description: "Framework for building native apps" },
      { name: "TypeScript", description: "Typed superset of JavaScript" },
      { name: "Expo", description: "Platform for universal React applications" },
      { name: "Redux", description: "Predictable state container" }
    ]
  },
  "api-service": {
    title: "RESTful API Service",
    description: "A scalable Node.js API service with Express.js, featuring authentication, database integration, and comprehensive documentation.",
    longDescription: "This backend project demonstrates modern API development practices using Node.js and Express.js. The service includes authentication, authorization, database modeling, and follows RESTful principles with comprehensive API documentation.",
    tags: ["Node.js", "Express", "MongoDB", "REST API", "Authentication"],
    category: "Backend Development",
    year: "2023",
    client: "Enterprise Client",
    features: [
      "RESTful API design",
      "JWT authentication",
      "Database integration",
      "API documentation",
      "Error handling and logging"
    ],
    technologies: [
      { name: "Node.js", description: "JavaScript runtime for server-side development" },
      { name: "Express.js", description: "Web application framework for Node.js" },
      { name: "MongoDB", description: "NoSQL database" },
      { name: "JWT", description: "JSON Web Token for authentication" }
    ]
  }
};

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = projectData[slug];

  // If project doesn't exist, show not found
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PageTransition className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn direction="left">
            <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
              ← Back to Home
            </Link>
          </FadeIn>
          
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1">
              <FadeIn direction="up" delay={0.2}>
                <Badge className="mb-4">{project.category}</Badge>
              </FadeIn>
              <FadeIn direction="up" delay={0.3}>
                <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
              </FadeIn>
              <FadeIn direction="up" delay={0.4}>
                <p className="text-xl text-muted-foreground mb-6">{project.description}</p>
              </FadeIn>
              
              <StaggerContainer className="flex flex-wrap gap-2 mb-8" staggerDelay={0.05}>
                {project.tags.map((tag) => (
                  <StaggerItem key={tag}>
                    <Badge variant="secondary">
                      {tag}
                    </Badge>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>

          {/* Project Details */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12" staggerDelay={0.1}>
            <StaggerItem>
              <HoverEffect effect="lift">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Year</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{project.year}</p>
                  </CardContent>
                </Card>
              </HoverEffect>
            </StaggerItem>
            
            <StaggerItem>
              <HoverEffect effect="lift">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Client</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{project.client}</p>
                  </CardContent>
                </Card>
              </HoverEffect>
            </StaggerItem>
            
            <StaggerItem>
              <HoverEffect effect="lift">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{project.category}</p>
                  </CardContent>
                </Card>
              </HoverEffect>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      <Separator />

      {/* Project Overview */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn direction="up">
            <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {project.longDescription}
            </p>
          </FadeIn>

          {/* Key Features */}
          <FadeIn direction="up" delay={0.3}>
            <h3 className="text-xl font-semibold mb-4">Key Features</h3>
          </FadeIn>
          <StaggerContainer className="space-y-2 mb-8" staggerDelay={0.1}>
            {project.features.map((feature, index) => (
              <StaggerItem key={index}>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <Separator />

      {/* Technologies Used */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn direction="up">
            <h2 className="text-2xl font-bold mb-6">Technologies Used</h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.1}>
            {project.technologies.map((tech, index) => (
              <StaggerItem key={index}>
                <HoverEffect effect="lift">
                  <Card className="h-full transition-all duration-300 hover:border-primary/20">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{tech.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-lg">{tech.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{tech.description}</CardDescription>
                    </CardContent>
                  </Card>
                </HoverEffect>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 px-4 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn direction="up">
            <h2 className="text-2xl font-bold mb-4">Interested in Working Together?</h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <p className="text-muted-foreground mb-8">
              Let&apos;s discuss your next project and see how I can help bring your ideas to life.
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.4}>
            <div className="flex gap-4 justify-center">
              <HoverEffect effect="scale">
                <Button size="lg">Get In Touch</Button>
              </HoverEffect>
              <Link href="/">
                <HoverEffect effect="scale">
                  <Button variant="outline" size="lg">View More Projects</Button>
                </HoverEffect>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  );
}

// Generate static params for the dynamic routes
export async function generateStaticParams() {
  return [
    { slug: 'web-app' },
    { slug: 'mobile-app' },
    { slug: 'api-service' },
  ];
}

// Generate metadata for each project page
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projectData[slug];
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }
  
  return {
    title: `${project.title} - Portfolio`,
    description: project.description,
  };
}
