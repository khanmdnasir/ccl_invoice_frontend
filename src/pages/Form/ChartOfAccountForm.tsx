import { Modal, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// components
import { VerticalForm, FormInput } from '../../components';

interface FormData {
    id: any;
    code: string;
    account_name: string;
    account_type: string;
    details: string;
    transaction_type: string;
}



interface AddChartOfAccountProps {
    show: boolean;
    onHide: () => void;
    chartOfAccount: FormData;
    onSubmit: (value: any) => void;
}

const ChartOfAccountForm = ({ show, onHide, onSubmit, chartOfAccount }: AddChartOfAccountProps) => {
    
    /*
    form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            code: yup.string().required('Please enter unique code'),
            account_name: yup.string().required('Please enter account name'),
            account_type: yup.string().required('Please account type'),
            transaction_type: yup.string().required('Please select transaction type')        
        })
    );
    
    return (
        <>
            <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header className="bg-light" onHide={onHide} closeButton>
                    <Modal.Title className="m-0">{chartOfAccount?.id ? "Edit Chart Of Account": "Add Chart Of Account" }</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{code:chartOfAccount?.code,account_name:chartOfAccount?.account_name,account_type:chartOfAccount?.account_type,details:chartOfAccount?.details}}>
                        <FormInput
                            label="Account Name"
                            type="text"
                            name="account_name"
                            placeholder="Enter account name"
                            containerClass={'mb-3'}
                        />
                        <FormInput
                            label="Code"
                            type="text"
                            name="code"
                            placeholder="Enter Code"
                            containerClass={'mb-3'}
                        />

                        <FormInput
                            label="Account Type"
                            type="text"
                            name="account_type"
                            placeholder="Enter account type"
                            containerClass={'mb-3'}
                        />

                        <FormInput
                            label="Details"
                            type="textarea"
                            name="details"
                            placeholder="Enter details"
                            containerClass={'mb-3'}
                        />

                        <FormInput
                            label="Transaction Type"
                            type="select"
                            name="transaction_type"
                            containerClass={'mb-3'}  
                            defaultValue={chartOfAccount && chartOfAccount.transaction_type!=='' ? chartOfAccount.transaction_type : ''}
                        >    
                            <option value="" disabled>Select Transaction Type
                            </option>                         
                            <option value="expense">Expense</option>                         
                            <option value="non-expense">Non-Expense</option>                         

                        </FormInput>

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

export default ChartOfAccountForm;
