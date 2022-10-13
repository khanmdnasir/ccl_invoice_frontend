import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { useLocation } from 'react-router-dom';
// components
import PageTitle from '../../components/PageTitle';
import { useSelector, useDispatch } from 'react-redux';
import { APICore } from '../../helpers/api/apiCore';
import { getContactInvoice } from '../../redux/actions';


const api = new APICore()


const ContactDetails = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [contactId, setContactId] = useState();
    const invoice_list = useSelector(state => state.Contact.invoice_list);
    // const loading = useSelector(state => state.Invoice.loading);

    useEffect(() => {
        const state = location.state
        setContactId(state);
    }, [])

    // console.log("invoice_list", invoice_list)
    useEffect(() => {
        dispatch(getContactInvoice(contactId))
    }, [contactId])
    return (
        <>

            <PageTitle
                breadCrumbItems={[
                    { label: 'Contact', path: '/app/contact', active: false },
                    { label: 'Contact Details', path: '/app/contact_details', active: true },
                ]}
                title={'Contact Details'}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>

                            {contactId}

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};
export default ContactDetails;
