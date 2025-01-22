import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // Function to get the token from cookies
  const getToken = () => {
    return Cookies.get("token");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = getToken(); // Retrieve token from cookies
      await axios.post(
        "http://localhost:5000/api/note/createNote", // Assuming API endpoint for creating note
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in header
          },
        }
      );
      setTitle("");
      setDescription("");
      navigate("/noteslist"); // Redirect to list of notes after submission
    } catch (err) {
      console.error(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
    >
      <div className="container p-4 bg-white rounded shadow-sm" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Add a New Note</h2>
  
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              name="title"
              type="text"
              className="form-control"
              placeholder="Enter note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="5"
              placeholder="Enter note description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
  
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
  
}

export default Create;
