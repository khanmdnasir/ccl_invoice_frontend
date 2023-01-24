import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Form, Alert, InputGroup } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { useLocation } from 'react-router-dom';
// components
import PageTitle from '../../components/PageTitle';
import { useSelector, useDispatch } from 'react-redux';
import { APICore } from '../../helpers/api/apiCore';
import { getAllContact, getContactService, getInvoiceDetails, getDueInvoices } from '../../redux/actions';

const api = new APICore()


const PaymentForm = () => {
  const location = useLocation();
  const history = useHistory();
  const scurrency = useSelector(state => state.Currency.selectedCurrency)

  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.Contact.all_contact);
  // const payment_types = useSelector((state) => state.Payment.payment_types);
  const due_invoices = useSelector((state) => state.Payment.due_invoices);
  const payment_types = [
    { id: 1, name: "type one" },
    { id: 2, name: "type two" },
    { id: 3, name: "type three" },
    { id: 4, name: "type four" }
  ]
  const cloading = useSelector((state) => state.Contact.loading);
  const chloading = useSelector((state) => state.ChartAccount.loading);
  const [rloading, setRloading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [invoiceId, setInvoiceId] = useState(null);
  const [status, setStatus] = useState('draft');


  const [paymentData, setPaymentData] = useState({
    "payment_date": "",
    "status": "success",
    "amount": '',
    "total_invoice_amount": 0,
    "reference": "",
    "note": "",
    "client_id": '',
    "payment_type": '',
  })

  // const [invoicesData, setInvoicesData] = useState([
  //   {
  //     "account_type": "dr",
  //     "payment_nature": "regular",
  //     "amount": '',
  //     "client_id": '',
  //     "invoice_id": '',
  //     "adjustment_amount":''
  //   }
  // ]);

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
    if (target ==='invoice_selected'){
      value=e.target.checked;
      if (value===false){
        const newPaymentData = { ...paymentData }
        newPaymentData['total_invoice_amount'] -= ((changingObj.paying_amount !== '' ? changingObj.paying_amount : 0) +
        (changingObj.adjustment_amount !== '' ? changingObj.adjustment_amount: 0))
        setPaymentData(newPaymentData)
        changingObj['paying_amount'] = ''
        changingObj['adjustment_amount'] = ''
      }
      else{
        changingObj['paying_amount'] = changingObj.total_amount
        const newPaymentData = { ...paymentData }
        newPaymentData['total_invoice_amount'] += changingObj.total_amount 
        setPaymentData(newPaymentData)
      }
    }

    if (target ==='paying_amount'){
      console.log('value',value)
      if (value + (changingObj.adjustment_amount !== '' ? changingObj.adjustment_amount : 0) > changingObj.total_amount){
        value = changingObj.paying_amount;
      }
    }

    if (target ==='adjustment_amount'){
      if (value + (changingObj.paying_amount !== '' ? changingObj.paying_amount : 0) > changingObj.total_amount){
        value = changingObj.adjustment_amount;
      }
    }

    changingObj[target] = value
    newInvoicesObj[id] = changingObj
    setInvoicesData(newInvoicesObj)
  }

  // console.log("invoicesData", invoicesData)

  useEffect(() => {
    // const state = location.state
    dispatch(getAllContact());
  }, [])

  useEffect(() => {
    if (paymentData?.client_id !== '') {
      dispatch(getDueInvoices(paymentData?.client_id))
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
    setError(null);
    setSuccess(null);
    if (invoicesData.length > 0) {
      api.create(`/api/payment/`, {})
        .then(res => {

          if (res.data.success) {
            setSuccess('Data Saved Successfully');
            setRloading(false);
            setTimeout(() => {
              history.push('/app/payment')
            }, 2000);
          } else {
            setError(res.data.error)
            setRloading(false);

          }

        })
        .catch(err => {
          setError(err)
        })
    } else {
      setError("Please add at least one service")
    }

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
              <div>
              <Button disabled className="m-3 float-end" variant="primary" size="lg">{(paymentData.amount === '' ? 0 : paymentData.amount) - paymentData?.total_invoice_amount} {scurrency.symbol}</Button>
              </div>
            <Card.Body>
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
                        type='text'
                        name='amount'
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
                  <thead>
                    <tr>
                      <th className='required'>Invoice</th>
                      <th>Paying Amount</th>
                      <th>Adjustment Amount</th>
                    </tr>
                    {Object.keys(invoicesData).length > 0 && Object.entries(invoicesData).map(inv => {
                      return (
                        <tr key={"inv" + inv[0]}>
                          <td>
                            <Form.Check
                              style={{ 'minHeight': '2rem' }}
                              type="checkbox"
                              id={inv.id}
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
                                max={inv[1].total_amount-inv[1].paying_amount}
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
                    {Object.keys(invoicesData).length < 1 ?  <b> No due invoice found </b> : null}
                  </thead>
                  <tbody>

                  </tbody>
                </Table>
                <div className="d-flex justify-content-between">

                  <Button variant="info" type="submit" className="waves-effect waves-light me-1" >
                    Save
                  </Button>
                  <div>
                    <Button variant="success" type="submit" className="waves-effect waves-light me-1" disabled={rloading} onClick={() => setStatus('approve')}>
                      {rloading ? 'Loading...' : 'Approve'}
                    </Button>
                    <Link
                      to='#'
                      onClick={() => history.goBack()}
                      className=" btn btn-secondary waves-effect waves-light"
                    >
                      Cancel
                    </Link>
                  </div>
                </div>


              </Form>



            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PaymentForm;
