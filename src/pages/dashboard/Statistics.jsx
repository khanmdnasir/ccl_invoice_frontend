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
    // useEffect(()=>{

    //     api.get(`/api/statistics`,{})
    //     .then(res=>{
    //         setStatistics(res.data)
    //     }) 
    // },[])
    return (
        <>
            <Row >
                <Col  >
                    <StatisticsWidget
                        variant="primary"
                        counterOptions={{
                            prefix: scurrency? scurrency.prefix : '$',
                            decimals: 2,
                        }}
                        description="Total Investment"
                        stats={statistics.total_investment * scurrency?.rate}
                        image={TotalInvestmentImage}
                        color="#00CFFB"
                    />
                </Col>
                <Col  >
                    <StatisticsWidget
                        variant="success"
                        description="Market Value of Investment"
                        counterOptions={{
                            prefix: scurrency? scurrency.prefix : '$',
                            decimals: 2,
                        }}
                        stats={statistics.market_value * scurrency?.rate}
                        image={MarketValueImage}
                        color="#00C2FF"
                    />
                </Col>
                <Col  >
                    <StatisticsWidget
                        variant="info"
                        description="Total Cash Injection"
                        counterOptions={{
                            prefix: scurrency? scurrency.prefix : '$',
                            decimals: 2,
                        }}
                        stats={statistics.total_cash * scurrency?.rate}
                        image={TotalCashInjectionImage}
                        color="#00CFFB"
                    />
                </Col>
                <Col  >
                    <StatisticsWidget 
                        variant="warning" 
                        description="Gain/Loss" 
                        counterOptions={{
                            prefix: scurrency? scurrency.prefix : '$',
                            decimals: 2,
                        }}
                        stats={statistics.total_gain_loss * scurrency?.rate} 
                        image={GainLossImage} 
                        color="#06C270" 
                    />
                </Col>
                <Col  >
                <StatisticsWidget 
                    variant="warning" 
                    description="Available Balance" 
                    counterOptions={{
                        prefix: scurrency? scurrency.prefix : '$',
                        decimals: 2,
                    }}
                    stats={statistics.available_balance * scurrency?.rate}
                    image={AvailableBalanceImage} 
                    color="#00CFFB" 
                />
                </Col>
                
            </Row>
        </>
    );
};

export default Statistics;
