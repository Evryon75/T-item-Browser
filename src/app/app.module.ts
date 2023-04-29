import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeaponsComponent } from './weapons/weapons.component';
import { EquipablesComponent } from './equipables/equipables.component';
import { ToolsComponent } from './tools/tools.component';

@NgModule({
  declarations: [
    AppComponent,
    WeaponsComponent,
    EquipablesComponent,
    ToolsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
