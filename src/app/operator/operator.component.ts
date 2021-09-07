import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OperatorService } from '../operator.service';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss'],
})
export class OperatorComponent implements OnInit {
  @Input() operator = '';
  operator$?: Observable<any>;
  data: any;

  constructor(private operatorsService: OperatorService) {}

  ngOnInit(): void {
    this.operator$ = this.operatorsService.getOperator(this.operator);
    this.operator$.subscribe((data) => (this.data = data));
  }

  get dataName() {
    return this.data && this.data.name ? this.data.name : null;
  }
  get dataType() {
    return this.data && this.data.type ? this.data.type : null;
  }
  get dataRxjsdevUrl() {
    return this.data && this.data.rxjsdevUrl ? this.data.rxjsdevUrl : null;
  }
  get dataLearnrxUrl() {
    return this.data && this.data.learnrxUrl ? this.data.learnrxUrl : null;
  }
  get dataMarblesUrl() {
    return this.data && this.data.marblesUrl ? this.data.marblesUrl : null;
  }
}
