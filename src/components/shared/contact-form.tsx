"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type FormStep = "input" | "confirm" | "complete";

interface FormData {
  inquiryType: string;
  companyName: string;
  name: string;
  email: string;
  phone: string;
  challenge: string;
}

interface FormErrors {
  inquiryType?: string;
  companyName?: string;
  name?: string;
  email?: string;
  challenge?: string;
}

const inquiryTypes = [
  { value: "document", label: "資料請求" },
  { value: "demo", label: "デモ依頼" },
  { value: "consultation", label: "導入相談" },
  { value: "other", label: "その他" },
];

function getInquiryLabel(value: string): string {
  return inquiryTypes.find((t) => t.value === value)?.label ?? value;
}

const stepLabels: { key: FormStep; label: string }[] = [
  { key: "input", label: "入力" },
  { key: "confirm", label: "確認" },
  { key: "complete", label: "完了" },
];

function StepIndicator({ current }: { current: FormStep }) {
  return (
    <div className="mb-8 flex items-center justify-center gap-2" aria-label="進捗ステップ">
      {stepLabels.map((s, i) => {
        const isCurrent = s.key === current;
        const isPast =
          stepLabels.findIndex((sl) => sl.key === current) > i;
        return (
          <div key={s.key} className="flex items-center gap-2">
            {i > 0 && (
              <div
                className={`h-px w-8 ${isPast || isCurrent ? "bg-mastra-primary" : "bg-border"}`}
              />
            )}
            <div className="flex flex-col items-center gap-1">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                  isCurrent
                    ? "bg-mastra-primary text-white"
                    : isPast
                      ? "bg-mastra-primary/20 text-mastra-primary"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`text-xs ${isCurrent ? "font-semibold text-mastra-text" : "text-muted-foreground"}`}
              >
                {s.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ContactForm() {
  const [step, setStep] = useState<FormStep>("input");
  const [formData, setFormData] = useState<FormData>({
    inquiryType: "",
    companyName: "",
    name: "",
    email: "",
    phone: "",
    challenge: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.inquiryType) {
      newErrors.inquiryType = "お問い合わせ種別を選択してください";
    }
    if (!formData.companyName.trim()) {
      newErrors.companyName = "企業名を入力してください";
    }
    if (!formData.name.trim()) {
      newErrors.name = "氏名を入力してください";
    }
    if (!formData.email.trim()) {
      newErrors.email = "メールアドレスを入力してください";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "正しいメールアドレスを入力してください";
    }
    if (!formData.challenge.trim()) {
      newErrors.challenge = "課題・ご質問を入力してください";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = () => {
    if (validate()) {
      setStep("confirm");
    }
  };

  const handleSubmit = () => {
    // Level 0: no actual API call, just transition to complete
    setStep("complete");
  };

  const handleBack = () => {
    setStep("input");
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Step 3: Complete
  if (step === "complete") {
    return (
      <Card className="border-border/40">
        <CardContent className="py-12 text-center">
          <StepIndicator current="complete" />
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
            <CheckCircleIcon />
          </div>
          <h2 className="text-2xl font-bold text-mastra-text">
            送信が完了しました
          </h2>
          <p className="mt-4 text-muted-foreground">
            お問い合わせいただきありがとうございます。
            <br />
            <strong>2営業日以内</strong>にご連絡いたします。
          </p>
          <div className="mt-8">
            <Button asChild variant="outline" data-testid="contact-back-top">
              <Link href="/">トップに戻る</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Step 2: Confirm
  if (step === "confirm") {
    return (
      <Card className="border-border/40">
        <CardContent className="pt-6">
          <StepIndicator current="confirm" />
          <h2 className="mb-6 text-lg font-semibold text-mastra-text">
            入力内容の確認
          </h2>
          <dl className="space-y-4">
            <ConfirmRow label="お問い合わせ種別" value={getInquiryLabel(formData.inquiryType)} />
            <ConfirmRow label="企業名" value={formData.companyName} />
            <ConfirmRow label="氏名" value={formData.name} />
            <ConfirmRow label="メールアドレス" value={formData.email} />
            <ConfirmRow
              label="電話番号"
              value={formData.phone || "（未入力）"}
            />
            <ConfirmRow label="課題・ご質問" value={formData.challenge} />
          </dl>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              onClick={handleBack}
              data-testid="contact-back"
            >
              戻って修正する
            </Button>
            <Button
              onClick={handleSubmit}
              data-testid="contact-submit"
            >
              この内容で送信する
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Step 1: Input
  return (
    <Card className="border-border/40">
      <CardContent className="pt-6">
        <StepIndicator current="input" />
        <div className="space-y-6">
          {/* Inquiry Type */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">
              お問い合わせ種別 <span className="text-destructive">*</span>
            </Label>
            <RadioGroup
              value={formData.inquiryType}
              onValueChange={(value) => updateField("inquiryType", value)}
            >
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {inquiryTypes.map((type) => (
                  <div key={type.value} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={type.value}
                      id={`inquiry-${type.value}`}
                    />
                    <Label
                      htmlFor={`inquiry-${type.value}`}
                      className="text-sm font-normal"
                    >
                      {type.label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
            {errors.inquiryType && (
              <p className="text-sm text-destructive">{errors.inquiryType}</p>
            )}
          </div>

          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-sm font-semibold">
              企業名 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="companyName"
              placeholder="例: 株式会社サンプル"
              value={formData.companyName}
              onChange={(e) => updateField("companyName", e.target.value)}
            />
            {errors.companyName && (
              <p className="text-sm text-destructive">{errors.companyName}</p>
            )}
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold">
              氏名 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="例: 山田 太郎"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold">
              メールアドレス <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="例: taro@example.com"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Phone (optional) */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-semibold">
              電話番号{" "}
              <span className="text-muted-foreground font-normal">
                （任意）
              </span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="例: 03-1234-5678"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
          </div>

          {/* Challenge/Question */}
          <div className="space-y-2">
            <Label htmlFor="challenge" className="text-sm font-semibold">
              課題・ご質問 <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="challenge"
              placeholder="現在の課題やご質問をお聞かせください"
              rows={5}
              value={formData.challenge}
              onChange={(e) => updateField("challenge", e.target.value)}
            />
            {errors.challenge && (
              <p className="text-sm text-destructive">{errors.challenge}</p>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-2">
            <Button
              onClick={handleConfirm}
              data-testid="contact-confirm"
            >
              確認画面へ
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ConfirmRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-border/40 pb-3">
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-1 whitespace-pre-wrap text-sm text-mastra-text">
        {value}
      </dd>
    </div>
  );
}

function CheckCircleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#22c55e"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
