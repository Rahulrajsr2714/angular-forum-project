import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListitemComponent } from './listitem/listitem.component';
import { AskquestionComponent } from './askquestion/askquestion.component';
import { ShowquestionComponent } from './showquestion/showquestion.component';
import { MyquestionsComponent } from './myquestions/myquestions.component';
import { MyanswersComponent } from './myanswers/myanswers.component';
import { EditquestionComponent } from './editquestion/editquestion.component';
import { EditanswerComponent } from './editanswer/editanswer.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [AppComponent, AuthComponent, HomeComponent, ListitemComponent, AskquestionComponent, ShowquestionComponent, MyquestionsComponent, MyanswersComponent, EditquestionComponent, EditanswerComponent, PaginationComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
