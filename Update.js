import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Contact, setContact] = useState('');
  const [Address, setAddress] = useState('');
  const [Pincode, setPinCode] = useState('');
  const [City, setCity] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3001/StaticData/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setName(json.Name);
        setEmail(json.Email);
        setContact(json.Contact);
        setAddress(json.Address);
        setPinCode(json.Pincode);
        setCity(json.City);
      })
      .catch((error) => {
        console.error("Error Fetching Data", error);
      });
  }, [id]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!Name.trim()) {
      newErrors.Name = "Name is Required";
      isValid = false;
    }
    if (!Email.trim()) {
      newErrors.Email = "Email is Required";
      isValid = false;
    }
    if (!Contact.trim()) {
      newErrors.Contact = "Contact is Required";
      isValid = false;
    }
    if (!Address.trim()) {
      newErrors.Address = "Address is Required";
      isValid = false;
    }
    if (!Pincode.trim()) {
      newErrors.Pincode = "Pincode is Required";
      isValid = false;
    }
    if (!City.trim()) {
      newErrors.City = "City is Required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const updateData = { Name, Email, Contact, Address, Pincode, City };
      fetch(`http://localhost:3001/StaticData/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      })
        .then((res) => {
          console.log("Data Updated Successfully");
          navigate('/');
        })
        .catch((error) => {
          console.log("Data Not Updated", error);
        });
    }
  };

  return (
    <>
      <div className="container mt-3">
        <div className='row d-flex justify-content-center'>
          <div className='col-md-6'>
            <h2 className="text-center">Update Form</h2>
            <form onSubmit={handleUpdate} className="needs-validation" noValidate>
              <div className="mb-3">
                <input type="text" className={`form-control ${errors.Name ? 'is-invalid' : ''}`} id="name" name='Name' value={Name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required />
                <div className="invalid-feedback">{errors.Name}</div>
              </div>
              <div className="mb-3">
                <input type="email" className={`form-control ${errors.Email ? 'is-invalid' : ''}`} id="email" name='Email' value={Email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
                <div className="invalid-feedback">{errors.Email}</div>
              </div>
              <div className="mb-3">
                <input type="text" className={`form-control ${errors.Contact ? 'is-invalid' : ''}`} id="contact" name='Contact' value={Contact} onChange={(e) => setContact(e.target.value)} placeholder="Enter your contact number" required />
                <div className="invalid-feedback">{errors.Contact}</div>
              </div>
              <div className="mb-3">
                <textarea className={`form-control ${errors.Address ? 'is-invalid' : ''}`} id="address" style={{ resize: "none" }} name='Address' value={Address} onChange={(e) => setAddress(e.target.value)} rows="3" placeholder="Enter your address" required></textarea>
                <div className="invalid-feedback">{errors.Address}</div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <input type="text" className={`form-control ${errors.Pincode ? 'is-invalid' : ''}`} id="pincode" name='Pincode' value={Pincode} onChange={(e) => setPinCode(e.target.value)} placeholder="Enter your pincode" required />
                  <div className="invalid-feedback">{errors.Pincode}</div>
                </div>
                <div className="col-md-6">
                  <input type="text" className={`form-control ${errors.City ? 'is-invalid' : ''}`} id="city" name='City' value={City} onChange={(e) => setCity(e.target.value)} placeholder="Enter your city" required />
                  <div className="invalid-feedback">{errors.City}</div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary mt-3">Update</button>
            </form>
          </div>
        </div>
      </div>

    </>
  );
};

export default Update;
