import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { CodeBlock } from "@/components/shared/code-block";
import { steps } from "@/data/getting-started";

export const metadata = {
  title: "Getting Started — Mastra Japan",
  description:
    "Mastraを使ったAIエージェント構築を5分で始めましょう。Node.js 18+とTypeScriptがあればすぐにスタートできます。",
};

export default function GettingStartedPage() {
  return (
    <>
      <Header />
      <main className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {/* Page Header */}
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              チュートリアル
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-mastra-text sm:text-4xl">
              Getting Started
            </h1>
            <p className="mt-4 text-muted-foreground">
              Mastraを使ったAIエージェント構築を始めましょう
            </p>
            <div className="mt-2 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <ClockIcon />
              <span>所要時間: 約5分</span>
            </div>
          </div>

          {/* Prerequisites */}
          <div className="mt-12 rounded-lg border border-border/40 bg-muted/30 p-6">
            <h2 className="mb-3 text-sm font-semibold text-mastra-text">
              前提条件
            </h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircleIcon />
                Node.js 18以上
              </li>
              <li className="flex items-center gap-2">
                <CheckCircleIcon />
                TypeScript (推奨)
              </li>
            </ul>
          </div>

          {/* Steps */}
          <div className="mt-12 space-y-8">
            {steps.map((step) => (
              <Card
                key={step.stepNumber}
                className="border-border/40 overflow-hidden"
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-mastra-primary text-sm font-bold text-white">
                      {step.stepNumber}
                    </span>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <CodeBlock code={step.code} language={step.language} />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <h2 className="text-xl font-bold text-mastra-text">
              もっと詳しく知りたいですか？
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              詳細なドキュメントや、導入に関するご相談はお気軽にお問い合わせください。
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild variant="outline" data-testid="gs-cta-docs">
                <a
                  href="https://mastra.ai/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ドキュメントを見る
                </a>
              </Button>
              <Button asChild data-testid="gs-cta-contact">
                <Link href="/contact">お問い合わせ</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function ClockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2563EB"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
