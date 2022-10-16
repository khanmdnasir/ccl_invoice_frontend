import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Form, Alert, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Table from '../../components/Table';
import { useLocation } from 'react-router-dom';
import { ActionColumn } from './invoice'
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
    const [pageSize, setPageSize] = useState(50);
    const [invoiceSetting, setInvoiceSetting] = useState({});
    const invoice_list = useSelector(state => state.Contact.invoice_list);
    const contact_details = useSelector(state => state.Contact.contact_details);
    const invoice_setting = useSelector(state => state.Contact.invoice_setting);
    // const loading = useSelector(state => state.Invoice.loading);

    useEffect(() => {
        const state = location.state
        if (state) {
            setContactId(parseInt(state));
        }
    }, [])

    // console.log("invoice_list", invoice_list)
    // console.log("contact_details", contact_details)
    console.log("invoice_setting", invoice_setting)

    const invoiceSettingChange = (e) =>{
        
    }



    useEffect(() => {
        if (contactId !== undefined) {
            dispatch(getContactInvoice(contactId))
            dispatch(getContactDetails(contactId))
            dispatch(getContactInvoiceSetting(contactId))
        }
    }, [contactId])


    useEffect(() => {
        if (invoice_setting !== undefined) {
            setInvoiceSetting(invoice_setting)
        }
    }, [invoice_setting])


    const columns = [
        {
            Header: 'Invoice No',
            accessor: 'invoice_no',
            sort: true,
        },
        {
            Header: 'Contact',
            accessor: 'contact_id.name',
            sort: true,
        },
        {
            Header: 'Date',
            accessor: 'date',
            sort: true,
        },
        {
            Header: 'Tax Type',
            accessor: 'tax_type',
            sort: true,
        },
        {
            Header: 'Sub Total',
            accessor: 'sub_total',
            sort: true,
        },
        {
            Header: 'Discount',
            accessor: 'discount',
            sort: true,
        },
        {
            Header: 'Total Tax',
            accessor: 'total_tax',
            sort: true,
        },
        {
            Header: 'Total Amount',
            accessor: 'total_amount',
            sort: true,
        },
        {
            Header: 'Action',
            accessor: 'action',
            sort: false,
            Cell: ActionColumn,
        },

    ];

    return (
        <>

            <PageTitle
                breadCrumbItems={[
                    { label: 'Contact', path: '/app/contact', active: false },
                    { label: 'Contact Details', path: '/app/contact_details', active: true },
                ]}
                title={'Contact Report'}
            />
            <Row>

                <Col md={9} xl={9}>
                    <Card>
                        <Card.Header>
                            <p>Personal Details</p>
                        </Card.Header>
                        <Card.Body>
                            <div class="container">
                                <div class="row">
                                    <div class="col-sm">
                                        <h5>Name: </h5>
                                        <p>{contact_details?.name}</p>
                                    </div>
                                    <div class="col-sm">
                                        <h5 class='me-2'>Contact ID:</h5>
                                        <p>{contact_details?.client_id}</p>
                                    </div>
                                    <div class="col-sm">
                                        <h5 class='me-2'>Contact Type:</h5>
                                        <p>{contact_details?.contact_type}</p>

                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm">
                                        <h5 class='me-2'>Contact Person:</h5>
                                        <p>{contact_details?.contact_person}</p>
                                    </div>
                                    <div class="col-sm">
                                        <h5 class='me-2'>Phone:</h5>
                                        <p>{contact_details?.phone}</p>
                                    </div>
                                    <div class="col-sm">
                                        <h5 class='me-2'>Email:</h5>
                                        <p>{contact_details?.email}</p>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm">
                                        <h5 class='me-2'>Country:</h5>
                                        <p>{contact_details?.country}</p>
                                    </div>
                                    <div class="col-sm">
                                        <h5 class='me-2'>City:</h5>
                                        <p>{contact_details?.city}</p>
                                    </div>
                                    <div class="col-sm">
                                        <h5 class='me-2'>Billing Address:</h5>
                                        <p>{contact_details?.billing_address}</p>
                                    </div>
                                </div>
                            </div>

                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} xl={3}>
                    <Card>
                        <Card.Header>
                            <p>Invoice Setting</p>
                        </Card.Header>
                        <Card.Body>

                            <InputGroup className="mb-3">
                                <InputGroup.Text>
                                    Auto Invoice Send</InputGroup.Text>
                                <InputGroup.Checkbox name="auto_invoice_send" onClick={(e) => { console.log(e.target.name) }} aria-label="Checkbox for following text input" />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Text>
                                    Reminder Service</InputGroup.Text>
                                <InputGroup.Checkbox name="reminder_service" checked={invoice_setting?.reminder_service} onClick={(e) => { console.log(e.target.name) }} aria-label="Checkbox for following text input" />
                            </InputGroup>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>

            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <p style={{ marginBottom: '0px !important' }}>Invoice List</p>
                        </Card.Header>

                        <Card.Body>

                            {invoice_list.length > 0 ?
                                <Table
                                    columns={columns}
                                    data={invoice_list}
                                    pageSize={pageSize}
                                    isSortable={true}
                                    pagination={false}
                                    isSearchable={true}
                                    tableClass="table-nowrap table-hover"
                                    searchBoxClass=""
                                />

                                :
                                'No data available!'}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>


        </>
    );
};
export default ContactDetails;
