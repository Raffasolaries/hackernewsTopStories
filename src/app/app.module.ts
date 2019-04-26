import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatExpansionModule, MatCardModule, MatGridListModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { HackernewsService } from './services/hackernews.service';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatGridListModule,
    MatExpansionModule
  ],
  providers: [HackernewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
