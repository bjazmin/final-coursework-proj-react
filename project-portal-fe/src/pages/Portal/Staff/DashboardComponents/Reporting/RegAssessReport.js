import React, { useState, useEffect } from 'react';
import axios from 'axios'; //to make a requests from our backend
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { MDBCard, MDBCardBody } from 'mdb-react-ui-kit';


const NumAsssessmentReport = () => {
  const [labels, setLabels] = useState([]);
  const [tDataOne, setTDataOne] = useState([]);
  const [tDataTwo, setTDataTwo] = useState([]);

  const barData = () => {
    return {
      labels: labels,
      datasets: [
        {
          label: 'Number of Registrations',
          backgroundColor: 'rgba(194, 116, 161, 0.5)',
          borderColor: 'rgb(194, 116, 161)',
          data: tDataOne,
        },
        {
          label: 'Number of Assessments',
          backgroundColor: 'rgba(71, 225, 167, 0.5)',
          borderColor: 'rgb(71, 225, 167)',
          data: tDataTwo,
        },
      ],
    };
  };

  const loadData = async () => {
    var labels = [];
    var tDataOne = [];
    var tDataTwo = [];

    const response = await axios.get(
      process.env.REACT_APP_API_URL + '/dashboard/report/get/presentations'
    ); //returns data

    response.data.map((item) => {
      labels.push(item.title);
      tDataTwo.push(item.number_of_assessments);
      tDataOne.push(item.number_of_registrations);
    });
    setLabels(labels);
    setTDataOne(tDataOne);
    setTDataTwo(tDataTwo);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <MDBCard style={{ width: '100%' }}>
      <MDBCardBody>
        <Bar data={barData()} options={{ responsive: true }} />
      </MDBCardBody>
    </MDBCard>
  );
};

export default NumAsssessmentReport;
