import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BattlefieldComponent } from './components/battlefield/battlefield.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { RuleComponent } from './pages/rule/rule.component';

@NgModule({
  declarations: [
    AppComponent,
    BattlefieldComponent,
    HomeComponent,
    RuleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
