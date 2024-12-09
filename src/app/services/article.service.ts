import { Injectable } from '@angular/core';
import { getFirestore, collection, query, orderBy, where, limit, doc, getDoc, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ArticleService {

  private firestore = getFirestore();

  constructor() {}

  // Get Article by ID
  getArticle(articleId: string): Observable<any> {
    const articleRef = doc(this.firestore, 'articles', articleId);
    return from(getDoc(articleRef).then(docSnapshot => docSnapshot.data()));
  }

  // Get All Articles
  getAllArticles(): Observable<any[]> {
    const articlesRef = collection(this.firestore, 'articles');
    const q = query(articlesRef, orderBy('date', 'desc'), orderBy('time', 'desc'));
    return from(
      getDocs(q).then(snapshot =>
        snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      )
    );
  }

  // Delete Article
  deleteArticle(articleId: string): Observable<void> {
    const articleRef = doc(this.firestore, 'articles', articleId);
    return from(deleteDoc(articleRef));
  }

  // Update Article
  updateArticle(articleId: string, updatedData: any): Observable<void> {
    const articleRef = doc(this.firestore, 'articles', articleId);
    return from(updateDoc(articleRef, updatedData));
  }

}