import React, { useEffect, useState } from 'react';
import { APICore } from '../../helpers/api/apiCore';
import CompanySettingsForm from '../Form/CompanySettingsForm';
import { Row, Col, Card, Form, Alert } from 'react-bootstrap';
import { withSwal } from 'react-sweetalert2';

// components
import Table from '../../components/Table';
import PageTitle from '../../components/PageTitle';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addCompanySetting, getCompanySettings, setCompanySettingsSuccessAlert, setCompanySettingsErrorAlert, setLogo } from '../../redux/actions';
import Pagination from '../../components/CustomPagination';



const api = new APICore();


// action column render
const ActionColumn = withSwal(({ row, swal }) => {
    /*
     *   modal handeling
     */
    const dispatch = useDispatch();
    const user_role = useSelector((state) => state.Role.user_role);
    const [show, setShow] = useState(false);
    const onCloseModal = () => setShow(false);
    const onOpenModal = () => { dispatch(setCompanySettingsErrorAlert('')); setShow(true) };


    /*
    handle form submission
    */
    const onSubmit = (formData) => {
        if (formData.type === 'text') {
            api.updatePatch(`/api/company_settings/${row.original.id}/`, { 'key': formData.key, 'type': formData.type, 'value': formData.value })
                .then(res => {

                    if (res?.data?.success) {
                        dispatch(getCompanySettings(10, 1));
                        dispatch(setCompanySettingsSuccessAlert('Company Setting Updated Successfully'));
                        onCloseModal()
                        setTimeout(() => {
                            dispatch(setCompanySettingsSuccessAlert(''));
                        }, 2000)
                    } else {
                        dispatch(setCompanySettingsErrorAlert(res.data.error));
                    }
                })
                .catch(err => {
                    dispatch(setCompanySettingsErrorAlert(err));
                })
        }
        else {
            // console.log('formData', formData)
            api.updateWithFile(`/api/company_settings/${row.original.id}/`, { 'key': formData.key, 'type': formData.type, 'value': formData.value[0] })
                .then(res => {
                    if (res?.data?.success) {
                        if (res?.data?.data?.key === 'logo') {
                            dispatch(setLogo(res?.data?.data))
                        }
                        dispatch(getCompanySettings(10, 1));
                        dispatch(setCompanySettingsSuccessAlert('Company Setting Updated Successfully'));
                        onCloseModal()
                        setTimeout(() => {
                            dispatch(setCompanySettingsSuccessAlert(''));
                        }, 2000)
                    } else {
                        dispatch(setCompanySettingsErrorAlert(res.data.error));
                    }
                })
                .catch(err => {
                    dispatch(setCompanySettingsErrorAlert(err));
                })
        }
    };

    return (
        <>
            {/* <Link to={{ pathname: '/app/client_details', state: row.original.id }} className="action-icon" >
                <i className="mdi mdi-eye"></i>
            </Link> */}

            {user_role.includes('change_companysettings') ?
                <Link to="#" className="action-icon" onClick={() => onOpenModal()}>
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link> :
                <Link to="#" className="action-icon" style={{ pointerEvents: 'none' }}>
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link>
            }

            {
                show ?
                    <CompanySettingsForm show={show} onHide={onCloseModal} onSubmit={onSubmit} company_settings={row.original} />
                    : null
            }
        </>
    );
});

const valueColumn = ({ row }) => {

    return <>
        {row.original.type === 'text' ?
            <p>{row.original.value_text}</p>
            : <img style={{ "height": '4rem', width: '5rem' }} src={row.original.value_file} alt="" />
        }
    </>
}





const columns = [

    {
        Header: 'Name',
        accessor: 'name',
        sort: true,
    },
    {
        Header: 'Value',
        accessor: 'value',
        sort: true,
        Cell: valueColumn,
    },
    // {
    //     Header: 'Type',
    //     accessor: 'type',
    //     sort: true,
    // },
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
    const user_role = useSelector((state) => state.Role.user_role);
    const loading = useSelector(state => state.CompanySettings.loading);
    const error = useSelector(state => state.CompanySettings.error);
    const success = useSelector(state => state.CompanySettings.success);
    const [pageSize, setPageSize] = useState(10);
    const [alertShow, setAlertShow] = useState(true);
    const [companyAttribute, setCompanyAttribute] = useState('');
    /*
     *   modal handeling
     */
    const [show, setShow] = useState(false);
    const onCloseModal = () => setShow(false);
    const onOpenModal = () => { dispatch(setCompanySettingsErrorAlert('')); setShow(true) };


    const visitPage = (page) => {
        dispatch(getCompanySettings(pageSize, page));
    };

    const previous_number = () => {
        dispatch(getCompanySettings(pageSize, previous));
    };

    const next_number = () => {
        dispatch(getCompanySettings(pageSize, next));
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
        dispatch(addCompanySetting({ 'key': formData.key, 'type': formData.type, 'value': formData.type === 'text' ? formData.value : formData.value[0] }));
        // onCloseModal();

    };


    useEffect(() => {
        dispatch(getCompanySettings(pageSize, 1));
    }, [pageSize])


    // Key attribute change to Name

     useEffect(() => {
        const attributeChange = company_settings.map((setting) => {
            let change = ((setting.key.replaceAll("_"," ")).charAt(0).toUpperCase() + (setting.key.replaceAll("_"," ")).slice(1));
            setting["name"] = change;
            return setting;
        });
        setCompanyAttribute(attributeChange)
     },[company_settings])


     // extra 
    //  const extra = company_settings.map((sets) => {
    //     let set = ((sets.key.replaceAll("_"," ")));
    //     console.log(set);
        
    //     for(let i=0; i<set.length; i++){
    //           let ch = set[i];
    //         //   console.log((ch).charAt(i).toUpperCase() + (ch).slice(1))
    //         }
         
    //  })
    

   
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
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <span className='me-2'>Show:</span>
                                        <Form.Select style={{ width: '40%' }} onChange={(e) => { setPageSize(e.target.value); dispatch(getCompanySettings(e.target.value, current_page)) }}>
                                            <option value='10'>10</option>
                                            <option value='15'>20</option>
                                            <option value='20'>30</option>
                                        </Form.Select>
                                    </div>
                                </Col>

                                <Col sm={8}>
                                    <div className="text-sm-end mt-2 mt-sm-0">
                                        {/* {user_role.includes('add_companysettings') ?
                                            <Button className="btn btn-success mb-2 me-1" onClick={onOpenModal}>
                                                <i className="mdi mdi-plus-circle me-1"></i> Add New
                                            </Button> :
                                            <>
                                            </>
                                        } */}

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

                            {loading ? <p>Loading...</p> :
                                <>
                                    {companyAttribute?.length > 0 ?
                                        <>
                                            <Table
                                                columns={columns}
                                                data={companyAttribute}
                                                pageSize={pageSize}
                                                isSortable={true}
                                                pagination={false}
                                                isSearchable={true}
                                                tableClass="table-nowrap table-hover"
                                                searchBoxClass=""
                                            />
                                            <Pagination visitPage={visitPage} previous_number={previous_number} next_number={next_number} total_page={total_page} current_page={current_page} active={active} />
                                        </>
                                        :
                                        'No company available!'}</>}

                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* add contact modal */}

            <CompanySettingsForm show={show} onHide={onCloseModal} onSubmit={onSubmit} />



        </>
    );
};

export default CompanySettings;
