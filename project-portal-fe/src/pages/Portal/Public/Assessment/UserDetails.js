import React from 'react';
import { useParams } from 'react-router-dom';
import { MDBBtn, MDBCol, MDBInput, MDBRow } from 'mdb-react-ui-kit';
import axios from 'axios';
import { toast } from 'react-toastify'; //for toasts or notifications

const UserDetails = (props) => {
  const email = props.formValue.email;
  const { id } = useParams(); //assigns the id that is in URL path

  const next = () => {
    props.nextStep();
  };

  const handleContinue = () => {
    axios
      .post(
        process.env.REACT_APP_API_URL + '/presentations/assessment/checkemail',
        {
          email: email,
          presentationID: id,
        }
      )
      .then((response) => {
        const dataID = response.data[0].visitorID;
        props.formValue.category = response.data[0].category;
        checkRecord(dataID);
      })
      .catch((error) => {
        if (!error.response) {
          toast.error('Something went wrong. Please try again later.');
        } else {
          if (error.response.status === 400 || error.response.status === 401) {
            toast.error(error.response.data.message);
          } else {
            toast.error('Something went wrong. Please try again later.');
          }
        }
      });
  };

  const checkRecord = (dataID) => {
    axios
      .post(
        process.env.REACT_APP_API_URL +
          '/presentations/assessment/checkemail/record',
        {
          visitorID: dataID,
          presentationID: id,
        }
      )
      .then((response) => {
        if (response.data === 'OK') {
          next();
        }
      })
      .catch((error) => {
        if (!error.response) {
          toast.error('Something went wrong. Please try again later.');
        } else {
          if (error.response.status === 401) {
            toast.error(error.response.data.message);
          } else {
            toast.error('Something went wrong. Please try again later.');
          }
        }
      });
  };

  return (
    <>
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md={6}>
          <MDBInput
            size="lg"
            label="Email address"
            type="email"
            name="email"
            value={props.formValue.email}
            onChange={(e) => props.onChange(e)}
            required
            autoComplete="off"
          />
        </MDBCol>
      </MDBRow>

      <br />
      <MDBBtn
        className="mx-auto"
        type="button"
        style={{ backgroundColor: '#e12744' }}
        onClick={() => handleContinue()}
      >
        Continue
      </MDBBtn>
    </>
  );
};

export default UserDetails;
