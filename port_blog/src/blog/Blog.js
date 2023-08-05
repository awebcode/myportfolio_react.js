import React, { useEffect, useState } from 'react'
import { Data } from './data/Data'
import BlogCard from './Home/BlogCard'
import Navbar from './Navbar/Navbar'

import Sidebar from './sidebar/Sidebar'
import Topbar from './topbar/Topbar'
import "./blog.css"
import SideRight from './sideright/SideRight'
import Pagination from '../components/pagination/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../actions/productAction'
import Loading from '../components/Loading/Loading'
import { getComments } from '../actions/commentAction'
import { getCategories } from '../actions/categoryAction'
import { loadUser } from '../actions/userAction'
const Blog = () => {
  const dispatch=useDispatch()
   const { products,loading } = useSelector((state) => state.allProducts);
  const [data, setData] = useState([])
   const [query, setQuery] = useState("");
  console.log("DAta",data)
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = products?.slice(firstPostIndex, lastPostIndex);
  
  const [showComments, setShowComments] = useState([]);
  const comments = useSelector((state) => state.comments);
  useEffect(() => {
    const id=data.map(c=>c._id)
    dispatch(getComments(id,1));
    setShowComments(comments?.data);
  }, [dispatch, comments?.data]);
 
 useEffect(() => {
   dispatch(getAllProducts())
  //  dispatch(getCategories());
  //  dispatch(loadUser());
   setData(products)
 }, [dispatch])
 
  return (
    <>
      {loading ? (
        <Loading/>
      ) : (
        <>
          {" "}
          <div className="blog">
            <Sidebar />
            <div className="blog-container">
              <div className="blog-main">
                {currentPosts?.map((v, i) => {
                  return (
                    <>
                      <BlogCard v={v} key={v.id} showComments={showComments} />
                    </>
                  );
                })}
              </div>
              <Pagination
                totalPosts={products?.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </div>
            <SideRight />
          </div>
        </>
      )}
    </>
  );
}

export default Blog