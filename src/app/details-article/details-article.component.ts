import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
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
    private articleService: ArticleService,  // Inject the service
    private router: Router
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

    // Edit Article - Navigate to Edit Page
  editArticle(): void {
    if (this.articleId) {
      this.router.navigate([`/article/edit/${this.articleId}`]);
    }
  }

 // Delete Article
 deleteArticle(): void {
  if (this.articleId && confirm('Are you sure you want to delete this article?')) {
    this.articleService.deleteArticle(this.articleId).subscribe({
      next: () => {
        alert('Article deleted successfully!');
        this.router.navigate(['/all-news']); // Navigate to 'all-news' after deletion
      },
      error: (error) => {
        console.error('Error deleting article:', error);
        alert('Error deleting article. Please try again.');
      }
    });
  }
}

}