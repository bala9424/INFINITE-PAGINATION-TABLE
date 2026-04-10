import React, { useState } from "react";

export default function DynamicForm() {
  const formConfig = [
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "gender", label: "Gender", type: "radio", options: ["Male", "Female"] },
    { name: "department", label: "Department", type: "select", options: ["Engineering", "HR"] },
    { name: "isRemote", label: "Remote", type: "checkbox" },
  ];

  // form state
  const [formData, setFormData] = useState(
    formConfig.reduce((acc, f) => {
      acc[f.name] = f.type === "checkbox" ? false : "";
      return acc;
    }, {})
  );

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

  return (
    <div>
      <h2>Dynamic Form</h2>

      <form onSubmit={handleSubmit}>
        {formConfig.map((field) => (
          <div key={field.name} style={{ marginBottom: "10px" }}>
            <label>{field.label}</label>

            {/* INPUT TYPES */}
            {field.type === "select" ? (
              <select
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select</option>
                {field.options.map((op) => (
                  <option key={op} value={op}>
                    {op}
                  </option>
                ))}
              </select>
            ) : field.type === "radio" ? (
              field.options.map((op) => (
                <label key={op}>
                  <input
                    type="radio"
                    name={field.name}
                    value={op}
                    checked={formData[field.name] === op}
                    onChange={handleChange}
                  />
                  {op}
                </label>
              ))
            ) : field.type === "checkbox" ? (
              <input
                type="checkbox"
                name={field.name}
                checked={formData[field.name]}
                onChange={handleChange}
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            )}

            {/* ❌ Error message */}
            {errors[field.name] && (
              <p style={{ color: "red" }}>{errors[field.name]}</p>
            )}
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>

      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
}