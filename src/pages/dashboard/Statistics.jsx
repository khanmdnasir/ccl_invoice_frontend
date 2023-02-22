import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

// componets
import StatisticsWidget from '../../components/StatisticsWidget';

const Statistics = ({summaryList, scurrency}) => {

    return (
        <>
            <Row >
                <Col  >
                    <StatisticsWidget
                        variant="text-secondary"
                        counterOptions={{
                            prefix: '',
                            decimals: 0,
                        }}
                        description="Total Client"
                        stats={summaryList.total_contact}
                        color="#fff"
                    />
                </Col>
                <Col>
                    <StatisticsWidget
                        variant="text-muted"
                        description={`Draft (${summaryList.draft_invoice ? summaryList.draft_invoice.total_data:0})`}
                        counterOptions={{
                            prefix: scurrency? scurrency.symbol : '',
                            decimals: 2,
                        }}
                        stats={summaryList.draft_invoice ? summaryList.draft_invoice.total_amount:0}
                        color="#fff"
                    />
                </Col>
                <Col  >
                    <StatisticsWidget
                        variant="text-info"
                        description={`Awaiting Approval (${summaryList.waiting_invoice ? summaryList.waiting_invoice.total_data:0})`}
                        counterOptions={{
                            prefix: scurrency? scurrency.symbol : '',
                            decimals: 2,
                        }}
                        stats={summaryList.waiting_invoice ? summaryList.waiting_invoice.total_amount:0}
                        color="#fff"
                    />
                </Col>
                <Col  >
                    <StatisticsWidget 
                        variant="text-warning" 
                        description={`Awaiting Payment (${summaryList.approve_invoice ? summaryList.approve_invoice.total_data:0})`}
                        counterOptions={{
                            prefix: scurrency? scurrency.symbol : '',
                            decimals: 2,
                        }}
                        stats={summaryList.approve_invoice ? summaryList.approve_invoice.total_amount:0}
                        color="#fff" 
                    />
                </Col>
                <Col  >
                <StatisticsWidget 
                    variant="text-success" 
                    description={`Paid (${summaryList.paid_invoice ? summaryList.paid_invoice.total_data:0})`}
                    counterOptions={{
                        prefix: scurrency? scurrency.symbol : '',
                        decimals: 2,
                    }}
                    stats={summaryList.paid_invoice ? summaryList.paid_invoice.total_amount:0} 
                    color="#fff" 
                />
                </Col>
                
                
            </Row>
        </>
    );
};

export default Statistics;
