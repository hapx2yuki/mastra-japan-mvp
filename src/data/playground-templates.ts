export interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  defaultConfig: {
    name: string;
    model: string;
    instructions: string;
    tools: string[];
  };
  exampleMessages: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
}

export const availableTools = [
  { id: "web-search", label: "Web検索", description: "インターネット上の情報を検索します" },
  { id: "file-operation", label: "ファイル操作", description: "ファイルの読み書きを行います" },
  { id: "db-connection", label: "DB接続", description: "データベースへの接続・クエリを実行します" },
  { id: "api-integration", label: "API連携", description: "外部APIとの連携を行います" },
] as const;

export type AvailableTool = (typeof availableTools)[number];

export const modelOptions = [
  { id: "gpt-4o", label: "GPT-4o", sdk: "openai", importFrom: "@ai-sdk/openai" },
  { id: "claude-3.5-sonnet", label: "Claude 3.5 Sonnet", sdk: "anthropic", importFrom: "@ai-sdk/anthropic" },
  { id: "gemini-pro", label: "Gemini Pro", sdk: "google", importFrom: "@ai-sdk/google" },
] as const;

export type ModelOption = (typeof modelOptions)[number];

export const playgroundTemplates: AgentTemplate[] = [
  {
    id: "customer-support",
    name: "カスタマーサポートBot",
    description: "顧客対応を自動化するエージェント。よくある質問への回答、問い合わせの分類、エスカレーション判断を行います。",
    category: "サポート",
    icon: "headset",
    defaultConfig: {
      name: "カスタマーサポートBot",
      model: "gpt-4o",
      instructions:
        "あなたは丁寧で親切なカスタマーサポート担当です。\nお客様の質問に対して、正確で分かりやすい回答を提供してください。\n解決できない場合は、担当者へのエスカレーションを提案してください。",
      tools: ["web-search", "db-connection"],
    },
    exampleMessages: [
      { role: "user", content: "注文した商品がまだ届きません。注文番号はORD-12345です。" },
      {
        role: "assistant",
        content:
          "ご不便をおかけして申し訳ございません。注文番号ORD-12345を確認いたします。\n\nお調べしたところ、現在配送中のステータスで、明日中にお届け予定です。配送状況の詳細URLをお送りしますので、ご確認ください。\n\n他にご不明な点はございますか？",
      },
      { role: "user", content: "ありがとうございます。届いたら確認します。" },
      {
        role: "assistant",
        content:
          "かしこまりました。商品到着後、万が一問題がございましたらお気軽にお問い合わせください。\n\n今後ともよろしくお願いいたします。",
      },
    ],
  },
  {
    id: "data-analysis",
    name: "データ分析アシスタント",
    description: "CSVやデータを分析するエージェント。データの傾向分析、統計処理、レポート生成を支援します。",
    category: "分析",
    icon: "chart",
    defaultConfig: {
      name: "データ分析アシスタント",
      model: "gpt-4o",
      instructions:
        "あなたはデータ分析の専門家です。\nユーザーから提供されたデータを分析し、分かりやすい洞察を提供してください。\n統計的な根拠を示しながら、ビジネスに活用できる提案を行ってください。",
      tools: ["file-operation", "db-connection"],
    },
    exampleMessages: [
      { role: "user", content: "先月の売上データを分析して、トレンドを教えてください。" },
      {
        role: "assistant",
        content:
          "先月の売上データを分析しました。主な傾向は以下の通りです。\n\n1. 全体の売上は前月比 +12% で成長傾向\n2. 週末（土日）の売上が平日の約1.8倍\n3. カテゴリ別では「ソフトウェア」が最も伸長（+23%）\n\n特に注目すべきは、新規顧客からの売上比率が35%に増加している点です。マーケティング施策の効果が表れていると考えられます。",
      },
      { role: "user", content: "来月の売上予測もお願いします。" },
      {
        role: "assistant",
        content:
          "過去6ヶ月のトレンドと季節性を考慮した予測結果です。\n\n来月の売上予測: 約1,250万円（±8%の信頼区間）\n\n根拠:\n- 直近3ヶ月の平均成長率: +10%\n- 季節性調整: +3%（年度末需要）\n- 新規顧客獲得トレンドの継続を想定\n\nリスク要因として、競合の新製品リリースが予定されている点にご留意ください。",
      },
    ],
  },
  {
    id: "code-review",
    name: "コードレビューアシスタント",
    description: "TypeScriptコードをレビューするエージェント。バグの検出、パフォーマンス改善、ベストプラクティスの提案を行います。",
    category: "開発",
    icon: "code",
    defaultConfig: {
      name: "コードレビューアシスタント",
      model: "claude-3.5-sonnet",
      instructions:
        "あなたはシニアTypeScriptエンジニアです。\nコードレビューでは、バグ、セキュリティリスク、パフォーマンス問題を指摘してください。\n改善案は具体的なコード例とともに提示してください。",
      tools: ["file-operation"],
    },
    exampleMessages: [
      { role: "user", content: "このTypeScriptコードをレビューしてください。\n\nconst fetchData = async (url) => {\n  const res = await fetch(url);\n  const data = res.json();\n  return data;\n}" },
      {
        role: "assistant",
        content:
          "いくつか改善点があります。\n\n1. **型定義の欠如**: パラメータと戻り値に型を付けましょう\n2. **awaitの欠落**: `res.json()` はPromiseを返すため `await` が必要です\n3. **エラーハンドリング**: レスポンスのステータスチェックがありません\n\n改善後のコード:\n```typescript\nconst fetchData = async <T>(url: string): Promise<T> => {\n  const res = await fetch(url);\n  if (!res.ok) {\n    throw new Error(`HTTP ${res.status}`);\n  }\n  const data: T = await res.json();\n  return data;\n};\n```",
      },
    ],
  },
  {
    id: "document-generator",
    name: "ドキュメント生成エージェント",
    description: "技術文書を自動生成するエージェント。API仕様書、README、設計ドキュメントなどを作成します。",
    category: "ドキュメント",
    icon: "document",
    defaultConfig: {
      name: "ドキュメント生成エージェント",
      model: "gpt-4o",
      instructions:
        "あなたは技術ドキュメントの専門家です。\n明確で構造化されたドキュメントを生成してください。\n対象読者のレベルに合わせて、適切な詳細度で記述してください。",
      tools: ["file-operation", "api-integration"],
    },
    exampleMessages: [
      { role: "user", content: "ユーザー認証APIのドキュメントを生成してください。" },
      {
        role: "assistant",
        content:
          "ユーザー認証APIのドキュメントを生成します。\n\n## POST /api/auth/login\n\nユーザーの認証を行い、JWTトークンを返却します。\n\n**リクエスト:**\n```json\n{\n  \"email\": \"user@example.com\",\n  \"password\": \"********\"\n}\n```\n\n**レスポンス (200):**\n```json\n{\n  \"token\": \"eyJhbGciOiJIUzI1NiIs...\",\n  \"expiresIn\": 3600\n}\n```\n\n**エラーレスポンス (401):**\n```json\n{\n  \"error\": \"認証に失敗しました\"\n}\n```\n\n続けて他のエンドポイントも生成しますか？",
      },
    ],
  },
  {
    id: "workflow-automation",
    name: "ワークフロー自動化エージェント",
    description: "複数ステップの自動化タスクを実行するエージェント。定型業務の自動化やシステム間連携を行います。",
    category: "自動化",
    icon: "workflow",
    defaultConfig: {
      name: "ワークフロー自動化エージェント",
      model: "gpt-4o",
      instructions:
        "あなたはワークフロー自動化の専門家です。\nユーザーの業務プロセスを理解し、効率的な自動化ワークフローを設計・実行してください。\n各ステップの進捗を報告しながら処理を進めてください。",
      tools: ["web-search", "file-operation", "api-integration"],
    },
    exampleMessages: [
      { role: "user", content: "毎週月曜日に、先週のGitHubのPRをまとめてSlackに投稿するワークフローを作ってください。" },
      {
        role: "assistant",
        content:
          "ワークフローを設計しました。以下の3ステップで実行します。\n\n**ステップ1: データ収集**\nGitHub APIから先週のマージ済みPRを取得します。\n→ 完了: 12件のPRを検出\n\n**ステップ2: レポート生成**\nPRをカテゴリ別に整理し、サマリーを生成します。\n→ 完了: 機能追加(5件)、バグ修正(4件)、リファクタリング(3件)\n\n**ステップ3: Slack通知**\n#dev-weeklyチャンネルにフォーマット済みレポートを投稿します。\n→ 完了: 投稿が成功しました\n\n定期実行の設定も行いますか？",
      },
    ],
  },
];
