import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { OverviewComponent } from './overview.component';

const routes = [
    {
        path     : 'overview',
        component: OverviewComponent
    }
];

@NgModule({
    declarations: [
        OverviewComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule
    ],
    exports     : [
        OverviewComponent
    ]
})

export class OverviewModule
{
}
