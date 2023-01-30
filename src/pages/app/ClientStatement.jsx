import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { format } from 'date-fns'

// components
import Table from '../../components/Table';
import PageTitle from '../../components/PageTitle';
import { useSelector, useDispatch } from 'react-redux';
import { getContact } from '../../redux/actions';
import ComponentToPrint from './ComponentToPrint';
import ReactToPrint from 'react-to-print';
import { APICore } from '../../helpers/api/apiCore';
import { getCurrentDate } from '../../utils/getCurrentDate';
import classNames from 'classnames';



// action column render

const api = new APICore();


const DescriptionColumn = ({ row }) => {
    return (
        <React.Fragment>
            <span
                
            >

                {row.original.invoice_no && row.original.invoice_no 
                }
                {row.original.payment_no && row.original.payment_no}
            </span>
        </React.Fragment>
    );
};

const columns = [

    {
        Header: 'Date',
        accessor: 'date',
        sort: true,
    },
    {
        Header: 'Description',
        Cell: DescriptionColumn,
        sort: true,
    },
    {
        Header: 'Invoice Amoount',
        accessor: 'total_amount',
        sort: true,
    },
    {
        Header: 'Payment Amount',
        accessor: 'amount',
        sort: true,
    }
    
   
];

const ClientStatement = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.Contact.contact);
    const cloading = useSelector(state => state.Contact.loading);
    const [contactId,setContactId] = useState();
    const [fromDate,setFromDate] = useState('');
    const [toDate,setToDate] = useState('');
    const [clientLedger,setClientLedger] = useState({});
    
    const [loading,setLoading] = useState(false); 
    

    const componentRef = React.useRef();
   
    const handleSearch = async(e) => {
        e.preventDefault()
        setLoading(true);
        
        if (fromDate === '' || toDate === ''){
            const response = await api.get('/api/client-ledger',{ client_id: contactId })
        
            if(response.data.success){

                setLoading(false)
            }
            setClientLedger(response.data.data)
        }else{
            
            const response = await api.get('/api/client-ledger',{ client_id: contactId,start_date: format(new Date(fromDate), 'yyyy-MM-dd'),end_date: format(new Date(toDate), 'yyyy-MM-dd') })
        
            if(response.data.success){

                setLoading(false)
            }
            setClientLedger(response.data.data)
        }
    }

    useEffect(() => {
        dispatch(getContact(0,1));
        // dispatch(getPayment(pageSize,1));
        
    }, [])
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Client Statement', path: '/app/client_statement', active: true },
                ]}
                title={'Client Statement'}
            />
           
            <Row>
                <Col>
                    <Card>
                        <Card.Body>

                            
                            <Row className="mb-2">
                                <Col sm={8}>
                                <form onSubmit={(e)=>handleSearch(e)} className='mb-4'>
                                    <Row className='mb-3'>
                                        <Form.Group as={Col}>
                                            <Form.Label className='required'>Client</Form.Label>

                                            <Form.Select
                                                aria-label="Default select example"
                                                required
                                                onChange={(e) => setContactId(e.target.value)}
                                                defaultValue=""
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
                                            <Form.Label >From</Form.Label>
                                            <Form.Control
                                                type='date'
                                                name='from_date'
                                                onChange={(e) => setFromDate(e.target.value)}
                                                
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label >To</Form.Label>
                                            <Form.Control
                                                type='date'
                                                name='to_date'
                                                onChange={(e) => setToDate(e.target.value)}
                                                
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                        
                                            
                                        
                                        
                                       
                                    </Row>

                                    <Button type='submit'  className='mt-2'>Search</Button>

                                </form>
                                </Col>

                                <Col sm={4}>
                                    <div className="text-sm-end mt-2 mt-sm-0">
                                        
                                    <ReactToPrint
                                        trigger={() =>  <Button className="btn btn-success mb-2 me-1" >
                                        <i className="mdi mdi-printer me-1"></i> Print
                                    </Button>}
                                        content={() => componentRef.current}
                                    />
                                    <div className='d-none'>
                                    <ComponentToPrint ref={componentRef}  data={clientLedger}/>
                                    </div>
                                       

                                    </div>
                                </Col>
                            </Row>

                            {loading ? <p>Loading...</p> :
                                <>
                                    { clientLedger.statements && clientLedger.statements?.length > 0 ?
                                        <>
                                            <Table
                                                columns={columns}
                                                data={clientLedger.statements}
                                                pageSize={10}
                                                isSortable={true}
                                                pagination={true}
                                                isSearchable={false}
                                                tableClass="table-nowrap table-hover"
                                                searchBoxClass=""
                                            />
                                            
                                        </>
                                        :
                                        'No data available!'}</>}

                        </Card.Body>
                    </Card>
                </Col>
            </Row>

           



        </>
    );
};

export default ClientStatement;
