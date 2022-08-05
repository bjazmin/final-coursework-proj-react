import React from 'react';
import { MDBContainer } from 'mdb-react-ui-kit';
import Nav from '../components/Navbar/NavPublic';
import Footer from '../components/Footer/Footer';

function PublicLayout({ children }) {
  return (
    <div>
      <Nav />
      <MDBContainer className="p-5" style={{ minHeight: '80vh' }}>
        {children}
      </MDBContainer>
      <Footer />
    </div>
  );
}

export default PublicLayout;
