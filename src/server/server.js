require('dotenv').config();
const express = require('express');
const rootRoute = require('../routes/root');
const dashboardRoute = require('../routes/dashboard');
const detectRoute = require('../routes/history');
const app = express();
const port = 7000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', rootRoute);
app.use('/dashboard', dashboardRoute);
app.use('/detect', detectRoute);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
