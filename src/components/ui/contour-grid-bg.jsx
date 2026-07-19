"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const contourPaths = [
  "M-140 676C58 590 198 556 358 568C508 580 642 652 792 644C970 634 1110 524 1338 548",
  "M-120 590C116 494 264 452 430 464C592 476 706 568 868 570C1034 572 1174 476 1360 430",
  "M-92 506C142 410 318 360 498 372C660 384 782 478 934 492C1100 506 1212 444 1380 342",
  "M-60 430C186 330 344 288 536 298C714 308 838 390 998 398C1156 406 1272 344 1416 236",
  "M-10 350C228 258 404 216 602 224C764 230 906 294 1060 300C1208 306 1320 254 1450 160",
  "M286 472C348 374 458 316 592 316C734 316 854 382 884 482C914 584 820 680 676 706C538 732 392 660 322 572C294 536 282 506 286 472Z",
  "M378 470C424 410 508 370 606 370C724 370 808 430 832 508C856 588 782 654 668 668C558 682 450 634 402 564C382 534 372 500 378 470Z",
  "M468 474C506 438 560 418 622 418C706 418 766 462 784 526C804 596 744 646 662 654C582 662 510 626 476 576C456 548 452 506 468 474Z",
];

export default function ContourGridBackground({ className }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit]",
        className
      )}
    >
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.035),rgba(0,0,0,0))] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0))]" />

      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.52, 0.64, 0.52], x: [0, 8, 0], y: [0, -6, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.07)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:72px_72px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:18px_18px]" />
      </motion.div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(0,0,0,0.07),transparent_30%),radial-gradient(circle_at_50%_32%,rgba(0,0,0,0.025),transparent_54%)] dark:bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.09),transparent_30%),radial-gradient(circle_at_50%_32%,rgba(255,255,255,0.03),transparent_54%)]" />

      <motion.div
        className="absolute inset-[-6%]"
        animate={{ opacity: [0.7, 0.82, 0.7], x: [0, -10, 0], y: [0, 6, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          className="h-full w-full text-black/25 dark:text-white/12"
          viewBox="0 0 1200 800"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          {contourPaths.map((path, index) => {
            const isClosedLoop = index >= 5;

            return (
              <path
                key={path}
                d={path}
                stroke="currentColor"
                strokeOpacity={isClosedLoop ? 0.9 : 0.7}
                strokeWidth={isClosedLoop ? 1.25 : 1}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>
      </motion.div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_0%,transparent_34%,rgba(0,0,0,0.10)_64%,rgba(0,0,0,0.28)_100%)] dark:bg-[radial-gradient(circle_at_50%_45%,transparent_0%,transparent_34%,rgba(0,0,0,0.22)_64%,rgba(0,0,0,0.66)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.14),transparent_22%,transparent_78%,rgba(255,255,255,0.10))] dark:bg-[linear-gradient(to_right,rgba(0,0,0,0.48),transparent_22%,transparent_78%,rgba(0,0,0,0.42))]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/35 to-background/10" />
    </div>
  );
}
