import React, { useEffect, useState } from 'react';
import { APICore } from '../../helpers/api/apiCore';
import { Row, Col, Card, Form, Alert, Tab, Nav} from 'react-bootstrap';
import { withSwal } from 'react-sweetalert2';

// components
import Table from '../../components/Table';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getRepeatingInvoice } from '../../redux/actions';
import Pagination from '../../components/CustomPagination';



const api = new APICore();


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

export const StatusColumn = withSwal(({ row, swal }) => {
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
            <option selected={row.original.status === 'approve'} value='approve'>Approved</option>
        </>

    const approvesOptions =
        <>
            <option selected={row.original.status === 'approve'} value='approve'>Approved</option>
        </>


    var dropDown = (<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Form.Select style={{ width: '70%' }} onChange={(e) => handleShow(row, e)}>
            {row.original.status === "draft" ? (draftsOptions) : null}
            {row.original.status === "approve" ? (approvesOptions) : null}
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
                    api.update(`/api/change-repeating-invoice-status/?id=${row.original.id}`, data)
                        .then(res => {
                            if (res) {
                                swal.fire(
                                    'Updated!',
                                    'Repeating Invoice Status has been Updated.',
                                    'success'
                                );
                            }
                            else {
                                swal.fire(
                                    'Updated!',
                                    'Repeating Invoice Status has not Updated.',
                                    'warning'
                                );
                            }
                            // setTimeout(() => {
                            //     refreshPage();
                            // }, 600);
                            dispatch(getRepeatingInvoice(10, 1));
                        })
                        .catch(err => {
                            console.log('err', err)
                            dispatch(getRepeatingInvoice(10, 1));
                            swal.fire({
                                title: err,
                            }
                            );
                        })
                } else if (result.dismiss === 'cancel') {
                    dispatch(getRepeatingInvoice(10, 1));
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
        Header: 'Day',
        accessor: 'date',
        sort: true,
    },
    {
        Header: 'Due Day',
        accessor: 'due_date',
        sort: true,
    },
    {
        Header: 'Repeat Day',
        accessor: 'repeat_date',
        sort: true,
    },
    
    {
        Header: 'Total Amount',
        accessor: 'total_amount',
        sort: true,
        Cell: (row) => {
            const scurrency = useSelector(state => state.Currency.selectedCurrency)
            return <div>{scurrency?.symbol}{row?.row?.original?.total_amount!==null?(row?.row?.original?.total_amount).toLocaleString(undefined, {maximumFractionDigits:2}):0}</div>;
        }
    },
    {
        Header: 'Status',
        accessor: 'status',
        sort: true,
        Cell: StatusColumn,
    },
    
    
];

const RepeatingInvoice = () => {
    const dispatch = useDispatch();
    const invoices = useSelector(state => state.RepeatingInvoice.repeating_invoices);
    const previous = useSelector(state => state.RepeatingInvoice.previous);
    const next = useSelector(state => state.RepeatingInvoice.next);
    const current_page = useSelector(state => state.RepeatingInvoice.current_page);
    const total_page = useSelector(state => state.RepeatingInvoice.total_page);
    const active = useSelector(state => state.RepeatingInvoice.active);
    const user_role = useSelector((state)=> state.Role.user_role);
    const loading = useSelector(state => state.RepeatingInvoice.loading);
    const error = useSelector(state => state.RepeatingInvoice.error);
    const [pageSize,setPageSize] = useState(10);
    const [activePage, setActivePage] = useState('all');

    /*
     *   modal handeling
     */
  

    const visitPage = (page) => {
        dispatch(getRepeatingInvoice(pageSize,page,activePage));
    };

    const previous_number = () => {
        dispatch(getRepeatingInvoice(pageSize,previous,activePage));
    };

    const next_number = () => {
        dispatch(getRepeatingInvoice(pageSize,next,activePage));
    };

    /*
    handle form submission
    */
    
    const onClickEvent = (value) => {
        if (value === 'all') {
            setActivePage('all');
        } else if (value === 'draft') {
            setActivePage('draft');
        }else if (value === 'approve') {
            setActivePage('approve');
        }
        else {
            
        }
    }
    

    useEffect(()=>{ 
        dispatch(getRepeatingInvoice(pageSize,1,activePage));   
    },[activePage])

    useEffect(()=>{ 
        dispatch(getRepeatingInvoice(pageSize,1));   
    },[])


    return (
        <>
            {/* <PageTitle
                breadCrumbItems={[
                    { label: 'Repeating Invoice', path: '/app/repeating_invoice', active: false },
                ]}
                title={`Repeating Invoice`}
            /> */}
            <Tab.Container defaultActiveKey="all">
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
                            Approved
                        </Nav.Link>
                    </Nav.Item>
                </Nav>

               
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
                            
                            
                            {loading ? <p>Loading...</p>:
                            <>
                            {invoices.length > 0 ?
                            <>
                            <Table
                                columns={columns}
                                data={invoices}
                                pageSize={pageSize}
                                isSortable={true}
                                isDetails = {true}
                                pathName = '/app/repeating_invoice_details'
                                pagination={false}
                                isSearchable={true}
                                tableClass="table-nowrap table-hover"
                                searchBoxClass=""
                            />
                            <Pagination visitPage={visitPage} previous_number={previous_number} next_number={next_number} total_page={total_page} current_page={current_page} active={active}/>
                            </>
                            :
                            'No data available!'}</>}
                            
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* add contact modal */}
            
            
            
            
            
        </>
    );
};

export default RepeatingInvoice;
