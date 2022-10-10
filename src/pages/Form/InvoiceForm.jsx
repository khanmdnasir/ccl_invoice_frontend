import React,{ useEffect, useState } from 'react';
import { Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import Table from 'react-bootstrap/Table';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns'
// components
import PageTitle from '../../components/PageTitle';
import { useSelector,useDispatch } from 'react-redux';
import { APICore } from '../../helpers/api/apiCore';
import { getAllContact, getChartAccount, getInvoiceDetails } from '../../redux/actions';
import { getCurrency } from '../../redux/currency/actions';

const api = new APICore()




const InvoiceForm = () => {
    const location = useLocation();
    const [oldItems,setOldItems] = useState([]);
    const invoice_details = useSelector((state) => state.Invoice.invoice_details);
    const [contactId,setContactId] = useState(invoice_details.length > 0 ? invoice_details?.contact_id?.id : '');
    const [invoiceNo,setInvoiceNo] = useState('');
    const [invoiceId,setInvoiceId] = useState(null);
    const [date,setDate] = useState('');
    const [due_date,setDueDate] = useState('');
    const [reference,setReference] = useState('');
    const [currency,setCurrency] = useState(invoice_details.length > 0 ? invoice_details?.currency?.id : '1');
    const [tax_type,setTaxType] = useState(invoice_details.length > 0 ? invoice_details?.tax_type : 'inclusive');
    const [sub_total,setSubTotal] = useState('');
    const [discount,setDiscount] = useState('');
    const [total_tax,setTotalTax] = useState('');
    const [status,setStatus] = useState(invoice_details.length > 0 ? invoice_details?.status : 'draft');
    const [total_amount,setTotalAmount] = useState('');
    const [deletedItems,setDeletedItems] = useState([]);
    
    const [items,setItems] = useState({
        item: '',
        description: '',
        qty: '',
        unit_price: '',
        discount: '',
        account_id: '',
        tax_rate: '',
        tax_amount: '',
        sub_total: '',
        total_amount: ''
    });
    const [newItems,setNewItems] = useState([]);
    
    const dispatch = useDispatch();
    var itemCount = 0;
    const contacts = useSelector((state) => state.Contact.all_contact);
    const currencies = useSelector((state) => state.Currency.currencies);
    const accounts = useSelector((state) => state.ChartAccount.accounts);
    const cloading = useSelector((state) => state.Contact.loading);
    const culoading = useSelector((state) => state.Currency.loading);
    const chloading = useSelector((state) => state.ChartAccount.loading);
    const [rloading,setRloading] = useState(false);
    const [error,setError] = useState(null);
    const [success,setSuccess] = useState(null);


    const onNewItemsChange = (e,index) => {
        let name = e.target.name;
        let items = [...newItems];
        let item = {...items[index]};
        item[name] = e.target.value;
        items[index] = item;
        setNewItems(items);
    }

    const onOldItemsChange = (e,index) => {
        let name = e.target.name;
        let items = [...oldItems];
        let item = {...items[index]};
        item[name] = e.target.value;
        items[index] = item;
        setOldItems(items);
    }


    useEffect(()=>{ 
        const state = location.state
         
        if(state){
            dispatch(getInvoiceDetails(state));
            setInvoiceId(state);
            invoice_details.items.forEach((item)=>{
                oldItems.push( {
                    id: item.id,
                    item: item.item,
                    description: item.description,
                    qty: item.qty,
                    unit_price: item.unit_price,
                    discount: item.discount,
                    account_id: item.account_id,
                    tax_rate: item.tax_rate,
                    tax_amount: item.tax_rate,
                    sub_total: item.sub_total,
                    total_amount: item.total_amount
                })
            })
            
        }else{
            setNewItems([items])
        }
        dispatch(getAllContact());   
        dispatch(getCurrency());   
        dispatch(getChartAccount());   
    },[])
    

    const onSubmit = (e) =>{
        e.preventDefault();
        setRloading(true);
        let formatDate = format(new Date(date),'yyyy-MM-dd');
        let formatDueDate = format(new Date(due_date),'yyyy-MM-dd');
        api.create(`/api/invoice/`,{'invoice_no':invoiceNo,'contact_id':contactId,'date':formatDate,'due_date':formatDueDate,'reference':reference,'currency':currency,'tax_type':tax_type,'sub_total':sub_total,'discount':discount,'total_tax':total_tax,'status':status,'total_amount':total_amount,'items':newItems})
            .then(res=>{
                
                if(res.data.success){
                    setSuccess('Data Saved Successfully');
                    setRloading(false);
                }else{
                    setError(res.data.error)
                    
                }
                
            })
            .catch(err => {
                setError(err)
            })        
    }

    const onUpdate = (e) =>{
        e.preventDefault();
        setRloading(true);
        let formatDate = format(new Date(date),'yyyy-MM-dd');
        let formatDueDate = format(new Date(due_date),'yyyy-MM-dd');
        api.updatePatch(`/api/invoice/${invoiceId}`,{'invoice_no':invoiceNo,'contact_id':contactId,'date':formatDate,'due_date':formatDueDate,'reference':reference,'currency':currency,'tax_type':tax_type,'sub_total':sub_total,'discount':discount,'total_tax':total_tax,'status':status,'total_amount':total_amount,'items': oldItems,'new_items':newItems,'deleted_items':deletedItems})
            .then(res=>{
                
                if(res.data.success){
                    setSuccess('Data Updated Successfully');
                    setRloading(false);
                }else{
                    setError(res.data.error)
                    
                }
                
            })
            .catch(err => {
                setError(err)
            })        
    }
   

    return (
        <>
            
            <PageTitle
                breadCrumbItems={[
                    { label: 'Invoice', path: '/app/invoice', active: false },
                    { label: 'Invoice Form', path: '/app/invoice_form', active: true },
                ]}
                title={'Invoice Form'}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                                {!rloading && error && (
                                    <Alert variant="danger" className="my-2" onClose={() => setError(null)} dismissible>
                                        {error}
                                    </Alert>
                                )}
                                {!rloading && success && (
                                    <Alert variant="success" className="my-2" onClose={() => setSuccess(null)} dismissible>
                                        {success}
                                    </Alert>
                                )}
                                <Form onSubmit={(e)=>{oldItems ? onUpdate(e):onSubmit(e)}}>
                                <div className='mb-4'>
                                    <Row className='mb-3'>
                                    <Form.Group as={Col}>
                                        <Form.Label >Contact</Form.Label>
                                        
                                        <Form.Select
                                            aria-label="Default select example"
                                            required 
                                            onChange={(e)=>setContactId(e.target.value)}
                                            value={contactId}                                     
                                        >
                                            {cloading ? <option value="" disabled>Loading...</option>: 
                                            <>
                                            
                                                <option value="" disabled>Select Contact ...</option>  
                                                {contacts.length > 0 && contacts?.map((item)=>{
                                                    return(
                                                        <option key={'scontact'+item.id} value={item.id} >{item.name}</option>
                                                    )
                                                })} 
                                            
                                            </>
                                            }
                                        </Form.Select>                                        
                                        
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                    <Form.Label >Invoice No</Form.Label>
                                        <Form.Control
                                            type='text'
                                            required
                                            name='invoice_no'
                                            onChange={(e)=>setInvoiceNo(e.target.value)}
                                            defaultValue={invoice_details?.invoice_no}
                                        >

                                        </Form.Control>
                                    </Form.Group>
                                    
                                    <Form.Group as={Col}>
                                    <Form.Label >Date</Form.Label>
                                        <Form.Control
                                            type='date'
                                            required
                                            name='date'
                                            onChange={(e)=>setDate(e.target.value)}
                                            defaultValue={invoice_details?.date}
                                        >

                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                    <Form.Label >Due Date</Form.Label>
                                        <Form.Control
                                            type='date'
                                            required
                                            name='due_date'
                                            onChange={(e)=>setDueDate(e.target.value)}
                                            defaultValue={invoice_details?.due_date}
                                        >

                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                    <Form.Label >Reference</Form.Label>
                                        <Form.Control
                                            type='text'
                                            required
                                            name='reference'
                                            onChange={(e)=>setReference(e.target.value)}
                                            defaultValue={invoice_details?.reference}
                                        >

                                        </Form.Control>
                                    </Form.Group>
                                    </Row>

                                    {/* <Row className='mb-3'>
                                    
                                    <Form.Group as={Col}>
                                        <Form.Label >Currency</Form.Label>
                                        
                                        <Form.Select
                                            aria-label="Default select example"
                                            required 
                                            onChange={(e)=>setCurrency(e.target.value)}
                                            value={currency}                                     
                                        >
                                            {culoading ? <option value="" disabled>Loading...</option>: 
                                            <>
                                            
                                                <option value="" disabled>Select Currency ...</option>  
                                                {currencies.length > 0 && currencies?.map((item)=>{
                                                    return(
                                                        <option key={'curr'+item.id} value={item.id} >{item.currency_name}</option>
                                                    )
                                                })} 
                                            
                                            </>
                                            }
                                        </Form.Select>                                        
                                        
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label >Tax Type</Form.Label>
                                        
                                        <Form.Select
                                            aria-label="Default select example"
                                            required 
                                            onChange={(e)=>setTaxType(e.target.value)}
                                            value={tax_type}                                     
                                        >                                                                                        
                                            <option value="inclusive">Inclusive</option>  
                                            <option value="exclusive">Exclusive</option>  
                                            <option value="no_tax">No Tax</option>  
                                        </Form.Select>                                        
                                        
                                    </Form.Group>
                                    
                                    <Form.Group as={Col}>
                                    <Form.Label >Sub Total</Form.Label>
                                        <Form.Control
                                            type='text'
                                            required
                                            name='sub_total'
                                            onChange={(e)=>setSubTotal(e.target.value)}
                                            defaultValue={invoice_details?.sub_total}
                                        >

                                        </Form.Control>
                                    </Form.Group>
                                    
                                    </Row>

                                    <Row className='mb-3'>
                                    <Form.Group as={Col}>
                                    <Form.Label >discount</Form.Label>
                                        <Form.Control
                                            type='text'
                                            required
                                            name='discount'
                                            onChange={(e)=>setDiscount(e.target.value)}
                                            defaultValue={invoice_details?.discount}
                                        >

                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                    <Form.Label >Total Tax</Form.Label>
                                        <Form.Control
                                            type='text'
                                            required
                                            name='total_tax'
                                            onChange={(e)=>setTotalTax(e.target.value)}
                                            defaultValue={invoice_details?.total_tax}
                                        >

                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label >Status</Form.Label>
                                        
                                        <Form.Select
                                            aria-label="Default select example"
                                            required 
                                            onChange={(e)=>setStatus(e.target.value)}
                                            value={status}                                     
                                        >                                            
                                            <option value="draft" >Draft</option>                                                  
                                            <option value="waiting" >Waiting</option>                                                  
                                            <option value="approve" >Approve</option>                                                  
                                            <option value="paid" >Paid</option>                                                  
                                        </Form.Select>                                        
                                        
                                    </Form.Group>
                                    
                                    <Form.Group as={Col}>
                                    <Form.Label >Total Amount</Form.Label>
                                        <Form.Control
                                            type='text'
                                            required
                                            name='total_amount'
                                            onChange={(e)=>setTotalAmount(e.target.value)}
                                            defaultValue={invoice_details?.total_amount}
                                        >

                                        </Form.Control>
                                    </Form.Group>                                                            
                                    </Row> */}

                                    </div>
                                    <Form.Label>Items:</Form.Label>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                            <th>Item</th>
                                            <th>Description</th>
                                            <th>Quantity</th>
                                            <th>Unit Price</th>
                                            <th>Discount</th>
                                            <th>Account</th>
                                            <th>Tax Rate</th>
                                            <th>Tax Amount</th>
                                            <th>Sub Total</th>
                                            <th>Total Amount</th>
                                            <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {oldItems && oldItems.length > 0 && oldItems.map((item,index)=>{
                                                return (
                                                <tr key={'tr'+index}>
                                                <td>
                                                    <Form.Group>
                                                        <Form.Control
                                                            type='text'
                                                            required
                                                            name='item'
                                                            onChange={(e)=>onOldItemsChange(e,index)}
                                                            defaultValue={item?.item}
                                                        >

                                                        </Form.Control>
                                                    </Form.Group>
                                                </td>
                                                <td>
                                                    <Form.Group>
                                                        <Form.Control
                                                            as='textarea'
                                                            rows='1'
                                                            required
                                                            name='description'
                                                            onChange={(e)=>onOldItemsChange(e,index)}
                                                            defaultValue={item?.description}
                                                        >

                                                        </Form.Control>
                                                    </Form.Group>
                                                </td>
                                                <td>
                                                    <Form.Group>
                                                        <Form.Control
                                                            type='text'
                                                            required
                                                            name='qty'
                                                            onChange={(e)=>onOldItemsChange(e,index)}
                                                            defaultValue={item?.qty}
                                                        >

                                                        </Form.Control>
                                                    </Form.Group>
                                                </td>
                                                <td>
                                                    <Form.Group>
                                                        <Form.Control
                                                            type='text'
                                                            required
                                                            name='unit_price'
                                                            onChange={(e)=>onOldItemsChange(e,index)}
                                                            defaultValue={item?.unit_price}
                                                        >

                                                        </Form.Control>
                                                    </Form.Group>
                                                </td>
                                                <td>
                                                    <Form.Group>
                                                        <Form.Control
                                                            type='text'
                                                            required
                                                            name='discount'
                                                            onChange={(e)=>onOldItemsChange(e,index)}
                                                            defaultValue={item?.discount}
                                                        >

                                                        </Form.Control>
                                                    </Form.Group>
                                                </td>
                                                <td>
                                                    <Form.Group as={Col}>
                                                        
                                                        
                                                        <Form.Select
                                                            aria-label="Default select example"
                                                            required 
                                                            name='account_id'
                                                            onChange={(e)=>onOldItemsChange(e,index)}
                                                                                                
                                                        >
                                                            {chloading ? <option value="" disabled>Loading...</option>: 
                                                            <>
                                                            
                                                                <option value="" disabled>Select Chart Account ...</option>  
                                                                {accounts.length > 0 && accounts?.map((item)=>{
                                                                    return(
                                                                        <option key={'aco'+item.id} value={item.id} >{item.account_name}</option>
                                                                    )
                                                                })} 
                                                            
                                                            </>
                                                            }
                                                        </Form.Select>                                        
                                                        
                                                    </Form.Group>
                                                </td>
                                                <td>
                                                    <Form.Group>
                                                        <Form.Control
                                                            type='text'
                                                            required
                                                            name='tax_rate'
                                                            onChange={(e)=>onOldItemsChange(e,index)}
                                                            defaultValue={item?.tax_rate}
                                                        >

                                                        </Form.Control>
                                                    </Form.Group>
                                                </td>
                                                <td>
                                                    <Form.Group>
                                                        <Form.Control
                                                            type='text'
                                                            required
                                                            name='tax_amount'
                                                            onChange={(e)=>onOldItemsChange(e,index)}
                                                            defaultValue={item?.tax_amount}
                                                        >

                                                        </Form.Control>
                                                    </Form.Group>
                                                </td>
                                                <td>
                                                    <Form.Group>
                                                        <Form.Control
                                                            type='text'
                                                            required
                                                            name='sub_total'
                                                            onChange={(e)=>onOldItemsChange(e,index)}
                                                            defaultValue={item?.sub_total}
                                                        >

                                                        </Form.Control>
                                                    </Form.Group>
                                                </td>
                                                <td>
                                                    <Form.Group>
                                                        <Form.Control
                                                            type='text'
                                                            required
                                                            name='total_amount'
                                                            onChange={(e)=>onOldItemsChange(e,index)}
                                                            defaultValue={item?.total_amount}
                                                        >

                                                        </Form.Control>
                                                    </Form.Group>
                                                </td>
                                                <td>
                                                <Link to="#" className="d-flex justify-content-center align-items-center " style={{backgroundColor: '#1299dd',color: '#fff',height:'30px'}} onClick={()=>{oldItems.splice(index,1);deletedItems.push(item.id)}}>
                                                    <i className="mdi mdi-close"></i>
                                                </Link>
                                                </td>
                                            </tr>)
                                            })}
                                            {newItems.length > 0 && newItems.map((item,index)=>{
                                                return (
                                                <tr key={'tr'+index}>
                                                <td>
                                                    <Form.Group>
                                                        <Form.Control
                                                            type='text'
                                                            required
                                                            name='item'
                                                            onChange={(e)=>onNewItemsChange(e,index)}
                                                            defaultValue={item?.item}
                                                        >

                                                        </Form.Control>
                                                    </Form.Group>
                                                </td>
                                                <td>
                                                    <Form.Group>
                                                        <Form.Control
                                                            as='textarea'
                                                            rows='1'
                                                            required
                                                            name='description'
                                                            onChange={(e)=>onNewItemsChange(e,index)}
                                                            defaultValue={item?.description}
                                                        >

                                                        </Form.Control>
                                                    </Form.Group>
                                                </td>
                                                <td>
                                                    <Form.Group>
                                                        <Form.Control
                                                            type='text'
                                                            required
                                                            name='qty'
                                                            onChange={(e)=>onNewItemsChange(e,index)}
                                                            defaultValue={item?.qty}
                                                        >

                                                        </Form.Control>
                                                    </Form.Group>
                                                </td>
                                                <td>
                                                    <Form.Group>
                                                        <Form.Control
                                                            type='text'
                                                            required
                                                            name='unit_price'
                                                            onChange={(e)=>onNewItemsChange(e,index)}
                                                            defaultValue={item?.unit_price}
                                                        >

                                                        </Form.Control>
                                                    </Form.Group>
                                                </td>
                                                <td>
                                                    <Form.Group>
                                                        <Form.Control
                                                            type='text'
                                                            required
                                                            name='discount'
                                                            onChange={(e)=>onNewItemsChange(e,index)}
                                                            defaultValue={item?.discount}
                                                        >

                                                        </Form.Control>
                                                    </Form.Group>
                                                </td>
                                                <td>
                                                    <Form.Group as={Col}>
                                                        
                                                        
                                                        <Form.Select
                                                            aria-label="Default select example"
                                                            required
                                                            name='account_id' 
                                                            onChange={(e)=>onNewItemsChange(e,index)}
                                                                                                 
                                                        >
                                                            {chloading ? <option value="" disabled>Loading...</option>: 
                                                            <>
                                                            
                                                                <option value="" disabled>Select Chart Account ...</option>  
                                                                {accounts.length > 0 && accounts?.map((item)=>{
                                                                    return(
                                                                        <option key={'acn'+item.id} value={item.id} >{item.account_name}</option>
                                                                    )
                                                                })} 
                                                            
                                                            </>
                                                            }
                                                        </Form.Select>                                        
                                                        
                                                    </Form.Group>
                                                </td>
                                                <td>
                                                    <Form.Group>
                                                        <Form.Control
                                                            type='text'
                                                            required
                                                            name='tax_rate'
                                                            onChange={(e)=>onNewItemsChange(e,index)}
                                                            defaultValue={item?.tax_rate}
                                                        >

                                                        </Form.Control>
                                                    </Form.Group>
                                                </td>
                                                <td>
                                                    <Form.Group>
                                                        <Form.Control
                                                            type='text'
                                                            required
                                                            name='tax_amount'
                                                            onChange={(e)=>onNewItemsChange(e,index)}
                                                            defaultValue={item?.tax_amount}
                                                        >

                                                        </Form.Control>
                                                    </Form.Group>
                                                </td>
                                                <td>
                                                    <Form.Group>
                                                        <Form.Control
                                                            type='text'
                                                            required
                                                            name='sub_total'
                                                            onChange={(e)=>onNewItemsChange(e,index)}
                                                            defaultValue={item?.sub_total}
                                                        >

                                                        </Form.Control>
                                                    </Form.Group>
                                                </td>
                                                <td>
                                                    <Form.Group>
                                                        <Form.Control
                                                            type='text'
                                                            required
                                                            name='total_amount'
                                                            onChange={(e)=>onNewItemsChange(e,index)}
                                                            defaultValue={item?.total_amount}
                                                        >

                                                        </Form.Control>
                                                    </Form.Group>
                                                </td>
                                                <td>
                                                <Link to="#" className="d-flex justify-content-center align-items-center " style={{backgroundColor: '#1299dd',color: '#fff',height:'30px'}} onClick={()=>{newItems.splice(index,1)}}>
                                                    <i className="mdi mdi-close"></i>
                                                </Link>
                                                </td>
                                            </tr>)
                                            })}
                                            
                                            
                                        </tbody>
                                    </Table>    
                                    {/* <Card key={'tr2'+index}>
                                        <Card.Header>
                                            <div className='d-flex justify-content-between'>
                                                <p>item: {++itemCount}</p>
                                                <Link to="#" className="d-flex justify-content-center align-items-center " style={{backgroundColor: '#1299dd',color: '#fff',height:'30px',width:'30px'}} onClick={()=>{newItems.splice(index,1)}}>
                                                    <i className="mdi mdi-close"></i>
                                                </Link>
                                            </div>
                                        </Card.Header>
                                        <Card.Body>
                                        <Row className='mb-3'>
                                        
                                        <Form.Group as={Col}>
                                            <Form.Label >Item:</Form.Label>
                                            <Form.Control
                                                type='text'
                                                required
                                                name='item'
                                                onChange={(e)=>onNewItemsChange(e,index)}
                                                defaultValue={item?.item}
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                                                                
                                        <Form.Group as={Col}>
                                            <Form.Label >Quantity:</Form.Label>
                                            <Form.Control
                                                type='text'
                                                required
                                                name='qty'
                                                onChange={(e)=>onNewItemsChange(e,index)}
                                                defaultValue={item?.qty}
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                    
                                        <Form.Group as={Col}>
                                            <Form.Label >Unit Price:</Form.Label>
                                            <Form.Control
                                                type='text'
                                                required
                                                name='unit_price'
                                                onChange={(e)=>onNewItemsChange(e,index)}
                                                defaultValue={item?.unit_price}
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                    
                                        <Form.Group as={Col}>
                                            <Form.Label >Discount:</Form.Label>
                                            <Form.Control
                                                type='text'
                                                required
                                                name='discount'
                                                onChange={(e)=>onNewItemsChange(e,index)}
                                                defaultValue={item?.discount}
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                        </Row>
                                        <Row className='mb-3'>
                                        <Form.Group as={Col}>
                                            <Form.Label >Chart Account:</Form.Label>                                                    
                                            <Form.Select
                                                aria-label="Default select example"
                                                required 
                                                onChange={(e)=>onNewItemsChange(e,index)}
                                                                                    
                                            >
                                                {chloading ? <option value="" disabled>Loading...</option>: 
                                                <>
                                                
                                                    <option value="" disabled>Select Chart Account ...</option>  
                                                    {accounts.length > 0 && accounts?.map((item)=>{
                                                        return(
                                                            <option key={'aco'+item.id} value={item.id} >{item.account_name}</option>
                                                        )
                                                    })} 
                                                
                                                </>
                                                }
                                            </Form.Select>                                        
                                            
                                        </Form.Group>
                                    
                                        <Form.Group as={Col}>
                                            <Form.Label >Tax Rate:</Form.Label>
                                            <Form.Control
                                                type='text'
                                                required
                                                name='tax_rate'
                                                onChange={(e)=>onNewItemsChange(e,index)}
                                                defaultValue={item?.tax_rate}
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                    
                                        <Form.Group as={Col}>
                                            <Form.Label >Tax Amount:</Form.Label>
                                            <Form.Control
                                                type='text'
                                                required
                                                name='tax_amount'
                                                onChange={(e)=>onNewItemsChange(e,index)}
                                                defaultValue={item?.tax_amount}
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                    
                                        <Form.Group as={Col}>
                                            <Form.Label >Sub Total:</Form.Label>
                                            <Form.Control
                                                type='text'
                                                required
                                                name='sub_total'
                                                onChange={(e)=>onNewItemsChange(e,index)}
                                                defaultValue={item?.sub_total}
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                        </Row>
                                        <Row>
                                        

                                        <Form.Group as={Col} xs={6}>
                                            <Form.Label >Description:</Form.Label>
                                            <Form.Control
                                                as='textarea'
                                                rows={3}
                                                required
                                                name='description'
                                                onChange={(e)=>onNewItemsChange(e,index)}
                                                defaultValue={item?.description}
                                            >
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                        <Form.Label >Total Amount:</Form.Label>
                                        <Form.Control
                                            type='text'
                                            required
                                            name='total_amount'
                                            onChange={(e)=>onNewItemsChange(e,index)}
                                            defaultValue={item?.total_amount}
                                        >

                                        </Form.Control>
                                    </Form.Group>
                                        <Form.Group as={Col}>

                                        </Form.Group>
                                        </Row>
                                        </Card.Body>
                                        
                                        
                                    </Card>                                    */}
                                    <div className="d-flex justify-content-between">

                                        <Button variant="info" type="button" className="waves-effect waves-light me-1" onClick={()=>setNewItems([...newItems,items])}>
                                            Add a new line
                                        </Button>
                                        <div>
                                        <Button variant="success" type="submit" className="waves-effect waves-light me-1" disabled={rloading}>
                                            {rloading ? 'Loaidng...': 'Save'}
                                        </Button>
                                        <Link
                                            to='/app/service'
                                            className=" btn waves-effect waves-light"
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

export default InvoiceForm;
