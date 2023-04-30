import {Item, Tag} from "./helper_module";

export let TOOL_LIST: Item[] = []
export let WEAPON_LIST: Item[] = []
export let EQUIPABLE_LIST: Item[] = []
export function reset() {

  WEAPON_LIST = [];
  TOOL_LIST =  [];
  EQUIPABLE_LIST = [];
}

export function distribute_items(items: Item[]) {


  let known_names: string[] = [] // The data was sometimes duplicated

  items.forEach(item => {

    if (!known_names.includes(item.name)) {
      known_names.push(item.name);
      switch (item.tag) {
        case Tag.Tool:
          TOOL_LIST.push(item);
          break;
        case Tag.Equipable:
          EQUIPABLE_LIST.push(item);
          break;
        case Tag.Weapon:
          WEAPON_LIST.push(item);
          break;
      }
    }
  })
}
