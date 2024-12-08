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

//import { environment } from '../environments/environment';

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
    NotFound404Component
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
export class AppModule { }
