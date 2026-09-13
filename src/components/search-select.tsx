import { useMemo, useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { TraitGroup } from "@/lib/traits";

type SearchSelectProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  groups: TraitGroup[];
  placeholder?: string;
  noneLabel?: string;
  allowCustom?: boolean;
};

function filterGroups(groups: TraitGroup[], query: string): TraitGroup[] {
  const q = query.trim().toLowerCase();
  if (!q) return groups;
  return groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => item.toLowerCase().includes(q)),
    }))
    .filter((group) => group.items.length > 0);
}

export function SearchSelect({
  id,
  label,
  value,
  onChange,
  groups,
  placeholder = "Не указано",
  noneLabel = "Не указано",
  allowCustom = false,
}: SearchSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => filterGroups(groups, query), [groups, query]);
  const q = query.trim();
  const hasExact = groups.some((g) =>
    g.items.some((item) => item.toLowerCase() === q.toLowerCase()),
  );
  const showCustom = allowCustom && q.length > 0 && !hasExact;

  function pick(next: string) {
    onChange(next);
    setOpen(false);
    setQuery("");
  }

  return (
    <div className="flex min-w-0 flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Popover
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) setQuery("");
        }}
      >
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            className={cn(
              "h-11 w-full justify-between rounded-sm px-3 font-normal",
              !value && "text-subtle",
            )}
            aria-expanded={open}
          >
            <span className="truncate">{value || placeholder}</span>
            <span className="flex items-center gap-1">
              {value ? (
                <span
                  role="button"
                  tabIndex={-1}
                  className="rounded-sm p-1 text-muted hover:text-fg"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    onChange("");
                  }}
                  aria-label="Очистить"
                >
                  <X className="size-3.5" />
                </span>
              ) : null}
              <ChevronsUpDown className="size-4 text-muted" />
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <div className="border-b border-border p-2">
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Поиск…"
              aria-label={`Поиск: ${label}`}
              className="h-10 w-full rounded-sm bg-elevated px-3 text-sm text-fg outline-none placeholder:text-subtle"
            />
          </div>
          <div className="max-h-64 overflow-y-auto py-1">
            <button
              type="button"
              className="flex h-10 w-full items-center px-3 text-left text-sm text-muted hover:bg-elevated hover:text-fg"
              onClick={() => pick("")}
            >
              {noneLabel}
            </button>
            {showCustom ? (
              <button
                type="button"
                className="flex h-10 w-full items-center px-3 text-left text-sm hover:bg-elevated"
                onClick={() => pick(q)}
              >
                Добавить «{q}»
              </button>
            ) : null}
            {filtered.map((group) => (
              <div key={group.group} className="pt-1">
                {groups.length > 1 || group.group !== "Все" ? (
                  <p className="px-3 pb-1 pt-2 text-xs font-medium uppercase tracking-wider text-subtle">
                    {group.group}
                  </p>
                ) : null}
                {group.items.map((item) => {
                  const selected = item === value;
                  return (
                    <button
                      key={item}
                      type="button"
                      className={cn(
                        "flex h-10 w-full items-center gap-2 px-3 text-left text-sm hover:bg-elevated",
                        selected && "bg-elevated",
                      )}
                      onClick={() => pick(item)}
                    >
                      <Check
                        className={cn(
                          "size-3.5 shrink-0",
                          selected ? "opacity-100" : "opacity-0",
                        )}
                      />
                      <span className="truncate">{item}</span>
                    </button>
                  );
                })}
              </div>
            ))}
            {filtered.length === 0 && !showCustom ? (
              <p className="px-3 py-6 text-center text-sm text-muted">Ничего не найдено</p>
            ) : null}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

type MultiSearchSelectProps = {
  id: string;
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  groups: TraitGroup[];
  placeholder?: string;
};

export function MultiSearchSelect({
  id,
  label,
  values,
  onChange,
  groups,
  placeholder = "Не указано",
}: MultiSearchSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => filterGroups(groups, query), [groups, query]);
  const selected = new Set(values);

  function toggle(item: string) {
    if (selected.has(item)) {
      onChange(values.filter((value) => value !== item));
    } else {
      onChange([...values, item]);
    }
  }

  const summary = values.length ? values.join(" + ") : placeholder;

  return (
    <div className="flex min-w-0 flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Popover
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) setQuery("");
        }}
      >
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            className={cn(
              "h-11 w-full justify-between rounded-sm px-3 font-normal",
              !values.length && "text-subtle",
            )}
            aria-expanded={open}
          >
            <span className="truncate">{summary}</span>
            <ChevronsUpDown className="size-4 shrink-0 text-muted" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <div className="border-b border-border p-2">
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Поиск…"
              aria-label={`Поиск: ${label}`}
              className="h-10 w-full rounded-sm bg-elevated px-3 text-sm text-fg outline-none placeholder:text-subtle"
            />
          </div>
          <div className="max-h-64 overflow-y-auto py-1">
            {filtered.map((group) => (
              <div key={group.group} className="pt-1">
                <p className="px-3 pb-1 pt-2 text-xs font-medium uppercase tracking-wider text-subtle">
                  {group.group}
                </p>
                {group.items.map((item) => {
                  const isOn = selected.has(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      className={cn(
                        "flex h-10 w-full items-center gap-2 px-3 text-left text-sm hover:bg-elevated",
                        isOn && "bg-elevated",
                      )}
                      onClick={() => toggle(item)}
                    >
                      <Check
                        className={cn(
                          "size-3.5 shrink-0",
                          isOn ? "opacity-100" : "opacity-0",
                        )}
                      />
                      <span className="truncate">{item}</span>
                    </button>
                  );
                })}
              </div>
            ))}
            {filtered.length === 0 ? (
              <p className="px-3 py-6 text-center text-sm text-muted">Ничего не найдено</p>
            ) : null}
          </div>
        </PopoverContent>
      </Popover>
      {values.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {values.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-elevated py-1 pl-2.5 pr-1 text-xs text-fg"
            >
              {item}
              <button
                type="button"
                className="rounded-full p-1 text-muted hover:text-fg"
                onClick={() => toggle(item)}
                aria-label={`Убрать ${item}`}
              >
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
