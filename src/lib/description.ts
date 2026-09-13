import type { PassportState } from "./traits";

/** Expanded instrumental form after «глаза с …». */
const EYE_INSTRUMENTAL: Record<string, string> = {
  "Центр. гетерохромия": "центральной гетерохромией",
  "Сект. гетерохромия": "секторной гетерохромией",
  "Полн. гетерохромия": "полной гетерохромией",
  Инвертированные: "инвертированными",
  Бесцветные: "бесцветными",
  "Тройная гетерохромия": "тройной гетерохромией",
  Индиго: "индиго",
  Молочные: "молочными",
  "Золотая чешуя": "золотой чешуёй",
  "Квадро гетерохромия": "квадро гетерохромией",
  "Гетерохромия инвертированная": "инвертированной гетерохромией",
  "Гетерохромия индиго": "гетерохромией индиго",
  Кристальные: "кристальными",
  Мозаичные: "мозаичными",
  Градиент: "градиентом",
};

function lower(value: string): string {
  return value.trim().toLowerCase();
}

function isBlank(value: string | undefined): boolean {
  return !value || !value.trim();
}

function isStandard(value: string): boolean {
  const v = value.trim();
  return v === "" || v === "С-т" || v === "с-т";
}

function isNoMutation(value: string): boolean {
  const v = value.trim();
  return v === "" || v === "Нет" || v === "нет";
}

function joinPlus(values: string[]): string {
  return values.map(lower).filter(Boolean).join(" + ");
}

function eyesPhrase(eyes: string): string | null {
  if (isBlank(eyes)) return null;
  if (eyes.trim() === "Чистые") return "глаза чистые";
  const form = EYE_INSTRUMENTAL[eyes.trim()] ?? lower(eyes);
  return `глаза с ${form}`;
}

function coatLine(state: PassportState): string | null {
  const parts: string[] = [];
  const hasMarkings = state.markings.some((item) => item.trim());
  const piebald = joinPlus(state.piebald);
  const eyes = eyesPhrase(state.eyes);
  const balaclava = joinPlus(state.balaclava);
  const hasColor = !isBlank(state.color);
  const hasCoat = hasColor || hasMarkings || Boolean(piebald) || Boolean(eyes) || Boolean(balaclava);

  if (!hasCoat) return null;

  const colorBits = [state.color, ...state.markings]
    .map((item) => lower(item))
    .filter(Boolean);
  if (!hasMarkings) colorBits.push("без отметин");
  if (colorBits.length) parts.push(colorBits.join(" "));

  parts.push(piebald ? `пегость типа ${piebald}` : "без пегости");
  if (eyes) parts.push(eyes);
  if (balaclava) parts.push(`балаклава ${balaclava}`);

  return `${parts.join(", ")}.`;
}

function extraLine(state: PassportState): string | null {
  const bits: string[] = [];
  if (!isStandard(state.mane)) bits.push(`грива ${lower(state.mane)}`);
  if (!isStandard(state.fangs)) bits.push(`клыки ${lower(state.fangs)}`);
  if (!isNoMutation(state.mutations)) bits.push(lower(state.mutations));
  if (!isStandard(state.tail)) bits.push(`хвост ${lower(state.tail)}`);
  if (!isStandard(state.ears)) bits.push(`уши ${lower(state.ears)}`);
  if (!bits.length) return null;
  return bits.join(", ");
}

export function buildDescription(state: PassportState): string {
  const blocks: string[] = [];

  if (!isBlank(state.photoUrl)) blocks.push(state.photoUrl.trim());

  const ownerUrl = state.ownerUrl.trim();
  const ownerNick = state.ownerNick.trim();
  if (ownerUrl || ownerNick) {
    blocks.push(`Хозяин: [${ownerUrl}|${ownerNick}]`);
  }

  const main: string[] = [];
  if (!isBlank(state.name)) main.push(`Имя: ${state.name.trim()}`);
  if (!isBlank(state.gender)) main.push(`Пол: ${lower(state.gender)}`);
  if (!isBlank(state.rarity)) main.push(`Редкость: ${lower(state.rarity)}`);
  if (!isBlank(state.type)) main.push(`Тип: ${lower(state.type)}`);
  const coat = coatLine(state);
  if (coat) main.push(`Окрас: ${coat}`);
  if (main.length) blocks.push(main.join("\n"));

  const extra = extraLine(state);
  if (extra) blocks.push(`Доп.информация : ${extra}`);

  if (state.kitten) {
    blocks.push(
      [
        `Из помёта: ${state.litter.trim()}`,
        `Мать: ${state.mother.trim()}`,
        `Отец: ${state.father.trim()}`,
        `Сиблинги: ${state.siblings.trim()}`,
        "~",
      ].join("\n"),
    );
  }

  return blocks.join("\n\n");
}
