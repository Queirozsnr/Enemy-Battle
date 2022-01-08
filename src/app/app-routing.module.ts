import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BattlefieldComponent} from '../app/components/battlefield/battlefield.component';
import {HomeComponent} from '../app/pages/home/home.component';
import {RuleComponent} from '../app/pages/rule/rule.component';
import {RankingComponent} from '../app/pages/ranking/ranking.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'rule', component: RuleComponent},
  {path: 'battle', component: BattlefieldComponent},
  {path: 'ranking', component: RankingComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
