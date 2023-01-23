import React, { useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';


// actions
import { resetAuth, loginUser } from '../../redux/actions';

// store
import { RootState, AppDispatch } from '../../redux/store';

import { useQuery } from '../../hooks';

// components
import { VerticalForm, FormInput } from '../../components';

import AuthLayout from './AuthLayout';

interface UserData {
    email: string;
    password: string;
}

/* bottom link */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer footer-alt">
            {/* <p className="text-muted">
                {t("Don't have an account?")}{' '}
                <Link to={'/auth/register'} className="text-muted ms-1">
                    <b>{t('Sign Up')}</b>
                </Link>
            </p> */}
        </footer>
    );
};



const Login = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();

    const query = useQuery();
    const next = query.get('next');

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    const { loading, userLoggedIn, user, error } = useSelector((state: RootState) => ({
        loading: state.Auth.loading,
        user: state.Auth.user,
        error: state.Auth.error,
        userLoggedIn: state.Auth.userLoggedIn,
    }));

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            email: yup.string().required(t('Please enter Email')),
            password: yup.string().required(t('Please enter Password')),
        })
    );

    /*
     * handle form submission
     */
    const onSubmit = (formData: UserData) => {
        dispatch(loginUser(formData['email'], formData['password']));
    };

    return (
        <>
            {userLoggedIn || user ? <Redirect to={next ? next : '/'}></Redirect> : null}

            <AuthLayout bottomLinks={<BottomLink />}>
                <h4 className="mt-0">{t('Sign In')}</h4>
                <p className="text-muted mb-4">{t('Enter your email address and password to access account.')}</p>

                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}

                <VerticalForm
                    onSubmit={onSubmit}
                    resolver={schemaResolver}
                >
                    <FormInput
                        label={t('Email')}
                        type="text"
                        name="email"
                        placeholder={t('Enter your Email')}
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={t('Password')}
                        type="password"
                        name="password"
                        placeholder={t('Enter your password')}
                        containerClass={'mb-3'}
                    >
                        <Link to="/auth/forget-password" className="text-muted float-end">
                            <small>{t('Forgot your password?')}</small>
                        </Link>
                    </FormInput>

                    <FormInput label="Remember me" type="checkbox" name="checkbox" containerClass={'mb-3'} />

                    <div className="d-grid mb-0 text-center">
                        <Button style={{"background":'#00a551', 'border':'none'}} type="submit" disabled={loading}>
                            {t('Log In')}
                        </Button>
                    </div>

                    
                </VerticalForm>
            </AuthLayout>
        </>
    );
};

export default Login;
