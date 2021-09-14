import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ex00Component } from './ex00/ex00.component';
import { Ex01Component } from './ex01/ex01.component';
import { Ex02Component } from './ex02/ex02.component';
import { Ex03Component } from './ex03/ex03.component';
import { Ex04Component } from './ex04/ex04.component';
import { Ex05Component } from './ex05/ex05.component';
import { Ex06Component } from './ex06/ex06.component';
import { Ex07Component } from './ex07/ex07.component';
import { Ex08Component } from './ex08/ex08.component';
import { Ex09Component } from './ex09/ex09.component';
import { Ex10Component } from './ex10/ex10.component';
import { Ex11Component } from './ex11/ex11.component';
import { Ex12Component } from './ex12/ex12.component';

const routes: Routes = [
  { path: 'blank', component: Ex00Component },
  { path: 'example-1', component: Ex01Component },
  { path: 'example-2', component: Ex02Component },
  { path: 'example-3', component: Ex03Component },
  { path: 'example-4', component: Ex04Component },
  { path: 'example-5', component: Ex05Component },
  { path: 'example-6', component: Ex06Component },
  { path: 'example-7', component: Ex07Component },
  { path: 'example-8', component: Ex08Component },
  { path: 'example-9', component: Ex09Component },
  { path: 'example-10', component: Ex10Component },
  { path: 'example-11', component: Ex11Component },
  { path: 'example-12', component: Ex12Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
