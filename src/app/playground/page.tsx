import type { Metadata } from "next";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { PlaygroundContent } from "@/components/playground/playground-content";

export const metadata: Metadata = {
  title: "Agent Playground — Mastra Japan",
  description:
    "AIエージェントをインタラクティブに設定し、TypeScriptコードをリアルタイムでプレビュー。テンプレートからすぐに始められます。",
};

export default function PlaygroundPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <PlaygroundContent />
      </main>
      <Footer />
    </>
  );
}
