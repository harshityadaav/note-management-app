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
    <div className="container my-2">
      <h2>Add a New Note</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            name="title"
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Create;
