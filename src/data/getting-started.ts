export const steps = [
  {
    stepNumber: 1,
    title: "プロジェクトを作成",
    description:
      "ターミナルで以下のコマンドを実行して、Mastraプロジェクトを作成します。",
    code: "npm create mastra@latest",
    language: "bash",
  },
  {
    stepNumber: 2,
    title: "エージェントを定義",
    description:
      "src/mastra/agents/index.ts を開き、AIエージェントを定義します。",
    code: `import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';

export const myAgent = new Agent({
  name: 'My Agent',
  instructions: 'あなたは親切なアシスタントです。',
  model: openai('gpt-4o'),
});`,
    language: "typescript",
  },
  {
    stepNumber: 3,
    title: "実行して確認",
    description:
      "開発サーバーを起動して、エージェントの動作を確認します。",
    code: "npx mastra dev",
    language: "bash",
  },
] as const;

export type Step = (typeof steps)[number];
