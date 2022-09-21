
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
        key: 'client',
        label: 'Client',
        isTitle: false,
        icon: 'airplay',
        url: '/app/client',
        
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
        key: 'client',
        label: 'Client',
        isTitle: false,
        icon: 'airplay',
        url: '/app/client',
        
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
        key: 'client',
        label: 'Client',
        isTitle: false,
        icon: 'airplay',
        url: '/app/client',
        
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
            
        ],
    },
   
    
];

export { MENU_ITEMS, TWO_COl_MENU_ITEMS, HORIZONTAL_MENU_ITEMS };
