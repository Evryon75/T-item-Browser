import {Component} from '@angular/core';
import {Item} from "../helper_module";
import {HttpClient} from "@angular/common/http";
import {TOOL_LIST} from "../global_data";

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent {

  data: Item[] = [];
  selection: Item = {
    axe: undefined,
    critical: undefined,
    damage: undefined,
    defense: undefined,
    hammer: undefined,
    knockback: undefined,
    mana: undefined,
    name: "Copper Shortsword",
    pick: undefined,
    tag: undefined,
    tooltip: undefined,
    usetime: undefined,
    velocity: undefined,
    type: "Tool"
  };
  constructor(public http: HttpClient) {
    setInterval(() => {
      this.data = TOOL_LIST;
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
