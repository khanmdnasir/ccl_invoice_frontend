import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { getLoginPageLogo, getLogo } from '../../redux/actions';


import CCL_Logo from '../../assets/images/Qorum.svg';
import { RootState, AppDispatch } from '../../redux/store';



interface AccountLayoutProps {
    helpText?: string;
    bottomLinks?: any;
    isCombineForm?: boolean;
    children?: any;
}

const AuthLayout = ({ helpText, bottomLinks, children, isCombineForm }: AccountLayoutProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();

    const { company_logo } = useSelector((state: RootState) => ({
        company_logo: state.CompanySettings.company_login_page_logo
    }));

    useEffect(()=>{
        dispatch(getLoginPageLogo())
    },[])

    useEffect(() => {
        if (document.body) document.body.classList.remove('authentication-bg', 'authentication-bg-pattern');
        if (document.body) document.body.classList.add('auth-fluid-pages', 'pb-0');

        return () => {
            if (document.body) document.body.classList.remove('auth-fluid-pages', 'pb-0');
        };
    }, []);

    return (
        <>
            <div className="auth-fluid">
                {/* Auth fluid left content */}
                <div className="auth-fluid-form-box">
                    <div className="align-items-center d-flex h-100">
                        <Card.Body>
                            {/* logo */}
                            <div className="auth-brand text-center text-lg-start">
                                <div className="auth-logo">
                                    <Link to="/" className="logo logo-dark text-center outline-none">
                                        <span className="logo-lg">
                                            <img src={company_logo?.value_file} alt="" height="140" />
                                        </span>
                                    </Link>

                                    <Link to="/" className="logo logo-light text-center">
                                        <span className="logo-lg">
                                            <img src={company_logo?.value_file} alt="" height="140" />
                                        </span>
                                    </Link>
                                </div>
                            </div>

                            {children}

                            {/* footer links */}
                            {bottomLinks}
                        </Card.Body>
                    </div>
                </div>

                {/* Auth fluid right content */}
                <div className="auth-fluid-right text-center ml-5">
                    <div className="auth-user-testimonial">

                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthLayout;
