import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule, MatInputModule,
  MatListModule,
  MatToolbarModule
} from '@angular/material';
import { DialogComponent } from './shared/dialog/dialog.component';
import { FormComponent } from './shared/form/form.component';
import { UserComponent } from './user/user.component';
import {NbThemeModule, NbLayoutModule, NbCardModule, NbSidebarModule, NbMenuModule, NbListModule} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { RoomComponent } from './room/room.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DialogComponent,
    FormComponent,
    UserComponent,
    RoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbThemeModule.forRoot({name: 'custom-theme'}),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
