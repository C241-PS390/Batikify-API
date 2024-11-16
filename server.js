require('dotenv').config();
const express = require('express');
const indexRoutes = require('./src/routes/index');
const userRoutes = require('./src/routes/userRoutes');
const articleRoutes = require('./src/routes/article');
const newsRoutes = require('./src/routes/newsRoutes');
const encyclopediaRoutes = require('./src/routes/encyclopediaRoutes');
const detectRoutes = require('./src/routes/detectRoutes');
const loadModel = require('./src/services/loadModel');
const app = express();

// accept x-www-form-urlencoded and parse json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

async function run() {
  try {
    // load model
    const model = await loadModel();
    app.locals.model = model;
    console.log('Model loaded in app.locals');

    // middleware for model
    app.use((req, res, next) => {
      req.model = app.locals.model;
      next();
    });

    // routes
    app.use('/', indexRoutes);
    app.use('/user', userRoutes);
    app.use('/article', articleRoutes);
    app.use('/news', newsRoutes);
    app.use('/encyclopedia', encyclopediaRoutes);
    app.use('/detect', detectRoutes);

    // start
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Fail to load model: ${err}`);
    process.exit(1);
  }
}

run();
