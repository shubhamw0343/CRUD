import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Update() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8081/student/${id}`)
      .then((res) => {
        setName(res.data.Name);
        setEmail(res.data.Email);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(`http://localhost:8081/update/${id}`, { name, email })
      .then((res) => {
        console.log("Student updated:", res.data);
        navigate("/"); 
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2 className="mb-3">Update Student</h2>

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-success w-100" type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default Update;
