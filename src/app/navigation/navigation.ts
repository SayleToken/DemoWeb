export const navigation = [
    {
        'id': 'main',
        'title': 'Main',
        'translate': 'NAV.Main',
        'type': 'group',
        'children': [
            {
                'id': 'overview',
                'title': 'Dashboard',
                'translate': 'NAV.Dashboard.TITLE',
                'type': 'item',
                'icon': 'dashboard',
                'url': '/overview'
            },
            {
                'id': 'transaction',
                'title': 'Transactions',
                'translate': 'NAV.Transaction.TITLE',
                'type': 'item',
                'icon': 'attach_money',
                'url': '/transactions'
            },            
            {
                'id': 'products',
                'title': 'Products',
                'translate': 'NAV.Products.TITLE',
                'type': 'item',
                'icon': 'supervisor_account',
                'url': '/products'
            },
            {
                'id': 'users',
                'title': 'Users',
                'translate': 'NAV.Users.TITLE',
                'type': 'item',
                'icon': 'supervisor_account',
                'url': '/users'
            }
        ]
    },
    // {
    //     'id'      : 'settings',
    //     'title'   : 'Settings',
    //     'translate': 'NAV.Settings',
    //     'type'    : 'group',
    //     'children': [
    //         {
    //             'id'   : 'users',
    //             'title': 'Users',
    //             'translate': 'NAV.Users.TITLE',
    //             'type' : 'item',
    //             'icon' : 'supervisor_account',
    //             'url'  : '/users'
    //             // ,
    //             // 'badge': {
    //             //     'title': 25,
    //             //     'translate': 'NAV.SAMPLE.BADGE',
    //             //     'bg'   : '#F44336',
    //             //     'fg'   : '#FFFFFF'
    //             // }
    //         }
    //     ]
    // }
];
