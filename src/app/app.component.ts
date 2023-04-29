import {Component, signal, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: Object[] = [];
  last_item: string = "";
  @ViewChild("search") imp!: HTMLInputElement;

  constructor(public http: HttpClient) {
    setInterval(() => this.request(), 10)
  }

  request(): void {
    //@ts-ignore
    let item = this.imp.nativeElement.value;

    if (item == "") this.data = [];
    else if (this.last_item != item) {
      this.last_item = item;
      let url: string =
        "https://terraria.fandom.com/api.php" +
        "?action=cargoquery" +
        "&format=json" +
        "&tables=Items" +
        "&fields=name%2C%20damage%2C%20rare%2C%20knockback%2C%20critical%2C%20velocity" +
        "&where=name%20LIKE%20'" + item + "%25'" +
        "&origin=*";
      let response = signal(this.http.get(url))
      let collector: Object[] = []
      response().forEach(r => {
        collector.push(r)
      }).then(() => {
        this.data = collector;
      })
    }
  }
}
