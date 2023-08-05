
import { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { CLEAR_ERRORS } from "../../constants/userConstants";
import { toast } from "react-toastify";
import { createProduct, getAllProducts, getProductDetails, updateProduct } from "../../actions/productAction";
import { PRODUCT_CLEAR_ERRORS } from "../../constants/productConstants";
import { clearHistory } from "../../reducers/userReducer";

function UpdateBlog() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
    const { isUpdated,error,loading } = useSelector((state) => state.updDelProduct);
  const { product: products } = useSelector((state) => state.productDetails);
  // const categories = useSelector((state) => state.category);
  
    const blogId = useParams().id;
  const [title, setTitle] = useState("");
  
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];
  

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("title", title);
    formData.set("desc", description);
    formData.set("category", category);
    formData.set("tag", tag);
   

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(updateProduct(blogId, formData));
  };
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const files = Array.from(e.target.files);
setOldImages([]);
      setImages([]);
      setImagesPreview([]);
      files.forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setImagesPreview((old) => [...old, reader.result]);
            setImages((old) => [...old, reader.result]);
          }
        };

        reader.readAsDataURL(file);
      });
    } 
  };
 
    useEffect(() => {
      dispatch(getProductDetails(blogId));
      if (blogId) {
        console.log(products);
        setTitle(products?.title);
        setDescription(products?.desc);

        setCategory(products?.category);
        setTag(products?.tag);

        setOldImages(products?.images);
      }

      if (error) {
        toast.warning(error);

        dispatch({ type: PRODUCT_CLEAR_ERRORS });
      }
      if (isUpdated?.success === true) {
        toast.success("Blog Updated Successfully!");

        navigate("/blog/home");
        dispatch({ type: PRODUCT_CLEAR_ERRORS });
        dispatch(getAllProducts());
      }
    }, [
      isAuthenticated,
      alert,
      error,
      isUpdated?.success,
      toast,
      dispatch,
      blogId,
     
      products?.category,

      products?.desc,
      products?.tag,

      products?.title,
    ]);
  return (
    <>
      <div className="contact" id="contact">
        <div className="container">
          <h1 className="main-title">
            <span>Update Blog. </span>
          </h1>
          <div className="contact-main">
            <div class="container">
              <div class="contact-box">
                <div class="left"></div>
                <div class="right">
                  <form encType="multipart/form-data" onSubmit={onSubmit}>
                    <input
                      type="text"
                      class="field"
                      placeholder="Give Simple Title"
                      value={title}
                      name="title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                      placeholder="Short Description"
                      class="field"
                      value={description}
                      name="desc"
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    <select
                      className="field"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Choose Category</option>
                      {categories.map((c, i) => {
                        return (
                          <option key={i} value={c}>
                            {c}
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
                      {categories.map((c, i) => {
                        return (
                          <option key={i} value={c}>
                            {c}
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
                    {oldImages?.map((av) => {
                      return (
                        <img
                          src={av?.url}
                          alt="avatar"
                          style={{
                            width: "50px",
                            height: "50px",
                            margin: "5px",
                            overflowY: "scroll",
                          }}
                        />
                      );
                    })}

                    <p>
                      do you want to go back? <a href="/">back</a>
                    </p>
                    <button class="btn" type="submit" disabled={loading}>
                      {loading ? "Loading..." : "Update"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateBlog;

