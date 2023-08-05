import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getAllProducts } from '../../actions/productAction';
import { loadUser } from '../../actions/userAction';
import Blog from '../Blog';
import FooterBlog from '../footer/Footer';
import Sidebar from '../sidebar/Sidebar';
import SideRight from '../sideright/SideRight';
import Topbar from '../topbar/Topbar';

const BlogHome = () => {
  const dispatch=useDispatch()
   useEffect(() => {
     dispatch(getAllProducts());
    //  dispatch(loadUser())
   }, [dispatch]);
  return (
    <>
      <Topbar />

      <Blog />
      <FooterBlog/>
    </>
  );
}

export default BlogHome