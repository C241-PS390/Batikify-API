const express = require('express');
const rootRoute = require('../routes/root');
const dashboardRoute = require('../routes/dashboard');
const historyRoute = require('../routes/history');
const app = express();
const port = 7000;

app.use('/', rootRoute);
app.use('/dashboard', dashboardRoute);
app.use('/history', historyRoute);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
