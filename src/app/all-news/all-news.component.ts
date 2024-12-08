import { Component, OnInit } from '@angular/core';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from '../../environments/environment';
import { ArticleService } from '../services/article.service'; // Import the article service


@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.css']
})
export class AllNewsComponent implements OnInit {
  
    articles: any[] = [];
  
    constructor(private articleService: ArticleService) {}
  
    ngOnInit(): void {
      // Fetch all articles when the component is initialized
      this.articleService.getAllArticles().subscribe(data => {
        this.articles = data; // Store the fetched articles in the articles array
      });
    }
  

  // async fetchArticles() {
  //   try {
  //     const firestore = getFirestore();
  //     const articlesRef = collection(firestore, 'articles');
  //     const querySnapshot = await getDocs(articlesRef);

  //     this.articles = querySnapshot.docs.map(doc => ({
  //       id: doc.id,
  //       ...doc.data()
  //     }));
  //   } catch (error) {
  //     console.error('Error fetching articles: ', error);
  //   }
  // }
}
