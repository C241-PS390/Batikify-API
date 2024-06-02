const express = require("express");
const bodyParser = require("body-parser");
const indexRoutes = require("./src/routes/index");
const userRoutes = require("./src/routes/user");
const articleRoutes = require("./src/routes/article");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", indexRoutes);
app.use("/user", userRoutes);
app.use("/article", articleRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
