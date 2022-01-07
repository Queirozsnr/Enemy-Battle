import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BattlefieldComponent} from '../app/components/battlefield/battlefield.component';
import {HomeComponent} from '../app/pages/home/home.component';
import {RuleComponent} from '../app/pages/rule/rule.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'rule', component: RuleComponent},
  {path: 'battle', component: BattlefieldComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
