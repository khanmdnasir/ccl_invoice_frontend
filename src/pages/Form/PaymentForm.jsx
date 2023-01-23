import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
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
    {id:1,name:"type one"},
    {id:2,name:"type two"},
    {id:3,name:"type three"},
    {id:4,name:"type four"}
]
  const cloading = useSelector((state) => state.Contact.loading);
  const chloading = useSelector((state) => state.ChartAccount.loading);
  const [rloading, setRloading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [invoiceId, setInvoiceId] = useState(null);
  const [status, setStatus] = useState('draft');

  console.log('due_invoices', due_invoices)
  const [paymentData, setPaymentData] = useState({
    "payment_date": "2023-01-22",
    "status": "success",
    "amount": 0,
    "total_invoice_amount": 0,
    "reference": "",
    "note": "",
    "client_id": '',
    "payment_type": '',
  })

  const [items, setItems] = useState({
    "account_type": "dr",
    "payment_nature": "regular",
    "amount": 3800,
    "client_id": 1,
    "invoice_id": 1
  });

  const [invoicesData, setInvoicesData] = useState([
    {
      "account_type": "dr",
      "payment_nature": "regular",
      "amount": 3800,
      "client_id": 1,
      "invoice_id": 1
    },
    {
      "account_type": "dr",
      "payment_nature": "adjustment",
      "amount": 500,
      "client_id": 1,
      "invoice_id": 1
    }
  ]);

  const onChange = (e) => {
    const newData = { ...paymentData }
    newData[e.target.name] = e.target.value;
    setPaymentData(newData)
  }


  useEffect(() => {
    const state = location.state
    dispatch(getAllContact());
    if (state) {
      dispatch(getInvoiceDetails(state));
      setInvoiceId(state);

    } else {
      setInvoiceId(null);
    }

  }, [])

  useEffect(() => {
    if (paymentData?.client_id!==''){
      dispatch(getDueInvoices(paymentData?.client_id))
    }
  }, [paymentData?.client_id])

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
                        onChange={(e) => onChange(e)}
                        defaultValue={paymentData?.reference}
                      >

                      </Form.Control>
                    </Form.Group>
                  </Row>



                </div>
                <Form.Label>Invoices:</Form.Label>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className='required'>Invoice No:</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
              <p>Hello</p>


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
