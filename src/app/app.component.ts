import {Component, signal, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";

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

      if (item == "") this.data = []; // Clear the results if the search is empty
      else if (this.last_item != item) { // Don't search the same thing over and over again

        this.last_item = item;
        let url: string =
          "https://terraria.fandom.com/api.php" +
          "?action=cargoquery" +
          "&format=json" +
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
            "tooltip",
            "mana",
          ]) +
          "&where=name%20LIKE%20'" + item + "%25'" +
          "&origin=*";

        // Request data through a signal
        let data = signal(this.http.get(url));
        // Temp array used to keep the original one intact until new results are found
        let collector: Item[] = []
        data().forEach(d => {
          //@ts-ignore
          d.cargoquery.forEach(c => { // For every search result found, add it to the list
            c.title.tooltip = strip_html(c.title.tooltip)
            collector.push(c.title);
          })
        }).then(() => { // Once that's done update the original array
          this.data = collector;
        })
      }
    }, 10)
  }
}
// Simple function to format fields in a legible way
function format_fields(fields: string[]): string {
  let result = "&fields=";
  fields.forEach(field => {
    result += field + "%2C%20";
  });
  return result;
}
let strip_html = (s: string) => s
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&apos;/g, "'")
  .replace(/<[^>]*>/g, '');

interface Item {
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
}
