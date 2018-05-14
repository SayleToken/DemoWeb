import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { CalendarEvent } from 'angular-calendar';

import { Transaction } from '../transaction.model';

@Component({
    selector     : 'fuse-contacts-contact-form-dialog',
    templateUrl  : './contact-form.component.html',
    styleUrls    : ['./contact-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class FuseContactsContactFormDialogComponent
{
    event: CalendarEvent;
    dialogTitle: string;
    contactForm: FormGroup;
    action: string;
    contact: Transaction;

    constructor(
        public dialogRef: MatDialogRef<FuseContactsContactFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder
    )
    {
        this.action = data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Edit Transaction';
            this.contact = data.contact;
        }
        else
        {
            this.dialogTitle = 'New Transaction';
            this.contact = new Transaction({});
        }

        this.contactForm = this.createContactForm();
    }

    createContactForm()
    {
        return this.formBuilder.group({
            id      : [this.contact.id],
            customer    : [this.contact.customer],       
            product    : [this.contact.product],       
            amount   : [this.contact.amount],
            quantity   : [this.contact.quantity]
        });
    }
}
