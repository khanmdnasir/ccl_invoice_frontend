import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import Client from '../pages/app/Client';

import ChangePassword from '../pages/app/user-management/ChangePassword';
import RoleForm from '../pages/Form/RoleForm';
import PasswordReset from '../pages/auth/PasswordReset';
import PasswordResetSuccess from '../pages/auth/PasswordResetSuccess';

// components
import PrivateRoute from './PrivateRoute';
import Root from './Root';

// lazy load all the views

// auth
const Login = React.lazy(() => import('../pages/auth/Login'));
const Logout = React.lazy(() => import('../pages/auth/Logout'));
const Confirm = React.lazy(() => import('../pages/auth/Confirm'));
const ForgetPassword = React.lazy(() => import('../pages/auth/ForgetPassword'));
const Register = React.lazy(() => import('../pages/auth/Register'));

  
// dashboard
const Dashboard = React.lazy(() => import('../pages/dashboard'));

//apps
const MyProfile = React.lazy(() => import('../pages/app/user-management/MyProfile'));
const Users = React.lazy(() => import('../pages/app/user-management/Users'));
const Role = React.lazy(() => import('../pages/app/user-management/Role'));

const Currency = React.lazy(() => import('../pages/app/settings/Currency'));


//others
const SearchResults = React.lazy(() => import('../pages/other/SearchResults/'));
const Error404Alt = React.lazy(() => import('../pages/error/Error404Alt'));
const Error500Two = React.lazy(() => import('../pages/error/Error500Two'));




export interface RoutesProps {
    path: RouteProps['path'];
    name?: string;
    component?: RouteProps['component'];
    route?: any;
    exact?: RouteProps['exact'];
    icon?: string;
    header?: string;
    roles?: string[];
    children?: RoutesProps[];
}

// root routes
const rootRoute: RoutesProps = {
    path: '/',
    exact: true,
    component: () => <Root />,
    route: Route,
};

// dashboards
const dashboardRoutes: RoutesProps = {
    path: '/dashboard',
    name: 'Dashboards',
    component: Dashboard,
    route: PrivateRoute,
};

//apps
const AppRoutes = {
    path: '/app',
    name: 'App',
    route: PrivateRoute,
    
    children: [
        
        {
            path: '/app/my-profile',
            name: 'My Profile',
            component: MyProfile,
            route: PrivateRoute,
        },
        {
            path: '/app/change_password',
            name: 'Change Password',
            component: ChangePassword,
            route: PrivateRoute,
        },
        {
            path: '/app/add_role',
            name: 'Add Role',
            component: RoleForm,
            route: PrivateRoute,
        },
        {
            path: '/app/users',
            name: 'Users',
            component: Users,
            route: PrivateRoute,
        },
        {
            path: '/app/roles',
            name: 'Roles',
            component: Role,
            route: PrivateRoute,
        },
        {
            path: '/app/currency',
            name: 'Currency',
            component: Currency,
            route: PrivateRoute,
        },
        {
            path: '/app/client',
            name: 'Client',
            component: Client,
            route: PrivateRoute,
        },
        
        
    ],
};

// pages
const extrapagesRoutes = {
    path: '/pages',
    name: 'Pages',
    children: [
        
        {
            path: '/pages/serach-results',
            name: 'Search Results',
            component: SearchResults,
            route: PrivateRoute,
        },
        {
            path: '/pages/error-404-alt',
            name: 'Error - 404-alt',
            component: Error404Alt,
            route: PrivateRoute,
        },
        {
            path: '/pages/error-500',
            name: 'Error - 500',
            component: Error500Two,
            route: PrivateRoute,
        },
    ],
};


// auth
const authRoutes: RoutesProps[] = [
    {
        path: '/auth/login',
        name: 'Login',
        component: Login,
        route: Route,
    },
    {
        path: '/auth/register',
        name: 'Register',
        component: Register,
        route: Route,
    },
    {
        path: '/auth/confirm',
        name: 'Confirm',
        component: Confirm,
        route: Route,
    },
    {
        path: '/auth/forget-password',
        name: 'Forget Password',
        component: ForgetPassword,
        route: Route,
    },
    {
        path: '/auth/password_reset',
        name: 'Password Reset',
        component: PasswordReset,
        route: Route,
    },
    {
        path: '/auth/password_reset_success',
        name: 'Forget Password',
        component: PasswordResetSuccess,
        route: Route,
    },
    {
        path: '/auth/logout',
        name: 'Logout',
        component: Logout,
        route: Route,
    },
    
];



// flatten the list of all nested routes
const flattenRoutes = (routes: RoutesProps[]) => {
    let flatRoutes: RoutesProps[] = [];

    routes = routes || [];
    routes.forEach((item: RoutesProps) => {
        flatRoutes.push(item);

        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};

// All routes
const authProtectedRoutes = [rootRoute, dashboardRoutes,extrapagesRoutes,AppRoutes];
const publicRoutes = [...authRoutes];

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes]);
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes]);
export { publicRoutes, authProtectedRoutes, authProtectedFlattenRoutes, publicProtectedFlattenRoutes };
