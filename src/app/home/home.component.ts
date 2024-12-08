import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service'; // Import the article service

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  articles: any[] = [];  // Define the articles property

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    // Fetch all articles and assign to the articles array
    this.articleService.getAllArticles().subscribe(data => {
      this.articles = data.slice(0, 3);  // Limit to the first 3 articles
    });
  }
}