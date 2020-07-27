import { Question } from './../models/question.model';
import { AuthService } from './auth.service';
import { QuestionsResponse } from './../models/questionsresponse.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { take, exhaustMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  listQuestions(url: string) {
    return this.http.get<QuestionsResponse>(url);
  }

  searchQuestions(keyword: string) {
    return this.http
      .get('http://forum.mashuptest.com/api/question/search?keyword=' + keyword)
      .pipe(
        map((response: { result: QuestionsResponse }) => {
          let questions: QuestionsResponse = response.result;
          console.log(questions);
          return questions;
        })
      );
  }

  askQuestion(title: string, question: string) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: 'Bearer ' + user.token,
        });
        const body = new HttpParams()
          .set('title', title)
          .set('question', question);
        return this.http.post(
          'http://forum.mashuptest.com/api/question',
          body,
          {
            headers: headers,
          }
        );
      })
    );
  }

  showQuestion(id: number) {
    return this.http.get<Question>(
      'http://forum.mashuptest.com/api/question/' + id
    );
  }

  submitAnswer(answer: string, questionId: number) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: 'Bearer ' + user.token,
        });
        const body = new HttpParams().set('answer', answer);
        return this.http.post(
          'http://forum.mashuptest.com/api/question/' + questionId + '/answer',
          body,
          { headers: headers }
        );
      })
    );
  }

  listMyQuestions(url: string) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: 'Bearer ' + user.token,
        });
        return this.http.get(url, { headers: headers });
      }),
      map((response: { questions: QuestionsResponse }) => {
        let questions: QuestionsResponse = response.questions;
        console.log(questions);
        return questions;
      })
    );
  }

  listAnsweredQuestions(url: string) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: 'Bearer ' + user.token,
        });
        return this.http.get(url, { headers: headers }).pipe(
          map((response: { questions: QuestionsResponse }) => {
            let questions: QuestionsResponse = response.questions;
            console.log(questions);
            return questions;
          })
        );
      })
    );
  }

  deleteAnswer(answerId: number) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: 'Bearer ' + user.token,
        });
        return this.http.delete(
          'http://forum.mashuptest.com/api/answer/' + answerId,
          { headers: headers }
        );
      })
    );
  }

  deleteQuestion(questionId: number) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: 'Bearer ' + user.token,
        });
        return this.http.delete(
          'http://forum.mashuptest.com/api/question/' + questionId,
          { headers: headers }
        );
      })
    );
  }

  editQuestion(questionId: number, title: string, question: string) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: 'Bearer ' + user.token,
        });
        const body = new HttpParams()
          .set('title', title)
          .set('question', question);
        return this.http.put(
          'http://forum.mashuptest.com/api/question/' + questionId,
          body,
          { headers: headers }
        );
      })
    );
  }

  editAnswer(answerId: number, answer: string) {
    console.log(answer);
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: 'Bearer ' + user.token,
        });
        const body = new HttpParams().set('answer', answer);
        return this.http.put(
          'http://forum.mashuptest.com/api/answer/' + answerId,
          body,
          { headers: headers }
        );
      })
    );
  }
}
