import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios'; //for making requests
import Layout from '../../../../../layouts/DashboardLayout';
import { ToastContainer, toast } from 'react-toastify'; //for toasts or notifications
import { MDBTypography, MDBBtn, MDBInput } from 'mdb-react-ui-kit';

const AddEditUnit = () => {
  const { id } = useParams();

  const initialState = {
    unitCode: '',
    unitName: '',
    discipline: '',
  };

  const [state, setState] = useState(initialState);
  const { unitCode, unitName, discipline } = state;

  const navigate = useNavigate(); //to be able to navigate back to a page

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + `/dashboard/unit/get/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!unitID || !unitCode || !unitName || !discipline) {
    // toast.error('Please provide value into each input field');
    if (!unitCode) {
      toast.error('Please provide value for unitCode');
      if (!unitName) {
        toast.error('Please provide value for unitName');
      }
      if (!discipline) {
        toast.error('Please provide value for discipline');
      }
    } else {
      if (!id) {
        axios
          .post(process.env.REACT_APP_API_URL + '/dashboard/unit/add', {
            unitCode,
            unitName,
            discipline,
          })
          .then((response) => {
            if (response.data === 'OK') {
              toast.success('Unit details added successfully');
              setState(initialState);
              setTimeout(() => navigate('/dashboard/units', 500));
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
          .put(process.env.REACT_APP_API_URL + `/dashboard/unit/update/${id}`, {
            unitCode,
            unitName,
            discipline,
          })
          .then((response) => {
            if (response.data === 'OK') {
              toast.success('Unit details updated successfully');
              setState(initialState);
              setTimeout(() => navigate('/dashboard/units', 500));
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
          Unit Details
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
            label="Unit Code"
            type="text"
            name="unitCode"
            value={unitCode || ''}
            onChange={handleInputChange}
            required
          />
          <br />
          <MDBInput
            size="lg"
            label="Unit Name"
            type="text"
            name="unitName"
            value={unitName || ''}
            onChange={handleInputChange}
            required
          />
          <br />
          <MDBInput
            size="lg"
            label="Discipline"
            type="text"
            name="discipline"
            value={discipline || ''}
            onChange={handleInputChange}
            required
          />
          <br />
          <Link to="/dashboard/units">
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
        </form>
      </div>
    </Layout>
  );
};

export default AddEditUnit;
