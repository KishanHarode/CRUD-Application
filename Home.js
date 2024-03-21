import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import './CRUD_Css.css';

const Home = () => {
  const [dynamicData, setDynamicData] = useState([]);
  const apiUrl = "http://localhost:3001/StaticData";
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = () => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((json) => {
        setDynamicData(json);
      })
      .catch((error) => {
        console.error("Error Fetching The Data", error);
      });      
  };
  
  const handleDelete = (id)=>{
    if(window.confirm("Are You Sure You Want To Delete The Data ?")){
      fetch(`${apiUrl}/${id}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"Application/Json",
        }
      }).then((res)=>{
          console.log("Data Deleted Successfully");
          fetchData();
      }).catch((error)=>{
          console.log("Data is Not Deleting",error);
      })
    }
  }
  
  return (
    <div className='container mt-4'>
      <div className="col-md-12 mx-auto border container-Width">
        <table className="table table-dark table-striped table-hover table-responsive">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Contact</th>
              <th scope="col">Address</th>
              <th scope="col">PinCode</th>
              <th scope="col">City</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {dynamicData.length === 0 && (
              <tr>
                <td colSpan={8}>Data Not Found</td>
              </tr>
            )}
            {dynamicData.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.Name}</td>
                <td>{data.Email}</td>
                <td>{data.Contact}</td>
                <td>{data.Address}</td>
                <td>{data.Pincode}</td>
                <td>{data.City}</td>
                <td>
                  <div className='btn-container'>
                  <button className='btn btn-danger btn1' onClick={() => handleDelete(data.id)}>Delete</button>
                  <Link to={`/update/${data.id}`}><button className='btn btn-success btn2'>Update</button></Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
