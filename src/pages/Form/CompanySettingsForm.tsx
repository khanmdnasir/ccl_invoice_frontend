import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { RootState, AppDispatch } from '../../redux/store';
// components
import { FormInput } from '../../components';
import { APICore } from '../../helpers/api/apiCore';
import { useDispatch, useSelector } from 'react-redux';
import { setCompanySettingsErrorAlert } from '../../redux/actions';

const api = new APICore();

interface FormData {
    key: string;
    type: any;
    value: string;
}

interface AddCompanySettingProps {
    show: boolean;
    onHide: () => void;
    company_settings: FormData;
    onSubmit: (value: any) => void;
}

const CompanySettingsForm = ({ show, onHide, onSubmit, company_settings }: AddCompanySettingProps) => {
    /*
    form validation schema
    */

    const dispatch = useDispatch<AppDispatch>();
    const [dataType, setDataType] = useState(company_settings?.type ? company_settings?.type : "text")
    const error = useSelector((state: RootState) => state.CompanySettings.error);
    const loading = useSelector((state: RootState) => state.CompanySettings.loading);
    const schemaResolver = yupResolver(
        yup.object().shape({
            key: yup.string().required('Please enter key'),
            type: yup.string().required('Please select type').typeError('Please select client type'),
            value: yup.mixed().required('Please enter value')
        })
    );

    const methods = useForm<Partial<FormData>>({
        defaultValues: { key: company_settings?.key, value: company_settings?.type === "text" ? company_settings?.value : '', type: company_settings?.type },
        resolver: schemaResolver,
    });
    const {
        handleSubmit,
        register,
        reset,
        setValue,
        getValues,
        control,
        formState: { errors },
    } = methods;

    // console.log('company_settings',company_settings)
    // console.log('dataType',dataType)
    // console.log('company_settings',company_settings)
    return (
        <>
            <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header className="bg-light" onHide={onHide} closeButton>
                    <Modal.Title className="m-0">Add Company Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    {!loading && error && (
                        <Alert variant="danger" className="my-2" onClose={() => dispatch(setCompanySettingsErrorAlert(''))} dismissible>
                            {error}
                        </Alert>
                    )}
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col>

                                <FormInput
                                    label="Key"
                                    type="text"
                                    name="key"
                                    labelClassName='required'
                                    placeholder="Enter key"
                                    containerClass={'mb-3'}
                                    register={register}
                                    errors={errors}
                                    control={control}
                                />

                                <FormInput
                                    label="Value"
                                    type={dataType !== undefined || dataType !== null ? dataType : "text"}
                                    name="value"
                                    labelClassName='required'
                                    placeholder="Enter value"
                                    containerClass={'mb-3'}
                                    register={register}
                                    errors={errors}
                                    control={control}
                                />
                            </Col>
                            <Col>
                                <FormInput
                                    label="Type"
                                    type="select"
                                    name="type"
                                    labelClassName='required'
                                    containerClass={'mb-3'}
                                    register={register}
                                    errors={errors}
                                    control={control}
                                    onChange={(e) => { setDataType(e?.target?.value); setValue('value', '') }}
                                    defaultValue={company_settings?.type}
                                >
                                    <option value="text">Text</option>
                                    <option value="file">File</option>
                                </FormInput>

                            </Col>

                        </Row>


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

                    </Form>


                </Modal.Body>
            </Modal>
        </>
    );
};

export default CompanySettingsForm;
