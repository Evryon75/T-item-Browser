import {Component, signal, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data = {};
  @ViewChild("search") imp!: HTMLInputElement;

  request(): void {
    //@ts-ignore
    let item = this.imp.nativeElement.value;
    console.log(item);
  }
}
