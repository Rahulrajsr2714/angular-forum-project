import { QuestionsResponse } from './../models/questionsresponse.model';
import { ListItem } from './../models/listitem.model';
import { AuthService } from './../services/auth.service';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myquestions',
  templateUrl: './myquestions.component.html',
  styleUrls: ['./myquestions.component.css'],
})
export class MyquestionsComponent implements OnInit {
  listQuestions: ListItem[] = [];
  questionResponse: QuestionsResponse;
  isLoggedIn: boolean = false;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService
      .listMyQuestions('http://forum.mashuptest.com/api/question/my-questions')
      .subscribe((responseData: QuestionsResponse) => {
        this.listQuestions = responseData.data;
        this.questionResponse = responseData;
        console.log(responseData);
      });
  }

  fetchPaginatedResult(page: number) {
    this.dataService
      .listMyQuestions(
        'http://forum.mashuptest.com/api/question/my-questions?page=' + page
      )
      .subscribe((responseData: QuestionsResponse) => {
        this.listQuestions = responseData.data;
        this.questionResponse = responseData;
      });
  }
}
