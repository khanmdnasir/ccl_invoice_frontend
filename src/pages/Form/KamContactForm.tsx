import React, { useState, useEffect } from 'react';
import { Modal, Button,Form,Row,Col,Alert} from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { RootState, AppDispatch } from '../../redux/store';
// components
import { FormInput,VerticalForm } from '../../components';
import { APICore } from '../../helpers/api/apiCore';
import { useDispatch,useSelector } from 'react-redux';
import { setKamErrorAlert } from '../../redux/actions';

const api = new APICore();

interface FormData {
    name: string;
    phone: string;
    department: string;
}
    

interface AddKamProps {
    show: boolean;
    onHide: () => void;
    kam: FormData;
    onSubmit: (value: any) => void;
}

const KamContactForm = ({ show, onHide, onSubmit,kam,}: AddKamProps) => {
    /*
    form validation schema
    */
   
    const dispatch = useDispatch();
    const error = useSelector((state:RootState) => state.Kam.error);
    const loading = useSelector((state:RootState) => state.Kam.loading);
    const schemaResolver = yupResolver(
        yup.object().shape({
            name: yup.string().required('Please enter name'),
            phone: yup.string().required('Please enter phone number').typeError('Please enter number'),
            department: yup.string().required('Please enter department'),
                              
        })
    );

    // const methods = useForm<Partial<FormData>>({
    //     defaultValues: {name:kam?.name,phone:kam?.phone,department:kam?.department},
    //     resolver: schemaResolver,
    // });
    // const {
    //     handleSubmit,
    //     register,
    //     reset,
    //     setValue,
    //     control,
    //     formState: { errors },
    // } = methods;


    // useEffect(()=>{
    //     if(contact?.country){
    //         dispatch(getCity(contact?.country?.id))
    //     }
    // },[contact])
   
    // return (
    //     <>
    //         <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" centered>
    //             <Modal.Header className="bg-light" onHide={onHide} closeButton>
    //             <Modal.Title className="m-0">{kam ? "Edit Key Account Manager": "Add Key Account Manager" }</Modal.Title>
    //             </Modal.Header>
    //             <Modal.Body className="p-4">
    //             {!loading  && error && (
    //                 <Alert variant="danger" className="my-2" onClose={()=>dispatch(setKamErrorAlert(''))} dismissible>
    //                     {error}
    //                 </Alert>
    //             )}
    //                 <Form onSubmit={handleSubmit(onSubmit)}>
    //                     <Row>
    //                         <Col>
                                
    //                             <FormInput
    //                                 label="Name"
    //                                 type="text"
    //                                 name="name"
    //                                 labelClassName='required'
    //                                 placeholder="Enter Name"
    //                                 containerClass={'mb-3'}
    //                                 register={register}
    //                                 errors={errors}
    //                                 control={control}
                                    
    //                             />
                                
    //                             <FormInput
    //                                 label="Phone"
    //                                 type="text"
    //                                 name="phone"
    //                                 labelClassName='required'
    //                                 placeholder="ex: +8801XXXXXXX"
    //                                 containerClass={'mb-3'}
    //                                 register={register}
    //                                 errors={errors}
    //                                 control={control}
    //                             />
                                
                                
    //                         </Col>

    //                         <Col>
                              
    //                             <FormInput
    //                                 label="Department"
    //                                 type="text"
    //                                 name="department"
    //                                 labelClassName='required'
    //                                 placeholder="Enter department"
    //                                 containerClass={'mb-3'}
    //                                 register={register}
    //                                 errors={errors}
    //                                 control={control}
    //                             />
    //                         </Col>
                            
    //                     </Row>
                        
                         
    //                     <div className="text-end">
    //                         <Button variant="success" type="submit" className="waves-effect waves-light me-1">
    //                             Save
    //                         </Button>
    //                         <Button
    //                             variant="danger"
    //                             type="button"
    //                             className="waves-effect waves-light"
    //                             onClick={onHide}
    //                         >
    //                             Cancel
    //                         </Button>
    //                     </div>
                        
    //                 </Form>
                   
                    
    //             </Modal.Body>
    //         </Modal>
    //     </>
    // );
    return (
        <>
            <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header className="bg-light" onHide={onHide} closeButton>
                    <Modal.Title className="m-0">{kam ? "Edit Key Account Manager": "Add Key Account Manager" }</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    {!loading  && error && (
                        <Alert variant="danger" className="my-2" onClose={()=>dispatch(setKamErrorAlert(''))} dismissible>
                            {error}
                        </Alert>
                    )}
                    <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{name:kam?.name,phone:kam?.phone,department:kam?.department}}>
                        <FormInput
                            label="Name"
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            containerClass={'mb-3'}
                            labelClassName='required'
                        />
                        <FormInput
                            label="Phone"
                            type="text"
                            name="phone"
                            placeholder="ex: +8801XXXXXXX"
                            containerClass={'mb-3'}
                            labelClassName='required'
                        />

                        <FormInput
                            label="department"
                            type="text"
                            name="department"
                            placeholder="Enter department"
                            containerClass={'mb-3'}
                            labelClassName='required'
                        />

                       
                      

                        <div className="text-end">
                            <Button variant="success" type="submit" className="waves-effect waves-light me-1">
                                Save
                            </Button>
                            <Button
                                variant="danger"
                                type="button"
                                className="waves-effect waves-light"
                                onClick={onHide}
                            >
                                Cancel
                            </Button>
                        </div>
                    </VerticalForm>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default KamContactForm;
