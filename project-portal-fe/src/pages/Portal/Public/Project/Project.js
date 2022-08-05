import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCol,
} from 'mdb-react-ui-kit';

const Project = ({ projectID, title, description, projectBanner }) => {
  return (
    <MDBCol className="d-flex justify-content-center">
      <MDBCard style={{ maxWidth: '22rem' }}>
        <MDBCardImage
          src={
            projectBanner
              ? process.env.REACT_APP_API_URL + projectBanner
              : 'https://mdbootstrap.com/img/new/standard/nature/184.webp'
          }
          position="top"
          alt=""
        />
        <MDBCardBody>
          <MDBCardTitle>
            <a
              className="stretched-link"
              href={`/projects/view/${projectID}`}
              style={{ textDecoration: 'none', color: '#000000' }}
            >
              {title}
            </a>
          </MDBCardTitle>

          <MDBCardText>{description.substring(0, 70)}...</MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

export default Project;
