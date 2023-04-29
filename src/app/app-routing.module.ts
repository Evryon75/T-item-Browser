import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WeaponsComponent} from "./weapons/weapons.component";
import {EquipablesComponent} from "./equipables/equipables.component";
import {ToolsComponent} from "./tools/tools.component";

const routes: Routes = [
  {path: "weapons", component: WeaponsComponent},
  {path: "tools", component: ToolsComponent},
  {path: "equipables", component: EquipablesComponent},
  {path: '', redirectTo: 'weapons', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

