import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import firebase from "firebase/app";
import "firebase/firestore";
// import * as firebase from 'firebase/app';
import 'firebase/auth';
import { NgxEditorModule } from 'ngx-editor';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { MyblogsComponent } from './myblogs/myblogs.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateComponent } from './create/create.component';
import { PostComponent } from './post/post.component';
import { ViewComponent } from './view/view.component';
import { CommentsComponent } from './comments/comments.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const firebaseConfig = {
  apiKey: "AIzaSyBy9eQ67-ji3ArBUg8Nvcya1QNLpzzLv1g",
  authDomain: "scribe-1da3d.firebaseapp.com",
  projectId: "scribe-1da3d",
  storageBucket: "scribe-1da3d.appspot.com",
  messagingSenderId: "970353922744",
  appId: "1:970353922744:web:5405c5d0b4232d60f29a4d",
  measurementId: "G-C83PB7WQJW"
};

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    MenuComponent,
    HomeComponent,
    MyblogsComponent,
    ProfileComponent,
    CreateComponent,
    PostComponent,
    ViewComponent,
    CommentsComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
    HttpClientModule,
    AngularEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
