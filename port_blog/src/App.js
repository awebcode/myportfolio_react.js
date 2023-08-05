import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Navbar from "./components/Navbar/Navbar";
import ThemeAction from "./actions/ThemeAction";
import Portfolio from "./portfolio/Portfolio";
import Blog from "./blog/Blog";
import PortfolioHoeme from "./portfolio/Home/PortfolioHoeme";
import BlogHome from "./blog/Home/BlogHome";
import PortDetails from "./components/PortDetails/PortDetails";
import ScrollToTop from "./components/ScrollToTop";
import BlogDetails from "./blog/blogDetails/BlogDetails";
import Login from "./portfolio/contact/Login";
import { getallUsersAction, loadUser } from "./actions/userAction";
import UpdateUser from "./portfolio/contact/UpdateUser";
import UpdateUserRole from "./portfolio/contact/UpdateUserRole";
import UpdatePassword from "./portfolio/contact/UpdatePassword";
import CreateBlog from "./blog/AllBlog/CreateBlog";
import UpdateBlog from "./blog/AllBlog/UpdateBlog";
import { getAllProducts, getAllUserProducts } from "./actions/productAction";
import Account from "./components/account/Account";
import OtherInfo from "./components/account/OtherInfo";
import ThemeToggleMain from "./portfolio/Navbar/ThemeToggleMain";
import Dashboard from "./blog/dashboard/Dashboard";
import AllUsers from "./blog/dashboard/AllUsers";
import AllProducts from "./blog/dashboard/AllBlogss";
import Settings from "./blog/dashboard/Settings";
import Loading from "./components/Loading/Loading";
import Category from "./blog/category/Category";
import Tag from "./blog/category/Tag";
import { getCategories } from "./actions/categoryAction";
import { getTags } from "./actions/tagAction";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const themeReducer = useSelector((s) => s.Theme);
  const {user} = useSelector((s) => s.user);
  useEffect(() => {
    const themeClass = localStorage.getItem("themeMode", "theme-mode-light");

    const colorClass = localStorage.getItem("colorMode", "theme-mode-light");

    dispatch(ThemeAction.setMode(themeClass));

    dispatch(ThemeAction.setColor(colorClass));
    dispatch(loadUser());
    if (user?.role === "admin") {
      dispatch(getAllProducts());
      dispatch(getallUsersAction());
    } else {
       dispatch(getAllUserProducts());
    }
    
    dispatch(getCategories());
    dispatch(getTags());
  }, [dispatch]);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={`${themeReducer.mode} ${themeReducer.color}`}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/portfolios" element={<Portfolio />} />
                <Route path="/blogs" element={<Blog />} />
                <Route path="/portfolio/home" element={<PortfolioHoeme />} />
                <Route path="/portfolio/:id" element={<PortDetails />} />

                <Route path="/blog/home" element={<BlogHome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/update/profile" element={<UpdateUser />} />
                <Route path="/update/role/:id" element={<UpdateUserRole />} />
                <Route path="/update/password" element={<UpdatePassword />} />
                <Route path="/create/blog" element={<CreateBlog />} />
                <Route path="/update/blog/:id" element={<UpdateBlog />} />
                <Route path="/account" element={<Account />} />
                <Route path="/account/other/:id" element={<OtherInfo />} />
                <Route path="/login" element={<Login />} />
                {/* <Route path="/blog/:id" element={<BlogDetails />} /> */}
                <Route path="/blog/:slug" element={<BlogDetails />} />
                <Route path="/blog/tag/:slug" element={<BlogDetails />} />
                <Route path="/blog/category/:slug" element={<BlogDetails />} />
                <Route path="/themes" element={<ThemeToggleMain />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/all-blogs" element={<AllProducts />} />
                <Route path="/dashboard/all-users" element={<AllUsers />} />
                <Route path="/dashboard/create/category" element={<Category />} />
                <Route path="/dashboard/create/tag" element={<Tag />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </BrowserRouter>
          </div>
          <ScrollToTop />
        </>
      )}
    </>
  );
}

export default App;
