import { FuseUtils } from '@fuse/utils';

export class Transaction
{
    id: string;
    customer: string;    
    product: string;    
    quantity: string;
    amount: string;


    constructor(contact)
    {
        {
            this.id = contact._id || FuseUtils.generateGUID();
            this.customer = contact.customer || '';
            this.product = contact.product || '';
            //this.avatar = contact.avatar || 'assets/images/avatars/profile.jpg';           
            this.quantity = contact.quantity || '';
            this.amount = contact.amount || '';        
        }
    }
}
