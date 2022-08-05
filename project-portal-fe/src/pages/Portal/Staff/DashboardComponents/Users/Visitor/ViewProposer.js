import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; //for making requests
import Layout from '../../../../../../layouts/DashboardLayout';
import { ToastContainer } from 'react-toastify'; //for toasts or notifications
import {
  MDBTypography,
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardBody,
} from 'mdb-react-ui-kit';

const ViewProposer = () => {
  const { id } = useParams();
  const initialState = {
    visitorID: '',
    firstName: '',
    lastName: '',
    email: '',
    affiliation: '',
    category: '',
    orgName: '',
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + `/dashboard/visitor/get/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  return (
    <Layout>
      <div
        style={{
          maxHeight: '90vh',
        }}
      >
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
        <MDBTypography className="text-center p-5 display-6">
          Proposer Details
        </MDBTypography>
        <MDBCard style={{ maxWidth: '40rem' }} className="mx-auto">
          <MDBCardBody className="p-5">
            <MDBRow className="row-cols-2 row-cols-md-2 g-4 p-2">
              <MDBCol>
                <MDBTypography className="display-10">Visitor ID</MDBTypography>
              </MDBCol>
              <MDBCol>
                <MDBTypography className="display-10">
                  {state.visitorID}
                </MDBTypography>
              </MDBCol>
              <MDBCol>
                <MDBTypography className="display-10">Name</MDBTypography>
              </MDBCol>
              <MDBCol>
                <MDBTypography className="display-10">
                  {state.firstName} {state.lastName}
                </MDBTypography>
              </MDBCol>
              <MDBCol>
                <MDBTypography className="display-10">Email</MDBTypography>
              </MDBCol>
              <MDBCol>
                <MDBTypography className="display-10">
                  {state.email}
                </MDBTypography>
              </MDBCol>
              <MDBCol>
                <MDBTypography className="display-10">
                  Affiliation
                </MDBTypography>
              </MDBCol>
              <MDBCol>
                <MDBTypography className="display-10">
                  {state.affiliation}
                </MDBTypography>
              </MDBCol>
              <MDBCol>
                <MDBTypography className="display-10">Category</MDBTypography>
              </MDBCol>
              <MDBCol>
                <MDBTypography className="display-10">
                  {state.category}
                </MDBTypography>
              </MDBCol>
              <MDBCol>
                <MDBTypography className="display-10">
                  Organization Name
                </MDBTypography>
              </MDBCol>
              <MDBCol>
                <MDBTypography className="display-10">
                  {state.orgName}
                </MDBTypography>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </div>
    </Layout>
  );
};

export default ViewProposer;
