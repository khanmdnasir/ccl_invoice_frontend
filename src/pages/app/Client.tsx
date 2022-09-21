import React,{ useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom'; 
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// components
import PageTitle from '../../components/PageTitle';
import { useSelector,useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { APICore } from '../../helpers/api/apiCore';

const api = new APICore()

interface FormValues {
        name: string;
        email: string;
        contact: string;
        website: string;
        address: string;
        postal_code: number;
              
}





const Client = () => {
    const[isEdit,setIsEdit] = useState(false);
    const [company_details,setCompanyDetails] = useState<Partial<FormValues>>({});
    const user_role = useSelector((state:RootState)=> state.Role.user_role);
    const { user } = useSelector((state: RootState) => ({
        user: state.Auth.user,
    }));


    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required('Please enter name'),
            email: yup.string().required('Please enter email'),
            contact: yup.string().required('Please enter contact'),
            
        })
    );

    /*
     * form methods
     */
    const methods = useForm<Partial<FormValues>>({
        defaultValues: company_details,
        resolver: schemaResolver,
    });
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = methods;

    useEffect(()=>{
        api.get(`/api/company_profile/`,{})
        .then(res=>{
            setCompanyDetails(res.data);
            reset(res.data)
        })
        .catch(err => console.log(err))
    },[])

    

    const onSubmit = (formData:FormValues) =>{
        api.updatePatch(`/api/company/${user.company}/`,formData)
        .then(res=>{
            
            if(res.data.success){
                setIsEdit(!isEdit);
                setCompanyDetails(res.data);
            }else{
                console.log(res.data.error)
                
            }
            
        })
        .catch(err => {
            console.log(err)
        })
        
    }

   
    
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Company Profile', path: '/app/company_profile', active: true },
                ]}
                title={'Company Profile'}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                        
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Row>
                                        <Col>
                                            <Form.Group  className="mb-3">
                                                <Form.Label  >
                                                    Company Name
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="Enter Company Name"  readOnly={isEdit ? false:true} size='lg' {...register('name')}/>
                                                {errors.name?.message && <p style={{color: 'red'}}>{errors.name?.message}</p>}
                                            </Form.Group>
                                            <Form.Group  className="mb-3">
                                                <Form.Label  >
                                                    Company Email
                                                </Form.Label>
                                                <Form.Control type="email" placeholder="Enter Company Email"  readOnly={isEdit ? false:true} size='lg' {...register('email')}/>
                                                {errors.email?.message && <p style={{color: 'red'}}>{errors.email?.message}</p>}
                                            </Form.Group>
                                            <Form.Group  className="mb-3">
                                                <Form.Label  >
                                                    Contact
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="Enter Company Contact"  readOnly={isEdit ? false:true} size='lg' {...register('contact')}/>
                                                {errors.contact?.message && <p style={{color: 'red'}}>{errors.contact?.message}</p>}
                                            </Form.Group>
                                            <Form.Group  className="mb-3">
                                                <Form.Label  >
                                                    Website
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="Enter Website"  readOnly={isEdit ? false:true} size='lg' {...register('website')}/>
                                                
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group  className="mb-3">
                                                <Form.Label  >
                                                    Address
                                                </Form.Label>
                                                <Form.Control  type="text" placeholder="Enter Address" as="textarea" rows={3}  readOnly={isEdit ? false:true} {...register('address')}/>
                                                
                                            </Form.Group>
                                            <Form.Group  className="mb-3">
                                                <Form.Label  >
                                                    Postal Code
                                                </Form.Label>
                                                <Form.Control type="number" placeholder="Enter Postal Code"  readOnly={isEdit ? false:true} size='lg' {...register('postal_code')}/>
                                                
                                            </Form.Group>
                                            
                                        </Col>
                                    </Row>
                                    
                                    {isEdit ?  
                                    <>                            
                                    <Button  variant="white" type='button'  style={{width:'15%',marginTop: '20px',marginRight: 5}} onClick={()=>setIsEdit(!isEdit)}>
                                        Cancel
                                    </Button> 
                                    <Button  variant="primary" type='submit'  style={{width:'15%',marginTop: '20px'}}>
                                        Save
                                    </Button> 
                                    </>
                                    :
                                    <>
                                    { user_role.includes('change_company') ?
                                        <Button  variant="primary" type='button'  style={{width:'15%',marginTop: '20px'}} onClick={()=>setIsEdit(!isEdit)}>
                                            <FeatherIcon icon="edit" size={15} className="me-2"/>Edit
                                        </Button>:
                                        ""
                                    }
                                    </>
                                    
                                    }

                                </Form>
                                    
                                    
                                                           
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Client;
