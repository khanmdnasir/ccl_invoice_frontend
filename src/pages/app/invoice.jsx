import React, { useEffect, useState } from 'react';
import { APICore } from '../../helpers/api/apiCore';
import { Row, Col, Card, Form, Alert, Tab, Nav, Dropdown, Button } from 'react-bootstrap';
import { withSwal } from 'react-sweetalert2';

// components
import classNames from 'classnames';
import Table from '../../components/Table';
import PageTitle from '../../components/PageTitle';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getInvoice } from '../../redux/actions';
import Pagination from '../../components/CustomPagination';
import RepeatingInvoice from './RepeatingInvoice';




const api = new APICore();

const refreshPage = () => {
    window.location.reload();
}

const StatusColumn = ({ row }) => {
    let status = (row.original.status).split('_')
       
    for (var i = 0; i < status.length; i++) {
        status[i] = status[i].charAt(0).toUpperCase() + status[i].slice(1);
    }
    status = status.join(" ");

    return (
        <React.Fragment>
            <span style={{width:"5rem",fontSize:12}}
                className={classNames('badge', {
                    'bg-soft-primary text-primary': row.original.status === "draft",
                    'bg-soft-secondary text-secondary': row.original.status === "waiting",
                    'bg-soft-success text-success': row.original.status === "approve",
                    'bg-soft-warning text-warning': row.original.status === "partial_paid",
                    'bg-soft-info text-info': row.original.status === "paid",
                })}
            >

                {status}
            </span>
        </React.Fragment>
    );
};

const ClientNameColumn = ({ row }) => {
    return (
        <>
            <Link to={{
            pathname: "/app/client_details",
            state: { contactId: row?.original?.contact_id?.id},
            }}>
                {row?.original?.contact_id?.name}
            </Link>
        </>
    )
}

export const StatusColumn2 = withSwal(({ row, swal }) => {
    /*
     *   modal handeling
     */
    const dispatch = useDispatch();
    const user_role = useSelector((state) => state.Role.user_role);

    /*
    handle form submission
    */
    const draftsOptions =
        <>
            <option selected={row.original.status === 'draft'} value='draft'>Draft</option>
            <option selected={row.original.status === 'waiting'} value='waiting'>Waiting</option>
            <option selected={row.original.status === 'approve'} value='approve'>Approved</option>
        </>

    const waitingsOptions =
        <>
            <option selected={row.original.status === 'waiting'} value='waiting'>Waiting</option>
            <option selected={row.original.status === 'approve'} value='approve'>Approved</option>
        </>

    const approvesOptions =
        <>
            <option selected={row.original.status === 'approve'} value='approve'>Approved</option>
            <option selected={row.original.status === 'partial_paid'} value='partial_paid'>Partial Paid</option>
            <option selected={row.original.status === 'paid'} value='paid'>Paid</option>
        </>

    const paidsOptions =
        <>
            <option disabled selected={row.original.status === 'paid'} value='paid'>Paid</option>
        </>

    var dropDown = (<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Form.Select style={{ width: '70%' }} onChange={(e) => handleShow(row, e)}>
            {row.original.status === "draft" ? (draftsOptions) : null}
            {row.original.status === "waiting" ? (waitingsOptions) : null}
            {row.original.status === "approve" ? (approvesOptions) : null}
            {row.original.status === "paid" ? (paidsOptions) : null}
        </Form.Select>
    </div>)

    const handleShow = (row, e) => {
        
        const value = e.target.value;
        const data = {
            "status": value
        }
        swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#28bb4b',
            cancelButtonColor: '#f34e4e',
            confirmButtonText: 'Yes, change it!',
        })
            .then(function (result) {

                if (result.value) {
                    api.update(`/api/change-invoice-status/?id=${row.original.id}`, data)
                        .then(res => {
                            if (res) {
                                swal.fire(
                                    'Updated!',
                                    'Invoice Status has been Updated.',
                                    'success'
                                );
                            }
                            else {
                                swal.fire(
                                    'Updated!',
                                    'Invoice Status has not Updated.',
                                    'warning'
                                );
                            }
                            dispatch(getInvoice(10, 1));
                        })
                        .catch(err => {
                            console.log('err', err)
                            dispatch(getInvoice(10, 1));
                            swal.fire({
                                title: err,
                            }
                            );
                        })
                } else if (result.dismiss === 'cancel') {
                    dispatch(getInvoice(10, 1));
                }
            })
            .catch(err => {
                console.log('swal fire err', err)
            })
    };

    return (
        <>
            {dropDown}

        </>
    );
});


