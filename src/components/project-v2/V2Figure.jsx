import Image from "next/image";

import { cn } from "@/lib/utils";

export default function V2Figure({
  src,
  alt,
  caption,
  ratio = "aspect-[4/3]",
  priority = false,
  className,
}) {
  if (!src || !alt) {
    return null;
  }

  return (
    <figure
      className={cn(
        "overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]",
        className,
      )}
    >
      <div className={cn("relative overflow-hidden bg-zinc-900", ratio)}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 32rem, (min-width: 1024px) 40vw, 100vw"
          className="object-cover"
        />
      </div>
      {caption ? (
        <figcaption className="border-t border-white/10 px-5 py-4 text-sm leading-6 text-zinc-400 sm:px-6">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
