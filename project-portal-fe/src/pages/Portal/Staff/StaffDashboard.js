import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, removeUserSession } from '../../../utils/Common';
import AdminStaff from './AdminStaff/AdminStaff';
import TeachingStaff from './TeachingStaff/TeachingStaff';

const StaffDashboard = () => {
  const user = getUser();
  const navigate = useNavigate();

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    navigate('/login');
  };

  switch (user.accessType) {
    case 'Administrator':
      return <AdminStaff user={user} handleLogout={handleLogout} />;
    case 'Teaching Staff':
      return <TeachingStaff user={user} handleLogout={handleLogout} />;
    default:
      break;
  }
};

export default StaffDashboard;
