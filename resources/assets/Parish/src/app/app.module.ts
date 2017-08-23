import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { FullLayoutComponent } from './layout/full-layout.component';
import { Ng2AutoBreadCrumb } from 'ng2-auto-breadcrumb';
import { Ng2NewsListComponent } from './components/ng2-newslist/ng2newslist.component';
import { NotAuthGuard } from './auth/not-auth.guard';


@NgModule( {
	imports: [
		AppRoutingModule,
		BrowserModule,
		CommonModule,
		HttpModule,
		Ng2AutoBreadCrumb
	],
	declarations: [
		FullLayoutComponent,
		AppComponent
	],
	providers: [
		AuthService,
		AuthGuard,
		NotAuthGuard
	],
	bootstrap: [ AppComponent ]
} )
export class AppModule { }
