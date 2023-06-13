
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
        url: '/app/invoice',
        
    },
    {
        key: 'view_contact',
        label: 'Client',
        isTitle: false,
        icon: 'clipboard',
        url: '/app/client',
        
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
        url: '/app/invoice',
        
    },
    {
        key: 'view_contact',
        label: 'Client',
        isTitle: false,
        icon: 'clipboard',
        url: '/app/client',
        
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
        url: '/app/invoice',
        
        
    },
    {
        key: 'view_contact',
        label: 'Client',
        isTitle: false,
        icon: 'clipboard',
        url: '/app/client',
        
    },
    
   
    
];

export { MENU_ITEMS, TWO_COl_MENU_ITEMS, HORIZONTAL_MENU_ITEMS };
