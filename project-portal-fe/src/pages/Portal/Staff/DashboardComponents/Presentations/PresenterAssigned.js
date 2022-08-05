import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'; //to make a requests from our backend
import Layout from '../../../../../layouts/DashboardLayout';
import { CDBCard, CDBCardBody, CDBDataTable } from 'cdbreact';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

const PresenterAssigned = () => {
  const { id } = useParams(); //id of the presentation
  const [data, setData] = useState([]); //to setData
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);
  const [deleteId, setDeleteId] = useState('');

  //to fetch data from the backend server
  const loadData = async () => {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + `/dashboard/presenter/assigned/get/${id}`
    ); //returns data
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteItem = (sid) => {
    axios
      .delete(
        process.env.REACT_APP_API_URL +
          `/dashboard/presenter/assigned/remove/${id}/${sid}`
      )
      .then((response) => {
        if (response.data === 'OK') {
          toast.success('Presenter removed from the presentation successfully');
        }
      })
      .catch((error) => {
        if (!error.response || error) {
          toast.error('Something went wrong. Please try again later.');
        }
      });
    setTimeout(() => loadData(), 500);
  };

  const columns = [
    {
      label: 'Student ID',
      field: 'studentID',
      width: 100,
      attributes: {
        'aria-controls': 'DataTable',
        'aria-label': 'student id',
      },
    },
    {
      label: 'First Name',
      field: 'firstName',
      width: 150,
    },
    {
      label: 'Last Name',
      field: 'lastName',
      width: 150,
    },
    {
      label: 'Email',
      field: 'email',
      width: 165,
    },
    {
      label: 'Action',
      field: 'action',
      sort: 'disabled',
      width: 200,
    },
  ];

  const dataTable = (mydata) => {
    return {
      rows: mydata.map((item, index) => {
        return transform(item);
      }),
    };
  };

  const transform = (item) => {
    return {
      key: item.studentID,
      studentID: item.studentID,
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      action: [
        <Link to={`/dashboard/presenter/update/${id}/${item.studentID}`}>
          <button
            className="btn btn-dark"
            style={{
              marginRight: '0.5em',
              marginBottom: '1em',
            }}
          >
            <i className="bi bi-pencil-square"></i>
          </button>
        </Link>,
        <button
          style={{
            marginBottom: '1em',
            backgroundColor: '#e12744',
            color: 'white',
          }}
          type="button"
          className="btn"
          onClick={() => {
            setDeleteId(item.studentID);
            toggleShow();
          }}
        >
          <i className="bi bi-trash"></i>
        </button>,
      ],
    };
  };

  return (
    <>
      <Layout>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div style={{ maxHeight: '90vh' }}>
          <Link to={`/dashboard/presentation/update/${id}`}>
            <button
              className="btn btn-dark"
              style={{
                marginBottom: '1em',
              }}
            >
              BACK
            </button>
          </Link>
          <CDBCard>
            <CDBCardBody>
              <CDBDataTable
                striped
                bordered
                hover
                responsiveSm
                responsiveLg
                entriesOptions={[5, 20, 25]}
                entries={5}
                columns={columns}
                data={dataTable(data)}
                pagesAmount={4}
                materialSearch={true}
              />
            </CDBCardBody>
          </CDBCard>
        </div>
        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Confirm Delete</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleShow}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                Are you sure you want to remove Presenter {deleteId} from the
                presentation ?
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn
                  className="btn-dark"
                  onClick={() => {
                    toggleShow();
                    setDeleteId('');
                  }}
                >
                  No
                </MDBBtn>
                <MDBBtn
                  style={{ backgroundColor: '#e12744' }}
                  onClick={() => {
                    deleteItem(deleteId);
                    toggleShow();
                  }}
                >
                  Yes
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </Layout>
    </>
  );
};

export default PresenterAssigned;
