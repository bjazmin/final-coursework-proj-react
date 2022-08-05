import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'; //to make a requests from our backend
import Moment from 'moment'; //to convert date
import Layout from '../../../../../../layouts/DashboardLayout';
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

const Staff = () => {
  const [data, setData] = useState([]);
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);
  const [deleteId, setDeleteId] = useState('');

  //to fetch data from the backend server
  const loadData = async () => {
    //get all staff data
    const response = await axios.get(
      process.env.REACT_APP_API_URL + '/dashboard/staff/get'
    ); //returns data
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteStaff = (id) => {
    axios
      .delete(process.env.REACT_APP_API_URL + `/dashboard/staff/remove/${id}`)
      .then((response) => {
        if (response.data === 'OK') {
          toast.success('Staff deleted successfully');
        }
      })
      .catch((error) => {
        if (!error.response) {
          toast.error('Something went wrong. Please try again later.');
        } else {
          if (error.response.status === 403) {
            toast.error(error.response.data.message);
          } else {
            toast.error('Something went wrong. Please try again later.');
          }
        }
      });
    setTimeout(() => loadData(), 500);
  };

  const columns = [
    {
      label: 'Staff ID',
      field: 'staffID',
      width: 100,
      attributes: {
        'aria-controls': 'DataTable',
        'aria-label': 'staff id',
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
      width: 165,
    },
    {
      label: 'Email',
      field: 'email',
      sort: 'asc',
      width: 200,
    },
    {
      label: 'Access Type',
      field: 'accessType',
      sort: 'disabled',
      width: 170,
    },
    {
      label: 'Date Created',
      field: 'createdTime',
      sort: 'disabled',
      width: 100,
    },
    {
      label: 'Action',
      field: 'action',
      sort: 'disabled',
      width: 175,
    },
  ];

  const dataTable = (mydata) => {
    return {
      rows: mydata.map((item, index) => {
        return transform(item, index);
      }),
    };
  };

  const transform = (item, index) => {
    return {
      key: index,
      staffID: item.staffID,
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      accessType: item.accessType,
      createdTime: Moment(item.createdTime).format('yyyy-MM-D'),
      action: [
        <Link to={`/dashboard/staff/update/${item.staffID}`}>
          <button
            className="btn btn-dark"
            style={{
              marginRight: '0.5em',
              marginBottom: '1em',
            }}
          >
            <i class="bi bi-pencil-square"></i>
          </button>
        </Link>,
        <button
          style={{
            marginBottom: '1em',
            backgroundColor: '#e12744',
            color: 'white',
          }}
          type="button"
          class="btn"
          onClick={() => {
            setDeleteId(item.staffID);
            toggleShow();
          }}
        >
          <i class="bi bi-trash"></i>
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
          <Link to="/dashboard/staff/add">
            <button
              className="btn btn-dark"
              style={{
                marginBottom: '1em',
              }}
            >
              + Add User
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
                Are you sure you want to delete Staff ID: {deleteId} ?
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
                    deleteStaff(deleteId);
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

export default Staff;
