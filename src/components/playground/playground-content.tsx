"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "@/components/shared/code-block";
import {
  playgroundTemplates,
  availableTools,
  modelOptions,
  type AgentTemplate,
} from "@/data/playground-templates";

interface AgentConfig {
  name: string;
  model: string;
  instructions: string;
  tools: string[];
}

function generateCode(config: AgentConfig): string {
  const modelOption = modelOptions.find((m) => m.id === config.model);
  const sdkName = modelOption?.sdk ?? "openai";
  const importFrom = modelOption?.importFrom ?? "@ai-sdk/openai";
  const modelCall = `${sdkName}('${config.model}')`;

  const selectedTools = availableTools.filter((t) =>
    config.tools.includes(t.id)
  );

  const toolImport =
    selectedTools.length > 0
      ? `\nimport { createTool } from '@mastra/core/tools';`
      : "";

  const toolDefinitions = selectedTools
    .map((tool) => {
      const varName = tool.id.replace(/-/g, "_") + "Tool";
      return `
const ${varName} = createTool({
  id: '${tool.id}',
  description: '${tool.description}',
  inputSchema: z.object({
    query: z.string().describe('実行クエリ'),
  }),
  execute: async ({ context }) => {
    // ${tool.label}の実装
    return { result: context.query };
  },
});`;
    })
    .join("\n");

  const zodImport = selectedTools.length > 0 ? `\nimport { z } from 'zod';` : "";

  const toolsObject =
    selectedTools.length > 0
      ? `\n  tools: { ${selectedTools.map((t) => t.id.replace(/-/g, "_") + "Tool").join(", ")} },`
      : "";

  const escapedInstructions = config.instructions
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$");

  return `import { ${sdkName} } from '${importFrom}';
import { Agent } from '@mastra/core/agent';${toolImport}${zodImport}
${toolDefinitions}
const agent = new Agent({
  name: '${config.name}',
  instructions: \`${escapedInstructions}\`,
  model: ${modelCall},${toolsObject}
});

// 実行
const result = await agent.generate('ユーザーメッセージ');
console.log(result.text);`;
}

// --- Icon Components ---

function HeadsetIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
      <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  );
}

function WorkflowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="15" y="15" width="6" height="6" rx="1" />
      <path d="M6 9v3a3 3 0 0 0 3 3h6" />
      <path d="m15 12 3 3-3 3" />
    </svg>
  );
}

function getTemplateIcon(icon: string) {
  switch (icon) {
    case "headset":
      return <HeadsetIcon />;
    case "chart":
      return <ChartIcon />;
    case "code":
      return <CodeIcon />;
    case "document":
      return <DocumentIcon />;
    case "workflow":
      return <WorkflowIcon />;
    default:
      return <CodeIcon />;
  }
}

// --- Chat Preview ---

