
export interface MenuItemTypes {
    key: string;
    label: string;
    isTitle?: boolean;
    icon?: string;
    image?: string;
    url?: string;
    badge?: {
        variant: string;
        text: string;
    };
    parentKey?: string;
    target?: string;
    children?: MenuItemTypes[];
}

const MENU_ITEMS: MenuItemTypes[] = [
    { key: 'navigation', label: 'Navigation', isTitle: true },
    {
        key: 'dashboards',
        label: 'Dashboards',
        isTitle: false,
        icon: 'airplay',
        url: '/dashboard',
        
    },
    {
        key: 'invoice',
        label: 'Invoice',
        isTitle: false,
        icon: 'invoice',
        children: [ 
            {
                key: 'view_invoice',
                label: 'Invoice',
                url: '/app/invoice',
                parentKey: 'dashboards',
            },
            {
                key: 'view_repeatinginvoice',
                label: 'Repeating Invoice',
                url: '/app/repeating_invoice',
                parentKey: 'dashboards',
            },
            
            
        ],
    },
    {
        key: 'view_contact',
        label: 'Client',
        isTitle: false,
        icon: 'clipboard',
        url: '/app/client',
        
    },
    {
        key: 'general_ledger',
        label: 'Reports',
        isTitle: false,
        icon: 'layers',
        children: [ 
            {
                key: 'view_general_ledger',
                label: 'General Report',
                url: '/app/client_statement',
                parentKey: 'general_ledger',
            },
        ],
    },
    {
        key: 'settings',
        label: 'Settings',
        isTitle: false,
        icon: 'settings',
        children: [ 
            {
                key: 'view_group',
                label: 'Roles',
                url: '/app/roles',
                parentKey: 'settings',
            },
            {
                key: 'view_user',
                label: 'Users',
                url: '/app/users',
                parentKey: 'settings',
            },
            {
                key: 'view_currency',
                label: 'Currency',
                url: '/app/currency',
                parentKey: 'settings',
            },
            {
                key: 'view_companysettings',
                label: 'Company Settings',
                url: '/app/company_settings',
                parentKey: 'settings',
            },
            {
                key: 'view_chartofaccount',
                label: 'Chart Of Accounts',
                url: '/app/chart_of_accounts',
                parentKey: 'settings',
            },
            {
                key: 'view_kammodel',
                label: 'Key Account Manager',
                url: '/app/key_account_manager',
                parentKey: 'settings',
            },
            
            
        ],
    },  
    
];

const HORIZONTAL_MENU_ITEMS: MenuItemTypes[] = [
    {
        key: 'dashboards',
        label: 'Dashboards',
        isTitle: false,
        icon: 'airplay',
        url: '/dashboard',
        
    },
    {
        key: 'invoice',
        label: 'Invoice',
        isTitle: false,
        icon: 'file-minus',
        children: [ 
            {
                key: 'view_invoice',
                label: 'Invoice',
                url: '/app/invoice',
                parentKey: 'invoice',
            },
            {
                key: 'view_repeatinginvoice',
                label: 'Repeating Invoice',
                url: '/app/repeating_invoice',
                parentKey: 'invoice',
            },
            
            
        ],
    },
    {
        key: 'view_contact',
        label: 'Client',
        isTitle: false,
        icon: 'clipboard',
        url: '/app/client',
        
    },
    {
        key: 'general_ledger',
        label: 'Reports',
        isTitle: false,
        icon: 'layers',
        children: [ 
            {
                key: 'view_general_ledger',
                label: 'General Report',
                url: '/app/client_statement',
                parentKey: 'general_ledger',
            },
        ],
    },
    {
        key: 'settings',
        label: 'Settings',
        isTitle: false,
        icon: 'settings',
        children: [ 
            {
                key: 'view_group',
                label: 'Roles',
                url: '/app/roles',
                parentKey: 'settings',
            },
            {
                key: 'view_user',
                label: 'Users',
                url: '/app/users',
                parentKey: 'settings',
            },
            {
                key: 'view_currency',
                label: 'Currency',
                url: '/app/currency',
                parentKey: 'settings',
            },
            {
                key: 'view_companysettings',
                label: 'Company Settings',
                url: '/app/company_settings',
                parentKey: 'settings',
            },
            {
                key: 'view_chartofaccount',
                label: 'Chart Of Accounts',
                url: '/app/chart_of_accounts',
                parentKey: 'settings',
            },
            {
                key: 'view_kammodel',
                label: 'Key Account Manager',
                url: '/app/key_account_manager',
                parentKey: 'settings',
            },
            
            
        ],
    },
    
];

const TWO_COl_MENU_ITEMS: MenuItemTypes[] = [
    {
        key: 'dashboards',
        label: 'Dashboards',
        isTitle: false,
        icon: 'airplay',
        url: '/dashboard',
        
    },
    {
        key: 'invoice',
        label: 'Invoice',
        isTitle: false,
        icon: 'invoice',
        children: [ 
            {
                key: 'view_invoice',
                label: 'Invoice',
                url: '/app/invoice',
                parentKey: 'dashboards',
            },
            {
                key: 'view_repeatinginvoice',
                label: 'Repeating Invoice',
                url: '/app/repeating_invoice',
                parentKey: 'dashboards',
            },
            
        ],
        
    },
    {
        key: 'view_contact',
        label: 'Client',
        isTitle: false,
        icon: 'clipboard',
        url: '/app/client',
        
    },
    {
        key: 'general_ledger',
        label: 'Reports',
        isTitle: false,
        icon: 'layers',
        children: [ 
            {
                key: 'view_general_ledger',
                label: 'General Report',
                url: '/app/client_statement',
                parentKey: 'general_ledger',
            },
        ],
    },
    {
        key: 'settings',
        label: 'Settings',
        isTitle: false,
        icon: 'settings',
        children: [ 
            {
                key: 'view_group',
                label: 'Roles',
                url: '/app/roles',
                parentKey: 'settings',
            },
            {
                key: 'view_user',
                label: 'Users',
                url: '/app/users',
                parentKey: 'settings',
            },
            {
                key: 'view_currency',
                label: 'Currency',
                url: '/app/currency',
                parentKey: 'settings',
            },
            {
                key: 'view_companysettings',
                label: 'Company Settings',
                url: '/app/company_settings',
                parentKey: 'settings',
            },
            {
                key: 'view_chartofaccount',
                label: 'Chart Of Accounts',
                url: '/app/chart_of_accounts',
                parentKey: 'settings',
            },
            {
                key: 'view_kammodel',
                label: 'Key Account Manager',
                url: '/app/key_account_manager',
                parentKey: 'settings',
            },
            
            
        ],
    },
   
    
];

export { MENU_ITEMS, TWO_COl_MENU_ITEMS, HORIZONTAL_MENU_ITEMS };
