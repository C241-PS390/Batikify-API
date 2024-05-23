const showMessageDashboard = require('../handler/dashboard');
const showMessageRoot = require('../handler/root');

const routes = [
  {
    path: '/',
    method: 'GET',
    handler: showMessageRoot,
  },
  {
    path: '/dashboard',
    method: 'GET',
    handler: showMessageDashboard,
  },
  {
    path: '/history',
    method: 'GET',
    handler: () => {},
  },
  {
    path: '/detect',
    method: 'POST',
    handler: () => {},
  },
];

module.exports = routes;
