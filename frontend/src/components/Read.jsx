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
        setError("");
        getData(); 
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="container my-4">
  
      <h2 className="text-center mb-4">Notes List</h2>
  
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark text-center">
            <tr>
              <th scope="col" className="w-10">#</th>
              <th scope="col" className="w-30">Title</th>
              <th scope="col" className="w-40">Description</th>
              <th scope="col" className="w-20">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((note, index) => (
              <tr key={note._id}>
                <th scope="row" className="text-center align-middle">
                  {index + 1}
                </th>
                <td className="align-middle text-center">{note.title}</td>
                <td className="align-middle text-wrap">
                  <div style={{ whiteSpace: "pre-wrap" }}>{note.description}</div>
                </td>
                <td className="align-middle text-center">
                  <Link
                    to={`/update/${note._id}`}
                    className="btn btn-sm btn-primary mx-1"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-danger mx-1"
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
    </div>
  );  
  
}

export default Read;