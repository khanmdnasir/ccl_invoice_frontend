import React, { useEffect, useState } from 'react';
import { APICore } from '../../helpers/api/apiCore';
import { Row, Col, Card, Form, Alert } from 'react-bootstrap';
import { withSwal } from 'react-sweetalert2';

// components
import Table from '../../components/Table';
import PageTitle from '../../components/PageTitle';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getInvoice } from '../../redux/actions';
import Pagination from '../../components/CustomPagination';



// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const api = new APICore();


// // action column render
const ActionColumn = withSwal(({ row, swal }) => {
    /*
     *   modal handeling
     */
    const dispatch = useDispatch();
    const user_role = useSelector((state)=> state.Role.user_role);
    

    /*
    handle form submission
    */
    
    const onDelete = () => {
        swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#28bb4b',
                cancelButtonColor: '#f34e4e',
                confirmButtonText: 'Yes, delete it!',
            })
            .then(function(result){
                if(result.value){
                    // dispatch(deleteContact(row.original.id))
                    api.delete(`/api/invoice/${row.original.id}/`)
                .then(res=>{
                    dispatch(getInvoice(10,1));
                    swal.fire(
                        'Deleted!',
                        'Invoice has been deleted.',
                        'success'
                    );            
                })
                .catch(err => {
                    swal.fire({
                        title: err,
                    }
                    );
                })
                }else if(result.dismiss === 'cancel'){
                    
                }
            })        
    }

    return (
        <>
            <Link to={{pathname: '/app/invoice_details',state: row.original}} className="action-icon" >
                <i className="mdi mdi-eye"></i>
            </Link>

            { user_role.includes('change_invoice') ?
                <Link to={{pathname: '/app/invoice_form',state: row.original.id}} className="action-icon" >
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link>:
                <Link to="#" className="action-icon"  style={{pointerEvents: 'none'}}>
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link>
            }
            
            { user_role.includes('delete_invoice') ?
                <Link to="#" className="action-icon" onClick={()=>onDelete()}>
                    <i className="mdi mdi-delete"></i>
                </Link>:
                <Link to="#" className="action-icon" style={{pointerEvents: 'none'}}>
                    <i className="mdi mdi-delete"></i>
                </Link>
            }

            
            
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
        Header: 'Contact',
        accessor: 'contact_id.name',
        sort: true,
    },
    {
        Header: 'Date',
        accessor: 'date',
        sort: true,
    },
    {
        Header: 'Tax Type',
        accessor: 'tax_type',
        sort: true,
    },
    {
        Header: 'Sub Total',
        accessor: 'sub_total',
        sort: true,
    },
    {
        Header: 'Discount',
        accessor: 'discount',
        sort: true,
    },
    {
        Header: 'Total Tax',
        accessor: 'total_tax',
        sort: true,
    },
    {
        Header: 'Total Amount',
        accessor: 'total_amount',
        sort: true,
    },
    {
        Header: 'Action',
        accessor: 'action',
        sort: false,
        Cell: ActionColumn,
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
    const user_role = useSelector((state)=> state.Role.user_role);
    const loading = useSelector(state => state.Invoice.loading);
    const error = useSelector(state => state.Invoice.error);
    const [pageSize,setPageSize] = useState(10);
    /*
     *   modal handeling
     */
  

    const visitPage = (page) => {
        dispatch(getInvoice(pageSize,page));
    };

    const previous_number = () => {
        dispatch(getInvoice(pageSize,previous));
    };

    const next_number = () => {
        dispatch(getInvoice(pageSize,next));
    };

    /*
    handle form submission
    */
    


    useEffect(()=>{ 
        dispatch(getInvoice(pageSize,1));   
    },[pageSize])
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Invoice', path: '/app/invoice', active: false },
                ]}
                title={`Invoice`}
            />

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                        {!loading && error && (
                            <Alert variant="danger" className="my-2">
                                {error}
                            </Alert>
                        )}
                            <Row className="mb-2">
                                <Col sm={4}>
                                    <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
                                        <span className='me-2'>Show:</span>
                                        <Form.Select style={{width: '40%'}} onChange={(e)=>{setPageSize(e.target.value);getInvoice(pageSize,1)}}>
                                            <option value='10'>10</option>
                                            <option value='15'>20</option>
                                            <option value='20'>30</option>
                                        </Form.Select>
                                    </div>
                                </Col>

                                <Col sm={8}>
                                    <div className="text-sm-end mt-2 mt-sm-0">
                                        { user_role.includes('add_invoice') ?
                                            <Link className="btn btn-success mb-2 me-1" to='/app/invoice_form'>
                                            <i className="mdi mdi-plus-circle me-1"></i> Add
                                            </Link>:
                                            <>
                                            </>
                                        }
                                        
                                        {/* <ExcelFile element={<Button className="btn btn-light mb-2">Export</Button>}>
                                            <ExcelSheet data={users} name="Users">
                                                <ExcelColumn label="Name" value="name"/>
                                                <ExcelColumn label="Phone" value="phone"/>
                                                <ExcelColumn label="Email" value="email"/>
                                                <ExcelColumn label="Role" value={(col)=> col.groups[0].name}/>                                            
                                            </ExcelSheet>
                                        </ExcelFile> */}
  
                                    </div>
                                </Col>
                            </Row>
                            
                            {loading ? <p>Loading...</p>:
                            <>
                            {invoices.length > 0 ?
                            <>
                            <Table
                                columns={columns}
                                data={invoices}
                                pageSize={pageSize}
                                isSortable={true}
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

export default Invoice;
