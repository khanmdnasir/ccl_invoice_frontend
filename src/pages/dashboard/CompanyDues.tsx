import React from 'react';
import { Card, Row, Col, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// componets

const CompanyDues = ({ summaryList, scurrency }: any) => {
    
    return (
        <>
            <Card>
                <Card.Body>

                    <h4 className="header-title">Clients Due</h4>

                    {summaryList?.clients_dues?.length > 0 ?

                        summaryList?.clients_dues?.map((due: any) => {
                            return (
                                <>
                                    <div className="mt-4">
                                        <h6 className="text-uppercase">
                                            <Link to={{pathname: '/app/client_details',state: due?.contact_id}}>{due?.contact_id__name}</Link> <span className="float-end">{scurrency?.symbol}{due?.net_due_amount.toLocaleString()}</span>
                                        </h6>

                                        <ProgressBar
                                            now={due?.percentage}
                                            className="progress m-0"
                                            label={due?.percentage + " %"}
                                            // visuallyHidden
                                            variant="qorum"
                                        />
                                    </div>
                                </>
                            )
                        }

                        ) : "No client due found"}


                </Card.Body>
            </Card>
        </>
    );
};

export default CompanyDues;
