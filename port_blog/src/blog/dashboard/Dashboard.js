import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import Sidebar from '../sidebar/Sidebar'
import "./dashboard.css"
const Dashboard = () => {
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const { users } = useSelector(s => s.allUsers)
    const { users: allUser } = users
    const { products } = useSelector((s) => s.allProducts);
    // useEffect(async() => {
    //     const { data } = await axios.get("/api/v1/comments/all")
    //     setData(data)
  
    
    // }, [])
    
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="container">
        <div className="dashboard-main">
          <div className="dash-sec">
            <NavLink to="/dashboard/all-users">
              {" "}
              <h1>All Users</h1>
              <span>{allUser?.length}</span>
            </NavLink>
          </div>
          <div className="dash-sec">
            <NavLink to="/dashboard/all-blogs">
              <h1>All Blogs</h1>
              <span>{products?.length}</span>
            </NavLink>
          </div>
          <div className="dash-sec">
            <NavLink to="/dashboard/all-comments">
              <h1>All Comments</h1>
              {/* <span>{data?.comments?.length}</span> */}
              <span>7035</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard