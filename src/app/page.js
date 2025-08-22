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
import {
  FadeIn,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
  HoverEffect,
  TextReveal,
} from "@/components/animations/AnimationWrapper";
import Timeline from "@/components/Timeline";

export default function Home() {
  const projects = [
    {
      slug: "web-app",
      title: "Modern Web Application",
      description: "A full-stack web application built with Next.js and React",
      tags: ["React", "Next.js", "Tailwind"],
      isEven: true,
    },
    {
      slug: "mobile-app",
      title: "Mobile Application",
      description: "Cross-platform mobile app with React Native",
      tags: ["React Native", "TypeScript", "Expo"],
      isEven: false,
    },
    {
      slug: "api-service",
      title: "API Service",
      description: "RESTful API service with Node.js and Express",
      tags: ["Node.js", "Express", "MongoDB"],
      isEven: false,
    },
    {
      slug: "database-design",
      title: "Database Design",
      description: "Designing a database for a web application",
      tags: ["Database", "SQL", "NoSQL"],
      isEven: true,
    },
  ];

  const timelineItems = [
    {
      id: 1,
      date: "2025",
      type: "Education",
      company: "University of Yo mama",
      title: "Bachelor of Science in Not a real degree",
      description: "I learned how to code and how to be a good person",
      skills: ["HTML", "CSS", "JavaScript"],
    },
    {
      id: 2,
      date: "2025",
      type: "Education",
      company: "University of Yo mama",
      title: "Bachelor of Science in Not a real degree",
      description: "I learned how to code and how to be a good person",
      skills: ["HTML", "CSS", "JavaScript"],
    },
    {
      id: 3,
      date: "2025",
      type: "Education",
      company: "University of Yo mama",
      title: "Bachelor of Science in Not a real degree",
      description: "I learned how to code and how to be a good person",
      skills: ["HTML", "CSS", "JavaScript"],
    },
    {
      id: 4,
      date: "2025",
      type: "Education",
      company: "University of Yo mama",
      title: "Bachelor of Science in Not a real degree",
      description: "I learned how to code and how to be a good person",
      skills: ["HTML", "CSS", "JavaScript"],
    },
    {
      id: 5,
      date: "2025",
      type: "Education",
      company: "University of Yo mama",
      title: "Bachelor of Science in Not a real degree",
      description: "I learned how to code and how to be a good person",
      skills: ["HTML", "CSS", "JavaScript"],
    },
  ];

  const skills = [
    {
      slug: "frontend-development",
      title: "Frontend Development",
      description:
        "With a strong focus on frontend development I strive to craft seamless and intuitive interfaces that elevate the digital experience for users while maintaining a clean codebase.",
      tags: ["MUI", "React", "Sass", "Tailwind", "Gastby"],
      colSpan: "col-span-14",
    },
    {
      slug: "testing-and-development",
      title: "Testing and Development",
      description:
        "In addition to my core skills, I possess a range of complementary abilities that contribute to my overall proficiency.",
      tags: ["Github", "Jest", "Webpack"],
      colSpan: "col-span-10",
    },
    {
      slug: "server-side-development",
      title: "Server-Side Development",
      description:
        "Specializing in creating robust APIs and ensuring seamless interaction between frontend and backend services.",
      tags: ["Express", "GraphQL", "OAuth"],
      colSpan: "col-span-8",
    },
    {
      slug: "blockchain-development",
      title: "Blockchain Development",
      description:
        "Creating secure and efficient smart contracts for decentralized applications (dApps) with a focus on security and efficiency.",
      tags: ["Solidty", "IPFS", "Ganache"],
      colSpan: "col-span-8",
    },
    {
      slug: "ux-ui-design",
      title: "UX/UI Design",
      description:
        "Ensuring that the applications I design meet the needs of users and provide a seamless and engaging interaction.",
      tags: ["Figma", "Adobe XD", "Framer"],
      colSpan: "col-span-8",
    },
    {
      slug: "collaboration",
      title: "Collaboration",
      description:
        "With a strong focus on collaboration, I strive to create a positive and productive work environment that fosters innovation.",
      tags: ["Github", "Jest", "Webpack"],
      colSpan: "col-span-10",
    },
    {
      slug: "backend-development",
      title: "Backend Development",
      description:
        "I prioritize data security, authentication and authorization mechanisms to deliver secure and efficient server-side solutions while maintaining a clean codebase.",
      tags: ["Firebase", "MongoDB", "Contentful", "NodeJS"],
      colSpan: "col-span-14",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="grid flex-1 grid-rows-[1fr_auto] overflow-clip grid-cols-[1fr_var(--gutter-width)_minmax(0,var(--breakpoint-2xl))_var(--gutter-width)_1fr] [--gutter-width:--spacing(6)] lg:[--gutter-width:--spacing(10)]">
        <div className="col-start-2 row-span-full row-start-1 max-sm:hidden border-x border-x-border bg-size-[10px_10px] bg-fixed bg-[repeating-linear-gradient(315deg,var(--border)_0,var(--border)_1px,transparent_0,transparent_50%)]"></div>
        <div className="col-start-4 row-span-full row-start-1 max-sm:hidden border-x border-x-border bg-size-[10px_10px] bg-fixed bg-[repeating-linear-gradient(315deg,var(--border)_0,var(--border)_1px,transparent_0,transparent_50%)]"></div>
        <div className="col-start-3 row-start-1 max-sm:col-span-full max-sm:col-start-1">
          {/* Hero Section */}
          <section className="h-[90vh] flex items-center justify-center py-20 px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <FadeIn direction="down" delay={0.2}>
                <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
                  Welcome to My Portfolio
                </h1>
              </FadeIn>
              <FadeIn direction="up" delay={0.4}>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  I&apos;m a developer passionate about creating amazing web
                  experiences. Check out my projects and see what I&apos;ve been
                  working on.
                </p>
              </FadeIn>
              <FadeIn direction="up" delay={0.6}>
                <div className="flex gap-4 justify-center">
                  <HoverEffect effect="scale">
                    <Button size="lg">View Projects</Button>
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

          {/* Skills Section */}
          <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
              {/* <FadeIn direction="down" delay={0.2}>
                <h1 className="text-9xl mb-[-1000px] font-bold tracking-tight text-center">
                  SKILLS SKILLS SKILLS SKILLS SKILLS SKILLS SKILLS SKILLS SKILLS
                  SKILLS SKILLS SKILLS SKILLS SKILLS SKILLS SKILLS SKILLS SKILLS
                </h1>
              </FadeIn> */}

              {/* <FadeIn direction="up">
                <h2 className="text-3xl font-bold text-center mb-12">Skills</h2>
              </FadeIn> */}
              <StaggerContainer
                className="grid grid-cols-1 md:grid-cols-24 gap-6"
                staggerDelay={0.2}
              >
                {skills.map((skill, index) => {
                  return (
                    <StaggerItem
                      key={skill.slug}
                      // className={skill.isEven ? "col-span-8" : "col-span-16"}
                      className={skill.colSpan}
                    >
                      <HoverEffect effect="lift">
                        <Card className="h-full border-2 transition-all duration-300 hover:border-primary/20">
                          <CardHeader>
                            <CardTitle>{skill.title}</CardTitle>
                            <CardDescription>
                              {skill.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2">
                              {skill.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </HoverEffect>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>
          </section>

          <Separator />

          {/* About Section */}
          <section className="py-16 px-4 bg-muted/50">
            <div className="max-w-4xl mx-auto text-right">
              <FadeIn direction="right">
                <Badge variant="outline" className="text-lg mb-6">
                  About Me
                </Badge>
              </FadeIn>
              <FadeIn direction="left" delay={0.2}>
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
                  I&apos;m a full-stack developer with experience in modern web
                  technologies. I love building scalable applications and
                  learning new technologies. This portfolio showcases some of my
                  recent work and experiments.
                </h2>
              </FadeIn>
            </div>
          </section>

          <Separator />

          {/* Projects Section */}
          <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <FadeIn direction="up">
                <h2 className="text-3xl font-bold text-center mb-12">
                  Featured Projects
                </h2>
              </FadeIn>
              <StaggerContainer
                className="grid grid-cols-1 md:grid-cols-12 gap-6"
                staggerDelay={0.2}
              >
                {projects.map((project, index) => {
                  return (
                    <StaggerItem
                      key={project.slug}
                      className={project.isEven ? "col-span-5" : "col-span-7"}
                    >
                      <HoverEffect effect="lift">
                        <Card className="h-full border-2 transition-all duration-300 hover:border-primary/20">
                          <CardHeader>
                            <CardTitle>{project.title}</CardTitle>
                            <CardDescription>
                              {project.description}
                            </CardDescription>
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
                                <Button className="w-full">View Project</Button>
                              </HoverEffect>
                            </Link>
                          </CardContent>
                        </Card>
                      </HoverEffect>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>
          </section>

          <Separator />

          {/* Timeline Section */}
          <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <FadeIn direction="up">
                <h2 className="text-3xl font-bold text-center mb-12">
                  Timeline
                </h2>
              </FadeIn>
              <Timeline items={timelineItems} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
