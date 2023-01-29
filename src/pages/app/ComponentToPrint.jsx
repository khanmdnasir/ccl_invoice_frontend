import React, { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import logo from '../../assets/images/Qorum.svg'
// components
import { forwardRef } from 'react';
import { getCurrentDate } from '../../utils/getCurrentDate';

// invoice component
const ComponentToPrint = forwardRef(( props, ref) => {
    
    
    return (
        <div ref={ref} className='container'>
            

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <div className="clearfix">
                                <div className="mt-2">
                                    <div className="auth-logo">
                                        <div className="logo logo-dark">
                                            <span className="logo-lg">
                                                <img src={logo} alt="" height="50" />
                                            </span>
                                        </div>
                                        <div className="logo logo-light">
                                            <span className="logo-lg">
                                                <img src={logo} alt="" height="50" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>

                            <Row>
                                <Col md={6}>
                                    <div className="mt-3">
                                        <p>
                                            <b>Statement of, {props.data?.client?.name}</b>
                                        </p>
                                        
                                    </div>
                                </Col>

                                <Col md={{ span: 4, offset: 2 }}>
                                    <div className="mt-3 float-end">
                                        <p>
                                            <strong>Date : </strong>{' '}
                                            <span className="float-end"> &nbsp;&nbsp;&nbsp; {getCurrentDate()} </span>
                                        </p>
                                        
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
                                                    
                                                    <th >Date</th>
                                                    <th >Description</th>
                                                    <th >Invoice Amount</th>
                                                    <th >Payment Amount</th>
                                                    <th >Status</th>
                                                    
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(props.data?.statements || []).map((item, idx) => {
                                                    return (
                                                        <tr key={idx}>
                                                            <td>{idx + 1}</td>                                            
                                                            <td>{item.date}</td>
                                                            <td>{item.invoice_no ? item.invoice_no : item.payment_no}</td>
                                                            <td>{item.total_amount}</td>
                                                            <td>{item.amount}</td>
                                                            <td>{item.status}</td>
                                                            
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
                                            <b>Total Invoice Amount:</b> <span className="float-end">{props.data?.summary?.total_invoice_amount}</span>
                                        </p>
                                        <p>
                                            <b>Total Paid Amount:</b> <span className="float-end">{props.data?.summary?.total_paid_amount}</span>
                                        </p>
                                        <p>
                                            <b>Total Due:</b> <span className="float-end">{props.data?.summary?.total_due}</span>
                                        </p>
                                        
                                        <h3>{props.data?.summary?.total_balance} USD</h3>
                                    </div>
                                    <div className="clearfix"></div>
                                </Col>
                            </Row>

                            
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
});

export default ComponentToPrint;
