import {Component, signal, ViewChild} from '@angular/core';
import {Item, format_image} from "../helper_module";
import {WEAPON_LIST} from "../global_data";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})
export class WeaponsComponent {

  @ViewChild("icon") icon!: HTMLImageElement;
  data: Item[] = [];
  selection: Item = {
    axe: undefined,
    critical: 0,
    damage: 0,
    defense: undefined,
    hammer: undefined,
    knockback: 0,
    mana: undefined,
    name: "None",
    pick: undefined,
    tag: undefined,
    tooltip: "None",
    usetime: 0,
    velocity: 0,
    type: "Weapon"
  };
  constructor(public http: HttpClient) {
    setInterval(() => {
      this.data = WEAPON_LIST;
    }, 10)
  }
  select(name: string) {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].name == name) {
        this.selection = this.data[i];
        break;
      }
    }
    this.find_image(this.selection.name)
  }
  find_image(name: string) {

    let formatted_img = format_image(name);
    let image_request = "https://terraria.wiki.gg/api.php?action=query&prop=imageinfo&titles=" + formatted_img + "&iiprop=url&format=json&origin=*"
    let actual_image = signal(this.http.get(image_request));

    // @ts-ignore
    let images: Object[] = [];
    actual_image().forEach(image => {
      images.push(image)
    }).then(() => {
      let url;
      try {
        //@ts-ignore
        url = Object.values(Object.values(images[0].query.pages)[0].imageinfo)[0].url
      } catch (e) {
        url = "https://illinoislawforyou.com/wp-content/uploads/2013/11/no-fault-divorce-illinois-chicago-jpeg.webp"
      }

      if (url.endsWith(formatted_img.replace("File:", "")) || url == "https://illinoislawforyou.com/wp-content/uploads/2013/11/no-fault-divorce-illinois-chicago-jpeg.webp") {
        //@ts-ignore
        this.icon.nativeElement.src = url
      }
    })
  }
}
