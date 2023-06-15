import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns'
// components
import PageTitle from '../../components/PageTitle';
import ContactForm from '../Form/ContactForm';
import { useSelector, useDispatch } from 'react-redux';
import { APICore } from '../../helpers/api/apiCore';
import { getAllContact,addContact, getChartAccount, getContactService,getCountry,getAllKam,setContactErrorAlert,setContactSuccessAlert, getInvoiceDetails, getContact, getContactServices } from '../../redux/actions';
import moment from "moment";
import CreatableSelect from "react-select/creatable";


const api = new APICore()




const InvoiceForm = () => {
    const location = useLocation();
    const history = useHistory();
    const scurrency = useSelector(state => state.Currency.selectedCurrency)
    
    const dispatch = useDispatch();
    const country = useSelector(state => state.Location.country);
    const all_kam = useSelector(state => state.Kam.all_kam);
    const contacts = useSelector((state) => state.Contact.all_contact);
    const accounts = useSelector((state) => state.ChartAccount.accounts);
    const cloading = useSelector((state) => state.Contact.loading);
    const chloading = useSelector((state) => state.ChartAccount.loading);
    const [rloading, setRloading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);


    const [oldItems, setOldItems] = useState([]);
    const invoice_details = useSelector((state) => state.Invoice.invoice_details);
    const contact_services = useSelector((state) => state.Service.services);
    const [contact, setContact] = useState();
    const [stateContact, setStateContact] = useState();
    const [contactId, setContactId] = useState('');
    const [invoiceId, setInvoiceId] = useState(null);
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
    const [due_date, setDueDate] = useState('');
    const [reference, setReference] = useState('');
    const [currency, setCurrency] = useState('1');
    const [updateDateCount, setupdateDateCount] = useState(0);
    const [tax_type, setTaxType] = useState('exclusive');
    const [sub_total, setSubTotal] = useState('');
    const [discount, setDiscount] = useState('');
    const [total_tax, setTotalTax] = useState('');
    const [status, setStatus] = useState('draft');
    const [total_amount, setTotalAmount] = useState('');
    const [deletedItems, setDeletedItems] = useState([]);
    const [taxGroup, setTaxGroup] = useState({});


    const [items, setItems] = useState({
        item: '',
        description: '',
        qty: 1,
        unit_price: 0,
        discount: 0,
        account_id: null,
        tax_rate: 0,
        tax_amount: 0,
        sub_total: 0,
        total_amount: 0
    });
    const [newItems, setNewItems] = useState([]);

    const onContactChange = (e) => {
        setNewItems([])
        setContact(e);
        setContactId(e?.value);
        dispatch(getContactServices(e?.value));
    }

   
    const handleCreateContact = (inputValue) => {
        setContact({'label':inputValue,'value':''})
        setContactId(inputValue)
    }

    useEffect(()=>{
        if (invoiceId){
            if (updateDateCount===0){
                setupdateDateCount(1)
            }
            else if (updateDateCount>0){
                setDueDate(moment(date).add(7, 'days').format("YYYY-MM-DD"))
            }
        }
        else if (date){
            setDueDate(moment(date).add(7, 'days').format("YYYY-MM-DD"))
        }
    },[date])


    useEffect(() => {
        if (contact_services.length > 0) {
            const allItems = contact_services.map((item) => {
                return {
                    item: item.service_type,
                    description: '',
                    qty: 1,
                    unit_price: item.unit_price,
                    discount: '0',
                    account_id: '',
                    tax_rate: item.tax_rate,
                    tax_amount: (tax_type === 'inclusive' ?
                        ((((1 * item.unit_price) * (item.tax_rate && parseInt(item.tax_rate))) / (100 + (item.tax_rate && parseInt(item.tax_rate)))).toFixed(2))
                        : tax_type === 'exclusive' ?
                            (((1 * item.unit_price) / 100) * (item.tax_rate && parseInt(item.tax_rate)))
                            : 0
                    ),
                    sub_total: 1 * item.unit_price,
                    total_amount: 1 * item.unit_price
                }
            });

            setNewItems(allItems);
        }
        else {
            setNewItems([items])
        }


    }, [contact_services])

    const onNewItemsChange = (e, index) => {
        let name = e.target.name;
        let items = [...newItems];
        let item = { ...items[index] };
        item[name] = e.target.value;
        if (name === 'qty' || name === 'unit_price' || name === 'discount' || name === 'tax_rate') {

            item['sub_total'] = parseFloat(item['qty'] !== '' ? item['qty'] : 0) * parseFloat(item['unit_price'] !== '' ? item['unit_price'] : 0)
            item['sub_total'] -= ((parseFloat(item['sub_total']) * parseFloat(item['discount'] !== '' ? item['discount'] : 0)) / 100)

            if (tax_type === 'inclusive') {
                item['tax_amount'] = parseFloat((parseFloat(item['sub_total']) * parseFloat(item['tax_rate'] !== '' ? item['tax_rate'] : 0)) / (100 + parseFloat(item['tax_rate'] !== '' ? item['tax_rate'] : 0)))
            } else if (tax_type === 'exclusive') {
                item['tax_amount'] = parseFloat((parseFloat(item['sub_total']) / 100) * parseFloat(item['tax_rate'] !== '' ? item['tax_rate'] : 0))
            } else {
                item['tax_amount'] = 0
            }

            item['total_amount'] = parseFloat((item['sub_total']))
        }
        items[index] = item;
        setNewItems(items);
    }

    const onOldItemsChange = (e, index) => {
        let name = e.target.name;
        let items = [...oldItems];
        let item = { ...items[index] };
        item[name] = e.target.value;
        if (name === 'qty' || name === 'unit_price' || name === 'discount' || name === 'tax_rate') {

            item['sub_total'] = parseFloat(item['qty'] !== '' ? item['qty'] : 0) * parseFloat(item['unit_price'] !== '' ? item['unit_price'] : 0)
            item['sub_total'] -= ((parseFloat(item['sub_total']) * parseFloat(item['discount'] !== '' ? item['discount'] : 0)) / 100)

            if (tax_type === 'inclusive') {
                item['tax_amount'] = parseFloat((parseFloat(item['sub_total']) * parseFloat(item['tax_rate'] !== '' ? item['tax_rate'] : 0)) / (100 + parseFloat(item['tax_rate'] !== '' ? item['tax_rate'] : 0)))
            } else if (tax_type === 'exclusive') {
                item['tax_amount'] = parseFloat((parseFloat(item['sub_total']) / 100) * parseFloat(item['tax_rate'] !== '' ? item['tax_rate'] : 0))
            } else {
                item['tax_amount'] = 0
            }

            item['total_amount'] = parseFloat((item['sub_total']))
        }
        items[index] = item;
        setOldItems(items);
    }

    useEffect(() => {
        const groupOfTax = {}
        let total_discount = 0.0
        let total_subTotal = 0.00
        let total_taxAmount = 0.0
        newItems.forEach((item) => {
            total_discount += parseFloat((parseFloat(item.unit_price*item.qty) / 100) * parseFloat(item.discount));
            total_subTotal += parseFloat(item.total_amount);
            var item_tax_amount = 0;
            if (tax_type === 'inclusive') {
                item_tax_amount = parseFloat((parseFloat(item.sub_total) * parseFloat(item.tax_rate !== '' ? item.tax_rate : 0)) / (100 + parseFloat(item.tax_rate !== '' ? item.tax_rate : 0)))
            } else if (tax_type === 'exclusive') {
                item_tax_amount = parseFloat((parseFloat(item.sub_total) / 100) * parseFloat(item.tax_rate !== '' ? item.tax_rate : 0))
            } else {
                item_tax_amount = 0
            }
            total_taxAmount += parseFloat(item_tax_amount);

            if ((item.tax_rate).toString() in groupOfTax) {
                groupOfTax[(item.tax_rate).toString()] += parseFloat(parseFloat(item_tax_amount).toFixed(2));
                groupOfTax[(item.tax_rate).toString()] = parseFloat(parseFloat(groupOfTax[(item.tax_rate).toString()]).toFixed(2))
            }
            else {
                groupOfTax[(item.tax_rate).toString()] = parseFloat(parseFloat(item_tax_amount).toFixed(2));
                groupOfTax[(item.tax_rate).toString()] = parseFloat(parseFloat(groupOfTax[(item.tax_rate).toString()]).toFixed(2))
            }
        })


        oldItems.forEach((item) => {
            total_discount += parseFloat((parseFloat(item.unit_price*item.qty) / 100) * parseFloat(item.discount));
            total_subTotal += parseFloat(item.total_amount);

            var item_tax_amount = 0;
            if (tax_type === 'inclusive') {
                item_tax_amount = parseFloat((parseFloat(item.sub_total) * parseFloat(item.tax_rate !== '' ? item.tax_rate : 0)) / (100 + parseFloat(item.tax_rate !== '' ? item.tax_rate : 0)))
            } else if (tax_type === 'exclusive') {
                item_tax_amount = parseFloat((parseFloat(item.sub_total) / 100) * parseFloat(item.tax_rate !== '' ? item.tax_rate : 0))
            } else {
                item_tax_amount = 0
            }
            total_taxAmount += parseFloat(item_tax_amount);

            if ((item.tax_rate).toString() in groupOfTax) {
                groupOfTax[(item.tax_rate).toString()] += parseFloat(parseFloat(item_tax_amount).toFixed(2));
                groupOfTax[(item.tax_rate).toString()] = parseFloat(parseFloat(groupOfTax[(item.tax_rate).toString()]).toFixed(2))
            }
            else {
                groupOfTax[(item.tax_rate).toString()] = parseFloat(parseFloat(item_tax_amount).toFixed(2));
                groupOfTax[(item.tax_rate).toString()] = parseFloat(parseFloat(groupOfTax[(item.tax_rate).toString()]).toFixed(2))
            }
        })
        
        setDiscount(parseFloat(parseFloat(total_discount).toFixed(2)));
        setSubTotal(parseFloat(parseFloat(total_subTotal).toFixed(2)));
        setTotalTax(parseFloat(parseFloat(total_taxAmount).toFixed(2)));
        let totalAmount = parseFloat(parseFloat(parseFloat(total_subTotal) + (tax_type === 'exclusive' && parseFloat(total_taxAmount))).toFixed(2));
        setTotalAmount(totalAmount)
        setTaxGroup(groupOfTax)
    }, [newItems, oldItems, tax_type])

    useEffect(() => {
        const state = location.state
        
        dispatch(getAllContact());
        dispatch(getChartAccount());
        dispatch(getCountry());
        dispatch(getAllKam());
        
        if (state?.contactId) {
            setNewItems([])
            setStateContact(state.contactId);
            setContactId(state.contactId);
            dispatch(getContactServices(state.contactId));
        }else{
            if (state?.invoiceId) {
            
                dispatch(getInvoiceDetails(state.invoiceId));
                setInvoiceId(state.invoiceId);
                setNewItems([]);
    
            } else {
                setNewItems([items]);
                setOldItems([]);
                setInvoiceId(null);
            }
        }
        

    }, [])

    useEffect(() => {
        if (invoiceId) {
            setNewItems([]);
            setStateContact(invoice_details?.contact_id?.id);
            setContactId(invoice_details?.contact_id?.id);
            setTaxType(invoice_details?.tax_type);
            setDate(invoice_details?.date);
            setDueDate(invoice_details?.due_date);
            setReference(invoice_details?.reference);
            setStatus(invoice_details?.status);
            if (invoice_details?.items?.length > 0) {
                const allItems = invoice_details.items.map((item) => {
                    return {
                        id: item.id,
                        item: item.item,
                        description: item.description,
                        qty: item.qty,
                        unit_price: item.unit_price,
                        discount: item.discount,
                        account_id: item.account_id.id,
                        tax_rate: item.tax_rate,
                        tax_amount: item.tax_amount,
                        sub_total: item.sub_total,
                        total_amount: item.total_amount
                    }

                });
                setOldItems(allItems)
            }

        }

    }, [invoice_details])


    // console.log("newItems", newItems)
    // console.log("oldItems", oldItems)
    const onSubmit = (e) => {
        e.preventDefault();
        setRloading(true);
        setError(null);
        setSuccess(null);
        let formatDate = format(new Date(date), 'yyyy-MM-dd');
        let formatDueDate = format(new Date(due_date), 'yyyy-MM-dd');
        if(newItems.length > 0){
            api.create(`/api/invoice/`, { 'contact_id': contactId, 'date': formatDate, 'due_date': formatDueDate, 'reference': reference, 'currency': currency, 'tax_type': tax_type, 'sub_total': sub_total, 'discount': discount, 'total_tax': total_tax, 'status': status, 'total_amount': total_amount, 'items': newItems })
            .then(res => {

                if (res.data.success) {
                    setSuccess('Data Saved Successfully');
                    setRloading(false);
                    setTimeout(() => {
                        history.push('/app/invoice')
                    }, 2000);
                } else {
                    setError(res.data.error)
                    setRloading(false);

                }

            })
            .catch(err => {
                setError(err)
            })
        }else{
            setError("Please add at least one service")
        }
        
    }

    const onUpdate = (e) => {
        e.preventDefault();
        setRloading(true);
        setError(null);
        setSuccess(null);
        let formatDate = format(new Date(date), 'yyyy-MM-dd');
        let formatDueDate = format(new Date(due_date), 'yyyy-MM-dd');

        if(oldItems.length > 0){
            api.updatePatch(`/api/invoice/${invoiceId}/`, { 'contact_id': contactId, 'date': formatDate, 'due_date': formatDueDate, 'reference': reference, 'currency': currency, 'tax_type': tax_type, 'sub_total': sub_total, 'discount': discount, 'total_tax': total_tax, 'status': status, 'total_amount': total_amount, 'items': oldItems, 'new_items': newItems, 'deleted_items': deletedItems })
            .then(res => {

                if (res.data.success) {
                    setSuccess('Data Updated Successfully');
                    setRloading(false);
                    setTimeout(() => {
                        history.push('/app/invoice')
                    }, 2000);
                    
                } else {
                    setError(res.data.error)
                    setRloading(false);
                }

            })
            .catch(err => {
                setError(err)
            })
        }else{
            setRloading(false)
            setError("You have to add at least one service")
        }
        
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
                            <Form onSubmit={(e) => { oldItems.length > 0 ? onUpdate(e) : onSubmit(e) }}>
                                <div className='mb-4'>
                                    <Row className='mb-3'>
                                        <Form.Group as={Col}>
                                            <Form.Label className='required'>Client</Form.Label>
                                            { stateContact ?
                                            <Form.Select
                                                aria-label="Default select example"
                                                
                                                disabled={contactId}
                                                value={contactId}
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
                                            </Form.Select> :
                                            <CreatableSelect
                                                isClearable
                                                isDisabled={cloading || invoiceId ? true : false}
                                                isLoading={cloading}
                                                onCreateOption={handleCreateContact}
                                                required
                                                onChange={(e) => onContactChange(e)}
                                                value={contact}
                                                options={contacts.map((item) => {
                                                return {
                                                    label: item.name,
                                                    value: item.id,
                                                };
                                                })}
                                                isSearchable={true}
                                                className="block w-full min-w-0 flex-1 sm:text-sm"
                                            />}

                                        </Form.Group>

                                        {/* {invoiceId?
                                        <Form.Group as={Col}>
                                            <Form.Label>Invoice No</Form.Label>
                                            <Form.Control
                                                type='text'
                                                name='invoice_no'
                                                disabled={invoiceId ? true : false}
                                                defaultValue={invoiceId && invoice_details?.invoice_no}
                                            >
                                            </Form.Control>
                                        </Form.Group>
                                        : null
                                        } */}

                                        <Form.Group as={Col}>
                                            <Form.Label className='required'>Date</Form.Label>
                                            <Form.Control
                                                type='date'
                                                required
                                                name='date'
                                                onChange={(e) => setDate(e.target.value)}
                                                value={date}
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label className='required'>Due Date</Form.Label>
                                            <Form.Control
                                                type='date'
                                                required
                                                name='due_date'
                                                onChange={(e) => setDueDate(e.target.value)}
                                                value={due_date}
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label >Reference</Form.Label>
                                            <Form.Control
                                                type='text'
                                                
                                                name='reference'
                                                onChange={(e) => setReference(e.target.value)}
                                                defaultValue={invoiceId && invoice_details?.reference}
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label className='required'>Tax Type</Form.Label>

                                            <Form.Select
                                                aria-label="Default select example"
                                                required
                                                onChange={(e) => setTaxType(e.target.value)}
                                                value={tax_type}
                                            >
                                                <option value="inclusive">Inclusive</option>
                                                <option value="exclusive">Exclusive</option>
                                                <option value="no_tax">No Tax</option>
                                            </Form.Select>

                                        </Form.Group>
                                    </Row>



                                </div>
                                <Form.Label>Items:</Form.Label>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th className='required'>Item</th>
                                            <th >Description</th>
                                            <th className='required'>Quantity</th>
                                            <th className='required'>Unit Price</th>
                                            <th >Discount %</th>
                                            <th className='required'>Chart of Account</th>
                                            <th >Tax Rate %</th>

                                            <th >Total</th>

                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {oldItems && oldItems.length > 0 && oldItems.map((item, index) => {
                                            return (
                                                <tr key={'tr' + index}>
                                                    <td>
                                                        <Form.Group>
                                                            <Form.Control
                                                                type='text'
                                                                required
                                                                name='item'
                                                                onChange={(e) => onOldItemsChange(e, index)}
                                                                value={item?.item}
                                                            >

                                                            </Form.Control>
                                                        </Form.Group>
                                                    </td>
                                                    <td>
                                                        <Form.Group>
                                                            <Form.Control
                                                                as='textarea'
                                                                rows='1'
                                                                name='description'
                                                                onChange={(e) => onOldItemsChange(e, index)}
                                                                value={item?.description}
                                                            >

                                                            </Form.Control>
                                                        </Form.Group>
                                                    </td>
                                                    <td>
                                                        <Form.Group>
                                                            <Form.Control
                                                                type='number'
                                                                required
                                                                name='qty'
                                                                onChange={(e) => onOldItemsChange(e, index)}
                                                                value={item?.qty}
                                                            >

                                                            </Form.Control>
                                                        </Form.Group>
                                                    </td>
                                                    <td>
                                                        <Form.Group>
                                                            <Form.Control
                                                                type='number'
                                                                required
                                                                name='unit_price'
                                                                onChange={(e) => onOldItemsChange(e, index)}
                                                                value={item?.unit_price}
                                                            >

                                                            </Form.Control>
                                                        </Form.Group>
                                                    </td>
                                                    <td>
                                                        <Form.Group>
                                                            <Form.Control
                                                                type='number'
                                                                step="any"
                                                                min="0"
                                                                max="100"
                                                                name='discount'
                                                                onKeyDown={(event) => {
                                                                    event.preventDefault();
                                                                  }}
                                                                onChange={(e) => onOldItemsChange(e, index)}
                                                                value={item?.discount}
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
                                                                onChange={(e) => onOldItemsChange(e, index)}
                                                                value={item?.account_id}
                                                            >
                                                                {chloading ? <option value="" disabled>Loading...</option> :
                                                                    <>

                                                                        <option value="" disabled>Select Chart Account ...</option>
                                                                        {accounts.length > 0 && accounts?.map((item) => {
                                                                            return (
                                                                                <option key={'aco' + item.id} value={item.id} >{item.account_name}</option>
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
                                                                type='number'
                                                                step="any"
                                                                min="0"
                                                                max="100"
                                                                name='tax_rate'
                                                                onKeyDown={(event) => {
                                                                    event.preventDefault();
                                                                  }}
                                                                onChange={(e) => onOldItemsChange(e, index)}
                                                                value={item?.tax_rate}
                                                            >

                                                            </Form.Control>
                                                        </Form.Group>
                                                    </td>

                                                    <td>
                                                        <Form.Group>
                                                            <Form.Control
                                                                readOnly={true}
                                                                value={item?.total_amount}
                                                            >

                                                            </Form.Control>
                                                        </Form.Group>
                                                    </td>

                                                    <td>
                                                        <Link to="#" className="d-flex justify-content-center align-items-center " style={{ backgroundColor: '#1299dd', color: '#fff', height: '30px' }} onClick={() => {
                                                            oldItems.splice(index, 1);
                                                            setOldItems([...oldItems]);
                                                            deletedItems.push(item.id)
                                                        }}>
                                                            <i className="mdi mdi-close"></i>
                                                        </Link>
                                                    </td>
                                                </tr>)
                                        })}
                                        {newItems.length > 0 && newItems.map((item, index) => {
                                            return (
                                                <tr key={'tr' + index}>
                                                    <td>
                                                        <Form.Group>
                                                            <Form.Control
                                                                type='text'
                                                                required
                                                                name='item'
                                                                onChange={(e) => onNewItemsChange(e, index)}
                                                                value={item?.item}
                                                            >

                                                            </Form.Control>
                                                        </Form.Group>
                                                    </td>
                                                    <td>
                                                        <Form.Group>
                                                            <Form.Control
                                                                as='textarea'
                                                                rows='1'
                                                                
                                                                name='description'
                                                                onChange={(e) => onNewItemsChange(e, index)}
                                                                value={item?.description}
                                                            >

                                                            </Form.Control>
                                                        </Form.Group>
                                                    </td>
                                                    <td>
                                                        <Form.Group>
                                                            <Form.Control
                                                                type='number'
                                                                required
                                                                name='qty'
                                                                onChange={(e) => onNewItemsChange(e, index)}
                                                                value={item?.qty}
                                                            >

                                                            </Form.Control>
                                                        </Form.Group>
                                                    </td>
                                                    <td>
                                                        <Form.Group>
                                                            <Form.Control
                                                                type='number'
                                                                required
                                                                name='unit_price'
                                                                onChange={(e) => onNewItemsChange(e, index)}
                                                                value={item?.unit_price}
                                                            >

                                                            </Form.Control>
                                                        </Form.Group>
                                                    </td>
                                                    <td>
                                                        <Form.Group>
                                                            <Form.Control
                                                                type='number'
                                                                step="any"
                                                                min="0"
                                                                max="100"
                                                                name='discount'
                                                                onKeyDown={(event) => {
                                                                    event.preventDefault();
                                                                  }}
                                                                onChange={(e) => onNewItemsChange(e, index)}
                                                                value={item?.discount}
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
                                                                onChange={(e) => onNewItemsChange(e, index)}
                                                                value={item?.account_id}
                                                            >
                                                                {chloading ? <option value="" disabled>Loading...</option> :
                                                                    <>

                                                                        <option value="">Select Chart Account ...</option>
                                                                        {accounts.length > 0 && accounts?.map((item) => {
                                                                            return (
                                                                                <option key={'acn' + item.id} value={item.id} >{item.account_name}</option>
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
                                                                type='number'
                                                                step="any"
                                                                min="0"
                                                                max="100"
                                                                name='tax_rate'
                                                                onKeyDown={(event) => {
                                                                    event.preventDefault();
                                                                  }}
                                                                onChange={(e) => onNewItemsChange(e, index)}
                                                                value={item?.tax_rate}
                                                            >

                                                            </Form.Control>
                                                        </Form.Group>
                                                    </td>

                                                    <td>
                                                        <Form.Group>
                                                            <Form.Control
                                                                readOnly={true}
                                                                value={item?.total_amount}
                                                            >

                                                            </Form.Control>
                                                        </Form.Group>
                                                    </td>

                                                    <td>
                                                        <Link to="#" className="d-flex justify-content-center align-items-center " style={{ backgroundColor: '#1299dd', color: '#fff', height: '30px' }} onClick={() => {
                                                            newItems.splice(index, 1);
                                                            setNewItems([...newItems])

                                                        }}>
                                                            <i className="mdi mdi-close"></i>
                                                        </Link>
                                                    </td>
                                                </tr>)
                                        })}


                                    </tbody>
                                </Table>
                                <div className="d-flex justify-content-between">
                                    <div>
                                    <Button variant="primary" type="button"  className="waves-effect waves-light me-1" onClick={() => setNewItems([...newItems, items])} >
                                        Add a new line
                                    </Button>
                                    </div>
                                    <div >
                                        <div className="d-flex justify-content-between">
                                            <p style={{ fontSize: '20px' }}>Subtotal (discount {scurrency?.symbol} {discount?.toLocaleString()} )</p>
                                            <p style={{ fontSize: '20px', paddingLeft: '50px' }}>{scurrency?.symbol} {sub_total?.toLocaleString()}</p>
                                        </div>
                                    
                                        {Object.entries(taxGroup).map(item => {
                                            if (item[0] > 0) {
                                                return (
                                                    <div className="d-flex justify-content-between" >
                                                        <p style={{ fontSize: '20px' }}>Total Tax {item[0]}%</p>
                                                        <p style={{ fontSize: '20px', paddingLeft: '50px' }}>{scurrency?.symbol} {item[1]}</p>

                                                    </div>)
                                            }
                                        })}
                                        <hr></hr>
                                        <div className="d-flex justify-content-between">
                                            <p style={{ fontSize: '20px' }}>Total</p>
                                            <p style={{ fontSize: '20px', paddingLeft: '50px' }}>{scurrency?.symbol} {total_amount.toLocaleString()}</p>
                                        </div>
                                        <hr></hr><hr></hr>
                                    </div>
                                </div>
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

export default InvoiceForm;
