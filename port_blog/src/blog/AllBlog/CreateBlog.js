import React, { useState,useEffect } from "react";
import { register } from "../../actions/userAction";

import {useDispatch, useSelector} from "react-redux"
import { createProduct } from "../../actions/productAction";
import { useNavigate } from "react-router-dom";
import { PRODUCT_CLEAR_ERRORS } from "../../constants/productConstants";
import { toast } from "react-toastify";
const CreateBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { created, error, loading } = useSelector((state) => state.products);
  const categories = useSelector((state) => state.category);
  const tags = useSelector((state) => state.tags);
  // const categories = [
  //   "Laptop",
  //   "Footwear",
  //   "Bottom",
  //   "Tops",
  //   "Attire",
  //   "Camera",
  //   "SmartPhones",
  // ];
  const [category, setCategory] = useState();
   const [tag, setTag] = useState();
  const [blog, setBlog] = useState({
    title: "",
    desc: "",
    
    tag: "",
  });
  const { title, desc} = blog;
  const [Images, setImages] = useState([]);
  const [showAvatar, setShowAvatar] = useState([]);
  const registerSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("title", title);
    formData.set("desc", desc);
    formData.set("category", category);
    formData.set("tag", tag);
    Images.forEach((image) => {
      formData.append("images", image);
    });
    dispatch(createProduct(formData));
  };
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const files = Array.from(e.target.files);

      setImages([]);
      setShowAvatar([]);
      files.forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setShowAvatar((old) => [...old, reader.result]);
            setImages((old) => [...old, reader.result]);
          }
        };

        reader.readAsDataURL(file);
      });
    } else {
      setBlog({ ...blog, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
    if (error) {
      toast.warning(error);

      dispatch({ type: PRODUCT_CLEAR_ERRORS });
    }
    if (created === true) {
      toast.success("Product Created Successfully!");

      navigate("/blog/home");
      dispatch({ type: PRODUCT_CLEAR_ERRORS });
    }
  }, [isAuthenticated, alert, error, created, toast, dispatch]);
  return (
    <div className="contact" id="contact">
      <div className="container">
        <h1 className="main-title">
          <span>Create Blog. </span>
        </h1>
        <div className="contact-main">
          <div class="container">
            <div class="contact-box">
              <div class="left"></div>
              <div class="right">
                <form encType="multipart/form-data" onSubmit={registerSubmit}>
                  <input
                    type="text"
                    class="field"
                    placeholder="Give Simple Title"
                    value={title}
                    name="title"
                    onChange={registerDataChange}
                  />
                  <textarea
                    placeholder="Short Description"
                    class="field"
                    value={desc}
                    name="desc"
                    onChange={registerDataChange}
                  ></textarea>
                  <select
                    className="field"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Choose Category</option>
                    {categories.map((c, i) => {
                      return (
                        <option key={c?._id} value={c.name}>
                          {c.name}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    className="field"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                  >
                    <option value="">Choose Tag</option>
                    {tags.map((c, i) => {
                      return (
                        <option key={c?._id} value={c.name}>
                        {c.name}
                        </option>
                      );
                    })}
                  </select>
                  <input
                    type="file"
                    class="field"
                    name="avatar"
                    multiple
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                  {showAvatar?.map((av) => {
                    return (
                      <img
                        src={av}
                        alt="avatar"
                        style={{
                          width: "50px",
                          height: "50px",
                          display: "flex",
                          overflow: "scroll",
                        }}
                      />
                    );
                  })}

                  <p>
                    do you want to go back? <a href="/">back</a>
                  </p>
                  <button class="btn" type="submit" disabled={loading}>
                   {loading?"Loading...":"Create"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
