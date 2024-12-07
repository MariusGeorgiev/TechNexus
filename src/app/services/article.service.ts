import { Injectable } from '@angular/core';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private firestore = getFirestore();

  constructor() {}

  // Method to fetch a single article by its ID
  getArticle(articleId: string): Observable<any> {
    const articleRef = doc(this.firestore, 'articles', articleId);
    return from(getDoc(articleRef).then(docSnapshot => docSnapshot.data()));
  }
}
