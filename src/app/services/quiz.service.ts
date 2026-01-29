import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private http = inject(HttpClient);

  getQuestions(category: number, amount: number): Observable<any[]> {
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&type=multiple`;
    return this.http.get<any>(url).pipe(
      map((res) => res.results as any[])
    );
  }
}
