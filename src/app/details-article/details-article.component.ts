import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  // comment
  user$: Observable<any> = this.authService.user$; // Get user info
  newComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private authService: AuthService,  
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.articleId = params.get('id') || '';
      this.loadArticleData();  // Load article data and comments
    });
  }

  // Load article and user data
  loadArticleData(): void {
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
  }

  addComment(): void {
    if (this.newComment.trim() && this.articleId) {
      const user = this.authService.getCurrentUser(); // Get current user
      if (user) {
        // Fetch the username from the users collection
        this.articleService.getUser(user.uid).subscribe(userData => {
          const newComment = {
            userName: userData?.username || user.displayName || user.email, // Use the username from Firestore or fallback to displayName or email
            content: this.newComment.trim(),
            timestamp: new Date().toISOString()
          };
  
          // Add the comment to Firestore
          this.articleService.addCommentToArticle(this.articleId, newComment).subscribe({
            next: () => {
              this.newComment = ''; // Clear the input after submission
              this.loadArticleData();  // Re-fetch the article data to include the new comment
            },
            error: (err) => {
              console.error('Error adding comment:', err);
              alert('Error adding comment. Please try again.');
            }
          });
        });
      } else {
        alert('You must be logged in to add a comment!');
      }
    }
  }
  

  // Edit article
  editArticle(): void {
    if (this.articleId) {
      this.router.navigate([`/edit-article/${this.articleId}`]);
    }
  }

  // Delete article
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
