import React, { useState, useEffect } from 'react';
import Layout from '../../../../layouts/PublicLayout';
import { MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import Project from './Project';
import axios from 'axios';

function Projects() {
  const [data, setData] = useState([]); //to setData

  //to fetch data from the backend server
  const loadData = async () => {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + '/projects/get'
    );
    setData(response.data); //returns data
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="background">
      <Layout>
        <MDBTypography tag="h1" className="text-center p-5">
          Project Showcase
        </MDBTypography>
        <div>
          <MDBRow className="row-cols-1 row-cols-md-3 g-4">
            {data.map((project) => {
              return <Project key={project.projectID} {...project}></Project>;
            })}
          </MDBRow>
        </div>
      </Layout>
    </div>
  );
}

export default Projects;
