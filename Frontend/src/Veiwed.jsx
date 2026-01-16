import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function Veiwed() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/student/${id}`)
      .then((res) => {
        
        setStudent(res.data[0]); // works after backend fix
      })
      .catch((err) => console.log("API Error:", err));
  }, [id]);

  if (!student) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h3>Student Details</h3>
        <p><b>ID:</b> {student.ID}</p>
        <p><b>Name:</b> {student.Name}</p>
        <p><b>Email:</b> {student.Email}</p>

        <Link to="/" className="btn btn-secondary mt-3">
          Back
        </Link>
      </div>
    </div>
  );
}

export default Veiwed;
