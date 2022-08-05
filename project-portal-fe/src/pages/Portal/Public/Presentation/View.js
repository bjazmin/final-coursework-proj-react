import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Moment from 'moment'; //to convert date
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; //for toasts or notifications
import Layout from '../../../../layouts/PublicLayout';
import {
  MDBTypography,
  MDBContainer,
  MDBBtn,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBCard,
} from 'mdb-react-ui-kit';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share';
import emailjs from '@emailjs/browser';
// import { init } from '@emailjs/browser';

const View = () => {
  const { id } = useParams(); //assigns the id that is in URL path
  Moment.locale('en'); //for date conversion
  const [data, setData] = useState({});
  var dt = data.date;
  var pageURL = process.env.REACT_APP_DOMAIN_URL + '/view/' + id;

  const initialValue = {
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    affiliation: '',
    category: 'Visitor',
    orgName: '',
  };

  const [formValue, setFormValue] = useState(initialValue);

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const [isIndustry, setIsIndustry] = useState(false);

  const onCategoryChange = (e) => {
    onChange(e);
    if (e.target.value === 'Industry') {
      setIsIndustry(true);
    } else {
      setIsIndustry(false);
    }
  };

  const orgInput = () => {
    return (
      <MDBInput
        size="lg"
        label="Organization Name"
        type="text"
        name="orgName"
        value={formValue.orgName}
        onChange={onChange}
        required
      />
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formValue.confirmEmail === formValue.email) {
      if (
        formValue.firstName.trim() &&
        formValue.lastName.trim() &&
        formValue.email.trim() &&
        formValue.affiliation.trim() &&
        formValue.category.trim()
      ) {
        if (isIndustry) {
          if (formValue.orgName.trim()) {
            submit();
          } else {
            toast.error('Please fill in organization name');
          }
        } else {
          submit();
        }
      } else {
        toast.error('Please fill in all required fields');
      }
    } else {
      toast.error('Your email does not match');
    }
  };

  // handle button click of login form
  const submit = () => {
    axios
      .post(process.env.REACT_APP_API_URL + '/presentations/registration/', {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        affiliation: formValue.affiliation,
        category: formValue.category,
        orgName: formValue.orgName,
        presentationID: id,
      })
      .then((response) => {
        if (response.data === 'OK') {
          toast.success('Registration successful');
          const userdetails = {
            email: formValue.email,
            title: data.title,
            date: Moment(data.date).format('MMM D, yyyy') + ' | ' + data.time,
            location: data.location,
          };
          emailjs.send(
            process.env.REACT_APP_EMAIL_SID,
            process.env.REACT_APP_EMAIL_REG_TEMP,
            userdetails,
            process.env.REACT_APP_EMAIL_UID2 || process.env.REACT_APP_EMAIL_UID
          );
          setFormValue(initialValue); //reset the form
        }
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

  //.then lets get the response from the server and target the first data in array to set as state
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + `/presentations/get/${id}`)
      .then((response) => setData({ ...response.data[0] }));
  }, [id]);

  return (
    <div className="background">
      <Layout>
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
        <MDBContainer>
          <MDBTypography className="text-center p-5 display-4">
            {data.title}
          </MDBTypography>
          <div>
            <p>{data.description}</p>
            {data.teamLogo ? (
              <img
                src={process.env.REACT_APP_API_URL + data.teamLogo}
                position="top"
                alt=""
                width={100}
                height={100}
              />
            ) : (
              ''
            )}
            <p>
              <br />
              <strong>Team Name: </strong>
              {data.teamName}
            </p>
            <p>
              <p>
                <strong>Host: </strong>
                {data.host}
              </p>
              <strong>Date and Time: </strong>
              {Moment(dt).format('MMM D, yyyy')} | {data.time} | {data.mode}
            </p>
            {data.mode === 'In-person' ? (
              data.location ? (
                <p>
                  <strong>Location: </strong> {data.location}{' '}
                </p>
              ) : (
                ''
              )
            ) : (
              ''
            )}
            <p>
              <strong>Share this event: </strong>
            </p>
            <FacebookShareButton url={pageURL} title={data.title}>
              <MDBBtn
                size="lg"
                floating
                style={{ backgroundColor: '#2b2b2b', marginRight: '1em' }}
              >
                <MDBIcon fab icon="facebook-f" />
              </MDBBtn>
            </FacebookShareButton>
            <TwitterShareButton url={pageURL} title={data.title}>
              <MDBBtn
                size="lg"
                floating
                style={{ backgroundColor: '#2b2b2b', marginRight: '1em' }}
              >
                <MDBIcon fab icon="twitter" />
              </MDBBtn>
            </TwitterShareButton>
            <LinkedinShareButton url={pageURL} title={data.title}>
              <MDBBtn
                size="lg"
                floating
                style={{ backgroundColor: '#2b2b2b', marginRight: '1em' }}
              >
                <MDBIcon fab icon="linkedin-in" />
              </MDBBtn>
            </LinkedinShareButton>
            <br /> <br />
          </div>
        </MDBContainer>
        <MDBCard
          className="p-5"
          style={{ backgroundColor: 'white', radius: '' }}
        >
          <MDBTypography className="text-center p-5 display-6">
            Registration
          </MDBTypography>
          <form onSubmit={handleSubmit}>
            <MDBRow className="row-cols-1 row-cols-md-2 g-4">
              <MDBCol>
                <MDBInput
                  size="lg"
                  label="First Name"
                  type="text"
                  name="firstName"
                  value={formValue.firstName}
                  onChange={onChange}
                  required
                  autoComplete="off"
                />
                <br />
                <MDBInput
                  size="lg"
                  label="Last Name"
                  type="text"
                  name="lastName"
                  value={formValue.lastName}
                  onChange={onChange}
                  required
                  autoComplete="off"
                />
              </MDBCol>
              <MDBCol>
                <MDBInput
                  size="lg"
                  label="Email address"
                  type="email"
                  name="email"
                  value={formValue.email}
                  onChange={onChange}
                  required
                  autoComplete="off"
                />
                <br />
                <MDBInput
                  size="lg"
                  label="Confirm email address"
                  type="email"
                  value={formValue.confirmEmail}
                  name="confirmEmail"
                  onChange={onChange}
                  required
                  autoComplete="off"
                />
              </MDBCol>
              <MDBCol>
                <MDBInput
                  size="lg"
                  label="Affiliation"
                  type="text"
                  value={formValue.affiliation}
                  name="affiliation"
                  onChange={onChange}
                  required
                  autoComplete="off"
                />
              </MDBCol>
              <MDBCol>
                <select
                  className="form-select form-select-lg mb-3"
                  name="category"
                  onChange={onCategoryChange}
                  value={formValue.category}
                >
                  <option value="Visitor">Visitor</option>
                  <option value="Student">Student</option>
                  <option value="Staff">Murdoch Staff</option>
                  <option value="Industry">Industry</option>
                </select>
              </MDBCol>
            </MDBRow>
            <br />
            {isIndustry ? orgInput() : <br />}
            <div className="text-center py-4 mt-3">
              <MDBBtn type="submit" style={{ backgroundColor: '#e12744' }}>
                Submit
              </MDBBtn>
            </div>
          </form>
        </MDBCard>
      </Layout>
    </div>
  );
};

export default View;
