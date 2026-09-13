import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as ChevronsUpDown, i as Copy, o as Check, r as RotateCcw, s as Cat, t as X } from "../_libs/lucide-react.mjs";
import { i as Slot } from "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { i as Trigger, n as Portal, r as Root2, t as Content2 } from "../_libs/@radix-ui/react-popover+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DTZWx8iz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-[color,background-color,opacity,transform] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90",
			secondary: "border border-border bg-elevated text-fg hover:bg-surface",
			ghost: "text-fg hover:bg-elevated",
			outline: "border border-border bg-transparent text-fg hover:bg-elevated",
			paper: "bg-paper-fg text-paper hover:opacity-90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, type = "button", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		type: asChild ? void 0 : type,
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function Input({ className, type = "text", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-sm border border-border bg-elevated px-3 text-sm text-fg shadow-none transition-[border-color,box-shadow] duration-150", "placeholder:text-subtle", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", "disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("text-xs font-medium tracking-wide text-muted", className),
		...props
	});
}
var Popover = Root2;
var PopoverTrigger = Trigger;
function PopoverContent({ className, align = "start", sideOffset = 6, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		align,
		sideOffset,
		className: cn("z-50 w-[var(--radix-popover-trigger-width)] overflow-hidden rounded-md border border-border bg-surface p-0 text-fg shadow-soft outline-none", className),
		...props
	}) });
}
function filterGroups(groups, query) {
	const q = query.trim().toLowerCase();
	if (!q) return groups;
	return groups.map((group) => ({
		...group,
		items: group.items.filter((item) => item.toLowerCase().includes(q))
	})).filter((group) => group.items.length > 0);
}
function SearchSelect({ id, label, value, onChange, groups, placeholder = "Не указано", noneLabel = "Не указано", allowCustom = false }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const filtered = (0, import_react.useMemo)(() => filterGroups(groups, query), [groups, query]);
	const q = query.trim();
	const hasExact = groups.some((g) => g.items.some((item) => item.toLowerCase() === q.toLowerCase()));
	const showCustom = allowCustom && q.length > 0 && !hasExact;
	function pick(next) {
		onChange(next);
		setOpen(false);
		setQuery("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-w-0 flex-col gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: id,
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
			open,
			onOpenChange: (next) => {
				setOpen(next);
				if (!next) setQuery("");
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					id,
					variant: "outline",
					className: cn("h-11 w-full justify-between rounded-sm px-3 font-normal", !value && "text-subtle"),
					"aria-expanded": open,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: value || placeholder
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1",
						children: [value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							role: "button",
							tabIndex: -1,
							className: "rounded-sm p-1 text-muted hover:text-fg",
							onClick: (event) => {
								event.preventDefault();
								event.stopPropagation();
								onChange("");
							},
							"aria-label": "Очистить",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, { className: "size-4 text-muted" })]
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
				className: "p-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-b border-border p-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						autoFocus: true,
						value: query,
						onChange: (event) => setQuery(event.target.value),
						placeholder: "Поиск…",
						"aria-label": `Поиск: ${label}`,
						className: "h-10 w-full rounded-sm bg-elevated px-3 text-sm text-fg outline-none placeholder:text-subtle"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-h-64 overflow-y-auto py-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "flex h-10 w-full items-center px-3 text-left text-sm text-muted hover:bg-elevated hover:text-fg",
							onClick: () => pick(""),
							children: noneLabel
						}),
						showCustom ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex h-10 w-full items-center px-3 text-left text-sm hover:bg-elevated",
							onClick: () => pick(q),
							children: [
								"Добавить «",
								q,
								"»"
							]
						}) : null,
						filtered.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-1",
							children: [groups.length > 1 || group.group !== "Все" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "px-3 pb-1 pt-2 text-xs font-medium uppercase tracking-wider text-subtle",
								children: group.group
							}) : null, group.items.map((item) => {
								const selected = item === value;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: cn("flex h-10 w-full items-center gap-2 px-3 text-left text-sm hover:bg-elevated", selected && "bg-elevated"),
									onClick: () => pick(item),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: cn("size-3.5 shrink-0", selected ? "opacity-100" : "opacity-0") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate",
										children: item
									})]
								}, item);
							})]
						}, group.group)),
						filtered.length === 0 && !showCustom ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-3 py-6 text-center text-sm text-muted",
							children: "Ничего не найдено"
						}) : null
					]
				})]
			})]
		})]
	});
}
function MultiSearchSelect({ id, label, values, onChange, groups, placeholder = "Не указано" }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const filtered = (0, import_react.useMemo)(() => filterGroups(groups, query), [groups, query]);
	const selected = new Set(values);
	function toggle(item) {
		if (selected.has(item)) onChange(values.filter((value) => value !== item));
		else onChange([...values, item]);
	}
	const summary = values.length ? values.join(" + ") : placeholder;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-w-0 flex-col gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: id,
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
				open,
				onOpenChange: (next) => {
					setOpen(next);
					if (!next) setQuery("");
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						id,
						variant: "outline",
						className: cn("h-11 w-full justify-between rounded-sm px-3 font-normal", !values.length && "text-subtle"),
						"aria-expanded": open,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: summary
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, { className: "size-4 shrink-0 text-muted" })]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
					className: "p-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-b border-border p-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							autoFocus: true,
							value: query,
							onChange: (event) => setQuery(event.target.value),
							placeholder: "Поиск…",
							"aria-label": `Поиск: ${label}`,
							className: "h-10 w-full rounded-sm bg-elevated px-3 text-sm text-fg outline-none placeholder:text-subtle"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-h-64 overflow-y-auto py-1",
						children: [filtered.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "px-3 pb-1 pt-2 text-xs font-medium uppercase tracking-wider text-subtle",
								children: group.group
							}), group.items.map((item) => {
								const isOn = selected.has(item);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: cn("flex h-10 w-full items-center gap-2 px-3 text-left text-sm hover:bg-elevated", isOn && "bg-elevated"),
									onClick: () => toggle(item),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: cn("size-3.5 shrink-0", isOn ? "opacity-100" : "opacity-0") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate",
										children: item
									})]
								}, item);
							})]
						}, group.group)), filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-3 py-6 text-center text-sm text-muted",
							children: "Ничего не найдено"
						}) : null]
					})]
				})]
			}),
			values.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1.5",
				children: values.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1 rounded-full border border-border bg-elevated py-1 pl-2.5 pr-1 text-xs text-fg",
					children: [item, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "rounded-full p-1 text-muted hover:text-fg",
						onClick: () => toggle(item),
						"aria-label": `Убрать ${item}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
					})]
				}, item))
			}) : null
		]
	});
}
async function copyText(text) {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch {
		return false;
	}
}
function PassportCard({ text }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	async function copy() {
		if (!text) return;
		if (!await copyText(text)) return;
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1600);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
		className: "lg:sticky lg:top-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: cn("flex min-h-80 flex-col rounded-xl bg-paper p-6 text-paper-fg shadow-soft", "sm:min-h-96 sm:p-8"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "mb-6 flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-widest text-paper-muted",
						children: "Готовое описание"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-2xl font-medium tracking-tight",
						children: "Паспорт"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "paper",
						size: "sm",
						className: "shrink-0",
						onClick: copy,
						disabled: !text,
						children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), copied ? "Скопировано" : "Копировать"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px bg-paper-fg/12" }),
				text ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "mt-6 flex-1 whitespace-pre-wrap font-display text-lg leading-relaxed text-pretty",
					children: text
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 flex-1 font-display text-lg leading-relaxed text-paper-muted",
					children: "Выберите черты — описание появится здесь одной строкой окраса, готовой к копированию."
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none fixed inset-x-0 bottom-0 z-40 p-3 lg:hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-auto flex items-end gap-2 rounded-lg border border-border bg-paper p-3 text-paper-fg shadow-soft",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "min-w-0 flex-1 truncate font-display text-sm leading-snug",
				children: text || "Описание появится по мере выбора черт"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "paper",
				size: "sm",
				className: "shrink-0",
				onClick: copy,
				disabled: !text,
				children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), copied ? "Готово" : "Копировать"]
			})]
		})
	})] });
}
/** Expanded instrumental form after «глаза с …». */
var EYE_INSTRUMENTAL = {
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
	Градиент: "градиентом"
};
function lower(value) {
	return value.trim().toLowerCase();
}
function isBlank(value) {
	return !value || !value.trim();
}
function isStandard(value) {
	const v = value.trim();
	return v === "" || v === "С-т" || v === "с-т";
}
function isNoMutation(value) {
	const v = value.trim();
	return v === "" || v === "Нет" || v === "нет";
}
function joinPlus(values) {
	return values.map(lower).filter(Boolean).join(" + ");
}
function eyesPhrase(eyes) {
	if (isBlank(eyes)) return null;
	if (eyes.trim() === "Чистые") return "глаза чистые";
	return `глаза с ${EYE_INSTRUMENTAL[eyes.trim()] ?? lower(eyes)}`;
}
function coatLine(state) {
	const parts = [];
	const colorBits = [state.color, ...state.markings].map((item) => lower(item)).filter(Boolean);
	if (colorBits.length) parts.push(colorBits.join(" "));
	const piebald = joinPlus(state.piebald);
	if (piebald) parts.push(`пегость типа ${piebald}`);
	const eyes = eyesPhrase(state.eyes);
	if (eyes) parts.push(eyes);
	const balaclava = joinPlus(state.balaclava);
	if (balaclava) parts.push(`балаклава ${balaclava}`);
	if (!parts.length) return null;
	return `${parts.join(", ")}.`;
}
function extraLine(state) {
	const bits = [];
	if (!isStandard(state.mane)) bits.push(`грива ${lower(state.mane)}`);
	if (!isStandard(state.fangs)) bits.push(`клыки ${lower(state.fangs)}`);
	if (!isNoMutation(state.mutations)) bits.push(lower(state.mutations));
	if (!isStandard(state.tail)) bits.push(`хвост ${lower(state.tail)}`);
	if (!isStandard(state.ears)) bits.push(`уши ${lower(state.ears)}`);
	if (!bits.length) return null;
	return bits.join(", ");
}
function buildDescription(state) {
	const lines = [];
	if (!isBlank(state.name)) lines.push(`Имя: ${state.name.trim()}`);
	if (!isBlank(state.gender)) lines.push(`Пол: ${lower(state.gender)}`);
	if (!isBlank(state.rarity)) lines.push(`Редкость: ${lower(state.rarity)}`);
	if (!isBlank(state.type)) lines.push(`Тип: ${lower(state.type)}`);
	const coat = coatLine(state);
	if (coat) lines.push(`Окрас: ${coat}`);
	const extra = extraLine(state);
	if (extra) lines.push(`Доп.информация : ${extra}`);
	return lines.join("\n");
}
var emptyPassport = () => ({
	name: "",
	gender: "",
	rarity: "",
	type: "",
	color: "",
	markings: [],
	piebald: [],
	eyes: "",
	balaclava: [],
	mane: "",
	fangs: "",
	mutations: "",
	tail: "",
	ears: ""
});
/** Canonical example from the spec. */
var EXAMPLE_SNOW_WHITE = {
	name: "Белоснежка",
	gender: "самка",
	rarity: "стандартный",
	type: "европейский",
	color: "Серый",
	markings: ["Тикированный"],
	piebald: ["Смокинг"],
	eyes: "Центр. гетерохромия",
	balaclava: ["Умеренная", "Светлая"],
	mane: "",
	fangs: "",
	mutations: "",
	tail: "",
	ears: ""
};
var GENDERS = ["самка", "самец"];
var RARITIES = [
	"стандартный",
	"необычный",
	"редкий",
	"очень редкий",
	"уникальный",
	"легендарный"
];
var TYPES = [
	"европейский",
	"азиатский",
	"американский",
	"африканский",
	"сибирский",
	"ориентальный",
	"смешанный"
];
var COLORS = [
	{
		group: "Базовые",
		items: [
			"Чёрный",
			"Циннамон",
			"Красный",
			"Шоколадный",
			"Коричневый",
			"Кремовый",
			"Серый",
			"Лиловый",
			"Ланевый",
			"Белый",
			"Барсучий",
			"Красный с выцветанием",
			"Серый с выцветанием"
		]
	},
	{
		group: "Подпалины и каштановые",
		items: [
			"Чёрный с подпалинами",
			"Серый с подпалинами",
			"Циннамон с подпалинами",
			"Шоколадный с подпалинами",
			"Коричный с подпалинами",
			"Ланевый с подпалинами",
			"Лиловый с подпалинами",
			"Чёрный каштановый",
			"Шоколадный каштановый",
			"Молочный барсучий",
			"Красный барсучий"
		]
	},
	{
		group: "Черепаховые",
		items: [
			"Черепаховый",
			"Шоколадный черепаховый",
			"Коричный черепаховый",
			"Серокремовый",
			"Лиловокремовый",
			"Циннамон-красный",
			"Фавн-кремовый",
			"Черепаховый абрикосовый",
			"Серокремовый абрикосовый",
			"Лиловокремовый абрикосовый",
			"Циннамон-абрикосовый",
			"Осветлённый барсучий",
			"Бургунди",
			"Соломенный"
		]
	},
	{
		group: "Редкие",
		items: [
			"Альбинос",
			"Каштановый",
			"Голубой",
			"Абрикосовый",
			"Изабелловый",
			"Каштановый с подпалинами",
			"Голубой с подпалинами",
			"Изабелловый с подпалинами",
			"Чепрачный",
			"Абрикосовый чепрачный",
			"Каштановый чепрачный",
			"Голубой чепрачный",
			"Изабелловый чепрачный",
			"Серебристо-коричный"
		]
	},
	{
		group: "Жемчуг и чалые",
		items: [
			"Молочный жемчуг",
			"Туманный жемчуг",
			"Чёрный жемчуг",
			"Чёрный бархатный",
			"Чёрный чалый",
			"Красный чалый",
			"Красный жемчуг",
			"Розовый жемчуг",
			"Медный перламутровый"
		]
	}
];
var MARKINGS = [
	{
		group: "Рисунок",
		items: [
			"Полосатый",
			"Мраморный",
			"Пятнистый",
			"Дымчатый",
			"Мелкопятнистый",
			"Тикированный"
		]
	},
	{
		group: "Эффекты",
		items: [
			"Торти",
			"Вотермарк",
			"Сепия",
			"Минк",
			"Линкс",
			"Загар",
			"Тик. пег",
			"Налёт",
			"Гребень",
			"Химера",
			"Затушёванный",
			"Горение"
		]
	},
	{
		group: "Прочее",
		items: [
			"Тигровый",
			"Исчезающий",
			"Рассыпной"
		]
	}
];
var PIEBALDS = [
	{
		group: "Белые отметины",
		items: [
			"Медальон",
			"Медальон с грудью",
			"Грудь и живот",
			"Смокинг",
			"Накидка",
			"Крылья",
			"Арлекин",
			"Лопатки",
			"Галька",
			"Перчатки",
			"Лакрица",
			"Секторная",
			"Кошачий ван",
			"Отметина на морде"
		]
	},
	{
		group: "Узоры",
		items: [
			"Аппалуза",
			"Паутина",
			"Валлийская",
			"Чубарый",
			"Белая черепаховость",
			"Белая калико",
			"Скунс",
			"Снежная буря"
		]
	},
	{
		group: "Прочее",
		items: ["Витилиго"]
	},
	{
		group: "Дополнительные",
		items: [
			"Гольфы",
			"Побережье",
			"Оковы",
			"Молния",
			"Плащ",
			"Штаны",
			"Пятна",
			"Полосы",
			"Живот"
		]
	}
];
var BALACLAVAS = [
	{
		group: "Размер",
		items: [
			"Умеренная",
			"Средняя",
			"Большая",
			"Очень большая",
			"Шапочка",
			"Туманность"
		]
	},
	{
		group: "Охват",
		items: ["Обширная", "Обхватывающая"]
	},
	{
		group: "Цвет",
		items: [
			"Красная",
			"Голубая",
			"Светлая",
			"С градиентом",
			"С цветными отметинами"
		]
	},
	{
		group: "Особые",
		items: [
			"Серебряная",
			"Золотая",
			"Пёстрая",
			"Смоляная",
			"Звёздное небо"
		]
	}
];
var EYES = [
	"Чистые",
	"Центр. гетерохромия",
	"Сект. гетерохромия",
	"Полн. гетерохромия",
	"Инвертированные",
	"Бесцветные",
	"Тройная гетерохромия",
	"Индиго",
	"Молочные",
	"Золотая чешуя",
	"Квадро гетерохромия",
	"Гетерохромия инвертированная",
	"Гетерохромия индиго",
	"Кристальные",
	"Мозаичные",
	"Градиент"
];
var FANGS = [
	"Истёртые",
	"Длинные",
	"Выгнутые"
];
var MUTATIONS = [
	"Полидактилия",
	"Полиотия",
	"Раздвоенный хвост"
];
var MANES = ["Скудная", "Пышная"];
var TAILS = [
	"Помпон",
	"Кроличий",
	"Удлинённый",
	"Полукаралька",
	"Бесхвостый",
	"Каралька",
	"Экстремально длинный"
];
var EARS = [
	"Маленькие кисточки",
	"Большие кисточки",
	"Остроконечные",
	"Пушистые",
	"Полувисячие",
	"Кёрл",
	"Карликовые",
	"Висячие"
];
function groupsOf(items, group = "Все") {
	return [{
		group,
		items
	}];
}
var STORAGE_KEY = "passport-okrasa";
function loadState() {
	if (typeof window === "undefined") return emptyPassport();
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return emptyPassport();
		const parsed = JSON.parse(raw);
		return {
			...emptyPassport(),
			...parsed
		};
	} catch {
		return emptyPassport();
	}
}
function PassportApp() {
	const [state, setState] = (0, import_react.useState)(emptyPassport);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setState(loadState());
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		const id = window.setTimeout(() => {
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
		}, 180);
		return () => window.clearTimeout(id);
	}, [state, hydrated]);
	const text = (0, import_react.useMemo)(() => buildDescription(state), [state]);
	function patch(partial) {
		setState((current) => ({
			...current,
			...partial
		}));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 pb-28 sm:px-6 lg:px-8 lg:py-12 lg:pb-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium uppercase tracking-widest text-muted",
							children: "Генератор описания"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 font-display text-4xl font-medium tracking-tight text-balance sm:text-5xl",
							children: "Паспорт окраса"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-md text-sm leading-relaxed text-muted text-pretty",
							children: "Соберите черты из списков — имя, окрас, пегость, глаза и балаклава сложатся в готовую строку."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						onClick: () => setState(EXAMPLE_SNOW_WHITE),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cat, { className: "size-4" }), "Пример Белоснежки"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						onClick: () => setState(emptyPassport()),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "Сбросить"]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Общее",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex min-w-0 flex-col gap-2 sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "name",
											children: "Имя"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "name",
											value: state.name,
											onChange: (event) => patch({ name: event.target.value }),
											placeholder: "Белоснежка",
											autoComplete: "off"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchSelect, {
										id: "gender",
										label: "Пол",
										value: state.gender,
										onChange: (gender) => patch({ gender }),
										groups: groupsOf(GENDERS)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchSelect, {
										id: "rarity",
										label: "Редкость",
										value: state.rarity,
										onChange: (rarity) => patch({ rarity }),
										groups: groupsOf(RARITIES),
										allowCustom: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchSelect, {
										id: "type",
										label: "Тип",
										value: state.type,
										onChange: (type) => patch({ type }),
										groups: groupsOf(TYPES),
										allowCustom: true
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Окрас",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchSelect, {
										id: "color",
										label: "Окрас",
										value: state.color,
										onChange: (color) => patch({ color }),
										groups: COLORS
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MultiSearchSelect, {
										id: "markings",
										label: "Отметины",
										values: state.markings,
										onChange: (markings) => patch({ markings }),
										groups: MARKINGS,
										placeholder: "Без отметин"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MultiSearchSelect, {
										id: "piebald",
										label: "Пегость",
										values: state.piebald,
										onChange: (piebald) => patch({ piebald }),
										groups: PIEBALDS,
										placeholder: "Без пегости"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchSelect, {
										id: "eyes",
										label: "Глаза",
										value: state.eyes,
										onChange: (eyes) => patch({ eyes }),
										groups: groupsOf(EYES)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "sm:col-span-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MultiSearchSelect, {
											id: "balaclava",
											label: "Балаклава",
											values: state.balaclava,
											onChange: (balaclava) => patch({ balaclava }),
											groups: BALACLAVAS,
											placeholder: "Без балаклавы"
										})
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
							title: "Дополнительно",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-4 text-sm text-muted",
								children: "Попадают в строку «Доп.информация», только если отличаются от С-т / Нет."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchSelect, {
										id: "mane",
										label: "Грива",
										value: state.mane,
										onChange: (mane) => patch({ mane }),
										groups: groupsOf(MANES),
										placeholder: "С-т",
										noneLabel: "С-т"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchSelect, {
										id: "fangs",
										label: "Клыки",
										value: state.fangs,
										onChange: (fangs) => patch({ fangs }),
										groups: groupsOf(FANGS),
										placeholder: "С-т",
										noneLabel: "С-т"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchSelect, {
										id: "mutations",
										label: "Мутации",
										value: state.mutations,
										onChange: (mutations) => patch({ mutations }),
										groups: groupsOf(MUTATIONS),
										placeholder: "Нет",
										noneLabel: "Нет"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchSelect, {
										id: "tail",
										label: "Хвост",
										value: state.tail,
										onChange: (tail) => patch({ tail }),
										groups: groupsOf(TAILS),
										placeholder: "С-т",
										noneLabel: "С-т"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchSelect, {
										id: "ears",
										label: "Уши",
										value: state.ears,
										onChange: (ears) => patch({ ears }),
										groups: groupsOf(EARS),
										placeholder: "С-т",
										noneLabel: "С-т"
									})
								]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PassportCard, { text })]
			})]
		})
	});
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-surface p-5 sm:p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-5 font-display text-xl font-medium tracking-tight",
			children: title
		}), children]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PassportApp, {});
}
//#endregion
export { Home as component };
