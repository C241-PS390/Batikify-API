require('dotenv').config();
const express = require('express');
const indexRoutes = require('./src/routes/index');
const userRoutes = require('./src/routes/user');
const articleRoutes = require('./src/routes/article');
const newsRoutes = require('./src/routes/news');
const encyclopediaRoutes = require('./src/routes/encyclopedia');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', indexRoutes);
app.use('/user', userRoutes);
app.use('/article', articleRoutes);
app.use('/news', newsRoutes);
app.use('/encyclopedia', encyclopediaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
