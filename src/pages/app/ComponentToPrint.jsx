import { Row, Col, Card, Table } from 'react-bootstrap';
import logo from '../../assets/images/Qorum.svg'

// components
import { forwardRef } from 'react';
import { getCurrentDate } from '../../utils/getCurrentDate';

// invoice component
const ComponentToPrint = forwardRef(( props, ref) => {
    
    const tdStyle =  { fontSize: '12px', padding: '5px' }
    const tdStyleBold = {
        fontSize: '12px', padding: '5px', color: '#6c757d', fontWeight:"bold" }

    
    return (
        <div ref={ref} className='container'>
            

            <Row className='container'>
                <Col>
                    <Card>
                        <Card.Body>                            
                                
                            <Row className='mt-2'>
                                <Col>
                                    <div className="auth-logo">
                                        <div className="logo logo-dark">
                                            <span className="logo-lg">
                                                <img src={logo} alt="" height="70" />
                                            </span>
                                        </div>
                                        <div className="logo logo-light">
                                            <span className="logo-lg">
                                                <img src={logo} alt="" height="70" />
                                            </span>
                                        </div>
                                    </div>
                                </Col>
                                <Col>
                                    
                                        <h5 className='text-end'>Ledger Statement of, {props.data?.client?.name?.split(' ')[0]}</h5>
                                    
                                    <p className='text-end ' style={{fontSize: '10px'}} >
                                        Level 4, Khansons Center<br/>
                                        37 Kawran Bazar Rd, Dhaka 1215                                        
                                    </p>
                                </Col>
                                <hr style={{height:'2px',borderWidth:0,color:'gray',backgroundColor:'gray'}} />
                                
                            </Row>                                  
                                                        
                            <p style={{fontSize: '12px'}} className='text-end'>
                                <b>Date: </b>{getCurrentDate()}
                            </p>
                            

                            <Row>
                                <Col xs={12}>
                                    <Table bordered>
                                        <tbody>
                                            <tr>
                                                <td style={tdStyleBold}> Client Id:</td>
                                                <td style={tdStyle}> {props.data?.client?.client_id}</td>
                                                <td style={tdStyleBold}> Contact Type:</td>
                                                <td style={tdStyle}> {props.data?.client?.contact_type}</td>
                                            </tr>
                                            <tr>
                                                <td style={tdStyleBold}> Name:</td>
                                                <td style={tdStyle}> {props.data?.client?.name}</td>
                                                <td style={tdStyleBold}> Phone:</td>
                                                <td style={tdStyle}> {props.data?.client?.phone}</td>
                                            </tr>
                                            <tr>
                                                <td style={tdStyleBold}> Email:</td>
                                                <td style={tdStyle}> {props.data?.client?.email}</td>
                                                <td style={tdStyleBold}> Address:</td>
                                                <td style={tdStyle}> {props.data?.client?.billing_address}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
{/* 
                                        
                            <Row>
                                <Col >
                                    
                                        <p style={{fontSize: '12px',marginTop: 0,marginBottom: '1px'}}>
                                            <b style={{marginRight: '40px'}}>Client Id </b>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.data?.client?.client_id}
                                        </p>
                                        <p style={{fontSize: '12px',marginTop: 0,marginBottom: '1px'}}>
                                            <b style={{marginRight: '54px'}}>Name </b>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.data?.client?.name}
                                        </p>
                                        <p style={{fontSize: '12px',marginTop: 0,marginBottom: '1px'}}>
                                            <b style={{marginRight: '55px'}}>Email </b>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.data?.client?.email}
                                        </p>
                                        
                                        
                                    
                                </Col>

                                <Col >
                                        
                                        <p style={{fontSize: '12px',marginTop: 0,marginBottom: '1px'}}>
                                            <b style={{marginRight: '40px'}}>Contact Type </b>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.data?.client?.contact_type}
                                        </p>
                                        <p style={{fontSize: '12px',marginTop: 0,marginBottom: '1px'}}>
                                            <b style={{marginRight: '77px'}}>Phone </b>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.data?.client?.phone}
                                        </p>
                                        <address style={{fontSize: '12px'}}>
                                            {props.data?.client?.billing_address}
                                            
                                        </address>
                                        
                                </Col>
                            </Row>
                             */}
  
                            {/* <hr style={{height:'1px',borderWidth:0,color:'gray',backgroundColor:'gray'}}/> */}
                            <Row>
                                <Col xs={12}>
                                    <div >
                                        <Table bordered >
                                            <thead>
                                                <tr>
                                                                                                        
                                                    <th style={{fontSize: '12px',padding: '5px'}}>Date</th>
                                                    <th style={{fontSize: '12px',padding: '5px'}}>Description</th>
                                                    <th style={{fontSize: '12px',padding: '5px'}}>Payment Type</th>
                                                    <th style={{fontSize: '12px',padding: '5px'}}>Invoice Amount</th>
                                                    <th style={{fontSize: '12px',padding: '5px'}}>Payment Amount</th>
                                                    
                                                    
                                                </tr>
                                            </thead>
                                            <tbody >
                                                {(props.data?.statements || []).map((item, idx) => {
                                                    return (
                                                        <tr key={idx} >
                                                                                                       
                                                            <td style={{fontSize: '12px',padding: '5px'}}>{item.date}</td>
                                                            <td style={{fontSize: '12px',padding: '5px'}}>{item.invoice_no ? item.invoice_no : item.payment_no}</td>
                                                            <td style={{fontSize: '12px',padding: '5px'}}>{item.payment_type}</td>
                                                            <td style={{fontSize: '12px',padding: '5px'}}>{item.total_amount}</td>
                                                            <td style={{fontSize: '12px',padding: '5px'}}>{item.amount}</td>
                                                            
                                                            
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </Table>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={{span:"4", offset:"8"}}>
                                    <Table bordered>
                                        <tbody>
                                            <tr>
                                                <td style={tdStyleBold}> Total Invoice Amount:</td>
                                                <td style={tdStyle}> {props.data?.summary?.total_invoice_amount}</td>
                                            </tr>
                                            <tr>
                                                <td style={tdStyleBold}> Total Paid Amount:</td>
                                                <td style={tdStyle}> {props.data?.summary?.total_paid_amount}</td>
                                            </tr>
                                            <tr>
                                                <td style={tdStyleBold}> Total Due:</td>
                                                <td style={tdStyle}> {props.data?.summary?.total_due}</td>
                                            </tr>
                                            <tr>
                                                <td style={tdStyleBold}> Total Balance:</td>
                                                <td style={tdStyle}> {props.data?.summary?.total_balance}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
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
