import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Form, Alert, InputGroup, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Table from '../../components/Table';
import { useLocation } from 'react-router-dom';
import { withSwal } from 'react-sweetalert2';
import ContactForm from '../Form/ContactForm';

import Pagination from '../../components/CustomPagination';
import classNames from 'classnames';
import FeatherIcon from 'feather-icons-react';
// components
import PageTitle from '../../components/PageTitle';
import { useSelector, useDispatch } from 'react-redux';
import { APICore } from '../../helpers/api/apiCore';
import { getContactInvoice, getContactDetails, getContactInvoiceSetting, updateContactInvoiceSetting, setContactSuccessAlert,  getContactService, updateContact, getClientBalance, getCountry, getAllKam } from '../../redux/actions';


const api = new APICore()


const invoicesColumns = [
    {
        Header: 'Invoice No',
        accessor: 'invoice_no',
        sort: true,
    },
    {
        Header: 'Client',
        accessor: 'contact_id.name',
        sort: true,
    },
    {
        Header: 'Date',
        accessor: 'date',
        sort: true,
    },
    {
        Header: 'Due Date',
        accessor: 'due_date',
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
        Cell: (row) => {
            return <div>{row?.row?.original?.sub_total!==null?(row?.row?.original?.sub_total).toLocaleString(undefined, {maximumFractionDigits:2}):0}</div>;
        }
    },
    {
        Header: 'Discount',
        accessor: 'discount',
        sort: true,
        Cell: (row) => {
            return <div>{row?.row?.original?.discount!==null?(row?.row?.original?.discount).toLocaleString(undefined, {maximumFractionDigits:2}):0}</div>;
        }
    },
    {
        Header: 'Total Tax',
        accessor: 'total_tax',
        sort: true,
        Cell: (row) => {
            return <div>{row?.row?.original?.total_tax!==null?(row?.row?.original?.total_tax).toLocaleString(undefined, {maximumFractionDigits:2}):0}</div>;
        }
    },
    {
        Header: 'Total Amount',
        accessor: 'total_amount',
        sort: true,
        Cell: (row) => {
            return <div>{row?.row?.original?.total_amount!==null?(row?.row?.original?.total_amount).toLocaleString(undefined, {maximumFractionDigits:2}):0}</div>;
        }
    },
    {
        Header: 'Status',
        accessor: 'status',
        sort: true,
    },
    

];

const servicesColumns = [

    {
        Header: 'Client',
        accessor: 'contact_id.name',
        sort: true,
    },
    {
        Header: 'Service Type',
        accessor: 'service_type',
        sort: true,
    },
    {
        Header: 'Client Mode',
        accessor: 'contact_mode',
        sort: true,
    },
    {
        Header: 'Payment Terms',
        accessor: 'payment_terms',
        sort: true,
    },
    {
        Header: 'Tax Rate',
        accessor: 'tax_rate',
        sort: true,
        Cell: (row) => {
            return <div>{row?.row?.original?.tax_rate!==null?(row?.row?.original?.tax_rate).toLocaleString(undefined, {maximumFractionDigits:2}):0}</div>;
        }
    },
    {
        Header: 'Unit Price',
        accessor: 'unit_price',
        sort: true,
        Cell: (row) => {
            return <div>{row?.row?.original?.unit_price!==null?(row?.row?.original?.unit_price).toLocaleString(undefined, {maximumFractionDigits:2}):0}</div>;
        }
    },

];


