import { Component } from '@angular/core';
import {Item} from "../helper_module";
import {HttpClient} from "@angular/common/http";
import {EQUIPABLE_LIST} from "../global_data";

@Component({
  selector: 'app-equipables',
  templateUrl: './equipables.component.html',
  styleUrls: ['./equipables.component.css']
})
export class EquipablesComponent {

  data: Item[] = [];
  selection: Item = {
    axe: undefined,
    critical: undefined,
    damage: undefined,
    defense: undefined,
    hammer: undefined,
    knockback: undefined,
    mana: undefined,
    name: "",
    pick: undefined,
    tag: undefined,
    tooltip: undefined,
    usetime: undefined,
    velocity: undefined,
    type: "Equipable",
  };
  constructor(public http: HttpClient) {
    setInterval(() => {
      this.data = EQUIPABLE_LIST;
    }, 10)
  }
  select(name: string) {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].name == name) {
        this.selection = this.data[i];
        break;
      }
    }
  }
}
