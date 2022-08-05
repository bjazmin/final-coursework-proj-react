import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../../../../layouts/PublicLayout';
import { ToastContainer, toast } from 'react-toastify'; //for toasts or notifications
import {
  MDBTypography,
  MDBBtn,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCard,
} from 'mdb-react-ui-kit';

const Proposal = () => {
  const initialValue = {
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    affiliation: '',
    category: 'Visitor',
    orgName: '',
    title: '',
    discipline: '',
  };

  const [formValue, setFormValue] = useState(initialValue);

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  //contains information on the currently picked file
  const [selectedFile, setSelectedFile] = useState();
  const [fileName, setFileName] = useState('');

  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    if (e.target.files[0]) setFileName(e.target.files[0].name);
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
      <MDBCol>
        <MDBInput
          size="lg"
          label="Organization Name"
          type="text"
          name="orgName"
          value={formValue.orgName}
          onChange={onChange}
          required
        />
      </MDBCol>
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formValue.confirmEmail === formValue.email) {
      if (
        fileName.trim() &&
        formValue.title.trim() &&
        formValue.discipline.trim() &&
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
    const formData = new FormData();

    formData.append('title', formValue.title);
    formData.append('discipline', formValue.discipline);
    formData.append('file', selectedFile);

    formData.append('firstName', formValue.firstName);
    formData.append('lastName', formValue.lastName);
    formData.append('email', formValue.email);
    formData.append('affiliation', formValue.affiliation);
    formData.append('category', formValue.category);
    formData.append('orgName', formValue.orgName);

    axios
      .post(process.env.REACT_APP_API_URL + '/proposal/submit', formData)
      .then((response) => {
        if (response.data === 'OK') {
          toast.success('Submission successful');
          setFormValue(initialValue);
          setFileName('');
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
        <MDBCard
          className="p-5"
          style={{ backgroundColor: 'white', radius: '' }}
        >
          <MDBTypography className="text-center p-5 display-6">
            Project Proposal Form
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
                  defaultValue="Visitor"
                >
                  <option value="Visitor">Visitor</option>
                  <option value="Student">Student</option>
                  <option value="Staff">Murdoch Staff</option>
                  <option value="Industry">Industry</option>
                </select>
              </MDBCol>
              {isIndustry ? orgInput() : <br />}
            </MDBRow>
            <br />
            <MDBTypography variant="h4" className="text-center p-5">
              Project Details
            </MDBTypography>
            <MDBRow className="row-cols-1 row-cols-md-2 g-4">
              <MDBCol>
                <MDBInput
                  size="lg"
                  label="Project Title"
                  type="text"
                  name="title"
                  value={formValue.title}
                  onChange={onChange}
                  required
                  autoComplete="off"
                />
              </MDBCol>
              <MDBCol>
                <MDBInput
                  size="lg"
                  label="Discipline"
                  type="text"
                  value={formValue.discipline}
                  name="discipline"
                  onChange={onChange}
                  required
                  autoComplete="off"
                />
              </MDBCol>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroupFileAddon01">
                    Upload Proposal
                  </span>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="inputFile"
                    aria-describedby="inputGroupFileAddon01"
                    accept=".doc,.docx,.pdf"
                    name="file"
                    onChange={onFileChange}
                    required
                  />
                  <label
                    className="custom-file-label"
                    htmlFor="inputGroupFile01"
                  >
                    {!fileName ? 'Choose file' : fileName}
                  </label>
                </div>
              </div>
            </MDBRow>
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

export default Proposal;
