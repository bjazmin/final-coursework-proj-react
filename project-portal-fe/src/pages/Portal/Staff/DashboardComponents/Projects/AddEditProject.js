import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios'; //for making requests
import { getUser } from '../../../../../utils/Common';
import Layout from '../../../../../layouts/DashboardLayout';
import { ToastContainer, toast } from 'react-toastify'; //for toasts or notifications
import { MDBTypography, MDBBtn, MDBInput } from 'mdb-react-ui-kit';

const AddEditProject = () => {
  const navigate = useNavigate(); //to be able to navigate back to a page
  const { id } = useParams();
  const user = getUser().staffID;
  const initialState = {
    projectID: '',
    title: '',
    description: '',
    projectTeam: '',
    file: '',
    banner: '',
    staffID: user,
    unitID: '',
  };
  const [state, setState] = useState(initialState);

  //contains information on the currently picked file
  const [selectedBanner, setSelectedBanner] = useState();
  const [bannerName, setBannerName] = useState('');

  //contains information on the currently picked file
  const [selectedFile, setSelectedFile] = useState();
  const [fileName, setFileName] = useState('');

  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    if (e.target.files[0]) setFileName(e.target.files[0].name);
  };

  const onBannerChange = (e) => {
    setSelectedBanner(e.target.files[0]);
    if (e.target.files[0]) setBannerName(e.target.files[0].name);
  };

  const [units, setUnits] = useState([]);

  const loadUnits = async () => {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + '/dashboard/unit/get'
    ); //returns data
    setUnits(response.data);
  };

  const showOptions = () => {
    let items = [];
    units.map((unit) => {
      items.push(
        <option key={unit.unitID} value={unit.unitID}>
          {unit.unitCode}
        </option>
      );
    });
    return items;
  };

  useEffect(() => {
    loadUnits();
    axios
      .get(process.env.REACT_APP_API_URL + `/dashboard/project/get/${id}`)
      .then((resp) => {
        setState({ ...resp.data[0] });
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !state.title.trim() ||
      !state.description.trim() ||
      !state.projectTeam.trim() ||
      !state.unitID
    ) {
      toast.error('Please provide value into each input field');
    } else {
      submit();
    }
  };

  const submit = () => {
    const formData = new FormData();
    formData.append('title', state.title);
    formData.append('description', state.description);
    formData.append('projectTeam', state.projectTeam);
    formData.append('staffID', state.staffID || user);
    formData.append('unitID', state.unitID);
    formData.append('file', selectedFile || state.file);
    formData.append('banner', selectedBanner || state.banner);

    if (!id) {
      axios
        .post(
          process.env.REACT_APP_API_URL + '/dashboard/project/add',
          formData
        )
        .then((response) => {
          if (response.data === 'OK') {
            toast.success('Project added successfully');
            setState(initialState);
            setFileName('');
            setTimeout(() => navigate('/dashboard/projects', 500));
          }
        })
        .catch((error) => {
          if (!error.response) {
            toast.error('Something went wrong. Please try again later.');
          } else {
            if (
              error.response.status === 400 ||
              error.response.status === 401
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
          process.env.REACT_APP_API_URL + `/dashboard/project/update/${id}`,
          formData
        )
        .then((response) => {
          if (response.data === 'OK') {
            toast.success('Project updated successfully');
            setState(initialState);
            setFileName('');
            setTimeout(() => navigate('/dashboard/projects', 500));
          }
        })
        .catch((error) => {
          if (!error.response) {
            toast.error('Something went wrong. Please try again later.');
          } else {
            if (
              error.response.status === 400 ||
              error.response.status === 401
            ) {
              toast.error(error.response.data.message);
            } else {
              toast.error('Something went wrong. Please try again later.');
            }
          }
        });
    }
  };

  const handleInputChange = (e) => {
    //name and value from form properties
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const download = () => {
    axios
      .get(process.env.REACT_APP_API_URL + `/dashboard/project/download`, {
        params: {
          file: state.file,
        },
        responseType: 'blob',
      })
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
          Project Details
        </MDBTypography>
        <form
          onSubmit={handleSubmit}
          style={{
            margin: 'auto',
            padding: '15px',
            maxWidth: '500px',
            alignContent: 'center',
          }}
        >
          {id ? (
            <>
              <br />
              <MDBInput
                size="lg"
                type="text"
                name="projectID"
                value={state.projectID}
                disabled
                autoComplete="off"
              />
              <br />
              <MDBInput
                size="lg"
                label="Created By Staff"
                type="text"
                name="staffID"
                value={state.staffID}
                disabled
                autoComplete="off"
              />
              <br />
            </>
          ) : (
            ''
          )}
          <MDBInput
            size="lg"
            label="Title"
            type="text"
            name="title"
            value={state.title}
            onChange={handleInputChange}
            required
            autoComplete="off"
          />
          <br />
          <MDBInput
            size="lg"
            label="Description"
            type="text"
            name="description"
            textarea
            rows={4}
            value={state.description}
            onChange={handleInputChange}
            required
            autoComplete="off"
          />
          <br />
          <MDBInput
            size="lg"
            label="Project Team"
            type="text"
            name="projectTeam"
            textarea
            rows={2}
            value={state.projectTeam}
            onChange={handleInputChange}
            required
            autoComplete="off"
          />
          <br />
          <span className="text">Unit</span>
          <select
            className="form-select form-select-lg mb-3"
            name="unitID"
            onChange={handleInputChange}
            value={state.unitID}
          >
            <option value="">Choose a Unit</option>
            {showOptions()}
          </select>
          <br />

          <div className="input-group">
            {id ? (
              state.projectBanner ? (
                <>
                  <MDBBtn className="btn btn-dark" type="button">
                    <a
                      href={process.env.REACT_APP_API_URL + state.projectBanner}
                      target="_blank"
                      style={{
                        textDecoration: 'none',
                        color: 'white',
                      }}
                      className="stretched-link"
                    >
                      View Banner
                    </a>
                  </MDBBtn>
                </>
              ) : (
                ''
              )
            ) : (
              ''
            )}
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                accept=".png,.jpg,.jpeg"
                name="banner"
                onChange={onBannerChange}
              />

              <label className="custom-file-label" htmlFor="inputGroupFile01">
                {!bannerName ? 'Choose to upload banner' : bannerName}
              </label>
            </div>
          </div>

          <br />

          <div className="input-group">
            {id ? (
              <MDBBtn onClick={download} className="btn btn-dark" type="button">
                Download
              </MDBBtn>
            ) : (
              ''
            )}
            <div className="custom-file">
              {id ? (
                <input
                  type="file"
                  className="custom-file-input"
                  accept=".doc,.docx,.pdf"
                  name="file"
                  onChange={onFileChange}
                />
              ) : (
                <input
                  type="file"
                  className="custom-file-input"
                  accept=".doc,.docx,.pdf"
                  name="file"
                  onChange={onFileChange}
                  required
                />
              )}
              <label className="custom-file-label" htmlFor="inputGroupFile01">
                {!fileName ? 'Choose to upload file' : fileName}
              </label>
            </div>
          </div>
          <br />
          <Link to="/dashboard/projects">
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

export default AddEditProject;
