

import { Row, Col, Card,Alert } from 'react-bootstrap';

// components

import Table from '../../components/Table';
import PageTitle from '../../components/PageTitle';
import { useSelector, useDispatch } from 'react-redux';




const columns = [
    
    
    {
        Header: 'Code',
        accessor: 'code',
        sort: true,
    },
    {
        Header: 'Currency Name',
        accessor: 'currency_name',
        sort: true,
    },
    {
        Header: 'Symbol',
        accessor: 'symbol',
        sort: true,
    },
    
    
];

const Currency = () => {
    const dispatch = useDispatch();
    const currencies = useSelector(state => state.Currency.currencies);

    const loading = useSelector(state => state.Currency.loading);
    const error = useSelector(state => state.Currency.error);

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Currency', path: '/app/currency', active: true },
                ]}
                title={'Currency'}
            />

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                        {!loading && error && (
                            <Alert variant="danger" className="my-2">
                                {error}
                            </Alert>
                        )}
                            
                            
                            {loading ? <p>Loading...</p>:
                            <>
                            {currencies?.length > 0 ?
                            <Table
                                columns={columns}
                                data={currencies}
                                pageSize={10}
                                isSortable={true}
                                pagination={true}
                                isSearchable={true}
                                tableClass="table-nowrap table-hover"
                                searchBoxClass=""
                            />
                            :
                            'No currency available!'}</>}
                            {/* <Pagination visitPage={visitPage} previous_number={previous_number} next_number={next_number} total_page={total_page} current_page={current_page} active={active}/> */}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* add contact modal */}
            {/* <CurrencyForm show={show} onHide={onCloseModal} onSubmit={onSubmit} /> */}
            
            
        </>
    );
};

export default Currency;
