import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { CodeBlock } from "@/components/shared/code-block";
import { features } from "@/data/features";
import { caseStudies } from "@/data/case-studies";

const heroCode = `import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';

const agent = new Agent({
  name: 'Assistant',
  instructions: 'あなたは親切なアシスタントです。',
  model: openai('gpt-4o'),
});

const result = await agent.generate(
  'TypeScriptの最新トレンドを教えて'
);`;

const trustLogos = ["SoftBank", "PayPal", "Adobe", "Docker", "Replit"];

function CodeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
  );
}

function WorkflowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="6" height="6" rx="1" /><rect x="15" y="15" width="6" height="6" rx="1" /><path d="M6 9v3a3 3 0 0 0 3 3h6" /><path d="m15 12 3 3-3 3" /></svg>
  );
}

function IntegrationIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2v4" /><path d="m6.8 15-3.5 2" /><path d="m20.7 7-3.5 2" /><path d="M6.8 9 3.3 7" /><path d="m20.7 17-3.5-2" /><path d="m9 22 3-8 3 8" /><path d="M8 6h8" /><path d="M12 2a2 2 0 0 0-2 2v4a2 2 0 0 0 4 0V4a2 2 0 0 0-2-2Z" /></svg>
  );
}

function getFeatureIcon(icon: string) {
  switch (icon) {
    case "code":
      return <CodeIcon />;
    case "workflow":
      return <WorkflowIcon />;
    case "integration":
      return <IntegrationIcon />;
    default:
      return <CodeIcon />;
  }
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 to-background py-20 sm:py-32">
          <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
            <Badge variant="secondary" className="mb-6">
              オープンソース AIエージェントフレームワーク
            </Badge>
            <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-mastra-text sm:text-5xl lg:text-6xl">
              TypeScriptで、
              <br />
              <span className="text-mastra-primary">AIエージェント</span>
              を構築しよう
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Mastraは、TypeScriptネイティブのAIエージェントフレームワークです。
              既存のTS/JSスキルセットで、本番品質のAIエージェントを構築・デプロイできます。
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" data-testid="hero-cta-primary">
                <Link href="/getting-started">無料で試す</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                data-testid="hero-cta-secondary"
              >
                <Link href="/contact">資料請求</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-mastra-text">
                なぜMastraが選ばれるのか
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                TypeScript開発者のために設計された、次世代のAIエージェントフレームワーク
              </p>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-3">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  className="border-border/40 bg-card/50 transition-shadow hover:shadow-md"
                >
                  <CardContent className="pt-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-mastra-primary">
                      {getFeatureIcon(feature.icon)}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-mastra-text">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="border-y border-border/40 bg-muted/30 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="mb-8 text-center text-sm font-medium text-muted-foreground">
              導入企業
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
              {trustLogos.map((logo) => (
                <span
                  key={logo}
                  className="text-lg font-semibold text-muted-foreground/60"
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Code Demo Section */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-mastra-text">
                  数行のコードで
                  <br />
                  AIエージェントを構築
                </h2>
                <p className="mt-4 text-muted-foreground">
                  複雑な設定は不要。TypeScriptの知識だけで、AIエージェントの構築を始められます。
                  直感的なAPIで、プロトタイプから本番環境までスムーズに移行できます。
                </p>
                <div className="mt-8">
                  <Button asChild data-testid="code-demo-cta">
                    <Link href="/getting-started">
                      チュートリアルを始める
                    </Link>
                  </Button>
                </div>
              </div>
              <div>
                <CodeBlock code={heroCode} language="typescript" />
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="bg-muted/30 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-mastra-text">
                導入事例
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Mastraを活用して、開発効率を大幅に改善した企業の事例をご紹介します
              </p>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2">
              {caseStudies.map((cs) => (
                <Card
                  key={cs.id}
                  className="border-border/40 bg-background transition-shadow hover:shadow-md"
                >
                  <CardContent className="pt-6">
                    <div className="mb-4 flex items-center gap-3">
                      <Badge variant="outline">{cs.industry}</Badge>
                      <span className="text-sm font-medium text-mastra-text">
                        {cs.companyType}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">
                          課題
                        </p>
                        <p className="text-sm text-mastra-text">
                          {cs.challenge}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">
                          効果
                        </p>
                        <p className="text-sm font-semibold text-mastra-primary">
                          {cs.effect}
                        </p>
                      </div>
                    </div>
                    <blockquote className="mt-4 border-l-2 border-mastra-primary/30 pl-4 text-sm italic text-muted-foreground">
                      &ldquo;{cs.quote}&rdquo;
                    </blockquote>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Bottom Section */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-mastra-text">
              まずは試してみませんか？
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              5分でAIエージェントの構築を始められます。TypeScriptの知識があれば、すぐにスタートできます。
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" data-testid="bottom-cta-primary">
                <Link href="/getting-started">無料で試す</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                data-testid="bottom-cta-secondary"
              >
                <Link href="/contact">資料請求</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
