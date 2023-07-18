import { Button,Row, Col, Form } from 'react-bootstrap';

// components



import Statistics from './Statistics';
import CompanyDues from './CompanyDues';
import { useEffect, useState } from 'react';
import RevenueChart from './RevenueChart';
import { useSelector, useDispatch } from 'react-redux';
import { getDashboardSummary } from '../../redux/dashboard/actions';
import SalesAnalyticsChart from './SalesAnalyticsChart';
import MonthlyOverviewChart from './MonthlyOverviewChart';
import HorizontalBarCharts from './HorizontalBarCharts';
import InvoiceChart from './InvoiceChart';


const Dashboard = () => {   
    const dispatch = useDispatch();
    const scurrency = useSelector(state => state.Currency.selectedCurrency)
    const summaryList = useSelector(state => state.Dashboard.summaryList);
    useEffect(() => {
        dispatch(getDashboardSummary());
    }, [])
    
    return (
        <div className='mt-4'>
            <Row>
                <Col>
                    {/* <div className="page-title-box">
                        <div className="page-title-right">
                            {editDashboard ?
                            <>
                            <Button variant="outline-info" className="waves-effect waves-light me-2" onClick={()=>setEditDashboard(!editDashboard)}>
                                Cancel
                            </Button> 
                            <Button variant="primary" className="waves-effect waves-light" onClick={()=>onSave()}>
                                Save Changes
                            </Button> 
                            </>:
                            <Button variant="primary" className="waves-effect waves-light" onClick={()=>setEditDashboard(!editDashboard)}>
                                Edit Dashboard
                            </Button> 
                            }
                        </div>
                        <h4 className="page-title">Dashboard</h4>
                    </div> */}
                </Col>
            </Row>

            <Statistics summaryList={summaryList} scurrency={scurrency}/>
            

                <Row>
                
                <Col  xl={6}>                        
                        <InvoiceChart summaryList={summaryList}/>
                    </Col>
                    <Col  xl={6}>                        
                        <SalesAnalyticsChart summaryList={summaryList}/>                        
                    </Col>
                    <Col  xl={6}>
                        <MonthlyOverviewChart summaryList={summaryList}/>              
                    </Col>
                    <Col  xl={6}>
                        <HorizontalBarCharts summaryList={summaryList}/>              
                    </Col>
                    {/* <Col  xl={6}>                        
                        <RevenueChart summaryList={summaryList} scurrency={scurrency}/>                        
                    </Col> */}
                    {/* <Col  xl={6}>
                        <CompanyDues summaryList={summaryList} scurrency={scurrency}/>                        
                    </Col> */}
                                    
                </Row>
        </div>
    );
};

export default Dashboard;
