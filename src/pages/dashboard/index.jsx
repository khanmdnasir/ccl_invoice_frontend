import { Button,Row, Col, Form } from 'react-bootstrap';

// components


import AssetTypeChart from './AssetTypeChart';

import { ReactSortable } from 'react-sortablejs';
import { useEffect, useState } from 'react';



const Dashboard = () => {   
    const [editDashboard,setEditDashboard] = useState(false);
    const [defaultItems] = useState([
        {
            id: 1,
            component: AssetTypeChart,
            
            
            
        },
        {
            id: 2,
            component: AssetTypeChart,
            
            
        },
        {
            id: 3,
            component: AssetTypeChart,
            
            
        },
        {
            id: 4,
            component: AssetTypeChart,
            
            
        }
    ])
    const [items, setItems] = useState([]);
    useEffect(()=>{
        
        let dashboard_items = JSON.parse(localStorage.getItem('dashboard_items'));
        
        if(dashboard_items === null)
        {
            dashboard_items = [
                {
                    id: 1,
                    show: true
                    
                    
                },
                {
                    id: 2,
                    show: true
                    
                },
                {
                    id: 3,
                    show: true
                    
                },
                {
                    id: 4,
                    show: true
                    
                }
            ]
        }
        setItems(dashboard_items);
    },[])


    const onSave = () => {
        localStorage.setItem('dashboard_items',JSON.stringify(items));
        setEditDashboard(!editDashboard);
    }

    const checkChanged = (index) => {
        let citems = [...items];
        let item = {...citems[index]};
        item.show = !item.show;
        citems[index] = item;
        setItems(citems);
    }

    
    return (
        <>
            <Row>
                <Col>
                    <div className="page-title-box">
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
                    </div>
                </Col>
            </Row>


            
            { editDashboard ?
            <ReactSortable className="row" list={items} setList={setItems}>
                {(items || []).map((item, idx) => {
                    return (
                        <Col key={idx} xl={6}>
                            {
                                defaultItems?.map((ditem) => {
                                    if(item.id === ditem.id){
                                        return(
                                            <ditem.component isEdit={editDashboard} />
                                        )
                                    }else{
                                        return null
                                    }
                                })
                            }
                            
                            
                            <div className="dd-list">
                                <div className="dd-item">
                                    <div className="dd-handle">
                                        <span className="dragula-handle font-20" />
                                        {item.show ?
                                        <Form.Check type="checkbox">
                                            <Form.Check.Input type="checkbox" checked onChange={()=>checkChanged(idx)}/>{' '}
                                            <Form.Check.Label>
                                                Show
                                            </Form.Check.Label>
                                        </Form.Check>:
                                        <Form.Check type="checkbox">
                                            <Form.Check.Input type="checkbox" onChange={()=>checkChanged(idx)}/>{' '}
                                            <Form.Check.Label>
                                                Show
                                            </Form.Check.Label>
                                        </Form.Check>}
                                    </div>
                                </div>
                            </div>
                            
                        </Col>
                    );
                })}
            </ReactSortable>
            :
            <ReactSortable className="row" list={items} setList={setItems}>
                {(items || []).map((item, idx) => {
                    
                    return (
                        <>
                         { item.show &&
                        <Col key={idx} xl={6}>
                            
                            {
                                defaultItems?.map((ditem) => {
                                    if(item.id === ditem.id){
                                        return(
                                            <ditem.component isEdit={editDashboard} />
                                        )
                                    }else{
                                        return null
                                    }
                                })
                            }
                            
                        </Col>
                        }
                        </>
                        
                    );
                })}
            </ReactSortable>
            }
        </>
    );
};

export default Dashboard;
