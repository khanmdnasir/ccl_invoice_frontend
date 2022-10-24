import React, { useEffect, useState } from 'react';
import { APICore } from '../../../helpers/api/apiCore';
import UserForm from '../../Form/UserForm';
import { Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { withSwal } from 'react-sweetalert2';
import config from '../../../config';
// components
import classNames from 'classnames';
import Table from '../../../components/Table';
import PageTitle from '../../../components/PageTitle';
import NoImage from '../../../assets/images/no_image.jpg';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, getRoles, getUser } from '../../../redux/actions';
import ReactExport from "react-export-excel";
import Pagination from '../../../components/CustomPagination';


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const api = new APICore();




// basic info column render
const BasicInfoColumn = ({ row }) => {
    return (
        <>
            {row.original.profile_image !== null ?
            <img src={config.API_URL+row.original.profile_image} alt='' className="me-2 rounded-circle" />:
            <img src={NoImage} alt='' className="me-2 rounded-circle" />}
            <Link to="#" className="text-body fw-semibold">
                {row.original.first_name}{' '}{row.original.last_name}
            </Link>
        </>
    );
};

/* status column render */
const StatusColumn = ({ row }) => {
    return (
        <React.Fragment>
            <span
                className={classNames('badge', {
                    'bg-soft-success text-success': row.original.is_active === true,
                    'bg-soft-danger text-danger': row.original.is_active === false,
                })}
            >

                {row.original.is_active ?
                    'active':'inactive'
                }
            </span>
        </React.Fragment>
    );
};



// action column render
const ActionColumn = withSwal(({ row, swal }) => {
    /*
     *   modal handeling
     */
    const dispatch = useDispatch();
    const user_role = useSelector((state)=> state.Role.user_role);
    const roles = useSelector(state => state.Role.roles);
    const [show, setShow] = useState(false);
    const onCloseModal = () => setShow(false);
    const onOpenModal = () => setShow(true);

    /*
    handle form submission
    */
    const onSubmit = (formData) => {
        api.update(`/api/users/${row.original.id}/`,{'first_name':formData['first_name'],'last_name':formData['last_name'],'email':formData['email'],'password':formData['password'],'phone':formData['phone'],'groups':[parseInt(formData['groups'])],'is_active':formData['is_active']})
        .then(res=>{
            
            if(res.data.success){
                dispatch(getUser(6,1));
            }else{
                swal.fire({
                    title: res.data.error,
                }) 
                
            }
            
        })
        .catch(err => {
            swal.fire({
                title: err,
            })
        })
        onCloseModal()
    };

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
                    api.delete(`/api/users/${row.original.id}/`)
                .then(res=>{
                    dispatch(getUser(6,1));
                    swal.fire(
                        'Deleted!',
                        'Account has been deleted.',
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
                    console.log('cancel')
                }
            })        
    }

    return (
        <>

            { user_role.includes('change_user') ?
                <Link to="#" className="action-icon" onClick={()=>onOpenModal()}>
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link>:
                <Link to="#" className="action-icon"  style={{pointerEvents: 'none'}}>
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link>
            }
            
            { user_role.includes('delete_user') ?
                <Link to="#" className="action-icon" onClick={()=>onDelete()}>
                    <i className="mdi mdi-delete"></i>
                </Link>:
                <Link to="#" className="action-icon" style={{pointerEvents: 'none'}}>
                    <i className="mdi mdi-delete"></i>
                </Link>
            }
            <UserForm show={show} onHide={onCloseModal} onSubmit={onSubmit} user={row.original} cgroups={roles}/>
        </>
    );
});

const columns = [
    {
        Header: 'Name',
        accessor: 'basic_info',
        sort: true,
        Cell: BasicInfoColumn,
        className: 'table-user',
    },
    {
        Header: 'Phone',
        accessor: 'phone',
        sort: true,
    },
    {
        Header: 'Email',
        accessor: 'email',
        sort: true,
    },
    {
        Header: 'Role',
        accessor: 'groups[0].name',
        sort: true,
    },
    {
        Header: 'Status',
        accessor: 'status',
        sort: true,
        Cell: StatusColumn
    },
    {
        Header: 'Action',
        accessor: 'action',
        sort: false,
        Cell: ActionColumn,
    },
];

const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.User.users);
    const previous = useSelector(state => state.User.previous);
    const next = useSelector(state => state.User.next);
    const current_page = useSelector(state => state.User.current_page);
    const total_page = useSelector(state => state.User.total_page);
    const active = useSelector(state => state.User.active);
    const roles = useSelector(state => state.Role.roles);
    const user_role = useSelector((state)=> state.Role.user_role);
    const loading = useSelector(state => state.User.loading);
    const error = useSelector(state => state.User.error);
    const [pageSize,setPageSize] = useState(6);
    /*
     *   modal handeling
     */
    const [show, setShow] = useState(false);
    const onCloseModal = () => setShow(false);
    const onOpenModal = () => setShow(true);

    const visitPage = (page) => {
        dispatch(getUser(pageSize,page));
    };

    const previous_number = () => {
        dispatch(getUser(pageSize,previous));
    };

    const next_number = () => {
        dispatch(getUser(pageSize,next));
    };

    /*
    handle form submission
    */
    const onSubmit = (formData) => {
        dispatch(addUser({'first_name':formData['first_name'],'last_name':formData['last_name'],'email':formData['email'],'password':formData['password'],'phone':formData['phone'],'groups':[parseInt(formData['groups'])],'is_active':formData['is_active']}));
        dispatch(getUser(pageSize,1));
        onCloseModal();
        
    };


    useEffect(()=>{ 
        dispatch(getUser(pageSize,1));   
        dispatch(getRoles(0,1));
    },[pageSize])
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Users', path: '/app/users', active: true },
                ]}
                title={'Users'}
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
                                        <Form.Select style={{width: '40%'}} onChange={(e)=>{setPageSize(e.target.value);dispatch(getUser(e.target.value,current_page))}}>
                                            <option value='6'>6</option>
                                            <option value='10'>10</option>
                                            <option value='15'>15</option>
                                            <option value='20'>20</option>
                                        </Form.Select>
                                    </div>
                                </Col>

                                <Col sm={8}>
                                    <div className="text-sm-end mt-2 mt-sm-0">
                                        { user_role.includes('add_user') ?
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
                            {users.length > 0 ?
                            <Table
                                columns={columns}
                                data={users}
                                pageSize={pageSize}
                                isSortable={true}
                                pagination={false}
                                isSearchable={true}
                                tableClass="table-nowrap table-hover"
                                searchBoxClass=""
                            />
                            :
                            'No user available!'}</>}
                            <Pagination visitPage={visitPage} previous_number={previous_number} next_number={next_number} total_page={total_page} current_page={current_page} active={active}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* add contact modal */}
            
            <UserForm show={show} onHide={onCloseModal} onSubmit={onSubmit} cgroups={roles}/>
            
            
            
        </>
    );
};

export default Users;
