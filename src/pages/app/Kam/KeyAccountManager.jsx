import React, { useEffect, useState } from "react";
import { APICore } from "../../../helpers/api/apiCore";
import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";
import { withSwal } from 'react-sweetalert2';



import { getKam,setKamSuccessAlert,setKamErrorAlert, addKam } from "../../../redux/actions";
import Table from "../../../components/Table";
import PageTitle from "../../../components/PageTitle";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../../../components/CustomPagination";
import KamContactForm from "../../Form/KamContactForm";


const api = new APICore();


// action column render
const ActionColumn = withSwal(({ row, swal }) => {
  /*
   *   modal handeling
   */
  const dispatch = useDispatch();
  const user_role = useSelector((state)=> state.Role.user_role);
  const [show, setShow] = useState(false);
  const onCloseModal = () => setShow(false);
  const onOpenModal = () =>{dispatch(setKamErrorAlert('')); setShow(true)};

  /*
  handle form submission
  */
  const onSubmit = (formData) => {
      
      api.updatePatch(`/api/kam/${row.original.id}/`,formData)
      .then(res=>{
          
          if(res.data.success){
              dispatch(getKam(10,1));
              dispatch(setKamSuccessAlert('Kam Updated Successfully'));
              onCloseModal()
              setTimeout(() => {
                dispatch(setKamSuccessAlert(''));
              },2000)
          }else{
              dispatch(setKamErrorAlert(res.data.error));
          }
          
      })
      .catch(err => {
          // swal.fire({
          //     title: err,
          // })
          dispatch(setKamErrorAlert(err));
      })
      
  };

  const onDelete = () => {
      swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#28bb4b',
              cancelButtonColor: '#f34e4e',
              confirmButtonText: 'Yes, delete it!',
          })
          .then(function(result){
              if(result.value){
                  // dispatch(deleteContact(row.original.id))
                  api.delete(`/api/kam/${row.original.id}/`)
              .then(res=>{
                  dispatch(getKam(10,1))
                  if(res.data.success){
                      swal.fire(
                          'Deleted!',
                          'Account has been deleted.',
                          'success'
                      ); 
                  }else{
                      swal.fire(
                          'Error',
                          res.data.error,
                          'warning'
                      
                      );
                  }
                             
              })
              .catch(err => {
                  swal.fire({
                      title: err,
                  }
                  );
              })
              }else if(result.dismiss === 'cancel'){
                  console.log('cancel')
              }
          })        
  }

  return (
      <>
         

          { user_role.includes('change_kammodel') ?
              <Link to="#" className="action-icon" onClick={()=>onOpenModal()}>
                  <i className="mdi mdi-square-edit-outline"></i>
              </Link>:
              <Link to="#" className="action-icon"  style={{pointerEvents: 'none'}}>
                  <i className="mdi mdi-square-edit-outline"></i>
              </Link>
          }
          
          { user_role.includes('delete_kammodel') ?
              <Link to="#" className="action-icon" onClick={()=>onDelete()}>
                  <i className="mdi mdi-delete"></i>
              </Link>:
              <Link to="#" className="action-icon" style={{pointerEvents: 'none'}}>
                  <i className="mdi mdi-delete"></i>
              </Link>
          }
          {
              show?
              <KamContactForm show={show} onHide={onCloseModal} onSubmit={onSubmit} kam={row.original}/>
              :null
          }
      </>
  );
});

const columns = [
  {
    Header: 'Name',
    accessor: 'name',
    sort: true,
  },
  {
    Header: 'Phone',
    accessor: 'phone',
    sort: true,
  },
  {
    Header: 'Department',
    accessor: 'department',
    sort: true,
  },
  
  {
    Header: 'Action',
    accessor: 'action',
    sort: false,
    Cell: ActionColumn,
},
];

const KeyAccountManager = () => {
  const dispatch = useDispatch();
  const kam = useSelector(state => state.Kam.kam);
  const previous = useSelector(state => state.Kam.previous);
  const next = useSelector(state => state.Kam.next);
  const current_page = useSelector(state => state.Kam.current_page);
  const total_page = useSelector(state => state.Kam.total_page);
  const active = useSelector(state => state.Kam.active);
  const user_role = useSelector((state)=> state.Role.user_role);
  const [pageSize,setPageSize] = useState(10);
  const loading = useSelector((state) => state.Kam.loading);
  const success = useSelector((state) => state.Kam.success);


  const [show, setShow] = useState(false);
  const onCloseModal = () => setShow(false);
  const onOpenModal = () => {dispatch(setKamErrorAlert(''));setShow(true)};


  const visitPage = (page) => {
    dispatch(getKam(pageSize,page));
};

const previous_number = () => {
  if(previous !== null){
    dispatch(getKam(pageSize,previous));

  }
};

const next_number = () => {
  if(next !== null){
    dispatch(getKam(pageSize,next));

  }
};

useEffect(()=>{
  if(success !== ''){
      onCloseModal();
  }
  dispatch(getKam(pageSize,1));
  setTimeout(()=>{
      dispatch(setKamSuccessAlert(''));
  },2000)
},[success])

 /*
    handle form submission
    */
   
const onSubmit = (formData) => {
  
  dispatch(addKam(formData));

};


useEffect(()=>{ 
  dispatch(getKam(pageSize,1));
  
},[pageSize])

// console.log("kam list", kam)
// console.log("current_page", current_page)

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          {
            label: "key Account Manager",
            path: "/app/key_account_manager",
            active: true,
          },
        ]}
        title={"Key Account Manager"}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              {!loading && success && (
                <Alert
                  variant="success"
                  className="my-2"
                  onClose={() => dispatch(setKamSuccessAlert(""))}
                  dismissible
                >
                  {success}
                </Alert>
              )}
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
                    <Form.Select style={{ width: "40%" }} onChange={(e)=>{setPageSize(e.target.value);dispatch(getKam(e.target.value,current_page))}}>
                      <option value="10">10</option>
                      <option value="15">20</option>
                      <option value="20">30</option>
                    </Form.Select>
                  </div>
                </Col>

                <Col sm={8}>
                <div className="text-sm-end mt-2 mt-sm-0">
                { user_role.includes('add_kammodel') ?
                    <Button className="btn btn-success mb-2 me-1" onClick={onOpenModal}>
                        <i className="mdi mdi-plus-circle me-1"></i> Add New
                    </Button>:
                    <>
                    </>
                 }
                </div>

                </Col>
              </Row>


              {loading ? <p>Loading...</p>:
              <>
              {kam.length > 0 ?
              <>
              <Table
                columns={columns}
                data={kam}
                pageSize={pageSize}
                isSortable={true}
                pagination={false}
                isSearchable={true}
                tableClass="table-nowrap table-hover"
                searchBoxClass=""
              />
              <Pagination visitPage={visitPage} previous_number={previous_number} next_number={next_number} total_page={total_page} current_page={current_page} active={active}/>
              </>
              :
            'No user available!'}</>}
            </Card.Body>
          </Card>
        </Col>
      </Row>

       <KamContactForm show={show} onHide={onCloseModal} onSubmit={onSubmit}/>

    </>
  );
};

export default KeyAccountManager;
