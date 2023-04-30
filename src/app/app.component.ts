import {Component, signal, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {parse_item} from "./value_parser";
import {Item, Tag, URL} from "./helper_module"
import {distribute_items, EQUIPABLE_LIST, reset, TOOL_LIST, WEAPON_LIST} from "./global_data";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: Item[] = [];
  last_item: string = "";
  debug = false;
  // @ts-ignore
  @ViewChild("search") imp: HTMLInputElement;
  // @ts-ignore
  @ViewChild("sect") sect: HTMLHeadElement;
  constructor(public http: HttpClient) {
    (window as any).debug_toggle = this.debug_toggle.bind(this);
    setInterval(() => {
      //@ts-ignore
      let item = this.imp.nativeElement.value;

      if (item == "") this.data = [];
      else if (this.last_item != item) {
        this.last_item = item;

        // Leaving it at this to add "search by" features later
        let request = URL + "&where=name%20LIKE%20'" + item + "%25'"
        let collector: Item[] = []

        let data = signal(this.http.get(request));
        data().forEach(data => {

          //@ts-ignore
          data.cargoquery.forEach(query => {
            collector.push(parse_item(query.title));
          })
        }).then(() => {

          reset();
          this.data = collector;
          distribute_items(this.data);
        })
      }
    }, 10)
  }

  change_section(section: string) {
    //@ts-ignore
    this.sect.nativeElement.innerText = section;
  }

  debug_toggle(): void {
    this.debug = !this.debug;
  }
}
