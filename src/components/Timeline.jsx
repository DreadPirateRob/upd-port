"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem, HoverEffect } from "@/components/animations/AnimationWrapper";

const Timeline = ({ items }) => {
  return (
    <div className="relative">
      {/* Vertical Line */}
      <FadeIn direction="up" delay={0.2}>
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary to-primary/20" />
      </FadeIn>

      {/* Timeline Items */}
      <StaggerContainer className="space-y-8" staggerDelay={0.2}>
        {items.map((item, index) => (
          <StaggerItem key={index}>
            <TimelineItem item={item} index={index} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
};

const TimelineItem = ({ item, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`relative flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
      {/* Timeline Dot */}
      <div className={`absolute ${isEven ? 'left-6' : 'right-6 lg:left-6'} z-10`}>
        <FadeIn direction="in" delay={0.1}>
          <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg">
            <div className="w-full h-full bg-primary/20 rounded-full animate-pulse" />
          </div>
        </FadeIn>
      </div>

      {/* Content Card */}
      <div className={`flex-1 ${isEven ? 'ml-16 lg:ml-16' : 'mr-16 lg:ml-16'} max-w-md lg:max-w-lg`}>
        <HoverEffect effect="lift">
          <Card className="border-2 transition-all duration-300 hover:border-primary/20 hover:shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="text-xs">
                  {item.date}
                </Badge>
                {item.type && (
                  <Badge variant="secondary" className="text-xs">
                    {item.type}
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg">{item.title}</CardTitle>
              {item.company && (
                <CardDescription className="font-medium text-primary">
                  {item.company}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
              {item.skills && item.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {item.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </HoverEffect>
      </div>

      {/* Connecting Line Animation */}
      <FadeIn direction={isEven ? "right" : "left"} delay={0.3}>
        <div className={`hidden lg:block absolute ${isEven ? 'left-12' : 'right-12 lg:left-12'} w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent`} />
      </FadeIn>
    </div>
  );
};

export default Timeline;
