import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';  // Import the AuthService
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  user: any = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to the user observable to check if the user is logged in
    this.authService.user$.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.user = user;  // You can use this user object to access the user details
      } else {
        this.isAuthenticated = false;
        this.user = null;
      }
    });
  }

  logout() {
    this.authService.logout().then(() => {
      console.log('User logged out');
      this.router.navigate(['/']);  // Redirect user to login page after logout
    }).catch((error) => {
      console.error('Error logging out:', error);
    });
  }
}
