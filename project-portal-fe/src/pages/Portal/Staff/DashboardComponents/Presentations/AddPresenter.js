import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; //for toasts or notifications
import {
  MDBBtn,
  MDBInput,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

const AddPresenter = (props) => {
  const { id } = useParams(); //id of the presentation

  const initialState = {
    studentID: '',
    firstName: '',
    lastName: '',
    email: '',
  };

  const [duplicate, setDuplicate] = useState({});
  const [error, setError] = useState(false);
  const toggleError = () => setError(!error);

  const [state, setState] = useState(initialState);

  const handleSubmit = () => {
    if (
      !state.studentID.trim() ||
      !state.firstName.trim() ||
      !state.lastName.trim() ||
      !state.email.trim()
    ) {
      toast.error('Please provide value into each input field');
    } else {
      submit();
    }
  };

  const submit = () => {
    axios
      .post(process.env.REACT_APP_API_URL + `/dashboard/presenter/add`, {
        studentID: state.studentID,
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
      })
      .then((response) => {
        if (response.data.status === 200) {
          //request to update preseter_assigned table
          axios
            .post(
              process.env.REACT_APP_API_URL +
                `/dashboard/presenter/assigned/add`,
              {
                presentationID: id,
                studentID: 'STU-' + state.studentID,
              }
            )
            .then((response) => {
              if (response.data === 'OK') {
                toast.success(
                  'Presenter details added and assigned to the presentation successfully'
                );
              }
            })
            .catch((error) => {
              if (error.response.status === 409) {
                toast.error(error.response.data.message);
              } else {
                toast.error('Something went wrong. Please try again later.');
              }
            });
          setState(initialState);
        }
      })
      .catch((error) => {
        if (!error.response) {
          toast.error('Something went wrong. Please try again later.');
        } else {
          if (error.response.status === 409) {
            setDuplicate(error.response.data.sData);
            toggleError();
          } else if (error.response.status === 400) {
            toast.error(error.response.data.message);
          } else {
            toast.error('Something went wrong. Please try again later.');
          }
        }
      });
  };

  const submitUpdate = () => {
    axios
      .put(
        process.env.REACT_APP_API_URL +
          `/dashboard/presenter/update/${duplicate.studentID}`,
        {
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
        }
      )
      .then((response) => {
        if (response.data === 'OK') {
          axios
            .post(
              process.env.REACT_APP_API_URL +
                `/dashboard/presenter/assigned/add`,
              {
                presentationID: id,
                studentID: duplicate.studentID,
              }
            )
            .then((response) => {
              if (response.data === 'OK') {
                toast.success(
                  'Presenter details updated and assigned to the presentation successfully'
                );
              }
            })
            .catch((error) => {
              if (error.response.status === 409) {
                toast.error(error.response.data.message);
              } else {
                toast.error('Something went wrong. Please try again later.');
              }
            });
          setState(initialState);
        }
        setState(initialState);
      })
      .catch((error) => {
        if (!error.response) {
          toast.error('Something went wrong. Please try again later.');
        } else {
          if (error.response.status === 400) {
            toast.error(error.response.data.message);
          } else {
            toast.error('Something went wrong. Please try again later.');
          }
        }
      });
  };

  const handleInputChange = (e) => {
    //name and value from form properties
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <>
      <MDBModal show={props.modal} setShow={props.setModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Add Presenter</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => {
                  props.toggleShow();
                }}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBInput
                size="md"
                label="Student Number"
                type="text"
                name="studentID"
                onChange={handleInputChange}
                required
                autoComplete="off"
              />
              <br />
              <MDBInput
                size="md"
                label="First Name"
                type="text"
                name="firstName"
                value={state.firstName}
                onChange={handleInputChange}
                required
                autoComplete="off"
              />
              <br />
              <MDBInput
                size="md"
                label="Last Name"
                type="text"
                name="lastName"
                value={state.lastName}
                onChange={handleInputChange}
                required
                autoComplete="off"
              />
              <br />
              <MDBInput
                size="md"
                label="Email"
                type="email"
                name="email"
                value={state.email}
                onChange={handleInputChange}
                required
                autoComplete="off"
              />
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                className="btn-dark"
                onClick={() => {
                  props.toggleShow();
                }}
              >
                CLOSE
              </MDBBtn>
              <MDBBtn
                style={{ backgroundColor: '#e12744' }}
                onClick={() => {
                  handleSubmit();
                  props.toggleShow();
                }}
              >
                ADD
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <MDBModal show={error} setShow={setError} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>Confirm or Update Presenter Details</MDBModalHeader>
            <MDBModalBody>
              The Student ID already exists with details of{' '}
              {duplicate.firstName} {duplicate.lastName}, {duplicate.email}. Do
              you confirm or want to update the details then add to the
              presentation?
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                className="btn-dark"
                onClick={() => {
                  toggleError();
                }}
              >
                NO
              </MDBBtn>
              <MDBBtn
                style={{ backgroundColor: '#e12744' }}
                onClick={() => {
                  toggleError();
                  submitUpdate();
                }}
              >
                YES
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};
export default AddPresenter;
