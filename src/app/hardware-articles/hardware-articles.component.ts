import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hardware-articles',
  templateUrl: './hardware-articles.component.html',
  styleUrls: ['../all-news/category-articles.component.css']
})
export class HardwareArticlesComponent implements OnInit {
  articles: any[] = [];
  loading: boolean = true;

  constructor(private articleService: ArticleService, private router: Router) {}

  ngOnInit(): void {

    this.articleService.getAllArticles().subscribe(data => {
      this.loading = false;
      this.articles = data.filter(article => article.category === 'Hardware');
    });
  }

  navigateToCategory(category: string): void {
    this.router.navigate([`${category}-articles`]);
  }
}