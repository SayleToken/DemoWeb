import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { FuseContactsContactFormDialogComponent } from '../product-form/contact-form.component';
import { productsService } from '../products.service';

@Component({
    selector     : 'fuse-contacts-contact-list',
    templateUrl  : './contact-list.component.html',
    styleUrls    : ['./contact-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class FuseContactsContactListComponent implements OnInit, OnDestroy
{
    @ViewChild('dialogContent') dialogContent: TemplateRef<any>;

    contacts: any;
    user: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['checkbox',  'name', 'supplier', 'price'];
    selectedContacts: any[];
    checkboxes: {};

    onContactsChangedSubscription: Subscription;
    onSelectedContactsChangedSubscription: Subscription;
    onUserDataChangedSubscription: Subscription;

    dialogRef: any;

    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(
        private contactsService: productsService,
        public dialog: MatDialog
    )
    {
        this.onContactsChangedSubscription =
            this.contactsService.onContactsChanged.subscribe(contacts => {

                this.contacts = contacts;

                this.checkboxes = {};
                contacts.map(contact => {
                    this.checkboxes[contact.id] = false;
                });
            });

        this.onSelectedContactsChangedSubscription =
            this.contactsService.onSelectedContactsChanged.subscribe(selectedContacts => {
                for ( const id in this.checkboxes )
                {
                    if ( !this.checkboxes.hasOwnProperty(id) )
                    {
                        continue;
                    }

                    this.checkboxes[id] = selectedContacts.includes(id);
                }
                this.selectedContacts = selectedContacts;
            });

        this.onUserDataChangedSubscription =
            this.contactsService.onproductDataChanged.subscribe(user => {
                this.user = user;
            });

    }

    ngOnInit()
    {
        this.dataSource = new FilesDataSource(this.contactsService);
    }

    ngOnDestroy()
    {
        this.onContactsChangedSubscription.unsubscribe();
        this.onSelectedContactsChangedSubscription.unsubscribe();
        this.onUserDataChangedSubscription.unsubscribe();
    }

    editContact(contact)
    {
        this.dialogRef = this.dialog.open(FuseContactsContactFormDialogComponent, {
            panelClass: 'contact-form-dialog',
            data      : {
                contact: contact,
                action : 'edit'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if ( !response )
                {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch ( actionType )
                {
                    /**
                     * Save
                     */
                    case 'save':

                        this.contactsService.updateContact(formData.getRawValue());

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteContact(contact);

                        break;
                }
            });
    }

    /**
     * Delete Contact
     */
    deleteContact(contact)
    {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                this.contactsService.deleteContact(contact);
            }
            this.confirmDialogRef = null;
        });

    }

    onSelectedChange(contactId)
    {
        this.contactsService.toggleSelectedContact(contactId);
    }
}

export class FilesDataSource extends DataSource<any>
{
    constructor(private contactsService: productsService)
    {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<any[]>
    {
        return this.contactsService.onContactsChanged;
    }

    disconnect()
    {
    }
}
