import React, { useEffect, useState } from 'react';
import { APICore } from '../../helpers/api/apiCore';
import { Row, Col, Card, Button, Form, Alert, Badge } from 'react-bootstrap';
import { withSwal } from 'react-sweetalert2';

// components
import Table from '../../components/Table';
import classNames from 'classnames';
import PageTitle from '../../components/PageTitle';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '../../components/CustomPagination';
import { getPayment, setPaymentSuccessAlert } from '../../redux/actions';


const api = new APICore();

/* status column render */
const StatusColumn = ({ row }) => {
  return (
      <React.Fragment>
          <span style={{'width': '80px','fontSize': '12px'}}
              className={classNames('badge', {
                  'bg-soft-success text-success': row.original.status === 'success',
                  'bg-soft-danger text-danger': row.original.status === 'canceled',
              })}
          >

              {(row.original.status).charAt(0).toUpperCase()+(row.original.status).slice(1)}
          </span>
      </React.Fragment>
  );
};


// action column render

const columns = [


  {
    Header: 'Name',
    accessor: 'client_id.name',
    sort: true,
  },

  {
      Header: 'Payment No',
      accessor: 'payment_no',
      sort: true,
  },
  {
      Header: 'Payment Type',
      accessor: 'payment_type.name',
      sort: true,
  },
  {
      Header: 'Date',
      accessor: 'payment_date',
      sort: true,
  },
  {
      Header: 'Amount',
      accessor: 'amount',
      sort: true,
  },
  {
      Header: 'Reference',
      accessor: 'reference',
      sort: true,
  },
  {
      Header: 'Status',
      accessor: 'status',
      sort: true,
      Cell: StatusColumn
  },
  
  
  
  
];

const Payment = () => {
  const dispatch = useDispatch();
  const payment = useSelector(state => state.Payment.payments);
  const previous = useSelector(state => state.Payment.previous);
  const next = useSelector(state => state.Payment.next);
  const current_page = useSelector(state => state.Payment.current_page);
  const total_page = useSelector(state => state.Payment.total_page);
  const active = useSelector(state => state.Payment.active);
  const user_role = useSelector((state) => state.Role.user_role);
  const loading = useSelector(state => state.Payment.loading);
  const success = useSelector(state => state.Payment.success);
  const [pageSize, setPageSize] = useState(10);
  const [paymentDate, setPaymentDate] = useState('');


  // const paymentwithDate = payment.map((curElem) =>{
  //   // let date = (curElem.payment_date.split("T"));
  //   // console.log(date[0]);
  //   // console.log(curElem)
  //   console.log(curElem.payment_date);
  // });

  
  const visitPage = (page) => {
    dispatch(getPayment(pageSize, page));
};

const previous_number = () => {
    dispatch(getPayment(pageSize, previous));
};

const next_number = () => {
    dispatch(getPayment(pageSize, next));
};

useEffect(() => {
  dispatch(getPayment(pageSize, 1));
}, [pageSize])


useEffect (() => {
  const paymentwithDate = payment.map((item) => {
    // console.log(item)
    let date = (item.payment_date.split("T"))[0];
    item.payment_date=date;
    return item;
  });
  setPaymentDate(paymentwithDate);
}, [payment])


  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Payment', path: '/app/payment', active: true },
        ]}
        title={'Payment'}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>

              {!loading && success && (
                <Alert variant="success" className="my-2" onClose={() => dispatch(setPaymentSuccessAlert(''))} dismissible>
                  {success}
                </Alert>
              )}
              <Row className="mb-2">
                <Col sm={4}>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <span className='me-2'>Show:</span>
                    <Form.Select style={{width: '40%'}} onChange={(e) => { setPageSize(e.target.value); dispatch(getPayment(e.target.value, current_page)) }}>
                      <option value='10'>10</option>
                      <option value='15'>20</option>
                      <option value='20'>30</option>
                    </Form.Select>
                  </div>
                </Col>

                {/* <Col sm={8}>
                  <div className="text-sm-end mt-2 mt-sm-0">
                      <Button className="btn btn-success mb-2 me-1">
                        <i className="mdi mdi-plus-circle me-1"></i> Add New
                      </Button>

                  </div>
                </Col> */}
              </Row>
                           {loading ? <p>Loading...</p> :
                                <>
                                    {paymentDate.length > 0 ?
                                        <>
                                            <Table
                                                columns={columns}
                                                data={paymentDate}
                                                pageSize={pageSize}
                                                isSortable={true}
                                                isDetails = {true}
                                                pathName = '/app/payment_details'
                                                pagination={false}
                                                isSearchable={true}
                                                tableClass="table-nowrap table-hover"
                                                searchBoxClass=""
                                            />
                                            <Pagination visitPage={visitPage} previous_number={previous_number} next_number={next_number} total_page={total_page} current_page={current_page} active={active} />
                                        </>
                                        :
                                        'No payments available!'}</>}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* add contact modal */}

    </>
  );
};

export default Payment;
