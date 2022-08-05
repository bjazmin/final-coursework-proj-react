import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../../utils/Common';
import Layout from '../../../layouts/DashboardLayout';
import axios from 'axios'; //for making requests
import { ToastContainer, toast } from 'react-toastify';
import { MDBInput, MDBTypography, MDBBtn } from 'mdb-react-ui-kit';

const ChangePassword = () => {
  const id = getUser().staffID;

  const initialValue = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const [isValidPassword, setIsValidPassword] = useState(false);
  const [formValue, setFormValue] = useState(initialValue);

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
    console.log(formValue);
    console.log(id);
  };

  const handleValidation = (e) => {
    const passwordInputValue = e.target.value.trim();
    const passwordInputFieldName = e.target.name;
    //for password
    if (passwordInputFieldName === 'newPassword') {
      const uppercaseRegExp = /(?=.*?[A-Z])/;
      const lowercaseRegExp = /(?=.*?[a-z])/;
      const digitsRegExp = /(?=.*?[0-9])/;
      const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
      const minLengthRegExp = /.{8,}/;
      const passwordLength = passwordInputValue.length;
      const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
      const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
      const digitsPassword = digitsRegExp.test(passwordInputValue);
      const specialCharPassword = specialCharRegExp.test(passwordInputValue);
      const minLengthPassword = minLengthRegExp.test(passwordInputValue);
      let errMsg = '';
      if (passwordLength === 0) {
        errMsg = 'Password is empty';
      } else if (!uppercasePassword) {
        errMsg = 'At least one Uppercase';
      } else if (!lowercasePassword) {
        errMsg = 'At least one Lowercase';
      } else if (!digitsPassword) {
        errMsg = 'At least one digit';
      } else if (!specialCharPassword) {
        errMsg = 'At least one Special Characters';
      } else if (!minLengthPassword) {
        errMsg = 'At least minumum 8 characters';
      } else {
        errMsg = '';
        setIsValidPassword(!isValidPassword);
      }

      if (errMsg.trim()) {
        setIsValidPassword(false);
        toast.error(errMsg);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidPassword === true) {
      if (formValue.newPassword === formValue.confirmPassword) {
        if (
          !formValue.currentPassword.trim() ||
          !formValue.newPassword.trim()
        ) {
          toast.error('Please fill in your current or new password');
        } else {
          submit();
        }
      } else {
        toast.error('New password and confirm password does not match');
      }
    } else {
      toast.error(
        'Password must include both lower and upper case characters, at least one number and symbol, and be atleast 8 characters long'
      );
    }
  };

  const submit = () => {
    axios
      .put(process.env.REACT_APP_API_URL + `/login/changepassword/${id}`, {
        currentPassword: formValue.currentPassword,
        newPassword: formValue.newPassword,
      })
      .then((response) => {
        if (response.data === 'OK') {
          toast.success('Password has been changed successfully');
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

  return (
    <>
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
            Change Password
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
              label="Type your current password"
              type="password"
              name="currentPassword"
              onChange={onChange}
              required
            />
            <br />
            <MDBInput
              size="lg"
              label="Type your new password"
              type="password"
              name="newPassword"
              onChange={onChange}
              onBlur={handleValidation}
              required
            />
            <br />
            <MDBInput
              size="lg"
              label="Confirm new password"
              type="password"
              name="confirmPassword"
              onChange={onChange}
              required
            />
            <br />
            <Link to="/dashboard">
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
              SUBMIT
            </MDBBtn>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default ChangePassword;
