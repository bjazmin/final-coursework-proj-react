import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

const Proposal = () => {
  const [data, setData] = useState([]);
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);
  const [deleteId, setDeleteId] = useState('');

  //to fetch data from the backend server
  const loadData = async () => {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + '/dashboard/proposal/get'
    ); //returns data
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteUnit = (id) => {
    axios
      .delete(
        process.env.REACT_APP_API_URL + `/dashboard/proposal/remove/${id}`
      )
      .then((response) => {
        if (response.data === 'OK') {
          toast.success('Proposal deleted successfully');
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
      label: 'Proposal ID',
      field: 'proposalID',
      width: 100,
      attributes: {
        'aria-controls': 'DataTable',
        'aria-label': 'proposal id',
      },
    },
    {
      label: 'Title',
      field: 'title',
      width: 'auto',
    },
    {
      label: 'Discipline',
      field: 'discipline',
      sort: 'asc',
      width: 'auto',
    },
    {
      label: 'Status',
      field: 'status',
      sort: 'asc',
      width: 150,
    },
    {
      label: 'Action',
      field: 'action',
      sort: 'disabled',
      width: 160,
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
      key: item.proposalID,
      proposalID: item.proposalID,
      title: item.title,
      discipline: item.discipline,
      status: item.status,
      action: [
        <Link to={`/dashboard/proposal/update/${item.proposalID}`}>
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
            setDeleteId(item.proposalID);
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
                Are you sure you want to delete Proposal ID: {deleteId} ?
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
                    deleteUnit(deleteId);
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

export default Proposal;
