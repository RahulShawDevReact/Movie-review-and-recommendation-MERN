const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
const dbConfig = require('./config/dbConfig');

//all routes
const userRoute = require('./routes/userRoutes');
const artistRoute = require('./routes/artistRoutes');
const imagesRoute = require('./routes/imagesRouter');
const moviesRoute = require('./routes/moviesRoute');
const reviewsRoute = require('./routes/reviewsRoute');
app.use('/api/users', userRoute);
app.use('/api/artists', artistRoute);
app.use('/api/images', imagesRoute);
app.use('/api/movies', moviesRoute);
app.use('/api/reviews', reviewsRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server connected ${port}`);
});
