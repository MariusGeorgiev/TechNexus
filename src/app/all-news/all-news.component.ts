import { Component, OnInit } from '@angular/core';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from '../../environments/environment'; 

@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.css']
})
export class AllNewsComponent implements OnInit {
  articles: any[] = []; // Array to hold articles

  constructor() { }

  ngOnInit(): void {
    // Initialize Firebase app
    const app = initializeApp(environment.firebaseConfig);
    
    // Fetch articles from Firestore
    this.fetchArticles();
  }

  async fetchArticles() {
    try {
      const firestore = getFirestore();
      const articlesRef = collection(firestore, 'articles');
      const querySnapshot = await getDocs(articlesRef);

      this.articles = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching articles: ', error);
    }
  }
}