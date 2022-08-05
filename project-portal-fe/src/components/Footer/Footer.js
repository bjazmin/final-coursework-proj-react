import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBFooter
      style={{}}
      width="100%"
      className="text-center"
      color="white"
      bgColor="dark"
    >
      <div
        className="text-center p-4"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        }}
      >
        © 2022 Copyright Murdoch University
      </div>
    </MDBFooter>
  );
}
