import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

// componets
import StatisticsWidget from '../../components/StatisticsWidget';
import { APICore } from '../../helpers/api/apiCore';
import { useSelector,useDispatch } from 'react-redux';
import { getDashboardSummary } from '../../redux/dashboard/actions';
const api = new APICore();


const Statistics = () => {
    const dispatch = useDispatch();
    const[statistics,setStatistics] = useState({});
    const scurrency = useSelector(state => state.Currency.selectedCurrency)
    const summaryList = useSelector(state => state.Dashboard.summaryList);
    useEffect(()=>{

        dispatch(getDashboardSummary());

        console.log(summaryList)

        const data = {
            total_contact: summaryList.total_contact,
            draft_amount: 420, 
            awaiting_approval_amount: 645,
            awaiting_payment_amount: 785,
            paid_amount: 310,

        }
        setStatistics(data)
    },[])
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
