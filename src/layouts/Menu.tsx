import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import classNames from 'classnames';
import FeatherIcon from 'feather-icons-react';

//helpers
import { findAllParent, findMenuItem } from '../helpers/menu';

// constants
import { MenuItemTypes } from '../constants/menu';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface SubMenus {
    item: MenuItemTypes;
    linkClassName?: string;
    subMenuClassNames?: string;
    activeMenuItems?: Array<string>;
    toggleMenu?: (item: any, status: boolean) => void;
    className?: string;
}

const MenuItemWithChildren = ({ item, linkClassName, subMenuClassNames, activeMenuItems, toggleMenu }: SubMenus) => {
    const [open, setOpen] = useState<boolean>(activeMenuItems!.includes(item.key));
    const user_permissions = useSelector((state:RootState)=> state.Role.user_role);
    useEffect(() => {
        setOpen(activeMenuItems!.includes(item.key));
    }, [activeMenuItems, item]);

    const toggleMenuItem = (e: any) => {
        e.preventDefault();
        const status = !open;
        setOpen(status);
        if (toggleMenu) toggleMenu(item, status);
        return false;
    };

    return (
        <li className={classNames('side-nav-item', { 'menuitem-active': open })}>
            <Link
                to="#"
                onClick={toggleMenuItem}
                data-menu-key={item.key}
                aria-expanded={open}
                className={classNames('has-arrow', 'side-sub-nav-link', linkClassName, {
                    'menuitem-active': activeMenuItems!.includes(item.key) ? 'active' : '',
                })}
            >
                {item.icon && <FeatherIcon icon={item.icon} />}
                {!item.badge ? (
                    <span className="menu-arrow"></span>
                ) : (
                    <span className={`badge bg-${item.badge.variant} rounded-pill float-end`}>{item.badge.text}</span>
                )}
                <span> {item.label} </span>
            </Link>
            <Collapse in={open}>
                <div>
                    <ul className={classNames(subMenuClassNames)}>
                        {(item.children || []).map((child, i) => {
                            return (
                                <React.Fragment key={i}>
                                    {child.children ? (
                                        
                                        <>
                                            {/* parent */}
                                            <MenuItemWithChildren
                                                item={child}
                                                linkClassName={activeMenuItems!.includes(child.key) ? 'active' : ''}
                                                activeMenuItems={activeMenuItems}
                                                subMenuClassNames="side-nav-third-level"
                                                toggleMenu={toggleMenu}
                                            />
                                        </>
                                    ) : (
                                        user_permissions.includes(child.key) &&
                                        <>
                                            {/* child */}
                                            
                                            <MenuItem
                                                item={child}
                                                className={
                                                    activeMenuItems!.includes(child.key) ? 'menuitem-active' : ''
                                                }
                                                linkClassName={activeMenuItems!.includes(child.key) ? 'active' : ''}
                                            />
                                        </>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </ul>
                </div>
            </Collapse>
        </li>
    );
};

const MenuItem = ({ item, className, linkClassName }: SubMenus) => {
    
    return (
        <li className={classNames('side-nav-item', className)}>
            <MenuItemLink item={item} className={linkClassName} />
        </li>
    );
};

const MenuItemLink = ({ item, className }: SubMenus) => {
    return (
        <Link
            to={item.url!}
            target={item.target}
            className={classNames('side-nav-link-ref', 'side-sub-nav-link', className)}
            data-menu-key={item.key}
        >
            {item.icon && <FeatherIcon icon={item.icon} />}
            {item.badge && <span className={`badge bg-${item.badge.variant} float-end`}>{item.badge.text}</span>}
            <span> {item.label} </span>
        </Link>
    );
};

/**
 * Renders the application menu
 */
interface AppMenuProps {
    menuItems: MenuItemTypes[];
}

const AppMenu = ({ menuItems }: AppMenuProps) => {
    let location = useLocation();
    const user_permissions = useSelector((state:RootState)=> state.Role.user_role);
    const menuRef: any = useRef(null);

    const [activeMenuItems, setActiveMenuItems] = useState<Array<string>>([]);

    /*
     * toggle the menus
     */
    const toggleMenu = (menuItem: MenuItemTypes, show: boolean) => {
        if (show) setActiveMenuItems([menuItem['key'], ...findAllParent(menuItems, menuItem)]);
    };

    /**
     * activate the menuitems
     */
    const activeMenu = useCallback(() => {
        const div = document.getElementById('main-side-menu');
        let matchingMenuItem = null;

        if (div) {
            let items: any = div.getElementsByClassName('side-nav-link-ref');
            for (let i = 0; i < items.length; ++i) {
                if (location.pathname === items[i].pathname) {
                    matchingMenuItem = items[i];
                    break;
                }
            }

            if (matchingMenuItem) {
                const mid = matchingMenuItem.getAttribute('data-menu-key');
                const activeMt = findMenuItem(menuItems, mid);
                if (activeMt) {
                    setActiveMenuItems([activeMt['key'], ...findAllParent(menuItems, activeMt)]);
                }
            }
        }
    }, [location, menuItems]);

    useEffect(() => {
        
        activeMenu();
    }, [activeMenu]);

    return (
        <>
            <ul className="side-menu" ref={menuRef} id="main-side-menu">
                {(menuItems || []).map((item, idx) => {
                    if(['dashboards','invoice','payment','settings'].includes(item.key) || user_permissions.includes(item.key))
                    return (
                        <React.Fragment key={idx}>
                            {item.isTitle ? (
                                <li
                                    className={classNames('menu-title', {
                                        'mt-2': idx !== 0,
                                    })}
                                >
                                    {item.label}
                                </li>
                            ) : (
                                <>
                                    {item.children ? (
                                        <MenuItemWithChildren
                                            item={item}
                                            toggleMenu={toggleMenu}
                                            subMenuClassNames="nav-second-level"
                                            activeMenuItems={activeMenuItems}
                                            linkClassName="side-nav-link"
                                        />
                                    ) : (
                                        
                                        <MenuItem
                                            item={item}
                                            linkClassName="side-nav-link"
                                            className={activeMenuItems!.includes(item.key) ? 'menuitem-active' : ''}
                                        />
                                    )}
                                </>
                            )}
                        </React.Fragment>
                    );
                })}
            </ul>
        </>
    );
};

export default AppMenu;
