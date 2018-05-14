import { FuseUtils } from '@fuse/utils';

export class Product
{
    id: string;
    name: string;    
    supplier: string;    
    price: string;

    constructor(contact)
    {
        {
            this.id = contact._id || FuseUtils.generateGUID();
            this.name = contact.name || '';
            this.supplier = contact.supplier || '';
            this.price = contact.price || '';
        }
    }
}
