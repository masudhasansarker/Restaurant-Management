import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import "./addProduct.css";

export default function AddFoodItem() {
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      image: null,
      category: "dish",
    },
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("description", values.description);
      formData.append("category", values.category);
      formData.append("image", values.image);

      try {
        const response = await axios.post("https://restaurant-management-ui5z.onrender.com/addProduct", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Product uploaded successfully!");
        console.log(response.data);
        resetForm();
      } catch (error) {
        console.error("Error uploading product:", error);
        alert("Failed to upload product");
      }
    },
  });

  return (
    <div className="addbody">
      <div className="upload-container">
      <h2>Upload Food</h2>
      <form className="upload-form" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            required
          />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            onChange={formik.handleChange}
            value={formik.values.price}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Category:</label>
          <select
            name="category"
            onChange={formik.handleChange}
            value={formik.values.category}
            required
          >
            <option value="dish">Dish</option>
            <option value="dessert">Dessert</option>
            <option value="drink">Drink</option>
          </select>
        </div>

        <div className="form-group">
          <label>Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(event) =>
              formik.setFieldValue("image", event.currentTarget.files[0])
            }
            required
          />
        </div>

        <button type="submit">Upload</button>
      </form>
    </div>
    </div>
  );
}
