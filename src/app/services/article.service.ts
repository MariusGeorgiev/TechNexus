import { Injectable } from '@angular/core';
import { getFirestore, collection, query, orderBy, where, limit, doc, getDoc, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ArticleService {

  private firestore = getFirestore();

  constructor() {}

  // Method to fetch a single article by ID
  getArticle(articleId: string): Observable<any> {
    const articleRef = doc(this.firestore, 'articles', articleId);
    return from(getDoc(articleRef).then(docSnapshot => docSnapshot.data()));
  }

  //  // Get last 3 articles
  //  getLatestArticles(): Observable<any[]> {
  //   const articlesRef = collection(this.firestore, 'articles');
  //   const q = query(articlesRef, orderBy('createdAt', 'desc'), limit(3));
  //   return from(
  //     getDocs(q).then(snapshot => 
  //       snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  //     )
  //   );
  // }

  getAllArticles(): Observable<any[]> {
    const articlesRef = collection(this.firestore, 'articles');
    const q = query(articlesRef, orderBy('date', 'desc'));
    return from(
      getDocs(q).then(snapshot =>
        snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      )
    );
  }

  getArticlesByCategory(category: string): Observable<any[]> {
    const articlesRef = collection(this.firestore, 'articles');
    const q = query(articlesRef, where('category', '==', category), orderBy('date', 'desc'));
    return from(
      getDocs(q).then(snapshot =>
        snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      )
    );
  }

  // Delete article
  deleteArticle(articleId: string): Observable<void> {
    const articleRef = doc(this.firestore, 'articles', articleId);
    return from(deleteDoc(articleRef));
  }

  // Update article
  updateArticle(articleId: string, updatedData: any): Observable<void> {
    const articleRef = doc(this.firestore, 'articles', articleId);
    return from(updateDoc(articleRef, updatedData));
  }

}