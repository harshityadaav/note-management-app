# Notes Management System

A full-stack Notes Management application built with Node.js, Express, MongoDB, and React.js in a single codebase. This app allows users to create, view, and manage notes. Additionally, it has a role-based access control system where only the super admin can assign the admin role and manage users.

## Features

- **User Registration and Authentication**: Allows users to sign up, log in, and securely manage their sessions.
- **Role-Based Access Control**: Different functionalities based on user roles (`admin`, `user`).
- **Note Creation and Management**: Users and admins can create and manage notes.
- **Admin Dashboard**: Only accessible to `admins` for managing users and assigning roles.
- **Super Admin Role**: Only the first registered user gets the `superAdmin` role, which is responsible for creating admin users.

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication (JSON Web Tokens)
- Bcrypt for password hashing
- Cookie-based session management

### Frontend
- React.js
- React Router
- Axios (for HTTP requests)
- Material UI (for UI components)
- Cookies.js (for managing JWT in cookies)

## Setup and Installation

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (or use MongoDB Atlas)
- [Postman](https://www.postman.com/) for API testing (optional)

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/note-management-system.git
   cd note-management-system
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/note_management
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Run the Application**
   ```bash
   npm start
   ```
   This will start both the backend (http://localhost:5000) and frontend (http://localhost:3000).

## API Endpoints

### Authentication and User Management
- `POST /api/user/signup` - Register a new user
- `POST /api/user/login` - Login and receive JWT token
- `GET /api/user/profile` - Get the logged-in user's profile
- `PUT /api/user/assign-role/:userId` - Assign roles to users (superAdmin only)

### Note Management
- `POST /api/notes` - Create a new note
- `GET /api/notes` - Get all notes
- `GET /api/notes/:noteId` - Get a specific note
- `PUT /api/notes/:noteId` - Edit a note
- `DELETE /api/notes/:noteId` - Delete a note

## User Roles

- **Super Admin**: First registered user; can create admin users and assign roles
- **Admin**: Can manage notes and view user profiles
- **User**: Can create and manage personal notes

## Frontend Features

- Login system with JWT authentication
- User profile management
- Note creation and management interface
- Admin dashboard for user management
- Role-based access control

## Troubleshooting

- **MongoDB Connection**: Ensure MongoDB is running locally or MongoDB Atlas is configured correctly
- **CORS Issues**: Check backend CORS middleware configuration
- **JWT Expiry**: Frontend handles expired tokens with login page redirection

## Deployment

1. Choose a hosting platform (Heroku, DigitalOcean, AWS)
2. Configure environment variables
3. Set up MongoDB Atlas for production database
4. Deploy frontend and backend separately or as a single application

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature-name`)
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.