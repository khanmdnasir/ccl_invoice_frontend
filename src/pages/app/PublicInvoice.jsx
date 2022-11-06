import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { APICore } from '../../helpers/api/apiCore';

// components
import PageTitle from '../../components/PageTitle';

const api = new APICore();


// invoice component
const PublicInvoice = () => {
    const [customer] = useState('Stanley Jones');
    const [notes] = useState(
        'Thanks a lot because you keep purchasing our products. Our company promises to provide high quality products for you as well as outstanding customer service for every transaction.'
    );
    const [order_date] = useState('Jan 17, 2016');
    const [order_status] = useState('Unpaid');
    const [order_no] = useState('000028');
    const [billing_address] = useState({
        line_1: 'Stanley Jones',
        line_2: '795 Folsom Ave, Suite 600',
        city: 'San Francisco',
        state: 'CA',
        zip: 94107,
        phone: '(123) 456-7890',
    });
    const [shipping_address] = useState({
        line_1: 'Stanley Jones',
        line_2: '795 Folsom Ave, Suite 600',
        city: 'San Francisco',
        state: 'CA',
        zip: 94107,
        phone: '(123) 456-7890',
    });
    const [items] = useState([
        {
            id: 1,
            name: 'Web Design',
            description: '2 Pages static website - my website',
            hour: 22,
            hourRate: '$30',
            total: '$660.00',
        },
        {
            id: 2,
            name: 'Software Development',
            description: "Invoice editor software - AB'c Software",
            hour: 122.5,
            hourRate: '$35',
            total: '$3937.50',
        },
    ]);
    const [sub_total] = useState('$4597.50');
    const [vat] = useState('$459.75');
    const [total] = useState('$4137.75');
        
    const [invoice_details,setInvoiceDetails] = useState({});
    const urlParams = new URLSearchParams(window.location.search);
    let unique_id = urlParams.get('unique_id');
    
    useEffect(()=>{
        api.get(`/api/public-invoice?unique_id=${unique_id}`)
        .then(res => {
            console.log(res)
            if(res.data.success){
                setInvoiceDetails(res.data.result)
            }
        })
        .catch(err => {
            console.log(err)
        })
    },[])
    return (
        <React.Fragment>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Public Invoice', path: '/public_invoice', active: true },
                ]}
                title={'Public Invoice'}
            />

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            

                            <Row>
                                <Col>
                                <div className="mt-3">
                                        <p>
                                            <strong>Contact : </strong>{' '}
                                            <span > &nbsp;&nbsp;&nbsp; {invoice_details?.contact_id?.name} </span>
                                        </p>
                                        <p>
                                            <strong>Invoice No : </strong>{' '}
                                            <span >
                                                {' '}
                                                <span >{invoice_details?.invoice_no}</span>
                                            </span>
                                        </p>
                                        <p>
                                            <strong>Date : </strong>
                                            <span >
                                                {' '}
                                                <span >{invoice_details?.date}</span>
                                            </span>
                                        </p>
                                        <p>
                                            <strong>Due Date : </strong>
                                            <span >
                                                {' '}
                                                <span >{invoice_details?.due_date}</span>
                                            </span>
                                        </p>
                                        <p>
                                            <strong>Reference : </strong>
                                            <span >
                                                {' '}
                                                <span >{invoice_details?.reference}</span>
                                            </span>
                                        </p>
                                        <p>
                                            <strong>Tax Type : </strong>
                                            <span >
                                                {' '}
                                                <span >{invoice_details?.tax_type}</span>
                                            </span>
                                        </p>
                                    </div>
                                    {/* <div className="mt-3">
                                        <p>
                                            <b>Hello, {customer}</b>
                                        </p>
                                        <p className="text-muted">{notes}</p>
                                    </div> */}
                                </Col>

                                <Col>
                                <div className="mt-3">
                                <div className="text-end d-print-none">
                                    <button
                                        className="btn btn-primary waves-effect waves-light me-1"
                                        onClick={(e) => {
                                            window.print();
                                        }}
                                    >
                                        <i className="mdi mdi-printer me-1"></i> Print
                                    </button>
                                    
                                </div>
                            </div>
                                </Col>
                            </Row>


                            <Row>
                                <Col xs={12}>
                                    <div className="table-responsive">
                                        <table className="table mt-4 table-centered">
                                        <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Item</th>
                                                    <th >Quantity</th>
                                                    <th >Unit Price</th>
                                                    <th >Discount</th>
                                                    <th >Account</th>
                                                    <th >Tax Rate</th>
                                                    <th className="text-end">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(invoice_details.items || []).map((item, idx) => {
                                                    return (
                                                        <tr key={idx}>
                                                            <td>{idx + 1}</td>
                                                            <td>
                                                                <b>{item.item}</b> <br />
                                                                {item.description}
                                                            </td>
                                                            <td>{item.qty}</td>
                                                            <td>{item.unit_price}</td>
                                                            <td>{item.discount}</td>
                                                            <td>{item.account_id.account_name}</td>
                                                            <td>{item.tax_rate}</td>
                                                            <td className="text-end">{item.total_amount}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={6}>
                                    
                                </Col>
                                <Col sm={6}>
                                    <div className="float-end">
                                        <p>
                                            <b>Sub-total:</b> <span className="float-end">{invoice_details.sub_total}</span>
                                        </p>
                                        <p>
                                            <b>Total Tax:</b>{' '}
                                            <span className="float-end"> &nbsp;&nbsp;&nbsp; {invoice_details.total_tax}</span>
                                        </p>
                                        <h3>{invoice_details.total_amount}</h3>
                                    </div>
                                    <div className="clearfix"></div>
                                </Col>
                            </Row>

                            
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default PublicInvoice;
