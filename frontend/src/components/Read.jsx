import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Read() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  // Function to get the token from cookies
   const getToken = () => {
      return Cookies.get("token");
    };

  const getData = async () => {
    try {
      const token = getToken(); // Retrieve token from cookies
      const response = await axios.get("http://localhost:5000/api/note/noteList", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in header
        },
      });
      setData(response.data.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = getToken(); // Retrieve token from cookies
      await axios.delete(`http://localhost:5000/api/note/deleteNote/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in header
        },
      });
      setError("Delete Successfully");
      setTimeout(() => {
        setError("");
        getData(); // Refresh data after deletion
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="container my-2">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <h2 className="text-center">Notes List</h2>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((note, index) => (
            <tr key={note._id}>
              <th scope="row">{index + 1}</th>
              <td>{note.title}</td>
              <td>{note.description}</td>
              <td>
                <Link to={`/update/${note._id}`} className="card-link m-2">
                  Edit
                </Link>
                <button
                  className="btn btn-link text-danger m-2"
                  onClick={() => handleDelete(note._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Read;