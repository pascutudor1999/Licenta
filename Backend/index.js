const express = require('express');
const app = express()
const cors = require("cors");
const port = 3000
const dotenv = require('dotenv');
const mongoose = require("mongoose");

dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,
{ useNewUrlParser: true }, () =>
  console.log("Connected to DB")
);

//Importare routes
const userRoutes = require("./routes/userRoutes");
const postRoutes = require('./routes/posts');

//Middlewares
app.use(express.json());
app.use(cors());
app.use("/api", userRoutes);
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

