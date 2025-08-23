import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FadeIn,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
  HoverEffect,
  PageTransition,
} from "@/components/animations/AnimationWrapper";
import projects, { technologiesData } from "@/data/projects";
// import Image from "next/image";

// Mock project data - in a real app, this would come from a database or CMS
const projectData = {
  "market-data-plant": {
    ...projects[0],
    // title: "High-Frequency System for Real-Time Crypto Data",
    // description: "A fully automated market data plant for UI or bot trading.",
    // longDescription:
    //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam hendrerit tincidunt ante, ac aliquam augue pulvinar vel. Praesent non cursus urna, ac viverra dui. Phasellus sit amet malesuada lectus. Nulla laoreet sollicitudin mi, semper sodales erat sagittis in. Proin venenatis sit amet tortor et interdum. Praesent ante est, egestas vel eleifend nec, mattis a risus. Nullam purus odio, mattis ac ante suscipit, rutrum condimentum ipsum. Ut auctor maximus consectetur. Duis ante lorem, molestie in augue a, rutrum malesuada nibh. Morbi scelerisque nisi quis lorem feugiat, vel dapibus nulla egestas.",
    // tags: ["React", "Next.js", "Tailwind CSS", "JavaScript", "Vercel"],
    // category: "Web Development",
    // year: "2025",
    // client: "Personal Project",
    // features: [
    //   "Server-side rendering with Next.js",
    //   "Responsive design with Tailwind CSS",
    //   "Component-based architecture",
    //   "Performance optimized",
    //   "SEO friendly",
    // ],
    // technologies: [
    //   { name: "Next.js", description: "React framework for production" },
    //   {
    //     name: "React",
    //     description: "JavaScript library for building user interfaces",
    //   },
    //   { name: "Tailwind CSS", description: "Utility-first CSS framework" },
    //   { name: "shadcn/ui", description: "Beautifully designed components" },
    // ],
  },
  "mobile-app": {
    title: "Cross-Platform Mobile Application",
    description:
      "A React Native mobile application with cross-platform compatibility, featuring native performance and modern UI/UX design patterns.",
    longDescription:
      "This mobile application project showcases cross-platform development using React Native, delivering native performance across iOS and Android platforms. The app features modern UI patterns, state management, and integration with device-specific APIs.",
    tags: ["React Native", "TypeScript", "Expo", "Mobile", "Cross-platform"],
    category: "Mobile Development",
    year: "2024",
    client: "Startup Company",
    features: [
      "Cross-platform compatibility",
      "Native performance",
      "Push notifications",
      "Offline functionality",
      "App store deployment",
    ],
    technologies: [
      {
        name: "React Native",
        description: "Framework for building native apps",
      },
      { name: "TypeScript", description: "Typed superset of JavaScript" },
      {
        name: "Expo",
        description: "Platform for universal React applications",
      },
      { name: "Redux", description: "Predictable state container" },
    ],
  },
  "api-service": {
    title: "RESTful API Service",
    description:
      "A scalable Node.js API service with Express.js, featuring authentication, database integration, and comprehensive documentation.",
    longDescription:
      "This backend project demonstrates modern API development practices using Node.js and Express.js. The service includes authentication, authorization, database modeling, and follows RESTful principles with comprehensive API documentation.",
    tags: ["Node.js", "Express", "MongoDB", "REST API", "Authentication"],
    category: "Backend Development",
    year: "2023",
    client: "Enterprise Client",
    features: [
      "RESTful API design",
      "JWT authentication",
      "Database integration",
      "API documentation",
      "Error handling and logging",
    ],
    technologies: [
      {
        name: "Node.js",
        description: "JavaScript runtime for server-side development",
      },
      {
        name: "Express.js",
        description: "Web application framework for Node.js",
      },
      { name: "MongoDB", description: "NoSQL database" },
      { name: "JWT", description: "JSON Web Token for authentication" },
    ],
  },
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
          <p className="text-muted-foreground mb-8">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
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
      <div className="grid flex-1 grid-rows-[1fr_auto] overflow-clip grid-cols-[1fr_var(--gutter-width)_minmax(0,var(--breakpoint-2xl))_var(--gutter-width)_1fr] [--gutter-width:--spacing(6)] lg:[--gutter-width:--spacing(10)]">
        <div className="col-start-2 row-span-full row-start-1 max-sm:hidden border-x border-x-border bg-size-[10px_10px] bg-fixed bg-[repeating-linear-gradient(315deg,var(--border)_0,var(--border)_1px,transparent_0,transparent_50%)]"></div>
        <div className="col-start-4 row-span-full row-start-1 max-sm:hidden border-x border-x-border bg-size-[10px_10px] bg-fixed bg-[repeating-linear-gradient(315deg,var(--border)_0,var(--border)_1px,transparent_0,transparent_50%)]"></div>
        <div className="col-start-3 row-start-1 max-sm:col-span-full max-sm:col-start-1">
          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <FadeIn direction="left">
                <Link
                  href="/"
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
                >
                  ← Back to Home
                </Link>
              </FadeIn>

              <div className="flex items-start justify-between mb-8">
                <div className="flex-1">
                  <StaggerContainer
                    className="flex flex-wrap gap-2 mb-4"
                    staggerDelay={0.05}
                  >
                    {project.skills.map((skill) => (
                      <StaggerItem key={skill}>
                        <Badge>{skill}</Badge>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                  <FadeIn direction="up" delay={0.3}>
                    <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
                  </FadeIn>
                  <FadeIn direction="up" delay={0.4}>
                    <p className="text-xl text-muted-foreground mb-6">
                      {project.description}
                    </p>
                  </FadeIn>

                  <StaggerContainer
                    className="flex flex-wrap gap-2"
                    staggerDelay={0.05}
                  >
                    {project.technologies.map((tag) => (
                      <StaggerItem key={tag}>
                        <Badge variant="secondary">{tag}</Badge>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </div>

              <div className="col-span-24 aspect-video mb-8 border border-border bg-size-[10px_10px] bg-fixed bg-[repeating-linear-gradient(315deg,var(--border)_0,var(--border)_1px,transparent_0,transparent_50%)]"></div>
            </div>
          </section>

          <Separator />

          {/* Technologies Used */}
          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <FadeIn direction="up">
                <h2 className="text-2xl font-bold mb-6">Technologies Used</h2>
              </FadeIn>
              <StaggerContainer
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                staggerDelay={0.1}
              >
                {project.technologies.map((tech, index) => (
                  <StaggerItem key={index}>
                    <HoverEffect effect="lift">
                      <Card className="h-full transition-all duration-300 hover:border-primary/20">
                        <CardHeader>
                          <div className="flex items-center gap-6">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>{tech.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <CardTitle className="text-lg">{tech}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>
                            {technologiesData[tech].description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </HoverEffect>
                  </StaggerItem>
                ))}
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
                  {project.blog.overview}
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

          {/* Project Problem */}
          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <FadeIn direction="up">
                <h2 className="text-2xl font-bold mb-6">The Problem</h2>
              </FadeIn>
              <FadeIn direction="up" delay={0.2}>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {project.blog.problem.description}
                </p>
              </FadeIn>
              <StaggerContainer className="space-y-2 mb-8" staggerDelay={0.1}>
                {project.blog.problem.listItems.map((item, index) => (
                  <StaggerItem key={index}>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>

          <Separator />

          {/* Project Architecture */}
          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <FadeIn direction="up">
                <h2 className="text-2xl font-bold mb-6">
                  Architecture at a Glance
                </h2>
              </FadeIn>
              <FadeIn direction="up" delay={0.2}>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {project.blog.architecture.description}
                </p>
              </FadeIn>
              <StaggerContainer className="space-y-2 mb-8" staggerDelay={0.1}>
                {project.blog.architecture.listItems.map((item, index) => (
                  <StaggerItem key={index}>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>

          <Separator />

          {/* Challenges & Solutions */}
          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <FadeIn direction="up">
                <h2 className="text-2xl font-bold mb-6">
                  Challenges & Solutions
                </h2>
              </FadeIn>
              {/* <FadeIn direction="up" delay={0.2}>
               <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                 {project.blog.architecture.description}
               </p>
             </FadeIn> */}
              <StaggerContainer className="space-y-2 mb-8" staggerDelay={0.1}>
                {project.blog.solutions.map((item, index) => (
                  <StaggerItem key={index}>
                    <div className="mb-8">
                      {/* <FadeIn direction="up" delay={0.2}> */}
                      <p className="text-lg text-primary mb-4 leading-relaxed">
                        {index + 1} - {item.description}
                      </p>
                      {/* </FadeIn> */}
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          <strong className="mr-2">Problem:</strong>
                          {item.problem}
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          <strong className="mr-2">Solution:</strong>
                          {item.solution}
                        </span>
                      </li>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>

          <Separator />

          {/* Project Closing */}
          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <FadeIn direction="up">
                <h2 className="text-2xl font-bold mb-6">Closing Thoughts</h2>
              </FadeIn>
              <FadeIn direction="up" delay={0.2}>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {project.blog.closing}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-12 px-4 bg-muted/50">
            <div className="max-w-4xl mx-auto text-center">
              <FadeIn direction="up">
                <h2 className="text-2xl font-bold mb-4">
                  Interested in Working Together?
                </h2>
              </FadeIn>
              <FadeIn direction="up" delay={0.2}>
                <p className="text-muted-foreground mb-8">
                  Let&apos;s discuss your next project and see how I can help
                  bring your ideas to life.
                </p>
              </FadeIn>
              <FadeIn direction="up" delay={0.4}>
                <div className="flex gap-4 justify-center">
                  <HoverEffect effect="scale">
                    <Button size="lg">Get In Touch</Button>
                  </HoverEffect>
                  <Link href="/">
                    <HoverEffect effect="scale">
                      <Button variant="outline" size="lg">
                        View More Projects
                      </Button>
                    </HoverEffect>
                  </Link>
                </div>
              </FadeIn>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}

// Generate static params for the dynamic routes
export async function generateStaticParams() {
  return [{ slug: "web-app" }, { slug: "mobile-app" }, { slug: "api-service" }];
}

// Generate metadata for each project page
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projectData[slug];

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} - Adrian Garcia`,
    description: project.description,
  };
}
