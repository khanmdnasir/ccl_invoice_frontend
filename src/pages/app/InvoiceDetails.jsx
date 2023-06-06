import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { useLocation } from 'react-router-dom';
// components
import PageTitle from '../../components/PageTitle';
import { useSelector, useDispatch } from 'react-redux';
import { APICore } from '../../helpers/api/apiCore';
import { getInvoiceDetails, addInvoicePayment, clearSubmitSuccessMessage, getCompanySettingsByKey, getClientBalance } from '../../redux/actions';
import { isNumber } from '@amcharts/amcharts4/core';
import { withSwal } from 'react-sweetalert2';
import PaymentModal from '../Form/PaymentModal'
const api = new APICore()




const InvoiceDetails = withSwal(({swal}) => {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const [invoiceId, setInvoiceId] = useState('');
    const invoiceDetails = useSelector(state => state.Invoice.invoice_details);
    const client_balance = useSelector(state => state.Payment.client_balance);
    const loading = useSelector(state => state.Invoice.loading);
    const user_role = useSelector((state) => state.Role.user_role);
    const scurrency = useSelector(state => state.Currency.selectedCurrency);
    const [invoiceStatus, setInvoiceStatus] = useState('')
    
    const invoice_payment_success = useSelector(state => state.Payment.invoice_payment_success);
    const company_setting_by_key = useSelector(state => state.CompanySettings.company_setting_by_key);
    const [show, setShow] = useState(false);
    const onCloseModal = () => setShow(false);
    const onOpenModal = () => setShow(true);

    useEffect(() => {
        const state = location.state
        if(state){
            setInvoiceId(parseInt(state));
            localStorage.setItem('invoice_id',parseInt(state));
        }else{
            let invoice_id = localStorage.getItem('invoice_id');
            setInvoiceId(parseInt(invoice_id));
        }
        dispatch(getCompanySettingsByKey({
            "key": "payment_invoice_map"
        }))
    }, [])

    useEffect(() => {
        if (invoice_payment_success !== '') {
            onCloseModal();
        }
        if (invoice_payment_success !== '' && invoice_payment_success !== null && invoice_payment_success!== undefined) {
            onCloseModal();
            dispatch(getInvoiceDetails(invoiceId))
            setTimeout(() => {
                dispatch(clearSubmitSuccessMessage());
            }, 2000)
        }

    }, [invoice_payment_success])

    const paymentSubmit = (data, setPaymentData) => {
        data['id'] = invoiceId;
        data['amount'] = data['amount'] !== '' ? parseFloat(data['amount']) : 0;
        data['adjustment_amount'] = data['adjustment_amount'] !== '' ? parseFloat(data['adjustment_amount']) : 0;
        data['invoice_status'] = (data['amount'] + data['adjustment_amount']) < parseFloat(invoiceDetails?.payable) ? "partial_paid" : "paid" ;
        dispatch(addInvoicePayment(data))
        setPaymentData({
            "amount": "",
            "adjustment_amount": ""})
    }

    useEffect(() => {
        setInvoiceStatus(invoiceDetails?.status)
    }, [invoiceDetails?.status])


    useEffect(() => {
        if (invoiceDetails?.contact_id?.id !== undefined && invoiceDetails?.contact_id?.id !== null){
            dispatch(getClientBalance(invoiceDetails?.contact_id?.id))
        }
    }, [invoiceDetails?.contact_id])


    useEffect(() => {
        if(isNumber(invoiceId)){
            dispatch(getInvoiceDetails(invoiceId))
        }
        
    }, [invoiceId])

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
                    // dispatch(deleteContact(row.original.id))
                    api.delete(`/api/invoice/${invoiceId}/`)
                        .then(res => {
                            history.push('/app/invoice');
                            swal.fire(
                                'Deleted!',
                                'Invoice has been deleted.',
                                'success'
                            );
                        })
                        .catch(err => {
                            swal.fire({
                                title: err,
                            }
                            );
                        })
                } else if (result.dismiss === 'cancel') {

                }
            })
    }

    const sendEmail = () => {
        const data = {
            "contact_id":invoiceDetails?.contact_id?.id,
            "invoice_id":invoiceId,
        }
        swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#28bb4b',
            cancelButtonColor: '#f34e4e',
            confirmButtonText: 'Yes, Send email!',
        })
            .then(function (result) {
                if (result.value) {
                    // dispatch(deleteContact(row.original.id))
                    api.create(`/api/send-email/`, data)
                        .then(res => {
                            if (res?.data?.success){
                                swal.fire(
                                    'Sent!',
                                    'Email has been Sent.',
                                    'success'
                                );
                            }
                            else{
                                swal.fire(
                                    'Sent!',
                                    `${res?.data?.error}`,
                                    'error'
                                );

                            }                         
                            // dispatch(getInvoice(10, 1));
                        })
                        .catch(err => {
                            swal.fire({
                                title: err,
                            }
                            );
                        })
                } else if (result.dismiss === 'cancel') {

                }
            })
    }

    const draftsOptions =
        <>
            <option disabled selected={invoiceDetails?.status === 'draft'} value='draft'>Draft</option>
            <option selected={invoiceDetails?.status === 'waiting'} value='waiting'>Waiting</option>
            <option selected={invoiceDetails?.status === 'approve'} value='approve'>Approved</option>
        </>

    const waitingsOptions =
        <>
            <option disabled selected={invoiceDetails?.status === 'waiting'} value='waiting'>Waiting</option>
            <option selected={invoiceDetails?.status === 'approve'} value='approve'>Approved</option>
        </>

    const approvesOptions =
        <>
            <option disabled selected={invoiceDetails?.status === 'approve'} value='approve'>Approved</option>
            <option selected={invoiceDetails?.status === 'partial_paid'} value='partial_paid'>Partial Paid</option>
            <option selected={invoiceDetails?.status === 'paid'} value='paid'>Paid</option>
        </>

    const partialPaidsOptions =
        <>
            <option disabled selected={invoiceDetails?.status === 'partial_paid'} value='partial_paid'>Partial Paid</option>
            <option selected={invoiceDetails?.status === 'paid'} value='paid'>Paid</option>
        </>

    const paidsOptions =
        <>
            <option disabled selected={invoiceDetails?.status === 'paid'} value='paid'>Paid</option>
        </>

    const handleStatusChange = (e) => {

        const value = e.target.value;
        const data = {
            "status": value
        }
        swal.fire({
            title: `Are you sure to change status from ${invoiceDetails?.status} to ${value}?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#28bb4b',
            cancelButtonColor: '#f34e4e',
            confirmButtonText: 'Yes, change it!',
        })
            .then(function (result) {

                if (result.value) {
                    api.update(`/api/change-invoice-status/?id=${invoiceId}`, data)
                        .then(res => {
                            if (res?.data?.success) {
                                swal.fire(
                                    'Updated!',
                                    'Invoice Status has been Updated.',
                                    'success'
                                );
                                if (isNumber(invoiceId)) {
                                    dispatch(getInvoiceDetails(invoiceId))
                                }
                            }
                            else {
                                swal.fire(
                                    'Updated!',
                                    `${res?.data?.error}`,
                                    'warning'
                                );
                            }
                        })
                        .catch(err => {
                            console.log('err', err)
                            swal.fire({
                                title: err,
                            }
                            );
                        })
                } else if (result.dismiss === 'cancel') {

                }
            })
            .catch(err => {
                console.log('swal fire err', err)
            })
    };
    
    return (
        <>

            <PageTitle
                breadCrumbItems={[
                    { label: 'Invoice', path: '/app/invoice', active: false },
                    { label: 'Invoice Details', path: '/app/invoice_details', active: true },
                ]}
                title={'Invoice Details'}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            {loading ? <p>Loading...</p> :
                            <>
                            <Row className="mb-3">
                                <Col sm={4}>
                                    {/* <span>{invoiceDetails?.status}</span> */}
                                            {((invoiceDetails?.status === "draft" || invoiceDetails?.status === "waiting") || (company_setting_by_key?.value_text !== "1")) && invoiceDetails?.status !== "paid" ? 
                                <>
                                    <Form.Label>Status Change to</Form.Label>
                                    <Form.Select value={invoiceStatus} onChange={(e) => handleStatusChange(e)}>
                                        {invoiceDetails?.status === "draft" ? (draftsOptions) : null}
                                        {invoiceDetails?.status === "waiting" ? (waitingsOptions) : null}
                                        {invoiceDetails?.status === "approve" ? (approvesOptions) : null}
                                        {invoiceDetails?.status === "partial_paid" ? (partialPaidsOptions) : null}
                                        {invoiceDetails?.status === "paid" ? (paidsOptions) : null}
                                    </Form.Select>
                                </>
                                 : null}
                                </Col>

                                <Col sm={8}>
                                    <Form.Label></Form.Label>
                                    <div className="text-sm-end mt-2 mt-sm-0">
                                        {user_role.includes('change_invoice') ?
                                            (invoiceDetails?.status === 'draft' || invoiceDetails?.status === 'waiting') &&
                                            <Link to={{ pathname: '/app/invoice_form', state: { invoiceId : invoiceId } }} className="btn btn-success me-2" >
                                                <i className="mdi mdi-square-edit-outline me-1"></i>Edit
                                            </Link> :
                                            ''
                                        }

                                        {user_role.includes('delete_invoice') ?
                                            (invoiceDetails?.status === 'draft' || invoiceDetails?.status === 'waiting') &&
                                            <Link to="#" className="btn btn-danger me-2" onClick={() => onDelete()}>
                                                <i className="mdi mdi-delete me-1"></i>Delete
                                            </Link> :
                                            ''
                                        }

                                                { !loading && (invoiceDetails?.status === "approve" || invoiceDetails?.status === "partial_paid") && (company_setting_by_key?.value_text === "1") &&
                                            <Link to="#" className="btn btn-success me-2" onClick={() => onOpenModal()}>
                                                <i className="mdi mdi-cash me-1"></i>Payment
                                            </Link> 
                                            
                                        }

                                        {invoiceDetails?.status === "approve" &&  user_role.includes('can_send_mail') &&
                                            <Link to="#" className="btn btn-info me-2" onClick={() => sendEmail()}>
                                                <i className="mdi mdi-email me-1"></i>Mail
                                            </Link> 
                                            
                                        }

                                    </div>
                                </Col>
                            </Row>
                            <Form>
                                <div className='mb-4'>
                                        {!loading && invoice_payment_success && (
                                                <Alert variant="success" className="my-2" onClose={() => dispatch(clearSubmitSuccessMessage())} dismissible>
                                        {invoice_payment_success}
                                        </Alert>
                                    )}
                                    <Row className='mb-3'>
                                        <Form.Group as={Col}>
                                            <Form.Label >Client</Form.Label>
                                            <Form.Control
                                                readOnly={true}
                                                defaultValue={invoiceDetails?.contact_id?.name}
                                            >

                                            </Form.Control>

                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label >Invoice No</Form.Label>
                                            <Form.Control
                                                readOnly={true}
                                                defaultValue={invoiceDetails?.invoice_no}
                                            >

                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label >Date</Form.Label>
                                            <Form.Control
                                                readOnly={true}
                                                defaultValue={invoiceDetails?.date}
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label >Due Date</Form.Label>
                                            <Form.Control
                                                readOnly={true}
                                                defaultValue={invoiceDetails?.due_date}
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label >Reference</Form.Label>
                                            <Form.Control
                                                readOnly={true}
                                                defaultValue={invoiceDetails?.reference}
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label >Tax Type</Form.Label>

                                            <Form.Control
                                                readOnly={true}
                                                defaultValue={invoiceDetails?.tax_type}
                                            >
                                            </Form.Control>


                                        </Form.Group>
                                    </Row>



                                </div>
                                <Form.Label>Items:</Form.Label>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th>Description</th>
                                            <th>Quantity</th>
                                            <th>Unit Price</th>
                                            <th>Discount %</th>
                                            <th>Account</th>
                                            <th>Tax Rate %</th>

                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                            { invoiceDetails?.items?.length > 0 && invoiceDetails.items.map((item, index)=>{
                                                return (
                                                    <tr key={'tr'+ index}>
                                                        <td>
                                                            <Form.Group>
                                                                <Form.Control
                                                                    readOnly={true}
                                                                    value={item.item}
                                                                >

                                                                </Form.Control>
                                                            </Form.Group>
                                                        </td>
                                                        <td>
                                                            <Form.Group>
                                                                <Form.Control
                                                                    readOnly={true}
                                                                    value={item.description}
                                                                >

                                                                </Form.Control>
                                                            </Form.Group>
                                                        </td>
                                                        <td>
                                                            <Form.Group>
                                                                <Form.Control
                                                                    readOnly={true}
                                                                    value={item.qty}
                                                                >

                                                                </Form.Control>
                                                            </Form.Group>
                                                        </td>
                                                        <td>
                                                            <Form.Group>
                                                                <Form.Control
                                                                    readOnly={true}
                                                                    value={item?.unit_price.toLocaleString()}
                                                                >

                                                                </Form.Control>
                                                            </Form.Group>
                                                        </td>
                                                        <td>
                                                            <Form.Group>
                                                                <Form.Control
                                                                    readOnly={true}
                                                                    value={item?.discount}
                                                                >

                                                                </Form.Control>
                                                            </Form.Group>
                                                        </td>
                                                        <td>
                                                            <Form.Group as={Col}>

                                                                <Form.Control
                                                                    readOnly={true}
                                                                    value={item.account_id.account_name}
                                                                >

                                                                </Form.Control>

                                                            </Form.Group>
                                                        </td>
                                                        <td>
                                                            <Form.Group>
                                                                <Form.Control
                                                                    readOnly={true}
                                                                    value={item?.tax_rate}
                                                                >

                                                                </Form.Control>
                                                            </Form.Group>
                                                        </td>

                                                        <td>
                                                            <Form.Group>
                                                                <Form.Control
                                                                    readOnly={true}
                                                                    value={item?.total_amount.toLocaleString()}
                                                                >

                                                                </Form.Control>
                                                            </Form.Group>
                                                        </td>
                                                    </tr>

                                                )
                                            })}
                                        

                                    </tbody>
                                </Table>
                                <div className="d-flex justify-content-between">
                                    <div></div>
                                    <div >
                                        <div className="d-flex justify-content-between">
                                            <p style={{ fontSize: '20px' }}>Subtotal (discount {scurrency?.symbol} {invoiceDetails?.discount?.toLocaleString()} )</p>
                                            <p style={{ fontSize: '20px', paddingLeft: '50px' }}>{scurrency?.symbol} {invoiceDetails?.sub_total?.toLocaleString()}</p>
                                        </div>

                                        <div className="d-flex justify-content-between">
                                            <p style={{ fontSize: '20px' }}>Total Tax</p>
                                            <p style={{ fontSize: '20px', paddingLeft: '50px' }}>{scurrency?.symbol} {invoiceDetails?.total_tax?.toLocaleString()}</p>
                                        </div>

                                        <hr></hr>
                                        <div className="d-flex justify-content-between">
                                            <p style={{ fontSize: '20px' }}>Total</p>
                                            <p style={{ fontSize: '20px', paddingLeft: '50px' }}>{scurrency?.symbol} {invoiceDetails?.total_amount?.toLocaleString()}</p>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <p style={{ fontSize: '20px' }}>Paid</p>
                                            <p style={{ fontSize: '20px', paddingLeft: '50px' }}>{scurrency?.symbol} {invoiceDetails?.partial_paid_and_due?.partial_paid !== null ? invoiceDetails?.partial_paid_and_due?.partial_paid.toLocaleString() : 0}</p>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <p style={{ fontSize: '20px' }}>Due</p>
                                            <p style={{ fontSize: '20px', paddingLeft: '50px' }}>{scurrency?.symbol} {invoiceDetails?.partial_paid_and_due?.due?.toLocaleString()}</p>
                                        </div>
                                        <hr></hr><hr></hr>
                                    </div>
                                </div>

                            </Form>
                            </>
                          }


                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {invoiceDetails?
                <PaymentModal show={show} onHide={onCloseModal} paymentSubmit={paymentSubmit} maxAmount={parseFloat(parseFloat(invoiceDetails?.payable).toFixed(2))} client_balance={client_balance.balance} scurrency={scurrency} />:null
            }
        </>
    );
});
export default InvoiceDetails;
