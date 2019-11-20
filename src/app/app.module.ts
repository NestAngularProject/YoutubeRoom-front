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
import {NbThemeModule, NbLayoutModule, NbCardModule, NbSidebarModule, NbMenuModule, NbListModule, NbToggleModule} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { RoomComponent } from './room/room.component';
import { VideoComponent } from './video/video.component';
import { LoginComponent } from './shared/login/login.component';
import { ProfilComponent } from './shared/profil/profil.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DialogComponent,
    FormComponent,
    UserComponent,
    RoomComponent,
    VideoComponent,
    LoginComponent,
    ProfilComponent
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
    NbToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
