// Simple function to format fields in a legible way
export const URL: string =
  "https://terraria.fandom.com/api.php" +
  "?action=cargoquery" +
  "&format=json" +
  "&origin=*" +
  "&limit=300" +
  "&tables=Items" +
  format_fields([
    "name",
    "damage",
    "usetime",
    "knockback",
    "critical",
    "velocity",
    "defense",
    "axe",
    "hammer",
    "pick",
    "tooltip",
    "mana",
    "type",
    "rare"
  ]);

function format_fields(fields: string[]): string {
  let result = "&fields=";
  fields.forEach(field => {
    result += field + "%2C%20";
  });
  return result;
}
export function format_image(fields: string): string {
  let result = "File:";
  let stuff = fields.split(" ");
  stuff.forEach(s => {
    result += capitalize(s) + "_";
  });
  return result + "%28demo%29.gif";
}
let capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
export let strip_html = (s: string) => add_comma(s
    .replaceAll(/&lt;/g, '<')
    .replaceAll(/&gt;/g, '>')
    .replaceAll(/&amp;/g, '&')
    .replaceAll(/&quot;/g, '"')
    .replaceAll(/&apos;/g, "'")
    .replaceAll(/<[^>]*>/g, '')
);
function add_comma(s: string): string {
  let raw: string[] = s.split("");
  let build: string = "";

  for (let i = 0; i < raw.length; i++) {
    build += is_letter(raw[i]) && is_number(raw[i + 1])
      ? raw[i] + ", "
      : is_letter(raw[i]) && raw[i + 1] == "'"
      ? raw[i] + " "
      : raw[i];
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
  pick: string,
  type: string
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
  pick: number | undefined,
  tag: Tag | undefined,
  type: string
}
export enum Tag {
  Weapon,
  Tool,
  Equipable
}
