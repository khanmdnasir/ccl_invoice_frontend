import React, { useState,useEffect } from 'react';
import { APICore } from '../../helpers/api/apiCore';

import { Row, Col, Card, Button,Form, Alert } from 'react-bootstrap';
import {useHistory, useLocation} from 'react-router-dom';
// components

import PageTitle from '../../components/PageTitle';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserRole } from '../../redux/actions';

const api = new APICore();



const RoleForm = () => {
    const dispatch = useDispatch();
    const location = useLocation()
    const role = location.state;
    const[permission,setPermission] = useState([]);
    const[error,setError] = useState(null);
    const[role_name,setRoleName] = useState('');
    const[role_permission,setRolePermission] = useState([]);
    const history = useHistory();

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(role){
            api.updatePatch(`/api/groups/${role.id}/`,{'name':role_name,'permissions':role_permission})
            .then(res=>{
                
                if(res.data.success){
                    dispatch(getUserRole());
                    history.push('/app/roles');
                }else{
                    setError(res.data.error)
                    
                }
                
            })
            .catch(err => {
                setError(err)
            })
        }else{
            api.create(`/api/groups/`,{'name':role_name,'permissions':role_permission})
            .then(res=>{
                
                if(res.data.success){
                    dispatch(getUserRole());
                    history.push('/app/roles');
                }else{
                    setError(res.data.error)
                    
                }
                
            })
            .catch(err => {
                setError(err)
            })
        }
        
    }

    const handleChange = (e) =>{
        const isChecked = e.target.checked;
        
        if(isChecked){
            setRolePermission([...role_permission,parseInt(e.target.value)  ]);
            
        }else{
            let index = role_permission.findIndex((x) => parseInt(x) === parseInt(e.target.value))
            role_permission.splice(index,1)
            setRolePermission([...role_permission])
            
        }
    }

    
    
    useEffect(()=>{
        api.get(`/api/permission`,{})
        .then(res=>{
            setPermission(res.data)
        })
        if (role){
            setRoleName(role?.name)
            const permissions = role?.permissions;
            const permissionsId = permissions.map(permission=>{
                return permission.id
            })
            setRolePermission(permissionsId)
        }
        
        
    },[])
    
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Roles', path: '/app/roles', active: false },
                    { label: 'Add Role', path: '/app/add_role', active: true },
                ]}
                title={'Add Role'}
            />

            
            <Card>
                <Card.Body>
                    
                    
                    
                        <Form onSubmit={handleSubmit}>
                        {error && (
                            <Alert variant="danger" className="my-2">
                                {error}
                            </Alert>
                        )}
                            <Form.Group  className="mb-3" style={{width: '20%'}}>
                                <Form.Label  >
                                    Role Name
                                </Form.Label>
                                <Form.Control type="text" name="name" value={role_name} placeholder="Enter Role Name"   onChange={(e)=>setRoleName(e.target.value)}  required/>
                            </Form.Group>  

                            <Row>
                                    <Card as={Col}>
                                        <Card.Header>
                                            <h5 className='me-2'>Contact</h5>
                                        </Card.Header>
                                        <Card.Body>
                                            <Row className='mb-4'>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="View" value='38' checked={role_permission.includes(38)} />                                                  
                                                </Form.Group>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Add" value='35' checked={role_permission.includes(35)} />                                                  
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Edit" value='36' checked={role_permission.includes(36)} />                                                  
                                                </Form.Group>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Delete" value='37' checked={role_permission.includes(37)} />                                                  
                                                </Form.Group>
                                            </Row>
                                        
                                        </Card.Body>
                                    </Card >
                                    <Card as={Col}>
                                        <Card.Header>
                                            <h5 className='me-2'>Service</h5>
                                        </Card.Header>
                                        <Card.Body>
                                            <Row className='mb-4'>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="View" value='54' checked={role_permission.includes(54)} />                                                  
                                                </Form.Group>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Add" value='51' checked={role_permission.includes(51)} />                                                  
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Edit" value='52' checked={role_permission.includes(52)} />                                                  
                                                </Form.Group>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Delete" value='53' checked={role_permission.includes(53)} />                                                  
                                                </Form.Group>
                                            </Row>
                                        
                                        </Card.Body>
                                    </Card >
                                    <Card as={Col}>
                                        <Card.Header>
                                            <h5 className='me-2'>Invoice</h5>
                                        </Card.Header>
                                        <Card.Body>
                                            <Row className='mb-4'>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="View" value='46' checked={role_permission.includes(46)} />                                                  
                                                </Form.Group>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Add" value='43' checked={role_permission.includes(43)} />                                                  
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Edit" value='44' checked={role_permission.includes(44)} />                                                  
                                                </Form.Group>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Delete" value='45' checked={role_permission.includes(45)} />                                                  
                                                </Form.Group>
                                            </Row>
                                        
                                        </Card.Body>
                                    </Card >
                                    <Card as={Col}>
                                        <Card.Header>
                                            <h5 className='me-2'>Repeating Invoice</h5>
                                        </Card.Header>
                                        <Card.Body>
                                            <Row className='mb-2'>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="View" value='50' checked={role_permission.includes(50)} />                                                  
                                                </Form.Group>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Add" value='47' checked={role_permission.includes(47)} />                                                  
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Edit" value='48' checked={role_permission.includes(48)} />                                                  
                                                </Form.Group>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Delete" value='49' checked={role_permission.includes(49)} />                                                  
                                                </Form.Group>
                                            </Row>
                                        
                                        </Card.Body>
                                    </Card >
                                    
                                
                            </Row>
                            <Row>
                                    <Card as={Col}>
                                        <Card.Header>
                                            <h5 className='me-2'>Role</h5>
                                        </Card.Header>
                                        <Card.Body>
                                            <Row className='mb-2'>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="View" value='12' checked={role_permission.includes(12)} />                                                  
                                                </Form.Group>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Add" value='9' checked={role_permission.includes(9)} />                                                  
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Edit" value='10' checked={role_permission.includes(10)} />                                                  
                                                </Form.Group>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Delete" value='11' checked={role_permission.includes(11)} />                                                  
                                                </Form.Group>
                                            </Row>
                                        
                                        </Card.Body>
                                    </Card >
                                    <Card as={Col}>
                                        <Card.Header>
                                            <h5 className='me-2'>User</h5>
                                        </Card.Header>
                                        <Card.Body>
                                            <Row className='mb-2'>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="View" value='28' checked={role_permission.includes(28)} />                                                  
                                                </Form.Group>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Add" value='25' checked={role_permission.includes(25)} />                                                  
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Edit" value='26' checked={role_permission.includes(26)} />                                                  
                                                </Form.Group>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Delete" value='27' checked={role_permission.includes(27)} />                                                  
                                                </Form.Group>
                                            </Row>
                                        
                                        </Card.Body>
                                    </Card >
                                    <Card as={Col}>
                                        <Card.Header>
                                            <h5 className='me-2'>Company Settings</h5>
                                        </Card.Header>
                                        <Card.Body>
                                            <Row className='mb-2'>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="View" value='106' checked={role_permission.includes(106)} />                                                  
                                                </Form.Group>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Add" value='103' checked={role_permission.includes(103)} />                                                  
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Edit" value='104' checked={role_permission.includes(104)} />                                                  
                                                </Form.Group>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Delete" value='105' checked={role_permission.includes(105)} />                                                  
                                                </Form.Group>
                                            </Row>
                                        
                                        </Card.Body>
                                    </Card >
                                    <Card as={Col}>
                                        <Card.Header>
                                            <h5 className='me-2'>Chart of Account</h5>
                                        </Card.Header>
                                        <Card.Body>
                                            <Row className='mb-2'>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="View" value='34' checked={role_permission.includes(34)} />                                                  
                                                </Form.Group>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Add" value='31' checked={role_permission.includes(31)} />                                                  
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Edit" value='32' checked={role_permission.includes(32)} />                                                  
                                                </Form.Group>
                                                <Form.Group as={Col}   onChange={(e)=>handleChange(e)}>                 
                                                    <Form.Check label="Delete" value='33' checked={role_permission.includes(33)} />                                                  
                                                </Form.Group>
                                            </Row>
                                        
                                        </Card.Body>
                                    </Card >
                                    
                                
                            </Row>
                            
                            
                            <Link to='/app/roles'>                           
                            <Button  variant="white" type='button'  style={{width:'15%',marginTop: '20px',marginRight: 5}} >
                                Back
                            </Button> 
                            </Link>
                            <Button  variant="primary" type='submit'  style={{width:'15%',marginTop: '20px'}}>
                                Save
                            </Button> 
                            

                        </Form>
                            
                            
                                                    
                </Card.Body>
            </Card>
                       

            
        </>
    );
};

export default RoleForm;
