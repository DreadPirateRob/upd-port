import Link from "next/link";
import Footer from "@/components/footer";
import { ClickPowerUp } from "@/components/evil-buttons/click-powerup";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="grid flex-1 grid-rows-[1fr_auto] grid-cols-[1fr_var(--gutter-width)_minmax(0,var(--breakpoint-2xl))_var(--gutter-width)_1fr] overflow-clip [--gutter-width:--spacing(6)] lg:[--gutter-width:--spacing(10)]">
        <div className="col-start-2 row-span-full row-start-1 max-sm:hidden border-x border-x-border bg-size-[10px_10px] bg-fixed bg-[repeating-linear-gradient(315deg,var(--border)_0,var(--border)_1px,transparent_0,transparent_50%)]" />
        <div className="col-start-4 row-span-full row-start-1 max-sm:hidden border-x border-x-border bg-size-[10px_10px] bg-fixed bg-[repeating-linear-gradient(315deg,var(--border)_0,var(--border)_1px,transparent_0,transparent_50%)]" />

        <div className="col-start-3 row-start-1 flex min-h-[70vh] items-center justify-center px-4 py-24 max-sm:col-span-full max-sm:col-start-1">
          <div className="w-full max-w-xl border border-border">
            <div className="bg-foreground px-6 py-8 text-background sm:px-8">
              <p className="font-pixel text-[0.65rem] uppercase tracking-[0.22em]">
                Error 404
              </p>
              <h1 className="mt-4 font-pixel text-3xl uppercase tracking-tight sm:text-4xl">
                Page not found
              </h1>
            </div>

            <div className="px-6 py-8 sm:px-8">
              <p className="max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
                That route does not exist. It may have been renamed, or the case
                study behind it is not published yet.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/">
                  <ClickPowerUp as="span">Back to home</ClickPowerUp>
                </Link>
                <Link href="/#projects-section">
                  <ClickPowerUp as="span" variant="secondary">
                    View projects
                  </ClickPowerUp>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
