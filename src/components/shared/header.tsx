import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-mastra-primary">
            Mastra
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            Japan
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/playground"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Playground
          </Link>
          <Link
            href="/getting-started"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            はじめる
          </Link>
          <Button asChild size="sm" data-testid="header-cta-contact">
            <Link href="/contact">お問い合わせ</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
