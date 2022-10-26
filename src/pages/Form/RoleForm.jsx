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
            api.update(`/api/groups/${role.id}/`,{'name':role_name,'permissions':role_permission})
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
            console.log(index)
            role_permission.splice(index,1)
            
        }
    }
    
    useEffect(()=>{
        api.get(`/api/permission`,{})
        .then(res=>{
            setPermission(res.data)
        })
        if (role){
            console.log('role', role)
            setRoleName(role?.name)
            setRolePermission(role?.permissions) //id gulo store hobe
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
                                {permission.map((item)=>{
                                    return(
                                        <Form.Group as={Col} sm={3} className="mb-3" key={item.id} onChange={handleChange}> 
                                                                       
                                            <Form.Check label={item.name} value={item.id}  defaultChecked={role && role_permission.includes(item.id) ? true:false} />                              
                                                                          
                                        </Form.Group>
                                    )
                                })}
                                
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
