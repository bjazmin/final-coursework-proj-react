import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Moment from 'moment'; //to convert date
import axios from 'axios'; //for making requests
import Layout from '../../../../../layouts/DashboardLayout';
import { ToastContainer, toast } from 'react-toastify'; //for toasts or notifications
import {
  MDBTypography,
  MDBBtn,
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';

const ViewUpdateProposal = () => {
  const { id } = useParams();

  const initialState = {
    proposalID: '',
    title: '',
    discipline: '',
    file: '',
    status: '',
    dateSubmitted: '',
    visitorID: '',
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + `/dashboard/proposal/get/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(process.env.REACT_APP_API_URL + `/dashboard/proposal/update/${id}`, {
        discipline: state.discipline,
        status: state.status,
      })
      .then((response) => {
        if (response.data === 'OK') {
          toast.success('Proposal updated successfully');
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

  const download = () => {
    axios
      .get(
        process.env.REACT_APP_API_URL + `/dashboard/proposal/download/${id}`,
        {
          responseType: 'blob',
        }
      )
      .then((response) => {
        if (response) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute(
            'download',
            response.headers['content-disposition']
              .split('filename=')[1]
              .replace(/['"]+/g, '')
          );
          document.body.appendChild(link); // Append to html link element page
          link.click(); // Start download
          link.parentNode.removeChild(link); // Clean up and remove the link
        }
      })
      .catch((error) => {
        if (!error.response || error) {
          toast.error('Something went wrong. Please try again later.');
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
          Proposal Details
        </MDBTypography>
        <form onSubmit={handleSubmit}>
          <MDBCard style={{ maxWidth: '40rem' }} className="mx-auto">
            <MDBCardBody className="p-5">
              <MDBRow className="row-cols-2 row-cols-md-2 g-4 p-2">
                <MDBCol>
                  <MDBTypography className="display-10">
                    Proposal ID
                  </MDBTypography>
                </MDBCol>
                <MDBCol>
                  <MDBTypography className="display-10">
                    {state.proposalID}
                  </MDBTypography>
                </MDBCol>
                <MDBCol>
                  <MDBTypography className="display-10">Title</MDBTypography>
                </MDBCol>
                <MDBCol>
                  <MDBTypography className="display-10">
                    {state.title}
                  </MDBTypography>
                </MDBCol>
                <MDBCol>
                  <MDBTypography className="display-10">
                    Discipline
                  </MDBTypography>
                </MDBCol>
                <MDBCol>
                  <MDBInput
                    size="md"
                    label="Discipline"
                    type="text"
                    name="discipline"
                    value={state.discipline || ''}
                    onChange={handleInputChange}
                    required
                    autoComplete="off"
                  />
                </MDBCol>
                <MDBCol>
                  <MDBTypography className="display-10">
                    Date Submitted
                  </MDBTypography>
                </MDBCol>
                <MDBCol>
                  <MDBTypography className="display-10">
                    {Moment(state.dateSubmitted).format('yyyy-MM-D')}
                  </MDBTypography>
                </MDBCol>
                <MDBCol>
                  <MDBTypography className="display-10">
                    Uploaded file
                  </MDBTypography>
                </MDBCol>
                <MDBCol>
                  <MDBBtn
                    onClick={download}
                    style={{
                      backgroundColor: '#e12744',
                    }}
                    type="button"
                  >
                    Download
                  </MDBBtn>
                </MDBCol>
                <MDBCol>
                  <MDBTypography className="display-10">
                    Submitted by
                  </MDBTypography>
                </MDBCol>
                <MDBCol>
                  <Link to={`/dashboard/visitor/${state.visitorID}`}>
                    <button
                      className="btn btn-dark"
                      style={{
                        marginRight: '0.5em',
                      }}
                    >
                      View Proposer
                    </button>
                  </Link>
                </MDBCol>
                <MDBCol>
                  <MDBTypography className="display-10">Status</MDBTypography>
                </MDBCol>

                <MDBCol>
                  <select
                    className="form-select form-select-lg mb-3"
                    name="status"
                    onChange={handleInputChange}
                    value={state.status}
                  >
                    <option value="Submitted">Submitted</option>
                    <option value="Reviewing">Reviewing</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </MDBCol>
              </MDBRow>
              <div className="text-center">
                <Link to="/dashboard/proposals">
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
              </div>
            </MDBCardBody>
          </MDBCard>
        </form>
      </div>
    </Layout>
  );
};

export default ViewUpdateProposal;
