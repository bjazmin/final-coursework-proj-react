import React from 'react';
import Layout from '../../../../layouts/DashboardLayout';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBTypography,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';

const TeachingStaff = (props) => {
  const user = props.user;

  return (
    <div>
      <Layout>
        <MDBTypography className="text-center pt-5 display-4">
          Welcome {user.firstName}
        </MDBTypography>
        <MDBTypography className="text-center pb-5 display-7">
          {user.accessType}
        </MDBTypography>
        <MDBRow className="row-cols-1 row-cols-md-3 g-4 justify-content-center">
          <MDBCol>
            <MDBCard style={{ maxWidth: '26rem' }}>
              <MDBCardBody>
                <MDBCardTitle>
                  <a
                    className="stretched-link"
                    href="/dashboard/reports"
                    style={{ textDecoration: 'none', color: '#000000' }}
                  >
                    View Reports
                  </a>
                </MDBCardTitle>
                <MDBCardText>View reports or download submission</MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol>
            <MDBCard style={{ maxWidth: '26rem' }}>
              <MDBCardBody>
                <MDBCardTitle>
                  <a
                    className="stretched-link"
                    href="/dashboard/changepassword"
                    style={{ textDecoration: 'none', color: '#000000' }}
                  >
                    Change Password
                  </a>
                </MDBCardTitle>
                <MDBCardText>
                  Update or change your current password
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </Layout>
    </div>
  );
};

export default TeachingStaff;
