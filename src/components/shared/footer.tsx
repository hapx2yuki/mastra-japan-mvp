import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <span className="text-lg font-bold text-mastra-primary">
              Mastra
            </span>
            <p className="mt-2 text-sm text-muted-foreground">
              TypeScriptネイティブの
              <br />
              AIエージェントフレームワーク
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">プロダクト</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/getting-started"
                  className="transition-colors hover:text-foreground"
                >
                  Getting Started
                </Link>
              </li>
              <li>
                <a
                  href="https://mastra.ai/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  ドキュメント
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/mastra-ai/mastra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">お問い合わせ</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-foreground"
                >
                  資料請求・お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Mastra. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
