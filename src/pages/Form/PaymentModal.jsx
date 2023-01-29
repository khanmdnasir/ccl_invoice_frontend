import React, { useEffect, useState } from 'react';
import { Modal, Button,Form,Row,Col,Alert} from 'react-bootstrap';
// components
import { FormInput } from '../../components';
import { useSelector } from 'react-redux';

const PaymentModal = ({ show, onHide, paymentSubmit, maxAmount }) => {

    const error = useSelector((state) => state.Contact.error);
    const loading = useSelector((state) => state.Contact.loading);
    const [paymentData, setPaymentData] = useState({
        "amount": "",
        "adjustment_amount": ""
    }) 

    useEffect(()=>{
        const newData = {...paymentData}
        newData['amount'] = maxAmount;
        setPaymentData(newData)
    }, [maxAmount])
    
    const handleChange = (e)=>{
        const newData = {...paymentData}
        const target = e.target.name;
        const value = e.target.value;

        const amount = (newData?.amount !== '' && newData?.amount !== undefined && newData?.amount !== null) ? parseFloat(newData?.amount) : 0;

        const adjustment_amount = (newData?.adjustment_amount !== '' && newData?.adjustment_amount !== undefined && newData?.adjustment_amount !== null) ? parseFloat(newData?.adjustment_amount) : 0;

        if (value===''){
            newData[target] = '';
            setPaymentData(newData);
        }
        else{
            if (parseFloat(value)<0){
                newData[target] = '';
            }
            else {
                if (target === "amount" && (parseFloat(maxAmount) >= (parseFloat(value) + adjustment_amount))){
                    newData[target] = value;
                    setPaymentData(newData);
                }
                
                else if (target === "adjustment_amount" && (parseFloat(maxAmount) >= (parseFloat(value) + amount))){
                    newData[target] = value;
                    setPaymentData(newData);
                }
            }
        }
        

    }

    return (
        <>
            <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header className="bg-light" onHide={onHide} closeButton>
                    <Modal.Title className="m-0">Invoice Payment</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                {!loading  && error && (
                    <Alert variant="danger" className="my-2" onClose={()=>console.log("hello")} dismissible>
                        {error}
                    </Alert>
                )}
                    <Form>
                        <Row>
                            <Col>
                                <FormInput
                                    label="Amount"
                                    type="number"
                                    name="amount"
                                    max={maxAmount}
                                    min={0}
                                    labelClassName='required'
                                    containerClass={'mb-3'}
                                    value={paymentData?.amount}
                                    onChange={(e)=>handleChange(e)}
                                />
                            </Col>
                            <Col>
                                <FormInput
                                    label="Adjustment Amount"
                                    type="number"
                                    name="adjustment_amount"
                                    containerClass={'mb-3'}
                                    max={maxAmount}
                                    min={0}
                                    readOnly={paymentData?.amount >= maxAmount}
                                    value={paymentData?.adjustment_amount}
                                    onChange={(e)=>handleChange(e)}
                                />
                                
                            </Col>
                            
                        </Row>
                        
                         
                        <div className="text-end">
                            <Button onClick={()=>paymentSubmit(paymentData)} variant="success" className="waves-effect waves-light me-1">
                                Save
                            </Button>
                            <Button
                                variant="danger"
                                type="button"
                                className="waves-effect waves-light"
                                onClick={onHide}
                            >
                                Cancel
                            </Button>
                        </div>
                        
                    </Form>
                   
                    
                </Modal.Body>
            </Modal>
        </>
    );
};

export default PaymentModal;
