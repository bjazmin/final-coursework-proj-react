import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Moment from 'moment'; //to convert date
import { getUser } from '../../../../../utils/Common';
import axios from 'axios'; //to make a requests from our backend
import Layout from '../../../../../layouts/DashboardLayout';
import { CDBCard, CDBCardBody, CDBDataTable } from 'cdbreact';
import {
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

const Visitor = () => {
  const user = getUser();
  const [data, setData] = useState([]);

  const [emailModal, setEmailModal] = useState(false);
  const toggleSendShow = () => setEmailModal(!emailModal);

  const [presentations, setPresentions] = useState([]);

  const [checkboxes, setCheckboxes] = useState({}); //list of checked values

  const [selected, setSelected] = useState('');
  const initialDetails = {
    title: '',
    date: '',
    url: '',
    sender: '',
  };

  //to fetch data from the backend server
  const loadData = async () => {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + '/dashboard/visitor/get'
    ); //returns data
    setData(response.data);
  };

  const loadPresentations = async () => {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + '/presentations/get'
    ); //returns data
    setPresentions(response.data);
  };

  const showOptions = () => {
    let items = [];
    presentations.map((presentation) => {
      let date = Moment(presentation.date).format('yyyy-MM-D');
      items.push(
        <option
          key={presentation.presentationID}
          value={presentation.presentationID}
        >
          {presentation.title + ' (' + date + ') '}
        </option>
      );
    });
    return items;
  };

  const [presentationDetails, setPresentationDetails] =
    useState(initialDetails);

  const handleInputChange = (e) => {
    setSelected(e.target.value);
    var filteredP = presentations.filter(
      (p) => p.presentationID == e.target.value
    );

    var dt = Moment(filteredP[0].date).format('d MMM YYYY');
    setPresentationDetails({
      title: filteredP[0].title,
      date: dt + ' | ' + filteredP[0].time,
      url:
        process.env.REACT_APP_DOMAIN_URL +
        '/presentations/view/' +
        filteredP[0].presentationID,
      sender: user.firstName + ' ' + user.lastName,
    });
  };

  const columns = [
    {
      label: 'Select',
      field: 'select',
      width: 100,
    },
    {
      label: 'Visitor ID',
      field: 'visitorID',
      width: 100,
      attributes: {
        'aria-controls': 'DataTable',
        'aria-label': 'proposal id',
      },
    },
    {
      label: 'Name',
      field: 'name',
      width: 150,
    },
    {
      label: 'Email',
      field: 'email',
      sort: 'asc',
      width: 300,
    },
    {
      label: 'Affiliation',
      field: 'affiliation',
      sort: 'asc',
      width: 150,
    },
    {
      label: 'Category',
      field: 'category',
      sort: 'asc',
      width: 150,
    },
    {
      label: 'Organization Name',
      field: 'orgName',
      sort: 'asc',
      width: 150,
    },
  ];

  const dataTable = () => {
    let mydata = [];
    data.map((item, index) => {
      mydata.push(transform(item));
    });
    return {
      rows: mydata,
    };
  };

  const handleToggle = (event) => {
    const { checked, name } = event.target;
    setCheckboxes({ ...checkboxes, [name]: checked });
  };

  const handleSubmit = () => {
    var list = [];
    Object.entries(checkboxes).map((item) => {
      if (item[1] === true) {
        list.push(item[0]);
      }
    });
    if (selected === '') {
      toast.error('Please choose a presentation');
    } else {
      submit(list);
    }
  };

  const submit = (list) => {
    if (list.length !== 0) {
      axios
        .post(process.env.REACT_APP_API_URL + `/dashboard/visitor/visitors`, {
          visitors: JSON.stringify(list),
        })
        .then((response) => {
          if (response.status === 200) {
            const newArray = response.data.map((element) => element.email);
            const emails = newArray.toString(); //emails of selected visitors

            const details = {
              email: emails,
              title: presentationDetails.title,
              date: presentationDetails.date,
              url: presentationDetails.url,
              sender: presentationDetails.sender,
            };
            const sendEmail = emailjs.send(
              process.env.REACT_APP_EMAIL_SID,
              process.env.REACT_APP_EMAIL_INVITE_TEMP,
              details,
              process.env.REACT_APP_EMAIL_UID2 ||
                process.env.REACT_APP_EMAIL_UID
            );
            toast.promise(sendEmail, {
              pending: 'Sending invitation email...',
              success: 'Invitation sent sucessfully',
              error: 'Error in sending the invite, please try again later',
            });
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
    } else {
      toast.error('Please select a user to send an invitation');
    }
  };

  const transform = (item) => {
    return {
      key: item.visitorID,
      select: [
        <input
          type="checkbox"
          id={item.visitorID}
          name={item.visitorID}
          onChange={handleToggle}
        />,
      ],
      visitorID: item.visitorID,
      name: item.firstName + ' ' + item.lastName,
      email: item.email,
      affiliation: item.affiliation,
      category: item.category,
      orgName: item.orgName,
    };
  };

  useEffect(() => {
    loadData();
    loadPresentations();
  }, []);

  return (
    <>
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
        <div style={{ maxHeight: '90vh' }}>
          <MDBBtn
            className="btn btn-dark"
            type="button"
            style={{ marginBottom: '1em' }}
            onClick={toggleSendShow}
          >
            SEND INVITE
          </MDBBtn>
          <br />
          <CDBCard>
            <CDBCardBody>
              <CDBDataTable
                autoWidth
                maxHeight="50vh"
                scrollY
                striped
                bordered
                hover
                columns={columns}
                data={dataTable()}
                paging={false}
                materialSearch={true}
              />
            </CDBCardBody>
          </CDBCard>
        </div>
        <MDBModal show={emailModal} setShow={setEmailModal} tabIndex="-1">
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Select Presentation</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={() => {
                    toggleSendShow();
                  }}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <select
                  className="form-select form-select-lg mb-3"
                  name="selectedP"
                  onChange={handleInputChange}
                  value={selected}
                >
                  <option value="">Choose a presentation</option>
                  {showOptions()}
                </select>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn
                  className="btn-dark"
                  onClick={() => {
                    toggleSendShow();
                  }}
                >
                  CLOSE
                </MDBBtn>
                <MDBBtn
                  style={{ backgroundColor: '#e12744' }}
                  onClick={() => {
                    handleSubmit();
                    toggleSendShow();
                  }}
                >
                  SEND NOW
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </Layout>
    </>
  );
};

export default Visitor;
