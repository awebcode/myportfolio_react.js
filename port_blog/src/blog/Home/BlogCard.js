import { Comment, Delete, Edit, Facebook, MailOutline, YouTube } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { getComments } from '../../actions/commentAction';
import { deleteProduct, getAllProducts, productClearErrors } from '../../actions/productAction';
import Loading from '../../components/Loading/Loading';
import SideRight from '../sideright/SideRight';
import "./BlogCard.css"
const BlogCard = (props) => {
  const Navigate=useNavigate()
  const dispatch=useDispatch()
  const { user: currUser } = useSelector((s) => s.user)
  const { loading, isDeleted } = useSelector((s) => s.updDelProduct);
  const { images, desc, cat, title, profile, time, _id, user, comments } = props.v;
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
    dispatch(getAllProducts())
   
   
  };
  useEffect(() => {
    if (isDeleted) {
      toast.warning("Product Deleted");
      Navigate("/account")
      dispatch(productClearErrors())
   }
  }, [isDeleted])
  
  return (
    <>
      {" "}
      <div className="blog-card">
        <Link to={`/blog/${_id}`} className="card-main-link">
          <div className="blog-img">
            <img src={images[0]?.url} alt="" />
          </div>
        </Link>
        <div className="blog-content">
          <h3>{title.slice(0, 50)}</h3>
          <p>{desc.slice(0, 150) + " ...see more"}</p>

          <p>{cat}</p>
          <p>
            <NavLink to={`/account/other/${user?._id}`}>
              {" "}
              <img src={user?.avatar?.url} alt="" /> <span>{time}</span>{" "}
            </NavLink>

            <span>
              <NavLink to={`/account/other/${user?._id}`}>{user?.name}</NavLink>
            </span>
          </p>
          <p>
            {" "}
            <Facebook />
            <YouTube />
            <MailOutline />
            <Comment />
            <span>{comments}</span>
          </p>
          {currUser?.role === "admin" || user?._id === currUser?._id ? (
            <span className="blog-card-ed-del-btn">
              <Link to={`/update/blog/${_id}`}>
                <Edit />
              </Link>
              <button disabled={loading} onClick={() => deleteProductHandler(_id)}>
                {" "}
                {loading ? "loading" : <Delete />}
              </button>
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default BlogCard