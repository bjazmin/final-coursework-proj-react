import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios'; //for making requests
import { getUser } from '../../../../../utils/Common';
import Layout from '../../../../../layouts/DashboardLayout';
import { ToastContainer, toast } from 'react-toastify'; //for toasts or notifications
import { MDBTypography, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import Moment from 'moment'; //to convert date
import AddPresenter from './AddPresenter';

const AddEditPresentation = () => {
  const navigate = useNavigate(); //to be able to navigate back to a page
  const { id } = useParams();
  const user = getUser().staffID;

  const initialState = {
    presentationID: '',
    title: '',
    description: '',
    teamName: '',
    teamLogo: '',
    host: '',
    date: '',
    time: '',
    mode: '',
    location: '',
    status: '',
    staffID: user,
    unitID: '',
  };
  const [state, setState] = useState(initialState);

  //contains information on the currently picked file
  const [selectedFile, setSelectedFile] = useState();
  const [fileName, setFileName] = useState('');

  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    if (e.target.files[0]) setFileName(e.target.files[0].name);
  };

  const [modal, setModal] = useState(false);
  const toggleShow = () => setModal(!modal);

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
      .get(process.env.REACT_APP_API_URL + `/dashboard/presentation/get/${id}`)
      .then((resp) => {
        setState({ ...resp.data[0] });
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !state.title.trim() ||
      !state.description.trim() ||
      !state.teamName.trim() ||
      !state.host.trim() ||
      !state.time.trim() ||
      !(state.mode || '').trim() ||
      !state.location.trim() ||
      !(state.status || '').trim() ||
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
    formData.append('teamName', state.teamName);
    formData.append('file', selectedFile || state.teamLogo); //logo
    formData.append('host', state.host);
    formData.append('date', Moment(state.date).format('yyyy/MM/D'));
    formData.append('time', state.time);
    formData.append('mode', state.mode);
    formData.append('location', state.location);
    formData.append('status', state.status);
    formData.append('staffID', state.staffID || user);
    formData.append('unitID', state.unitID);

    if (!id) {
      //add presentation
      axios
        .post(
          process.env.REACT_APP_API_URL + '/dashboard/presentation/add',
          formData
        )
        .then((response) => {
          if (response.data === 'OK') {
            toast.success('Presentation added successfully');
            setState(initialState);
            setFileName('');
            setTimeout(() => navigate('/dashboard/presentations', 500));
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
          process.env.REACT_APP_API_URL +
            `/dashboard/presentation/update/${id}`,
          formData
        )
        .then((response) => {
          if (response.data === 'OK') {
            toast.success('Presentation updated successfully');
            setState(initialState);
            setFileName('');
            setTimeout(() => navigate('/dashboard/presentations', 500));
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
          Presentation Details
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
                name="presentationID"
                value={state.presentationID}
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
            label="Team Name"
            type="text"
            name="teamName"
            value={state.teamName}
            onChange={handleInputChange}
            required
            autoComplete="off"
          />
          <br />
          <MDBInput
            size="lg"
            label="Host"
            type="text"
            name="host"
            value={state.host}
            onChange={handleInputChange}
            required
            autoComplete="off"
          />
          <br />
          <MDBInput
            size="lg"
            label="Date"
            type="date"
            name="date"
            value={Moment(state.date).format('yyyy-MM-DD')}
            onChange={handleInputChange}
            required
            autoComplete="off"
          />
          <br />
          <MDBInput
            size="lg"
            label="Time"
            type="text"
            name="time"
            value={state.time}
            onChange={handleInputChange}
            required
            autoComplete="off"
          />
          <br />
          <select
            className="form-select form-select-lg mb-3"
            name="mode"
            onChange={handleInputChange}
            value={state.mode}
          >
            <option value="">Choose a Mode</option>
            <option value="Virtual">Virtual</option>
            <option value="In-person">In-person</option>
          </select>
          <br />
          <MDBInput
            size="lg"
            label="Location"
            type="text"
            name="location"
            value={state.location}
            onChange={handleInputChange}
            required
            autoComplete="off"
          />
          <br />
          <span className="text">Status</span>
          <select
            className="form-select form-select-lg mb-3"
            name="status"
            onChange={handleInputChange}
            value={state.status}
          >
            <option value="">Choose a Status</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Closed">Closed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

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
            <div className="input-group-prepend">
              {id ? (
                state.teamLogo ? (
                  <>
                    <MDBBtn className="btn btn-dark" type="button">
                      <a
                        href={process.env.REACT_APP_API_URL + state.teamLogo}
                        target="_blank"
                        style={{
                          textDecoration: 'none',
                          color: 'white',
                        }}
                      >
                        View Logo
                      </a>
                    </MDBBtn>
                  </>
                ) : (
                  ''
                )
              ) : (
                ''
              )}
            </div>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="inputFile"
                aria-describedby="inputGroupFileAddon01"
                accept=".png,.jpg,.jpeg"
                name="file"
                onChange={onFileChange}
              />

              <label className="custom-file-label" htmlFor="inputGroupFile01">
                {!fileName ? 'Choose to upload logo' : fileName}
              </label>
            </div>
          </div>
          <br />

          {id ? (
            <MDBBtn
              type="button"
              style={{ backgroundColor: '#e12744', marginRight: '.5em' }}
              onClick={toggleShow}
            >
              ADD PRESENTER
            </MDBBtn>
          ) : (
            ''
          )}
          {id ? (
            <Link to={`/dashboard/presentation/presenters/${id}`}>
              <button
                className="btn btn-dark"
                style={{
                  marginRight: '0.5em',
                }}
              >
                View Presenters
              </button>
            </Link>
          ) : (
            ''
          )}
          <br />

          <br />
          <Link to="/dashboard/presentations">
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

      <AddPresenter modal={modal} setModal={setModal} toggleShow={toggleShow} />
    </Layout>
  );
};

export default AddEditPresentation;
