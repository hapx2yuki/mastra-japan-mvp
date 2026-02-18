export const features = [
  {
    icon: "code",
    title: "TypeScriptネイティブ",
    description:
      "TypeScriptファーストの設計で、型安全なAIエージェントを構築。既存のTS/JSスキルセットがそのまま活かせます。",
  },
  {
    icon: "workflow",
    title: "本番品質のワークフロー",
    description:
      "エージェント間の連携、エラーハンドリング、リトライ機能を標準装備。プロトタイプから本番環境まで一気通貫。",
  },
  {
    icon: "integration",
    title: "豊富なインテグレーション",
    description:
      "OpenAI、Anthropic、Google等の主要LLMプロバイダーに対応。44以上のツール統合で拡張性を確保。",
  },
] as const;

export type Feature = (typeof features)[number];
