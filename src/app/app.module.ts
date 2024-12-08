import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AddNewComponent } from './add-new/add-new.component';
import { ContactComponent } from './contact/contact.component';
import { AllNewsComponent } from './all-news/all-news.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { DetailsArticleComponent } from './details-article/details-article.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NotFound404Component } from './not-found-404/not-found-404.component';

import { environment } from '../environments/environment';
// Import Firebase modules
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { HardwareArticlesComponent } from './hardware-articles/hardware-articles.component';
import { SoftwareArticlesComponent } from './software-articles/software-articles.component';
import { ScienceArticlesComponent } from './science-articles/science-articles.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutUsComponent,
    AddNewComponent,
    ContactComponent,
    AllNewsComponent,
    EditArticleComponent,
    DetailsArticleComponent,
    HeaderComponent,
    FooterComponent,
    NotFound404Component,
    HardwareArticlesComponent,
    SoftwareArticlesComponent,
    ScienceArticlesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // Initialize Firebase app
    initializeApp(environment.firebaseConfig);
    // Initialize Firestore (optional: if using Firestore directly)
    getFirestore();
  }
}
