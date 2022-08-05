// return basic user details
const getCleanUser = (user) => {
  if (!user) return null;

  return {
    staffID: user.staffID,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    accessType: user.accessType,
  };
};

module.exports = {
  getCleanUser,
};
