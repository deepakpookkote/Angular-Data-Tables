import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, DataTablesModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
