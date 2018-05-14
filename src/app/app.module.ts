import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';

import { fuseConfig } from './fuse-config';

import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { OverviewModule } from './main/content/overview/overview.module';
import { UsersModule } from './main/content/users/users.module';
import { transactionsModule } from './main/content/transaction/transactions.module';
import { productsModule } from './main/content/products/products.module';

const appRoutes: Routes = [
    {
        path      : '**',
        redirectTo: 'overview'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        TranslateModule.forRoot(),

        // Fuse Main and Shared modules
        FuseModule.forRoot(fuseConfig),
        FuseSharedModule,
        FuseMainModule,
        OverviewModule,
        UsersModule,
        transactionsModule,
        transactionsModule,
        productsModule

    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