function ChatPreview({
  messages,
  isSimulating,
  onSimulate,
}: {
  messages: AgentTemplate["exampleMessages"];
  isSimulating: boolean;
  onSimulate: () => void;
}) {
  const [visibleMessages, setVisibleMessages] = useState<
    AgentTemplate["exampleMessages"]
  >([]);
  const [typingIndex, setTypingIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isSimulating) {
      setVisibleMessages([]);
      setTypingIndex(-1);
      return;
    }

    let currentIndex = 0;
    setVisibleMessages([]);
    setTypingIndex(-1);

    const showNext = () => {
      if (currentIndex >= messages.length) {
        setTypingIndex(-1);
        return;
      }

      setTypingIndex(currentIndex);

      const delay = messages[currentIndex].role === "assistant" ? 1500 : 500;

      setTimeout(() => {
        setVisibleMessages((prev) => [...prev, messages[currentIndex]]);
        setTypingIndex(-1);
        currentIndex++;
        setTimeout(showNext, 400);
      }, delay);
    };

    const timer = setTimeout(showNext, 300);
    return () => clearTimeout(timer);
  }, [isSimulating, messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleMessages, typingIndex]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border/40 px-4 py-3">
        <h3 className="text-sm font-semibold text-mastra-text">
          チャットプレビュー
        </h3>
        <Button
          size="sm"
          variant={isSimulating ? "outline" : "default"}
          onClick={onSimulate}
          disabled={isSimulating && visibleMessages.length < messages.length}
        >
          {isSimulating ? "実行中..." : "シミュレーション実行"}
        </Button>
      </div>
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {visibleMessages.length === 0 && typingIndex === -1 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              「シミュレーション実行」を押すと、
              <br />
              エージェントの動作イメージを確認できます
            </p>
          )}
          {visibleMessages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-mastra-primary text-white"
                    : "bg-muted text-mastra-text"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {typingIndex >= 0 && (
            <div
              className={`flex ${messages[typingIndex]?.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-lg px-3 py-2 text-sm ${
                  messages[typingIndex]?.role === "user"
                    ? "bg-mastra-primary text-white"
                    : "bg-muted text-mastra-text"
                }`}
              >
                <span className="inline-flex gap-1">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

// --- Config Panel ---

function ConfigPanel({
  config,
  onConfigChange,
  onReset,
}: {
  config: AgentConfig;
  onConfigChange: (config: AgentConfig) => void;
  onReset: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border/40 px-4 py-3">
        <h3 className="text-sm font-semibold text-mastra-text">
          Agent設定
        </h3>
        <Button size="sm" variant="ghost" onClick={onReset}>
          テンプレートにリセット
        </Button>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {/* Agent Name */}
          <div className="space-y-2">
            <Label htmlFor="agent-name">エージェント名</Label>
            <Input
              id="agent-name"
              value={config.name}
              onChange={(e) =>
                onConfigChange({ ...config, name: e.target.value })
              }
              placeholder="エージェントの名前を入力"
            />
          </div>

          <Separator />

          {/* Model Selection */}
          <div className="space-y-3">
            <Label>モデル選択</Label>
            <RadioGroup
              value={config.model}
              onValueChange={(value) =>
                onConfigChange({ ...config, model: value })
              }
            >
              {modelOptions.map((model) => (
                <div key={model.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={model.id} id={`model-${model.id}`} />
                  <Label
                    htmlFor={`model-${model.id}`}
                    className="cursor-pointer font-normal"
                  >
                    {model.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          {/* System Instructions */}
          <div className="space-y-2">
            <Label htmlFor="instructions">システム指示</Label>
            <Textarea
              id="instructions"
              value={config.instructions}
              onChange={(e) =>
                onConfigChange({ ...config, instructions: e.target.value })
              }
              placeholder="エージェントへの指示を入力"
              rows={6}
              className="resize-y"
            />
          </div>

          <Separator />

          {/* Tool Selection */}
          <div className="space-y-3">
            <Label>ツール選択</Label>
            <div className="space-y-3">
              {availableTools.map((tool) => (
                <div
                  key={tool.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex flex-col">
                    <Label
                      htmlFor={`tool-${tool.id}`}
                      className="cursor-pointer font-normal"
                    >
                      {tool.label}
                    </Label>
                    <span className="text-xs text-muted-foreground">
                      {tool.description}
                    </span>
                  </div>
                  <Switch
                    id={`tool-${tool.id}`}
                    checked={config.tools.includes(tool.id)}
                    onCheckedChange={(checked) => {
                      const tools = checked
                        ? [...config.tools, tool.id]
                        : config.tools.filter((t) => t !== tool.id);
                      onConfigChange({ ...config, tools });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

// --- Main Playground Content ---

export function PlaygroundContent() {
  const [selectedTemplate, setSelectedTemplate] =
    useState<AgentTemplate | null>(null);
  const [config, setConfig] = useState<AgentConfig>({
    name: "",
    model: "gpt-4o",
    instructions: "",
    tools: [],
  });
  const [isSimulating, setIsSimulating] = useState(false);
  const [mobileTab, setMobileTab] = useState("config");

  const handleSelectTemplate = useCallback((template: AgentTemplate) => {
    setSelectedTemplate(template);
    setConfig({ ...template.defaultConfig });
    setIsSimulating(false);
  }, []);

  const handleReset = useCallback(() => {
    if (selectedTemplate) {
      setConfig({ ...selectedTemplate.defaultConfig });
      setIsSimulating(false);
    }
  }, [selectedTemplate]);

  const handleSimulate = useCallback(() => {
    setIsSimulating(true);
  }, []);

  const generatedCode = generateCode(config);

  // Template selection view
  if (!selectedTemplate) {
    return (
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              インタラクティブ
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-mastra-text sm:text-4xl">
              Agent Playground
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              テンプレートを選択してAIエージェントの設定をカスタマイズし、
              生成されるTypeScriptコードをリアルタイムでプレビューできます。
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {playgroundTemplates.map((template) => (
              <Card
                key={template.id}
                className="cursor-pointer border-border/40 bg-card/50 transition-all hover:border-mastra-primary/40 hover:shadow-md"
                onClick={() => handleSelectTemplate(template)}
              >
                <CardContent className="pt-6">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-mastra-primary">
                      {getTemplateIcon(template.icon)}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-mastra-text">
                        {template.name}
                      </h3>
                      <Badge variant="outline" className="mt-0.5 text-xs">
                        {template.category}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {template.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Playground editor view
  return (
    <section className="py-6 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedTemplate(null);
                setIsSimulating(false);
              }}
            >
              <ArrowLeftIcon />
              戻る
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-mastra-primary">
                {getTemplateIcon(selectedTemplate.icon)}
              </div>
              <div>
                <h1 className="text-lg font-semibold text-mastra-text">
                  {selectedTemplate.name}
                </h1>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{selectedTemplate.category}</Badge>
          </div>
        </div>

        {/* Mobile: Tabs layout */}
        <div className="lg:hidden">
          <Tabs value={mobileTab} onValueChange={setMobileTab}>
            <TabsList className="w-full">
              <TabsTrigger value="config" className="flex-1">
                設定
              </TabsTrigger>
              <TabsTrigger value="code" className="flex-1">
                コード
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex-1">
                チャット
              </TabsTrigger>
            </TabsList>
            <TabsContent value="config">
              <Card className="mt-4 border-border/40">
                <div className="h-[calc(100vh-280px)]">
                  <ConfigPanel
                    config={config}
                    onConfigChange={setConfig}
                    onReset={handleReset}
                  />
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="code">
              <div className="mt-4">
                <CodeBlock code={generatedCode} language="typescript" />
              </div>
            </TabsContent>
            <TabsContent value="chat">
              <Card className="mt-4 border-border/40">
                <div className="h-[calc(100vh-280px)]">
                  <ChatPreview
                    messages={selectedTemplate.exampleMessages}
                    isSimulating={isSimulating}
                    onSimulate={handleSimulate}
                  />
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Desktop: Split layout */}
        <div className="hidden lg:grid lg:grid-cols-[360px_1fr] lg:gap-6">
          {/* Left: Config Panel */}
          <Card className="border-border/40">
            <div className="h-[calc(100vh-200px)]">
              <ConfigPanel
                config={config}
                onConfigChange={setConfig}
                onReset={handleReset}
              />
            </div>
          </Card>

          {/* Right: Code + Chat */}
          <div className="flex flex-col gap-6">
            {/* Code Preview */}
            <div>
              <CodeBlock code={generatedCode} language="typescript" />
            </div>

            {/* Chat Preview */}
            <Card className="flex-1 border-border/40">
              <div className="h-[calc(100vh-200px-24rem)]">
                <ChatPreview
                  messages={selectedTemplate.exampleMessages}
                  isSimulating={isSimulating}
                  onSimulate={handleSimulate}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Small Icons ---

function ArrowLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}
