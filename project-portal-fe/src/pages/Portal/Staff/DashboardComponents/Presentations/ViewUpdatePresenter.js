import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios'; //for making requests
import Layout from '../../../../../layouts/DashboardLayout';
import { ToastContainer, toast } from 'react-toastify'; //for toasts or notifications
import { MDBTypography, MDBBtn, MDBInput } from 'mdb-react-ui-kit';

const ViewUpdatePresenter = () => {
  const { presentationID, studentID } = useParams();
  const initialState = {
    studentID: '',
    firstName: '',
    lastName: '',
    email: '',
  };
  const [state, setState] = useState(initialState);
  const navigate = useNavigate(); //to be able to navigate back to a page

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL + `/dashboard/presenter/get/${studentID}`
      )
      .then((resp) => setState({ ...resp.data[0] }));
  }, [studentID]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !state.studentID ||
      !state.firstName.trim() ||
      !state.lastName.trim() ||
      !state.email.trim()
    ) {
    } else {
      submit();
    }
  };

  const submit = () => {
    axios
      .put(
        process.env.REACT_APP_API_URL +
          `/dashboard/presenter/update/${studentID}`,
        {
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
        }
      )
      .then((response) => {
        if (response.data === 'OK') {
          navigate(`/dashboard/presentation/presenters/${presentationID}`);
        }
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
          Presenter Details
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
            label="Student Number"
            type="text"
            name="studentID"
            onChange={handleInputChange}
            value={state.studentID}
            required
            autoComplete="off"
            disabled
          />
          <br />
          <MDBInput
            size="lg"
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
            size="lg"
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
            size="lg"
            label="Email"
            type="email"
            name="email"
            value={state.email}
            onChange={handleInputChange}
            required
            autoComplete="off"
          />
          <br />

          <Link to={`/dashboard/presentation/presenters/${presentationID}`}>
            <button
              className="btn btn-dark"
              style={{
                marginRight: '0.5em',
              }}
            >
              BACK
            </button>
          </Link>

          <MDBBtn
            type="submit"
            style={{ backgroundColor: '#e12744', marginRight: '.5em' }}
          >
            Save
          </MDBBtn>
        </form>
      </div>
    </Layout>
  );
};

export default ViewUpdatePresenter;
