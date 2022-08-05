import React, { useState, useEffect } from 'react';
import axios from 'axios'; //to make a requests from our backend
import { MDBCard, MDBCardBody, MDBTypography } from 'mdb-react-ui-kit';
const NumStudents = () => {
  const [total, setTotal] = useState(0);

  const loadData = async () => {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + '/dashboard/report/get/presenters'
    );
    setTotal(response.data[0].total);
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <MDBCard style={{ maxHeight: '20rem' }}>
      <MDBCardBody>
        <MDBTypography tag="div" className="display-1 pb-3 mb-3 border-bottom">
          {total}
        </MDBTypography>
        <p className="small text-muted">
          Number of Presenters for Upcoming/Ongoing Presentations
        </p>
      </MDBCardBody>
    </MDBCard>
  );
};

export default NumStudents;