const columns = [
    {
        Header: 'Invoice No',
        accessor: 'invoice_no',
        sort: true,
    },
    {
        Header: 'Client',
        accessor: 'contact_id.name',
        sort: true,
        Cell: ClientNameColumn

    },
    {
        Header: 'Date',
        accessor: 'date',
        sort: true,
    },
    {
        Header: 'Due Date',
        accessor: 'due_date',
        sort: true,
    },
    
    {
        Header: 'Total Amount',
        accessor: 'total_amount',
        sort: true,
        Cell: (row) => {
            return <div>{row?.row?.original?.total_amount!==null?(row?.row?.original?.total_amount).toLocaleString(undefined, {maximumFractionDigits:2}):0}</div>;
        }
    },
    {
        Header: 'Paid',
        accessor: 'partial_paid_and_due.partial_paid',
        sort: true,
        Cell: (row) => {
            return <div>{row?.row?.original?.partial_paid_and_due?.partial_paid !==null ? (row?.row?.original?.partial_paid_and_due?.partial_paid).toLocaleString(undefined, {maximumFractionDigits:2}):0}</div>;
        }
    },
    {
        Header: 'Due',
        accessor: 'partial_paid_and_due.due',
        sort: true,
        Cell: (row) => {
            return <div>{row?.row?.original?.partial_paid_and_due?.due!==null?(row?.row?.original?.partial_paid_and_due?.due).toLocaleString(undefined, {maximumFractionDigits:2}):0}</div>;
        }
    },
    {
        Header: 'Status',
        accessor: 'status',
        sort: true,
        Cell: StatusColumn
    },
    

];


