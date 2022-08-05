import React from 'react';
import Layout from '../../../../../layouts/DashboardLayout';
import { ToastContainer } from 'react-toastify'; //for toasts or notifications
import { MDBTypography, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import RegAssessReport from './RegAssessReport';
import ExportAssessment from './ExportAssessment';
import ExportRegistrations from './ExportRegistrations';
import NumStudents from './NumStudents';

const Report = () => {
  return (
    <Layout>
      <div
        style={{
          maxHeight: '90vh',
        }}
      ></div>
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
        Reporting
      </MDBTypography>
      <div>
        <MDBRow className="row-cols-1 g-4 justify-content-center">
          <MDBRow className="row-cols-1 row-cols-md-2 g-4">
            <MDBCol md="8" className="col-example">
              <ExportAssessment />
            </MDBCol>
            <MDBCol md="4" className="col">
              <NumStudents />
            </MDBCol>
          </MDBRow>
          <MDBRow className="row-cols-1 row-cols-md-1 g-4">
            <MDBCol className="d-flex justify-content-center">
              <RegAssessReport />
            </MDBCol>
          </MDBRow>
          <MDBRow className="row-cols-1 row-cols-md-1 g-4">
            <MDBCol className="d-flex justify-content-center">
              <ExportRegistrations />
            </MDBCol>
          </MDBRow>
        </MDBRow>
        <br />
      </div>
    </Layout>
  );
};

export default Report;
