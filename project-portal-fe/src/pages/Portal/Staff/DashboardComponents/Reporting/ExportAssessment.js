import React, { useState, useEffect } from 'react';
import axios from 'axios'; //to make a requests from our backend
import Moment from 'moment'; //to convert date
import { toast } from 'react-toastify'; //for toasts or notifications
import { MDBCard, MDBCardBody, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';

const ExportAssessment = () => {
  const [presentations, setPresentions] = useState([]);
  const [selected, setSelected] = useState(0);

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

  const handleSubmit = () => {
    if (selected !== 0 && selected !== '0') {
      axios
        .get(
          process.env.REACT_APP_API_URL +
            `/dashboard/report/assessment/export/${selected}`
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
            toast.success('Download successful');
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
      toast.error('Please select a presentation');
    }
  };

  const handleInputChange = (e) => {
    setSelected(e.target.value);
  };

  const loadPresentations = async () => {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + '/presentations/get'
    ); //returns data
    setPresentions(response.data);
  };

  useEffect(() => {
    loadPresentations();
  }, []);

  return (
    <MDBCard style={{ maxHeight: '20rem', height: '100% ' }}>
      <MDBCardBody>
        <MDBCardText className="p-2 text-center">
          Export Assessment Results
        </MDBCardText>
        <select
          className="form-select form-select-lg mb-3"
          name="selectedP"
          onChange={handleInputChange}
        >
          <option value="0">Choose a presentation</option>
          {showOptions()}
        </select>
        <MDBBtn style={{ backgroundColor: '#e12744' }} onClick={handleSubmit}>
          EXPORT TO CSV
        </MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
};

export default ExportAssessment;
