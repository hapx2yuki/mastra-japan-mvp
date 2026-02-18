import type { Metadata } from "next";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { ContactForm } from "@/components/shared/contact-form";

export const metadata: Metadata = {
  title: "お問い合わせ — Mastra Japan",
  description:
    "Mastraの導入に関するご質問、資料請求、デモのご依頼はこちらから。2営業日以内にご連絡いたします。",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-mastra-text sm:text-4xl">
              お問い合わせ
            </h1>
            <p className="mt-4 text-muted-foreground">
              ご質問・資料請求・デモのご依頼など、お気軽にお問い合わせください。
            </p>
          </div>
          <div className="mt-12">
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
