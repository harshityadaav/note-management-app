# Note Management Application

This is a full-stack application built using React for the frontend and Node.js/Express for the backend. It allows users to create, view, update, and manage notes. The application uses JWT (JSON Web Token) for authentication.

## Features

- **Authentication**: JWT-based user authentication using cookies for secure token storage.
- **CRUD Operations**: Create, read, update, and delete notes with title and description.
- **User Interface**: A simple, user-friendly UI built with React and Bootstrap for easy navigation.

## Technologies Used

### Frontend

- **React**: For building the user interface.
- **Axios**: For making HTTP requests to the backend.
- **React Router**: For routing between different pages.
- **Cookies**: For storing the JWT token in the browser.

### Backend

- **Node.js**: JavaScript runtime for the backend.
- **Express**: Web framework for Node.js to handle routes.
- **MongoDB**: Database to store user and note data.
- **Mongoose**: MongoDB object modeling tool for managing note schema and CRUD operations.
- **JWT**: JSON Web Token for handling authentication and authorization.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/note-management-app.git
cd note-management-app
