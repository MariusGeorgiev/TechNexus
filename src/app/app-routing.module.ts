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

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'all-news', component: AllNewsComponent },
  { path: 'hardware-articles', component: HardwareArticlesComponent },
  { path: 'software-articles', component: SoftwareArticlesComponent },
  { path: 'science-articles', component: ScienceArticlesComponent },
  { path: 'add-new', component: AddNewComponent, canActivate: [AuthGuard] },
  { path: 'details-article/:id', component: DetailsArticleComponent },
  { path: 'edit-article/:id', component: EditArticleComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutUsComponent },  
  { path: 'contact', component: ContactComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile/:userId', component: ProfileComponent },
  { path: 'users-list', component: UsersListComponent }, 
  { path: '**', component: NotFound404Component },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}