require('dotenv').config();
const express = require('express');
const rootRoute = require('../routes/root');
const dashboardRoute = require('../routes/dashboard');
const detectRoute = require('../routes/detect');
const articleRoutes = require('../routes/article');
const authRoute = require('../routes/auth');
const newsRoutes = require('../routes/news');
const app = express();
const port = process.env.PORT || 7000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', rootRoute);
app.use('/', authRoute);
app.use('/dashboard', dashboardRoute);
app.use('/detect', detectRoute);
app.use('/articles', articleRoutes);
app.use('/news', newsRoutes);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
