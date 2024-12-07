import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../services/article.service';  // Import the service
import { Observable, of } from 'rxjs';  // Import 'of' for initializing empty Observable
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-details-article',
  templateUrl: './details-article.component.html',
  styleUrls: ['./details-article.component.css']
})
export class DetailsArticleComponent implements OnInit {
  articleId: string = '';  // Initialize with a default value
  article$: Observable<any> = of(null);  // Initialize with an empty observable

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService  // Inject the service
  ) {}

  ngOnInit(): void {
    // Get the articleId from the route parameter
    this.route.paramMap.subscribe(params => {
      this.articleId = params.get('id') || '';  // Set articleId from the route

      // Fetch the article based on articleId
      this.article$ = this.articleService.getArticle(this.articleId).pipe(
        catchError(() => of(null))  // In case of an error, return an empty observable
      );
    });
  }
}