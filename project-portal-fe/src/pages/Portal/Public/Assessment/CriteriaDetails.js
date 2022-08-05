import React from 'react';
import {
  MDBTypography,
  MDBBtn,
  MDBInput,
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';

const CriteriaDetails = (props) => {
  const handleSubmit = props.handleSubmit;

  const prev = () => {
    if (props.formValue.category === 'Student') {
      props.formValue.studentId = '';
      props.prevStep(1);
    } else {
      props.prevStep(2);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <MDBTypography className="text-center">
          Enter a number between 0 - 10 for each of the field below.
        </MDBTypography>
        <MDBRow className="row-cols-1 row-cols-md-2 g-4 p-2">
          <MDBTypography variant="h4" className="p-2">
            Content of Presentation
          </MDBTypography>
          <MDBCol className="col-md-8">
            <MDBTypography className="display-10">
              Effectiveness of the Introduction clearly explaining the original
              client problem
            </MDBTypography>
          </MDBCol>
          <MDBCol className="col-md-4">
            <MDBInput
              min="0"
              max="10"
              size="sm"
              label="Criterion 1"
              type="number"
              name="c1"
              onChange={(e) => props.onChange(e)}
              required
              autoComplete="off"
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="row-cols-1 row-cols-md-2 g-4 p-2">
          <MDBCol className="col-md-8">
            <MDBTypography className="display-10">
              The team clearly explained the methodology they used and the
              problem solution
            </MDBTypography>
          </MDBCol>
          <MDBCol className="col-md-4">
            <MDBInput
              min="0"
              max="10"
              size="sm"
              label="Criterion 2"
              type="number"
              name="c2"
              onChange={(e) => props.onChange(e)}
              required
              autoComplete="off"
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="row-cols-1 row-cols-md-2 g-4 p-2">
          <MDBCol className="col-md-8">
            <MDBTypography className="display-10">
              The project was demonstrated well
            </MDBTypography>
          </MDBCol>
          <MDBCol className="col-md-4">
            <MDBInput
              min="0"
              max="10"
              size="sm"
              label="Criterion 3"
              type="number"
              name="c3"
              onChange={(e) => props.onChange(e)}
              required
              autoComplete="off"
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="row-cols-1 row-cols-md-2 g-4 p-2">
          <MDBCol className="col-md-8">
            <MDBTypography className="display-10">
              The demonstration had appropriate amount of detail and flowed
              smoothly
            </MDBTypography>
          </MDBCol>
          <MDBCol className="col-md-4">
            <MDBInput
              min="0"
              max="10"
              size="sm"
              label="Criterion 4"
              type="number"
              name="c4"
              onChange={(e) => props.onChange(e)}
              required
              autoComplete="off"
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="row-cols-1 row-cols-md-2 g-4 p-2">
          <MDBCol className="col-md-8">
            <MDBTypography className="display-10">
              The project conclusion was effective and the team responded to
              questions well
            </MDBTypography>
          </MDBCol>
          <MDBCol className="col-md-4">
            <MDBInput
              min="0"
              max="10"
              size="sm"
              label="Criterion 5"
              type="number"
              name="c5"
              onChange={(e) => props.onChange(e)}
              required
              autoComplete="off"
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="row-cols-1 row-cols-md-2 g-4 p-2">
          <MDBCol className="col-md-8">
            <MDBTypography className="display-10">
              I understand what the project was about and what the team achieved
            </MDBTypography>
          </MDBCol>
          <MDBCol className="col-md-4">
            <MDBInput
              min="0"
              max="10"
              size="sm"
              label="Criterion 6"
              type="number"
              name="c6"
              onChange={(e) => props.onChange(e)}
              required
              autoComplete="off"
            />
          </MDBCol>
        </MDBRow>
        <br />
        <MDBTypography variant="h4" className="p-2">
          Structure of Presentation
        </MDBTypography>
        <MDBRow className="row-cols-1 row-cols-md-2 g-4 p-2">
          <MDBCol className="col-md-8">
            <MDBTypography className="display-10">
              The group’s preparation and teamwork was evident in this
              presentation
            </MDBTypography>
          </MDBCol>
          <MDBCol className="col-md-4">
            <MDBInput
              min="0"
              max="10"
              size="sm"
              label="Criterion 7"
              type="number"
              name="c7"
              onChange={(e) => props.onChange(e)}
              required
              autoComplete="off"
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="row-cols-1 row-cols-md-2 g-4 p-2">
          <MDBCol className="col-md-8">
            <MDBTypography className="display-10">
              This presentation was well structured, organized into appropriate
              sections and started and finished on time
            </MDBTypography>
          </MDBCol>
          <MDBCol className="col-md-4">
            <MDBInput
              min="0"
              max="10"
              size="sm"
              label="Criterion 8"
              type="number"
              name="c8"
              onChange={(e) => props.onChange(e)}
              required
              autoComplete="off"
            />
          </MDBCol>
        </MDBRow>
        <br />
        <MDBTypography variant="h4" className="p-2">
          Presentation
        </MDBTypography>
        <MDBRow className="row-cols-1 row-cols-md-2 g-4 p-2">
          <MDBCol className="col-md-8">
            <MDBTypography className="display-10">
              This presentation was clear, concise, interesting and easy to
              understand
            </MDBTypography>
          </MDBCol>
          <MDBCol className="col-md-4">
            <MDBInput
              min="0"
              max="10"
              size="sm"
              label="Criterion 9"
              type="number"
              name="c9"
              onChange={(e) => props.onChange(e)}
              required
              autoComplete="off"
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="row-cols-1 row-cols-md-2 g-4 p-2">
          <MDBCol className="col-md-8">
            <MDBTypography className="display-10">
              This was a good presentation
            </MDBTypography>
          </MDBCol>
          <MDBCol className="col-md-4">
            <MDBInput
              min="0"
              max="10"
              size="sm"
              label="Criterion 10"
              type="number"
              name="c10"
              onChange={(e) => props.onChange(e)}
              required
              autoComplete="off"
            />
          </MDBCol>
          <MDBCol className="col-md-8">
            <MDBTypography className="display-10">Comments</MDBTypography>
            <MDBInput
              size="sm"
              label="Comments"
              name="comments"
              textarea
              rows={4}
              onChange={(e) => props.onChange(e)}
            />
          </MDBCol>
        </MDBRow>
        <br />
        <div className="text-center">
          <MDBBtn
            type="submit"
            style={{ backgroundColor: '#e12744', marginRight: '1em' }}
          >
            Submit
          </MDBBtn>
          <MDBBtn
            type="button"
            style={{ backgroundColor: '#e12744' }}
            onClick={() => prev()}
          >
            Back
          </MDBBtn>
        </div>
      </form>
    </>
  );
};

export default CriteriaDetails;
