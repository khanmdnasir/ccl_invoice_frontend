import { useEffect } from 'react';
import { Card, Dropdown, Table } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
// import { getWatchList } from '../../redux/actions';



const DashboardWatchList = ({ isEdit }) => {
    const dispatch = useDispatch();
    // const watchLists = useSelector(state => state.WatchList.watchLists);

    // useEffect(()=>{
    //     dispatch(getWatchList(0,1));
    // },[])
    
    return (
        <>
            <Card className={isEdit ? 'mb-0':'mb-3'} >
                <Card.Body>
                    <Dropdown className="float-end" align="end">
                        <Dropdown.Toggle as="a" className="card-drop cursor-pointer">
                            <i className="mdi mdi-dots-vertical"></i>
                        </Dropdown.Toggle>
                        
                    </Dropdown>

                    <h4 className="header-title mb-3">Watch List</h4>
                    <div className="table-responsive">
                        <Table hover className="table-centered mb-0">
                            <thead>
                                <tr>
                                    <th>Name of Instrument</th>
                                    <th>Market Price</th>
                                    <th>Target Price</th>
                                    <th>Difference with Target Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {watchLists.length > 0 ? (watchLists.sort( (a,b) => (a.id < b.id) ? 1 : -1) || []).slice(0,6).map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{item.instrument.name}</td>
                                            <td>{item.instrument.current_price}</td>
                                            <td>{item.target_price}</td>
                                            <td>{item.diff_with_target}</td>
                                        </tr>
                                    );
                                }):<div style={{display: 'flex',alignItems: 'center',justifyContent: 'center'}}><p>No watchlist available</p></div>} */}
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
};

export default DashboardWatchList;
