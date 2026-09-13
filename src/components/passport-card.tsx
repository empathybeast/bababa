import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PassportCardProps = {
  text: string;
};

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function PassportCard({ text }: PassportCardProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    if (!text) return;
    const ok = await copyText(text);
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <>
      <aside className="lg:sticky lg:top-6">
        <article
          className={cn(
            "flex min-h-80 flex-col rounded-xl bg-paper p-6 text-paper-fg shadow-soft",
            "sm:min-h-96 sm:p-8",
          )}
        >
          <header className="mb-6 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-paper-muted">
                Готовое описание
              </p>
              <h2 className="mt-1 font-display text-2xl font-medium tracking-tight">
                Паспорт
              </h2>
            </div>
            <Button
              variant="paper"
              size="sm"
              className="shrink-0"
              onClick={copy}
              disabled={!text}
            >
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              {copied ? "Скопировано" : "Копировать"}
            </Button>
          </header>
          <div className="h-px bg-paper-fg/12" />
          {text ? (
            <pre className="mt-6 flex-1 whitespace-pre-wrap font-display text-lg leading-relaxed text-pretty">
              {text}
            </pre>
          ) : (
            <p className="mt-6 flex-1 font-display text-lg leading-relaxed text-paper-muted">
              Выберите черты — описание появится здесь одной строкой окраса, готовой к
              копированию.
            </p>
          )}
        </article>
      </aside>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 p-3 lg:hidden">
        <div className="pointer-events-auto flex items-end gap-2 rounded-lg border border-border bg-paper p-3 text-paper-fg shadow-soft">
          <p className="min-w-0 flex-1 truncate font-display text-sm leading-snug">
            {text || "Описание появится по мере выбора черт"}
          </p>
          <Button
            variant="paper"
            size="sm"
            className="shrink-0"
            onClick={copy}
            disabled={!text}
          >
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            {copied ? "Готово" : "Копировать"}
          </Button>
        </div>
      </div>
    </>
  );
}
