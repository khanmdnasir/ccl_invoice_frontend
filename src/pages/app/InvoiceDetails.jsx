import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { useLocation } from 'react-router-dom';
// components
import PageTitle from '../../components/PageTitle';
import { useSelector, useDispatch } from 'react-redux';
import { APICore } from '../../helpers/api/apiCore';
import { getInvoiceDetails } from '../../redux/actions';
import { isNumber } from '@amcharts/amcharts4/core';


const api = new APICore()




const InvoiceDetails = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [invoiceId, setInvoiceId] = useState({});
    const invoiceDetails = useSelector(state => state.Invoice.invoice_details);
    const loading = useSelector(state => state.Invoice.loading);

    useEffect(() => {
        const state = location.state
        
        setInvoiceId(parseInt(state));
        
        
    }, [])

    

    useEffect(() => {
        if(isNumber(invoiceId)){
            dispatch(getInvoiceDetails(invoiceId))
        }
        
    }, [invoiceId])
    
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
                            <Form>
                                <div className='mb-4'>
                                    <Row className='mb-3'>
                                        <Form.Group as={Col}>
                                            <Form.Label >Contact</Form.Label>
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
                                                                    value={item.unit_price}
                                                                >

                                                                </Form.Control>
                                                            </Form.Group>
                                                        </td>
                                                        <td>
                                                            <Form.Group>
                                                                <Form.Control
                                                                    readOnly={true}
                                                                    value={item.discount}
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
                                                                    value={item.tax_rate}
                                                                >

                                                                </Form.Control>
                                                            </Form.Group>
                                                        </td>

                                                        <td>
                                                            <Form.Group>
                                                                <Form.Control
                                                                    readOnly={true}
                                                                    value={item.total_amount}
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
                                            <p style={{ fontSize: '20px' }}>Subtotal (discount {invoiceDetails?.discount} )</p>
                                            <p style={{ fontSize: '20px', paddingLeft: '50px' }}>{invoiceDetails?.sub_total}</p>
                                        </div>

                                        <div className="d-flex justify-content-between">
                                            <p style={{ fontSize: '20px' }}>Total Tax</p>
                                            <p style={{ fontSize: '20px', paddingLeft: '50px' }}>{invoiceDetails?.total_tax}</p>
                                        </div>

                                        <hr></hr>
                                        <div className="d-flex justify-content-between">
                                            <p style={{ fontSize: '20px' }}>Total</p>
                                            <p style={{ fontSize: '20px', paddingLeft: '50px' }}>{invoiceDetails?.total_amount}</p>
                                        </div>
                                        <hr></hr><hr></hr>
                                    </div>
                                </div>

                            </Form>
                          }


                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};
export default InvoiceDetails;
