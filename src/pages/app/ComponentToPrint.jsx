import { Row, Col, Card } from 'react-bootstrap';
import logo from '../../assets/images/Qorum.svg'
// components
import { forwardRef } from 'react';
import { getCurrentDate } from '../../utils/getCurrentDate';

// invoice component
const ComponentToPrint = forwardRef(( props, ref) => {
    
    
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
                            

                            <div style={{display: 'flex',justifyContent: 'space-between'}}>
                                    
                                <p style={{fontSize: '14px'}}>
                                    <b>Total Invoice Amount:</b> <span className="">{props.data?.summary?.total_invoice_amount}</span>
                                </p>
                            
                            
                                <p style={{fontSize: '14px'}}>
                                    <b>Total Paid Amount:</b> <span className="">{props.data?.summary?.total_paid_amount}</span>
                                </p>
                                <p style={{fontSize: '14px'}}>
                                    <b>Total Due:</b> <span className="">{props.data?.summary?.total_due}</span>
                                </p>
                                <p style={{fontSize: '14px'}}>
                                    <b>Total Balance:</b> <span className="">{props.data?.summary?.total_balance}</span>
                                </p>
                                
                            </div>   
                            <hr style={{height:'1px',borderWidth:0,color:'gray',backgroundColor:'gray'}}/>
                            <Row>
                                <Col xs={12}>
                                    <div >
                                        <table className="table mt-2 "  >
                                            <thead>
                                                <tr>
                                                                                                        
                                                    <th style={{fontSize: '12px',padding: '1px'}}>Date</th>
                                                    <th style={{fontSize: '12px',padding: '1px'}}>Description</th>
                                                    <th style={{fontSize: '12px',padding: '1px'}}>Invoice Amount</th>
                                                    <th style={{fontSize: '12px',padding: '1px'}}>Payment Amount</th>
                                                    
                                                    
                                                </tr>
                                            </thead>
                                            <tbody >
                                                {(props.data?.statements || []).map((item, idx) => {
                                                    return (
                                                        <tr key={idx} >
                                                                                                       
                                                            <td style={{fontSize: '12px',padding: '1px'}}>{item.date}</td>
                                                            <td style={{fontSize: '12px',padding: '1px'}}>{item.invoice_no ? item.invoice_no : item.payment_no}</td>
                                                            <td style={{fontSize: '12px',padding: '1px'}}>{item.total_amount}</td>
                                                            <td style={{fontSize: '12px',padding: '1px'}}>{item.amount}</td>
                                                            
                                                            
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
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
