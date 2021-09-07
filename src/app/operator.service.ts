import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

import { Observable } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';
import { Operator } from './models/operator';

@Injectable({
  providedIn: 'root',
})
export class OperatorService {

  constructor(private http: HttpClient) {}

  public getOperator(operator: string): Observable<Operator> {
    return this.http.get('./assets/operators.json')
      .pipe(
        pluck('operators'),
        pluck(operator),
      )
  }
}