const Invoice = () => {
    const dispatch = useDispatch();
    const invoices = useSelector(state => state.Invoice.invoices);
    const previous = useSelector(state => state.Invoice.previous);
    const next = useSelector(state => state.Invoice.next);
    const current_page = useSelector(state => state.Invoice.current_page);
    const total_page = useSelector(state => state.Invoice.total_page);
    const active = useSelector(state => state.Invoice.active);
    const user_role = useSelector((state) => state.Role.user_role);
    const loading = useSelector(state => state.Invoice.loading);
    const error = useSelector(state => state.Invoice.error);
    const [pageSize, setPageSize] = useState(10);
    const [activePage, setActivePage] = useState('approve');
    /*
     *   modal handeling
     */

    const visitPage = (page) => {
        dispatch(getInvoice(pageSize, page,activePage));
    };

    const previous_number = () => {
        dispatch(getInvoice(pageSize, previous,activePage));
    };

    const next_number = () => {
        dispatch(getInvoice(pageSize, next,activePage));
    };

    /*
    handle form submission
    */

    const onClickEvent = (value) => {
        if (value === 'all') {
            setActivePage('all');
        } else if (value === 'draft') {
            setActivePage('draft');
        } else if (value === 'approval') {
            setActivePage('approval');
        } else if (value === 'approve') {
            setActivePage('approve');
        } else if (value === 'paid') {
            setActivePage('paid');
        }
        else if(value === 'repeating'){
            setActivePage('repeating')
        }
        else {
            
        }
    }

    
    useEffect(() => {
        dispatch(getInvoice(pageSize, 1,activePage));
    }, [activePage])

    useEffect(() => {
        dispatch(getInvoice(pageSize, 1,'approve'));
    }, [])


    
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Invoice', path: '/app/invoice', active: false },
                ]}
                title={`Invoice`}
            />

            <Dropdown  className="mb-4">
            
                <Dropdown.Toggle split variant='primary'>
                    New  <i className="mdi mdi-chevron-down"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item eventKey="1" ><Link to='/app/invoice_form'>New Invoice</Link></Dropdown.Item>
                    <Dropdown.Item eventKey="2" ><Link to='/app/repeating_invoice_form'>New Repeating Invoice</Link></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            {/* <Row className='mb-4'>
            <Form.Group as={Col} className='col-md-2' onChange={redirectToCreate}>
                <Form.Select style={{backgroundColor: '#dee2e6',color: '#0078C8'}}>
                    <option selected={activePage !== 'repeating'} onClick={redirectToCreate}>New Invoice</option>
                    <option selected={activePage === 'repeating'}>New Repeating Invoice</option>
                </Form.Select>
            </Form.Group>
            <div className='col-md-10'></div>
            </Row> */}
            

            <Tab.Container>
                <Nav as="ul" variant="tabs">
                    <Nav.Item as="li" key='all'>
                        <Nav.Link active={activePage === "all"} className="cursor-pointer" href="#" eventKey='all' onClick={() => onClickEvent('all')}>
                            All
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" key='draft'>
                        <Nav.Link active={activePage === "draft"} className="cursor-pointer" href="#" eventKey='draft' onClick={() => onClickEvent('draft')}>
                            Draft
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" key='approve'>
                        <Nav.Link active={activePage === "approve"} className="cursor-pointer" href="#" eventKey='approve' onClick={() => onClickEvent('approve')}>
                            Awaiting Payment
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" key='paid'>
                        <Nav.Link active={activePage === "paid"} className="cursor-pointer" href="#" eventKey='paid' onClick={() => onClickEvent('paid')}>
                            Paid
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" key='repeating'>
                        <Nav.Link className="cursor-pointer" href="#" eventKey='repeating' onClick={()=>onClickEvent('repeating')}>
                           Repeating
                        </Nav.Link>
                    </Nav.Item>                        
                </Nav>

                {/* <Tab.Content>
                    <Tab.Pane eventKey='trading'  key='trading'>
                        <Trading />
                    </Tab.Pane>                        
                    <Tab.Pane eventKey='transaction'  key='transaction'>
                        <Transaction />
                    </Tab.Pane>                        
                    <Tab.Pane eventKey='dividend'  key='dividend'>
                        <Dividend />
                    </Tab.Pane>                        
                    <Tab.Pane eventKey='dump_box'  key='dump_box'>
                        <DumpBox />
                    </Tab.Pane>                        
                </Tab.Content> */}
            </Tab.Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            {!loading && error && (
                                <Alert variant="danger" className="my-2">
                                    {error}
                                </Alert>
                            )}
                            {/* <Row className="mb-2">
                                <Col sm={4}>
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <span className='me-2'>Show:</span>
                                        <Form.Select style={{ width: '40%' }} onChange={(e) => { setPageSize(e.target.value); getInvoice(pageSize, 1) }}>
                                            <option value='10'>10</option>
                                            <option value='15'>20</option>
                                            <option value='20'>30</option>
                                        </Form.Select>
                                    </div>
                                </Col>

                                <Col sm={8}>
                                    <div className="text-sm-end mt-2 mt-sm-0">
                                        {user_role.includes('add_invoice') ?
                                            <Link className="btn btn-success mb-2 me-1" to='/app/invoice_form'>
                                                <i className="mdi mdi-plus-circle me-1"></i> Add
                                            </Link> :
                                            <>
                                            </>
                                        }

                                       

                                    </div>
                                </Col>
                            </Row> */}

                            {activePage === 'repeating' ? <RepeatingInvoice/>:
                            <>
                            {loading ? <p>Loading...</p> :
                                <>
                                    {invoices.length > 0 ?
                                        <>
                                            <Table
                                                columns={columns}
                                                data={invoices}
                                                pageSize={pageSize}
                                                isSortable={true}
                                                isDetails = {true}
                                                pathName = '/app/invoice_details'
                                                pagination={false}
                                                isSearchable={true}
                                                tableClass="table-nowrap table-hover"
                                                searchBoxClass=""
                                            />
                                            <Pagination visitPage={visitPage} previous_number={previous_number} next_number={next_number} total_page={total_page} current_page={current_page} active={active} />
                                        </>
                                        :
                                        'No data available!'}</>}
                                </>}

                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* add contact modal */}





        </>
    );
};

export default Invoice;
