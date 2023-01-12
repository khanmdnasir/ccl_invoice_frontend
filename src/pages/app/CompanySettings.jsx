import React, { useEffect, useState } from 'react';
import { APICore } from '../../helpers/api/apiCore';
import CompanySettingsForm from '../Form/CompanySettingsForm';
import { Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { withSwal } from 'react-sweetalert2';

// components
import Table from '../../components/Table';
import PageTitle from '../../components/PageTitle';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addCompanySetting, getCompanySettings, setCompanySettingsSuccessAlert, setCompanySettingsErrorAlert } from '../../redux/actions';
import ReactExport from "react-export-excel";
import Pagination from '../../components/CustomPagination';


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const api = new APICore();


// action column render
const ActionColumn = withSwal(({ row, swal }) => {
    /*
     *   modal handeling
     */
    const dispatch = useDispatch();
    const user_role = useSelector((state)=> state.Role.user_role);
    const [show, setShow] = useState(false);
    const onCloseModal = () => setShow(false);
    const onOpenModal = () => setShow(true);

    /*
    handle form submission
    */
    const onSubmit = (formData) => {
        
        api.updatePatch(`/api/company_settings/${row.original.id}/`,formData)
        .then(res=>{
            
            if(res.data.success){
                dispatch(getCompanySettings(10,1));
                onCloseModal()
                setTimeout(() => {
                    dispatch(setCompanySettingsSuccessAlert(''));
                }, 2000)
            }else{
                dispatch(setCompanySettingsErrorAlert(res.data.error));
            }
            
        })
        .catch(err => {
            dispatch(setCompanySettingsErrorAlert(err));
        })
    };

    return (
        <>
            {/* <Link to={{ pathname: '/app/client_details', state: row.original.id }} className="action-icon" >
                <i className="mdi mdi-eye"></i>
            </Link> */}

            {user_role.includes('change_companysettings') ?
                <Link to="#" className="action-icon" onClick={()=>onOpenModal()}>
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link>:
                <Link to="#" className="action-icon"  style={{pointerEvents: 'none'}}>
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link>
            }

            {
                show?
                <CompanySettingsForm show={show} onHide={onCloseModal} onSubmit={onSubmit} company_settings={row.original}/>
                :null
            }
        </>
    );
});

const columns = [
    
    {
        Header: 'Key',
        accessor: 'key',
        sort: true,
    },
    {
        Header: 'Value',
        accessor: 'value',
        sort: true,
    },
    {
        Header: 'Type',
        accessor: 'type',
        sort: true,
    },
    {
        Header: 'Action',
        accessor: 'action',
        sort: false,
        Cell: ActionColumn,
    },
];

const CompanySettings = () => {
    const dispatch = useDispatch();
    const company_settings = useSelector(state => state.CompanySettings.company_settings);
    const previous = useSelector(state => state.CompanySettings.previous);
    const next = useSelector(state => state.CompanySettings.next);
    const current_page = useSelector(state => state.CompanySettings.current_page);
    const total_page = useSelector(state => state.CompanySettings.total_page);
    const active = useSelector(state => state.CompanySettings.active);
    const user_role = useSelector((state)=> state.Role.user_role);
    const loading = useSelector(state => state.CompanySettings.loading);
    const error = useSelector(state => state.CompanySettings.error);
    const success = useSelector(state => state.CompanySettings.success);
    const [pageSize,setPageSize] = useState(10);
    const [alertShow, setAlertShow] = useState(true);
    /*
     *   modal handeling
     */
    const [show, setShow] = useState(false);
    const onCloseModal = () => setShow(false);
    const onOpenModal = () => setShow(true);

    const visitPage = (page) => {
        dispatch(getCompanySettings(pageSize,page));
    };

    const previous_number = () => {
        dispatch(getCompanySettings(pageSize,previous));
    };

    const next_number = () => {
        dispatch(getCompanySettings(pageSize,next));
    };

    useEffect(() => {
        if (success !== '') {
            onCloseModal();
        }
        dispatch(getCompanySettings(pageSize, 1));
        setTimeout(() => {
            dispatch(setCompanySettingsSuccessAlert(''));
        }, 2000)

    }, [success])

    /*
    handle form submission
    */
    const onSubmit = (formData) => {
        console.log('formdata', formData)

        dispatch(addCompanySetting(formData));
        onCloseModal();
        
    };


    useEffect(()=>{ 
        dispatch(getCompanySettings(pageSize,1));   
    },[pageSize])
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Company Settings', path: '/app/company_settings', active: true },
                ]}
                title={'Company Settings'}
            />

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            {!loading && success && (
                                <Alert variant="success" className="my-2" onClose={() => dispatch(setCompanySettingsSuccessAlert(''))} dismissible>
                                    {success}
                                </Alert>
                            )}
                            <Row className="mb-2">
                                <Col sm={4}>
                                    <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
                                        <span className='me-2'>Show:</span>
                                        <Form.Select style={{width: '40%'}} onChange={(e)=>{setPageSize(e.target.value);dispatch(getCompanySettings(e.target.value,current_page))}}>
                                            <option value='10'>10</option>
                                            <option value='15'>20</option>
                                            <option value='20'>30</option>
                                        </Form.Select>
                                    </div>
                                </Col>

                                <Col sm={8}>
                                    <div className="text-sm-end mt-2 mt-sm-0">
                                        {user_role.includes('add_companysettings') ?
                                            <Button className="btn btn-success mb-2 me-1" onClick={onOpenModal}>
                                            <i className="mdi mdi-plus-circle me-1"></i> Add New
                                            </Button>:
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
                            {company_settings.length > 0 ?
                            <>
                            <Table
                                columns={columns}
                                data={company_settings}
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
                            'No user available!'}</>}
                            
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* add contact modal */}
            
            <CompanySettingsForm show={show} onHide={onCloseModal} onSubmit={onSubmit}/>
            
            
            
        </>
    );
};

export default CompanySettings;
