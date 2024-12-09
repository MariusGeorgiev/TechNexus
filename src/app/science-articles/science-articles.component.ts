import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-science-articles',
  templateUrl: './science-articles.component.html',
  styleUrls: ['./science-articles.component.css']
})
export class ScienceArticlesComponent implements OnInit {
  articles: any[] = [];

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    // Fetch all articles when the component is initialized
    this.articleService.getAllArticles().subscribe(data => {
      // Filter articles to include only science
      this.articles = data.filter(article => article.category === 'Science');
    });
  }
}