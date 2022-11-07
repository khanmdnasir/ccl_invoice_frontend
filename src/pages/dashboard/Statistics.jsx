import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

// componets
import StatisticsWidget from '../../components/StatisticsWidget';
import AvailableBalanceImage from '../../assets/images/dashboard/Available Balance.svg';
import TotalInvestmentImage from '../../assets/images/dashboard/total-investment.svg';
import GainLossImage from '../../assets/images/dashboard/Gain(LOSS).svg';
import MarketValueImage from '../../assets/images/dashboard/Market Value of Investment.svg';
import TotalCashInjectionImage from '../../assets/images/dashboard/Total Cash Injection.svg';
import { APICore } from '../../helpers/api/apiCore';
import { useSelector } from 'react-redux';

const api = new APICore();


const Statistics = () => {
    const[statistics,setStatistics] = useState({});
    const scurrency = useSelector(state => state.Currency.selectedCurrency)
    useEffect(()=>{

        const data = {
            total_contact: 500,
            draft_amount: 420,
            awaiting_approval_amount: 645,
            awaiting_payment_amount: 785,
            paid_amount: 310,

        }
        setStatistics(data)

        // api.get(`/api/statistics`,{})
        // .then(res=>{
        //     setStatistics(res.data)
        // }) 
    },[])
    return (
        <>
            <Row >
                <Col  >
                    <StatisticsWidget
                        variant="primary"
                        counterOptions={{
                            prefix: '',
                            decimals: 0,
                        }}
                        description="Total Contact"
                        stats={statistics.total_contact}
                        color="#fff"
                    />
                </Col>
                <Col  >
                    <StatisticsWidget
                        variant="success"
                        description="Draft (5)"
                        counterOptions={{
                            prefix: '৳',
                            decimals: 2,
                        }}
                        stats={statistics.draft_amount}
                        color="#fff"
                    />
                </Col>
                <Col  >
                    <StatisticsWidget
                        variant="info"
                        description="Awaiting Approval (33)"
                        counterOptions={{
                            prefix: '৳',
                            decimals: 2,
                        }}
                        stats={statistics.awaiting_approval_amount}
                        color="#fff"
                    />
                </Col>
                <Col  >
                    <StatisticsWidget 
                        variant="warning" 
                        description="Awaiting Payment (25)" 
                        counterOptions={{
                            prefix: '৳',
                            decimals: 2,
                        }}
                        stats={statistics.awaiting_payment_amount} 
                        color="#fff" 
                    />
                </Col>
                <Col  >
                <StatisticsWidget 
                    variant="warning" 
                    description="Paid (18)" 
                    counterOptions={{
                        prefix: '৳',
                        decimals: 2,
                    }}
                    stats={statistics.paid_amount} 
                    color="#fff" 
                />
                </Col>
                
            </Row>
        </>
    );
};

export default Statistics;
