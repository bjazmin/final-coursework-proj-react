import React, { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; //routers for our app
import 'react-toastify/dist/ReactToastify.css'; //css for toasts
import Login from './pages/Authentication/Login/Login';
import StaffDashboard from './pages/Portal/Staff/StaffDashboard';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
import { getToken, removeUserSession } from './utils/Common';
// import './App.css';

//Pages for Public Viewing
import PublicProject from './pages/Portal/Public/Project/Projects';
import PublicViewProject from './pages/Portal/Public/Project/View';
import PublicPresentations from './pages/Portal/Public/Presentation/Presentations';
import PublicViewPresentations from './pages/Portal/Public/Presentation/View';
import PublicAssessment from './pages/Portal/Public/Assessment/Assessment';
import PublicProposal from './pages/Portal/Public/Proposal/Proposal';
import Unauthorized from './pages/Authentication/Unauthorized';
import PageNotFound from './pages/PageNotFound';

//Pages for Staff Dashboard
import Staff from './pages/Portal/Staff/DashboardComponents/Users/Staff/Staff';
import AddEditStaff from './pages/Portal/Staff/DashboardComponents/Users/Staff/AddEditStaff';

import Unit from './pages/Portal/Staff/DashboardComponents/Units/Unit';
import AddEditUnit from './pages/Portal/Staff/DashboardComponents/Units/AddEditUnit';

import ChangePassword from './pages/Authentication/ResetPassword/ChangePassword';

import Proposal from './pages/Portal/Staff/DashboardComponents/Proposals/Proposal';
import ViewUpdateProposal from './pages/Portal/Staff/DashboardComponents/Proposals/ViewUpdateProposal';
import ViewProposer from './pages/Portal/Staff/DashboardComponents/Users/Visitor/ViewProposer';
import Visitor from './pages/Portal/Staff/DashboardComponents/SendEmail/Visitor';
import Report from './pages/Portal/Staff/DashboardComponents/Reporting/Report';

import Project from './pages/Portal/Staff/DashboardComponents/Projects/Project';
import AddEditProject from './pages/Portal/Staff/DashboardComponents/Projects/AddEditProject';

import Presentation from './pages/Portal/Staff/DashboardComponents/Presentations/Presentation';
import AddEditPresentation from './pages/Portal/Staff/DashboardComponents/Presentations/AddEditPresentation';

import PresenterAssigned from './pages/Portal/Staff/DashboardComponents/Presentations/PresenterAssigned';
import ViewUpdatePresenter from './pages/Portal/Staff/DashboardComponents/Presentations/ViewUpdatePresenter';

axios.defaults.withCredentials = true;
function App() {
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + '/login').then((response) => {
      if (response.data.loggedIn !== true) {
        removeUserSession();
      }
    });

    if (!getToken()) {
      return;
    }
    axios
      .get(process.env.REACT_APP_API_URL + '/login/verifyuser', {
        headers: {
          'x-access-token': getToken(),
        },
      })
      .then((response) => {
        if (response.data.auth === 'undefined') {
          removeUserSession();
        }
      })
      .catch((error) => {
        removeUserSession();
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route path="*" element={<PageNotFound />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route exact path="/" element={<PublicProject />} />
        <Route path="/projects" element={<PublicProject />} />
        <Route path="/projects/view/:id" element={<PublicViewProject />} />
        <Route path="/presentations" element={<PublicPresentations />} />
        <Route path="/proposal-submission" element={<PublicProposal />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* protected routes */}
        <Route
          path="/dashboard/presentations"
          element={
            <PrivateRoute allowedRoles={['Administrator']}>
              <Presentation />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/presentation/update/:id"
          element={
            <PrivateRoute allowedRoles={['Administrator']}>
              <AddEditPresentation />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/presentation/add"
          element={
            <PrivateRoute allowedRoles={['Administrator']}>
              <AddEditPresentation />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/presentation/presenters/:id"
          element={
            <PrivateRoute allowedRoles={['Administrator']}>
              <PresenterAssigned />
            </PrivateRoute>
          }
        />
        <Route
          path="/presentations/view/:id"
          element={<PublicViewPresentations />}
        />
        <Route
          path="/presentations/assessment/:id"
          element={<PublicAssessment />}
        />
        <Route
          path="/dashboard/presenter/update/:presentationID/:studentID"
          element={
            <PrivateRoute allowedRoles={['Administrator']}>
              <ViewUpdatePresenter />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/projects"
          element={
            <PrivateRoute allowedRoles={['Administrator']}>
              <Project />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/project/update/:id"
          element={
            <PrivateRoute allowedRoles={['Administrator']}>
              <AddEditProject />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/project/add"
          element={
            <PrivateRoute allowedRoles={['Administrator']}>
              <AddEditProject />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/staff"
          element={
            <PrivateRoute allowedRoles={['Administrator']}>
              <Staff />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/staff/add"
          element={
            <PrivateRoute allowedRoles={['Administrator']}>
              <AddEditStaff />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/staff/update/:id"
          element={
            <PrivateRoute allowedRoles={['Administrator']}>
              <AddEditStaff />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/dashboard/units"
          element={
            <PrivateRoute allowedRoles={['Administrator']}>
              <Unit />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/unit/add"
          element={
            <PrivateRoute allowedRoles={['Administrator']}>
              <AddEditUnit />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/unit/update/:id"
          element={
            <PrivateRoute allowedRoles={['Administrator']}>
              <AddEditUnit />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/proposals"
          element={
            <PrivateRoute allowedRoles={['Administrator']}>
              <Proposal />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/proposal/update/:id"
          element={
            <PrivateRoute allowedRoles={['Administrator']}>
              <ViewUpdateProposal />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/visitor/:id"
          element={
            <PrivateRoute allowedRoles={['Administrator']}>
              <ViewProposer />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={['Administrator', 'Teaching Staff']}>
              <StaffDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/changepassword"
          element={
            <PrivateRoute allowedRoles={['Administrator', 'Teaching Staff']}>
              <ChangePassword />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/invite"
          element={
            <PrivateRoute allowedRoles={['Administrator', 'Teaching Staff']}>
              <Visitor />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/reports"
          element={
            <PrivateRoute allowedRoles={['Administrator', 'Teaching Staff']}>
              <Report />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
