import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildDescription } from "./description.ts";
import { EXAMPLE_SNOW_WHITE, emptyPassport } from "./traits.ts";

describe("buildDescription", () => {
  it("matches the Snow White spec example", () => {
    const text = buildDescription(EXAMPLE_SNOW_WHITE);
    assert.equal(
      text,
      [
        "https://vk.ru/photo-226624193_457243286",
        "",
        "Хозяин: [https://vk.com/id202049323|Orevo Thaw]",
        "",
        "Имя: Белоснежка",
        "Пол: самка",
        "Редкость: стандартный",
        "Тип: европейский",
        "Окрас: серый тикированный, пегость типа смокинг, глаза с центральной гетерохромией, балаклава умеренная + светлая.",
      ].join("\n"),
    );
  });

  it("returns empty string for a blank passport", () => {
    assert.equal(buildDescription(emptyPassport()), "");
  });

  it("omits standard extras and Нет mutations", () => {
    const text = buildDescription({
      ...EXAMPLE_SNOW_WHITE,
      mane: "С-т",
      fangs: "С-т",
      mutations: "Нет",
      tail: "С-т",
      ears: "С-т",
    });
    assert.equal(text.includes("Доп.информация"), false);
  });

  it("appends extra traits after Доп.информация in the specified order", () => {
    const text = buildDescription({
      ...emptyPassport(),
      name: "Ива",
      mane: "Пышная",
      fangs: "Длинные",
      mutations: "Полидактилия",
      tail: "Помпон",
      ears: "Кёрл",
    });
    assert.equal(
      text,
      [
        "Имя: Ива",
        "",
        "Доп.информация : грива пышная, клыки длинные, полидактилия, хвост помпон, уши кёрл",
      ].join("\n"),
    );
  });

  it("joins several piebald types with +", () => {
    const text = buildDescription({
      ...emptyPassport(),
      color: "Чёрный",
      piebald: ["Смокинг", "Перчатки"],
    });
    assert.equal(text, "Окрас: чёрный без отметин, пегость типа смокинг + перчатки.");
  });

  it("renders clean eyes without «с»", () => {
    const text = buildDescription({
      ...emptyPassport(),
      color: "Белый",
      eyes: "Чистые",
    });
    assert.equal(text, "Окрас: белый без отметин, без пегости, глаза чистые.");
  });

  it("keeps the name casing and lowercases identity fields", () => {
    const text = buildDescription({
      ...emptyPassport(),
      name: "Алая Лапа",
      gender: "Самец",
      rarity: "Редкий",
      type: "Сибирский",
    });
    assert.equal(
      text,
      ["Имя: Алая Лапа", "Пол: самец", "Редкость: редкий", "Тип: сибирский"].join(
        "\n",
      ),
    );
  });

  it("writes без отметин and без пегости when those fields are empty", () => {
    const text = buildDescription({
      ...emptyPassport(),
      color: "Серый",
    });
    assert.equal(text, "Окрас: серый без отметин, без пегости.");
  });

  it("writes без пегости when piebald is empty but markings are set", () => {
    const text = buildDescription({
      ...emptyPassport(),
      color: "Серый",
      markings: ["Тикированный"],
    });
    assert.equal(text, "Окрас: серый тикированный, без пегости.");
  });

  it("writes без отметин when markings are empty but piebald is set", () => {
    const text = buildDescription({
      ...emptyPassport(),
      color: "Серый",
      piebald: ["Смокинг"],
    });
    assert.equal(text, "Окрас: серый без отметин, пегость типа смокинг.");
  });

  it("writes a photo url without a heading and owner as wiki mention", () => {
    const text = buildDescription({
      ...emptyPassport(),
      photoUrl: "https://vk.ru/photo-226624193_457243286",
      ownerUrl: "https://vk.com/id202049323",
      ownerNick: "Orevo Thaw",
    });
    assert.equal(
      text,
      [
        "https://vk.ru/photo-226624193_457243286",
        "",
        "Хозяин: [https://vk.com/id202049323|Orevo Thaw]",
      ].join("\n"),
    );
  });

  it("appends the litter block at the bottom when kitten is checked", () => {
    const text = buildDescription({
      ...emptyPassport(),
      name: "Ива",
      kitten: true,
      litter: "весенний",
      mother: "Белоснежка",
      father: "Уголёк",
      siblings: "Роса, Уголь",
    });
    assert.equal(
      text,
      [
        "Имя: Ива",
        "",
        "Из помёта: весенний",
        "Мать: Белоснежка",
        "Отец: Уголёк",
        "Сиблинги: Роса, Уголь",
        "~",
      ].join("\n"),
    );
  });

  it("keeps empty litter labels when kitten is checked without values", () => {
    const text = buildDescription({
      ...emptyPassport(),
      kitten: true,
    });
    assert.equal(
      text,
      ["Из помёта: ", "Мать: ", "Отец: ", "Сиблинги: ", "~"].join("\n"),
    );
  });

  it("puts a blank line after extra info before the kitten block", () => {
    const text = buildDescription({
      ...emptyPassport(),
      name: "Ива",
      mane: "Пышная",
      kitten: true,
    });
    assert.equal(
      text,
      [
        "Имя: Ива",
        "",
        "Доп.информация : грива пышная",
        "",
        "Из помёта: ",
        "Мать: ",
        "Отец: ",
        "Сиблинги: ",
        "~",
      ].join("\n"),
    );
  });
});
