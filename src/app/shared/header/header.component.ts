import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  user: any = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isAuthenticated = true;
        this.user = user;
      } else {
        this.isAuthenticated = false;
        this.user = null;
      }
    });
  }

  logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log('User logged out');
      this.isAuthenticated = false;
      this.user = null; 
    }).catch((error) => {
      console.error('Error logging out:', error);
    });
  }

}
