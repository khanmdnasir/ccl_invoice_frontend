import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { useLocation } from 'react-router-dom';
// components
import PageTitle from '../../components/PageTitle';
import { useSelector, useDispatch } from 'react-redux';
import { APICore } from '../../helpers/api/apiCore';
import { getContactInvoice, getContactDetails, getContactInvoiceSetting } from '../../redux/actions';


const api = new APICore()


const ContactDetails = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [contactId, setContactId] = useState();
    const invoice_list = useSelector(state => state.Contact.invoice_list);
    const contact_details = useSelector(state => state.Contact.contact_details);
    const invoice_setting = useSelector(state => state.Contact.invoice_setting);
    // const loading = useSelector(state => state.Invoice.loading);

    useEffect(() => {
        const state = location.state
        if(state){
            setContactId(parseInt(state));
        }
    }, [])

    // console.log("invoice_list", invoice_list)
    // console.log("contact_details", contact_details)
    // console.log("invoice_setting", invoice_setting)

    useEffect(() => {
        if (contactId!==undefined){
            dispatch(getContactInvoice(contactId))
            dispatch(getContactDetails(contactId))
            dispatch(getContactInvoiceSetting(contactId))
        }
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
