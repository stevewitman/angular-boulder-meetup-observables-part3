import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HighlightService } from './highlight.service';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { OperatorComponent } from './operator/operator.component';
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
// import { Ex12Component } from './ex12/ex12.component';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AbmSlidesComponent } from './abm-slides/abm-slides.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    OperatorComponent,
    Ex01Component,
    Ex02Component,
    Ex03Component,
    Ex04Component,
    Ex05Component,
    Ex06Component,
    Ex07Component,
    Ex08Component,
    Ex09Component,
    Ex10Component,
    Ex11Component,
    AbmSlidesComponent,
    // Ex12Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatTooltipModule,
  ],
  providers: [HighlightService],
  bootstrap: [AppComponent],
})
export class AppModule {}
