import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { FullLayoutComponent } from './layout/full-layout.component';
import { NotAuthGuard } from './auth/not-auth.guard';

/** All Routes */
const appRoutes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', canActivate: [ NotAuthGuard ], loadChildren: './auth/login/login.module#LoginModule' },
	{ path: 'register', canActivate: [ NotAuthGuard ], loadChildren: './auth/register/register.module#RegisterModule' },
	{ path: '', canActivate: [ AuthGuard ], component: FullLayoutComponent, data: { title: 'Home' }, children: [
		{ path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', data: { title2: 'Dashboard' } },
		{ path: 'form', loadChildren: './form/form.module#FormModule' },
		{ path: 'widget', children: [
			{ path: '', pathMatch: 'full', redirectTo: 'widget/main' },
			{ path: 'main', loadChildren: './widgets/main/main.module#MainWidgetModule' },
			{ path: 'table', loadChildren: './widgets/tables/tables.module#TablesWidgetModule' },
			{ path: 'chart', loadChildren: './widgets/charts/charts.module#ChartsWidgetModule' }
		] },
		{ path: 'province', loadChildren: './province-zone-area/province/province.module#ProvinceModule' },
		{ path: 'zone', loadChildren: './province-zone-area/zone/zone.module#ZoneModule' },
		{ path: 'area', loadChildren: './province-zone-area/area/area.module#AreaModule' }
	] }
];
@NgModule( {
	imports: [ RouterModule.forRoot( appRoutes ) ],
	exports: [ RouterModule ]
} )
export class AppRoutingModule { }
