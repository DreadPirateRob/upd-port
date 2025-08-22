import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem, HoverEffect, TextReveal } from "@/components/animations/AnimationWrapper";
import Timeline from "@/components/Timeline";

export default function Home() {
  const projects = [
    {
      slug: "web-app",
      title: "Modern Web Application",
      description: "A full-stack web application built with Next.js and React",
      tags: ["React", "Next.js", "Tailwind"]
    },
    {
      slug: "mobile-app",
      title: "Mobile Application",
      description: "Cross-platform mobile app with React Native",
      tags: ["React Native", "TypeScript", "Expo"]
    },
    {
      slug: "api-service",
      title: "API Service",
      description: "RESTful API service with Node.js and Express",
      tags: ["Node.js", "Express", "MongoDB"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <FadeIn direction="down" delay={0.2}>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
              Welcome to My Portfolio
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay={0.4}>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              I&apos;m a developer passionate about creating amazing web experiences. 
              Check out my projects and see what I&apos;ve been working on.
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.6}>
            <div className="flex gap-4 justify-center">
              <HoverEffect effect="scale">
                <Button size="lg">
                  View Projects
                </Button>
              </HoverEffect>
              <HoverEffect effect="scale">
                <Button variant="outline" size="lg">
                  Contact Me
                </Button>
              </HoverEffect>
            </div>
          </FadeIn>
        </div>
      </section>

      <Separator />

      {/* Projects Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn direction="up">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.2}>
            {projects.map((project) => (
              <StaggerItem key={project.slug}>
                <HoverEffect effect="lift">
                  <Card className="h-full border-2 transition-all duration-300 hover:border-primary/20">
                    <CardHeader>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Link href={`/project/${project.slug}`}>
                        <HoverEffect effect="scale">
                          <Button className="w-full">
                            View Project
                          </Button>
                        </HoverEffect>
                      </Link>
                    </CardContent>
                  </Card>
                </HoverEffect>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn direction="up">
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <p className="text-lg text-muted-foreground mb-8">
              I&apos;m a full-stack developer with experience in modern web technologies. 
              I love building scalable applications and learning new technologies. 
              This portfolio showcases some of my recent work and experiments.
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.4}>
            <HoverEffect effect="scale">
              <Button variant="outline">
                Learn More
              </Button>
            </HoverEffect>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
