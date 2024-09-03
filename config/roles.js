const allUserRights = ['getUser', 'editUser'];

const userRoleRights = {
  seller: ['getUser', 'editUser'],
  buyer: ['getUser', 'editUser'],
};

const userRoles = Object.keys(userRoleRights);

module.exports = {
  allUserRights,
  userRoles,
  userRoleRights,
};
