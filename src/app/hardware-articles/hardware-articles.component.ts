import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-hardware-articles',
  templateUrl: './hardware-articles.component.html',
  styleUrls: ['./hardware-articles.component.css']
})
export class HardwareArticlesComponent implements OnInit {
  articles: any[] = [];

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    // Fetch all articles when the component is initialized
    this.articleService.getAllArticles().subscribe(data => {
      // Filter articles to only include those with the 'Hardware' category
      this.articles = data.filter(article => article.category === 'Hardware');
    });
  }
}