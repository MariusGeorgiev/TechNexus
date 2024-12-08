import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { AllNewsComponent } from './all-news/all-news.component';
import { HardwareArticlesComponent } from './hardware-articles/hardware-articles.component';
import { SoftwareArticlesComponent } from './software-articles/software-articles.component';
import { ScienceArticlesComponent } from './science-articles/science-articles.component';

import { AddNewComponent } from './add-new/add-new.component';
import { DetailsArticleComponent } from './details-article/details-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';

import { AboutUsComponent } from './about-us/about-us.component';  
import { ContactComponent } from './contact/contact.component';  
import { NotFound404Component } from './not-found-404/not-found-404.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'all-news', component: AllNewsComponent },
  { path: 'hardware-articles', component: HardwareArticlesComponent },
  { path: 'software-articles', component: SoftwareArticlesComponent },
  { path: 'science-articles', component: ScienceArticlesComponent },
  { path: 'add-new', component: AddNewComponent },
  { path: 'details-article/:id', component: DetailsArticleComponent },
  { path: 'edit-article/:id', component: EditArticleComponent },
  { path: 'about', component: AboutUsComponent },  
  { path: 'contact', component: ContactComponent },  
  { path: '**', component: NotFound404Component },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}