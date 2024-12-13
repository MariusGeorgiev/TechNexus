import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.css']
})
export class AllNewsComponent implements OnInit {
  
    articles: any[] = [];
    loading: boolean = true;
  
    constructor(private articleService: ArticleService, private router: Router) {}
  
    ngOnInit(): void {
      // Fetch all articles
      this.articleService.getAllArticles().subscribe({
        next: (data) => {
          this.articles = data; 
          this.loading = false; 
        },
        error: (err) => {
          console.error('Error fetching articles:', err);
          this.loading = false; 
        }
      });
    }
  

  navigateToCategory(category: string): void {
    this.router.navigate([`${category}-articles`]); 
  }
}
