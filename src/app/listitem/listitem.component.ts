import { QuestionsResponse } from './../models/questionsresponse.model';
import { ListItem } from './../models/listitem.model';
import { DataService } from './../services/data.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-listitem',
  templateUrl: './listitem.component.html',
  styleUrls: ['./listitem.component.css'],
})
export class ListitemComponent implements OnInit {
  @Input('questionItem') item: ListItem;
  constructor() {}

  ngOnInit(): void {}
}
