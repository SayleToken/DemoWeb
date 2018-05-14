import { FuseUtils } from '@fuse/utils';

export class User
{
    id: string;
    name: string;    
    email: string;
    phone: string;


    constructor(contact)
    {
        {
            this.id = contact._id || FuseUtils.generateGUID();
            this.name = contact.name || '';
            //this.avatar = contact.avatar || 'assets/images/avatars/profile.jpg';           
            this.email = contact.email || '';
            this.phone = contact.phone || '';        
        }
    }
}
