import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios'; //for making requests
import Layout from '../../../../../../layouts/DashboardLayout';
import { ToastContainer, toast } from 'react-toastify'; //for toasts or notifications
import {
  MDBInput,
  MDBTypography,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import emailjs from '@emailjs/browser';

const AddEditStaff = () => {
  const navigate = useNavigate(); //to be able to navigate back to a page
  const { id } = useParams();
  const initialState = {
    staffID: '',
    firstName: '',
    lastName: '',
    email: '',
    accessType: '',
  };
  const [state, setState] = useState(initialState);
  const { staffID, firstName, lastName, email, accessType } = state;

  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + `/dashboard/staff/get/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!staffID) {
      toast.error('Please provide value for Staff ID');
      if (!firstName.trim()) {
        toast.error('Please provide value for First Name');
      }
      if (!lastName.trim()) {
        toast.error('Please provide value for Last Name');
      }
      if (!email.trim()) {
        toast.error('Please provide value for Email');
      }
      if (!accessType.trim()) {
        toast.error('Please provide value for AccessType');
      }
    } else {
      if (!id) {
        axios
          .post(process.env.REACT_APP_API_URL + '/dashboard/staff/add', {
            staffID: state.staffID,
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            accessType: state.accessType,
          })
          .then((response) => {
            if (response.status === 200) {
              toast.success('Staff details added successfully');

              const userdetails = {
                email: state.email,
                url: process.env.REACT_APP_DOMAIN_URL + '/login',
                password: response.data.password,
              };

              emailjs.send(
                process.env.REACT_APP_EMAIL_SID,
                process.env.REACT_APP_EMAIL_ACCESS_TEMP,
                userdetails,
                process.env.REACT_APP_EMAIL_UID
              );

              setState(initialState);
              setTimeout(() => navigate('/dashboard/staff', 500));
            }
          })
          .catch((error) => {
            if (!error.response) {
              toast.error('Something went wrong. Please try again later.');
            } else {
              if (
                error.response.status === 400 ||
                error.response.status === 409
              ) {
                toast.error(error.response.data.message);
              } else {
                toast.error('Something went wrong. Please try again later.');
              }
            }
          });
      } else {
        axios
          .put(
            process.env.REACT_APP_API_URL + `/dashboard/staff/update/${id}`,
            {
              staffID: state.staffID,
              firstName: state.firstName,
              lastName: state.lastName,
              email: state.email,
              accessType: state.accessType,
            }
          )
          .then((response) => {
            if (response.data === 'OK') {
              toast.success('Staff details updated successfully');
              setState(initialState);
              setTimeout(() => navigate('/dashboard/staff', 500));
            }
          })
          .catch((error) => {
            if (!error.response) {
              toast.error('Something went wrong. Please try again later.');
            } else {
              if (
                error.response.status === 400 ||
                error.response.status === 409
              ) {
                toast.error(error.response.data.message);
              } else {
                toast.error('Something went wrong. Please try again later.');
              }
            }
          });
      }
    }
  };

  const handleInputChange = (e) => {
    //name and value from form properties
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const resetPassword = () => {
    if (id) {
      axios
        .put(
          process.env.REACT_APP_API_URL + `/dashboard/staff/resetpassword/${id}`
        )
        .then((response) => {
          if (response.status === 200) {
            const userdetails = {
              email: email,
              password: response.data.password,
            };
            //emailjs.init(process.env.REACT_APP_EMAIL_UID);
            const sendEmail = emailjs.send(
              process.env.REACT_APP_EMAIL_SID,
              process.env.REACT_APP_EMAIL_RESETPASS_TEMP,
              userdetails,
              process.env.REACT_APP_EMAIL_UID
            );
            toast.promise(sendEmail, {
              pending: 'Sending the new password...',
              success: 'New password sent to user',
              error: 'Something went wrong. Please try again later.',
            });
          }
        })
        .catch((error) => {
          if (!error.response) {
            toast.error('Something went wrong. Please try again later.');
          } else {
            if (
              error.response.status === 400 ||
              error.response.status === 409
            ) {
              toast.error(error.response.data.message);
            } else {
              toast.error('Something went wrong. Please try again later.');
            }
          }
        });
    }
  };

  return (
    <Layout>
      <div
        style={{
          maxHeight: '90vh',
        }}
      >
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <MDBTypography className="text-center p-5 display-6">
          User Details
        </MDBTypography>
        <form
          onSubmit={handleSubmit}
          style={{
            margin: 'auto',
            padding: '15px',
            maxWidth: '400px',
            alignContent: 'center',
          }}
        >
          <MDBInput
            size="lg"
            label="Staff ID"
            type="text"
            name="staffID"
            value={staffID || ''}
            onChange={handleInputChange}
            required
            autoComplete="off"
          />
          <br />
          <MDBInput
            size="lg"
            label="First Name"
            type="text"
            name="firstName"
            value={firstName || ''}
            onChange={handleInputChange}
            required
            autoComplete="off"
          />
          <br />
          <MDBInput
            size="lg"
            label="Last Name"
            type="text"
            name="lastName"
            value={lastName || ''}
            onChange={handleInputChange}
            required
            autoComplete="off"
          />
          <br />
          <MDBInput
            size="lg"
            label="Email"
            type="email"
            name="email"
            value={email || ''}
            onChange={handleInputChange}
            required
            autoComplete="off"
          />
          <br />
          <label htmlFor="accessType">Access Type</label>
          <select
            className="form-select form-select-lg mb-3"
            name="accessType"
            onChange={handleInputChange}
            value={accessType || 'None'}
          >
            <option defaultValue="None">None</option>
            <option value="Administrator">Administrator</option>
            <option value="Teaching Staff">Teaching Staff</option>
          </select>
          <Link to="/dashboard/staff">
            <button
              className="btn btn-dark"
              style={{
                marginRight: '0.5em',
              }}
            >
              Back
            </button>
          </Link>
          <MDBBtn
            type="submit"
            style={{ backgroundColor: '#e12744', marginRight: '.5em' }}
          >
            Save
          </MDBBtn>
          {id ? (
            <MDBBtn
              type="button"
              style={{ backgroundColor: '#e12744' }}
              onClick={() => {
                toggleShow();
              }}
            >
              Reset Password
            </MDBBtn>
          ) : (
            ''
          )}
        </form>
        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Confirm Password Reset</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleShow}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                Confirm to set new password for {id} ?
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn
                  className="btn-dark"
                  onClick={() => {
                    toggleShow();
                  }}
                >
                  No
                </MDBBtn>
                <MDBBtn
                  style={{ backgroundColor: '#e12744' }}
                  onClick={() => {
                    resetPassword();
                    toggleShow();
                  }}
                >
                  Yes
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </div>
    </Layout>
  );
};

export default AddEditStaff;