const ContactDetails = withSwal(({ swal }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [contactId, setContactId] = useState();
    const [pageSize, setPageSize] = useState(10);
    const [invoiceSetting, setInvoiceSetting] = useState({
        "auto_approve": false,
        "auto_invoice_send": false,
        "reminder_service": false,
        "contact_id": contactId,
        "reminder_settings": {
            "is_include_public_link": false,
            "is_include_pdf_link": false,
            "minimum_invoice_amount": 0,
            "reminder_type": "",
            "days": []
        }
    });
    const invoice_list = useSelector(state => state.Contact.invoice_list);
    const invoice_list_pagination_data = useSelector(state => state.Contact.invoice_list_pagination_data);
    const contact_details = useSelector(state => state.Contact.contact_details);
    const invoice_setting = useSelector(state => state.Contact.invoice_setting);
    const loading = useSelector(state => state.Contact.loading);
    const invoice_setting_error = useSelector(state => state.Contact.invoice_setting_error);
    const invoice_setting_success = useSelector(state => state.Contact.invoice_setting_success);
    const success = useSelector(state => state.Contact.success);
    const services = useSelector(state => state.Service.contact_services);
    const client_balance = useSelector(state => state.Payment.client_balance);


    const user_role = useSelector((state) => state.Role.user_role);
    const all_kam = useSelector(state => state.Kam.all_kam);
    const country = useSelector(state => state.Location.country);
    const [showClientEditModal, setShowClientEditModal] = useState(false);
    const onCloseModal = () => setShowClientEditModal(false);
    const onOpenModal = () => setShowClientEditModal(true);


    const onSubmit = (formData) => {
        formData['id'] = contactId
        dispatch(updateContact(formData))
        // onCloseModal()
    };

    const onDelete = () => {
        swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#28bb4b',
            cancelButtonColor: '#f34e4e',
            confirmButtonText: 'Yes, delete it!',
        })
            .then(function (result) {
                if (result.value) {
                    api.delete(`/api/contact/${contactId}/`)
                        .then(res => {
                            if (res.data.success) {
                                swal.fire(
                                    'Deleted!',
                                    'Account has been deleted.',
                                    'success'
                                );
                            } else {
                                swal.fire(
                                    'Error',
                                    res.data.error,
                                    'warning'

                                );
                            }

                        })
                        .catch(err => {
                            swal.fire({
                                title: err,
                            }
                            );
                        })
                } else if (result.dismiss === 'cancel') {
                    console.log('cancel')
                }
            })
    }

    useEffect(() => {
        const state = location.state
        if (state) {
            setContactId(parseInt(state));
            localStorage.setItem('client_id', parseInt(state));
        } else {
            let client_id = localStorage.getItem('client_id');
            setContactId(parseInt(client_id));
        }
        dispatch(getCountry());
        dispatch(getAllKam());
    }, [])


    useEffect(() => {

        if (success !== '') {
            onCloseModal();
        }
        setTimeout(() => {
            dispatch(setContactSuccessAlert(''));
        }, 2000)
    }, [success])


    const visitPage = (page) => {
        dispatch(getContactInvoice(contactId, pageSize, page));
    };

    const previous_number = () => {
        dispatch(getContactInvoice(contactId, pageSize, invoice_list_pagination_data.previous));
    };

    const next_number = () => {
        dispatch(getContactInvoice(contactId, pageSize, invoice_list_pagination_data.next));
    };

    // console.log("invoice_list_pagination_data", invoice_list_pagination_data)
    // console.log("invoice_list", invoice_list)
    // console.log("contact_details", contact_details)
    // console.log("due_in", invoiceSetting)

    useEffect(() => {
        if (contactId !== undefined && contactId !== null) {
            dispatch(getContactInvoice(contactId, pageSize, 1))
            dispatch(getContactDetails(contactId))
            dispatch(getContactInvoiceSetting(contactId))
            dispatch(getContactService(contactId)); 
            dispatch(getClientBalance(contactId)); 
        }
    }, [contactId])


    useEffect(() => {
        if (invoice_setting !== undefined) {
            setInvoiceSetting(invoice_setting)
        }
    }, [invoice_setting])


    const mystyle = {
        width: "12rem"
    };

    const invoiceSettingChange = (e) => {
        const data = { ...invoiceSetting }
        const target = e.target.name;
        const value = e.target.checked;
        data[target] = value;

        setInvoiceSetting(data);
    }

    const invoiceReminderSettingChange = (e) => {
        const reminder_settings = { ...invoiceSetting.reminder_settings }
        const target = e.target.name;
        let value = null;
        if (target === "minimum_invoice_amount" || target === "reminder_type") {
            value = e.target.value;
        }

        else {
            value = e.target.checked;
        }

        reminder_settings[target] = value;
        const data = { ...invoiceSetting }
        data['reminder_settings'] = reminder_settings;

        setInvoiceSetting(data);
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [inputDate, setInputDate] = useState("");


    const daySubmit = () => {
        if (inputDate !== "" && parseInt(inputDate) > 0) {
            const reminder_settings = { ...invoiceSetting.reminder_settings }
            const days = reminder_settings?.days

            let newDays = []
            if (days !== undefined) {
                newDays = [...days]
            }
            if (!newDays.includes(inputDate)) {
                newDays.push(inputDate)
            }
            reminder_settings["days"] = newDays;
            const data = { ...invoiceSetting }
            data['reminder_settings'] = reminder_settings;
            setInvoiceSetting(data);


            setInputDate("")
            setShow(false);
        }

    }


    const deleteDay = (value) => {
        const reminder_settings = { ...invoiceSetting.reminder_settings }
        const days = reminder_settings?.days

        let newDays = [...days]
        if (days !== undefined && newDays.includes(value)) {
            const index = newDays.indexOf(value);

            if (index !== -1) {
                newDays.splice(index, 1);
            }
        }

        reminder_settings["days"] = newDays;
        const data = { ...invoiceSetting }
        data['reminder_settings'] = reminder_settings;
        setInvoiceSetting(data);

    }

    const finalSubmit = () => {
        // console.log("data", invoiceSetting)
        // console.log("length", Object.keys(invoiceSetting?.reminder_settings).length)
        const newData = { ...invoiceSetting }
        newData["contact_id"] = contactId;
        newData['reminder_settings']["contact_id"] = contactId;
        dispatch(updateContactInvoiceSetting(newData))
    }



    return (
        <>

            <PageTitle
                breadCrumbItems={[
                    { label: 'Client', path: '/app/client', active: false },
                    { label: 'Client Details', path: '/app/client_details', active: true },
                ]}
                title={'Client Report'}
            />
            <Row>
                <Col md={4} xl={4}>
                    {!loading && success && (
                        <Alert variant="success" className="my-2" onClose={() => dispatch(setContactSuccessAlert(''))} dismissible>
                            {success}
                        </Alert>
                    )}
                    <Card>
                        <Card.Header>
                            <div className='d-flex justify-content-between'>

                            <span>Personal Details</span>
                                <div>
                                {user_role.includes('view_general_ledger') ?
                                        <Link data-bs-toggle="Client Statement" data-bs-placement="top" title="Client Statement" to={{ pathname: '/app/client_statement', state: contactId }} className="ms-1 btn btn-success" >
                                        <i className="mdi mdi-file"></i>
                                    </Link> : ""}

                                {user_role.includes('change_contact') ?
                                        <Link to="#" data-bs-toggle="Edit" data-bs-placement="top" title="Edit" className="ms-2 btn btn-primary" onClick={() => onOpenModal()}>
                                        <i className="mdi mdi-square-edit-outline"></i>
                                    </Link> : ""
                                }

                                {user_role.includes('delete_contact') ?
                                        <Link to="#" data-bs-toggle="Delete" data-bs-placement="top" title="Delete" className="ms-2 btn btn-danger" onClick={() => onDelete()}>
                                        <i className="mdi mdi-delete"></i>
                                    </Link> : ""
                                }
                                {
                                    showClientEditModal ?
                                        <ContactForm show={showClientEditModal} onHide={onCloseModal} onSubmit={onSubmit} contact={contact_details} countries={country} kamList={all_kam} />
                                        : null
                                }
                            </div>
                        </div>
                        </Card.Header>
                        <Card.Body>
                            
                            <div className="container">
                                <div className="row mb-4">
                                    <div className="col-sm">
                                        <h5>Name: </h5>
                                        <p>{contact_details?.name}</p>
                                    </div>
                                    <div className="col-sm">
                                        <h5 className='me-2'>Client ID:</h5>
                                        <p>{contact_details?.client_id}</p>
                                    </div>
                                    <div className="col-sm">
                                        <h5 className='me-2'>Client Type:</h5>
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
                                        <p>{contact_details?.country?.name}</p>
                                    </div>
                                    <div className="col-sm">
                                        <h5 className='me-2'>City:</h5>
                                        <p>{contact_details?.city?.name}</p>
                                    </div>
                                    <div className="col-sm">
                                        <h5 className='me-2'>Billing Address:</h5>
                                        <p>{contact_details?.billing_address}</p>
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="col-sm">
                                        <h5 className='me-2'>Kam:</h5>
                                        <p>{contact_details?.kam?.name}</p>
                                    </div>
                                    <div className="col-sm">
                                        <h5 className='me-2'>Bin:</h5>
                                        <p>{contact_details?.bin}</p>
                                    </div>
                                    <div className="col-sm">
                                        <h5 className='me-2'>Balance</h5>
                                        <p>{client_balance.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>

                        </Card.Body>
                    </Card>
                </Col>

                <Col md={8} xl={8}>
                    <Card>
                        <Card.Header>
                            <div className='d-flex justify-content-between'>
                                <p style={{ marginBottom: '0px !important' }}>Services List</p>

                                <Link className="btn btn-primary" to={{ pathname: '/app/service_form', state: { 'services': services, 'contactId': contactId } }}>
                                        <i className="mdi mdi-pencil me-1"></i> Edit
                                    </Link>

                               
                            </div>
                        </Card.Header>

                        <Card.Body>
                            {services.length > 0 ?
                                <>
                                    <Table
                                        columns={servicesColumns}
                                        data={services}
                                        pageSize={pageSize}
                                        isSortable={true}
                                        pagination={false}
                                        isSearchable={true}
                                        tableClass="table-nowrap table-hover"
                                        searchBoxClass=""
                                    />
                                    {/* <Pagination visitPage={visitPage} previous_number={previous_number} next_number={next_number} total_page={invoice_list_pagination_data.total_page} current_page={invoice_list_pagination_data.current_page} active={invoice_list_pagination_data.active} /> */}
                                </>
                                :
                                'No data available!'}
                        </Card.Body>
                    </Card>

                </Col>

            </Row>

            <Row>
                <Col md={4} xl={4}>
                    <Card>
                        <Card.Header>
                            <p>Invoice Setting</p>
                        </Card.Header>
                        <Card.Body>
                            {!loading && invoice_setting_error && !invoice_setting_success && (
                                <Alert variant="danger" className="my-2">
                                    {invoice_setting_error}
                                </Alert>
                            )}

                            {!loading && invoice_setting_success && !invoice_setting_error && (
                                <Alert variant="success" className="my-2">
                                    {invoice_setting_success}
                                </Alert>
                            )}
                            <InputGroup className="mb-3">
                                <InputGroup.Text style={mystyle}>
                                    Auto Approve</InputGroup.Text>
                                <InputGroup.Checkbox checked={invoiceSetting?.auto_approve} name="auto_approve" onChange={(e) => invoiceSettingChange(e)} />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Text style={mystyle}>
                                    Auto Invoice Send</InputGroup.Text>
                                <InputGroup.Checkbox checked={invoiceSetting?.auto_invoice_send} name="auto_invoice_send" onChange={(e) => invoiceSettingChange(e)} />
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
                                                Minimum Invoice Amount</InputGroup.Text>
                                            <Form.Control type="number" name="minimum_invoice_amount" value={invoiceSetting?.reminder_settings?.minimum_invoice_amount
                                            } onChange={(e) => invoiceReminderSettingChange(e)} />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text style={mystyle}>
                                                Reminder Type</InputGroup.Text>
                                            <Form.Check
                                                type="radio"
                                                name="reminder_type" checked={invoiceSetting?.reminder_settings?.reminder_type === "due_in"} onChange={(e) => invoiceReminderSettingChange(e)}
                                                label="Due In"
                                                value="due_in"
                                                style={{ "marginRight": "1rem", "marginLeft": "1rem", marginTop: "0.5rem" }}
                                            />
                                            <Form.Check
                                                type="radio"
                                                name="reminder_type" checked={invoiceSetting?.reminder_settings?.reminder_type === "over_due"} onChange={(e) => invoiceReminderSettingChange(e)}
                                                label="Over Due"
                                                value="over_due"
                                                style={{ "marginRight": "1rem", marginTop: "0.5rem" }}
                                            />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text style={{ width: '6rem' }}>
                                                Days</InputGroup.Text>
                                            {invoiceSetting?.reminder_settings?.days?.map(day => (

                                                <div key={day} style={{ "margin": "0 5px" }}>
                                                    <div>
                                                        <InputGroup.Text style={{ width: '6rem' }}>
                                                            {day} days <i onClick={() => deleteDay(day)} style={{ marginLeft: ".8rem", color: "red", cursor: "pointer" }} className="fe-delete"></i>
                                                        </InputGroup.Text>

                                                    </div>
                                                </div>

                                            ))}
                                            <>

                                                <Button variant="primary" onClick={handleShow}>
                                                    Add
                                                </Button>

                                                {/* <MyVerticallyCenteredModal
                                                    show={show}
                                                    onHide={handleClose}
                                                /> */}

                                                <Modal show={show}

                                                    size="sm"
                                                    aria-labelledby="contained-modal-title-vcenter"
                                                    centered
                                                >
                                                    <Modal.Header>
                                                        <Modal.Title id="contained-modal-title-vcenter">
                                                            Add Reminder Days
                                                        </Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <Form>
                                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                                <Form.Label>Reminder Type</Form.Label>
                                                                <Form.Select disabled aria-label="Default select example">
                                                                    <option selected={invoiceSetting?.reminder_settings?.reminder_type === "due_in"} value="due_in">Due In</option>
                                                                    <option selected={invoiceSetting?.reminder_settings?.reminder_type === "over_due"} value="over_due">Over Due</option>
                                                                </Form.Select>
                                                            </Form.Group>
                                                            <Form.Group
                                                                className="mb-3"
                                                                controlId="exampleForm.ControlTextarea1"
                                                            >
                                                                <Form.Label>Day</Form.Label>
                                                                <Form.Control onChange={(e) => { setInputDate(e.target.value) }} type="number" />
                                                            </Form.Group>
                                                        </Form>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={handleClose}>
                                                            Close
                                                        </Button>
                                                        <Button variant="primary" onClick={() => daySubmit()}>
                                                            Submit
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>

                                            </>
                                        </InputGroup>
                                    </div>
                                ) :
                                <></>
                            }

                            <Button variant="primary" onClick={() => finalSubmit()}>
                                Submit
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={8} xl={8}>

                    <Card>
                        <Card.Header>
                            <p style={{ marginBottom: '0px !important' }}>Invoice List</p>
                        </Card.Header>

                        <Card.Body>

                            {invoice_list.length > 0 ?
                                <>
                                    <Table
                                        columns={invoicesColumns}
                                        data={invoice_list}
                                        pageSize={pageSize}
                                        isSortable={true}
                                        pagination={false}
                                        isSearchable={true}
                                        tableClass="table-nowrap table-hover"
                                        searchBoxClass=""
                                    />
                                    <Pagination visitPage={visitPage} previous_number={previous_number} next_number={next_number} total_page={invoice_list_pagination_data.total_page} current_page={invoice_list_pagination_data.current_page} active={invoice_list_pagination_data.active} />
                                </>
                                :
                                'No data available!'}
                        </Card.Body>
                    </Card>

                </Col>
            </Row>


        </>
    );
});
export default ContactDetails;
