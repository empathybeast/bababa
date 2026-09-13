import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Cat, Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSearchSelect, SearchSelect } from "@/components/search-select";
import { PassportCard } from "@/components/passport-card";
import { buildDescription } from "@/lib/description";
import { cn } from "@/lib/utils";
import {
  BALACLAVAS,
  COLORS,
  EARS,
  EYES,
  EXAMPLE_SNOW_WHITE,
  FANGS,
  GENDERS,
  MANES,
  MARKINGS,
  MUTATIONS,
  PIEBALDS,
  RARITIES,
  TAILS,
  TYPES,
  emptyPassport,
  groupsOf,
  type PassportState,
} from "@/lib/traits";

const STORAGE_KEY = "passport-okrasa";

function loadState(): PassportState {
  if (typeof window === "undefined") return emptyPassport();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyPassport();
    const parsed = JSON.parse(raw) as Partial<PassportState>;
    return { ...emptyPassport(), ...parsed };
  } catch {
    return emptyPassport();
  }
}

export function PassportApp() {
  const [state, setState] = useState<PassportState>(emptyPassport);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const id = window.setTimeout(() => {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, 180);
    return () => window.clearTimeout(id);
  }, [state, hydrated]);

  const text = useMemo(() => buildDescription(state), [state]);

  function patch(partial: Partial<PassportState>) {
    setState((current) => ({ ...current, ...partial }));
  }

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 pb-28 sm:px-6 lg:px-8 lg:py-12 lg:pb-12">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-widest text-muted">
              Генератор описания
            </p>
            <h1 className="mt-2 font-display text-4xl font-medium tracking-tight text-balance sm:text-5xl">
              Паспорт окраса
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted text-pretty">
              Соберите черты из списков — имя, окрас, пегость, глаза и балаклава сложатся
              в готовую строку.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              onClick={() => setState(EXAMPLE_SNOW_WHITE)}
            >
              <Cat className="size-4" />
              Пример Белоснежки
            </Button>
            <Button variant="ghost" onClick={() => setState(emptyPassport())}>
              <RotateCcw className="size-4" />
              Сбросить
            </Button>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:items-start">
          <div className="flex flex-col gap-5">
            <Section title="Общее">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex min-w-0 flex-col gap-2 sm:col-span-2">
                  <Label htmlFor="photoUrl">Ссылка на фото</Label>
                  <Input
                    id="photoUrl"
                    type="url"
                    value={state.photoUrl}
                    onChange={(event) => patch({ photoUrl: event.target.value })}
                    placeholder="https://vk.ru/photo-…"
                    autoComplete="off"
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-2">
                  <Label htmlFor="ownerUrl">Ссылка хозяина</Label>
                  <Input
                    id="ownerUrl"
                    type="url"
                    value={state.ownerUrl}
                    onChange={(event) => patch({ ownerUrl: event.target.value })}
                    placeholder="https://vk.com/id…"
                    autoComplete="off"
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-2">
                  <Label htmlFor="ownerNick">Ник хозяина</Label>
                  <Input
                    id="ownerNick"
                    value={state.ownerNick}
                    onChange={(event) => patch({ ownerNick: event.target.value })}
                    placeholder="Orevo Thaw"
                    autoComplete="off"
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-2 sm:col-span-2">
                  <Label htmlFor="name">Имя</Label>
                  <Input
                    id="name"
                    value={state.name}
                    onChange={(event) => patch({ name: event.target.value })}
                    placeholder="Белоснежка"
                    autoComplete="off"
                  />
                </div>
                <SearchSelect
                  id="gender"
                  label="Пол"
                  value={state.gender}
                  onChange={(gender) => patch({ gender })}
                  groups={groupsOf(GENDERS)}
                />
                <SearchSelect
                  id="rarity"
                  label="Редкость"
                  value={state.rarity}
                  onChange={(rarity) => patch({ rarity })}
                  groups={groupsOf(RARITIES)}
                  allowCustom
                />
                <SearchSelect
                  id="type"
                  label="Тип"
                  value={state.type}
                  onChange={(type) => patch({ type })}
                  groups={groupsOf(TYPES)}
                  allowCustom
                />
              </div>
            </Section>

            <Section title="Окрас">
              <div className="grid gap-4 sm:grid-cols-2">
                <SearchSelect
                  id="color"
                  label="Окрас"
                  value={state.color}
                  onChange={(color) => patch({ color })}
                  groups={COLORS}
                />
                <MultiSearchSelect
                  id="markings"
                  label="Отметины"
                  values={state.markings}
                  onChange={(markings) => patch({ markings })}
                  groups={MARKINGS}
                  placeholder="Без отметин"
                />
                <MultiSearchSelect
                  id="piebald"
                  label="Пегость"
                  values={state.piebald}
                  onChange={(piebald) => patch({ piebald })}
                  groups={PIEBALDS}
                  placeholder="Без пегости"
                />
                <SearchSelect
                  id="eyes"
                  label="Глаза"
                  value={state.eyes}
                  onChange={(eyes) => patch({ eyes })}
                  groups={groupsOf(EYES)}
                />
                <div className="sm:col-span-2">
                  <MultiSearchSelect
                    id="balaclava"
                    label="Балаклава"
                    values={state.balaclava}
                    onChange={(balaclava) => patch({ balaclava })}
                    groups={BALACLAVAS}
                    placeholder="Без балаклавы"
                  />
                </div>
              </div>
            </Section>

            <Section title="Дополнительно">
              <p className="mb-4 text-sm text-muted">
                Попадают в строку «Доп.информация», только если отличаются от С-т / Нет.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <SearchSelect
                  id="mane"
                  label="Грива"
                  value={state.mane}
                  onChange={(mane) => patch({ mane })}
                  groups={groupsOf(MANES)}
                  placeholder="С-т"
                  noneLabel="С-т"
                />
                <SearchSelect
                  id="fangs"
                  label="Клыки"
                  value={state.fangs}
                  onChange={(fangs) => patch({ fangs })}
                  groups={groupsOf(FANGS)}
                  placeholder="С-т"
                  noneLabel="С-т"
                />
                <SearchSelect
                  id="mutations"
                  label="Мутации"
                  value={state.mutations}
                  onChange={(mutations) => patch({ mutations })}
                  groups={groupsOf(MUTATIONS)}
                  placeholder="Нет"
                  noneLabel="Нет"
                />
                <SearchSelect
                  id="tail"
                  label="Хвост"
                  value={state.tail}
                  onChange={(tail) => patch({ tail })}
                  groups={groupsOf(TAILS)}
                  placeholder="С-т"
                  noneLabel="С-т"
                />
                <SearchSelect
                  id="ears"
                  label="Уши"
                  value={state.ears}
                  onChange={(ears) => patch({ ears })}
                  groups={groupsOf(EARS)}
                  placeholder="С-т"
                  noneLabel="С-т"
                />
              </div>
            </Section>

            <Section title="Помёт">
              <button
                type="button"
                role="checkbox"
                aria-checked={state.kitten}
                id="kitten"
                onClick={() => patch({ kitten: !state.kitten })}
                className="flex h-11 w-full items-center gap-3 rounded-sm border border-border bg-elevated px-3 text-left text-sm transition-[background-color] duration-150 hover:bg-surface"
              >
                <span
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center rounded-sm border border-border",
                    state.kitten && "border-accent bg-accent text-accent-fg",
                  )}
                >
                  {state.kitten ? <Check className="size-3.5" /> : null}
                </span>
                Котёнок
              </button>
              {state.kitten ? (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="flex min-w-0 flex-col gap-2 sm:col-span-2">
                    <Label htmlFor="litter">Из помёта</Label>
                    <Input
                      id="litter"
                      value={state.litter}
                      onChange={(event) => patch({ litter: event.target.value })}
                      autoComplete="off"
                    />
                  </div>
                  <div className="flex min-w-0 flex-col gap-2">
                    <Label htmlFor="mother">Мать</Label>
                    <Input
                      id="mother"
                      value={state.mother}
                      onChange={(event) => patch({ mother: event.target.value })}
                      autoComplete="off"
                    />
                  </div>
                  <div className="flex min-w-0 flex-col gap-2">
                    <Label htmlFor="father">Отец</Label>
                    <Input
                      id="father"
                      value={state.father}
                      onChange={(event) => patch({ father: event.target.value })}
                      autoComplete="off"
                    />
                  </div>
                  <div className="flex min-w-0 flex-col gap-2 sm:col-span-2">
                    <Label htmlFor="siblings">Сиблинги</Label>
                    <Input
                      id="siblings"
                      value={state.siblings}
                      onChange={(event) => patch({ siblings: event.target.value })}
                      autoComplete="off"
                    />
                  </div>
                </div>
              ) : null}
            </Section>
          </div>

          <PassportCard text={text} />
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-surface p-5 sm:p-6">
      <h2 className="mb-5 font-display text-xl font-medium tracking-tight">{title}</h2>
      {children}
    </section>
  );
}
