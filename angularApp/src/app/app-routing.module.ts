import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterListComponent } from './character-list/character-list.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
    { path: "", pathMatch: "full", component: CharacterListComponent },
    { path: "settings", component: SettingsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
