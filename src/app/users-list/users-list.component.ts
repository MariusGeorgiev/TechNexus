import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  usersWithStats: any[] = [];
  loading: boolean = true;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getAllUsersWithArticleCount().subscribe({
      next: (data) => {
        this.usersWithStats = data;

        this.usersWithStats.sort((a, b) => {
          const dateA = new Date(a.registeredOn);
          const dateB = new Date(b.registeredOn);
          return dateB.getTime() - dateA.getTime(); 
        });

        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching user stats:', err);
        this.loading = false;
      }
    });
  }
}
