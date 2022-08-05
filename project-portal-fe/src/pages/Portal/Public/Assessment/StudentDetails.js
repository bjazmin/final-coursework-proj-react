import React from 'react';
import { useParams } from 'react-router-dom';
import { MDBBtn, MDBCol, MDBInput, MDBRow } from 'mdb-react-ui-kit';
import axios from 'axios';
import { toast } from 'react-toastify'; //for toasts or notifications

const StudentDetails = (props) => {
  const { id } = useParams(); //assigns the id that is in URL path

  const next = () => {
    props.nextStep();
  };

  const prev = () => {
    props.prevStep(1);
  };

  const getStudentId = () => {
    if (!props.formValue.studentID) {
      toast.error('Please fill in your student number');
    } else {
      handleContinue();
    }
  };

  const handleContinue = () => {
    axios
      .post(
        process.env.REACT_APP_API_URL +
          '/presentations/assessment/checkstudent',
        {
          studentID: props.formValue.studentID,
          presentationID: id,
        }
      )
      .then((response) => {
        if (response.data === 'OK') next();
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

  return (
    <div>
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md={6}>
          <MDBInput
            size="lg"
            label="Student Number"
            type="number"
            name="studentID"
            onChange={(e) => props.onChange(e)}
            required
            autoComplete="off"
          />
        </MDBCol>
      </MDBRow>
      <br />
      <div className="text-center">
        <MDBBtn
          type="button"
          style={{ backgroundColor: '#e12744', marginRight: '1em' }}
          onClick={() => prev()}
        >
          Back
        </MDBBtn>
        <MDBBtn
          type="button"
          style={{ backgroundColor: '#e12744' }}
          onClick={() => getStudentId()}
        >
          Continue
        </MDBBtn>
      </div>
    </div>
  );
};

export default StudentDetails;
