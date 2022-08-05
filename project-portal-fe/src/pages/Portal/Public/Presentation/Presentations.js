import React, { useState, useEffect } from 'react';
import Layout from '../../../../layouts/PublicLayout';
import { MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import Presentation from './Presentation';
import axios from 'axios'; //to make a reuqets from our backend

const Presentations = () => {
  const [data, setData] = useState([]);

  //to fetch data from the backend server
  const loadData = async () => {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + '/presentations/get'
    ); //returns data
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="background">
      <Layout>
        <MDBTypography tag="h1" className="text-center p-5">
          Presentation Showcase
        </MDBTypography>
        <div>
          <MDBRow className="row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {data.map((presentation) => {
              return (
                <Presentation
                  key={presentation.presentationID}
                  {...presentation}
                ></Presentation>
              );
            })}
          </MDBRow>
        </div>
      </Layout>
    </div>
  );
};

export default Presentations;
