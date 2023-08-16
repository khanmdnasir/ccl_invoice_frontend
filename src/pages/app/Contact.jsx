import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Breadcrumb } from 'react-bootstrap';

// components
import Table from '../../components/Table';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, getContact, setContactErrorAlert, setContactSuccessAlert } from '../../redux/actions';
import Pagination from '../../components/CustomPagination';
import { getCountry } from '../../redux/location/actions';
import { getAllKam } from '../../redux/kam/actions';


function randomColor() {
  let hex;
  let color;
  
  do {
    hex = Math.floor(Math.random() * 0xFFFFFF);
    color = "#" + hex.toString(16).toUpperCase();
  } while (color === "#FFF" );
  
  return color;
    
  }

// Split Name

const SplitName = ({ row }) => {
  let name = (row.original?.name).split(" ");
  let color = randomColor()
  // console.log(row?.original?.name,color)
//    
    for(var i = 0; i < name.length; i++){
        
        name[i] = name[i].substring(i,2-i).charAt(0).toUpperCase();
    }
    return (
        <React.Fragment>
            <div className="col-auto">
               <div className="avatar d-flex align-items-center text-center">
                 <span className="avatar " style={{width:'32px', height: '32px', display:'inline-block', lineHeight: '2rem', marginRight: '12px', fontWeight: '700', borderRadius: '5px',color: 'white', backgroundColor: randomColor()}}>
                   {name} 
                 </span>
                 <div>{row.original?.name}</div>
               </div>
            </div>
        </React.Fragment>
    )
}



const columns = [
  {
    Header: "Name",
    accessor: "name",
    sort: true,
    Cell: SplitName,
  },
  {
    Header: "Balance",
    accessor: "balance",
    sort: true,
    Cell: (row) => {
      const scurrency = useSelector(state => state.Currency.selectedCurrency)
      return <div>{scurrency?.symbol}{row?.row?.original?.balance!==null?(row?.row?.original?.balance).toLocaleString(undefined, {maximumFractionDigits:2}):0}</div>;
  }
  },
  {
    Header: "Due",
    accessor: "due",
    sort: true,
    Cell: (row) => {
      const scurrency = useSelector(state => state.Currency.selectedCurrency)
      return <div>{scurrency?.symbol}{row?.row?.original?.due!==null?(row?.row?.original?.due).toLocaleString(undefined, {maximumFractionDigits:2}):0}</div>;
  }
  },
];

const Contact = () => {
  const dispatch = useDispatch();
  const contact = useSelector((state) => state.Contact.contact);

  const country = useSelector((state) => state.Location.country);
  const all_kam = useSelector((state) => state.Kam.all_kam);
  const previous = useSelector((state) => state.Contact.previous);
  const next = useSelector((state) => state.Contact.next);
  const current_page = useSelector((state) => state.Contact.current_page);
  const total_page = useSelector((state) => state.Contact.total_page);
  const active = useSelector((state) => state.Contact.active);
  const user_role = useSelector((state) => state.Role.user_role);
  const loading = useSelector((state) => state.Contact.loading);
  const success = useSelector((state) => state.Contact.success);
  const [pageSize, setPageSize] = useState(10);

  /*
   *   modal handeling
   */
  const [show, setShow] = useState(false);
  const onCloseModal = () => setShow(false);
  const onOpenModal = () => {
    dispatch(setContactErrorAlert(""));
    setShow(true);
  };

  const visitPage = (page) => {
    dispatch(getContact(pageSize, page));
  };

  const previous_number = () => {
    if(previous !== null){
    dispatch(getContact(pageSize, previous));

    }
  };

  const next_number = () => {
    if(next !== null){
    dispatch(getContact(pageSize, next));

    }
  };

  /*
    handle form submission
    */

  useEffect(() => {
    if (success !== "") {
      onCloseModal();
    }

    setTimeout(() => {
      dispatch(setContactSuccessAlert(""));
    }, 2000);
  }, [success]);

  const onSubmit = (formData) => {
    // console.log("formData", formData)
    dispatch(addContact(formData));
  };

    


    useEffect(() => {
        dispatch(getContact(pageSize, 1));
        dispatch(getCountry());
        dispatch(getAllKam());
    }, [pageSize])
    return (
        <>
            <Row>
                <Col sm={4}>
                <div className="page-title-box" style={{marginTop: '10px'}}>
            
            <div className="page-title-left">
              <Breadcrumb>
                <Breadcrumb.Item href="/">Qorum</Breadcrumb.Item>
                <Breadcrumb.Item active>Client</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <h4
              className="page-titles"
              style={{
                fontSize: "1.25rem",
                marginBottom: "40px",
                color: "#323a46",
              }}
            >
              All Clients
            </h4>
          </div>
        </Col>

                <Col sm={8}>
                                    <div className="text-sm-end mt-2">
                                        {user_role.includes('add_contact') ?
                                            <Link className="btn btn-primary mb-2 me-1" to='/app/client_form'>
                                                <i className="mdi mdi-plus-circle me-1"></i> Add New
                                            </Link> :
                                            <>
                                            </>
                                        }
                                    </div>
                                </Col>
            </Row>
             
             
            

      <Row>
        <Col>
          <Card>
            <Card.Body>
              {/* {!loading && success && (
                                <Alert variant="success" className="my-2" onClose={() => dispatch(setContactSuccessAlert(''))} dismissible>
                                    {success}
                                </Alert>
                            )} */}
              <Row className="mb-2">
                <Col sm={4}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <span className="me-2">Show:</span>
                    <Form.Select
                      style={{ width: "40%" }}
                      onChange={(e) => {
                        setPageSize(e.target.value);
                        dispatch(getContact(e.target.value, current_page));
                      }}
                    >
                      <option value="10">10</option>
                      <option value="15">20</option>
                      <option value="20">30</option>
                    </Form.Select>
                  </div>
                </Col>
              </Row>

              {loading ? (
                <p>Loading...</p>
              ) : (
                <>
                  {contact.length > 0 ? (
                    <>
                      <Table
                        columns={columns}
                        data={contact}
                        pageSize={pageSize}
                        isSortable={true}
                        isDetails={true}
                        pathName="/app/client_details"
                        pagination={false}
                        isSearchable={true}
                        tableClass="table-nowrap table-hover"
                        searchBoxClass=""
                      />
                      <Pagination
                        visitPage={visitPage}
                        previous_number={previous_number}
                        next_number={next_number}
                        total_page={total_page}
                        current_page={current_page}
                        active={active}
                      />
                    </>
                  ) : (
                    "No user available!"
                  )}
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* add contact modal */}

      {/* <ContactForm show={show} onHide={onCloseModal} onSubmit={onSubmit} countries={country} kamList={all_kam} /> */}
    </>
  );
};

export default Contact;
