
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';

import { fuseAnimations } from '@fuse/animations';

import { FuseContactsContactFormDialogComponent } from './product-form/contact-form.component';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as french } from './i18n/fr';
import { productsService } from './products.service';

@Component({
    selector   : 'fuse-products',
    templateUrl: './products.component.html',
    styleUrls  : ['./products.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class productsComponent implements OnInit, OnDestroy
{    hasSelectedContacts: boolean;
    searchInput: FormControl;
    dialogRef: any;
    onSelectedContactsChangedSubscription: Subscription;

    constructor(private fuseTranslationLoader: FuseTranslationLoaderService,  private productsService: productsService,
        public dialog: MatDialog)
    {
        this.fuseTranslationLoader.loadTranslations(english, french);
        this.searchInput = new FormControl('');
        
    }




    newContact()
    {
        this.dialogRef = this.dialog.open(FuseContactsContactFormDialogComponent, {
            panelClass: 'contact-form-dialog',
            data      : {
                action: 'new'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if ( !response )
                {
                    return;
                }
 
                this.productsService.createContact(response.getRawValue());

            });

    }

    ngOnInit()
    {
        this.onSelectedContactsChangedSubscription =
            this.productsService.onSelectedContactsChanged
                .subscribe(selectedContacts => {
                    this.hasSelectedContacts = selectedContacts.length > 0;
                });

        this.searchInput.valueChanges
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(searchText => {
                this.productsService.onSearchTextChanged.next(searchText);
            });
    }

    ngOnDestroy()
    {
        this.onSelectedContactsChangedSubscription.unsubscribe();
    }
}
