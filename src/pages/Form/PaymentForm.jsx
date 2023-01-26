import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Form, Alert, InputGroup } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { useLocation } from 'react-router-dom';
// components
import PageTitle from '../../components/PageTitle';
import { useSelector, useDispatch } from 'react-redux';
import { APICore } from '../../helpers/api/apiCore';
import { getAllContact, getPaymentTypes, getDueInvoices, getClientBalance, addPayment, clearSubmitSuccessMessage, clearSubmitErrorMessage, resetPaymentReducerState,  clearDueInvoices } from '../../redux/actions';
import moment from "moment";
const api = new APICore()


const PaymentForm = () => {
  const location = useLocation();
  const history = useHistory();
  const scurrency = useSelector(state => state.Currency.selectedCurrency)

  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.Contact.all_contact);
  // const payment_types = useSelector((state) => state.Payment.payment_types);
  const due_invoices = useSelector((state) => state.Payment.due_invoices);
  const client_balance = useSelector((state) => state.Payment.client_balance);
  const payment_types = useSelector((state) => state.Payment.payment_types);
  const payment_success = useSelector((state) => state.Payment.payment_success);
  const payment_error = useSelector((state) => state.Payment.payment_error);
  const cloading = useSelector((state) => state.Payment.loading);
  const [rloading, setRloading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [invoiceId, setInvoiceId] = useState(null);
  const [status, setStatus] = useState('draft');

  const [paymentData, setPaymentData] = useState({
    "payment_date": moment().format("YYYY-MM-DD"),
    "status": "success",
    "amount": '',
    "total_invoice_amount": 0,
    "reference": "",
    "note": "",
    "client_id": '',
    "payment_type": ''
  })

  const [invoicesData, setInvoicesData] = useState({});

  const onChange = (e) => {
    const newData = { ...paymentData }
    newData[e.target.name] = e.target.value;
    setPaymentData(newData)
  }

  const onChangeInvoice = (id, e) => {
    const newInvoicesObj = { ...invoicesData }
    const changingObj = newInvoicesObj[id]
    const target = e.target.name
    let value = e.target.value
    const newPaymentData = { ...paymentData }
    if (target === 'invoice_selected') {
      value = e.target.checked;
      if (value === false) {
        newPaymentData['total_invoice_amount'] -= ((changingObj.paying_amount !== '' ? parseFloat(changingObj.paying_amount) : 0) +
          (changingObj.adjustment_amount !== '' ? parseFloat(changingObj.adjustment_amount) : 0))
        changingObj['paying_amount'] = ''
        changingObj['adjustment_amount'] = ''
      }
      else {
        changingObj['paying_amount'] = changingObj.total_amount
        newPaymentData['total_invoice_amount'] += changingObj.total_amount
      }
    }

    if (target === 'paying_amount') {
      if (parseFloat(value) + (changingObj.adjustment_amount !== '' ? parseFloat(changingObj.adjustment_amount) : 0) > parseFloat(changingObj.total_amount)) {
        value = changingObj.paying_amount !== '' ? parseFloat(changingObj.paying_amount) : '';
      }
      else {
        const preChangingObjValue = changingObj.paying_amount !== '' ? parseFloat(changingObj.paying_amount) : 0;
        const netValue = (value !== '' ? parseFloat(value) : 0) - preChangingObjValue;
        newPaymentData['total_invoice_amount'] += netValue;
      }
    }

    if (target === 'adjustment_amount') {
      if (parseFloat(value) + (changingObj.paying_amount !== '' ? parseFloat(changingObj.paying_amount) : 0) > parseFloat(changingObj.total_amount)) {
        value = changingObj.adjustment_amount !== '' ? parseFloat(changingObj.adjustment_amount) : '';
      }
    }

    setPaymentData(newPaymentData)

    changingObj[target] = value
    newInvoicesObj[id] = changingObj
    setInvoicesData(newInvoicesObj)
  }


  // console.log("client_balance", client_balance)

  useEffect(() => {
    // const state = location.state
    dispatch(getAllContact());
    dispatch(getPaymentTypes());

    return () => {
      dispatch(resetPaymentReducerState())
    }
  }, [])

  useEffect(() => {
    if (payment_success !== null) {
      setSuccess(payment_success);
      setTimeout(() => {
        setRloading(false);
        history.push('/app/payment')
      }, 2000);
    }
    else if (payment_error !== null) {
      setError(payment_error);
      setRloading(false);
    }
    return () => {
      dispatch(clearSubmitSuccessMessage())
      dispatch(clearSubmitErrorMessage())
    }
  }, [payment_success, payment_error])

  useEffect(() => {
    if (paymentData?.client_id !== '') {
      dispatch(getDueInvoices(paymentData?.client_id))
      dispatch(getClientBalance(paymentData?.client_id))
    }

    return () => {
      dispatch(clearDueInvoices())
    }
  }, [paymentData?.client_id])

  useEffect(() => {
    if (due_invoices !== '' && due_invoices !== undefined && due_invoices !== null) {
      const due_invoice_objects = {}
      due_invoices.forEach(element => {
        const newElement = {}
        newElement['invoice_id'] = element.id;
        newElement['invoice_no'] = element.invoice_no;
        newElement['status'] = element.status;
        newElement['total_amount'] = element.total_amount;
        newElement['adjustment_amount'] = '';
        newElement['paying_amount'] = '';
        newElement['invoice_selected'] = false;
        due_invoice_objects[(element.id)] = newElement
      });
      setInvoicesData(due_invoice_objects)
    }
  }, [due_invoices])

  const onSubmit = (e) => {

    e.preventDefault();
    setRloading(true);
    const selectedInvoices = Object.values(invoicesData).filter(inv => {
      return inv.invoice_selected;
    })

    // if (selectedInvoices.length < 1) {
    //   setError("Please add at least one invoice to make payment!")
    // }

    const current_balance = parseFloat(client_balance) + parseFloat(paymentData.amount) - parseFloat(paymentData.total_invoice_amount);
    if (current_balance < 0) {
      setError("You don't have enough balance to make payment!")
    }

    const finalSelectedInvoices = selectedInvoices.map(inv => {

      const payingAmount = (inv.paying_amount !== '' && inv.paying_amount !== 0 && inv.adjustment_amount !== null) ? parseFloat(inv.paying_amount) : 0;
      const adjAmount = (inv.adjustment_amount !== '' && inv.adjustment_amount !== 0 && inv.adjustment_amount !== null) ? parseFloat(inv.adjustment_amount) : 0;

      if (payingAmount === 0) {
        setError("Paying amount should not be empty!")
      }

      const newInv = {
        "payment_nature": adjAmount !== 0 ? "adjustment" : "regular",
        "amount": payingAmount !== 0 ? payingAmount : '',
        "client_id": paymentData?.client_id,
        "invoice_id": inv?.invoice_id,
        "adjustment_amount": adjAmount !== 0 ? adjAmount : '',
        "invoice_status": parseFloat(payingAmount + adjAmount) < parseFloat(inv.total_amount) ? "partial_paid" : "paid"
      }

      return newInv;
    })

    const finalPaymentData = { ...paymentData }
    finalPaymentData['invoices'] = finalSelectedInvoices

    // console.log("finalPaymentData", finalPaymentData)

    dispatch(addPayment(finalPaymentData))
  }


  return (
    <>

      <PageTitle
        breadCrumbItems={[
          { label: 'Payment', path: '/app/payment', active: false },
          { label: 'Payment Form', path: '/app/payment_form', active: true },
        ]}
        title={'Payment Form'}
      />
      <Row>
        <Col>
          <Card>
            {error && (
              <Alert variant="danger" className="my-2" onClose={() => setError(null)} dismissible>
                {error}
              </Alert>
            )}
            {success && (
              <Alert variant="success" className="my-2" onClose={() => setSuccess(null)} dismissible>
                {success}
              </Alert>
            )}
            <Form onSubmit={(e) => { onSubmit(e) }}>
              <div className='p-3 d-flex justify-content-between'>
                <Form.Group>
                  <Form.Label className='required'>Date</Form.Label>
                  <Form.Control
                    type='date'
                    required
                    name='payment_date'
                    onChange={(e) => onChange(e)}
                    defaultValue={paymentData?.payment_date}
                  >
                  </Form.Control>
                </Form.Group>
                <div className='float-right'>
                  <Button style={{ textAlign: "left" }} variant="success" size="lg"><b>
                    Current Balance: {parseFloat(client_balance)} {scurrency.symbol}
                    <br />
                    New Balance: {parseFloat(client_balance) + (paymentData.amount === '' ? 0 : parseFloat(paymentData.amount)) - paymentData?.total_invoice_amount} {scurrency.symbol}</b></Button>
                </div>
              </div>

              <Card.Body>
                <div className='mb-4'>
                  <Row className='mb-3'>
                    <Form.Group as={Col}>
                      <Form.Label className='required'>Client</Form.Label>

                      <Form.Select
                        aria-label="Default select example"
                        disabled={invoiceId ? true : false}
                        required
                        name="client_id"
                        onChange={(e) => onChange(e)}
                        value={paymentData?.client_id}
                      >
                        {cloading ? <option value="" disabled>Loading...</option> :
                          <>

                            <option value="" disabled>Select Client ...</option>
                            {contacts.length > 0 && contacts?.map((item) => {
                              return (
                                <option key={'scontact' + item.id} value={item.id} >{item.name}</option>
                              )
                            })}

                          </>
                        }
                      </Form.Select>

                    </Form.Group>

                    <Form.Group as={Col}>
                      <Form.Label className='required'>Payment Type</Form.Label>

                      <Form.Select
                        aria-label="Default select example"
                        disabled={invoiceId ? true : false}
                        required
                        name="payment_type"
                        onChange={(e) => onChange(e)}
                        value={paymentData?.payment_type}
                      >
                        {cloading ? <option value="" disabled>Loading...</option> :
                          <>

                            <option value="" disabled>Select Payment Type ...</option>
                            {payment_types.length > 0 && payment_types?.map((item) => {
                              return (
                                <option key={'scontact' + item.id} value={item.id} >{item.name}</option>
                              )
                            })}

                          </>
                        }
                      </Form.Select>

                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label className='required'>Amount</Form.Label>
                      <Form.Control
                        type='number'
                        name='amount'
                        required
                        onChange={(e) => onChange(e)}
                        placeholder="Please enter an amount"
                        defaultValue={paymentData?.amount}
                      >

                      </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label >Reference</Form.Label>
                      <Form.Control
                        type='text'
                        name='reference'
                        placeholder="Please enter an reference"
                        onChange={(e) => onChange(e)}
                        defaultValue={paymentData?.reference}
                      >

                      </Form.Control>
                    </Form.Group>
                  </Row>



                </div>
                <Table striped bordered hover>
                  {Object.keys(invoicesData).length > 0 ?
                    <>
                      <thead>
                        <tr>
                          <th className='required'>Invoice</th>
                          <th className='required'>Paying Amount</th>
                          <th>Adjustment Amount</th>
                        </tr>
                      </thead>
                    </>
                    : null}
                  <thead>

                    {Object.keys(invoicesData).length > 0 && Object.entries(invoicesData).map(inv => {
                      return (
                        <tr key={"inv" + inv[0]}>
                          <td>
                            <Form.Check
                              style={{ 'minHeight': '2rem' }}
                              type="checkbox"
                              id={inv.id}
                              checked={inv[1].invoice_selected}
                              name="invoice_selected"
                              label={`Invoice No: ${inv[1].invoice_no}, Total Amount: ${scurrency.symbol}${inv[1].total_amount}`}
                              onChange={(e) => onChangeInvoice(inv[0], e)}
                            />
                          </td>

                          <td>
                            <Form.Group as={Col}>
                              <Form.Control
                                type='number'
                                max={inv[1].total_amount}
                                name='paying_amount'
                                required
                                readOnly={!inv[1].invoice_selected}
                                value={inv[1].paying_amount}
                                onChange={(e) => onChangeInvoice(inv[0], e)}
                              >

                              </Form.Control>
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group as={Col}>
                              <Form.Control
                                type='number'
                                max={inv[1].total_amount - inv[1].paying_amount}
                                name='adjustment_amount'
                                readOnly={!inv[1].invoice_selected || inv[1].paying_amount >= inv[1].total_amount}
                                value={inv[1].adjustment_amount}
                                onChange={(e) => onChangeInvoice(inv[0], e)}
                              >
                              </Form.Control>
                            </Form.Group>
                          </td>
                        </tr>
                      )

                    })}
                    {Object.keys(invoicesData).length < 1 ? <b> No due invoice found </b> : null}
                  </thead>

                </Table>
                <Form.Group as={Col}>
                  <Form.Label >Note</Form.Label>
                  <Form.Control
                    as="textarea"
                    name='note'
                    placeholder="Please enter an note"
                    onChange={(e) => onChange(e)}
                    defaultValue={paymentData?.note}
                  >

                  </Form.Control>
                </Form.Group>
                <div className='mt-2'>

                  <Button variant="success" type="submit" className="waves-effect waves-light me-1 float-end" disabled={rloading} onClick={() => setStatus('submit')}>
                    {rloading ? 'Loading...' : 'Submit'}
                  </Button>
                  <Link
                    to='#'
                    onClick={() => history.goBack()}
                    className=" btn btn-secondary waves-effect waves-light"
                  >
                    Cancel
                  </Link>
                </div>






              </Card.Body>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PaymentForm;
