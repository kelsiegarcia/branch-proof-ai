import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './components/home/home';
import { People } from './components/people/people';
import { Relationships } from './components/relationships/relationships';
import { Records } from './components/records/records';
import { ValidationReport } from './components/validation-report/validation-report';
import { Navbar } from './components/navbar/navbar';

@NgModule({
  declarations: [
    App,
    Home,
    People,
    Relationships,
    Records,
    ValidationReport,
    Navbar
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
