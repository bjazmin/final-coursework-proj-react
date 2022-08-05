import React from 'react';
import { MDBContainer } from 'mdb-react-ui-kit';
import Nav from '../components/Navbar/NavDashboard';
import NavStaff from '../components/Navbar/NavDashboardStaff';
import { getUser } from '../utils/Common';

const DashboardLayout = ({ children }) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          height: '100vh',
          overflow: 'scroll',
        }}
      >
        {getUser().accessType === 'Administrator' ? <Nav /> : <NavStaff />}
        <MDBContainer
          className="m-2"
          style={{ overflowY: 'auto', maxWidth: '100%' }}
        >
          {children}
        </MDBContainer>
      </div>
    </>
  );
};

export default DashboardLayout;
