import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Form, Alert, Badge } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { useLocation } from 'react-router-dom';
// components
import PageTitle from '../../components/PageTitle';
import { useSelector, useDispatch } from 'react-redux';
import { APICore } from '../../helpers/api/apiCore';

import { isNumber } from '@amcharts/amcharts4/core';
import { withSwal } from 'react-sweetalert2';
import { getPaymentDetails, getPaymentDetailsSuccessMsg, setPaymentSuccessAlert } from '../../redux/actions';

const api = new APICore()




const PaymentDetails = withSwal(({swal}) => {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const [paymentId, setPaymentId] = useState({});
    const paymentDetails = useSelector(state => state.Payment.payment_details);
   
    // console.log("paymentDetails",paymentDetails?.status)
    const loading = useSelector(state => state.Payment.loading);
    const user_role = useSelector((state) => state.Role.user_role);
    const success = useSelector(state => state.Payment.success);
    
    // const scurrency = useSelector(state => state.Currency.selectedCurrency);
    const [show, setShow] = useState(false);
    const onCloseModal = () => setShow(false);

    let date = paymentDetails.payment_date?.split("T")[0];
    // console.log(date);


    useEffect(() => {
        const state = location.state
        
        setPaymentId(parseInt(state));
        
        
    }, [])

    

    useEffect(() => {
        if(isNumber(paymentId)){
            dispatch(getPaymentDetails(paymentId))
        }
        
    }, [paymentId])


    const onCancel = () => {
        swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#28bb4b',
            cancelButtonColor: '#f34e4e',
            confirmButtonText: 'Yes, cancel it!',
        })
            .then(function (result) {
                if (result.value) {
                    // dispatch(deleteContact(row.original.id))
                    api.update(`/api/payment/${paymentId}/`)
                        .then(res => {
                           
                           
                            if (res.data.success) {
                                // console.log("result",res.data.success)

                                swal.fire(
                                    'Canceled!',
                                    'Payment has been Canceled.',
                                    'success'
                                );
                                dispatch(getPaymentDetails(paymentId))
                            }
                             else  {
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
                        onCloseModal()
                }
                 else if (result.dismiss === 'cancel') {

                }
            })
       
    }


    
    // const sendEmail = () => {
    //     const data = {
    //         "client_id":paymentDetails?.client_id?.id,
    //         "payment_id":paymentId,
    //     }
    //     swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#28bb4b',
    //         cancelButtonColor: '#f34e4e',
    //         confirmButtonText: 'Yes, Send email!',
    //     })
    //         .then(function (result) {
    //             if (result.value) {
    //                 // dispatch(deleteContact(row.original.id))
    //                 api.create(`/api/send-email/`, data)
    //                     .then(res => {
                            
    //                         // dispatch(getInvoice(10, 1));
    //                         swal.fire(
    //                             'Sent!',
    //                             'Email has been Sent.',
    //                             'success'
    //                         );
    //                     })
    //                     .catch(err => {
    //                         swal.fire({
    //                             title: err,
    //                         }
    //                         );
    //                     })
    //             } else if (result.dismiss === 'cancel') {

    //             }
    //         })
    // }


    

    // useEffect(() => {
    //     if (success === '') {
    //         onCloseModal();
    //     }

    //     setTimeout(() => {
    //         dispatch(setPaymentSuccessAlert(''));
    //     }, 2000)
    // }, [success])
    
    return (
        <>

            <PageTitle
                breadCrumbItems={[
                    // { label: 'Invoice', path: '/app/invoice', active: false },
                    { label: 'Payment Details', path: '/app/payment_details', active: true },
                ]}
                title={'Payment Details ('+paymentDetails?.payment_no+')'}
            />
            <Row>
                <Col>
                    <Card>
                   
                        <Card.Body>
                            {/* {loading ? <p>Loading...</p> :
                            <> */}
                            {!loading && success && (
                                <Alert variant="success" className="my-2" onClose={() => dispatch(getPaymentDetailsSuccessMsg(''))} dismissible>
                                    {success}
                                </Alert>
                            )}
                            <Row className="mb-2">
                                <Col sm={4}>
                                    
                                </Col>

                                <Col sm={8}>
                                    <div className="text-sm-end mt-2 mt-sm-0">
                                       
                                        {user_role.includes('delete_paymentdetailsmodel') ?
                                        paymentDetails?.status === 'success' &&
                                            <Link to="#" className="btn btn-danger me-2" onClick={() => onCancel()}>
                                                <i className="mdi mdi-delete me-1"></i>Cancel
                                            </Link> :
                                            ''
                                        }

                                        {paymentDetails?.status === "canceled" && 
                                            <span className="badge bg-danger me-2 p-2" style={{"fontSize":"15px"}}>
                                                This payment has been canceled.
                                            </span> 
                                            
                                        }
                                    </div>
                                </Col>
                            </Row>
                            <hr/>
                            <Form>
                                <div className='mb-4'>
                                    <Row className='mb-3'>
                                        <Form.Group as={Col}>
                                            <Form.Label >Name</Form.Label>
                                            <Form.Control
                                                readOnly={true}
                                                defaultValue={paymentDetails?.client_id?.name}
                                            >

                                            </Form.Control>

                                        </Form.Group>
                                        {/* <Form.Group as={Col}>
                                            <Form.Label >Payment No</Form.Label>
                                            <Form.Control
                                                readOnly={true}
                                                defaultValue={paymentDetails?.payment_no}
                                            >

                                            </Form.Control>
                                        </Form.Group> */}

                                        <Form.Group as={Col}>
                                            <Form.Label >Payment Date</Form.Label>
                                            <Form.Control
                                                readOnly={true}
                                                defaultValue={date}
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                       
                                        <Form.Group as={Col}>
                                            <Form.Label >Reference</Form.Label>
                                            <Form.Control
                                                readOnly={true}
                                                defaultValue={paymentDetails?.reference}
                                            >

                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Label >Payment Type</Form.Label>
                                            <Form.Control
                                                readOnly={true}
                                                defaultValue={paymentDetails?.payment_type?.name}
                                            >

                                            </Form.Control>
                                        </Form.Group>



                                        <Form.Group as={Col}>
                                            <Form.Label>Payment Amount</Form.Label>
                                            <Form.Control
                                                readOnly={true}
                                                defaultValue={paymentDetails?.amount}
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                      
                                    </Row>



                                </div>
                                <h4>Invoices:</h4>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Invoice No</th>
                                            <th>Payment Nature</th>
                                            <th>Invoice Paid Amount</th>

                                            {/* <th>Total</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                            { paymentDetails?.items?.length > 0 && paymentDetails.items.map((item, index)=>{
                                                return (
                                                    <tr key={'tr'+ index}>
                                                        <td>
                                                            <Form.Group>
                                                                <Form.Control
                                                                    readOnly={true}
                                                                    value={item?.invoice?.invoice_no}
                                                                >

                                                                </Form.Control>
                                                            </Form.Group>
                                                        </td>
                                                        <td>
                                                            <Form.Group>
                                                                <Form.Control
                                                                    readOnly={true}
                                                                    value={(item.payment_nature).charAt(0).toUpperCase() + (item.payment_nature).slice(1)}
                                                                >

                                                                </Form.Control>
                                                            </Form.Group>
                                                        </td>
                                                        <td>
                                                            <Form.Group>
                                                                <Form.Control
                                                                    readOnly={true}
                                                                    value={item.amount}
                                                                >

                                                                </Form.Control>
                                                            </Form.Group>
                                                        </td>
                                                       
                                                    </tr>

                                                )
                                            })}
                                        

                                    </tbody>
                                </Table>

                            </Form>
                            {/* </>
                          } */}


                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
});
export default PaymentDetails;
