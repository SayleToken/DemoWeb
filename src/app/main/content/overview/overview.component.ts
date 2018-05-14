import { Component } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as french } from './i18n/fr';

@Component({
    selector   : 'fuse-users',
    templateUrl: './overview.component.html',
    styleUrls  : ['./overview.component.scss']
})
export class OverviewComponent
{
    constructor(private fuseTranslationLoader: FuseTranslationLoaderService)
    {
        this.fuseTranslationLoader.loadTranslations(english, french);
    }
}
