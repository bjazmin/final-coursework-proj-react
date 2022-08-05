import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MDBTypography, MDBContainer, MDBCard } from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify'; //for toasts or notifications
import Layout from '../../../../layouts/PublicLayout';
import UserDetails from './UserDetails';
import StudentDetails from './StudentDetails';
import CriteriaDetails from './CriteriaDetails';

const Assessment = () => {
  const [data, setData] = useState({});
  const { id } = useParams(); //assigns the id that is in URL path

  const initialValue = {
    step: 1,
    email: '',
    category: '',
    c1: null,
    c2: null,
    c3: null,
    c4: null,
    c5: null,
    c6: null,
    c7: null,
    c8: null,
    c9: null,
    c10: null,
    comments: '',
    studentID: 0,
  };

  const [formValue, setFormValue] = useState(initialValue);

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    const { step } = formValue;
    setFormValue({ ...formValue, step: step + 1 });
  };

  const prevStep = (value) => {
    const { step } = formValue;
    setFormValue({ ...formValue, step: step - value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitForm();
  };

  // handle button click of login form
  const submitForm = () => {
    axios
      .post(process.env.REACT_APP_API_URL + '/presentations/assessment/', {
        email: formValue.email,
        presentationID: id,
        c1: formValue.c1,
        c2: formValue.c2,
        c3: formValue.c3,
        c4: formValue.c4,
        c5: formValue.c5,
        c6: formValue.c6,
        c7: formValue.c7,
        c8: formValue.c8,
        c9: formValue.c9,
        c10: formValue.c10,
        comments: formValue.comments,
      })
      .then((response) => {
        if (response.data === 'OK') {
          toast.success('Assessment submitted!');
          setFormValue(initialValue);
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
  //use effect will only run if we have the id
  //.then lets get the response from the server and target the first data in array to set as state
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + `/presentations/get/${id}`)
      .then((response) => setData({ ...response.data[0] }));
  }, [id]);

  function loadForm() {
    switch (formValue.step) {
      case 1:
        return (
          <UserDetails
            nextStep={nextStep}
            onChange={onChange}
            formValue={formValue}
          />
        );
      case 2:
        if (formValue.category === 'Student') {
          return (
            <StudentDetails
              nextStep={nextStep}
              prevStep={prevStep}
              onChange={onChange}
              formValue={formValue}
            />
          );
        }
        nextStep();
        break;
      case 3:
        return (
          <CriteriaDetails
            prevStep={prevStep}
            onChange={onChange}
            handleSubmit={handleSubmit}
            formValue={formValue}
          />
        );
      default:
        break;
    }
  }

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
        </MDBContainer>
        <MDBCard
          className="p-5"
          style={{ backgroundColor: 'white', radius: '' }}
        >
          <MDBTypography className="text-center p-5 display-6">
            Assessment Form
          </MDBTypography>
          {loadForm()}
        </MDBCard>
      </Layout>
    </div>
  );
};

export default Assessment;
