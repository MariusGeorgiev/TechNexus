import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { ArticleService } from '../services/article.service'; 
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';  
import { catchError, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-details-article',
  templateUrl: './details-article.component.html',
  styleUrls: ['./details-article.component.css']
})
export class DetailsArticleComponent implements OnInit {
  articleId: string = '';  
  article$: Observable<any> = of(null);
  createdByUsername: string = '';
  isCreator: boolean = false;  

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private authService: AuthService,  
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.articleId = params.get('id') || '';

      
      this.article$ = this.articleService.getArticle(this.articleId).pipe(
        switchMap(article => {
          if (article && article.userId) {
           
            return this.articleService.getUser(article.userId).pipe(
              tap(user => {
                this.createdByUsername = user?.username || 'Unknown User';
              }),
              tap(() => {
                
                const currentUser = this.authService.getCurrentUser();
                this.isCreator = currentUser?.uid === article.userId;
              }),
              switchMap(() => of(article)) 
            );
          }
          return of(article);
        }),
        catchError(() => of(null)) 
      );
    });
  }

    // Edit Article navigate
  editArticle(): void {
    if (this.articleId) {
      this.router.navigate([`/edit-article/${this.articleId}`]);
    }
  }

  // Delete Article
  deleteArticle(): void {
    if (this.articleId && confirm('Are you sure you want to delete this article?')) {
      this.articleService.deleteArticle(this.articleId).subscribe({
        next: () => {
          alert('Article deleted successfully!');
          this.router.navigate(['/all-news']); 
        },
        error: (error) => {
          console.error('Error deleting article:', error);
          alert('Error deleting article. Please try again.');
        }
      });
    }
  }

}