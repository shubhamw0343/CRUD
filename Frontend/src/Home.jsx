import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

function Home() {
  const [student, setStudent] = useState([]);

  const get_data=()=>{
    axios
      .get("http://localhost:8081/")
      .then((res) => setStudent(res.data))
      .catch((err) => console.log(err));   
  }
  

  useEffect(() => {
    get_data()
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8081/student/" + id);
      get_data()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-up bg-primary"
      style={{ width: "100%", minHeight: "100vh", padding: "50px 0" }}>
      <div className="w-50 bg-white rounded p-3 ">
        <h2>Student Records</h2>
        <div className="d-flex justify-content-end">
        <Link to="/create" className="btn btn-success mb-3">
          Add +
        </Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {student.map((data, index) => (
              <tr key={index}>
                <td>{data.ID}</td>
                <td>{data.Name}</td>
                <td>{data.Email}</td>
                <td>
                  <Link
                    to={`/update/${data.ID}`}
                    className="btn btn-primary me-2"
                  >
                    Update
                  </Link>
                  <Link to={`/view/${data.ID}` } className="btn btn-primary">View</Link>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => handleDelete(data.ID)}
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

export default Home;
