# MERN Movie Review and Recommendation App

This is a movie review and recommendation application built using the MERN stack (MongoDB, Express.js, React, Node.js). The application allows users to review and recommend movies. It also provides admin access for managing movie and artist data.

## Features

- User Registration and Authentication.
- User Roles (Admin and Regular User).
- Movie Listing with Details.
- Movie Reviews and Ratings.
- Movie Recommendations.
- Admin Dashboard for Movie Management.
- RESTful API for Data Access.

## Technologies Used

- MongoDB : Database for storing movie,artist and user data.
- Express.js : Backend server framework.
- React : Frontend library for the user interface.
- Node.js : Backend runtime environment.
- Jwt : Authentication middleware.
- Axios : HTTP client for making API requests.
- Antd: Frontend in-built components.
- Tailwind CSS : Frontend styling.
- Cloudinary : Image storage.

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js and npm
- MongoDB

## Installation/Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/mern-movie-app.git
   ```

2. Change to the project directory:

   ```bash
   cd movie-app
   ```

3. Install server dependencies:

   ```bash
   cd server
   npm install
   ```

4. Install client dependencies:

   ```bash
   cd ../client
   npm install
   ```

## Configuration

1. Set up environment variables by creating a .env file in the server directory with the following content:

   ```bash
   PORT=3001
   MONGODB_URI=mongodb://localhost/mern_movie_app
   SECRET_KEY=yoursecretkey
   cloudinary_cloud_name= '' 
   cloudinary_api_key= ''
   cloudinary_api_secret='' 
   ```

2. Adjust the MongoDB URI and secret key according to your setup.

## Usage

1. Start the server:

   ```bash
   cd server
   node server.js
   ```

   The server will run on http://localhost:5000.

2. Start the client(Vite):

   ```bash
   cd client
   npm run dev

   ```

   The client will run on http://localhost:5173/.

3. Access the application through a web browser.

## Admin Access

- Access the admin dashboard by visiting http://localhost:5173/admin after starting the server.

- Log in with admin credentials.

## License

This project is licensed under the MIT License.

## Acknowledgments

- This project was inspired by Movie World.

## Contact

- Rahul Shaw
- Email : rahul.shaw2017@gmail.com
- GitHub : https://github.com/RahulShawDevReact/Movie-review-and-recommendation-MERN
