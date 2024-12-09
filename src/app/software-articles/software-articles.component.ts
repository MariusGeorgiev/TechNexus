import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-software-articles',
  templateUrl: './software-articles.component.html',
  styleUrls: ['./software-articles.component.css']
})
export class SoftwareArticlesComponent implements OnInit {
  articles: any[] = [];

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    // Fetch all articles when the component is initialized
    this.articleService.getAllArticles().subscribe(data => {

      // Filter articles to includes only software
      this.articles = data.filter(article => article.category === 'Software');
    });
  }
}