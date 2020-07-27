import { DataService } from './../services/data.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editanswer',
  templateUrl: './editanswer.component.html',
  styleUrls: ['./editanswer.component.css'],
})
export class EditanswerComponent implements OnInit {
  @Input() answer: string;
  @Input() answerId: number;
  @Output() close = new EventEmitter<void>();
  @Output() editted = new EventEmitter<void>();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    console.log(this.answer);
  }

  onEditAnswerSubmit(data) {
    this.dataService
      .editAnswer(this.answerId, data.answer)
      .subscribe((response) => {
        this.editted.emit();
      });
  }

  onClose() {
    this.close.emit();
  }
}
