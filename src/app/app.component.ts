import {Component, signal, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {parse_item} from "./value_parser";
import {format_fields, Item, Tag} from "./helper-module"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: Item[] = [];
  last_item: string = "";
  // @ts-ignore
  @ViewChild("search") imp: HTMLInputElement;

  constructor(public http: HttpClient) {
    setInterval(() => {
      //@ts-ignore
      let item = this.imp.nativeElement.value;

      if (item == "") this.data = [];
      else if (this.last_item != item) {
        this.last_item = item;

        // Leaving it at this to add "search by" features later
        let request = url + "&where=name%20LIKE%20'" + item + "%25'"
        let collector: Item[] = []

        let data = signal(this.http.get(request));
        data().forEach(data => {
          //@ts-ignore
          data.cargoquery.forEach(query => {
            collector.push(parse_item(query.title));
          })
        }).then(() => {
          this.data = collector;
        })
      }
    }, 10)
  }
}

const url: string =
  "https://terraria.fandom.com/api.php" +
  "?action=cargoquery" +
  "&format=json" +
  "&origin=*" +
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
  ]);
