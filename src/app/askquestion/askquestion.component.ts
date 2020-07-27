import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-askquestion',
  templateUrl: './askquestion.component.html',
  styleUrls: ['./askquestion.component.css'],
})
export class AskquestionComponent implements OnInit {
  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {}

  onAskQuestion(data) {
    this.dataService
      .askQuestion(data.title, data.question)
      .subscribe((respons) => {
        this.router.navigate(['/']);
      });
  }
}
