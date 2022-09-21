import React, { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';



interface CompanyInfo {
    id: number;
    logo: string;
    name: string;
    location: string;
    event: string;
    date: string;
    status: string;
}

interface CompanyDetailsProps {
    companyInfo: CompanyInfo[];
}

const CompanyDetails = (props: CompanyDetailsProps) => {
    const [companyInfo] = useState<Array<CompanyInfo>>(props.companyInfo);
   
    return (
        <>
            

            {(companyInfo || []).map((item, index) => {
                return (
                    <Card key={index} className="mb-1">
                        <Card.Body>
                            <Row className="align-items-center">
                                <Col sm={4}>
                                    <div className="d-flex align-items-start">
                                        <img
                                            className="d-flex align-self-center me-3 rounded-circle"
                                            src={item.logo}
                                            alt=""
                                            height="60"
                                        />
                                        <div className="w-100">
                                            <h4 className="mt-0 mb-2 font-16">{item.name}</h4>
                                            <p className="mb-1">
                                                <b>Event:</b> {item.event}
                                            </p>
                                            <p className="mb-0">
                                                <b>Location:</b> {item.location}
                                            </p>
                                        </div>
                                    </div>
                                </Col>
                                <Col sm={4}>
                                    <p className="mb-1 mt-3 mt-sm-0">
                                        <i className="mdi me-1"></i> {item.date}
                                    </p>
                                    
                                </Col>
                                <Col sm={2}>
                                    <div className="text-center mt-3 mt-sm-0">
                                        <div
                                            className={classNames('badge', 'font-14', 'p-1', {
                                                'bg-soft-info text-info': item.status === 'Hot',
                                                'bg-soft-primary text-primary': item.status === 'Cold',
                                                'bg-soft-warning text-warning': item.status === 'In-progress',
                                                'bg-soft-danger text-danger': item.status === 'Lost',
                                                'bg-soft-success text-success': item.status === 'Won',
                                            })}
                                        >
                                            {item.status}
                                        </div>
                                    </div>
                                </Col>
                                <Col sm={2}>
                                    <div className="text-sm-end">
                                        <Link to="#" className="action-icon">
                                            {' '}
                                            <i className="mdi mdi-square-edit-outline"></i>
                                        </Link>
                                        <Link to="#" className="action-icon">
                                            {' '}
                                            <i className="mdi mdi-delete"></i>
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                );
            })}

           

            
        </>
    );
};

export default CompanyDetails;
