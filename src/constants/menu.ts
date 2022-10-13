
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
        key: 'dashboards',
        label: 'Contact',
        isTitle: false,
        icon: 'clipboard',
        url: '/app/contact',
        
    },
    {
        key: 'dashboards',
        label: 'Service',
        isTitle: false,
        icon: 'service',
        url: '/app/service',
        
    },
    {
        key: 'dashboards',
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
                key: 'view_invoice',
                label: 'Repeating Invoice',
                url: '/app/repeating_invoice',
                parentKey: 'dashboards',
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
        key: 'dashboards',
        label: 'Contact',
        isTitle: false,
        icon: 'clipboard',
        url: '/app/contact',
        
    },   
    {
        key: 'dashboards',
        label: 'Service',
        isTitle: false,
        icon: 'phone',
        url: '/app/service',
        
    }, 
    {
        key: 'dashboards',
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
                key: 'view_invoice',
                label: 'Repeating Invoice',
                url: '/app/repeating_invoice',
                parentKey: 'dashboards',
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
        key: 'dashboards',
        label: 'Contact',
        isTitle: false,
        icon: 'clipboard',
        url: '/app/contact',
        
    },   
    {
        key: 'dashboards',
        label: 'Service',
        isTitle: false,
        icon: 'phone',
        url: '/app/service',
        
    }, 
    {
        key: 'dashboards',
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
                key: 'view_invoice',
                label: 'Repeating Invoice',
                url: '/app/repeating_invoice',
                parentKey: 'dashboards',
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
            
            
        ],
    },
   
    
];

export { MENU_ITEMS, TWO_COl_MENU_ITEMS, HORIZONTAL_MENU_ITEMS };
