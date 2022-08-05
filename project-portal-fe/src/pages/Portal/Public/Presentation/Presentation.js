import React from 'react';
import Moment from 'moment'; //to convert date
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBCol,
} from 'mdb-react-ui-kit';

const Presentation = ({
  presentationID,
  title,
  description,
  date,
  time,
  mode,
  status,
  teamLogo,
}) => {
  Moment.locale('en');
  var dt = date;

  return (
    <MDBCol className="d-flex justify-content-center">
      <MDBCard style={{ width: '22rem' }}>
        <MDBCardImage
          src={
            teamLogo
              ? process.env.REACT_APP_API_URL + teamLogo
              : 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
          }
          width={100}
          height={250}
          position="top"
          alt=""
        />
        <MDBCardBody>
          <MDBCardText>
            {Moment(dt).format('MMM D, yyyy')} | {time}
          </MDBCardText>
          <MDBCardTitle>{title}</MDBCardTitle>
          <MDBCardText>
            {mode} | {status}
          </MDBCardText>
          <MDBCardText>{description.substring(0, 70)} ...</MDBCardText>
          {status !== 'Closed' ? (
            <>
              <MDBBtn
                className="stretched-link"
                href={`/presentations/view/${presentationID}`}
                style={{ backgroundColor: '#e12744', margin: '0.5em' }}
              >
                REGISTER
              </MDBBtn>
              <MDBBtn
                className="stretched-link"
                href={`/presentations/assessment/${presentationID}`}
                style={{ backgroundColor: '#e12744', margin: '0.5em' }}
              >
                ASSESS
              </MDBBtn>
            </>
          ) : (
            ''
          )}
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

export default Presentation;
