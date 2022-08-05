import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../../../layouts/PublicLayout';
import { MDBTypography, MDBContainer, MDBBtn } from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify'; //for toasts or notifications

const View = () => {
  const [data, setData] = useState({});
  const { id } = useParams(); //assigns the id that is in URL path

  //return a download button if there is a file
  function downloadBtn() {
    return (
      <MDBBtn
        onClick={download}
        style={{
          backgroundColor: '#e12744',
        }}
      >
        Download PDF
      </MDBBtn>
    );
  }

  const download = () => {
    axios
      .get(process.env.REACT_APP_API_URL + `/projects/download/${id}`, {
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

  //use effect will only run if we have the id
  //.then lets get the response from the server and target the first data in array to set as state
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + `/projects/get/${id}`)
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
          <MDBTypography tag="h1" className="text-center p-5">
            {data.title}
          </MDBTypography>
          <div>
            <p>{data.description}</p>
            <p>Team Members: </p>
            <p>{data.projectTeam}</p>
          </div>
          {data.file ? downloadBtn() : ''}
        </MDBContainer>
      </Layout>
    </div>
  );
};
export default View;
