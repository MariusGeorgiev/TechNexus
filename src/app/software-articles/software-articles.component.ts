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

    this.articleService.getAllArticles().subscribe(data => {

      this.articles = data.filter(article => article.category === 'Software');
    });
  }
}