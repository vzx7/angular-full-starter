import { Component } from '@angular/core';
import { IPeriodicElement } from 'modules/question/interfaces/i.periodic-element';

@Component({
  selector: 'app-table-test-questions',
  templateUrl: './table-test-questions.component.html',
  styleUrls: ['./table-test-questions.component.scss']
})
export class TableTestQuestionsComponent {
  public displayedColumns = ['question', 'tag', 'blockQuestion', 'cost'];
  public dataSource = ELEMENT_DATA;
}

const ELEMENT_DATA: IPeriodicElement[] = [
  {question: 1, tag: 'Hydrogen', blockQuestion: 1.0079, cost: 'H'},
  {question: 2, tag: 'Helium', blockQuestion: 4.0026, cost: 'He'},
  {question: 3, tag: 'Lithium', blockQuestion: 6.941, cost: 'Li'},
  {question: 4, tag: 'Beryllium', blockQuestion: 9.0122, cost: 'Be'},
  {question: 5, tag: 'Boron', blockQuestion: 10.811, cost: 'B'},
  {question: 6, tag: 'Carbon', blockQuestion: 12.0107, cost: 'C'},
  {question: 7, tag: 'Nitrogen', blockQuestion: 14.0067, cost: 'N'},
  {question: 8, tag: 'Oxygen', blockQuestion: 15.9994, cost: 'O'},
  {question: 9, tag: 'Fluorine', blockQuestion: 18.9984, cost: 'F'},
  {question: 10, tag: 'Neon', blockQuestion: 20.1797, cost: 'Ne'},
];
