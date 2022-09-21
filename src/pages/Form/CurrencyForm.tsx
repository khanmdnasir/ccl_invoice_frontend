import { Modal, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// components
import { VerticalForm, FormInput } from '../../components';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface FormData {
    prefix: string;
    short_key: string;
    is_active: boolean; 
}



interface AddContactsProps {
    show: boolean;
    onHide: () => void;
    data: FormData;
    onSubmit: (value: any) => void;
}

const CurrencyForm = ({ show, onHide, onSubmit, data }: AddContactsProps) => {
    const [currencyName,setCurrencyName] = useState<string[]>([]);
    /*
    form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            prefix: yup.string().required('Please select prefix'),         
            short_key: yup.string().required('Please enter short key'),                 
        })
    );

    const getCurrencyRate = async() => { 
        const data = await axios.get('https://api.exchangerate.host/latest?base=USD', {transformRequest: (data, headers) => {
            delete headers.common['Authorization'];
            return data;
          }
        });
        const result = data.data.rates;

        setCurrencyName(Object.keys(result));
    }

    useEffect(()=>{ 
        getCurrencyRate();
    },[])  
    
    return (
        <>
            <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header className="bg-light" onHide={onHide} closeButton>
                    <Modal.Title className="m-0">Add Currency</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{prefix:data?.prefix,short_key:data?.short_key,is_active:data?.is_active}}>
                        <FormInput
                            label="Short Key"
                            type="select"
                            name="short_key"
                            placeholder="Enter Short Key"
                            containerClass={'mb-3'}
                        >
                            {currencyName?.map((item:any)=>{                               
                                return(
                                    <option key={item} value={item} >{item}</option>
                                )                                                                 
                            })}
                        </FormInput>
                        <FormInput
                            label="Prefix"
                            type="text"
                            name="prefix"
                            placeholder="Enter Prefix"
                            containerClass={'mb-3'}
                        />
                        
                        <FormInput type="checkbox"  label="Is Active" name="is_active" />
                        
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

export default CurrencyForm;
   