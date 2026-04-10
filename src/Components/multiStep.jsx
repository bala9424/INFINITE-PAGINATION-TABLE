import React, { useState } from "react";

export default function MultiStepForm() {

  const [step,setStep]= useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    plan: 'Basic'
  });
 

  // error state
  const [errors, setErrors] = useState({});

  // 🔥 Validation function
  function validate(name, value) {
    let error = "";

    if (name === "firstName" || name === "lastName") {
      if (!value) error = "Required";
      else if (value.length < 3) error = "Min 3 characters";
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) error = "Required";
      else if (!emailRegex.test(value)) error = "Invalid email";
    }

    return error;
  }

  // 🔁 handle change (with validation)
  function handleChange(e) {
    const { name, type, value, checked } = e.target;

    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // validate on change
    const error = validate(name, newValue);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  }

// 3. Render Helpers
const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="step-content">
            <h3>Step 1: Personal Info</h3>
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="John Doe"
              />
              {errors.name && <small className="error-text">{errors.name}</small>}
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="john@example.com"
              />
              {errors.email && <small className="error-text">{errors.email}</small>}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step-content">
            <h3>Step 2: Account Security</h3>
            <div className="form-group">
              <label>Username</label>
              <input 
                type="text" 
                value={formData.username} 
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                placeholder="johndoe123"
              />
              {errors.username && <small className="error-text">{errors.username}</small>}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                value={formData.password} 
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="••••••"
              />
              {errors.password && <small className="error-text">{errors.password}</small>}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="step-content">
            <h3>Step 3: Review & Submit</h3>
            <div className="review-box">
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Username:</strong> {formData.username}</p>
              <p><strong>Plan:</strong> {formData.plan}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // 🔵 handle blur (extra validation)
  function handleBlur(e) {dffg
    const { name, value } = e.target;

    const error = validate(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  }

  // ✅ submit
  function handleSubmit(e) {
    e.preventDefault();

    let newErrors = {};

    Object.keys(formData).forEach((key) => {
      const error = validate(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Form Submitted ✅");
      console.log(formData);
    }
  }
  const validateStep = () => {
    let currentErrors = {};
    if (step === 1) {
      if (!formData.name) currentErrors.name = "Name is required";
      if (!formData.email.includes('@')) currentErrors.email = "Invalid email";
    } else if (step === 2) {
      if (formData.username.length < 4) currentErrors.username = "Min 4 chars";
      if (formData.password.length < 6) currentErrors.password = "Min 6 chars";
    }
    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };
  const handleNext = () => {
    if (validateStep()) setStep(s => s + 1);
  };

  const handleBack = () => {
    setStep(s => s - 1);
  };


  return (
    <div>
      <h2>Dynamic Form</h2>

      <form onSubmit={handleSubmit}>
        <div className="steps">
            <div className={`step ${step >= 1 ? 'step-active' : ''}`}>1</div>
            <div className="step-line"></div>
            <div className={`step ${step >= 2 ? 'step-active' : ''}`}>2</div>
            <div className="step-line"></div>
            <div className={`step ${step >= 3 ? 'step-active' : ''}`}>3</div>
        </div>
        <div className="form-place">
        {
            renderStep(1)
        }
        </div>
      {
        step > 1  && (<button type="button" onClick={handleBack}>Back</button>) 
      }
      {
        step < 3 ? ( <button type="button" onClick={handleNext}>Next</button>) : (<button type="submit">Submit</button>)
      }
        
       
        
      </form>

      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
}