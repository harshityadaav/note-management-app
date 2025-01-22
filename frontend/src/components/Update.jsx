import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Update() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  // Function to get the token from cookies
  const getToken = () => {
    return Cookies.get("token");
  };

  const getNoteData = async () => {
    try {
      const token = getToken(); // Retrieve token from cookies
      const response = await axios.get(
        `http://localhost:5000/api/note/noteDetails/${id}`, // Assuming the endpoint to fetch note details
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in header
          },
        }
      );
      const noteData = response.data.data; // Assuming response contains `note` data
      setTitle(noteData.title);
      setDescription(noteData.description);
    } catch (error) {
      console.error("Error fetching note data:", error);
    }
  };

  useEffect(() => {
    getNoteData();
  }, [id]);

  const handleEdit = async (event) => {
    event.preventDefault();

    try {
      const token = getToken(); // Retrieve token from cookies
      await axios.patch(
        `http://localhost:5000/api/note/updateNote/${id}`, // Assuming the endpoint to update note
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in header
          },
        }
      );
      navigate("/noteslist"); // Redirect to the list of notes after update
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div
    className="d-flex justify-content-center align-items-center vh-100 bg-light"
  >
    <div className="container p-4 bg-white rounded shadow-sm" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4">Edit Note</h2>

      <form onSubmit={handleEdit}>
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

export default Update;
