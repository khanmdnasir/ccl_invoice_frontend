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
    const [invoiceSetting, setInvoiceSetting] = useState({
        "auto_approve": false,
        "auto_invoice_send": false,
        "reminder_service": false,
        "contact_id": contactId,
        "reminder_settings": {
            "is_include_public_link": false,
            "is_include_pdf_link": false,
            "minimum_invoice_amount": false,
            "reminder_type": "",
            "days": []
        }});
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
    // console.log("due_in", invoiceSetting?.reminder_settings?.reminder_type === "due_in")
    console.log("data", invoiceSetting)

    // const outerArrayOfSetting = ['auto_approve', 'auto_invoice_send', 'reminder_service']



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


    const mystyle = {
        width: "12rem"
    };

    const invoiceSettingChange = (e) => {
        const data = { ...invoiceSetting }
        const target = e.target.name;
        const value = e.target.checked;
        data[target] = value;
        // console.log('target, value', target, value)

        if (target === "reminder_service" && value === false) {
            data['reminder_settings'] = {
                "is_include_public_link": false,
                "is_include_pdf_link": false,
                "minimum_invoice_amount": false,
                "reminder_type": "",
                "days": []
            }
        }
        setInvoiceSetting(data);
    }

    const invoiceReminderSettingChange = (e) => {
        const reminder_settings = { ...invoiceSetting.reminder_settings }
        const target = e.target.name;
        let value = null;
        if (target === "minimum_invoice_amount" || target === "reminder_type") {
            value = e.target.value;
        }
        else if (target === 'days') {
            value = e.target.value;
            // console.log('value', value)
        }

        else {
            value = e.target.checked;
        }

        reminder_settings[target] = value;
        const data = { ...invoiceSetting }
        data['reminder_settings'] = reminder_settings;

        setInvoiceSetting(data);
    }


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

                <Col md={8} xl={8}>
                    <Card>
                        <Card.Header>
                            <p>Personal Details</p>
                        </Card.Header>
                        <Card.Body>
                            <div className="container">
                                <div className="row mb-4">
                                    <div className="col-sm">
                                        <h5>Name: </h5>
                                        <p>{contact_details?.name}</p>
                                    </div>
                                    <div className="col-sm">
                                        <h5 className='me-2'>Contact ID:</h5>
                                        <p>{contact_details?.client_id}</p>
                                    </div>
                                    <div className="col-sm">
                                        <h5 className='me-2'>Contact Type:</h5>
                                        <p>{contact_details?.contact_type}</p>

                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="col-sm">
                                        <h5 className='me-2'>Contact Person:</h5>
                                        <p>{contact_details?.contact_person}</p>
                                    </div>
                                    <div className="col-sm">
                                        <h5 className='me-2'>Phone:</h5>
                                        <p>{contact_details?.phone}</p>
                                    </div>
                                    <div className="col-sm">
                                        <h5 className='me-2'>Email:</h5>
                                        <p>{contact_details?.email}</p>
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="col-sm">
                                        <h5 className='me-2'>Country:</h5>
                                        <p>{contact_details?.country}</p>
                                    </div>
                                    <div className="col-sm">
                                        <h5 className='me-2'>City:</h5>
                                        <p>{contact_details?.city}</p>
                                    </div>
                                    <div className="col-sm">
                                        <h5 className='me-2'>Billing Address:</h5>
                                        <p>{contact_details?.billing_address}</p>
                                    </div>
                                </div>
                            </div>

                        </Card.Body>
                    </Card>

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
                <Col md={4} xl={4}>
                    <Card>
                        <Card.Header>
                            <p>Invoice Setting</p>
                        </Card.Header>
                        <Card.Body>

                            <InputGroup className="mb-3">
                                <InputGroup.Text style={mystyle}>
                                    Auto Invoice Send</InputGroup.Text>
                                <InputGroup.Checkbox name="auto_invoice_send" onChange={(e) => invoiceSettingChange(e)} />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Text style={mystyle}>
                                    Reminder Service</InputGroup.Text>
                                <InputGroup.Checkbox name="reminder_service" checked={invoiceSetting?.reminder_service} onChange={(e) => invoiceSettingChange(e)} />
                            </InputGroup>

                            {invoiceSetting?.reminder_service ?
                                (
                                    <div style={{ marginLeft: "1rem" }}>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text style={mystyle}>
                                                Is Inclued Public Link</InputGroup.Text>
                                            <InputGroup.Checkbox name="is_include_public_link" checked={invoiceSetting?.reminder_settings?.is_include_public_link} onChange={(e) => invoiceReminderSettingChange(e)} />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text style={mystyle}>
                                                Is Inclued Pdf Link</InputGroup.Text>
                                            <InputGroup.Checkbox name="is_include_pdf_link" checked={invoiceSetting?.reminder_settings?.is_include_pdf_link} onChange={(e) => invoiceReminderSettingChange(e)} />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text style={mystyle}>
                                                Reminder Type</InputGroup.Text>
                                            <Form.Check
                                                type="radio"
                                                name="reminder_type" checked={invoiceSetting?.reminder_settings?.reminder_type === "due_in"} onChange={(e) => invoiceReminderSettingChange(e)}
                                                label="due_in"
                                                value="due_in"
                                                style={{ "marginRight": "1rem", "marginLeft": "1rem", marginTop: "0.5rem" }}
                                            />
                                            <Form.Check
                                                type="radio"
                                                name="reminder_type" checked={invoiceSetting?.reminder_settings?.reminder_type === "over_due"} onChange={(e) => invoiceReminderSettingChange(e)}
                                                label="over_due"
                                                value="over_due"
                                                style={{ "marginRight": "1rem", marginTop: "0.5rem" }}
                                            />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text style={mystyle}>
                                                Minimum Invoice Amount</InputGroup.Text>
                                            <Form.Control type="number" name="minimum_invoice_amount" value={invoiceSetting?.reminder_settings?.minimum_invoice_amount
                                            } onChange={(e) => invoiceReminderSettingChange(e)} />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text style={mystyle}>
                                                Days</InputGroup.Text>
                                            <Form.Control type="number" name="days" value={invoiceSetting?.reminder_service?.days} onChange={(e) => invoiceReminderSettingChange(e)} />
                                        </InputGroup>
                                    </div>
                                ) :
                                <></>
                            }
                        </Card.Body>
                    </Card>
                </Col>

            </Row>

            <Row>

            </Row>


        </>
    );
};
export default ContactDetails;
