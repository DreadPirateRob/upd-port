"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function ToolModal({ tool, onClose }) {
  useEffect(() => {
    if (!tool) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [tool, onClose]);

  return (
    <AnimatePresence>
      {tool && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal — pointer-events-none on centering wrapper so backdrop receives clicks */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              key={tool.name}
              className="w-full max-w-lg pointer-events-auto"
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: "spring", damping: 22, stiffness: 320 }}
            >
              <div className="bg-background border-2 border-border rounded-lg overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="p-6 border-b border-border">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <Badge className="mb-3">{tool.category}</Badge>
                      <h2 className="text-xl font-bold mb-2">{tool.name}</h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0 mt-1"
                      aria-label="Close"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* GIF / screenshot */}
                {tool.gif && (
                  <div className="border-b border-border bg-muted/30">
                    <img
                      src={tool.gif}
                      alt={`${tool.name} demo`}
                      className="w-full"
                    />
                  </div>
                )}

                {/* Footer CTA */}
                {tool.url && (
                  <div className="p-6">
                    <a href={tool.url} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full">
                        Visit {tool.name} ↗
                      </Button>
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
