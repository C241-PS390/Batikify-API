function showMessageRoot(request, h) {
  const response = h.response({
    status: 'success',
    message: 'Selamat datang di root',
  });
  return response;
}

module.exports = showMessageRoot;
