//* The Mediawiki api works great, but sometimes it returns escaped html strings.
//* It is probably not the api's fault.

import {Item, RawItem, strip_html} from "./helper-module";

export function parse_item(obj: RawItem): Item {
  let result: Item = {
    axe: undefined,
    critical: undefined,
    damage: undefined,
    defense: undefined,
    hammer: undefined,
    knockback: undefined,
    mana: undefined,
    name: obj.name,
    pick: undefined,
    tooltip: undefined,
    usetime: undefined,
    velocity: undefined
  };
  //! I have had enough of json shenanigans
  if (obj.name != null) result.name = strip_html(obj.name);
  if (obj.damage != null) result.damage =  parse_num(obj.damage);
  if (obj.usetime != null) result.usetime = parse_num(obj.usetime);
  if (obj.knockback != null) result.knockback = parse_num(obj.knockback);
  if (obj.critical != null) result.critical = parse_num(obj.critical);
  if (obj.velocity != null) result.velocity = parse_num(obj.velocity);
  if (obj.defense != null) result.defense = parse_num(obj.defense);
  if (obj.axe != null) result.axe = parse_num(obj.axe);
  if (obj.hammer != null) result.hammer = parse_num(obj.hammer);
  if (obj.pick != null) result.pick = parse_num(obj.pick);
  if (obj.tooltip != null) result.tooltip = strip_html(obj.tooltip);
  if (obj.mana != null) result.mana = parse_num(obj.mana);

  return result;
}

function parse_num(raw: string): number {
  let raw_vec = raw.split("");
  let build = "";
  let result: number = 0;

  for (let i = 0; i < raw_vec.length; i++) {
    let temp_build = build + raw_vec[i];
    if (try_parse(temp_build)) result = parseFloat(build += raw_vec[i]);
    else break;
  }

  return result;
}

function try_parse(possible_number: string): boolean {
  let result = false;

  try {
    parseFloat(possible_number)
    result = true;
  } catch (e) {
    //! Remove in production
    console.log("Escaped html found")
  }

  return result
}
