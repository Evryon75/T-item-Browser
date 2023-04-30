// Simple function to format fields in a legible way
export function format_fields(fields: string[]): string {
  let result = "&fields=";
  fields.forEach(field => {
    result += field + "%2C%20";
  });
  return result;
}
export let strip_html = (s: string) => add_comma(s
    .replaceAll(/&lt;/g, '<')
    .replaceAll(/&gt;/g, '>')
    .replaceAll(/&amp;/g, '&')
    .replaceAll(/&quot;/g, '"')
    .replaceAll(/&apos;/g, "'")
    .replaceAll(/<[^>]*>/g, '')
    .replaceAll("'", '')
);

function add_comma(s: string): string {
  let raw: string[] = s.split("");
  let build: string = "";

  for (let i = 0; i < raw.length; i++) {
    build += is_letter(raw[i]) && is_number(raw[i + 1]) ? raw[i] + ", " : raw[i];
  }

  return build;
}

function is_letter(char: string): boolean {
  return /^[a-zA-Z]$/.test(char)
}
function is_number(char: string): boolean {
  return /^[0-9]$/.test(char)
}

export interface RawItem {
  name: string,
  damage: string,
  usetime: string,
  knockback: string,
  critical: string,
  velocity: string,
  defense: string,
  axe: string,
  hammer: string,
  mana: string,
  tooltip: string,
  pick: string
}
export interface Item {
  name: string,
  damage: number | undefined,
  usetime: number | undefined,
  knockback: number | undefined,
  critical: number | undefined,
  velocity: number | undefined,
  defense: number | undefined,
  axe: number | undefined,
  hammer: number | undefined,
  mana: number | undefined,
  tooltip: string | undefined,
  pick: number | undefined
}

export enum Tag {
  Weapon,
  Tool,
  Equipable
}
