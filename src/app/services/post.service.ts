import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Post } from '../models/Post';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postsUrl: string = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl);
  }

  savePost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, post, httpOptions);
  }

  updatePost(post: Post): Observable<Post> {
    const putUrl = `${this.postsUrl}/${post.id}`;
    return this.http.put<Post>(putUrl, post, httpOptions);
  }

  getPost(id: number): Observable<Post> {
    const getUrl = `${this.postsUrl}/${id}`;
    return this.http.get<Post>(getUrl);
  }

  removePost(post: Post | number): Observable<Post> {
    const id = typeof post === 'number' ? post : post.id;
    const delUrl = `${this.postsUrl}/${id}`;
    return this.http.delete<Post>(delUrl, httpOptions);
  }
}
