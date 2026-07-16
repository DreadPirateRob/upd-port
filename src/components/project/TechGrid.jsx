"use client"

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FadeIn, StaggerContainer, StaggerItem, HoverEffect } from "@/components/animations/AnimationWrapper";
import { technologiesData } from "@/data/technologies";

export default function TechGrid({ technologies }) {
  return (
    <section className="pt-0 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <FadeIn direction="up">
          <h2 className="text-2xl font-bold mb-6">Technologies Used</h2>
        </FadeIn>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.1}>
          {technologies.map((tech, index) => (
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
                      {technologiesData[tech]?.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </HoverEffect>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
