function showMessageDashboard(request, h) {
  const response = h.response({
    status: 'success',
    message: 'Selamat datang di Dashboard',
  });
  return response;
}

module.exports = showMessageDashboard;
