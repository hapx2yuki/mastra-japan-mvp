export const caseStudies = [
  {
    id: "cs-1",
    companyType: "大手通信企業",
    industry: "通信",
    challenge: "社内AIチャットボットの開発に6ヶ月以上を見込んでいた",
    solution: "Mastraを活用し、TypeScript既存チームがAIエージェントを構築",
    effect: "開発期間を70%短縮、3つのAIエージェントを2ヶ月で本番リリース",
    quote:
      "TypeScriptの既存スキルセットだけでAIエージェントを構築できたことが最大の成果です",
  },
  {
    id: "cs-2",
    companyType: "FinTechスタートアップ",
    industry: "FinTech",
    challenge: "顧客対応の自動化が急務だが、Python人材が不足",
    solution:
      "TypeScript主力チームがMastraで顧客対応AIエージェントを構築",
    effect: "顧客対応の40%を自動化、応答時間を90%短縮",
    quote:
      "Pythonを新たに学ぶ必要がなく、既存のTypeScriptエコシステムの中で完結できました",
  },
] as const;

export type CaseStudy = (typeof caseStudies)[number];
