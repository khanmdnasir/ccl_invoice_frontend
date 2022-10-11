import React,{ useEffect, useState } from 'react';
import { Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import Table from 'react-bootstrap/Table';
import { useLocation } from 'react-router-dom';
// components
import PageTitle from '../../components/PageTitle';
import { useSelector,useDispatch } from 'react-redux';
import { APICore } from '../../helpers/api/apiCore';


const api = new APICore()




const InvoiceDetails = () => {
    const location = useLocation();
    const [invoiceId,setInvoiceId] = useState({});

    useEffect(()=>{ 
        const state = location.state
        setInvoiceId(state);
    },[])
    
   

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
                                {/* {!rloading && error && (
                                    <Alert variant="danger" className="my-2" onClose={() => setError(null)} dismissible>
                                        {error}
                                    </Alert>
                                )} */}
                                
                                
                                    
                                    
                                                           
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default InvoiceDetails;
