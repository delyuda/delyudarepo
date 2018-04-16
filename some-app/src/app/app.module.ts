import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { UserDetailsComponent } from './user-details/user-details.component';

import { UserService } from './user.service';


@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
